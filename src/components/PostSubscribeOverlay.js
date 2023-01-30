import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import SubscribeModal from './SubscribeModal'

const PostSubscribeOverlay = ({ post }) => {

    const [show, setShow] = useState(false)
    const [skip, setSkip] = useState(false)
    const myButton = useRef(null)
    const subscribeHandler = () => { console.log(post.user); setShow(true); myButton.current.blur() }
    const skipHandler = () => { setSkip(true) }

    if (skip) return null
    return (
        <>
            <SubscribeModal show={show} setShow={setShow} profile={post.user} />
            <div className="d-flex flex-column justify-content-center align-items-center"
                style={{ position: "absolute", top: "0", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.2)", zIndex: "5", backdropFilter: "blur(10px)" }}>
                <h2 className="text-white ">Subscriber-Only Post</h2>
                <h5 className="text-white my-5 mx-4 px-5 text-center " >This post is for subscribers only. To view this post, please purchsae a subscription from this user.</h5>
                <Button size="md" variant="info" className=""
                    ref={myButton} onClick={subscribeHandler}>Purchase Subscription</Button>
            </div>
        </>
    )
}

export default PostSubscribeOverlay