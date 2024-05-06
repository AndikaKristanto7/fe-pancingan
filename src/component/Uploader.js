import { useEffect, useRef, useState } from "react"
import '../style/uploader.css'
import BeApp from '../helpers/api_call/BeApp'

function Uploader({image,onSetImageChange}){

const [ file, setFile ] = useState(null);
const [ msg, setMsg ] = useState(null);
const [beforeUpload, setBeforeUpload] = useState(null)
const [afterUpload, setAfterUpload] = useState(null)
const [validateUploadState, setValidateUploadState] = useState(true)
const fileUpload = useRef(null);
const [isUpload, setIsUpload] = useState(false)

useEffect(() => {
    validateUpload(beforeUpload,afterUpload)
},[beforeUpload])

const validateUpload = (before,after) => {
    let validate = true;
    if(
        (before && Object.keys(before) !== 0) 
        && 
        (after && Object.keys(after) !== 0)
    ){
        console.log(before,after)
        let isSameFilename = before.name === after.name
        if(isSameFilename){
            validate = false
            setMsg("Dont upload same file!")
        }else{
            validate = true
            fileUpload.current.click()
        } 
    }
    setValidateUploadState(validate)
    return validate;
}
function handleUpload(e) {
    e.stopPropagation()
    e.preventDefault()

    if (!file) {
        setMsg("No file selected");
        return;
    }
    setBeforeUpload(file[0])
    if(!validateUpload(beforeUpload,afterUpload)){
        return;
    }
    setIsUpload(true)
    setMsg("Uploading...");
    BeApp.postUpload({file:file[0]})
    .then((res)=>{
        onSetImageChange(res.data.url)
        setMsg(false)
        setAfterUpload(file[0])
        setIsUpload(false)
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
        
        <button className="upload-btn" ref={fileUpload} onClick={ handleUpload } disabled={isUpload ? 'disabled' : ''}>Upload !</button>

        <h4 className="successful" >{ msg && <span>{msg}</span> }</h4>

    </div>
)
}

export default Uploader