import React from 'react'
import { Carousel } from 'react-bootstrap'

export const CarouselContainer = () => {
    return (
        <Carousel>
            <Carousel.Item key={index} interval={5000}>
                <div className="font-weight-bold d-flex"
                    style={{ fontSize: "36px", backgroundColor: "white" }}>
                    <div className='my-4 py-3'
                        style={{ border: "1px solid black", borderRadius: "20px", width: "100%", margin: "0px 4rem" }}>
                        <h5>{`Title`}</h5>
                        <h6>{`description}`}</h6>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    )
}
