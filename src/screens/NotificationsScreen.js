import React, { useContext, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useQuery } from 'react-query'
import PostModal from '../components/PostModal'
import PostNotificationThumb from '../components/PostNotificationThumb'
import TripleCol from '../components/TripleCol'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'
import { abv } from '../util/common'

export const Notifications = () => {

    const user = useContext(UserContext)
    const userUpdate = useContext(UserContextUpdate)
    const [notifications, setNotifications] = useState([])

    //Modal
    const [show, setShow] = useState(false);
    const [modalPost, setModalPost] = useState({})

    const { isLoading, data, refetch } = useQuery('notifications', () => {
        const URL = "https://api.knaqapp.com/api"
        return axios.get(URL + `/activity/notifications?start=0`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            let raw = data.data.data.notifications
            console.log(raw)
            setNotifications([...raw])
        },
        refetchOnWindowFocus: true
    })


    return (
        <Container>
            <PostModal show={show} setShow={setShow} post={modalPost} />
            <TripleCol>
                {notifications.map((note, index) => (
                    <Row key={index} className="py-3 my-2 px-3 border-bottom">
                        <Col xs="auto">
                            <div style={{
                                height: "50px", width: "50px", borderRadius: "100%",
                                backgroundImage: `url(${note.originalUser.avatarUrl || "/images/Logo-BW.png"})`,
                                backgroundSize: "cover", backgroundPosition: "center"
                            }} />
                        </Col>
                        <Col >
                            <Row>
                                <Col className="pl-0">
                                    <strong>@{note.originalUser.displayName} </strong>
                                    {note.type === "follow" && <span>started following you</span>}
                                    {note.type === 'like' && <span>liked your post</span>}
                                    {note.type === 'comment' && <span>commented on your post:</span>}
                                    {note.type === 'tip' && <span>sent you a tip</span>}
                                    {note.type === 'subscribe' && <span>subscribed for ${note.subMonth} months</span>}
                                    {note.type === 'referral' && <span>Used your referral code. Claim your referral bonus!</span>}
                                    {note.text}
                                    <span className="text-muted pl-2">{abv(moment(note.updatedAt).fromNow())}</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs="auto" className="text-center my-auto">
                            {note.type === "follow" && <i className="fas fa-2x fa-user-plus text-info"></i>}
                            {note.type === 'referral' && ""}
                            {note.type === 'subscribe' && <p className="text=success">+{note.currency === "usd" ? "$" : ""}{note.price}</p>}
                            {note.type === 'tip' && <p className="text=success">+{note.currency === "usd" ? "$" : ""}{note.price}</p>}

                            {(note.type === 'like' || note.type === 'comment') &&
                                <div style={{ width: "50px", paddingBottom: "50px", position: "relative", cursor: "pointer" }}
                                    onClick={() => { setShow(true); setModalPost(note.post) }}>
                                    <div className="" style={{ width: "100%", height: "100%", position: "absolute", top: "0" }}>
                                        <PostNotificationThumb post={note.post} />
                                    </div>
                                </div>}
                        </Col>
                    </Row>
                ))}
            </TripleCol>
        </Container >
    )
}
export default Notifications