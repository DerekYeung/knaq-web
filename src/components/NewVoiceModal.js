import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { NavContext, NavContextUpdate } from '../contexts/NavContext';
import { UserContext } from '../contexts/UserContext';

const NewVoiceModal = ({ show, setShow }) => {

    const user = useContext(UserContext)
    const nav = useContext(NavContext)
    const updateNav = useContext(NavContextUpdate)

    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState("PUBLIC");
    const [newRoom, setNewRoom] = useState("");
    const [error, setError] = useState("");

    // Create New Room
    const { mutate } = useMutation(() => {
        return axios.post(
            `https://api.knaqapp.com/api/voiceRoom/create`,
            { title: title },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onSuccess: async (data) => {
            // Leave room if inside
            if (nav.voice.id) {
                await axios.post(`https://api.knaqapp.com/api/voiceroom/member/update-status`,
                    {
                        "roomId": nav.voice.id,
                        "userId": user.id,
                        "status": { "muted": true, "joined": false }
                    }, { headers: { Authorization: `Bearer ${user.token}` } })
            }
            setNewRoom(data.data.data)
            mutateJoin()
        },
        onError: (error) => {
            setError(error.response && error.response.data.message ? error.response.data.message : error.message)
            setLoading(false)
        },
    })
    // Join new Room
    const { mutate: mutateJoin } = useMutation(() => {
        console.log(newRoom)
        return axios.post(`https://api.knaqapp.com/api/voiceroom/member/update-status`,
            {
                "roomId": newRoom.id,
                "userId": user.id,
                "status": { "muted": false, "joined": true }
            }, { headers: { Authorization: `Bearer ${user.token}` } })
    }, {
        onSuccess: (data) => {
            updateNav({ type: "VOICE_ID", payload: newRoom })
            setError("")
            closeHandler()
            nav.voiceRefetch()
        },
        onError: (error) => {
            setError(error.response && error.response.data.message ? error.response.data.message : error.message)
            setLoading(false)
        },
    })



    // Close Modal and Reset
    const closeHandler = () => {
        setShow(false)
        setLoading(false)
        setTitle('')
        setSelected("PUBLIC")
    }

    // Check and Create Room
    const createHandler = async (e) => {
        e.preventDefault()
        console.log("create")
        setLoading(true)
        mutate()

    }

    return (

        <Modal show={show} onHide={closeHandler} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Create New Voice Room</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0">
                <Form onSubmit={createHandler}>
                    <Form.Control value={title} placeholder="Room Name" disabled={loading} required
                        className="py-0 mx-auto text-center"
                        style={{ borderRadius: "25px", height: "36px", width: "50%" }}
                        onChange={(e) => setTitle(e.target.value)} />
                    {error && <div className="text-center text-danger">{error}</div>}

                    <Row className="my-5">
                        <Col className="text-center">
                            <div className={selected === "PUBLIC" ? "font-weight-bold" : ""}>Public</div>
                            <div style={{
                                backgroundColor: selected === "PUBLIC" ? "#CCF2B8" : "",
                                color: selected === "PUBLIC" ? "white" : "",
                                borderRadius: "100px", width: "150px", height: "150px", cursor: "pointer"
                            }}
                                className="mx-auto d-flex justify-content-center align-items-center"
                                onClick={(() => setSelected("PUBLIC"))}>
                                <i className="fas fa-globe-americas fa-8x"></i>
                            </div>
                        </Col>
                        <Col className="text-center">
                            <div className={selected === "SOCIAL" ? "font-weight-bold" : ""}>Social</div>
                            <div style={{
                                backgroundColor: selected === "SOCIAL" ? "#FAEFC2" : "",
                                color: selected === "SOCIAL" ? "white" : "",
                                borderRadius: "100px", width: "150px", height: "150px", cursor: "pointer"
                            }}
                                className="mx-auto d-flex justify-content-center align-items-center"
                                onClick={(() => setSelected("SOCIAL"))}>
                                <i className="fas fa-users fa-7x"></i>
                            </div>
                        </Col>
                        <Col className="text-center">
                            <div className={selected === "EXCLUSIVE" ? "font-weight-bold" : ""}>Exclusive</div>
                            <div style={{
                                backgroundColor: selected === "EXCLUSIVE" ? "#F2B8B8" : "",
                                color: selected === "EXCLUSIVE" ? "white" : "",
                                borderRadius: "100px", width: "150px", height: "150px", cursor: "pointer"
                            }}
                                className="mx-auto d-flex justify-content-center align-items-center"
                                onClick={(() => setSelected("EXCLUSIVE"))}>
                                <i className="fas fa-lock fa-7x"></i>
                            </div>
                        </Col>
                    </Row>
                    {selected === "PUBLIC" && <div className="text-center">Start a room that's open to the public</div>}
                    {selected === "SOCIAL" && <div className="text-center">Start a room with your friends</div>}
                    {selected === "EXCLUSIVE" && <div className="text-center">Start a room requires a fee or invite to join</div>}
                    <div className="d-flex mt-3">
                        <Button variant="info" type="submit" className="mx-auto py-2" disabled={loading}>
                            {loading ? "Loading..." : "Start Voice Room"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewVoiceModal;
