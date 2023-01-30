import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { UserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom'

const SearchPeopleModal = ({ show, setShow }) => {

    const user = useContext(UserContext)
    const [search, setSearch] = useState("");
    const [raw, setRaw] = useState([]);



    // Search for People
    const { refetch } = useQuery(`search=${search}`, () => {
        return axios.get(`https://api.knaqapp.com/api/user/find?q=${search}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            let raw = data.data.data
            // raw = raw.filter(search => search.id !== user.id)
            setRaw([...raw])
        },
        enabled: !!search
    })

    // Close Modal and Reset
    const closeHandler = () => {
        setShow(false)
        setSearch('')
    }

    const mySearch = useRef();
    useEffect(() => {
        if (show) mySearch.current.focus()
    }, [show]);

    useEffect(() => {
        if (!search) setRaw([])
    }, [search]);

    const history = useHistory()
    const profileHandler = (userId) => {
        history.push(`/user/${userId}`)
        closeHandler()
    }

    return (

        <Modal show={show} onHide={closeHandler}
            dialogClassName='header-search' >
            <Form inline onSubmit={(e) => e.preventDefault()}
                style={{ marginTop: "11px" }}>
                <Form.Control value={search} ref={mySearch}
                    className="py-0 mx-auto text-center px-5"
                    style={{ borderRadius: "25px", height: "36px", width: "250px" }}
                    onChange={(e) => setSearch(e.target.value)} />
            </Form>
            <div style={{ height: "calc(100vh - 150px)", overflowY: "scroll" }} className="hiddenScroll px-5 mt-2">
                {search && raw.map(user => (
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

export default SearchPeopleModal;
