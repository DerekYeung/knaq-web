import React from 'react'
import { Col, Row } from 'react-bootstrap'
import LeftNav from '../components/LeftNav'
import Header from './Header'


const TripleCol = ({ children }) => {
    return (
        <>
            {/* <Header /> */}
            <Row className="my-0">
                <Col xs={3} className="">
                    <LeftNav />
                </Col>
                <Col xs={6} className="border-right border-left">
                    {children}
                </Col>

            </Row>
        </>)
}

export default TripleCol
