import React, { useContext, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { NavContext, NavContextUpdate } from '../contexts/NavContext'
import RoomTypeSelect from './RoomTypeSelect'
import { UserContext } from '../contexts/UserContext'
import NewVoiceModal from './NewVoiceModal'

const VoiceHeader = () => {
    // import NewVoiceModal from './NewVoiceModal'

    const user = useContext(UserContext)
    const nav = useContext(NavContext)
    const updateNav = useContext(NavContextUpdate)

    const [show, setShow] = useState(false);

    const newRoomHandler = () => {
        setShow(true)
    }

    return (
        <>
            <div style={{ height: "60px" }}>
                <Row style={{ height: "100%" }} className="align-items-center mx-0">
                    <Col>
                        <RoomTypeSelect />
                    </Col>
                    <Col xs="auto" className="ml-auto">
                        <Button variant="secondary" className="py-1 px-2"
                            onClick={newRoomHandler}>
                            <i className="fas fa-plus fa-lg"></i>
                        </Button>
                    </Col>
                </Row>
            </div>
            <NewVoiceModal show={show} setShow={setShow} />
        </>
    );
};

export default VoiceHeader;
