import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Signup5 = ({ state }) => {

    if (state.transition !== 6) return null
    return (
        <div className="">
            <h1 className="text-center mb-4" style={{ fontSize: "72px", }}>
                Profile Created!
            </h1>

            <p className='text-center mt-5' style={{ fontSize: "20px" }}>
                Woohoo!
            </p>
            <Row>
                <Col xs={12} lg={{ span: 6, offset: 3 }}>
                    <div className="text-center">
                        <i className="fas fa-check-circle text-success" style={{ fontSize: "200px", margin: "70px" }}></i>
                    </div>

                    <LinkContainer to="/profile">
                        <Button variant="info" block className="mt-5 mb-3"
                            type="button">
                            Go to Profile Page
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
        </div>
    )
}

export default Signup5
