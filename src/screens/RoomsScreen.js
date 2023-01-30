import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import LeftNav from '../components/LeftNav'
import ChatRoomList from '../components/ChatRoomList'
import ChatRoomPage from '../components/ChatRoomPage'
import NewChatPrompt from '../components/NewChatPrompt'
import VoiceRoomPage from '../components/VoiceRoomPage'
import NewVoicePrompt from '../components/NewVoicePrompt'
import VoiceRoomList from '../components/VoiceRoomList'

import { NavContext } from '../contexts/NavContext'
import ChatHeader from '../components/ChatHeader'
import ChatTitleBar from '../components/ChatTitleBar'
import ChatSettings from '../components/ChatSettings'
import VoiceHeader from '../components/VoiceHeader'
import VoiceTitleBar from '../components/VoiceTitleBar'
import VoiceSettings from '../components/VoiceSettings'


export const Rooms = () => {

    const nav = useContext(NavContext)

    return (
        <>
            <Container style={{ height: "100%" }}>
                <Row className="my-0 flex-nowrap" style={{ height: "100%" }}>
                    <Col xs={3} className="">
                        <LeftNav />
                    </Col>
                    <Col xs={4} className="border-right border-left px-0" style={{ height: "calc(100% + 60px)", marginTop: "-60px" }}>
                        {nav.roomType === "CHAT"
                            ? (<>
                                <ChatHeader />
                                <ChatRoomList />
                            </>)
                            : (<>
                                <VoiceHeader />
                                <VoiceRoomList />
                            </>)
                        }
                    </Col>
                    <Col xs={5} className="border-right px-0" style={{ height: "calc(100% + 60px)", marginTop: "-60px" }}>
                        {nav.roomType === "CHAT"
                            ? nav.chat.id
                                ? (<>
                                    <ChatTitleBar />
                                    {nav.chatSettings
                                        ? <ChatSettings />
                                        : <ChatRoomPage />
                                    }
                                </>)
                                : <NewChatPrompt />
                            : nav.voice.id
                                ? (<>
                                    <VoiceTitleBar />
                                    {nav.voiceSettings
                                        ? <VoiceSettings />
                                        : <VoiceRoomPage />
                                    }
                                </>)
                                : <NewVoicePrompt />
                        }

                    </Col>
                </Row>
            </Container >
        </>
    )
}
export default Rooms