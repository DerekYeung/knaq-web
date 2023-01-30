import React from 'react'
import { Button, Col, ProgressBar, Row } from 'react-bootstrap'

const Signup3 = ({ state, setState }) => {

    const submitHandler = (e) => {
        e.preventDefault()
        setState({ ...state, transition: 4 })
    }

    if (state.transition !== 3) return null
    return (
        <div className="">
            <h1 className="text-center mb-4" style={{ fontSize: "72px", }}>Remember Your Password!</h1>
            <Row className="mx-3">
                <Col className="px-1"><ProgressBar variant="success" now={100} key={0} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={100} key={1} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={100} key={2} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={0} key={3} /></Col>
                <Col className="px-1"><ProgressBar variant="success" now={0} key={4} /></Col>
            </Row>


            <Row>
                <Col xs={12} lg={{ span: 6, offset: 3 }}>
                    <div className="text-center">
                        <i className="my-5 fas fa-exclamation-triangle text-danger" style={{ fontSize: "150px" }}></i>
                    </div>
                    <p className='text-center my-4' style={{ fontSize: "18px" }}>
                        Please remember your password or write it down somewhere safe.
                    </p>
                    <p className="text-center my-4 " style={{ fontSize: "18px" }}>
                        If you lose your password Knaq may be unable to assist with recovering any funds.
                    </p>
                    <Button variant="info" block className="mt-4 mb-3" disabled={!state.code}
                        type="button" onClick={submitHandler}
                    >Next
                    </Button>

                </Col>
            </Row>
        </div>
    )
}

export default Signup3
