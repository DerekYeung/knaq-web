import React from 'react'
import { Button, Col, Container, Form, ProgressBar, Row } from 'react-bootstrap'

const Forgot0 = ({ state, setState }) => {

    const submitHandler = (e) => {
        e.preventDefault()
    }

    if (state.transition !== 0) return null
    return (
        <div className="">
            <h1 className="text-center mb-4" style={{ fontSize: "72px", marginTop: "66px", marginBottom: "22" }}>Forgot Password</h1>
            <Row className="mx-3">
                <Col className="px-1">
                    <ProgressBar variant="success" now={100} key={0} />
                </Col>
                <Col className="px-1">
                    <ProgressBar variant="success" now={0} key={1} />
                </Col>
                <Col className="px-1">
                    <ProgressBar variant="success" now={0} key={2} />
                </Col>
                <Col className="px-1">
                    <ProgressBar variant="success" now={0} key={3} />
                </Col>
            </Row>

            <p className='text-center my-5' style={{ fontSize: "20px" }}>Please enter your username and phone number</p>
            <Row>
                <Col xs={12} lg={{ span: 6, offset: 3 }}>
                    <Form onSubmit={submitHandler} className="">
                        <Form.Group controlId='username'>
                            <Form.Control type='username' placeholder='Email or Username' value={state.username} required
                                onChange={(e) => setState({ ...state, username: e.target.value })}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='phone'>
                            <Form.Control type='phone' placeholder='Phone Number' value={state.phone} required
                                onChange={(e) => setState({ ...state, phone: e.target.value })}>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="info" block className="mt-4 mb-3" disabled={!state.phone || !state.username}
                            onClick={() => setState({ ...state, transition: 1 })}>Next</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Forgot0
