import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext'
import { useMutation } from 'react-query'
import axios from 'axios'
import { NavContext, NavContextUpdate } from '../contexts/NavContext';


const RenameChatModal = ({ show, setShow }) => {

    const user = useContext(UserContext)
    const nav = useContext(NavContext)
    const updateNav = useContext(NavContextUpdate)
    const [title, setTitle] = useState("");

    // Rename
    const { mutate, isLoading, reset } = useMutation(title => {
        return axios.put(
            `https://api.knaqapp.com/api/chat/${nav.chat.id}/title`,
            { title: title },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onSuccess: (data) => {
            reset()
            updateNav({ type: "CHAT_ID", payload: { ...data.data.data } })
            updateNav({ type: "CHAT_SETTINGS", payload: false })
            setShow(false)
        },
    })

    const renameHandler = () => {
        mutate(title)
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Rename Chat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="px-5" onSubmit={renameHandler}>
                    <Form.Control className="text-center" placeholder={nav.chat.title} value={title} disabled={isLoading}
                        onChange={(e) => { setTitle(e.target.value) }}>
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" className="px-5 py-2" onClick={renameHandler} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RenameChatModal;
