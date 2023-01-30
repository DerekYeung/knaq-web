import React from 'react'
import { Button, Col, Container, Form, ProgressBar, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


const Forgot3 = ({ state, setState }) => {

    const history = useHistory()
    const submitHandler = (e) => {
        e.preventDefault()
    }

    if (state.transition !== 3) return null
    return (
        <div className="animate__animated animate__fadeInRight">
            <h1 className="text-center mb-4" style={{ fontSize: "72px" }}>Password successfully updated!</h1>
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
            <div className="text-center">
                <i className="my-5 fas fa-check-circle text-success" style={{ fontSize: "200px" }}></i>
            </div>
            <Row>
                <Col xs={12} lg={{ span: 6, offset: 3 }}>
                    <Button variant="info" block className="mb-3" disabled={!state.newPassword || !state.confirmPassword}
                        onClick={() => history.push("/profile")}>Finish</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Forgot3
