import React from 'react'
import { Col, Nav, Navbar, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import LeftNav from './LeftNav'
import Logo from './Logo'


const LeftNavWithLogo = () => {
    return (
        <>
            <div className="py-3 border-bottom" style={{ marginRight: "-15px" }}>
                <Logo />
            </div>
            <LeftNav />
        </>
    )
}

export default LeftNavWithLogo
