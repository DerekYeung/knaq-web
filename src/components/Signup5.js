import React, { useState } from 'react'
import { Alert, Button, Col, ProgressBar, Row } from 'react-bootstrap'
import { useMutation } from 'react-query'
import axios from 'axios'
import UploadPhotoModal from './UploadPhotoModal';

const Signup5 = ({ state, setState }) => {

    const [error, setError] = useState("")

    const [showAvatar, setShowAvatar] = useState(false);
    const [cropAvatarUrl, setCropAvatarUrl] = useState("")
    const [cropAvatarBlob, setCropAvatarBlob] = useState("")

    const submitHandler = () => {
        // setState({ ...state, transition: 6 })
        mutate()
    }
    const skipHandler = () => {
        setState({ ...state, transition: 6 })
    }

    const { mutate, isLoading } = useMutation(() => {
        const formData = new FormData()
        if (cropAvatarBlob) formData.append('avatar', cropAvatarBlob)
        return axios.put(`https://api.knaqapp.com/api/me`, formData,
            { headers: { Authorization: `Bearer ${state.token}` } })
    }, {
        onSuccess: (data) => {
            console.log(data.data)
            setState({ ...state, transition: 6 })
            setError('')
        },
        onError: (error) => {
            setCropAvatarBlob("")
            setCropAvatarUrl("")
            setError(error.response && error.response.data.message
                ? error.response.data.message : error.message)
        }
    })

    if (state.transition !== 5) return null
    return (
        <div className="animate__animated animate__fadeInRight">
            <UploadPhotoModal show={showAvatar} setShow={setShowAvatar}
                setCropUrl={setCropAvatarUrl} setCropBlob={setCropAvatarBlob} cropType="circle"
            />
            <h1 className="text-center mb-4" style={{ fontSize: "72px", }}>Add Profile Photo</h1>
            <Row className="mx-3">
                <Col className="px-1"><ProgressBar variant="success" now={100} key={0} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={100} key={1} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={100} key={2} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={100} key={3} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={100} key={4} /></Col>
            </Row>


            <Row>
                <Col xs={12} lg={{ span: 6, offset: 3 }}>
                    <p className='text-center my-5' style={{ fontSize: "20px" }}>
                        Add a profile photo so your friends know it's you
                    </p>
                    {error ? <Alert variant='danger'>{error}</Alert> : <div style={{}} />}

                    <div className="d-flex text-center justify-content-center">
                        {!cropAvatarUrl && <i className="fas fa-user-circle text-muted" style={{ fontSize: "200px" }}></i>}
                        {cropAvatarUrl &&
                            <div className="editHover" style={{
                                paddingBottom: "200px", width: "200px", borderRadius: "100px",
                                backgroundImage: `url(${cropAvatarUrl})`,
                                backgroundSize: "cover", backgroundRepeat: "no-repeat",
                            }}
                                onClick={() => setShowAvatar(true)}
                            />
                        }
                    </div>

                    {!cropAvatarUrl && <Button variant="info" block className="mt-5 mb-3"
                        type="button" onClick={() => setShowAvatar(true)}>
                        Add Photo
                    </Button>}
                    {cropAvatarUrl && <Button variant="success" block className="mt-5 mb-3" disabled={isLoading}
                        type="button" onClick={submitHandler}>
                        {isLoading ? "Loading" : "Finish"}
                    </Button>}
                    <div className="text-center">
                        <a style={{ cursor: "pointer" }} className="text-center my-4" onClick={skipHandler}>
                            Skip
                        </a>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Signup5
