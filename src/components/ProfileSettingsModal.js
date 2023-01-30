import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { UserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom'
import UploadPhotoModal from './UploadPhotoModal';
import BlockedUsers from './BlockedUsers';
import ProfileTiers from './ProfileTiers';

const ProfileSettingsModal = ({ show, setShow, refetchProfile, profile }) => {

    const user = useContext(UserContext)
    const [form, setForm] = useState({ ...user })

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const [showAvatar, setShowAvatar] = useState(false);
    const [cropAvatarUrl, setCropAvatarUrl] = useState("")
    const [cropAvatarBlob, setCropAvatarBlob] = useState("")

    const [showBackground, setShowBackground] = useState(false);
    const [cropBackgroundUrl, setCropBackgroundUrl] = useState("")
    const [cropBackgroundBlob, setCropBackgroundBlob] = useState("")

    const myModal = useRef(null)


    const { mutate: saveHandler, isLoading } = useMutation(() => {
        myModal.current.scrollIntoView({ behavior: "smooth" })
        const formData = new FormData()
        formData.append('displayName', form.displayName)
        formData.append('description', form.description)
        formData.append('nsfwFilter', form.nsfwFilter ? "true" : "")
        if (cropAvatarBlob) formData.append('avatar', cropAvatarBlob)
        if (cropBackgroundBlob) formData.append('backgroundImg', cropBackgroundBlob)
        console.log(form.avatar)
        return axios.put(`https://api.knaqapp.com/api/me`, formData,
            { headers: { Authorization: `Bearer ${user.token}` } })
    }, {
        onSuccess: (data) => {
            console.log(data.data)
            setSuccess(`Profile Update Success`)
            setError('')
            refetchProfile() // Invalidate
        },
        onError: (error) => {
            setError(error.response && error.response.data.message
                ? error.response.data.message : error.message)
        }
    })

    const closeHandler = () => {
        setShow(false)
    }

    useEffect(() => {
        if (!show) {
            setSuccess('')
            setError('')
            setForm({})
            setCropAvatarUrl("")
        } else setForm({ ...user })
    }, [show])

    return (
        <Modal show={show} onHide={closeHandler} >
            <div id='wholeModal' >
                <UploadPhotoModal show={showAvatar} setShow={setShowAvatar}
                    setCropUrl={setCropAvatarUrl} setCropBlob={setCropAvatarBlob} cropType="circle"
                />
                <UploadPhotoModal show={showBackground} setShow={setShowBackground}
                    setCropUrl={setCropBackgroundUrl} setCropBlob={setCropBackgroundBlob} cropType="noCrop"
                />
                {(showAvatar || showBackground) &&
                    <div style={{
                        position: "absolute", height: "100%", width: "calc(100% + 1px)", zIndex: "5",
                        backgroundColor: "rgba(0,0,0,0.6)", borderRadius: "19px"
                    }} />
                }
                <Modal.Header closeButton ref={myModal}>
                    <Modal.Title>Profile Settings</Modal.Title>
                </Modal.Header>

                <div id='modal body' className="px-5">
                    {success && <Alert variant='success'>{success}</Alert>}
                    {error && <Alert variant='danger'>{error}</Alert>}

                    <div className="border-bottom pb-4">
                        <h4 className="my-2">Edit Profile</h4>
                        {/* <Button onClick={() => { setShowAvatar(true) }}>Profile Photo</Button> */}
                        <Row className="">
                            <Col>
                                <div style={{
                                    paddingBottom: "50%", width: "50%", borderRadius: "100px", margin: "5px 25%",
                                    backgroundImage: `url(${cropAvatarUrl || user.avatarUrl || "/images/Logo.png"})`,
                                    backgroundSize: "cover", backgroundRepeat: "no-repeat",
                                    cursor: "pointer"
                                }}
                                    onClick={() => { setShowAvatar(true) }}
                                />
                                <p className="text-center">Change Profile Picture</p>
                            </Col>
                            <Col>
                                <div style={{
                                    paddingBottom: "50%", width: "100%", borderRadius: "20px", margin: "5px 0px",
                                    backgroundImage: `url(${cropBackgroundUrl || user.backgroundUrl || "/images/forestBackground.jpg"})`,
                                    backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer"
                                }}
                                    onClick={() => { setShowBackground(true) }}
                                />
                                <p className="text-center">Change Background Photo</p>
                            </Col>
                        </Row>

                        <Form className="px-3 mt-4">
                            {/* <Form.Group>
                                <Form.Label>Paymail</Form.Label>
                                <Form.Control placeholder='Paymail' value={form.paymail || ""} disabled
                                    onChange={(e) => { setForm({ ...form, paymail: e.target.value }) }}
                                />
                            </Form.Group> */}
                            <Form.Group>
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control placeholder='Display Name' value={form.displayName || ""}
                                    onChange={(e) => { setForm({ ...form, displayName: e.target.value }) }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control placeholder='Phone Number' value={form.phoneNumber || ""} disabled
                                    onChange={(e) => { setForm({ ...form, phoneNumber: e.target.value }) }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as='textarea' placeholder='Description' value={form.description || "Welcome to my profile!"}
                                    onChange={(e) => { setForm({ ...form, description: e.target.value }) }}
                                />
                            </Form.Group>
                            {/* <Form.File
                                accept='image/*'
                                id="profile-image"
                                label={form.avatar ? form.avatar.name : "No File Selected"}
                                custom
                                onChange={(e) => setForm({ ...form, avatar: e.target.files[0] })}
                            /> */}
                        </Form>
                    </div>

                    <ProfileTiers profile={profile} refetchProfile={refetchProfile} />
                    <BlockedUsers />

                    <div className="border-bottom">
                        <Row>
                            <Col>
                                <h4 className="my-3">Graphic Content Filter</h4>
                            </Col>
                            <Col xs='auto' className="ml-auto d-flex align-items-center">
                                <Form.Check type='switch' id="nsfwCheck" checked={form.nsfwFilter || false}
                                    onChange={(e) => { setForm({ ...form, nsfwFilter: !form.nsfwFilter }) }}
                                />
                            </Col>
                        </Row>
                    </div>


                </div>
                <Modal.Footer>
                    <Button variant="info" className="px-5 py-2" onClick={saveHandler} disabled={isLoading}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default ProfileSettingsModal;
