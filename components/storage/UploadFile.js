import firebase from "firebase/app"
import "firebase/storage"
import { useRef } from "react";
import { useState } from "react"

const UploadFile = () => {
    const inputEl = useRef(null); 
    const [value, setValue] = useState(0);

    function uploadFile() {
        let file = inputEl.current.files[0];
        let storageRef = firebase.storage().ref("user_upload/" + file.name);
        let task = storageRef.put(file);
        task.on('state_change', function progress(snapshot) {
            setValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }, function error(err) {
            alert(err)
        }, 
        function complete() {
            alert("Uploaded to firebase storage successfully!")
        })
    }

    return (
        <>
            <progress value={value} max="100"></progress>
            <input type="file" onChange={uploadFile} ref={inputEl}></input>
        </>)
}
export default UploadFile;