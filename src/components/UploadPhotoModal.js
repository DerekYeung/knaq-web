import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import UploadPhoto from './UploadPhoto';
import '../upload.css'

const UploadPhotoModal = ({ show, setShow, setCropUrl, setCropBlob, cropType }) => {

    const [file, setFile] = useState(null)
    // const [cropUrl, setCropUrl] = useState("")

    useEffect(() => { if (!show) setFile(null) }, [show])

    const closeHandler = () => {
        setCropUrl("")
        setShow(false)

    }
    const setHandler = () => {
        setShow(false)
    }

    return (
        <Modal show={show} onHide={closeHandler} size={file ? "lg" : "md"} dialogClassName={file ? "photoModal" : ""} >
            <Modal.Header closeButton>
                <Modal.Title>Upload Photo</Modal.Title>
            </Modal.Header>
            <div id="bodyContainer" style={{ paddingTop: `${file ? "0px" : "70%"}`, position: "relative" }}>
                <div id='modalBody' className="px-5 text-center upload" style={{ position: "absolute", height: "100%", width: "100%", top: 0 }}>
                    {!file &&
                        <form className="d-flex" style={{ height: "100%", position: "relative" }}>
                            <input type="file" accept="image/*" style={{ position: "absolute" }}
                                onChange={(e) => setFile(e.target.files[0])} />
                            <p className='my-auto'>Drag your files here or click in this area!</p>
                        </form>}
                </div>
                {/* <div className="text-center p-5"></div> */}
                <UploadPhoto file={file || ""} setCropUrl={setCropUrl} setCropBlob={setCropBlob}
                    circleCrop={cropType == "circle"} noCrop={cropType == "noCrop"} />
            </div>
            <Modal.Footer>
                <Button variant="info" className="px-5 py-2" onClick={setHandler} disabled={false}>
                    Set Photo
                </Button>
            </Modal.Footer>
        </Modal >
    );
};

export default UploadPhotoModal;
