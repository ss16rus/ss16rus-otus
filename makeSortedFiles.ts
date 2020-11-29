import fs from 'fs';

const CHUNK_NUMBERS = 8;

export default async function writeSortedChunk( 
                       bigFile: string, fileSizeMB: number ) : Promise<string[]> {

    const CHUNK_SIZE = Math.round( fileSizeMB *1024 *1024 / CHUNK_NUMBERS );

    const rs = fs.createReadStream( bigFile, { highWaterMark: 1, flags: 'r', encoding: "utf8" });
    const chunksNames: string[] = [];

    const accumulator: number[] = [];
    let nextNum: string = '';
    let counter: number = 0;
    let globalCounter = 0;
    
    rs.on('data', chunk => {
        if ( chunk == null ) {
            if ( nextNum != '' ) accumulator.push( +nextNum );
            rs.close();
            return;
        }

        if ( chunk == ' ' || chunk == null ) {
            accumulator.push( +nextNum );
            nextNum = '';
        } else {
            nextNum += chunk;
        }
        ++counter; 

        if ( chunk == null || 
             counter >= CHUNK_SIZE && chunk == ' ' ) {
            rs.pause();
        } 
    });

    let part: number = 1;
    rs.on('pause', async () => {
        await saveChunkToFile();
    });
    
    rs.on('resume', () => {
        counter = 0;
        accumulator.length = 0;
    });

    return new Promise ( res => {
        rs.on('close', async () => {
            if ( accumulator.length > 0) {
                await saveChunkToFile();
            }
            console.log(`Sorted chunks created`);
            res( chunksNames );
        });
    });

    async function saveChunkToFile() : Promise<void> {
        const ext: string = part < 10 ? '0' + part : '' + part;
        const chunkName: string =  `part${ext}`;
        const ws = fs.createWriteStream( chunkName, {encoding:'utf-8'});
        accumulator.sort((a, b) => a - b);
        ws.on('drain', () => {
            globalCounter += counter;
            const size = Math.round( 1000 * globalCounter / (1024*1024))/1000;
            console.log (`${size} of ${fileSizeMB} MB processed`);
            ++part;
            chunksNames.push( chunkName );
            rs.resume();
        });
        return new Promise( res => {
            ws.write( accumulator.join(' '), () => {
                res();
            });
        });
    }
}