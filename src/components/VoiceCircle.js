import React, { useRef, useEffect, useContext, useState } from "react";
import { Col } from "react-bootstrap";
import { NavContext } from "../contexts/NavContext";
import { UserContext } from "../contexts/UserContext";

const VoiceCircle = ({ audioTrack, uid }) => {

  const nav = useContext(NavContext)
  const [volume, setVolume] = useState(0)
  const [member, setMember] = useState("")

  useEffect(() => {
    if (audioTrack) { audioTrack && audioTrack.play(); }
    return () => { audioTrack && audioTrack.stop(); };
  }, [audioTrack]);

  useEffect(() => {
    const interval = setInterval(() => { setVolume(audioTrack && audioTrack.getVolumeLevel()) }, 100);
    return () => clearInterval(interval);
  }, [audioTrack]);

  useEffect(() => {
    console.log(nav.voice.members.find(member => member.id == uid))
    setMember(nav.voice.members.find(member => member.id == uid))
  }, [uid, nav])



  return (

    <Col xs={3} key={uid} className="text-center px-2">
      <div className='mx-auto'
        style={{
          width: "50px", height: "50px", borderRadius: "100%",
          backgroundImage: `url(${(member && member.avatarUrl) || "/images/Logo.png"})`,
          backgroundSize: "cover",
          border: volume > 0.01 ? "3px solid green" : "3px solid white"
        }}>
      </div>
      <span className="">
        {member && member.id === nav.voice.creator && <i className="fas fa-crown mr-1" style={{ fontSize: "10px" }}></i>}
        {member && member.displayName}
        <i className={member && member.muted ? `fas fa-microphone-slash ml-1 text-danger` : `fas fa-microphone ml-2`}></i>
      </span>
    </Col>
  );
}

export default VoiceCircle;