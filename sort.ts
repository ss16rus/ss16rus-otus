import fs, { ReadStream } from 'fs';
import stream from 'stream';

 
export default function createFinalFile( fileName: string) {
    takeReadStreams( fileName, 0);
}

function takeReadStreams( fileName: string, part: number ) : ReadStream[] {
    let ext = part < 10 ? '.0' + part : '.' + part;
    const fileStreams: ReadStream[] = [];
    let rs: ReadStream;
    rs = fs.createReadStream(fileName + ext, {encoding: 'utf8'} );

    while ( rs ) {
        ++part;
        ext = part < 10 ? '.0' + part : '.' + part;
        fileStreams.push(rs);
        if ( part > 10 ) {
            console.log( part, rs);
            break;
        }
        console.log( ext );
        rs = fs.createReadStream(fileName + ext, {encoding: 'utf8'} )
    }

    return fileStreams;
}