import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Carousel, Col, Form, Image, Modal, Row } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { NavContext, NavContextUpdate } from '../contexts/NavContext';
import { UserContext } from '../contexts/UserContext';

const SubscribeModal = ({ show, setShow, profile }) => {

    const user = useContext(UserContext)
    const nav = useContext(NavContext)

    const [page, setPage] = useState(0)
    const [months, setMonths] = useState(2)
    useEffect(() => { if (months < 0) setMonths(0) }, [months])

    // Close Modal and Reset
    const subscribeHandler = () => {
        setPage(2)
        // nav.postListRefetch()
    }

    const closeHandler = () => {
        setShow(false)
        setMonths(2)
        setPage(0)
    }


    return (
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <p className="text-center mr-3" style={{ fontWeight: "100", fontSize: "18px" }}>
                        {page == 2 ? "Success!" : "Subscribe To"}
                    </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 text-center">
                <Image src={profile.avatarUrl || "/images/Logo.png"} roundedCircle
                    style={{
                        objectFit: "cover",
                        width: "100px",
                        height: "100px",
                        position: "relative",
                        zIndex: "5",
                    }} />
                <h3 className="text-center mt-2">{profile.displayName}</h3>

                {page === 0 && (<>
                    <div className="d-flex"
                        style={{ backgroundColor: "white" }}>
                        {profile.tiers && <div className='my-2 py-3'
                            style={{ border: "1px solid black", borderRadius: "20px", width: "100%", margin: "0px 4rem" }}>
                            <h4 className="text-weight-bold">{`${profile.tiers[0].name}`}</h4>
                            <p>{`${profile.tiers[0].description}`}</p>
                            <h4 className="mt-4 mb-0">{`$${profile.tiers[0].subPrice} / month`}</h4>
                            {/* currency */}
                        </div>}
                    </div>
                    <div className="d-flex justify-content-center align-items-middle my-3">
                        <i className="fas fa-minus" style={{ fontSize: "30px", cursor: "pointer" }} onClick={() => { setMonths(months - 1) }}>
                        </i>
                        <h4 className="mx-3 pt-1 mb-0">{months} months</h4>
                        <i className="fas fa-plus" style={{ fontSize: "30px", cursor: "pointer" }} onClick={() => { setMonths(months + 1) }}></i>
                    </div>
                </>)}

                {page === 1 && (<>
                    <p>Purchase <b>{profile.tiers[0].name}</b>
                        <br />Subscription for <b>{months} months </b>
                        <br /> for a total of:
                    </p>
                    <h1 style={{ color: "#BBEA30", fontSize: "40px" }}>${profile.tiers[0].subPrice * months}</h1>
                    {/* currency */}
                </>)}

                {page === 2 && (<>
                    <p>You have successfully purchased a
                        <br /><b>{profile.tiers[0].name}</b>
                        <br />subscription for
                        <br /><b>{months} months </b>
                    </p>

                </>)}

            </Modal.Body>
            <Modal.Footer>
                {page === 0 && <Button variant="info" className="px-5 py-2" onClick={() => setPage(1)}>Continue</Button>}
                {page === 1 && <Button variant="info" className="px-5 py-2" onClick={subscribeHandler}>Purchase</Button>}
                {page === 2 && <Button variant="info" className="px-5 py-2" onClick={closeHandler}>Done</Button>}
            </Modal.Footer>
        </Modal>
    );
};

export default SubscribeModal;
