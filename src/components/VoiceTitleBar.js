import React, { useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { NavContext, NavContextUpdate } from '../contexts/NavContext'

const VoiceTitleBar = () => {

    const nav = useContext(NavContext)
    const updateNav = useContext(NavContextUpdate)

    const closeHandler = () => {
        updateNav({ type: "VOICE_ID", payload: "" })
    }
    const openSettingsHandler = () => {
        // updateNav({ type: "VOICE_SETTINGS", payload: true })
    }
    const closeSettingsHandler = () => {
        // updateNav({ type: "VOICE_SETTINGS", payload: false })
    }


    return (
        <Row style={{ height: "60px" }} className="align-items-center mx-0">
            {/* {!nav.voiceSettings
                ? <Col xs="auto" style={{ cursor: "pointer" }}
                    onClick={closeHandler}>
                    Close
                </Col>
                : <Col xs="auto" style={{ cursor: "pointer" }}
                    onClick={closeSettingsHandler}>
                    Back
                </Col>
            } */}
            <Col className="text-center px-0">
                <img src={nav.voice.image || "/images/Logo.png"}
                    style={{ height: "30px", width: "30px", borderRadius: "100%", marginTop: "-4px" }}
                    className="mr-1"
                />
                <strong style={{ fontSize: "16px" }} >
                    {nav.voiceSettings
                        ? "Voice Settings"
                        : nav.voice.title
                    }
                    {nav.voice.type === "Group" && <i className="fas fa-users ml-2"></i>}
                    {true && <i className="fas fa-globe-americas ml-2"></i>}
                    {nav.voice.type === "Locked" && <i className="fas fa-lock ml-2"></i>}
                </strong>
            </Col>
            {/* <Col xs="auto" className="ml-auto">
                {!nav.voiceSettings
                    ? <Button variant="secondary" className="py-1 px-2"
                        onClick={openSettingsHandler}>
                        <i className="fas fa-cog fa-lg"></i>
                    </Button>
                    : <div className='px-3'></div>
                }
            </Col> */}
        </Row>
    )
}

export default VoiceTitleBar
