import React from 'react'
import { Button, Col, Container, Form, ProgressBar, Row } from 'react-bootstrap'

const Forgot1 = ({ state, setState }) => {

    const submitHandler = (e) => {
        e.preventDefault()
    }

    if (state.transition !== 1) return null
    return (
        <div className="animate__animated animate__fadeInRight">
            <h1 className="text-center mb-4" style={{ fontSize: "72px" }}>We sent you a verification code</h1>
            <Row className="mx-3">
                <Col className="px-1">
                    <ProgressBar variant="success" now={100} key={0} />
                </Col>
                <Col className="px-1">
                    <ProgressBar variant="success" now={100} key={1} />
                </Col>
                <Col className="px-1">
                    <ProgressBar variant="success" now={0} key={2} />
                </Col>
                <Col className="px-1">
                    <ProgressBar variant="success" now={0} key={3} />
                </Col>
            </Row>

            <p className='text-center mt-5' style={{ fontSize: "20px" }}>Enter Code Below</p>
            <p className="text-center my-4 text-info" style={{ fontSize: "20px", cursor: "pointer" }}>Resend Code</p>
            <Row>
                <Col xs={12} lg={{ span: 6, offset: 3 }}>
                    <Form onSubmit={submitHandler} className="">
                        <Form.Group controlId='code'>
                            <Form.Control type='code' placeholder='Enter Code' value={state.code} required
                                onChange={(e) => setState({ ...state, code: e.target.value })}>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="info" block className="mt-4 mb-3" disabled={!state.code}
                            onClick={() => setState({ ...state, transition: 2 })}>Next</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Forgot1
