import { useState } from "react"
import axios from "axios";
import '../style/uploader.css'

function Uploader(){

const [ files, setFiles ] = useState(null);
const [ progress, setProgress ] = useState({ started: false, pc: 0 });
const [ msg, setMsg ] = useState(null);

function handleUpload() {
    if (!files) {
        console.log("No file selected");
        return;
    }

    const fd = new FormData();
    for (let i=0; i<files.length; i++) {
        fd.append(`file${i+1}`, files[i]);
    }

    setMsg("Uploading...");
    setProgress(prevState => {
        return {...prevState, started: true}
    })
    axios.post('http://httpbin.org/post', fd, {
        onUploadProgress: (progressEvent) => { setProgress(prevState => {
            return { ...prevState, pc: progressEvent.progress*100 }
        }) },
        headers: {
            "custom-header": "value",
        } 
    })
    .then(res => {
        setMsg("Upload successful");
        console.log(res.data);
    })
    .catch(err => {
        setMsg("Upload failed");  
        console.error(err);
    });
}

return (
    <div className="Uploader">
        <h1 className="header">Upload Files</h1>

        <input className="input-file" onChange={ (e) => { setFiles(e.target.files) } } type="file" accept="image/*" multiple/>

        <button className="upload-btn" onClick={ handleUpload }>Upload !</button>

        <h3 className="progress-bar">{ progress.started && <progress max="100" value={progress.pc}></progress> }</h3>

        <h4 className="successful" >{ msg && <span>{msg}</span> }</h4>

    </div>
)
}

export default Uploader