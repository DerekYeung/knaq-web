import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { UserContext } from '../contexts/UserContext'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'

import TripleCol from '../components/TripleCol'
import PostModal from '../components/PostModal'
import PostExploreThumb from '../components/PostExploreThumb'

export const Explore = () => {

    const user = useContext(UserContext)

    //Modal
    const [show, setShow] = useState(false);
    const [modalPost, setModalPost] = useState({})

    const fetchFeed = async ({ pageParam = 0 }) => {
        return axios.get(`https://api.knaqapp.com/api/post/posts?start=${pageParam}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }

    const { data, fetchNextPage } = useInfiniteQuery('myHomeFeed', fetchFeed, {
        getNextPageParam: (_lastPage, allPages) => { return allPages.length }
    })

    useEffect(() => {
        let fetching = false;
        const onScroll = async (event) => {
            const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;

            if (!fetching && scrollHeight - scrollTop <= clientHeight * 2) {
                fetching = true;
                await fetchNextPage();
                fetching = false;
            }
        };

        document.addEventListener("scroll", onScroll)
        return () => { document.addEventListener("scroll", onScroll) }
    }, [])

    return (
        <Container >
            <PostModal show={show} setShow={setShow} post={modalPost} />
            <TripleCol>
                <Row>
                    {data?.pages?.map(pages =>
                        pages?.data?.data?.posts?.map((post) => (
                            <Col key={post.id} lg={4} className="p-0">
                                <div style={{ width: "100%", paddingBottom: "100%" }}
                                    onClick={() => { setShow(true); setModalPost(post) }}>
                                    <div className="p-2" style={{ width: "100%", height: "100%", position: "absolute", top: "0" }}>
                                        <PostExploreThumb post={post} />
                                    </div>
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            </TripleCol>
        </Container >
    )
}
export default Explore