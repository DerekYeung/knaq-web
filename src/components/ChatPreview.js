import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { NavContextUpdate } from '../contexts/NavContext'
import moment from 'moment'
import { UserContext } from '../contexts/UserContext'
import { useMutation } from 'react-query'
import axios from 'axios'


const ChatPreview = ({ room }) => {

    const updateNav = useContext(NavContextUpdate)
    const user = useContext(UserContext)


    const prefix = room.lastMessage.senderId === user.id
        ? "You:"
        : room.title !== room.lastMessage.sender
            ? room.lastMessage.sender + ":"
            : ""

    const chatHandler = () => {
        updateNav({ type: "CHAT_ID", payload: { ...room } })
        updateNav({ type: "CHAT_SETTINGS", payload: false })
    }

    return (
        <div key={room.id} className="border-bottom py-3" style={{ cursor: "pointer" }}
            onClick={chatHandler}>
            <Row >
                <Col xs="auto">
                    <Row className="m-0">
                        <div className='mx-auto'
                            style={{
                                width: "50px", height: "50px", borderRadius: "100%",
                                backgroundImage: `url(${room.iconUrl || "/images/Logo.png"})`,
                                backgroundSize: "cover"
                            }}>
                        </div>
                    </Row>
                    {room.memberCount > 2 &&
                        <Row className="m-0 justify-content-center mt-1">
                            <i className="fas fa-users mt-2 mr-1"></i>
                            <span className="mt-1" style={{ fontSize: "14px" }}>
                                {room.memberCount}
                            </span>
                        </Row>}
                </Col>
                <Col>
                    <Row>
                        <Col className="p-0">
                            <strong style={{ fontSize: "16px" }} className="line-clamp">
                                {room.title}
                            </strong>
                        </Col>
                        <Col xs="auto" className="ml-auto text-muted" style={{ fontSize: "12px" }}>
                            {moment(room.lastMessage && room.lastMessage.time).fromNow()}
                        </Col>
                    </Row>
                    <Row className={room.lastMessage ? room.lastMessage.id === room.lastReadMessageId ? "text-muted" : "font-weight-bold" : "text-muted"}
                        style={{ fontSize: "12px" }}>
                        <Col className='pl-0'>
                            <div style={{ overflow: "hidden", wordBreak: "break-all", height: "1rem" }}>
                                {prefix} {room.lastMessage
                                    ? room.lastMessage.type == "post"
                                        ? "Shared a post" : room.lastMessage.text
                                    : `Chat Room Created`}
                            </div>
                        </Col>
                    </Row>
                    {room.memberCount > 2 &&
                        <Row className="mt-2">
                            {room.members.map(member =>
                            (<img key={member.id} src={member.avatarUrl || "/images/Logo.png"}
                                style={{ height: "20px", width: "20px", borderRadius: "100%" }}
                                className="mr-1"
                            />)
                            )}
                        </Row>}
                </Col>
            </Row>
        </div>
    )
}

export default ChatPreview
