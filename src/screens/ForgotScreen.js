import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Forgot0 from '../components/Forgot0'
import Forgot1 from '../components/Forgot1'
import Forgot2 from '../components/Forgot2'
import Forgot3 from '../components/Forgot3'

const Forgot = () => {

    const [state, setState] = useState({
        transition: 0,
        username: "",
        phone: "",
        code: "",
        newPassword: "",
        confirmPassword: "",
    })


    return (
        <Container className="my-5 py-xs-3 py-lg-5 ">
            <Row>
                <Col xs={12} xl={{ span: 10, offset: 1 }}>
                    <Forgot0 state={state} setState={setState} />
                    <Forgot1 state={state} setState={setState} />
                    <Forgot2 state={state} setState={setState} />
                    <Forgot3 state={state} setState={setState} />
                </Col>
            </Row>

        </Container >
    )
}

export default Forgot
