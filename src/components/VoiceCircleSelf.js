import React, { useRef, useEffect, useContext, useState } from "react";
import { Col } from "react-bootstrap";
import { NavContext } from "../contexts/NavContext";
import { UserContext } from "../contexts/UserContext";

const VoiceCircleSelf = ({ audioTrack }) => {

  const nav = useContext(NavContext)
  const user = useContext(UserContext)
  const [volume, setVolume] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => { setVolume(audioTrack && audioTrack.getVolumeLevel()) }, 100);
    return () => clearInterval(interval);
  }, [audioTrack]);


  return (

    <Col xs={3} key={user.id} className="text-center px-2">
      <div className='mx-auto'
        style={{
          width: "50px", height: "50px", borderRadius: "100%",
          backgroundImage: `url(${user.avatarUrl || "/images/Logo.png"})`,
          backgroundSize: "cover",
          border: volume > 0.01 ? "3px solid green" : "3px solid white"
        }}>
      </div>
      <span className="">
        {user.id === nav.voice.creator && <i className="fas fa-crown mr-1" style={{ fontSize: "10px" }}></i>}
        {user.displayName}
        <i className={audioTrack && audioTrack.muted ? `fas fa-microphone-slash ml-1 text-danger` : `fas fa-microphone ml-2`}></i>
      </span>
      { }
      {/* {audioTrack && audioTrack.isPlaying ? "Playing" : "Not"} */}
    </Col>
  );
}

export default VoiceCircleSelf;