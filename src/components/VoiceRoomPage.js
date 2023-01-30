import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { NavContext, NavContextUpdate } from '../contexts/NavContext'
import { UserContext } from '../contexts/UserContext'
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '../util/useAgora';
import MediaPlayer from './MediaPlayer'
import { useMutation } from 'react-query'
import VoiceCircleSelf from './VoiceCircleSelf'
import VoiceCircle from './VoiceCircle'
import Loader from './Loader'



const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });
AgoraRTC.setLogLevel(2);


const VoiceRoomPage = () => {

    const { localAudioTrack, leave, join, joinState, remoteUsers } = useAgora(client);
    const user = useContext(UserContext)
    const nav = useContext(NavContext)
    const updateNav = useContext(NavContextUpdate)
    const [mutedButton, setMutedButton] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [joining, setJoining] = useState(false);

    const appid = "5b8d2896ebde4ab0b17bf01ce9559b0e"
    const channel = nav.voice.channelName
    const token = nav.voiceToken
    const uid = Number(user.id)


    // Join Mutate
    const { mutate, isLoading, reset } = useMutation(data => {
        return axios.post(`https://api.knaqapp.com/api/voiceRoom/room-token`, {
            "uid": user.id,
            "channelName": nav.voice.channelName,
            "roomId": nav.voice.id
        }, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }, {
        onSuccess: (data) => {
            console.log(data.data.data)
            reset()
            join(appid, channel, data.data.data, uid)
                .catch((e) => {
                    console.log("JCerror", e)
                    axios.post(`https://api.knaqapp.com/api/voiceroom/member/update-status`,
                        {
                            "roomId": nav.voice.id,
                            "userId": user.id,
                            "status": { "muted": false, "joined": false }
                        }, { headers: { Authorization: `Bearer ${user.token}` } })
                    setJoining(false)
                    console.log("joinstate", joinState)
                })
            console.log("reached here")
            setDisabled(false)
            axios.post(`https://api.knaqapp.com/api/voiceroom/member/update-status`,
                {
                    "roomId": nav.voice.id,
                    "userId": user.id,
                    "status": { "muted": false, "joined": true }
                }, { headers: { Authorization: `Bearer ${user.token}` } })
        }
    })

    const joinHandler = () => {
        setJoining(true)
        mutate()
    }


    const leaveHandler = async () => {
        leave()
        await axios.post(`https://api.knaqapp.com/api/voiceroom/member/update-status`,
            {
                "roomId": nav.voice.id,
                "userId": user.id,
                "status": { "muted": true, "joined": false }
            }, { headers: { Authorization: `Bearer ${user.token}` } })
        updateNav({ type: "VOICE_ID", payload: {} })
        nav.voiceRefetch()
    };

    const muteHandler = async () => {
        setDisabled(true)
        if (localAudioTrack.muted) { localAudioTrack.setMuted(false) }
        else { localAudioTrack.setMuted(true) }
        setMutedButton(localAudioTrack.muted)
        await axios.post(`https://api.knaqapp.com/api/voiceroom/member/update-status`,
            {
                "roomId": nav.voice.id,
                "userId": user.id,
                "status": { "muted": localAudioTrack.muted, "joined": true }
            }, { headers: { Authorization: `Bearer ${user.token}` } })
        setDisabled(false)
        nav.voiceRefetch()
    };


    return (
        <div className="px-3">
            <div style={{ height: "calc(100vh - 60px - 70px)" }}>
                <Row className="border-bottom mb-3 py-2" style={{ height: "60px" }}>
                    <Col style={{ fontSize: "25px" }}>
                        <i className="fas fa-microphone mt-2 mr-3 ml-2"></i>
                        <span className="mt-1" >
                            {nav.voice.members.length}
                        </span>
                    </Col>
                </Row>
                <div className="text-muted my-3" >Speakers</div>
                {(!joinState && joining) ? <Loader /> :
                    !joinState
                        ? <Row className="" style={{ margin: "0px -0.5rem" }}>
                            {nav.voice.members.filter(member => member.id !== user.id)
                                .map(member => <VoiceCircle key={member.id} audioTrack={user.audioTrack} uid={member.id} />)}
                        </Row>
                        : <Row className="" style={{ margin: "0px -0.5rem" }}>
                            {joinState && <VoiceCircleSelf audioTrack={localAudioTrack} />}
                            {remoteUsers.map(user => <VoiceCircle key={user.id} audioTrack={user.audioTrack} uid={user.uid} />)}
                        </Row>
                }
            </div>



            <Row className="align-items-center mx-0" style={{ height: "70px" }}>
                <Col xs="auto" className="">
                    {!joinState
                        ? <Button variant="info" className="py-0 text-capitalize"
                            style={{ borderRadius: "10px", height: "40px", width: "150px" }}
                            onClick={joinHandler} disabled={joining}>
                            {joining ? "Joining..." : "Join Voice Call"}
                        </Button>
                        : <Button variant="danger" className="py-0 text-capitalize"
                            style={{ borderRadius: "10px", height: "40px", width: "150px" }}
                            onClick={leaveHandler}>
                            Leave Voice Call
                        </Button>
                    }
                </Col>
                <Col xs="auto" className="px-1 text-center ml-auto">
                    <Button variant="outline-primary" className="p-0 rounded-circle"
                        style={{ height: "40px", width: "40px", borderWidth: "1px", borderColor: "#adb5bd" }}>
                        <i className="fas fa-plus" style={{ fontSize: "12px" }}></i>
                    </Button>
                </Col>
                <Col xs="auto" className="px-1 text-center">
                    {mutedButton
                        ? <Button variant="danger" className="p-0 rounded-circle"
                            style={{ height: "40px", width: "40px", borderWidth: "1px", borderColor: "#adb5bd" }}
                            onClick={muteHandler} disabled={!joinState || disabled}>
                            <i className="fas fa-microphone-slash mt-2" style={{ fontSize: "16px" }}></i>
                        </Button>
                        : <Button variant="outline-primary" className="p-0 rounded-circle"
                            style={{ height: "40px", width: "40px", borderWidth: "1px", borderColor: "#adb5bd" }}
                            onClick={muteHandler} disabled={!joinState || disabled}>
                            <i className="fas fa-microphone-slash mt-2" style={{ fontSize: "16px" }}></i>
                        </Button>}
                </Col>
            </Row>
        </div >
    )
}

export default VoiceRoomPage
