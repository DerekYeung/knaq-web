import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Pagination, Navigation } from 'swiper'

import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'


const PostMedia = ({ post }) => {

    if (post.images?.length && post.video && post.videoScreenshot) return (
        <Swiper
            style={{ height: "calc(100% + 40px)", width: "100%" }}
            pagination navigation
            modules={[Pagination, Navigation]}
        >
            <SwiperSlide>
                <video controls style={{ width: "100%" }}>
                    <source src={post.video} type="video/webm"></source>
                </video>
            </SwiperSlide>
            {post.images.map(image => (
                <SwiperSlide key={image}>
                    <div style={{
                        width: "100%", height: "calc(100% - 40px)", backgroundImage: `url(${image})`,
                        backgroundSize: "cover", backgroundPosition: "center"
                    }} />
                </SwiperSlide>
            ))}
        </Swiper>
    )

    if (post.images?.length > 1) return (
        <Swiper
            style={{ height: "calc(100% + 40px)", width: "100%" }}
            pagination navigation
            modules={[Pagination, Navigation]}
        >
            {post.images.map(image => (
                <SwiperSlide key={image}>
                    <div style={{
                        width: "100%", height: "calc(100% - 40px)", backgroundImage: `url(${image})`,
                        backgroundSize: "cover", backgroundPosition: "center"
                    }} />
                </SwiperSlide>
            ))}
        </Swiper>
    )

    if (post.images?.length === 1) return (
        <div style={{
            width: "100%", backgroundImage: `url(${post.images[0]})`,
            backgroundSize: "cover", backgroundPosition: "center"
        }} />
    )

    if (post.video && post.videoScreenshot) return (
        <video controls style={{ width: "100%" }}>
            <source src={post.video} type="video/webm"></source>
        </video>
    )

    if (post.text) return (
        <div className='d-flex align-items-center justify-content-center text-center p-5'
            style={{
                height: "100%", width: "100%", backgroundColor: "#EEE", overflow: "hidden",
                whiteSpace: "pre-wrap", fontSize: "36px", fontWeight: "bold"
            }}>
            {post.text}</div>
    )

    return null
}

export default PostMedia