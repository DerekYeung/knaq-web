import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext'
import { useMutation } from 'react-query'
import axios from 'axios'
import { NavContext, NavContextUpdate } from '../contexts/NavContext';


const LeaveChatModal = ({ show, setShow }) => {

    const user = useContext(UserContext)
    const nav = useContext(NavContext)
    const updateNav = useContext(NavContextUpdate)

    // Rename
    const { mutate, isLoading, reset } = useMutation(() => {
        return axios.post(
            `https://api.knaqapp.com/api/chat/${nav.chat.id}/leave`,
            {},
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onSuccess: (data) => {
            reset()
            updateNav({ type: "CHAT_ID", payload: "" })
            updateNav({ type: "CHAT_SETTINGS", payload: false })
            setShow(false)
        },
    })

    const leaveHandler = () => {
        mutate()
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} centered={false}>
            <Modal.Header closeButton>
                <Modal.Title>Leave Chat?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                Unsaved chat messages will be lost after leaving
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="px-5 py-2" onClick={() => setShow(false)}>
                    No
                </Button>
                <Button variant="danger" className="px-5 py-2" onClick={leaveHandler} disabled={isLoading}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LeaveChatModal;
