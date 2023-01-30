import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { NavContext, NavContextUpdate } from '../contexts/NavContext';
import { UserContext } from '../contexts/UserContext';

const SharePostModal = ({ show, setShow, type, shareId }) => {

    const user = useContext(UserContext)
    const nav = useContext(NavContext)
    const updateNav = useContext(NavContextUpdate)

    const [search, setSearch] = useState("");
    const [people, setPeople] = useState([]);
    const [peopleFiltered, setPeopleFiltered] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [roomsFiltered, setRoomsFiltered] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);


    // Fetch People
    const { data: peopleData } = useQuery(`people?${search}`, () => {
        return axios.get(`https://api.knaqapp.com/api/user/find?q=${search}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            let raw = data.data.data
            raw = raw.filter(person => person.id !== user.id)
            setPeople([...raw])
        },
        enabled: !!search
    })


    // Fetch Rooms
    const { data: roomData } = useQuery(`rooms`, () => {
        return axios.get(`https://api.knaqapp.com/api/chat/rooms`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            let raw = data.data.data
            raw = raw.filter(room => room.memberCount > 1)
            setRooms([...raw])
        },
        enabled: !!show
    })


    // Select People
    const togglePersonHandler = (selected) => {
        if (selectedPeople.filter(person => person.id == selected.id).length == 0) {
            setSelectedPeople([...selectedPeople, selected])
            setPeopleFiltered(peopleFiltered.filter(person => person.id != selected.id))
        } else {
            setPeopleFiltered([...peopleFiltered, selected])
            setSelectedPeople(selectedPeople.filter(person => person.id != selected.id))
        }
    }

    // Select Rooms
    const toggleRoomHandler = (selected) => {
        if (selectedRooms.filter(room => room.id == selected.id).length == 0) {
            setSelectedRooms([...selectedRooms, selected])
            setRoomsFiltered(roomsFiltered.filter(room => room.id != selected.id))
        } else {
            setRoomsFiltered([...roomsFiltered, selected])
            setSelectedRooms(selectedRooms.filter(room => room.id != selected.id))
        }
    }

    // Search Filter Handler
    useEffect(() => {
        if (search) {
            setRoomsFiltered(
                rooms.filter(room =>
                    (room.title.includes(search) ||
                        room.members.find(member => member.displayName.toLowerCase().includes(search)))  // Members inside room
                    && selectedRooms.filter(selected => selected.id == room.id).length == 0
                )
            )
            setPeopleFiltered(people.filter(person =>
                rooms.filter(room => room.memberCount == 2 && room.members.find(member => member.id == person.id)).length == 0
                && selectedPeople.filter(selected => selected.id == person.id).length == 0))
        } else {
            setRoomsFiltered([...rooms].filter(room => selectedRooms.filter(selected => selected.id == room.id).length == 0))
            setPeopleFiltered([])
            // Suggested People Function Later
        }
    }, [search, people, rooms])


    // Share Mutation
    const { mutate: shareHandler, isLoading, reset } = useMutation(() => {
        return axios.post(
            `https://api.knaqapp.com/api/${type}/share`,
            {
                postId: type == "post" ? shareId : undefined,
                userId: type == "user" ? shareId : undefined,
                selectedContactIds: selectedPeople.map(user => user.id),
                selectedRoomIds: selectedRooms.map(room => room.id),
            },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onSuccess: (data) => {
            reset()
            updateNav({ type: "CHAT_ID", payload: data.data.data })
            closeHandler()
        },
    })

    // Close Modal and Reset
    const closeHandler = () => {
        setShow(false)
        setSearch('')
        setSelectedPeople([])
        setSelectedRooms([])
    }


    return (

        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title style={{ textTransform: 'capitalize' }}>Share {type}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0">
                <Form inline onSubmit={(e) => e.preventDefault()}>
                    <Form.Control value={search} placeholder="Search for people" disabled={isLoading}
                        className="py-0 mx-auto text-center px-5"
                        style={{ borderRadius: "25px", height: "36px" }}
                        onChange={(e) => setSearch(e.target.value)} />
                </Form>

                <div style={{ height: "calc(100vh - 450px)", overflowY: "scroll" }} className="hiddenScroll px-5 mt-2">

                    {(!!selectedRooms.length || !!selectedPeople.length) && <p className='mt-3 mb-0'>Selected</p>}
                    {selectedRooms.map(room => (
                        <Row key={room.id} className="border-bottom"
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleRoomHandler(room)}>
                            <Col xs="auto" className="d-flex align-items-center">
                                <img src={room.avatarUrl || "/images/Logo.png"} style={{ height: "50px", width: "50px", borderRadius: "100%" }}></img>
                            </Col>
                            <Col className=" d-flex align-items-center px-0 py-4 font-weight-bold" style={{ fontSize: "16px" }}>
                                {room.title}
                            </Col>
                            <Col xs="auto" className="d-flex align-items-center">
                                <i className="fas fa-lg fa-check-circle text-info" />
                            </Col>
                        </Row>
                    ))}
                    {selectedPeople.map(user => (
                        <Row key={user.id} className="border-bottom"
                            style={{ cursor: "pointer" }}
                            onClick={() => togglePersonHandler(user)}>
                            <Col xs="auto" className="d-flex align-items-center">
                                <img src={user.avatarUrl || "/images/Logo.png"} style={{ height: "50px", width: "50px", borderRadius: "100%" }}></img>
                            </Col>
                            <Col className=" d-flex align-items-center px-0 py-4 font-weight-bold" style={{ fontSize: "16px" }}>
                                {user.displayName}
                            </Col>
                            <Col xs="auto" className="d-flex align-items-center">
                                <i className="fas fa-lg fa-check-circle text-info" />
                            </Col>
                        </Row>
                    ))}

                    {!!roomsFiltered.length && <p className='mt-3 mb-0'>Rooms</p>}
                    {roomsFiltered.map(room => (
                        <Row key={room.id} className="border-bottom"
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleRoomHandler(room)}>
                            <Col xs="auto" className="d-flex align-items-center">
                                <img src={room.avatarUrl || "/images/Logo.png"} style={{ height: "50px", width: "50px", borderRadius: "100%" }}></img>
                            </Col>
                            <Col className=" d-flex align-items-center px-0 py-4 font-weight-bold" style={{ fontSize: "16px" }}>
                                {room.title}
                            </Col>
                        </Row>
                    ))}

                    {!!peopleFiltered.length && <p className='mt-3 mb-0'>People</p>}
                    {peopleFiltered.map(user => (
                        <Row key={user.id} className="border-bottom"
                            style={{ cursor: "pointer" }}
                            onClick={() => togglePersonHandler(user)}>
                            <Col xs="auto" className="d-flex align-items-center">
                                <img src={user.avatarUrl || "/images/Logo.png"} style={{ height: "50px", width: "50px", borderRadius: "100%" }}></img>
                            </Col>
                            <Col className=" d-flex align-items-center px-0 py-4 font-weight-bold" style={{ fontSize: "16px" }}>
                                {user.displayName}
                            </Col>
                        </Row>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="info" className="px-5 py-2" onClick={shareHandler} disabled={isLoading}>
                    Share
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SharePostModal;
