import React, { useContext, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import ListPeopleModal from './ListPeopleModal';
import SubscribeModal from './SubscribeModal'
import ProfileSettingsModal from './ProfileSettingsModal'
import ProfileDropdown from './ProfileDropdown'
import ComingSoon from './ComingSoon'


const ProfileBanner = ({ id }) => {

    const user = useContext(UserContext)
    const userUpdate = useContext(UserContextUpdate)
    const [profile, setProfile] = useState({})
    const [showSearch, setShowSearch] = useState(false);
    const [keyword, setKeyword] = useState("");

    const [showSubscribe, setShowSubscribe] = useState(false);
    const [showSettings, setShowSettings] = useState(false);



    const URL = "https://api.knaqapp.com/api"
    const { refetch } = useQuery(`user=${id}`, () => {
        return axios.get(URL + `/profile/user?userId=${id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            console.log(data.data.data)
            let raw = data.data.data
            setProfile({ ...raw })
            if (id == user.id) userUpdate({ type: "UPDATE", payload: data.data.data })
        }
    })

    const { mutate: followHandler, isLoading: followLoading, reset } = useMutation(() => {
        return axios.post(
            `https://api.knaqapp.com/api/profile/follow`,
            { otherId: profile.id, follow: !profile.isFollow },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onSuccess: (data) => { refetch() },
    })

    // Handlers
    const subscribeHandler = () => {
        setShowSubscribe(true)
    }
    const followingHandler = () => {
        setKeyword('followings')
        setShowSearch(true)
    }
    const followersHandler = () => {
        setKeyword('followers')
        setShowSearch(true)
    }
    const subscribersHandler = () => {
        setKeyword('subscribers')
        setShowSearch(true)
    }


    if (!profile) return null
    return (
        <div style={{
            backgroundImage: `url(${profile.backgroundUrl || "/images/forestBackground.jpg"})`,
            backgroundSize: "cover", backgroundPosition: "center",
            position: "relative"
        }}>
            <div style={{ position: "absolute", zIndex: "10", right: "10px", top: "10px" }}>
                {id !== user.id && <ProfileDropdown profile={profile} />}
            </div>

            <Container>
                <ListPeopleModal show={showSearch} setShow={setShowSearch} keyword={keyword} />
                <SubscribeModal show={showSubscribe} setShow={setShowSubscribe} profile={profile} />
                <ProfileSettingsModal show={showSettings} setShow={setShowSettings} refetchProfile={refetch} profile={profile} />
                <Row className="py-3">
                    <Col lg={{ span: 6, offset: 3 }} className="text-center ">
                        <Image src={profile.avatarUrl || "/images/Logo.png"} roundedCircle
                            style={{
                                objectFit: "cover",
                                width: "150px",
                                height: "150px",
                                position: "relative",
                                zIndex: "5",
                            }} />
                        <Card className="pb-3 pt-5 px-5"
                            style={{
                                borderRadius: "5%",
                                marginTop: "-30px",
                                position: "relative",
                                zIndex: "1",
                            }}>
                            <h3 className="mb-3">{profile.displayName}</h3>
                            <p className="mb-3"> {profile.description || "Welcome to my profile!"}</p>
                            {profile.isMine
                                ? <Row className="mb-3">
                                    <Col>
                                        <Button size="sm" variant="outline-primary"
                                            onClick={() => setShowSettings(true)}>
                                            Profile Settings
                                        </Button>
                                    </Col>
                                </Row>
                                : <Row className="mb-3">
                                    <Col>
                                        <Button size="sm" block variant={profile.isFollow ? "success" : "info"}
                                            onClick={followHandler} disabled={followLoading}>
                                            {profile.isFollow ? "Followed" : "Follow"}
                                        </Button>
                                    </Col>
                                    <Col>

                                        <ComingSoon>
                                            <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: "5" }}></div>
                                        </ComingSoon>
                                        <Button size="sm" block variant={profile.subExpireAt ? "outline-success" : "outline-info"}
                                            onClick={subscribeHandler} disabled>
                                            {profile.subExpireAt ? "Subscribed" : "Subscribe"}
                                        </Button>
                                    </Col>
                                </Row>
                            }
                            <Row>
                                <Col style={profile.isMine ? { cursor: "pointer" } : {}}
                                    onClick={profile.isMine ? followingHandler : null}
                                >
                                    <p className="mb-0">Following</p>
                                    <strong>{profile.followingCount}</strong>
                                </Col>
                                <Col style={profile.isMine ? { cursor: "pointer" } : {}}
                                    onClick={profile.isMine ? followersHandler : null}
                                >
                                    <p className="mb-0">Followers</p>
                                    <strong>{profile.followersCount}</strong>
                                </Col>
                                <Col style={profile.isMine ? { cursor: "pointer" } : {}}
                                    onClick={profile.isMine ? subscribersHandler : null}
                                >
                                    <p className="mb-0">Subs</p>
                                    <strong>{profile.subscribersCount}</strong>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProfileBanner
