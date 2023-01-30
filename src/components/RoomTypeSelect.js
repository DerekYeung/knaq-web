import React, { useContext } from 'react'
import { Container, Row, Col, Nav, Navbar, Form, Button, InputGroup, Image, Dropdown } from 'react-bootstrap'
import { NavContext, NavContextUpdate } from '../contexts/NavContext'
import ComingSoon from './ComingSoon'


const RoomTypeSelect = () => {


    const nav = useContext(NavContext)
    const updateNav = useContext(NavContextUpdate)

    const switchHandler = () => {
        updateNav({ type: "ROOM_TYPE", payload: nav.roomType === "CHAT" ? "VOICE" : "CHAT" })
    }

    return (
        <Dropdown >
            <Dropdown.Toggle variant="secondary" className="p-2 text-left"
                style={{ fontWeight: 800, fontSize: "16px", textTransform: "capitalize", width: "160px" }}>
                {nav.roomType === "CHAT" ? "Chat Rooms" : "Voice Rooms"}{" "}
                <i className="fas fa-caret-down"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="p-0">
                <div>
                    <ComingSoon direction="right">
                        <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: "5" }}></div>
                    </ComingSoon>

                    <Dropdown.Item className="p-2"
                        style={{ fontWeight: 800, fontSize: "16px", width: "160px" }}
                        onClick={switchHandler} disabled>
                        {nav.roomType !== "CHAT" ? "Chat Rooms" : "Voice Rooms"}
                    </Dropdown.Item>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default RoomTypeSelect
