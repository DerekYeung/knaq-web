import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import UploadPhoto from './UploadPhoto';
import '../upload.css'

const UploadPhotoModal = ({ show, setShow, setVideoFile }) => {

    const [file, setFile] = useState(null)
    // const [cropUrl, setCropUrl] = useState("")

    useEffect(() => { if (!show) setFile(null) }, [show])

    const closeHandler = () => {
        setShow(false)

    }
    const setHandler = () => {
        setShow(false)
        setVideoFile(file)
    }

    return (
        <Modal show={show} onHide={closeHandler} size="md" >
            <Modal.Header closeButton>
                <Modal.Title>Upload Video</Modal.Title>
            </Modal.Header>
            <div id="bodyContainer" style={{ paddingTop: `${file ? "0px" : "70%"}`, position: "relative" }}>
                <div id='modalBody' className="px-5 text-center upload" style={{ position: "absolute", height: "100%", width: "100%", top: 0 }}>
                    {!file &&
                        <form className="d-flex" style={{ height: "100%", position: "relative" }}>
                            <input type="file" accept="video/*" style={{ position: "absolute" }}
                                onChange={(e) => setFile(e.target.files[0])} />
                            <p className='my-auto'>Drag your files here or click in this area!</p>
                        </form>}
                </div>
                {file && <div className="text-center p-5">{file?.name}</div>}
            </div>
            <Modal.Footer>
                <Button variant="info" className="px-5 py-2" onClick={setHandler} disabled={false}>
                    Attach
                </Button>
            </Modal.Footer>
        </Modal >
    );
};

export default UploadPhotoModal;
