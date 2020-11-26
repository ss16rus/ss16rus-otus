import fs, { ReadStream } from 'fs';

class Chunk {
    value: number | null = 0;
    myGenerator;

    constructor ( rs: ReadStream ) {
        this.myGenerator = this.takeGenerator( rs );
    }

    async getNextValue() {
        this.value = await this.myGenerator
        .next().then( res => {
            if ( res ) {
                return +res.value!;
            } else {
                return null
            }
        });

        return this.value;
    }

    async* takeGenerator( rs: ReadStream) {
    
        let accumulator: string = '';
        
        for await (const chunk of rs ) {
            if ( chunk == ' ') {
                yield accumulator;
                accumulator = '';
            } else {
                accumulator += chunk;
            }
        }
        yield null;
    }

}
 
export default async function createFinalFile( chuncksNames: string[] ) {
    const readStreams: ReadStream[] = takeReadStreams( chuncksNames );

    const chuncks: Chunk[] = [];
    
    for ( let stream of readStreams ) {
        chuncks.push( new Chunk( stream ));
    }

    for ( let i = 0; i < chuncks.length; ++i) {
        await chuncks[i].getNextValue();
    }

    chuncks.sort((a, b) => {
        if ( a.value && b.value ) return a.value - b.value;
        if ( a.value == null ) return -1;
        if ( b.value == null ) return 1;
        if ( a.value == null && b.value == null) return 0;
    });

    for ( let chunk of chuncks ) {

        console.log(chunk.value);
    }

}


function takeReadStreams( filesNames: string[] ) : ReadStream[] {
    const streams: ReadStream[] = [];

    for ( const chunkName of filesNames) {
        const rs = fs.createReadStream( chunkName, {highWaterMark: 1, encoding: 'utf8'});
        streams.push( rs );
    }
    return streams;
}