import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import NewVoiceModal from './NewVoiceModal';

const NewVoicePrompt = () => {

    const [show, setShow] = useState(false);

    return (
        <div style={{ marginTop: "100px" }}>
            <h3 className="mx-5">
                <strong>Select a Voice Room on the left or start a new one</strong>
            </h3>
            <Button variant="info" className="ml-5 py-2"
                style={{ borderRadius: "50px" }}
                onClick={() => setShow(true)}>
                Create New Voice Room
            </Button>
            <NewVoiceModal show={show} setShow={setShow} />
        </div>
    )
}

export default NewVoicePrompt
