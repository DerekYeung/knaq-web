import React, { useContext, useState } from 'react'
import { Container, Col, Row, Card, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'
import ComingSoon from '../components/ComingSoon'

const API_URL = "https://api.knaqapp.com/api"

const Login = () => {

    const history = useHistory()
    const user = useContext(UserContext)
    const userUpdate = useContext(UserContextUpdate)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState('')


    const { mutate, isLoading, reset } = useMutation(() => {
        console.log("mutate start")
        return axios.post(`${API_URL}/login`, { username, password })
    }, {
        onSuccess: (data) => {
            console.log(data.data)
            userUpdate({ type: "LOGIN", payload: data.data.data })
            // history.push('/')
            history.push('/home')
        },
        onError: (error) => {
            setError(error.response && error.response.data.message
                ? error.response.data.message : error.message)
        }
    })

    const submitHandler = (e) => {
        e.preventDefault()
        mutate()
    }

    return (
        <Container>
            <Row>
                <Col xs={12} lg={6} className="mt-5 p-5 d-none d-lg-block"
                    style={{
                        backgroundImage: "url('/images/Knaq-Logo-Final.png')",
                        backgroundSize: "80% 80%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        // height: "600px",
                    }}>
                </Col>
                <Col xs={12} lg={6} className="mt-5 p-5">
                    <Card className='p-5' style={{ borderRadius: "20px", borderWidth: "2px" }}>
                        <h1 className="text-center mt-5 mb-3">Sign In</h1>
                        {error ? <Alert variant='danger'>{error}</Alert> : <div style={{ height: "61.5px" }} />}

                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='username'>
                                <Form.Control type='username' placeholder='Email or Username' value={username} required
                                    onChange={(e) => setUsername(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Control type='password' placeholder='Password' value={password} required
                                    onChange={(e) => setPassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='remember'>
                                <Form.Check id='remember' type='checkbox' checked={remember} label="Remember Me for 30 Days"
                                    className="my-3"
                                    onChange={(e) => setRemember(e.target.checked)}>
                                </Form.Check>
                            </Form.Group>
                            <Button variant="info" type="submit" block className="mt-4 mb-3" disabled={isLoading}>
                                Submit
                            </Button>
                        </Form>

                        <Link to={'/signup'}>
                            <h5 className="text-center my-2">Sign Up</h5>
                        </Link>
                        <p className="text-center text-muted my-0">- or -</p>
                        {/* <Link to={'/forgot'}> */}
                        <ComingSoon direction='bottom'>
                            <Link to={'#'}>
                                <h5 className="text-center my-2">Forgot Password</h5>
                            </Link>
                        </ComingSoon>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
