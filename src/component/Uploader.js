import { useState } from "react"
import '../style/uploader.css'
import BeApp from '../helpers/api_call/BeApp'

function Uploader({image,onSetImageChange}){

const [ file, setFile ] = useState(null);
const [ msg, setMsg ] = useState(null);

function handleUpload(e) {
    e.stopPropagation()
    e.preventDefault()
    if (!file) {
        console.log("No file selected");
        return;
    }

    setMsg("Uploading...");
    BeApp.postUpload({file:file[0]})
    .then((res)=>{
        onSetImageChange(res.data.url)
        setMsg(false)
    })
    .catch((err)=>{
        console.log(err)
    })

}

return (
    <div className="uploader">
        <span value={image}></span>
        <h2 className="header">Upload Picture</h2>

        <input className="input-file" onChange={ (e) => { setFile(e.target.files) } } type="file" accept="image/*"/>
        
        <button className="upload-btn" onClick={ handleUpload }>Upload !</button>

        <h4 className="successful" >{ msg && <span>{msg}</span> }</h4>

    </div>
)
}

export default Uploader