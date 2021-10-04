const express = require('express')
const client = require('smartsheet')
const path = require('path')
var fs = require("fs")

const app = express()
const router = express.Router()

app.use(express.static(path.join(__dirname, "public")))

const config = require("./config")

var smartsheet = client.createClient({ accessToken: config.API_KEY });

router.get("/health", (req, res) => {
    res.send('Welcome to smartsheet API' )
})

router.get("/get-sheets", (req, res)=>{     
      // List Sheets
      smartsheet.sheets.listSheets()
        .then(function(sheetList) {
            res.json(sheetList)
        })
        .catch(function(error) {
            res.json(error);
        });
})

router.post("/add-sheets/:id", (req, res)=>{
    const sheetId = req.params.id
    // Set options
    var options = {
      sheetId,
      fileSize: 20765,
      fileName: "ProgressReport.docx",
      fileStream: fs.createReadStream("./files/ProgressReport.docx")
    };

    // Attach file to sheet
    smartsheet.sheets.addFileAttachment(options)
    .then(function(attachment) {
        res.json(attachment);
    })
    .catch(function(error) {
        res.json(error);
    });
})

router.post("/import-excel/:id", (req, res)=>{
   const folderId = req.params.id

var options = {
    folderId: folderId, 
    queryParameters: {
      sheetName: 'Financial'
    },
    path: "./files/Financial-Sample.xlsx"
  };
  
  // Import XLSX as sheet into Folder
  smartsheet.sheets.importXlsxSheetIntoFolder(options)
    .then(attachment => res.json(attachment))
    .catch(error => res.json(error));
})


const PORT = 3001

app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Server Listening at port ${PORT} `)
})