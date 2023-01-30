import React from 'react'
import { ListGroup } from 'react-bootstrap'

const RightBar = () => {
    return (
        <ListGroup variant="flush">
            <ListGroup.Item className="py-4">Cras justo odio</ListGroup.Item>
            <ListGroup.Item className="py-4">Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item className="py-4">Morbi leo risus</ListGroup.Item>
            <ListGroup.Item className="py-4">Porta ac consectetur ac</ListGroup.Item>
        </ListGroup>
    )
}

export default RightBar
