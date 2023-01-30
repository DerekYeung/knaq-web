import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, ListGroup, Row } from 'react-bootstrap';
import { NavContext, NavContextUpdate } from '../contexts/NavContext';
import { UserContext } from '../contexts/UserContext';
import { useQuery, useMutation } from 'react-query'
import axios from 'axios'

import AddPeopleChatModal from './AddPeopleChatModal';
import LeaveChatModal from './LeaveChatModal';
import MuteChatToggle from './MuteChatToggle';
import RenameChatModal from './RenameChatModal';
import { useHistory } from 'react-router-dom'

const ChatSettings = () => {

    const history = useHistory()
    const user = useContext(UserContext)
    const nav = useContext(NavContext)
    const updateNav = useContext(NavContextUpdate)
    const [blocked, setBlocked] = useState(false) // Temporary

    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);

    // const { mutate: blockHandler } = useMutation(() => {
    //     return axios.post(
    //         `https://api.knaqapp.com/api/contact/block`,
    //         { otherId: nav.chat.contactId },
    //         { headers: { Authorization: `Bearer ${user.token}` } }
    //     )
    // }, {
    //     onSuccess: (data) => { setBlocked(true) },
    // })

    useEffect(() => { return () => { updateNav({ type: "CHAT_SETTINGS", payload: false }) } }, [])


    return (
        <div className="">
            <RenameChatModal show={showRenameModal} setShow={setShowRenameModal} />
            <LeaveChatModal show={showLeaveModal} setShow={setShowLeaveModal} />
            <AddPeopleChatModal show={showAddModal} setShow={setShowAddModal} />
            <div className="border-bottom d-flex align-items-center mx-2 px-2" style={{ cursor: "pointer", height: "50px" }}
                onClick={() => setShowAddModal(true)}>
                Add People
            </div>
            <div className="border-bottom d-flex align-items-center mx-2 px-2" style={{ cursor: "pointer", height: "50px" }}
                onClick={() => setShowRenameModal(true)}>
                Rename Chat
            </div>
            {nav.chat.contactId &&
                <div className="border-bottom d-flex align-items-center mx-2 px-2" style={{ cursor: "pointer", height: "50px" }}
                    onClick={() => history.push(`/user/${nav.chat.contactId}`)}>
                    User Profile
                </div>
            }
            {/* {nav.chat.contactId && (
                blocked
                    ? <div className="border-bottom d-flex align-items-center mx-2 px-2" style={{ cursor: "pointer", height: "50px" }}
                        onClick={blockHandler}>
                        Block User
                    </div>
                    : <div className="border-bottom d-flex align-items-center mx-2 px-2" style={{ height: "50px" }}>
                        User Blocked
                    </div>
            )} */}
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

        </div>
    );
};

export default ChatSettings;
