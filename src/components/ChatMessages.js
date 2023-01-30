import React, { useContext, useEffect, useRef, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { NavContext } from '../contexts/NavContext'
import { UserContext } from '../contexts/UserContext'
import { useHistory } from 'react-router-dom'
import PostModal from './PostModal'
import PostExploreThumb from './PostExploreThumb'

const ChatMessages = ({ raw, myScreen }) => {

    const history = useHistory()
    const user = useContext(UserContext)
    const nav = useContext(NavContext)
    const [messages, setMessages] = useState([]);

    console.log('messages')

    // Format Messages
    useEffect(() => {
        const now = new Date()
        const temp = raw.map((message, index, messages) => {
            // Edit Time
            let time = new Date(message.time)
            time = time.toDateString() === now.toDateString() // isToday?
                ? today.format(time)
                : full.format(time)

            // Get Sender Avatar
            const sender = nav.chat.members.find(member => member.id === message.senderId)
            return {
                ...message,
                avatarUrl: sender ? sender.avatarUrl : "/images/Logo-BW.png",
                time,
                isMe: message.senderId === user.id
            }
        })
        // Hide (Join) Date if same minute
        for (let i = 1; i < temp.length; i++) {
            if (temp[i].time === temp[i - 1].time) temp[i].time = null
        }
        // Hide (Join) Sender if Same
        for (let i = temp.length - 1; i > 0; i--) {
            if (temp[i].type === "text" && temp[i - 1].type == "text")
                if (temp[i].sender === temp[i - 1].sender) temp[i].sender = null
        }

        setMessages(temp)
    }, [raw]);


    // Force Down Scroll
    useEffect(() => {
        console.log("scroll")
        forceDown(myScreen.current)
    }, [raw]);

    const forceDown = (el) => {
        // console.log("scrollcheck set")
        const id = setInterval(() => {
            // console.log("scroll", el.scrollHeight, "top", el.scrollTop, "client", el.clientHeight,)
            // console.log(el.scrollHeight - el.scrollTop - el.clientHeight)
            el.scrollTo(0, 1000000000)
            if (el.scrollHeight - el.scrollTop - el.clientHeight > 10) {
                console.log("force")
                el.scrollTo(0, 1000000000)
            }
            else { clearInterval(id) }
        }, 500)
    }

    const today = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric", })
    const full = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    })

    const [show, setShow] = useState(false)
    const [modalPost, setModalPost] = useState({})
    const postHandler = (post) => {
        setShow(true)
        setModalPost(post)
    }

    return (
        <>
            <PostModal show={show} setShow={setShow} post={modalPost} />
            <div className="mt-auto">
                {messages.map((message) => (
                    <div key={message.id}>
                        {/* TimeStamp */}
                        {message.time && <div className="text-center text-muted mt-4 mb-2">{message.time}</div>}
                        {/* Name */}
                        {message.type == "text" && message.sender && !message.isMe &&
                            <div className="text-muted mt-3" style={{ marginLeft: "40px" }}>{message.sender}</div>
                        }

                        <div className="d-flex flex-nowrap mb-2 align-items-end">
                            <div className="px-1">
                                <div style={{
                                    width: "28px", height: "28px", borderRadius: "100px",
                                    backgroundSize: "cover",
                                    backgroundImage: !message.isMe && message.type !== "leave"
                                        ? `url(${message.avatarUrl || "/images/Logo.png"})`
                                        : null
                                }} />
                            </div>

                            {message.type === "text" &&
                                <div className=""
                                    style={{
                                        flex: "0 1 auto",
                                        whiteSpace: "pre-wrap",
                                        overflowWrap: "break-word",
                                        minWidth: "0px",
                                        minHeight: "40px",
                                        padding: "8px 9px 5px",
                                        // marginBottom: "5px",
                                        color: !message.isMe
                                            ? null
                                            : "white",
                                        borderRadius: "10px",
                                        backgroundColor: !message.isMe
                                            ? null
                                            : "#4BBFFF",
                                        border: !message.isMe
                                            ? "1px #D5D5D5 solid"
                                            : "1px #4BBFFF solid",
                                        marginLeft: !message.isMe
                                            ? null
                                            : "auto"
                                    }} >
                                    {message.text}
                                </div>
                            }
                            {message.type === "leave" && (<div className="text-center text-muted" style={{ width: "100%" }}>{message.text}</div>)}
                            {message.type === "post" &&
                                <div className="mt-2" style={{ width: "100%" }}>
                                    <div className="text-center text-muted">{message.isMe ? "You" : message.sender} shared a post</div>
                                    <Card style={{ cursor: "pointer" }} onClick={() => postHandler(message.post)}>
                                        <Card.Header className="p-2">
                                            <div className="d-flex align-items-center">
                                                <div className="mr-2" style={{
                                                    width: "30px", height: "30px", borderRadius: "100px",
                                                    backgroundSize: "cover",
                                                    backgroundImage: `url(${message.post.user.avatarUrl || "/images/Logo.png"})`
                                                }} />
                                                {message.post.user.displayName}
                                            </div>
                                        </Card.Header>
                                        <div style={{ width: "100%", paddingBottom: "100%" }}>
                                            <div style={{ width: "100%", height: "calc(100% - 47px)", position: "absolute", top: "47px" }}>
                                                <PostExploreThumb post={message.post} />
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            }
                            {message.type === "user" &&
                                <div className="mt-2">
                                    <div className="text-center text-muted">{message.isMe ? "You" : message.sender} shared a user</div>
                                    <div className="d-flex  align-items-center"
                                        style={{ backgroundColor: "#EEE", cursor: "pointer", borderRadius: "100px" }}
                                        onClick={() => history.push(`user/${message.profileUser.id}`)}
                                    >
                                        <div className="m-3" style={{
                                            width: "60px", height: "60px", borderRadius: "100px",
                                            backgroundSize: "cover",
                                            backgroundImage: `url(${message.profileUser.avatarUrl || "/images/Logo.png"})`
                                        }} />
                                        <div style={{ fontSize: "24px" }}>
                                            {message.profileUser.displayName}
                                        </div>
                                    </div>
                                </div>
                            }


                            <div className="mt-auto px-1">
                                <div style={{
                                    width: "28px", height: "28px", borderRadius: "100px",
                                    backgroundSize: "cover",
                                    backgroundImage: message.isMe
                                        ? `url(${user.avatarUrl || "/images/Logo.png"})`
                                        : null
                                }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ChatMessages;

