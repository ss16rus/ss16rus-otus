import stream from 'stream';
import fs from 'fs';

export const UNSORTED_FILE_NAME = "unsorted";


class FileCreator extends stream.Readable {
    
    bytes: number;
    count: number = 1;

    constructor ( bytes: number, opt: object ) {
        super( opt );
        this.bytes = bytes;
        this.setEncoding("utf-8");
    } 
     
    _read() {
        if ( this.count > this.bytes ) {
            this.push( null );
        } else {

            const num: string = Math.round( Math.random() * 100000 ) + ' ';
            const buf = Buffer.from( num );
            const success = this.push( buf );
            this.count += buf.length;
        }
    }
}


export default function createFile( sizeInMB: number ) : Promise<void> {
    const fileSize = Math.floor(sizeInMB * 1024 * 1024 ); // in bytes
    const writeableStream = fs.createWriteStream(`./${UNSORTED_FILE_NAME}`);
    
    console.log(`Creating ${fileSize} bytes in ${UNSORTED_FILE_NAME}`);

    const fileCreator = new FileCreator( fileSize, { highWaterMark: 7 });
    
    let res: String = "";
    let count = 0;

    fileCreator.on('data', chunk => {
        res += chunk;
        if (++count % 1000000 == 0 ){
            console.log(`Received: ${res.length} of ${fileSize} bytes`);
        } 
    });
    
    fileCreator.on('end', () => {
        console.log('Creating random file finished.');
    });

    fileCreator.pipe( writeableStream );
    
    return new Promise( res => {
        writeableStream.on('close', () => res());
    });
}