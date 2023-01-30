import React, { useContext, useEffect, useState } from 'react'
import { Col, Dropdown, Row, Spinner } from 'react-bootstrap'
import moment from 'moment'
import { UserContext } from '../contexts/UserContext'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from './Loader'
import axios from 'axios'
import { useMutation } from 'react-query'
import ShareModal from './ShareModal'
import PostDropdown from './PostDropdown'
import PostMedia from './PostMedia'
import TipModal from './TipModal'
import ComingSoon from './ComingSoon'
import PostGraphicOverlay from './PostGraphicOverlay'
import PostSubscribeOverlay from './PostSubscribeOverlay'


const Post = ({ hideTop, post }) => {
    // console.log(post)
    const user = useContext(UserContext)

    const textOnly = !post.images && !post.video
    const [like, setLike] = useState(!!post.like)
    const [likes, setLikes] = useState(post.totalLikes)
    const [deleted, setDeleted] = useState(false)
    const [blocked, setBlocked] = useState(post.user.block || false) // Temporary
    const [reported, setReported] = useState(post.report || false)

    const [showShare, setShowShare] = useState(false)
    const [showTip, setShowTip] = useState(false)


    useEffect(() => {
        if (!post.like && like) setLikes(post.totalLikes + 1)
        if (post.like && !like) setLikes(post.totalLikes - 1)
        if (post.like == like) setLikes(post.totalLikes)
    }, [like])


    // Handlers
    const shareHandler = () => setShowShare(true)

    const { mutate: likeHandler, isLoading: likeLoading } = useMutation(() => {
        setLike(!like)
        return axios.post(
            `https://api.knaqapp.com/api/post/like`,
            { postId: post.id, otherId: post.user.id, like: !like },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onError: () => { setLike(!like) },
    })



    if (deleted) return null
    return (
        <div className=" pb-3 border-bottom">
            <ShareModal show={showShare} setShow={setShowShare} type={"post"} shareId={post.id} />
            <TipModal show={showTip} setShow={setShowTip} post={post} />
            {!hideTop &&
                <Row className="py-3">
                    <LinkContainer to={`/user/${post.user.id}`} style={{ cursor: "pointer" }}>
                        <Col xs="auto" className="pr-0">
                            <div style={{
                                height: "30px", width: "30px", borderRadius: "100%",
                                backgroundImage: `url(${post.user.avatarUrl || "/images/Logo.png"})`,
                                backgroundSize: "cover", backgroundPosition: "center"
                            }} />
                        </Col>
                    </LinkContainer>
                    <LinkContainer to={`/user/${post.user.id}`} style={{ cursor: "pointer" }}>
                        <Col xs='auto' className="my-auto">
                            <p className="mb-0"><strong>{post.user.displayName}</strong></p>
                        </Col>
                    </LinkContainer>
                    <Col xs="auto" className="my-auto ml-auto">
                        <PostDropdown post={post} setDeleted={setDeleted} />
                    </Col>
                </Row>
            }

            <div style={{ position: "relative", backgroundColor: "#EEE", paddingTop: "100%" }}>
                {/* <div style={{ position: "relative", backgroundImage: "radial-gradient(#999, #FFF)", paddingTop: "100%" }}> */}
                {user.nsfwFilter && post.nsfw && <PostGraphicOverlay />}
                {post.subOnly && post.isSubbed && <PostSubscribeOverlay post={post} />}
                <div className='d-flex justify-content-center'
                    style={{ width: "100%", height: "100%", position: "absolute", top: "0" }}>
                    <PostMedia post={post} />
                </div>
            </div>


            <Row className="my-2" style={{ position: "relative", zIndex: "20" }}>
                <Col xs="auto" className="pr-1 my-auto ">
                    <i className={like ? "fas fa-heart fa-lg text-danger" : "far fa-heart fa-lg"}
                        style={{ cursor: "pointer" }}
                        onClick={likeLoading ? null : likeHandler}></i>
                </Col>
                <Col xs="auto" className="px-1 my-auto">
                    <i className="fas fa-share fa-lg"
                        style={{ cursor: "pointer" }}
                        onClick={shareHandler}></i>
                </Col>

                <Col xs="auto" className="my-auto ml-auto">
                    <ComingSoon>
                        <i className="fas fa-coins fa-lg"
                            style={{ cursor: "pointer" }}
                        // onClick={() => setShowTip(true)}
                        >
                        </i>
                    </ComingSoon>
                </Col>
            </Row>

            <p className="mb-2"><strong>{likes} Likes</strong></p>

            {!textOnly && <p className="mb-2"><strong>{post.user.username} </strong>{post.text}</p>}

            <p className="text-muted mb-0">{post.updatedAt && moment(post.updatedAt).fromNow()}</p>
        </div >
    )
}

export default Post
