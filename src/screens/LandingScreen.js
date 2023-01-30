import React, { useState } from 'react'
import { Accordion, Alert, Button, Card, Col, Container, Form, Image, InputGroup, Nav, Navbar, Row } from 'react-bootstrap'
import StaticPage from '../components/StaticPage'
import { useMutation } from 'react-query'
import axios from 'axios'
import Logo from '../components/Logo'
import useMediaQuery from '../hooks/useMediaQuery'
import { LinkContainer } from 'react-router-bootstrap'

const LandingScreen = () => {

    const dev = process.env.NODE_ENV == "development"
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const isMedium = useMediaQuery("(min-width: 768px)")
    const isLarge = useMediaQuery("(min-width: 992px)")

    const { mutate: waitlistHandler, isLoading } = useMutation((e) => {
        e.preventDefault()
        return axios.post(`/api/manualWaitlist`, { email })
    }, {
        onSuccess: (data) => { setSuccess(true); setError('') },
        onError: (error) => { setError(error.response && error.response.data.message ? error.response.data.message : error.message) }
    })

    return (
        <>
            {/* {dev && <div style={{ position: "fixed", top: 0, zIndex: 20 }}>{isLarge ? "Large" : isMedium ? "Medium" : "Small"}</div>} */}
            <div id="tan" style={{ backgroundImage: "url('images/BG1.jpg')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}>

                {/* <Navbar> */}
                <Nav className="">
                    <Nav.Link className="ml-3 mt-3" active={false} href="/"><img src="images/Logo-Full.png" style={{ width: isLarge ? "150px" : "100px" }}></img></Nav.Link>
                    <Nav.Link className="px-1 mt-3 ml-auto" active={false} target="_blank" href="https://discord.gg/H4TAHRGNHR"><img className="social-icons" src="./icons/discord_icon.png" /></Nav.Link>
                    <Nav.Link className="px-1 mt-3 " active={false} target="_blank" href="http://www.instagram.com/knaqapp"><img className="social-icons" src="./icons/instagram_icon.png" /></Nav.Link>
                    <Nav.Link className="px-1 mt-3 mr-3" active={false} target="_blank" href="http://www.twitter.com/knaqapp"><img className="social-icons" src="./icons/twitter_icon.png" /></Nav.Link>
                </Nav>
                {/* </Navbar> */}

                <Container id="hero" className="">
                    <Row className='pt-4 py-lg-5 px-0 px-lg-4'>
                        <Col xs={12} lg={{ span: 10, offset: 1 }} className="my-auto">
                            <div>
                                <h1 className="mt-lg-5 mx-auto" style={{ textAlign: "center", color: "var(--indigo)", maxWidth: "750px" }}>
                                    The loyalty platform that rewards fans and strengthens communities
                                </h1>
                                <p className="my-4 my-lg-5">Its about time fans get something in return!</p>
                                {error && <Alert variant='danger'>{error}</Alert>}
                                {success
                                    ? <Alert variant="success" className="mx-5" style={{}}>Subscribed! Check your email for upcoming updates.</Alert>
                                    : <Form inline onSubmit={waitlistHandler} className="justify-content-center">
                                        <Form.Control placeholder="type your email" type="email"
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            style={{
                                                borderRadius: "100px", width: "350px", height: "40px",
                                                textAlign: isLarge ? "left" : "center"
                                            }}
                                            className="px-4 mr-lg-2 indigoForm"
                                        />
                                        <Button variant='secondary' type="submit"
                                            style={{
                                                borderRadius: "100px", height: "40px",
                                                width: isLarge ? "" : "350px"
                                            }}
                                            className="pl-4 pr-2 py-0 mt-lg-0 mt-2"
                                        >
                                            join waitlist
                                            <img src="/icons/arrow_right_1.svg" style={{ height: "70%" }} className="pl-3" />
                                        </Button>
                                    </Form>}
                                {/* </div> */}
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Row id="rainbowbar" className="mx-0 my-5" style={{ background: "linear-gradient(to right, #392269, #bf1a2f, #f68721, #39b54a, #007abb)" }}>
                    <Container>
                        <Row className="" style={{ color: "var(--tan)" }}>
                            <Col xs={12} lg={4} className="my-3 d-flex align-items-center justify-content-center">
                                <h6>fans rewarded</h6>
                                <img style={{ height: "35px" }} className="svg-icon mx-3" src="icons/users-icon.svg" />
                                <h4>1,408,922</h4>
                            </Col>
                            <Col xs={12} lg={4} className="my-3 d-flex align-items-center justify-content-center"
                                style={{
                                    borderLeft: isLarge ? "2px solid var(--tan)" : "",
                                    borderRight: isLarge ? "2px solid var(--tan)" : ""
                                }} >
                                <h6>payouts earned</h6>
                                <img style={{ height: "35px" }} className="svg-icon mx-3" src="icons/money-icon.svg" />
                                <h6>coming soon!</h6>
                                {/* <h4>131,050</h4> */}
                            </Col>
                            <Col xs={12} lg={4} className="my-3 d-flex align-items-center justify-content-center">
                                <h6>loyalty earned</h6>
                                <img style={{ height: "35px" }} className="svg-icon mx-3" src="icons/heart-icon.svg" />
                                <h6>coming soon!</h6>
                                {/* <h4>120,210</h4> */}
                            </Col>
                        </Row>
                    </Container>
                </Row>

                <Container id="iPad">
                    <img src="/images/Knaq-iPad-Marketplace.png"
                        style={{ width: "100%" }} />
                </Container>

                <Container id="blue" className='py-5 px-0' style={{ color: "var(--tan)", position: "relative" }}>
                    <>
                        {isLarge && <div id="arrow layer" className='pb-5' style={{ position: "absolute", width: "100%", height: "100%", zIndex: 10 }}>
                            <Row className="mx-0" style={{ height: "100%" }}>
                                <Col className="px-0" style={{ position: "relative", height: "100%" }}>
                                </Col>
                                <Col className="px-0" style={{ position: "relative", height: "100%" }}>
                                    <img src="./icons/arrow_right_1.svg" style={{ width: "72px", position: 'absolute', left: "-36px", top: "calc(50% - 36px)" }} />
                                </Col>
                                <Col className="px-0" style={{ position: "relative", height: "100%" }}>
                                    <img src="./icons/arrow_right_1.svg" style={{ width: "72px", position: 'absolute', left: "-36px", top: "calc(50% - 36px)" }} />
                                </Col>
                            </Row>
                        </div>}
                        <Row id="rombus layer" className='pb-5 mx-0'>
                            <Col xs={12} lg={4}>
                                <div className="rombus rombus-left rombus-girl">
                                    <div className="pb-5 px-5 rombus-right flex-center" >
                                        <h1 className="mb-3 px-2">Engage to Earn Tokens</h1>
                                        <p className="px-2">Earn tokens for every like, share, subscription, and much more</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} lg={4}>
                                <div className="rombus rombus-right rombus-tokens">
                                    <div className="pb-5 px-5 rombus-left flex-center">
                                        <h1 className="mb-3 px-2">More Engaged = More Rewards</h1>
                                        <p className="px-2">Increase your tier and unlock airdrops, NFTs, and other exciting bonuses</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} lg={4}>
                                <div className="rombus rombus-left rombus-meetup">
                                    <div className="pb-5 px-5 rombus-right flex-center">
                                        <h1 className="mb-3 px-2">Exclusive Access via Token-Gating</h1>
                                        <p className="px-2">Redeem tokens for merchandise, collectables, and experiences</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </>
                </Container>
            </div >

            <div id="white background">
                <div id="empower">
                    <Container className="mt-5">
                        <Row className='py-4 px-4'> <Col xs={12} lg={{ span: 10, offset: 1 }} className="my-auto">
                            <hr style={{ width: "50%", height: "5px", background: "var(--indigo)" }} />
                            <h1 className="mt-3 mx-auto" style={{ textAlign: "center", color: "var(--indigo)", maxWidth: "650px" }}>
                                Supercharging communities with Web3
                            </h1>
                            <p className="my-5" style={{ textAlign: "center", fontSize: "20px" }}>
                                Your every interaction will pay off in a big way
                            </p>
                        </Col> </Row>
                    </Container>
                </div>

                <div id="quad">
                    <Container>
                        <Row className='' style={{ color: "var(--indigo)" }}>
                            <Col xs={12} md={6} lg={3} className={isMedium ? "px-1 mt-2" : "px-5 mt-2"}>
                                <div className="py-md-5 pt-4 pb-5 rombus rombus-quad" style={{
                                    background: isLarge ? "linear-gradient(45deg, #f7ece1 75%, #cac4ce 100%)"
                                        : "linear-gradient(45deg, #f7ece1 25%, #cac4ce)",
                                    height: isLarge ? "350px" : isMedium ? "300px" : ""
                                }}>
                                    <div className="px-3 rombus-quad-inner d-flex flex-column" >
                                        <img src="icons/star_icon.svg" style={{ width: "40px" }} />
                                        <h1 className="my-3">Exclusive</h1>
                                        <p>Access content you won't find anywhere else. Attend events only open for community members.</p>

                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={6} lg={3} className={isMedium ? "px-1 mt-2" : "px-5 mt-2"}>
                                <div className="py-md-5 pt-4 pb-5  rombus rombus-quad" style={{
                                    background: isLarge ? "linear-gradient(45deg, #f7ece1 50%, #cac4ce 75%)"
                                        : "linear-gradient(45deg, #f7ece1 25%, #cac4ce)",
                                    height: isLarge ? "350px" : isMedium ? "300px" : ""
                                }}>
                                    <div className="px-3 rombus-quad-inner d-flex flex-column">
                                        <img src="icons/chat_icon.svg" style={{ width: "40px" }} />
                                        <h1 className="my-3">DM's & Groups</h1>
                                        <p>Chat directly with creators and community members that share your passion.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={6} lg={3} className={isMedium ? "px-1 mt-2" : "px-5 mt-2"}>
                                <div className="py-md-5 pt-4 pb-5 rombus rombus-quad" style={{
                                    background: isLarge ? "linear-gradient(45deg, #f7ece1 25%, #cac4ce 50%)"
                                        : "linear-gradient(45deg, #f7ece1 25%, #cac4ce)",
                                    height: isLarge ? "350px" : isMedium ? "300px" : ""
                                }}>
                                    <div className="px-3 rombus-quad-inner d-flex flex-column">
                                        <img src="icons/badge_icon.svg" style={{ width: "40px" }} />
                                        <h1 className="my-3">Badges</h1>
                                        <p>Earn a leading role in your favorite communities and the premium perks that come with it.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={6} lg={3} className={isMedium ? "px-1 mt-2" : "px-5 mt-2"}>
                                <div className="py-md-5 pt-4 pb-5 rombus rombus-quad" style={{
                                    background: isLarge ? "linear-gradient(45deg, #f7ece1 0%, #cac4ce 25%)"
                                        : "linear-gradient(45deg, #f7ece1 25%, #cac4ce)",
                                    height: isLarge ? "350px" : isMedium ? "300px" : ""
                                }}>
                                    <div className="px-3 rombus-quad-inner d-flex flex-column">
                                        <img src="icons/picture_icon.svg" style={{ width: "40px" }} />
                                        <h1 className="my-3">NFTs</h1>
                                        <p>Exclusive drops and collectables so you can show off your fandom.</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div id="join">
                    <Container className="py-5">
                        <Row className='py-4 px-4'><Col xs={12} lg={{ span: 10, offset: 1 }} className="my-auto">
                            <hr style={{ width: "50%", height: "5px", background: "var(--indigo)" }} />
                            <h1 className="mt-3 mx-auto" style={{ textAlign: "center", color: "var(--indigo)", maxWidth: "750px" }}>
                                Join the most valuable communities on the planet
                            </h1>
                            <hr style={{ width: "50%", height: "5px", background: "var(--indigo)" }} />
                            <p className="mt-5" style={{ textAlign: "center", fontSize: "20px" }}>
                                Fandom is no longer a one way street
                            </p>
                            <p className="mb-4" style={{ textAlign: "center", fontSize: "20px", maxWidth: "750px" }}>
                                Knaq bridges the gap and allows communities to earn and grow alongside their favorite creators
                            </p>
                        </Col></Row>
                    </Container>
                </div>
            </div>

            <div id="bluefire" style={{ backgroundImage: "url('images/BG3.png')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", position: "relative" }}>
                <Container className="px-lg-5 pt-5" style={{ paddingBottom: "20vw" }}>
                    <h1 className="py-4" style={{ textAlign: "center", color: "var(--tan)" }}>Frequently Asked Questions</h1>
                    <Accordion defaultActiveKey="0" className="mx-lg-5 mb-4">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                How do I get started?
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <p className="">For Fans:</p>
                                    <p className="">Log in with one of your existing social media accounts and we will automatically make a wallet for you.</p>
                                    <p className="">If you already have a wallet like Metamask, simply log in with that.</p>
                                    <p className="mt-3">For Creators</p>
                                    <p className="">Log in with the social media or Metamask and we will begin populating your account with your existing social media posts.</p>
                                    <p className="">From inside your profile you can upload exclusive videos and begin listing experiences you wish to offer your token holders.</p>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="4">
                                How does earning work?
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                                <Card.Body>
                                    Every type of engagement on Knaq earns you tokens. You can check your earnings, airdrops, and other benefits directly from your wallet.
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                Where do I collect my exclusive perks?
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    Things such as airdrops, bonuses, and NFT packs will be sent directly into your wallet. You can redeem for exclusive experiences or content from directly inside the Creator’s portal.
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                Do I need a wallet?
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    No, if you do not have one, we will automatically make one for you upon sign-up.
                                    <p className="mt-3">If you already have something like Metamask, that’s great! You can sign in using that or any other wallet we support.</p>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                                What blockchain are you built on?
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    Polygon. We chose this for the low fees and quick transaction speeds so you can focus on the content and rewards you came here for.
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <h2 className="py-4 " style={{ textAlign: "center", color: "var(--tan)" }}>
                        Still Have Questions?
                    </h2>
                    <div className="d-flex justify-content-center">
                        <a href="https://discord.gg/H4TAHRGNHR" target="_blank" rel="noreferrer">
                            <Button variant='secondary'
                                style={{
                                    borderRadius: "100px", height: "40px", border: "var(--tan), 2px, solid",
                                    color: "var(--indigo)", backgroundColor: "var(--tan)"
                                }}
                                className="pl-4 pr-2 py-0 mt-2"
                            >
                                join the discord
                                <img src="/icons/arrow_right_2.svg" style={{ height: "70%" }} className="pl-3" />
                            </Button>
                        </a>
                    </div>
                </Container>
            </div>

            {
                dev && <div id="black" style={{ backgroundColor: "#000" }}>
                    <Container id="roadmap" className="pb-5">
                        <h1 className={isMedium ? "ml-5" : "text-center"} style={{ color: "var(--tan)" }}>Roadmap</h1>
                        <Row className="mx-0">
                            <Col xs={12} lg={{ span: 5, offset: 0 }} className="mt-5">
                                <div className="border-box" style={{ background: "linear-gradient(90deg, #f662a7, #ff0000)" }}>
                                    <p className="cover-box pl-4 pt-2">Phase I</p>
                                </div>
                                <div className="floater" style={{ background: "linear-gradient(90deg, #f662a7, #ff0000)" }}>
                                    <h3 className="pl-4 pt-2">spring launch</h3>
                                </div>
                            </Col>
                            <Col xs={12} lg={{ span: 4, offset: 1 }} className="mt-5">
                                <div className="text" style={{
                                    height: "150px", border: "red 2px solid", width: "100%",
                                }}></div>
                            </Col>
                        </Row>
                        <Row className="mx-0">
                            <Col xs={12} lg={{ span: 5, offset: 1 }}>
                                <div className="mt-5" style={{ border: "red 1px solid", height: "150px", borderRadius: "15px" }}>
                                </div>
                            </Col>
                            <Col xs={12} lg={{ span: 4, offset: 1 }}>
                                <div className="mt-5" style={{ border: "red 1px solid", height: "150px", borderRadius: "15px" }}>

                                </div>
                            </Col>
                        </Row>
                        <Row className="mx-0">
                            <Col xs={12} lg={{ span: 5, offset: 2 }}>
                                <div className="mt-5" style={{ border: "red 1px solid", height: "150px", borderRadius: "15px" }}>

                                </div>
                            </Col>
                            <Col xs={12} lg={{ span: 4, offset: 1 }}>
                                <div className="mt-5" style={{ border: "red 1px solid", height: "150px", borderRadius: "15px" }}>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div >
            }

            <Navbar id='footer' bg="dark" variant="dark" style={{ marginTop: "-2px" }} className="py-5">
                <Row style={{ width: "100%" }} className="mx-0">
                    <Col xs={12} lg="auto">
                        <Nav className={isLarge ? "" : "flex-column"}>
                            <Nav.Link className="mx-lg-2" active={false} target="_blank" href="/faq">FAQs</Nav.Link>
                            <Nav.Link className="mx-lg-2" active={false} target="_blank" href="/terms">Terms</Nav.Link>
                            <Nav.Link className="mx-lg-2" active={false} target="_blank" href="/privacy">Privacy</Nav.Link>
                            <Nav.Link className="mx-lg-2" active={false} href="/creator">Creators</Nav.Link>
                            <Nav.Link className="mx-lg-2" active={false} href="/market">Market</Nav.Link>
                        </Nav>
                    </Col>
                    <Col xs={12} lg="auto" className="ml-auto">
                        <Nav className="">
                            <Nav.Link className="px-1" active={false} target="_blank" href="https://discord.gg/H4TAHRGNHR"><img className="social-icons" src="./icons/discord_icon.png" /></Nav.Link>
                            <Nav.Link className="px-1 " active={false} target="_blank" href="http://www.instagram.com/knaqapp"><img className="social-icons" src="./icons/instagram_icon.png" /></Nav.Link>
                            <Nav.Link className="px-1 mr-3" active={false} target="_blank" href="http://www.twitter.com/knaqapp"><img className="social-icons" src="./icons/twitter_icon.png" /></Nav.Link>
                        </Nav>
                    </Col>
                </Row>
            </Navbar>
        </>
    )
}

export default LandingScreen