import React, { useContext, useState } from 'react'
import { Alert, Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'
import { useMutation } from 'react-query'
import Loader from './Loader'
import axios from 'axios'
import ComingSoon from './ComingSoon'

const ProfileTiers = ({ profile, refetchProfile }) => {

    const tiers = profile && profile.tiers
    const tier = tiers && tiers[0]

    const user = useContext(UserContext)
    const userUpdate = useContext(UserContextUpdate)
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState("")

    const [name, setName] = useState(tier.name || "")
    const [description, setDescription] = useState(tier.description || "")
    const [price, setPrice] = useState(tier.price || 1.99)

    // console.log(tier)
    const { mutate: saveHandler, isLoading } = useMutation(() => {
        return axios.put(`https://api.knaqapp.com/api/wallet/tier/${tier.id}`,
            { name, description, price },
            { headers: { Authorization: `Bearer ${user.token}` } }
        )
    }, {
        onSuccess: (data) => {
            console.log(data.data)
            setError('')
            refetchProfile()
            setEdit(false)
        },
        onError: (error) => {
            setError(error.response && error.response.data.message
                ? error.response.data.message : error.message)
        }
    })

    return (
        <div className='pb-4 border-bottom'>
            <h4 className="mt-2 mb-3">Subscriptions</h4>
            {error && <Alert variant='error'>{error}</Alert>}
            <Row className="mx-0 px-3">
                <Col style={{ backgroundColor: "var(--info)", borderRadius: "12.5px", color: "white" }}>
                    {isLoading && <div className="d-flex"
                        style={{
                            width: "100%", height: "100%", backgroundColor: "RGB(0,0,0,0.3)",
                            position: "absolute", marginLeft: "-15px", zIndex: "10"
                        }} >
                        <Loader />
                    </div>}
                    {!edit
                        ? <>
                            <div className="border-bottom my-2 d-flex justify-content-between">
                                <p className="mb-2 font-weight-bold">{tier.name}</p>
                                <p className="mb-2">{tier.subPrice} / month</p>
                            </div>
                            <p>{`${tier.description}`}</p>
                        </>
                        : <>
                            <Form className="py-3">
                                <Form.Group>
                                    <Form.Label>Subscription Name</Form.Label>
                                    <Form.Control className="px-2"
                                        value={name} onChange={(e) => { setName(e.target.value) }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Subscription Price</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text >$</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="number" className="px-2" value={price}
                                            onChange={(e) => { setPrice(e.target.value) }}
                                            onBlur={(e) => { setPrice(Number(e.target.value).toFixed(2)) }} />
                                        <InputGroup.Append>
                                            <InputGroup.Text>per Month</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Subscription Description</Form.Label>
                                    <Form.Control as="textarea" className="px-2"
                                        value={description} onChange={(e) => { setDescription(e.target.value) }} />
                                </Form.Group>
                            </Form>
                        </>
                    }
                </Col>
                <Col xs="auto" className="pr-0">
                    {!edit
                        ?
                        <div>
                            <ComingSoon>
                                <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: "5" }}></div>
                            </ComingSoon>
                            <Button size="sm" variant='secondary'
                                onClick={() => { setEdit(true) }} disabled>
                                <i className="fas fa-wrench fa-lg" />
                            </Button>
                        </div>
                        : <Button size="sm" variant='secondary'
                            onClick={saveHandler} disabled={isLoading}>
                            <i className="fas fa-check fa-lg " />
                        </Button>
                    }
                </Col>
            </Row>

        </div >
    )
}

export default ProfileTiers