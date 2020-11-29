import createFile from './createFile';
import {UNSORTED_FILE_NAME as FILE} from './createFile';
import createSortedChunks from './makeSortedFiles';
import createFinalFile from './sort';
// import test from './test';

console.log("hello main");
const FILE_SIZE_MB = 1; 

createFile( FILE_SIZE_MB )
.then(() => createSortedChunks( FILE, FILE_SIZE_MB ))
.then( async chunksNames => { 
    let counter = 1;

    while ( chunksNames.length > 1 ) {
        chunksNames = await join( chunksNames );
        console.log(`STEP ${counter++} proceeded!`)
    }
});

async function join ( filesArray: string[] ) : Promise <string[]> {
    let newChunkNames: string[] = [];

    for ( let i = 0; i < filesArray.length; i +=2) {
        console.log(`Started joining ${filesArray[i]} and ${filesArray[i+1]}`);
        const finalName = await createFinalFile( filesArray[i], filesArray[i+1]);
        newChunkNames.push( finalName );
        console.log(`Merged into ${finalName}`);
    }
    return newChunkNames;
}