import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useQuery } from 'react-query'
import ChatPreview from './ChatPreview'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'
import ChatHeader from './ChatHeader'

const ChatRoomList = () => {

    const user = useContext(UserContext)
    const [rooms, setRooms] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState("")

    console.log("List")

    const { isLoading, data, refetch } = useQuery('chatRoomList', () => {
        const URL = "https://api.knaqapp.com/api"
        return axios.get(URL + `/chat/rooms`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            let raw = data.data.data
            if (JSON.stringify(raw) === JSON.stringify(rooms)) return
            setRooms([...raw])
            console.log("new chat room activity")
        },
        refetchOnWindowFocus: true,
        refetchInterval: 2000,
        notifyOnChangeProps: []
    })


    useEffect(() => {
        if (search) {
            setFiltered(rooms.filter(room => {
                if (!room.lastMessage) return false
                return room.title.toLowerCase().includes(search.toLowerCase())
                    || room.members.filter(member => member.displayName.toLowerCase().includes(search.toLowerCase())).length
            }))
        }
        else setFiltered(rooms.filter(room => room.lastMessage))
    }, [search, rooms]);


    return (
        <>
            {/* <div className="border-left border-right" style={{ position: 'absolute', top: "-60px", height: "60px", width: "100%", marginLeft: "-2px" }}>
                <ChatHeader />
            </div> */}
            <div className="px-3">
                <Form className="py-2 border-bottom">
                    <Form.Control type="text" placeholder="Search for people and groups"
                        className="py-0 mx-auto text-center"
                        style={{ borderRadius: "25px", height: "30px" }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Form>
                {filtered.map(room => <ChatPreview key={room.id} room={room} />)}
            </div>
        </>
    )
}

export default ChatRoomList
