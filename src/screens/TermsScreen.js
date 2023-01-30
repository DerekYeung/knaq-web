import React from 'react'
import { Button, Col, Container, Image, Nav, Navbar, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import StaticPage from '../components/StaticPage'

const TermsScreen = () => {
    return (
        <StaticPage>
            <Container className="p-5">
                <h1>Terms of Service</h1>
                <p><strong>Agreement between User and Knaq Technologies, Inc., Knaq App, and Knaqapp.com</strong></p>
                <p></p>
                <p><strong>1.</strong> <strong>Definitions</strong></p>
                <p>In these Terms following terms have the following meanings:</p>
                <p><strong>“Content Creator”</strong> is a User who uploads Content on the Website to be viewed by other Users;</p>
                <p><strong>“Company”</strong> (also referred to as “<strong>the Company</strong>”, “<strong>Us</strong>”, “<strong>Our</strong>”, or “<strong>We</strong>”) refers to Knaq Technologies, Inc. located in the state of Delaware at 300 Delaware Avenue Suite 210-A, Wilmington, DE 19801;</p>
                <p><strong>“Commission”</strong>  is an amount of value (in cash, cryptocurrencies, or otherwise) paid by Viewers to the
                    Content Creator for any Interaction;</p>
                <p><strong>“Interaction”</strong> is any offerings by a Content Creator that is hosted by Knaq where a Commission may be earned. This includes but is not limited to tips, subscriptions, referrals, and chats.</p>
                <p><strong>Matic Tokens”</strong> are tokens issued on the Polygon Blockchain and a method of payment used for Interactions.</p>
                <p><strong>Polygon”</strong> is the Polygon Blockchain;</p>
                <p><strong>“Post” </strong>(or “Posting”) is any and all text, photos, videos, or other material uploaded to the Website by a Content Creator;</p>
                <p><strong>“Referral Bonus”</strong> is the payment made by the Company to Users who introduce new Users to the Service;</p>
                <p><strong>“Revenue”</strong> the monies paid by a Viewer to the Company for when an Interaction occurs;</p>
                <p><strong>“Service”</strong> (also referred to as “<strong>Knaq</strong>”, “<strong>the Website</strong>”, “<strong>Product</strong>”, or “<strong>App</strong>”) refers to the Knaq mobile application.</p>
                <p><strong>"User"</strong> any user of the Website, whether a Content Creator or a Viewer;</p>
                <p><strong>“User Account” </strong>means a unique user profile created for each User to access the Service provided by the Company.</p>
                <p><strong>“Viewer” </strong>is any user who views, follows, or subscribes to a Content Creator’s content.</p>
                <p><strong>2. About</strong></p>
                <p><strong>2.1</strong> Knaq is a social media application where registered users can be compensated for content the contribute to the Site. The Site is offered conditioned to your acceptance of the terms and conditions contained herein without modification. Please read these Terms carefully and keep a copy for your reference.</p>
                <p><strong>2.2</strong> We reserve the right to make changes to these Terms at any time at Our sole discretion. All changes are effective from the time We post them and apply to all aspects of the Service. By continuing to use the Service, you agree to the Terms as modified or as they currently appear. We recommend you check this page periodically to stay aware of any changes that may occur.</p>
                <p><strong>2.3</strong> The Service is only offered to Users who are 18 years of age or older. Users who are between the ages of 13 and 18 must acquire parental consent before using the Service and may experience limited features / functionality.</p>
                <p><strong>2.4</strong> By using the Service, you consent to receiving electronic communication from Us, including emails, support tickets, and alert messages posted to your User Account.</p>
                <p><strong>2.5</strong> Any information given by customer service agents, including responses to “Frequently Asked Questions” is for informational purposes only and is not legally binding.</p>
                <p><strong>2.6</strong> We reserve the right, at any time and without notice, to the following:</p>
                <p><strong>(a)</strong> modify, suspend, or terminate the Service, in part or entirely to any and all users.</p>
                <p><strong>(b) </strong>restrict, limit, suspend, or terminate User access to the Service if the User does not comply with these Terms and/or any applicable law</p>
                <p><strong>(c)</strong> delete any Posts made by Content Creators if it is deemed to not comply with these Terms and/or any applicable law</p>
                <p><strong>(d)</strong> disclose information about your use of the Service in connection with law enforcement investigation of any suspected or alleged illegal activity or in response to a lawful court order</p>
                <p></p>
                <p><strong>3. User Account Registration</strong></p>
                <p>To become a User, you must register and create a User Account on Knaq. You must provide a valid phone number or email address, a username, and a password.</p>
                <p>You agree that all the information you provided is governed by the Company’s Privacy Policy and you proceed on the basis that you are aware of how and why we may process your personal data as set forth in the Privacy Policy.</p>
                <p>If you wish to have Interactions with a Content Creator, then you will need to acquire Matic Tokens and
                    deposit them into your wallet that is built into Knaq. Knaq may recommend various methods of
                    acquiring Matic Tokens but you acknowledge that neither Knaq, the Company, or its employees are
                    liable for any activity that occurs outside of the Knaq app and website at Knaqme.io. </p>
                <p></p>
                <p><strong>4. Account Deactivation</strong></p>
                <p>In the event you wish to deactivate your Knaq account, you may email us at <span >support@knaqapp.com</span>. You acknowledge that upon deactivation, Knaq will remove any Posts you have made subject to section 4.1 of this document as well as cancel any subscriptions that are currently still active.</p>
                <p><strong>4.1</strong> If you have active subscribers, Knaq will prevent future subscribers and your posts will be removed once your last Viewer’s subscription has expired. Then your account once will be considered deactivated.</p>
                <p></p>
                <p><strong>5. Acceptable Use</strong></p>
                <p>5.1 The Company requires that all users comply with the Terms below, at all times.</p>
                <p>5.2 Users may not:</p>
                <p>(a) Use the Service other than for your own lawful and personal use in accordance with these Terms</p>
                <p>(b) Impersonate the Company, one of Our employees, another User, or any person or entity or falsely state, suggest, or otherwise misrepresent any affiliation, endorsement, or sponsorship between you, the Company, or any other person and/or entity.</p>
                <p>(c) register for a User Account using false information or register an account using another’s information without written authorization from that individual.</p>
                <p>(d) use the Service in any manner that may be considered illegal or unlawful, including in engaging in activity that violates the rights of any person or entity</p>
                <p>(e) use the Service for the purpose of exploiting, harming, or attempting to expose users under the age of 18 to any inappropriate content or asking for personally identifiable information.</p>
                <p>(f) engage in any type of behavior that can be construed as restricting User’s ability to enjoy the Service.</p>
                <p>5.3 Users shall not create, upload, post, display, publish, or distribute Posts that:</p>
                <p>(a) is obscene, illegal, fraudulent, discriminatory, hateful, libelous, threatening, or in any way incites violence of any nature.</p>
                <p>(b) violates another person’s or entity’s copyright, trademark, or privacy rights.</p>
                <p>(c) promotes or advertises drugs, firearms, escort services, or any illegal activity and/or unlawful act</p>
                <p>5.4 Users shall not modify or tamper with any copyright or trademark contained in other Users’ Posts.</p>
                <p>5.5 Users shall not use the Service in any way that could disable, overburden, damage, or impair the Service or interfere with any other party’s use of the Service.</p>
                <p>5.6 Users shall not attempt to disassemble, reverse engineer, or attempt to derive the source code for the Service</p>
                <p>5.7 By registering a User Account, you represent and warrant that:</p>
                <p>(a) you are at least 18 years of age or for cases where you are between 13 and 18, have obtained written consent from a parent or guardian.</p>
                <p>(b) you will fully comply with the Terms written in this Terms of Service</p>
                <p></p>
                <p><strong>6. Uploaded Content</strong></p>
                <p>By creating and uploading any type of content (Posts), you authorize Users to access and view such content for their own lawful uses. You represent and warrant that for each Post:</p>
                <p>(a) you own, have a license, or otherwise control all rights of such Post</p>
                <p>(b) you will not post content that is pornographic in nature of involve suggestions of sex with anyone under the age of 18.</p>
                <p>(c) You grant Us, our successors, and licensees the rights to use, reproduce, modify, perform, display, distribute, and disclose to third parties any content available in your Posts. This is for the purpose of maintaining the Service and allowing other users to view your content. We will never sell anything you Post to other platforms without your approval.</p>
                <p>(d) You understand and acknowledge that you are responsible for all Posts that you submit and have full responsibility for the contents that contained in such Posts.</p>
                <p>(e) You shall indemnify the Company, our licensees, successors, and assigns against all liabilities, costs, expenses, damages, or losses (including any direct, indirect or consequential losses of profit, reputation, or otherwise as well as all interest, penalties, legal costs, and all other reasonable professional costs and expenses incurred as a result of material contained in your Post.</p>
                <p>(f) The Company is not liable to any third party for the content or accuracy of any Posts uploaded by you or any User of the Service.</p>
                <p>(g) Upon signing up to the Service, you agree to act as custodian of records for the material you upload to the Service.</p>
                <p></p>
                <p><strong>7. Polygon Blockchain</strong></p>
                <p>7.1 The Service contains software to assist users in writing data onto Polygon and to also display such content from Polygon onto the Site. This data may include, but is not limited to, transaction histories, images stored as NFTs, and other Interactions that may carry monetary value.</p>
                <p>7.2 The Service incorporates monetary incentives into the Site whereby you are able to receive Commission for your Posts through Interactions with other Users. The Company receives a percent of all Commissions.</p>
                <p>7.3  Polygon is not owned, controlled, or operated by the Company. We have no control over the
                    Polygon blockchain and its development. All transactions made via the Service are stored on the Polygon
                    blockchain, a public ledger. The Service serves to display these transactions from the Polygon blockchain
                    and therefore we cannot delete or alter any information on the Polygon blockchain on your behalf. You
                    acknowledge that by submitting transactions to the Service, you are also submitting to the Polygon
                    blockchain. While we can remove your transactions from appearing on the Service, we cannot alter or
                    remove any transaction history from the Polygon blockchain. </p>
                <p></p>
                <p><strong>8. Non-Custodial</strong></p>
                <p>The Service provides a non-custodial wallet, which means We do not store or have access to your wallet
                    whereby cryptocurrencies or monies are transacted or stored. No monies flow through the Company or
                    the Service. We do not hold or custody your private key and we assume no responsibility for the
                    management of your private keys tied to your User Account. We do not store, send, or receive Matic or
                    other monies between users. The only money we receive is the Revenue we earn from Interactions
                    which is paid to us by the User and similar blockchain wallet services or by any future blockchain
                    protocol that we might use. Any transfer of title that might occur on the Polygon blockchain, occurs on
                    the blockchain and not within Knaq. </p>
                <p>There are risks associated with using cryptocurrencies and blockchains, and you accept and acknowledge these risks.</p>
                <p></p>
                <p><strong>9. Copyright Complaints, the DMCA, and Takedowns</strong></p>
                <p>Knaq respects the intellectual property rights of third parties and we will comply with legitimate requests under the Digital Millennium Copyright Act (“DMCA”). We retain the right to remove access to user content provided via the Service that we deem to be infringing the copyright of others. If you become aware of user content on the Site that infringes your copyright rights, please report this by contacting us at: <span >support@knaqapp.com</span></p>
                <p></p>
                <p><strong>10. Links to Third Party Sites/Third Party Services</strong></p>
                <p>Knaq may contain links to other websites. Any third party sites that appears as a result of advertisement, user Post, or sponsored content are not under the control of Knaq and Knaq is not responsible for the contents of such sites. These sites are provide to you only as a convenience, and the inclusion of any link does not imply endorsement by Knaq of the site or any association with its operators.</p>
                <p>Certain services made available via Knaqapp.com are delivered by third party sites and organizations. By using any product, service or functionality originating from the Knaqapp.com domain, you hereby acknowledge and consent that Knaq may share such information and data with any third party with whom Knaq has a contractual relationship to provide the requested product, service or functionality on behalf of Knaqapp.com users and customers.</p>
                <p></p>
                <p><strong>11. Indemnification</strong></p>
                <p>You agree to indemnify, defend and hold harmless the Company, its officers, directors, employees, agents and third parties, for any losses, costs, liabilities and expenses (including reasonable attorney's fees) relating to or arising out of your use of or inability to use the Service, any Post made by you, your violation of any Terms or your violation of any rights of a third party, or your violation of any applicable laws, rules or regulations. We reserve the right, at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with the Company in asserting any available defenses.</p>
                <p></p>
                <p><strong>12. Disclaimer of Warranties; Limitations of Liability</strong> 12.1 By using Knaq, you acknowledge and agree to the following:</p>
                <p>(a) Knaq and all of its services and features are provided without warranties of any kind, express or implied. (b) To the fullest extent permitted by law, We disclaim any and all warranties, express or implied, with respect to Knaq and all of its services and features, including, and without limitation, implied warranties of merchantability and fitness for a particular purpose. (c) We do not warrant or guarantee the accuracy, usefulness, completeness or reliability of Knaq, or the results of your use of Knaq. (d) We disclaim all liability and responsibility arising from any reliance placed on such materials by you or any other user of the Service, or by anyone who may be informed of any of its contents. (e) We do not warrant or guarantee that Knaq and all of its services and features will be available at any particular time or location; that Knaq and all of its services and features will be secure, uninterrupted, and error-free; that any defect or error will be corrected; or that Knaq and all of its services and features will be free of viruses and other harmful components. You are responsible for implementing sufficient procedures and checkpoints to satisfy your particular requirements for antivirus protection and accuracy of data input and output, and for maintaining a means external to the Website for any reconstruction of any lost data. (f) To the fullest extent provided by law, FIL will not be liable for any loss or damage caused by a distributed denial-of-service attack, viruses, or other technologically harmful material that may infect your computer equipment, computer programs, data, or other proprietary material due to your use of the Website or any services or items obtained through the Website or to your downloading of any material posted on it, or on any website linked to it. Your use of OnlyFans and its services and features will be solely and entirely at your own risk. The foregoing does not affect any warranties that cannot be excluded or limited under applicable law;</p>
                <p>12.2 In no event shall We be liable (strictly or otherwise) in contract, tort, negligence, strict liability or under any other legal or equitable principle, for any indirect, incidental, exemplary, special, punitive or consequential damages (including, and without limitation, loss of use, profits, data or information, or loss of business goodwill or opportunity) arising out of or related to your use of (or your inability to use) Knaq or any of its services or features, nor shall We be held liable in the event your Post is illegally distributed by another User. Where such distribution does occur please contact Us at <span >support@knaqapp.com</span> and We will seek to prevent continuance of such distribution where it is reasonably able to do so. 12.3 in no event shall Our total and aggregate liability to you and/or others for any and all claims arising out of or related to your use of (or your inability to use) Knaq or any of its services or features, exceed one hundred United States Dollars ($100.00). This does not affect any liability that cannot be excluded or limited under applicable law. 12.4 Because some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages or total liability, the above limitation may not apply to you. In such case, our total and aggregate liability to you arising out of or related to your use of (or your inability to use) Knaq or any of its services or features shall be limited to the maximum extent permitted by law or, if no amount is specified, one hundred United States Dollars ($100.00).</p>
                <p></p>
                <p><strong>13. Waiver and Severability</strong> 13.1 No waiver of any term or condition set out in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure to assert a right or provision under these Terms shall not constitute a waiver of such right or provision. 13.2 If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms will continue in full force and effect.</p>
                <p></p>
                <p><strong>14. Changes to Terms</strong></p>
                <p>The Company reserves the right, in its sole discretion, to change the Terms under which Knaqapp.com is offered. The most current version of the Terms will supersede all previous versions.</p>
                <p></p>
                <p><strong>15. Contact</strong> If you have any questions, comments, complaints or concerns about Knaq, please contact our support team at <span >support@knaqapp.com</span></p>


            </Container>
        </StaticPage>
    )
}

export default TermsScreen