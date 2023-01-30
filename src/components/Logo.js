import React, { useContext } from 'react'
import { Button, ButtonGroup, Col, Dropdown, Form, Image, Row } from 'react-bootstrap'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'
import { useHistory } from 'react-router-dom'

const Logo = () => {
    console.log("logo")

    const user = useContext(UserContext)
    const userUpdate = useContext(UserContextUpdate)
    const history = useHistory()
    const logoutHandler = () => {
        userUpdate({ type: "LOGOUT" })
        history.push('/login')
    }


    return (
        <Dropdown>
            <Dropdown.Toggle as={ButtonGroup}>
                <Row>
                    <Col xs="auto">
                        <Image src="/images/Logo.png" style={{ height: "40px" }} />
                    </Col>
                    <Col>
                        <Row><p style={{ margin: 0, fontWeight: 800, fontSize: "16px" }}>{user.displayName}</p></Row>
                        <Row><p style={{ margin: 0, fontSize: "12px" }}>@{user.username}</p></Row>
                    </Col>
                </Row>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {/* <Dropdown.Item >Profile</Dropdown.Item> */}
                <Dropdown.Item onClick={() => history.push('/profile')}>Profile Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header >
                    <Row>
                        <Col>
                            Graphic Content Filter
                        </Col>
                        <Col xs="auto">
                            <Form>
                                <Form.Check type="switch" />
                            </Form>
                        </Col>
                    </Row>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Logo
