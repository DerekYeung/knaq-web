import axios from 'axios'
import React, { useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useQuery, useMutation } from 'react-query'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'

const BlockedUsers = () => {

    const user = useContext(UserContext)

    const { data, refetch } = useQuery('blocked', () => {
        return axios.get(`https://api.knaqapp.com/api/profile/blockings`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, { onSuccess: (data) => { console.log(data.data) } })
    const blocked = data && data.data && data.data.data



    const { mutate: unblockHandler, isLoading } = useMutation((id) => {
        return axios.delete(`https://api.knaqapp.com/api/contact/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            refetch()
        }
    })

    return (
        <div className='pb-4 border-bottom'>
            <h4 className="mt-2">Blocked Users</h4>
            <div style={{ maxHeight: "250px", overflowY: "scroll" }} className="hiddenScroll">
                <div className="px-3">
                    {blocked && blocked.map(user => (
                        <Row key={user.id} className="border-bottom py-3 mx-0">
                            <Col xs="auto" className="d-flex align-items-center px-0">
                                <img src={user.avatarUrl || "/images/Logo.png"} style={{ height: "40px", width: "40px", borderRadius: "100%" }}></img>
                            </Col>
                            <Col className=" d-flex align-items-center font-weight-bold" style={{ fontSize: "16px" }}>
                                {user.displayName}
                            </Col>
                            <Col xs="auto" className="d-flex align-items-center px-0">
                                <Button variant='outline-secondary' className="py-1 px-2"
                                    onClick={() => unblockHandler(user.id)} disabled={isLoading}
                                >Unblock</Button>
                            </Col>
                        </Row>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BlockedUsers