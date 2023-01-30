import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { NavContext, NavContextUpdate } from '../contexts/NavContext';
import { UserContext } from '../contexts/UserContext';

const MuteChatToggle = () => {

    const user = useContext(UserContext)
    const nav = useContext(NavContext)

    // Mute Toggle Mutate
    const { mutate, isLoading } = useMutation((checked) => {
        return axios.post(
            `https://api.knaqapp.com/api/chat/${nav.chat.id}/muteNotification`,
            { isOn: checked },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    })

    const muteHandler = (e) => {
        console.log(e.target.checked)
        mutate(e.target.checked)
    }

    return (
        <Form style={{ cursor: "pointer" }}>
            <Form.Check
                defaultChecked={nav.chat.muteNotification}
                type="switch"
                id="custom-switch"
                onChange={(e) => muteHandler(e)}
                disabled={isLoading}
                style={{ cursor: "pointer" }}
            />
        </Form>
    );
};

export default MuteChatToggle;
