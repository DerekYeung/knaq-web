import React, { useRef, useEffect, useContext } from "react";
import { NavContext } from "../contexts/NavContext";
import { UserContext } from "../contexts/UserContext";

const MediaPlayer = ({ audioTrack, member }) => {
  const container = useRef(null);

  // useEffect(() => {
  //   if (!container.current) return;
  //   videoTrack && videoTrack.play(container.current);
  //   return () => {
  //     videoTrack && videoTrack.stop();
  //   };
  // }, [container, videoTrack]);

  const nav = useContext(NavContext)
  const user = useContext(UserContext)

  const memberID = member.id || member.uid

  useEffect(() => {
    if (audioTrack && memberID !== user.id) {
      audioTrack && audioTrack.play();
    }
    return () => {
      audioTrack && audioTrack.stop();
    };
  }, [audioTrack]);

  useEffect(() => {

  }, [user])


  return (
    <div ref={container} className="video-player" style={{ width: "100px", height: "100px" }}>
      {/* {memberID} */}
      <div className='mx-auto'
        style={{
          width: "50px", height: "50px", borderRadius: "100%",
          backgroundImage: `url(${nav.voice.members.find(member => member.id == memberID).avatarUrl || "/images/Logo.png"})`,
          backgroundSize: "cover"
        }}>
      </div>
      {/* <span className=""> */}
      {/* {memberID === nav.voice.creator && <i className="fas fa-crown mr-1" style={{ fontSize: "10px" }}></i>} */}
      {/* {member.displayName} */}
      {/* {memberID} */}
      {/* <i className={audioTrack.muted ? `fas fa-microphone-slash ml-1 text-danger` : `fas fa-microphone ml-2`}></i> */}
      {/* </span> */}
    </div>
  );
}

export default MediaPlayer;