import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ButtonGroup, Col, Dropdown, Image, Row } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { UserContext } from '../contexts/UserContext'
import ShareModal from './ShareModal'

const ProfileDropdown = ({ profile }) => {

    const user = useContext(UserContext)
    const [showMenu, setShowMenu] = useState(false)

    const [blocked, setBlocked] = useState(false) // Temporary
    const [reported, setReported] = useState(false)
    const [showShare, setShowShare] = useState(false)
    useEffect(() => { setBlocked(profile.block); setReported(profile.report) }, [profile])

    // Handlers
    const shareHandler = () => {
        setShowShare(true)
    }

    const { mutate: reportHandler, isLoading: reporting } = useMutation(() => {
        return axios.post(
            `https://api.knaqapp.com/api/profile/report`,
            { userId: profile.id },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onSuccess: (data) => { setReported(true) },
    })

    const { mutate: blockHandler, isLoading: blocking } = useMutation(() => {
        return axios.post(
            `https://api.knaqapp.com/api/contact/block`,
            { otherId: profile.id },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onSuccess: (data) => { setBlocked(true) },
    })

    const { mutate: unblockHandler, isLoading: unblocking } = useMutation(() => {
        return axios.delete(`https://api.knaqapp.com/api/contact/${profile.id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => { setBlocked(false) },
    })

    return (
        <Dropdown show={showMenu}
            onToggle={(isOpen, event, metadata) => { if (metadata.source !== "select") { setShowMenu(isOpen); } }}
        >
            <ShareModal show={showShare} setShow={setShowShare} type={"user"} shareId={profile.id} />
            <Dropdown.Toggle as={ButtonGroup}>
                <div className="d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: "white", height: "30px", width: "30px", borderRadius: "100px" }}
                >
                    <i className="fas fa-ellipsis-v "></i>
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {blocked
                    ? <Dropdown.Item onClick={unblockHandler} disabled={unblocking}>Unblock User</Dropdown.Item>
                    : <Dropdown.Item onClick={blockHandler} disabled={blocking}>Block User</Dropdown.Item>
                }
                {reported
                    ? <Dropdown.Item disabled={true}>User Reported</Dropdown.Item>
                    : <Dropdown.Item onClick={reportHandler} disabled={reporting}>Report User</Dropdown.Item>
                }
                <Dropdown.Item onClick={shareHandler}>Share User</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown >
    )
}

export default ProfileDropdown