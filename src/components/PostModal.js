import React from 'react'
import { Modal } from 'react-bootstrap'
import Post from './Post'


const PostModal = ({ show, setShow, post }) => {
    const handleClose = () => setShow(false);
    console.log(post)
    return (
        <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName='postModal'>
            <Modal.Body>
                <Post post={post} />
            </Modal.Body>
        </Modal>
    )
}

export default PostModal