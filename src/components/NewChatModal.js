import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { NavContextUpdate } from '../contexts/NavContext';
import { UserContext } from '../contexts/UserContext';

const NewChatModal = ({ show, setShow }) => {

    const user = useContext(UserContext)
    const updateNav = useContext(NavContextUpdate)

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [raw, setRaw] = useState([]);
    const [selected, setSelected] = useState([]);

    // Create New Room
    const { mutate, reset } = useMutation(() => {
        return axios.post(
            `https://api.knaqapp.com/api/chat/room`,
            { members: selected.map(user => user.id) },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onSuccess: (data) => {
            reset()
            updateNav({ type: "CHAT_ID", payload: data.data.data })
            closeHandler()
        },
    })

    // Search for People
    const { refetch } = useQuery(`search=${search}`, () => {
        return axios.get(`https://api.knaqapp.com/api/user/find?q=${search}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            let raw = data.data.data
            raw = raw.filter(search => search.id !== user.id)
            setRaw([...raw])
        },
        enabled: !!search
    })
    // Select People
    const toggleHandler = (user) => {
        let temp = [...selected]
        if (temp.find(selected => selected.id === user.id)) {
            temp = temp.filter(selected => selected.id !== user.id)
        } else {
            temp.push(user)
        }
        setSelected(temp)
        console.log(temp)
    }

    // Close Modal and Reset
    const closeHandler = () => {
        setShow(false)
        setLoading(false)
        setSearch('')
        setSelected([])
    }

    // Check and Create Room
    const createHandler = async () => {
        setLoading(true)
        // Check if Exists
        const { data } = await axios.get(`https://api.knaqapp.com/api/chat/rooms`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
        let rooms = data.data
        let exists = rooms.find(room => {
            if (room.memberCount !== (selected.length + 1)) return false
            for (const user of selected) {
                if (!room.members.find(member => member.id === user.id)) return false
            }
            return true
        })
        if (exists) { // Push to Existing
            updateNav({ type: "CHAT_ID", payload: { ...exists } })
            closeHandler()
        }
        else { // Create New Room
            mutate()
        }
    }

    return (

        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>New Chat</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0">
                <Form inline onSubmit={(e) => e.preventDefault()}>
                    <Form.Control value={search} placeholder="Search for people" disabled={loading}
                        className="py-0 mx-auto text-center px-5"
                        style={{ borderRadius: "25px", height: "36px" }}
                        onChange={(e) => setSearch(e.target.value)} />
                </Form>
                <div style={{ height: "calc(100vh - 450px)", overflowY: "scroll" }} className="hiddenScroll px-5 mt-2">
                    {search && raw.map(user => (
                        <Row key={user.id} className="border-bottom"
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleHandler(user)}>
                            <Col xs="auto" className="d-flex align-items-center">
                                <img src={user.avatarUrl || "/images/Logo.png"} style={{ height: "50px", width: "50px", borderRadius: "100%" }}></img>
                            </Col>
                            <Col className=" d-flex align-items-center px-0 py-4 font-weight-bold" style={{ fontSize: "16px" }}>
                                {user.displayName}
                            </Col>
                            <Col xs="auto" className="d-flex align-items-center">
                                {(selected.find(s => s.id === user.id)) && <i className="fas fa-lg fa-check-circle text-info" />}
                            </Col>
                        </Row>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="info" className="px-5 py-2" onClick={createHandler} disabled={loading}>
                    Add Selected
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewChatModal;
