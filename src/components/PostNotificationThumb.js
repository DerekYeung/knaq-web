import React from 'react'

const PostNotificationThumb = ({ post }) => {

    if (post.images?.length === 1) return (
        <div style={{
            width: "100%", height: "100%", backgroundImage: `url(${post.images[0]})`,
            backgroundSize: "cover", backgroundPosition: "center"
        }} />
    )

    if (post.images?.length > 1) return (
        <div style={{
            width: "100%", height: "100%", backgroundImage: `url(${post.images[0]})`,
            backgroundSize: "cover", backgroundPosition: "center"
        }} className="d-flex justify-content-center align-items-center">
            <i className="fas fa-images text-white" />
        </div>
    )

    if (post.video && post.videoScreenshot) return (
        <div style={{
            width: "100%", height: "100%", backgroundImage: `url(${post.videoScreenshot})`,
            backgroundSize: "cover", backgroundPosition: "center"
        }}
            className="d-flex justify-content-center align-items-center">
            <i className="fas fa-play-circle text-white" />
        </div>
    )

    if (post.text) return (
        <div className='d-flex align-items-center justify-content-center text-center p-3'
            style={{
                height: "100%", width: "100%", backgroundColor: "#EEE", overflow: "hidden",
                whiteSpace: "pre-wrap", fontSize: "6px", fontWeight: "bold"
            }}>
            {post.text}</div>
    )

    return null

}

export default PostNotificationThumb