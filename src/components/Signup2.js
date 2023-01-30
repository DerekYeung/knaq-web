import React, { useContext, useEffect, useState } from 'react'
import { UserContextUpdate } from '../contexts/UserContext'
import { Alert, Button, Col, Form, ProgressBar, Row } from 'react-bootstrap'
import { useMutation } from 'react-query'
import axios from 'axios'

const Signup2 = ({ state, setState }) => {

    const [error, setError] = useState("")
    const userUpdate = useContext(UserContextUpdate)

    //Account Is created before Terms of Service
    const submitHandler = (e) => {
        e.preventDefault()
        if (state.newPassword === state.confirmPassword) mutate()
        else setError("Passwords do not match")
    }
    useEffect(() => {
        setError('')
    }, [state.newPassword, state.confirmPassword])

    const { mutate, isLoading } = useMutation(() => {
        return axios.post(`https://api.knaqapp.com/api/signup`, {
            username: state.username, password: state.newPassword, referralCode: state.referral, phoneNumber: state.phoneNumber
        })
    }, {
        onSuccess: (data) => {
            console.log(data.data)
            setState({ ...state, transition: 3, token: data.data.data.token })
            userUpdate({ type: "LOGIN", payload: data.data.data })
            setError('')
        },
        onError: (error) => {
            setError(error.response && error.response.data.message
                ? error.response.data.message : error.message)
        }
    })


    if (state.transition !== 2) return null
    return (
        <div className="animate__animated animate__fadeInRight">
            <h1 className="text-center mb-4" style={{ fontSize: "72px", }}>Enter Username and Password</h1>
            <Row className="mx-3">
                <Col className="px-1"><ProgressBar variant="success" now={100} key={0} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={100} key={1} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={100} key={2} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={0} key={3} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={0} key={4} /></Col>
            </Row>

            <Row className="mt-5">
                <Col xs={12} lg={{ span: 6, offset: 3 }}>
                    {error ? <Alert variant='danger'>{error}</Alert> : <div style={{}} />}
                    <Form onSubmit={submitHandler} className="">
                        <Form.Group controlId='username'>
                            <Form.Control type='username' placeholder='Username' value={state.username} required
                                onChange={(e) => setState({ ...state, username: e.target.value })}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='newPassword'>
                            <Form.Control type='password' placeholder='Password' value={state.newPassword} required
                                onChange={(e) => setState({ ...state, newPassword: e.target.value })}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Control type='password' placeholder='Confirm Password' value={state.confirmPassword} required
                                onChange={(e) => setState({ ...state, confirmPassword: e.target.value })}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='referral'>
                            <Form.Control type='referral' placeholder='Referral Code (Optional)' value={state.referral}
                                onChange={(e) => setState({ ...state, referral: e.target.value })}>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="info" block className="mt-4 mb-3"
                            disabled={!state.username || !state.newPassword || !state.confirmPassword || isLoading}
                            type="submit">
                            {isLoading ? "Loading" : "Next"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Signup2
