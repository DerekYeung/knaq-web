import React, { useState } from 'react'
import { Alert, Button, Col, Form, ProgressBar, Row } from 'react-bootstrap'
import { useMutation } from 'react-query'
import axios from 'axios'

const Signup1 = ({ state, setState }) => {

    const [error, setError] = useState("")
    const [resent, setResent] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        mutate()
        // setState({ ...state, transition: 2 })
    }

    const { mutate, isLoading } = useMutation(() => {
        // return axios.post(`https://api.knaqapp.com/api/auth/code_check`,
        return axios.post(`https://api.knaqapp.com/api/auth/forgot_code_check`,
            { phoneNumber: state.phoneNumber, code: state.code }
        )
    }, {
        onSuccess: (data) => {
            console.log(data.data)
            setState({ ...state, transition: 2 })
            setError('')
        },
        onError: (error) => {
            setError(error.response && error.response.data.message
                ? error.response.data.message : error.message)
        }
    })

    // Resend Code
    const { mutate: resendHandler } = useMutation(() => {
        return axios.post(`https://api.knaqapp.com/api/auth/code_request`,
            { phoneNumber: state.phoneNumber }
        )
    }, {
        onSuccess: (data) => {
            console.log(data.data)
            setResent(true)
            setError('')
        },
        onError: (error) => {
            // setResent(true)
            setError(error.response && error.response.data.message
                ? error.response.data.message : error.message)
        }
    })

    if (state.transition !== 1) return null
    return (
        <div className="animate__animated animate__fadeInRight">
            <h1 className="text-center mb-4" style={{ fontSize: "72px", }}>We sent you a verification code </h1>
            <Row className="mx-3">
                <Col className="px-1"><ProgressBar variant="success" now={100} key={0} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={100} key={1} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={0} key={2} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={0} key={3} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={0} key={4} /></Col>
            </Row>

            <p className='text-center my-5' style={{ fontSize: "20px" }}>Please enter your code below</p>
            {!resent && <p className="text-center my-4 text-info" style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={resendHandler}>Resend Code</p>}
            {resent && <p className="text-center my-4 text-info" style={{ fontSize: "20px" }}>Sent Again to: {state.phoneNumber}</p>}

            <Row>
                <Col xs={12} lg={{ span: 6, offset: 3 }}>
                    {error ? <Alert variant='danger'>{error}</Alert> : <div style={{}} />}
                    <Form onSubmit={submitHandler} className="">
                        <Form.Group controlId='code'>
                            <Form.Control type='code' placeholder='Enter Code' value={state.code} required
                                onChange={(e) => setState({ ...state, code: e.target.value })}>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="info" block className="mt-4 mb-3" disabled={state.code.length < 6 || isLoading}
                            type="submit">
                            {isLoading ? "Loading" : "Next"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Signup1
