import React from 'react'
import useMediaQuery from '../hooks/useMediaQuery'

const MarketScreen = () => {
    const isMedium = useMediaQuery("(min-width: 768px)")
    const isLarge = useMediaQuery("(min-width: 992px)")

    return (
        <div style={{ height: "100vh", backgroundColor: "#000" }}>
            <img src="/images/Marketplace.png"
                style={{ width: "100%" }}
            />
        </div>
    )
}

export default MarketScreen