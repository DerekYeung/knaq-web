import axios from 'axios'
import React, { useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'

const GraphicFilterModal = ({ show, setShow }) => {

    const user = useContext(UserContext)
    const userUpdate = useContext(UserContextUpdate)

    const graphicHandler = () => {
        axios.put(`https://api.knaqapp.com/api/me`, { nsfwFilter: "" },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
        userUpdate({ type: "UPDATE", payload: { nsfwFilter: false } })
        setShow(false)
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} centered={false}>
            <Modal.Header closeButton>
                <Modal.Title>Turn off Graphic Content Filter?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                Turning the Graphic Content Filter off will stop hiding posts that could be upsetting or offensive
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="px-5 py-2" onClick={() => setShow(false)}>
                    No
                </Button>
                <Button variant="danger" className="px-5 py-2" onClick={graphicHandler}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default GraphicFilterModal