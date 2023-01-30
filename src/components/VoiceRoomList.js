import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { UserContext } from '../contexts/UserContext'
import { NavContext, NavContextUpdate } from '../contexts/NavContext'
import VoicePreview from './VoicePreview'

const VoiceRoomList = () => {

    const user = useContext(UserContext)
    const nav = useContext(NavContext)
    const updateNav = useContext(NavContextUpdate)

    const [rooms, setRooms] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState("")


    const { isLoading, data, refetch } = useQuery('voiceRoomList', () => {
        return axios.get(`https://api.knaqapp.com/api/voiceroom/list`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            let raw = data.data.data
            if (JSON.stringify(raw) === JSON.stringify(rooms)) return
            updateNav({ type: "VOICE_REFETCH", payload: refetch })
            setRooms([...raw])
            console.log("new voice room activity")
            console.log(raw)
            if (nav.voice.id) updateNav({ type: "VOICE_ID", payload: { ...raw.find(room => room.id === nav.voice.id) } })

        },
        refetchOnWindowFocus: true,
        refetchInterval: 2000,
        notifyOnChangeProps: []
    })

    useEffect(() => {
        if (search) {
            setFiltered(rooms.filter(room => {
                return room.title.toLowerCase().includes(search.toLowerCase())
                    || room.members.filter(member => member.displayName.toLowerCase().includes(search.toLowerCase())).length
            }))
        }
        else setFiltered(rooms)
    }, [search, rooms]);


    return (
        <div className="px-3">
            <Form className="py-2 border-bottom">
                <Form.Control type="text" placeholder="Search for people and groups"
                    className="py-0 mx-auto text-center"
                    style={{ borderRadius: "25px", height: "30px" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Form>
            {filtered.map(room => <VoicePreview key={room.id} room={room} refetchList={refetch} />)}
        </div>
    )
}

export default VoiceRoomList
