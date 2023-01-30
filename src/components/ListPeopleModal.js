import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { UserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom'

const ListPeopleModal = ({ show, setShow, keyword }) => {

    const user = useContext(UserContext)
    const [raw, setRaw] = useState([]);
    keyword = keyword || "followings"


    // Query
    const { refetch } = useQuery(`${keyword}`, () => {
        return axios.get(`https://api.knaqapp.com/api/profile/${keyword}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            let raw = data.data.data
            if (raw) setRaw([...raw])
        },
        enabled: !!keyword
    })

    const closeHandler = () => {
        setShow(false)
    }

    const history = useHistory()
    const profileHandler = (userId) => {
        history.push(`/user/${userId}`)
        closeHandler()
    }

    return (

        <Modal show={show} onHide={closeHandler}>
            <div style={{ overflowY: "scroll", height: 'calc(100vh - 250px)' }} className="hiddenScroll px-5 mt-2">
                {raw && raw.map(user => (
                    <Row key={user.id} className="border-bottom" style={{ cursor: "pointer" }}
                        onClick={() => profileHandler(user.id)}>
                        <Col xs="auto" className="d-flex align-items-center">
                            <img src={user.avatarUrl || "/images/Logo.png"} style={{ height: "50px", width: "50px", borderRadius: "100%" }}></img>
                        </Col>
                        <Col className=" d-flex align-items-center px-0 py-4 font-weight-bold" style={{ fontSize: "16px" }}>
                            {user.displayName}
                        </Col>
                    </Row>
                ))}
            </div>
        </Modal>
    );
};

export default ListPeopleModal;
