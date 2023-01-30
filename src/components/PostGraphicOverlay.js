import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import GraphicFilterModal from './GraphicFilterModal'

const PostGraphicOverlay = () => {

    const [show, setShow] = useState(false)
    const [skip, setSkip] = useState(false)
    const myButton = useRef(null)
    const graphicHandler = () => { setShow(true); myButton.current.blur() }
    const skipHandler = () => { setSkip(true) }

    if (skip) return null
    return (
        <>
            <GraphicFilterModal show={show} setShow={setShow} />
            <div className="d-flex flex-column justify-content-start"
                style={{ position: "absolute", top: "0", width: "100%", height: "100%", backgroundColor: "#000", zIndex: "10" }}>
                <div className="align-self-start text-danger font-weight-bold" style={{ position: "absolute" }}>
                    <i className="fas fa-exclamation-triangle px-2 mt-2"></i>
                    NSFW
                </div>
                <h2 className="text-white mt-5 pt-4 align-self-center">Graphic Content</h2>
                <h5 className="text-white my-auto px-5 text-center">This post may contain graphic or sensitive content which some people may find offensive or disturbing</h5>
                <Button size="sm" variant="outline-secondary" className="text-white align-self-center"
                    onClick={skipHandler}>View Post</Button>
                <Button size="md" variant="outline-secondary" block className="text-white mt-auto" style={{ borderRadius: "0px" }}
                    ref={myButton} onClick={graphicHandler}>Turn off Graphic Content Filter</Button>
            </div>
        </>
    )
}

export default PostGraphicOverlay