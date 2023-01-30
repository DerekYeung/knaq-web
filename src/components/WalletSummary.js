import React from 'react'
import { Col, Row } from 'react-bootstrap'

const WalletSummary = () => {
    return (
        <div className="mt-3 mx-2">
            <h5 className="border-bottom" style={{ marginLeft: "0px" }}><strong>Engagement Summary</strong></h5>
            <h5 className="mt-3">My Earnings:</h5>
            <Row>
                <Col>
                    <i className="fas fa-circle mr-1" style={{ lineHeight: "22px", verticalAlign: "top", fontSize: "5px", color: "orange" }} />
                    <span>Tips</span>
                </Col>
                <Col xs="auto" className="ml-auto">$400.28</Col>
            </Row>
            <Row>
                <Col className="ml-3 ">
                    <i className="fas fa-circle mr-1" style={{ lineHeight: "22px", verticalAlign: "top", fontSize: "5px", color: "purple" }} />
                    <span>Feathers earned from Tips</span>
                </Col>
                <Col xs="auto" className="ml-auto">
                    14,832
                    <i className="fas fa-feather ml-1" style={{ fontSize: "10px" }} />
                </Col>
            </Row>
            <Row className="mt-3 ">
                <Col >
                    <i className="fas fa-circle mr-1 text-info" style={{ lineHeight: "22px", verticalAlign: "top", fontSize: "5px", }} />
                    <span>Subscriptions</span>
                </Col>
                <Col xs="auto" className="ml-auto">$600.00</Col>
            </Row>
            <Row>
                <Col className="ml-3 ">
                    <i className="fas fa-circle mr-1" style={{ lineHeight: "22px", verticalAlign: "top", fontSize: "5px", color: "purple" }} />
                    <span>Feathers earned from Subcriptions</span>
                </Col>
                <Col xs="auto" className="ml-auto">
                    10,000
                    <i className="fas fa-feather ml-1" style={{ fontSize: "10px" }} />
                </Col>
            </Row>
            <Row className="mt-3 ">
                <Col>
                    <i className="fas fa-circle mr-1" style={{ lineHeight: "22px", verticalAlign: "top", fontSize: "5px", color: "green" }} />
                    <span>Referals</span>
                </Col>
                <Col xs="auto" className="ml-auto">$200</Col>
            </Row>
            <Row className="mt-4 border-top ">
                <Col>
                    <strong>Total</strong>
                </Col>
                <Col xs="auto" className="ml-auto"><strong>$1,204,28</strong></Col>
            </Row>
            <Row>
                <Col>
                    <span>Total Feathers</span>
                </Col>
                <Col xs="auto" className="ml-auto">
                    $400
                    <i className="fas fa-feather ml-1" style={{ fontSize: "10px" }} />
                </Col>
            </Row>
        </div >
    )
}

export default WalletSummary
