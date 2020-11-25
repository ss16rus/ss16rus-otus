import createFile from './createFile';
import {UNSORTED_FILE_NAME as FILE} from './createFile';
import chunkBigFile from './makeSortedFiles';
import createFinalFile from './sort';

console.log("hello main");
const FILE_SIZE_MB = 1; 
const CHUNK_SIZE_BYTES = 101400; 

createFile( FILE_SIZE_MB)
.then(() => { return chunkBigFile( FILE, CHUNK_SIZE_BYTES ) })
.then(() => { createFinalFile( FILE )});

