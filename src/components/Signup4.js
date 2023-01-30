import React, { useState } from 'react'
import { Alert, Button, Col, ProgressBar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Signup4 = ({ state, setState }) => {

    const [read, setRead] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        setState({ ...state, transition: 5 })
    }

    if (state.transition !== 4) return null
    return (
        <div className="animate__animated animate__fadeInRight">
            <h1 className="text-center mb-4" style={{ fontSize: "72px", }}>Terms of Service</h1>
            <Row className="mx-3">
                <Col className="px-1"><ProgressBar variant="success" now={100} key={0} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={100} key={1} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={100} key={2} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={100} key={3} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={0} key={4} /></Col>
            </Row>

            <Row>
                <Col xs={12} lg={{ span: 6, offset: 3 }}>
                    <p className='text-center my-5' style={{ fontSize: "18px" }}>
                        By continuing you acknowledge that you have read and consent to abiding by the Terms of Service detailed here:
                    </p>
                    <div className="text-center" onClick={() => setRead(true)}>
                        <a target="_blank" href="/terms"
                            className="text-center my-5 text-info" style={{ fontSize: "20px" }}
                        >View Terms of Service
                        </a>
                    </div>

                    <Button variant="info" block className="mt-5 mb-3" disabled={!read}
                        onClick={submitHandler}
                    >I Agree
                    </Button>
                    <div className="text-center">
                        <Link className="text-center my-4" style={{ cursor: "pointer" }}>
                            I Disagree
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Signup4
