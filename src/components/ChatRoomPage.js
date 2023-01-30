import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { Col, Form, Row } from 'react-bootstrap'
import ChatMessages from './ChatMessages'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import { useState } from 'react';
import { NavContext } from '../contexts/NavContext';
import autosize from 'autosize'
import "../hiddenScroll.css"

const ChatRoomPage = () => {
    console.log("page")

    const user = useContext(UserContext)
    const nav = useContext(NavContext)
    const [message, setMessage] = useState(""); // Send Message
    const [raw, setRaw] = useState([]); // Passed to ChatMessages
    // const [settings, setSettings] = useState(false); // Passed to ChatTitleBar


    // Fetch Messages -> Passed to ChatMessages
    const { refetch } = useQuery(`chatRoom${nav.chat.id}`, () => {
        const URL = "https://api.knaqapp.com/api"
        return axios.get(URL + `/chat/${nav.chat.id}/messages?start=0`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            let newData = data.data.data.reverse()
            if (JSON.stringify(newData) === JSON.stringify(raw)) return
            setRaw([...newData])
            console.log("new chat messages activity")
            // Mark as read
            axios.post(
                `https://api.knaqapp.com/api/chat/${nav.chat.id}/read`,
                { messageId: newData[newData.length - 1] && newData[newData.length - 1].id },
                { headers: { Authorization: `Bearer ${user.token}` } }
            )
        },
        refetchOnWindowFocus: true,
        refetchInterval: 2000,
        notifyOnChangeProps: []
    })

    // Send Message
    const { mutate, isLoading, reset } = useMutation(message => {
        const URL = "https://api.knaqapp.com/api"
        return axios.post(
            `${URL}/chat/${nav.chat.id}/message`,
            { text: message },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onSuccess: (data) => {
            console.log(data.data)
            reset()
            refetch()
            setMessage(``)
            chatbar.current.focus();
        },
    })

    // Keep input focused and messages scrolled down
    const myScreen = useRef(); // passed to ChatMessages
    const chatbar = useRef();
    useEffect(() => { if (!nav.chatSettings) chatbar.current.focus(); }, [message, raw]);

    // Autosize ChatBar
    useEffect(() => { autosize(chatbar.current) }, [])
    useEffect(() => { chatbar.current.dispatchEvent(new Event('autosize:update', { 'bubbles': true })); }, [message])

    // Handlers
    const submitHandler = (e) => {
        e.preventDefault()
        if (!message || isLoading) return
        mutate(message)
    }


    return (
        <>
            <div className="fadedTop"></div>
            <div ref={myScreen}
                className="hiddenScroll px-2 pb-2 d-flex flex-column align-items-bottom"
                style={{ height: "calc(100vh - 60px - 50px)" }}
            >
                <ChatMessages raw={raw} myScreen={myScreen} />
            </div>

            <Row className="align-items-end border-top mx-0 py-2"
                style={{ minHeight: "50px", position: 'absolute', bottom: 0, backgroundColor: "white", width: "100%" }}>
                <Col xs="auto" className="">
                    <i className="far fa-image" style={{ fontSize: "22px", marginTop: "4px" }}></i>
                </Col>
                <Col className="px-0">
                    <Form onSubmit={submitHandler} >
                        <Form.Control ref={chatbar}
                            as="textarea" placeholder="Type Message"
                            className="py-1 mx-auto text-left"
                            rows={1}
                            style={{ borderRadius: "25px", minHeight: "30px", resize: "none" }}
                            value={message}
                            disabled={isLoading}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    console.log("Enter")
                                    console.log(e.target.form)
                                    e.target.form.dispatchEvent(new Event("submit", { 'bubbles': true }));
                                    e.preventDefault();
                                }
                            }}
                        />
                    </Form>
                </Col>
                <Col xs="auto" className="text-info" style={{ cursor: "pointer", marginBottom: "3px" }}
                    onClick={submitHandler}>
                    Send
                </Col>
            </Row>

        </>
    )
}

export default ChatRoomPage
