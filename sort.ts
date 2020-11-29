import fs, { ReadStream, WriteStream } from 'fs';

class Chunk {
    value: number | null = null;
    rs: ReadStream;
    myGenerator;

    constructor ( chunkName: string ) {
        this.rs = fs.createReadStream( chunkName, {highWaterMark: 1, encoding: 'utf8'});
        this.rs.on('ready', () => { console.log( chunkName, 'is ready')});
        this.myGenerator = this.takeGenerator( this.rs );
    }

    async getNextValue() {
        const res = await this.myGenerator.next();
        this.value = res.done ? null : +res.value;
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

        if ( accumulator != '') yield accumulator;
    }

}
 
export default async function createFinalFile( file1: string, file2: string) : Promise<string> {
    const chunkOne: Chunk = new Chunk( file1 );
    const chunkTwo: Chunk = new Chunk( file2 );
    
    // считать символы из потоков
    // если null тогда дописать оставшийся поток в конец и закончить
    // выбрать меньшее из чисел, записать в результат
    // получить следующее число из потока, в котором было меньшее число
    // перейти к п. 2 

    const outputFile = fs.createWriteStream( file1 + file2 );
    await chunkOne.getNextValue();
    await chunkTwo.getNextValue();
    
    do {
        if ( chunkOne.value == null ) {
            // записать поток два 
            console.log('Chunk One ended');
            await saveTheRest( chunkTwo, outputFile );
            console.log('Saved the rest of chunkTwo');
            break;
        }
        if ( chunkTwo.value == null ) {
            // записать поток один 
            console.log('Chunk Two ended');
            await saveTheRest( chunkOne, outputFile );
            console.log('Saved the rest of chunkOne');
            break;
        }
        if ( chunkOne.value < chunkTwo.value ) {
            // записать value и получить данные из потока 1
            outputFile.write( chunkOne.value + ' ');
            await chunkOne.getNextValue();
        } else {
            // записать value и получить данные из потока 2
            outputFile.write( chunkTwo.value + ' ');
            await chunkTwo.getNextValue();
        }
    } while(true);

    outputFile.end();
    fs.unlink( file1, err =>{});
    fs.unlink( file2, err =>{});
    return file1 + file2;  
}


async function saveTheRest ( chunk: Chunk, ws: WriteStream ) : Promise<void>{
    return new Promise( async res => {
        while ( chunk.value ) {
            ws.write( chunk.value + ' ');
            await chunk.getNextValue();
        }
        res();
    });
    
}