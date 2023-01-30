import React, { useState } from 'react'
import { Col, Form, } from 'react-bootstrap'
import SearchPeopleModal from './SearchPeopleModal';


const SearchHeader = () => {

    const [showSearch, setShowSearch] = useState(false);

    return (

        <>
            <Col xs={6} className="my-auto">
                <Form inline onSubmit={(e) => e.preventDefault()}>
                    <div className="py-0 mx-auto"
                        onClick={() => setShowSearch(true)}>
                        <Form.Control placeholder="Search" disabled={true}
                            className="text-center"
                            style={{ borderRadius: "25px", height: "36px", width: "250px" }}
                        />
                    </div>
                </Form>
                {/* <i className="far fa-bell fa-lg" style={{ position: "absolute", right: 5, top: "10px" }}
                // onClick={() => {}} 
                /> */}

            </Col>
            <SearchPeopleModal show={showSearch} setShow={setShowSearch} />
        </>

    )
}

export default SearchHeader
