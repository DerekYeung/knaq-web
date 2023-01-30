import React from 'react'
import { Button, Col, Container, Form, ProgressBar, Row } from 'react-bootstrap'

const Forgot2 = ({ state, setState }) => {

    const submitHandler = (e) => {
        e.preventDefault()
    }

    if (state.transition !== 2) return null
    return (
        <div className="animate__animated animate__fadeInRight">
            <h1 className="text-center mb-4" style={{ fontSize: "72px", marginTop: "66px", marginBottom: "22" }}>Set New Password</h1>
            <Row className="mx-3">
                <Col className="px-1">
                    <ProgressBar variant="success" now={100} key={0} />
                </Col>
                <Col className="px-1">
                    <ProgressBar variant="success" now={100} key={1} />
                </Col>
                <Col className="px-1">
                    <ProgressBar variant="success" now={100} key={2} />
                </Col>
                <Col className="px-1">
                    <ProgressBar variant="success" now={0} key={3} />
                </Col>
            </Row>

            <p className='text-center my-5' style={{ fontSize: "20px" }}>Please enter your new password below</p>
            <Row>
                <Col xs={12} lg={{ span: 6, offset: 3 }}>
                    <Form onSubmit={submitHandler} className="">
                        <Form.Group controlId='newPassword'>
                            <Form.Control type='password' placeholder='New Password' value={state.newPassword} required
                                onChange={(e) => setState({ ...state, newPassword: e.target.value })}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Control type='password' placeholder='Confirm New Password' value={state.confirmPassword} required
                                onChange={(e) => setState({ ...state, confirmPassword: e.target.value })}>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="info" block className="mt-4 mb-3" disabled={!state.newPassword || !state.confirmPassword}
                            onClick={() => setState({ ...state, transition: 3 })}>Next</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Forgot2
