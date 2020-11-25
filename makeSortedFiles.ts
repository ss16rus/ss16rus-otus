import fs from 'fs';

export default async function writeSortedChunk( 
                       bigFile: string, maxBytes: number ) : Promise<void> {

    const rs = fs.createReadStream( bigFile,  { highWaterMark: 1, flags: 'r', encoding: "utf8" });

    const accumulator: number[] = [];
    let nextNum: string = '';
    let counter: number = 0;
    let part: number = 1;

    rs.on('data', chunk => {
        if ( chunk == null ) {
            rs.close();
            return;
        }

        if ( chunk == ' ') {
            accumulator.push( +nextNum );
            nextNum = '';
        } else {
            nextNum += chunk;
        }

        ++counter; 
        // avail - 3938/3777 MB free - 1376/1201
        // avail - 3938/3780 MB free - 1376/1209

        if ( counter >= maxBytes && chunk == ' ' ) {
            rs.pause();
        } 
    });

    rs.on('pause', () => {
        const ext: string = part < 10 ? '0' + part : '' + part;
        const ws = fs.createWriteStream(`./${bigFile}.${ext}`, {encoding:'utf-8'});
        accumulator.sort((a, b) => a - b);
        ws.write( accumulator.join(' '));
        
        ws.on('drain', () => {
            console.log(accumulator.length + " bytes processed");
            ++part;
            rs.resume();
        });
    })
    
    rs.on('resume', () => {
        counter = 0;
        accumulator.length = 0;
    });

    return new Promise ( res => {
        rs.on('close', () => {
            console.log(`File stream is closed`);
            res();
        });
    })
}