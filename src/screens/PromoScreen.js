import React, { useState } from 'react'
import { Alert, Button, Col, Form, Image, InputGroup, Row } from 'react-bootstrap'
import StaticPage from '../components/StaticPage'
import { useMutation } from 'react-query'
import axios from 'axios'

const PromoScreen = () => {

    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const { mutate: waitlistHandler, isLoading } = useMutation((e) => {
        e.preventDefault()
        return axios.post(`/api/manualWaitlist`, { email })
    }, {
        onSuccess: (data) => {
            setSuccess(true)
            setError('')
        },
        onError: (error) => {
            setError(error.response && error.response.data.message
                ? error.response.data.message : error.message)
        }
    })

    return (
        <StaticPage>
            <Row className='m-0 px-4'>
                <Col lg={6}>
                    <Image src="\images\iPhone-Banner-XL.png"
                        className="" style={{ width: "100%" }} />
                </Col>
                <Col lg={6} className="my-auto">
                    <div>
                        <h1 className="mt-5 mt-lg-0" style={{ fontSize: "36px", fontWeight: "500", lineHeight: "1.2", textAlign: "center" }}>Knaq: Aligning Creators and their Communities</h1>
                        <h2 className="my-5" style={{ fontSize: "24px", fontWeight: "500", lineHeight: "1.8" }} >For Creators: Connect and reward your most loyal fanbase </h2>
                        <h2 className="my-5" style={{ fontSize: "24px", fontWeight: "500", lineHeight: "1.8" }} >For Fans: Interact-To-Earn exclusive experiences with your favorite Creators </h2>
                        {/* <div className="mb-5  d-lg-flex align-items-center justify-content-center text-center "> */}
                        {/* <p className="my-0 mr-5">Try our open beta:</p>
                            <a href='https://apps.apple.com/us/app/knaq/id1490253270' target="_blank">
                            <Image src="/images/appstorebadgepng.png" />
                        </a> */}
                        {error && <Alert variant='danger'>{error}</Alert>}
                        {success
                            ? <Alert variant="success" className="mx-5" style={{ height: "52px" }}>Subscribed! Check your email for upcoming updates.</Alert>
                            : <Form onSubmit={waitlistHandler}>
                                <InputGroup className='px-5'>
                                    <Form.Control placeholder="Your Email Here" type="email"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        style={{ height: "52px" }}
                                    />
                                    <Button variant='outline-secondary' style={{ borderRadius: '0px' }} type="submit">
                                        Join the Waitlist!
                                    </Button>
                                </InputGroup>
                            </Form>}
                        {/* </div> */}
                    </div>
                </Col>
            </Row>
        </StaticPage>

    )
}

export default PromoScreen