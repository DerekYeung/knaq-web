import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Image, } from 'react-bootstrap'
import CurrencyDropdown from '../components/CurrencyDropdown'
import FeatherCarousel from '../components/FeatherCarousel'
import Header from '../components/Header'
import LeftNav from '../components/LeftNav'
import TripleCol from '../components/TripleCol'
import WalletHistory from '../components/WalletHistory'
import WalletSummary from '../components/WalletSummary'



export const Wallet = () => {

    return (
        <Container>
            <Row className="my-0">
                <Col xs={3} className="">
                    <LeftNav />
                </Col>
                <Col xs={6} className="border-right border-left">
                    <Row>
                        <Col>
                            <h3 className="text-center my-3"><strong>landiu's Wallet</strong></h3>
                        </Col>
                        <Col xs="auto" className="ml-auto">
                            <CurrencyDropdown />
                        </Col>
                    </Row>
                    <Row className="mt-4 mb-5">
                        <Col>
                            <h5 className="text-center ">My Balance</h5>
                        </Col>
                        <div style={{ postion: "absolute", marginRight: "100px" }} >
                            <i className="fas fa-cog" style={{ fontSize: "15px", marginTop: "5px" }} />
                        </div>
                    </Row>
                    <FeatherCarousel />
                    <WalletHistory />
                </Col>
                <Col xs={3} className="">
                    <WalletSummary />
                </Col>
            </Row>
        </Container >
    )
}
export default Wallet