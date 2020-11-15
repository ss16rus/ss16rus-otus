const fs = require ('fs');
const path = require('path');
const http = require('http');
const url = require('url');

let myFiles = [];
let folders = [];

const startPoint = process.argv[2];

if ( startPoint == undefined) {

    http.createServer((req, res) => {
        const  q = url.parse(req.url, true);
        const filename = "." + q.pathname;
        
        if ( checkFolder( filename)) {

            createFilesTree(startPoint)
            .then( () => {
                console.log( JSON.stringify(myFiles, folders));
            })
        } else {

            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
    }).listen(8080);

} else {

    if ( checkFolder( filename)) {
        createFilesTree(startPoint)
        .then( () => {
            console.log( JSON.stringify(myFiles, folders));
        })
    } else {

        console.log("Destination is unaccessible.")
    }

}


function checkFolder(startPoint) {
    return fs.access(startPoint, err => {
        if (err) {
            return false;
        } else {
            return true;
        }
    })
}


async function createFilesTree( folder ) {
    return new Promise( (resolve, reject) => {
        fs.readdir( folder, (err, files) => {
            if (err) {
                reject(err);
                return;
            }

            let filesCount = files.length;
            
            for (let file of files) {
                const fullName = path.join( folder, file);
    
                fs.stat(fullName, async (err, stats) => {
                    if (err) {
                        reject( err );
                        return;
                    }
                    
                    if (stats.isFile()) {
                        myFiles.push( fullName );
                        if ( --filesCount == 0) resolve("ok");
                    }
                    
                    if (stats.isDirectory()) {
                        folders.push( fullName );
                        await createFilesTree( fullName );
                        if ( --filesCount == 0) resolve("ok");
                    }
                });
            }

        });
    })
}