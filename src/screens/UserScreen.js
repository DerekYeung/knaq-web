import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Image, ListGroup, Card, Tabs, Tab } from 'react-bootstrap'
import TripleCol from '../components/TripleCol'
import Post from '../components/Post'
import ProfileBanner from '../components/ProfileBanner'
import Header from '../components/Header'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'
import PostTabs from '../components/PostTabs'


export const User = ({ match }) => {

    const user = useContext(UserContext)
    const userUpdate = useContext(UserContextUpdate)

    const id = match.params.id
    console.log(id)


    return (
        <>
            <ProfileBanner id={id} />
            <Container>
                <TripleCol>
                    <PostTabs id={id} />
                </TripleCol>
            </Container >
        </>
    )
}
export default User