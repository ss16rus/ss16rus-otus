const fs = require ('fs');
const path = require('path');
const http = require('http');
const url = require('url');

let myFiles = [];
let myFolders = [];

const startPoint = process.argv[2];

if ( startPoint == undefined) {

    http.createServer((req, res) => {
        const  q = url.parse(req.url, true);
        const filename = q.pathname;
        res.write("Trying to access " + filename);
        
        checkDestination( filename, result => {
            if ( result ) {

                res.write("\nAccess allowed\n");
                createFilesTree( filename )
                .then(() => {
                    res.end( JSON.stringify({files: myFiles, dirs: myFolders}));
                    myFiles.length = 0;
                    myFolders.length = 0;
                });
            } else {

                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end( filename + " not accessible");
            }
        })
    }).listen(8888);

    console.log('Server listening on 8888');
} else {

    checkDestination( startPoint, result => {
        if ( result ) {
            createFilesTree( startPoint )
            .then( () => {
                console.log( myFiles, myFolders );
            })
        } else {
            console.log("Destination is unaccessible.")
        }
    });
}


function checkDestination( target, callback ) {
    return fs.access(target, err => {
        if (err) {
            callback( false );
        } else {
            callback( true );
        }
    })
}


async function createFilesTree( target ) {
    return new Promise( (resolve, reject) => {
        fs.readdir( target, (err, files) => {
            if (err) {
                reject(err);
                return;
            }

            myFolders.push( target );
            let filesCount = files.length;

            for (let file of files) {
                const fullName = path.join( target, file);
                
                fs.stat( fullName, async (err, stats) => {
                    if (err) {
                        reject( err );
                        return;
                    }
                    
                    if ( stats.isFile()) {
                        myFiles.push( fullName );
                        if ( --filesCount ) resolve("ok");
                    } else {
                        myFolders.push( fullName );
                        await createFilesTree( fullName );
                        if ( --filesCount ) resolve("ok");
                    }
                })
            }
        })
    })
}