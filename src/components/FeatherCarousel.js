import React, { useState } from 'react'
import { Button, Carousel, Col, Row } from 'react-bootstrap'
import StripeModal from './StripeModal'

const FeatherCarousel = () => {
    // const [dollarEnter, setDollarEnter] = useState(false)
    // const [featherEnter, setFeatherEnter] = useState(false)
    const [dollarNOTfeather, setDollarNOTfeather] = useState(true)
    const [stripeShow, setStripeShow] = useState(false)

    return (

        < div >
            <StripeModal show={stripeShow} setShow={setStripeShow} />
            <Row className="my-0">
                <Col className="text-center">
                    {dollarNOTfeather
                        ? <h1
                        // className={featherEnter ? "animate__animated animate__slideOutLeft" : ""}
                        >
                            <strong>$1,204.28 USD</strong>
                        </h1>
                        : <h1
                        // className={featherEnter ? "animate__animated animate__slideInRight" : ""}
                        >
                            <strong>
                                24,832
                                <i className="fas fa-feather ml-2" style={{ fontSize: "30px" }} />
                            </strong>
                        </h1>}
                </Col>
                <div style={{ position: "absolute", right: dollarNOTfeather && "20px", cursor: "pointer", left: !dollarNOTfeather && "20px" }}
                    onClick={() => setDollarNOTfeather(prev => !prev)}
                >
                    <i className={dollarNOTfeather ? "far fa-play-circle" : "far fa-play-circle fa-flip-horizontal"} style={{ fontSize: "25px", marginTop: "5px" }} />
                </div>
            </Row>
            {dollarNOTfeather
                ? <Row className="mt-5 justify-content-center">
                    <Col xs="auto">
                        <Button variant="info" className="py-2 px-0" style={{ width: "120px" }}>Send Money</Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="outline-info" className="py-2 px-0" style={{ width: "120px" }}
                            onClick={() => { setStripeShow(true) }}
                        >Receive Money</Button>
                    </Col>
                </Row>
                : <Row className="mt-5 justify-content-center">
                    <Col xs="auto">
                        <Button variant="info" className="py-2 px-0" style={{ width: "120px" }}>Send
                            <i className="fas fa-feather ml-1" style={{ fontSize: "10px" }} />
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="outline-info" className="py-2 px-0" style={{ width: "120px" }}>Receive
                            <i className="fas fa-feather ml-1" style={{ fontSize: "10px" }} />
                        </Button>
                    </Col>
                </Row>
            }
            <Row className="mt-2 justify-content-center no-gutters">
                <Col xs="auto" className="px-2">
                    <i className={dollarNOTfeather ? "fas fa-circle text-info" : "fas fa-circle text-muted"} style={{ fontSize: "10px" }} />
                </Col>
                <Col xs="auto" className="px-2">
                    <i className={dollarNOTfeather ? "fas fa-circle text-muted" : "fas fa-circle text-info"} style={{ fontSize: "10px" }} />
                </Col>
            </Row>

        </ div >
    )
}

export default FeatherCarousel
