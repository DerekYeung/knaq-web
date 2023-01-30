import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { UserContext } from '../contexts/UserContext';
import ComingSoon from './ComingSoon';
import Post from './Post';

const PostTabs = ({ id }) => {

    const user = useContext(UserContext)
    const [free, setFree] = useState([]);
    const [paid, setPaid] = useState([]);
    const [isSubbed, setIsSubbed] = useState(true);

    useQuery(`userFree=${id}`, () => {
        const URL = "https://api.knaqapp.com/api"
        return axios.get(URL + `/post/posts?otherId=${id}&isFree=true`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            let raw = data.data.data.posts
            setFree([...raw])
        },
    })

    useQuery(`userSub=${id}`, () => {
        const URL = "https://api.knaqapp.com/api"
        return axios.get(URL + `/post/posts?otherId=${id}&isFree=false`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            let raw = data.data.data.posts
            setPaid([...raw])
        },
        enabled: isSubbed
    })


    return (
        <div style={{ height: "100vh" }}>
            <Tabs defaultActiveKey="public" id="tabs">
                <Tab eventKey="public" title="Public">
                    {free.map((post) => (<Post key={post.id} hideTop={false} post={post} />))}
                </Tab>

                {/* <ComingSoon> */}

                <Tab eventKey="subOnly" title="Sub-Only (Coming Soon)" disabled>
                    {paid.map((post) => (<Post key={post.id} hideTop={false} post={post} />))}
                </Tab>
                {/* </ComingSoon> */}
            </Tabs>
        </div>
    );
};

export default PostTabs;
