import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Carousel, Col, Form, Image, InputGroup, Modal, Row } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { NavContext, NavContextUpdate } from '../contexts/NavContext';
import { UserContext } from '../contexts/UserContext';

const TipModal = ({ show, setShow, post }) => {

    const user = useContext(UserContext)
    const nav = useContext(NavContext)

    const [page, setPage] = useState(0)
    const [amount, setAmount] = useState(1.00)
    useEffect(() => { if (amount < 0) setAmount(0) }, [amount])

    // Close Modal and Reset
    const TipHandler = () => {
        setPage(2)
        // nav.postListRefetch()
    }

    const closeHandler = () => {
        setShow(false)
        setAmount(1.00)
        setPage(0)
    }


    return (
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h2 className="text-center mr-3">{page == 2 ? "Success!" : "Send Tip"}</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 text-center">

                {page === 0 && (<>
                    <div className="d-flex flex-column align-items-center">
                        <p>Wallet Balance:</p>
                        <div>
                            <Button className="px-5" variant="outline-secondary" size="sm"
                                onClick={() => { setAmount(1.00) }}>$1</Button>
                            <Button className="px-5 mx-2" variant="outline-secondary" size="sm"
                                onClick={() => { setAmount(5.00) }}>$5</Button>
                            <Button className="px-5" variant="outline-secondary" size="sm"
                                onClick={() => { setAmount(10.00) }}>$10</Button>
                        </div>
                        <InputGroup className="mt-4" style={{ width: "250px" }}>
                            <InputGroup.Prepend >
                                <InputGroup.Text className="px-3" style={{ fontSize: "40px" }}>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="number" className="p-2 text-center" style={{ fontSize: "40px" }}
                                value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                        </InputGroup>
                    </div>

                </>)}

                {page === 1 && (<>
                    <p>Tip <b>{post.user.displayName}</b> a total of:</p>
                    <h1 style={{ color: "#BBEA30", fontSize: "40px" }}>${amount}</h1>
                    {/* currency */}
                </>)}

                {page === 2 && (<>
                    <p>You tipped <b>{post.user.displayName}</b></p>
                    <h1 style={{ color: "#BBEA30", fontSize: "40px" }}>${amount}</h1>
                    {/* currency */}
                </>)}

            </Modal.Body>
            <Modal.Footer>
                {page === 0 && <Button variant="info" className="px-5 py-2"
                    onClick={() => setPage(1)} disabled={amount == 0}>Continue</Button>}
                {page === 1 && <Button variant="info" className="px-5 py-2" onClick={TipHandler}>Send Tip</Button>}
                {page === 2 && <Button variant="info" className="px-5 py-2" onClick={closeHandler}>Done</Button>}
            </Modal.Footer>
        </Modal>
    );
};

export default TipModal;
