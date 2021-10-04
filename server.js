const express = require('express')
const axios = require('axios')
const fs = require("fs")
const path = require('path')

const app = express()
const router = express.Router()

const config = require("./config")

const headers =  {'Authorization' : config.API_KEY }
const API_URL = config.API_URL

router.get("/health", (req, res) => {
    res.send('Welcome to smartsheet API' )
})

router.get("/get-sheets", (req, res)=>{ 
    axios(`${API_URL}/sheets`, {headers: headers})
    .then(response => res.json(response.data))
})

router.get("/get-sheets/:id", (req, res)=>{
    const sheetId = req.params.id
    axios(`${API_URL}/sheets/${sheetId}`, {headers: headers})
    .then(response => res.json(response.data))
})

router.get("/get-folders", (req, res)=>{
    axios(`${API_URL}/home/folders`, {headers: headers})
    .then(response => res.json(response.data))
})

router.get("/get-folders/:id", (req, res)=>{
    const folderId = req.params.id
    axios(`${API_URL}/folders/${folderId}`, {headers: headers})
    .then(response => res.json(response.data))
})

router.post("/add-files/:id", (req, res)=>{

    const folderId = req.params.id

     const postRequest = {
           headers: {
            'Authorization' : config.API_KEY, 
            'Content-Disposition': 'attachment',
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Length': 52098
           },
           params: {
               sheetname: 'NSA'
           },
           body: {
            path: fs.createReadStream("./files/NSA-Data.xlsx")
           }
     }

    axios(`${API_URL}/folders/${folderId}/sheets/import`, postRequest)
    .then(data => res.json(data))
    .catch(error => {res.json(error)});
})


const PORT = 3001
app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Server Listening at port ${PORT} `)
})