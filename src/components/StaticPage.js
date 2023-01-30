import React, { useEffect, useState } from 'react'
import { Col, Image, Nav, Navbar, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import ComingSoon from './ComingSoon'


const StaticPage = ({ children }) => {

    const history = useHistory()
    const [clicks, setClicks] = useState(0)
    useEffect(() => { if (clicks > 9) history.push('/login') }, [clicks])

    return (
        <div>
            <Navbar bg="light" expand="lg" style={{ height: "170px", border: "none" }} className="py-0">
                <LinkContainer to="/" style={{ height: "100%" }}>
                    <Navbar.Brand style={{ height: "100%" }}>
                        <Image src="/images/Knaq-Logo-Final.png"
                            className="" style={{ height: "100%" }} />
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <ComingSoon direction='left'>
                            <button className="m-0 px-3" style={{ color: "grey", border: "none", backgroundColor: "#0000" }}
                                onClick={() => { setClicks(clicks + 1) }}>
                                Login
                            </button>
                        </ComingSoon>

                        {/* <LinkContainer to="/login">
                            <Nav.Link><div className="mt-1 px-3">Login</div></Nav.Link>
                        </LinkContainer> */}
                        <Nav.Link active={false} target="_blank" href="http://www.instagram.com/knaqapp"><i className="px-3 fa-2x fab fa-instagram"></i></Nav.Link>
                        <Nav.Link active={false} target="_blank" href="http://www.twitter.com/knaqapp"><i className="px-3 fa-2x fab fa-twitter"></i></Nav.Link>
                        <Nav.Link active={false} target="_blank" href="https://discord.gg/H4TAHRGNHR"><i className="px-3 fa-2x fab fa-discord"></i></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {children}

            <Row className="m-0 px-5 py-4" style={{ backgroundColor: "#eaf1f6" }}>
                <Col xs='12' lg={6} className="">
                    <Navbar>
                        <Nav className="flex-column">
                            <h4>Knaq Technologies, Inc</h4>
                            <LinkContainer to="/privacy">
                                <Nav.Link>Privacy Policy</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/terms">
                                <Nav.Link >Terms of Service</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar>
                </Col>
                <Col xs='12' lg={6} className="">
                    <Navbar>
                        <Nav className="flex-column">
                            <h4>Contact Us</h4>
                            <Nav.Link target="_blank" href="mailto: support@knaqapp.com">hello@knaqapp.com</Nav.Link>
                            <Nav.Link target="_blank" href="https://discord.gg/H4TAHRGNHR">Discord Channel</Nav.Link>
                            <LinkContainer to="/faq">
                                <Nav.Link>FAQ</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar>
                </Col>
            </Row>
        </div>
    )
}

export default StaticPage