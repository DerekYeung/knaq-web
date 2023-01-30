import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { useMutation } from 'react-query'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import { NavContext } from '../contexts/NavContext'
import { toUSD } from '../util/common'

const StripeModal = ({ show, setShow }) => {

    const user = useContext(UserContext)
    const nav = useContext(NavContext)

    const [page, setPage] = useState(0)
    const [amount, setAmount] = useState(100)
    useEffect(() => { if (amount < 0) setAmount(0) }, [amount])

    const [error, setError] = useState("")
    const { mutate: stripeHandler, isLoading } = useMutation(() => {
        setError("")
        return axios.post(`/create-checkout-session`, {
            quantity: amount
        })
    }, {
        onSuccess: (data) => {
            console.log(data.data)
            window.location = data.data
        },
        onError: (error) => {
            setError(error.response && error.response.data.message
                ? error.response.data.message : error.message)
        }
    })

    const closeHandler = () => {
        setAmount(100)
        setError("")
        setShow(false)
    }
    return (
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h2 className="text-center mr-3">{page == 2 ? "Success!" : "Purchase Feathers"}</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">

                {page === 0 && (<>
                    <div className="d-flex flex-column align-items-center">
                        <div>
                            <Button className="px-5" variant="outline-secondary" size="sm"
                                onClick={() => { setAmount(100) }}>
                                100 <i className="fas fa-feather" />
                            </Button>
                            <Button className="px-5 mx-2" variant="outline-secondary" size="sm"
                                onClick={() => { setAmount(500) }}>
                                500 <i className="fas fa-feather" />
                            </Button>
                            <Button className="px-5" variant="outline-secondary" size="sm"
                                onClick={() => { setAmount(1000) }}>
                                1000 <i className="fas fa-feather" />
                            </Button>
                        </div>
                        <InputGroup className="mt-4" style={{ width: "250px" }}>
                            <InputGroup.Prepend >
                                <InputGroup.Text className="px-3" style={{ fontSize: "40px" }}>
                                    <i className="fas fa-feather" />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="number" className="p-2 text-center" style={{ fontSize: "40px" }}
                                value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                        </InputGroup>
                        <h5 className="mt-3 mb-0">Price: {toUSD(amount)}</h5>
                    </div>

                </>)}


                {page === 1 && (<>
                    <p>You Purchased <b>{amount}</b></p>
                    <h1 style={{ color: "#BBEA30", fontSize: "40px" }}>${amount}</h1>
                    {/* currency */}
                </>)}

            </Modal.Body>
            <Modal.Footer>
                {page === 0 && <Button variant="info" className="px-5 py-2"
                    onClick={stripeHandler} disabled={amount == 0}>Continue</Button>}
                {page === 1 && <Button variant="info" className="px-5 py-2" onClick={stripeHandler}>Send Tip</Button>}
                {page === 2 && <Button variant="info" className="px-5 py-2" onClick={closeHandler}>Done</Button>}
            </Modal.Footer>
        </Modal>
    )
}

export default StripeModal