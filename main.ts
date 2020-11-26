import createFile from './createFile';
import {UNSORTED_FILE_NAME as FILE} from './createFile';
import chunkBigFile from './makeSortedFiles';
import createFinalFile from './sort';
import test from './test';

console.log("hello main");
const FILE_SIZE_MB = 1; 
const CHUNK_SIZE_BYTES = 101400; 
const files = ['unsorted.01', 'unsorted.02', 'unsorted.03'];
test( ['test.01','test.02','test.03'] );
// createFile( FILE_SIZE_MB)
// .then(() => { return chunkBigFile( FILE, CHUNK_SIZE_BYTES ) })
// .then( chunckNames => { createFinalFile( chunckNames )});

