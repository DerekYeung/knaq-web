import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const ComingSoon = ({ children, direction }) => {
    return (
        <OverlayTrigger
            key={direction}
            placement={direction}
            overlay={<Tooltip id='coming soon'>Coming Soon!</Tooltip>}
        >
            {children}
        </OverlayTrigger>

    )
}

export default ComingSoon