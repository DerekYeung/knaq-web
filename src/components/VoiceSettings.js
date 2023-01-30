import React, { useState } from 'react';
import { Button, ButtonGroup, Col, ListGroup, Row } from 'react-bootstrap';
import AddPeopleChatModal from './AddPeopleChatModal';
import LeaveChatModal from './LeaveChatModal';
import MuteChatToggle from './MuteChatToggle';
import RenameChatModal from './RenameChatModal';

const VoiceSettings = () => {

    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);

    return (
        <div className="">
            <div className="border-bottom d-flex align-items-center mx-2 px-2" style={{ cursor: "pointer", height: "50px" }}
                onClick={() => setShowAddModal(true)}>
                Add People
            </div>
            <div className="border-bottom d-flex align-items-center mx-2 px-2" style={{ cursor: "pointer", height: "50px" }}
                onClick={() => setShowRenameModal(true)}>
                Rename Chat
            </div>
            <div className="border-bottom d-flex align-items-center mx-2 px-2 justify-content-between " style={{ height: "50px" }}>
                <div>Mute Notifications</div>
                <div><MuteChatToggle /></div>
            </div>

            <div className="mt-4 d-flex mx-5">
                <Button variant="danger" className="mx-auto py-2" style={{ width: "100%" }}
                    onClick={() => setShowLeaveModal(true)}>
                    Leave Chat
                </Button>
            </div>
            <RenameChatModal show={showRenameModal} setShow={setShowRenameModal} />
            <LeaveChatModal show={showLeaveModal} setShow={setShowLeaveModal} />
            <AddPeopleChatModal show={showAddModal} setShow={setShowAddModal} />
        </div>
    );
};

export default VoiceSettings;
