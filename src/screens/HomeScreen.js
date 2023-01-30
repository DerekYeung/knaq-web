import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useInfiniteQuery } from 'react-query'
import NewPost from '../components/NewPost'
import Post from '../components/Post'
import TripleCol from '../components/TripleCol'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'

export const Home = () => {

    console.log("HomeScreen")

    const user = useContext(UserContext)

    const fetchFeed = async ({ pageParam = 0 }) => {
        return axios.get(`https://api.knaqapp.com/api/post/posts?isMyFeed=true&start=${pageParam}`, {
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
        <Container>
            <TripleCol>
                <NewPost />
                {data?.pages?.map(pages =>
                    pages?.data?.data?.posts?.map(post =>
                        <Post key={post.id} post={post} />
                    )
                )}
                <h3 className="text-center text-muted my-5">Loading More Posts</h3>
            </TripleCol>
        </Container >
    )
}

export default Home