import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useInfiniteQuery, useQuery } from 'react-query'
import NewPost from '../components/NewPost'
import Post from '../components/Post'
import TripleCol from '../components/TripleCol'
import axios from 'axios'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'
import { offlinePost } from '../util/offlineData'

const fetchRepositories = async (page = 1) => {
    const response = await fetch(
        `https://api.github.com/search/repositories?q=topic:reactjs&per_page=30&page=${page}`
    );
    return response.json();
};
export const Test = () => {


    const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
        "repositories",
        ({ pageParam = 1 }) => fetchRepositories(pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                const maxPages = lastPage.total_count / 30;
                const nextPage = allPages.length + 1;
                return nextPage <= maxPages ? nextPage : undefined;
            },
        }
    );

    useEffect(() => {
        let fetching = false;
        const onScroll = async (event) => {
            const { scrollHeight, scrollTop, clientHeight } =
                event.target.scrollingElement;

            console.log(!fetching && scrollHeight - scrollTop <= clientHeight * 1.5)

            if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
                fetching = true;
                console.log("fetching", fetching)
                console.log("hasNextPage", hasNextPage)
                await fetchNextPage();
                fetching = false;
                console.log("fetching", fetching)
            }
        };

        document.addEventListener("scroll", onScroll);
        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, []);

    console.log(data);

    return (
        <main>
            <h1>Infinite Scroll</h1>
            <ul>
                {data?.pages?.map((page) =>
                    page.items.map((repo) => (
                        <li key={repo.id}>
                            <p>
                                <b>{repo.name}</b>
                            </p>
                            <p>{repo.description}</p>
                        </li>
                    ))
                )}
            </ul>
        </main>
    );
}

export default Test