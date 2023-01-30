import React from 'react'
import { Col, Nav, Navbar, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ComingSoon from './ComingSoon'


const LeftNav = () => {
    return (
        <Navbar variant="light" className="py-0 mt-2 mb-5">
            <Nav defaultActiveKey="/" className="flex-column">
                <LinkContainer exact to="/home">
                    <Nav.Link className="my-2" active={false}>
                        <Row>
                            <Col xs={2}>
                                <i className="fas fa-home fa-lg"></i>
                            </Col>
                            <Col>
                                Home
                            </Col>
                        </Row>
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/profile">
                    <Nav.Link className="my-2" active={false}>
                        <Row>
                            <Col xs={2}>
                                <i className="far fa-user fa-lg"></i>
                            </Col>
                            <Col>
                                Profile
                            </Col>
                        </Row>
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/rooms">
                    <Nav.Link className="my-2" active={false}>
                        <Row>
                            <Col xs={2}>
                                <i className="far fa-comments fa-lg"></i>
                            </Col>
                            <Col>
                                Chat Rooms
                            </Col>
                        </Row>
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/explore">
                    <Nav.Link className="my-2" active={false}>
                        <Row>
                            <Col xs={2}>
                                <i className="fas fa-search fa-lg"></i>
                            </Col>
                            <Col>
                                Explore
                            </Col>
                        </Row>
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/notifications">
                    <Nav.Link className="my-2" active={false}>
                        <Row>
                            <Col xs={2}>
                                <i className="far fa-bell fa-lg"></i>
                            </Col>
                            <Col>
                                Notifications
                            </Col>
                        </Row>
                    </Nav.Link>
                </LinkContainer>

                <ComingSoon direction='bottom'>
                    <div>
                        <LinkContainer to="/wallet">
                            <Nav.Link className="my-2" active={false} disabled>
                                <Row>
                                    <Col xs={2}>
                                        <i className="fas fa-wallet fa-lg"></i>
                                    </Col>
                                    <Col>
                                        Wallet
                                    </Col>
                                </Row>
                            </Nav.Link>
                        </LinkContainer>
                    </div>
                </ComingSoon>
            </Nav>
        </Navbar>
    )
}

export default LeftNav
