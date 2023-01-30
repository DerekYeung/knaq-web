import React from 'react'
import { Button, Col, Container, Image, Nav, Navbar, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import StaticPage from '../components/StaticPage'

const FaqScreen = () => {
    return (
        <StaticPage>
            <h1 className="text-center py-5" style={{ backgroundColor: "#eaf1f6 " }}>Frequently Asked Questions</h1>
            <Container className='p-5'>
                <Row>
                    <Col xs={12} lg={{ span: 8, offset: 2 }}>
                        <h2 className="mb-3">Why should I back-up my wallet?</h2>
                        <p className="mb-5">Knaq is powered by blockchain and similar to all other Bitcoin, Ethereum, or crypto wallets, we are fully non-custodial and decentralized. This means we cannot touch your wallet and all the money you earn is fully in your control. But since we cannot access your wallet, we have no way of recovering funds. Simply write down your recovery phrase and keep it in a safe place in case you ever forget your password or lose your phone! </p>
                        <h2 className="mb-3">What crypto is inside the app?</h2>
                        <p className="mb-5">We have built a way for you to deposit and withdraw any crypto from the list of supported ones. We will constantly be updating this list and making it more efficient for all of you. </p>
                        <h2 className="mb-3">What are Feathers and how are they used in the App?</h2>
                        <p className="mb-5">Feathers are the in-app currency and function like any Gems, Points, or Tokens you may find on other apps. They can be used when tipping, purchasing subscriptions, or any other feature that involves supporting your favorite content creators. You can purchase Feathers from the Apple App Store, Google Play Store, or on the website!</p>
                        <h2 className="mb-3">Why are Feathers more expensive inside the app?</h2>
                        <p className="mb-5">Apple and Google charge a 30% fee when making purchases from inside the app. We need to add this to the purchase to ensure the Creators are not affected because 30% is quite a lot! You can buy Feathers on our webpage to save this 30% and they are still usable inside the app! </p>
                        <h2 className="mb-3">How do I withdraw money from my wallet?</h2>
                        <p className="mb-5">On the bottom navigation panel, go to the Wallet tab on the far right. From there, click on Send Money and paste in the destination where you want to send your money. When asked, select the crypto you want to withdraw and press send. Your transaction will be cleared once it has been confirmed on the blockchain you are trying to send to.</p>
                    </Col>
                </Row>
            </Container>
        </StaticPage>
    )
}

export default FaqScreen