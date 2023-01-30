import React, { useContext, useEffect } from 'react'
import { Container, Row, Col, } from 'react-bootstrap'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'

import Logo from './Logo'
import SearchHeader from './SearchHeader'
import { useLocation } from 'react-router'
import { useHistory } from 'react-router-dom'


export const Header = () => {

    const location = useLocation()
    console.log(location)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [location])

    const user = useContext(UserContext)
    const userUpdate = useContext(UserContextUpdate)

    const history = useHistory()


    if (location.pathname === "/") return null
    if (location.pathname === "/promo") return null
    if (location.pathname === "/landing") return null
    if (location.pathname === "/market") return null
    if (location.pathname === "/creator") return null

    if (location.pathname === "/login") return null
    if (location.pathname === "/forgot") return null
    if (location.pathname === "/signup") return null
    if (location.pathname === "/privacy") return null
    if (location.pathname === "/terms") return null
    if (location.pathname === "/faq") return null

    return (
        <Container className="">
            <Row className="border-bottom align-items-center" style={{ height: "60px" }} >
                <Col xs={3} className="">
                    <Logo />
                </Col>
                {location.pathname !== "/rooms" && <SearchHeader />}
            </Row>
        </Container >
    )
}

export default Header