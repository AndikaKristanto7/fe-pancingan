import { useState } from "react"
import axios from "axios";
import '../style/uploader.css'
import BeApp from '../helpers/api_call/BeApp'

function Uploader({onSetImageChange}){

const [ file, setFile ] = useState(null);
const [ progress, setProgress ] = useState({ started: false, pc: 0 });
const [ msg, setMsg ] = useState(null);

function handleUpload(e) {
    e.stopPropagation()
    e.preventDefault()
    if (!file) {
        console.log("No file selected");
        return;
    }

    setMsg("Uploading...");
    setProgress(prevState => {
        return {...prevState, started: true}
    })
    BeApp.postUpload({file:file[0]})
    .then((res)=>{
        onSetImageChange(res.data.url)
    })
    .catch((err)=>{
        console.log(err)
    })
}

return (
    <div className="Uploader">
        <h1 className="header">Upload Picture</h1>

        <input className="input-file" onChange={ (e) => { setFile(e.target.files) } } type="file" accept="image/*"/>

        <button className="upload-btn" onClick={ handleUpload }>Upload !</button>

        <h3 className="progress-bar">{ progress.started && <progress max="100" value={progress.pc}></progress> }</h3>

        <h4 className="successful" >{ msg && <span>{msg}</span> }</h4>

    </div>
)
}

export default Uploader