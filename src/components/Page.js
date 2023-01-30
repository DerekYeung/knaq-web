import React from 'react'
import { Container } from 'react-bootstrap'

export const Page = ({ title, children }) => {
    return (
        <Container className="bg-danger">
            <h2>{title}</h2>
            {children}
        </Container>
    )
}
