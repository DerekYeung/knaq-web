import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, ProgressBar, Row } from 'react-bootstrap'
import { UserContext } from '../contexts/UserContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import UploadPhotoModal from './UploadPhotoModal'
import UploadVideoModal from './UploadVideoModal'
import ComingSoon from './ComingSoon'
import Post from './Post'

const NewPost = () => {

    const user = useContext(UserContext)
    const [write, setWrite] = useState(false);
    const [postText, setPostText] = useState("");
    const [checked, setChecked] = useState(false);

    const [showPicture, setShowPicture] = useState(false);
    const [cropUrl, setCropUrl] = useState("")
    const [cropBlob, setCropBlob] = useState("")
    const [pictureArray, setPictureArray] = useState([])
    const [showVideo, setShowVideo] = useState(false);
    const [videoFile, setVideoFile] = useState("")
    const [uploadProgress, setUploadProgress] = useState(0)

    const [newPostId, setNewPostId] = useState("")

    // Temp: myFeed to include my Posts
    const { data: newPostData } = useQuery([`newPost`, newPostId], () =>
        axios.get(`https://api.knaqapp.com/api/post/${newPostId}`,
            { headers: { Authorization: `Bearer ${user.token}` }, }
        ),
        { enabled: !!newPostId, }
    )
    // Temp: myFeed to include my Posts

    const { mutate, isLoading, reset } = useMutation(() => {
        const formData = new FormData()
        formData.append('text', postText)
        formData.append('subOnly', checked)
        pictureArray.forEach(pic => formData.append('image', pic.blob))
        if (videoFile) formData.append('video', videoFile)

        return axios.post(`https://api.knaqapp.com/api/post/publish`, formData,
            {
                headers: { Authorization: `Bearer ${user.token}` },
                onUploadProgress: progressEvent => {
                    setUploadProgress(parseInt(Math.round(progressEvent.loaded / progressEvent.total * 100)))
                }
            }
        )
    }, {
        onSuccess: (data) => {
            console.log(data.data)
            setNewPostId(data.data.data.postId)
            setWrite(``)
            setPostText(``)
            setChecked(false)
            setPictureArray([])
            setVideoFile('')
            setUploadProgress(0)
            reset()
        },
    })

    const postHandler = () => {
        mutate(postText)
    }

    const myForm = useRef();
    useEffect(() => { if (write) myForm.current.focus() }, [write]);

    useEffect(() => {
        if (!showPicture && cropUrl) {
            setPictureArray([...pictureArray, { url: cropUrl, blob: cropBlob }])
            setCropUrl("")
            setCropBlob("")
        }
    }, [showPicture])



    return (
        <div className="mt-3">
            <UploadPhotoModal show={showPicture} setShow={setShowPicture}
                setCropUrl={setCropUrl} setCropBlob={setCropBlob} cropType="square"
            />
            <UploadVideoModal show={showVideo} setShow={setShowVideo}
                setVideoFile={setVideoFile}
            />
            <Row className="pt-2 border-bottom">
                <Col xs="auto" className="pr-0">
                    <img src={user.avatarUrl || "/images/Logo.png"}
                        style={{ height: "30px", width: "30px", borderRadius: "100%" }}
                    />
                </Col>

                <Col className="mr-2">
                    {write && <Form.Control as="textarea" rows={3} value={postText} ref={myForm}
                        onChange={(e) => setPostText(e.target.value)}
                    ></Form.Control>}
                    {!write && <p onClick={() => setWrite(true)} className="text-muted mb-4">What's Happening?</p>}

                    {(pictureArray.length > 0 || videoFile) &&
                        <Form.Row >
                            {pictureArray.map(pic => (
                                <Col xs={3} key={pic.url} className="mt-3">
                                    <div
                                        style={{
                                            paddingBottom: "100%", width: "100%", borderRadius: "5px", margin: "none",
                                            backgroundImage: `url(${pic.url})`,
                                            backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                            cursor: "pointer"
                                        }}
                                        className="deleteHover d-flex justify-content-end"
                                        onClick={() => setPictureArray(pictureArray.filter(item => item.url !== pic.url))}
                                    />
                                </Col>
                            ))}
                            {videoFile &&
                                <Col xs={3} className="mt-3">
                                    <div style={{ width: "100%", paddingBottom: "100%" }}>
                                        <div style={{
                                            position: "absolute", top: "0", width: "calc(100% - 10px)", height: "100%",
                                            border: "2px solid #AFAFAF", borderRadius: "5px", backgroundColor: "#F4F4F4",
                                            color: "#AFAFAF", cursor: "pointer"
                                        }}
                                            className="d-flex flex-column align-items-end deleteHover"
                                            onClick={() => setVideoFile("")}
                                        >
                                            <div className="my-auto" style={{ width: "100%" }}>
                                                <div className="text-center px-2" style={{ width: "100%" }}>
                                                    <i className="fas fa-video my-2" />
                                                </div>
                                                <div className="text-center px-2" style={{ overflowWrap: "break-word", fontSize: "10px" }}>
                                                    {videoFile.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            }

                            {pictureArray.length < 10 &&
                                <Col xs={3} className="mt-3">
                                    <div style={{ width: "100%", paddingBottom: "100%" }}>
                                        <div style={{
                                            position: "absolute", top: "0", width: "calc(100% - 10px)", height: "100%",
                                            border: "2px dashed #AFAFAF", borderRadius: "5px", backgroundColor: "#F4F4F4",
                                            color: "#AFAFAF", cursor: "pointer"
                                        }}
                                            className="d-flex flex-column align-items-center justify-content-center"
                                            onClick={() => setShowPicture(true)}
                                        >
                                            <i className="fas fa-plus my-2" />Add Photo
                                        </div>
                                    </div>
                                </Col>
                            }
                            {!videoFile &&
                                <Col xs={3} className="mt-3">
                                    <div style={{ width: "100%", paddingBottom: "100%" }}>
                                        <div style={{
                                            position: "absolute", top: "0", width: "calc(100% - 10px)", height: "100%",
                                            border: "2px dashed #AFAFAF", borderRadius: "5px", backgroundColor: "#F4F4F4",
                                            color: "#AFAFAF", cursor: "pointer"
                                        }}
                                            className="d-flex flex-column align-items-center justify-content-center"
                                            onClick={() => setShowVideo(true)}
                                        >
                                            <i className="fas fa-plus my-2" />Add Video
                                        </div>
                                    </div>
                                </Col>
                            }
                        </Form.Row>
                    }
                    {uploadProgress > 0 && <ProgressBar variant='info' className="mt-3" animated now={uploadProgress} />}
                    <Row className="ml-0 my-3">
                        {(pictureArray.length === 0 && !videoFile) &&
                            <>
                                <Col xs="auto" className="px-1 my-auto ">
                                    <i className="far fa-image fa-lg" style={{ cursor: "pointer" }}
                                        onClick={() => setShowPicture(true)}>
                                    </i>
                                </Col>
                                <Col xs="auto" className="px-1 my-auto">
                                    <i className="fas fa-video fa-lg" style={{ cursor: "pointer" }}
                                        onClick={() => setShowVideo(true)}>
                                    </i>
                                </Col>
                            </>
                        }

                        <Col xs="auto" className="px-1 my-auto ml-auto">
                            <p className="mb-0">Sub-Only</p>
                        </Col>

                        <ComingSoon direction='bottom'>
                            <Col xs="auto" className="px-1 my-auto">
                                <div>
                                    <Form.Check
                                        type="switch"
                                        id="subonlyCheck"
                                        checked={checked}
                                        onChange={(e) => setChecked(!checked)}
                                        disabled
                                    />
                                </div>
                            </Col>
                        </ComingSoon>
                        <Col xs="auto" className="border-left">
                            <Button size="sm"
                                disabled={postText.length === 0 || isLoading}
                                onClick={postHandler}
                            >{isLoading ? "Posting..." : "Post"}</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {newPostData?.data?.data && <Post post={newPostData.data.data} />}

        </div>
    )
}

export default NewPost
