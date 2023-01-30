import axios from 'axios'
import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { NavContext, NavContextUpdate } from '../contexts/NavContext'
import { UserContext } from '../contexts/UserContext'

const VoicePreview = ({ room }) => {

    const user = useContext(UserContext)
    const nav = useContext(NavContext)
    const updateNav = useContext(NavContextUpdate)


    const roomHandler = async () => {
        updateNav({ type: "VOICE_ID", payload: { ...room } })
        nav.voiceRefetch()
    }

    return (
        <div className="border py-3 my-2" style={{ cursor: "pointer", borderRadius: "20px" }}
            onClick={roomHandler}>
            <Row className="mx-0">
                <Col xs={3} className="">
                    <Row className="m-0">
                        <div className='mx-auto'
                            style={{
                                width: "70px", height: "70px", borderRadius: "100%",
                                backgroundImage: `url(${room.image || "/images/Logo.png"})`,
                                backgroundSize: "cover"
                            }}>
                        </div>
                    </Row>
                    <Row className="m-0 justify-content-center mt-1">
                        <i className="fas fa-microphone mt-2 mr-1"></i>
                        <span className="mt-1" style={{ fontSize: "14px" }}>
                            {room.members.length}
                        </span>
                    </Row>
                </Col>
                <Col xs={9} className="border-left px-3">
                    <div className="m-0">
                        <strong style={{ fontSize: "16px" }}>
                            {room.title}
                        </strong>
                        {room.type === "Group" && <i className="fas fa-users ml-2"></i>}
                        {true && <i className="fas fa-globe-americas ml-2"></i>}
                        {room.type === "Locked" && <i className="fas fa-lock ml-2"></i>}
                    </div>
                    <Row className="">
                        {room.members.map(member =>
                        (<Col xs={3} key={member.id} className="py-1 px-1 text-center">
                            <div className='mx-auto'
                                style={{
                                    width: "50px", height: "50px", borderRadius: "100%",
                                    backgroundImage: `url(${member.avatarUrl || "/images/Logo.png"})`,
                                    backgroundSize: "cover"
                                }}>
                            </div>
                            <div className="line-clamp">
                                {/* <div style> */}
                                {member.displayName}
                            </div>
                        </Col>)
                        )}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default VoicePreview
