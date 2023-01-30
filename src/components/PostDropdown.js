import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ButtonGroup, Col, Dropdown, Image, Row } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { UserContext } from '../contexts/UserContext'
import ShareModal from './ShareModal'

const PostDropdown = ({ post, setDeleted }) => {

    const user = useContext(UserContext)
    const [showMenu, setShowMenu] = useState(false)

    const [showShare, setShowShare] = useState(false)
    const [blocked, setBlocked] = useState(false) // Temporary
    const [postReported, setPostReported] = useState(false)
    // const [userReported, setUserReported] = useState(false)
    useEffect(() => { setPostReported(post.report) }, [post])

    // Handlers
    const shareHandler = () => {
        setShowShare(true)
    }

    const { mutate: deleteHandler } = useMutation(() => {
        return axios.delete(
            `https://api.knaqapp.com/api/post/${post.id}`,
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onSuccess: (data) => { setDeleted(true) },
    })

    const { mutate: reportPostHandler, isLoading: postReporting } = useMutation(() => {
        return axios.post(
            `https://api.knaqapp.com/api/post/report`,
            { postId: post.id },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onSuccess: (data) => { setPostReported(true) },
    })

    // const { mutate: reportUserHandler, isLoading: userReporting } = useMutation(() => {
    //     return axios.post(
    //         `https://api.knaqapp.com/api/profile/report`,
    //         { userId: post.user.id },
    //         { headers: { Authorization: `Bearer ${user.token}` } }
    //     )
    // }, {
    //     onSuccess: (data) => { setUserReported(true) },
    // })

    const { mutate: blockHandler, isLoading: blocking } = useMutation(() => {
        return axios.post(
            `https://api.knaqapp.com/api/contact/block`,
            { otherId: post.user.id },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onSuccess: (data) => { setBlocked(true) },
    })

    const { mutate: unblockHandler, isLoading: unblocking } = useMutation(() => {
        return axios.delete(`https://api.knaqapp.com/api/contact/${post.id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => { setBlocked(false) },
    })

    return (
        <Dropdown show={showMenu}
            onToggle={(isOpen, event, metadata) => { if (metadata.source !== "select") { setShowMenu(isOpen); } }}
        >
            <ShareModal show={showShare} setShow={setShowShare} />
            <Dropdown.Toggle as='div' style={{ cursor: "pointer" }}>
                <i className="fas fa-ellipsis-v "></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {post.user.id == user.id
                    ? <Dropdown.Item
                        onClick={deleteHandler}>
                        Delete
                    </Dropdown.Item>
                    : (<>
                        {postReported
                            ? <Dropdown.Item disabled={true}>Post Reported</Dropdown.Item>
                            : <Dropdown.Item onClick={reportPostHandler} disabled={postReporting}>Report Post</Dropdown.Item>
                        }
                        {blocked
                            ? <Dropdown.Item onClick={unblockHandler} disabled={unblocking} > Unblock User</Dropdown.Item>
                            : <Dropdown.Item onClick={blockHandler} disabled={blocking}>Block User</Dropdown.Item>
                        }
                        {/* {userReported
                            ? <Dropdown.Item disabled={true}>User Reported</Dropdown.Item>
                            : <Dropdown.Item onClick={reportUserHandler} disabled={userReporting}>Report User</Dropdown.Item>
                        } */}
                        <Dropdown.Item onClick={shareHandler}>Share User</Dropdown.Item>
                    </>)
                }
            </Dropdown.Menu>
        </Dropdown >
    )
}

export default PostDropdown