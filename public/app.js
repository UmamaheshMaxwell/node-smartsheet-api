const inputFile= document.getElementById('fileUpload')
const upload = document.getElementById('btnUpload')
let fileInfo = null;

inputFile.onchange = (event) => {
    console.log(event.target.files)
    fileInfo = event.target.files
    console.log(event.path)
}

upload.onclick = (event) => {
    console.log('did you cllick me ?')
    console.log(fileInfo)
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        console.log(event.target.result);
    });
  reader.readAsText(fileInfo[0]);

}
