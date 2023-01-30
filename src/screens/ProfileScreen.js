import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Image, ListGroup, Card, Tabs, Tab } from 'react-bootstrap'
import TripleCol from '../components/TripleCol'
import Post from '../components/Post'
import ProfileBanner from '../components/ProfileBanner'
import Header from '../components/Header'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'
import PostTabs from '../components/PostTabs'


export const Profile = () => {

    const user = useContext(UserContext)
    const userUpdate = useContext(UserContextUpdate)


    return (
        <>
            <ProfileBanner id={user.id} />
            <Container>
                <TripleCol>
                    <PostTabs id={user.id} />
                </TripleCol>
            </Container >
        </>
    )
}
export default Profile