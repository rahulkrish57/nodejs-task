const express = require("express");

const app = express();

const fs = require("fs");
const path = "C:\\Users\\Rahul\\OneDrive\\Documents";
var result = ""
fs.readdir(path, (err, files) => {
    app.get("/", (req, resp)=>{
        if(err) throw err
        console.log(files)
   files.forEach((file)=>{
    var stats = fs.statSync(path+`\\${file}`);
     console.log(stats.isFile());
     result += (stats.isFile()) ? `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZa9qP_tXJD_mYcb5SVZMI7KxaBYbqE3LlB5VEJnemGrf2-w5HP1c9lWBHhxGmlwdHLPQ&usqp=CAU" width="50" height="60" >${file}<br>` : `<img src="https://png.pngtree.com/png-vector/20190215/ourlarge/pngtree-vector-folder-icon-png-image_529920.jpg"width="50" height="60">${file}<br>`
     /*if(stats.isFile()){
         result += `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZa9qP_tXJD_mYcb5SVZMI7KxaBYbqE3LlB5VEJnemGrf2-w5HP1c9lWBHhxGmlwdHLPQ&usqp=CAU" width="50" height="60" >${file}<br>`
     } else {
        result += `<img src="https://png.pngtree.com/png-vector/20190215/ourlarge/pngtree-vector-folder-icon-png-image_529920.jpg"width="50" height="60">${file}<br>`
     }*/
    })
    resp.send(result);
    });
    app.listen(3000); 
})


//result += stats.isFile ? `<img src="https://findicons.com/files/icons/2813/flat_jewels/128/file.png" height="600">${file}` : `<img src="https://findicons.com/files/icons/2813/flat_jewels/128/file.png" height="600">${file}`