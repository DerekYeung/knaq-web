import React from 'react'
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'

const CurrencyDropdown = () => {
    return (
        <Dropdown as={ButtonGroup} menuAlign="right">
            <Dropdown.Toggle
                variant="outline-secondary"
                id="dropdown-custom-2"
                className="border-0 my-3 py-1 px-2 mr-5"
                menuAlign="right"
            >USD
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors" menuAlign="right">
                <Dropdown.Item eventKey="1" >USD</Dropdown.Item>
                <Dropdown.Item eventKey="2">EUR</Dropdown.Item>
                <Dropdown.Item eventKey="3">RMB   </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CurrencyDropdown
