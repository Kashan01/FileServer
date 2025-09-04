const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express();
app.use(express.static('public'));

const filePath=path.join(__dirname,'File')
app.get('/files' ,(req,res)=>{
    fs.readdir(filePath,(err,files)=>{
        if(err){
            return res.status(404).json({
                message:err.message
            })
        }
            res.json({
        directory:'File',
        fileCount:files.length,
        files:files

    })
    })
})

app.get("/files/:filename",(req,res)=>{
    let filename = req.params.filename
    let pathofFile = path.join(__dirname,'./File/',filename)
    fs.readFile(pathofFile,'utf-8',(err,data)=>{
        if(err){
            
        return res.status(404).send('File not found');
        }
        console.log(data)
        res.json({
            data:data
        })
    })
})

app.all(/.*/, (req, res) => {
  res.status(404).send("Path not found...");
});

app.listen(3000)