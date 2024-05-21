import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';
import {CustomContainer, CustomKeyboardAwareScrollView} from '~/components';
import {BackButton} from '~/components';
import {width} from '~/utils/dimension';
import RenderHTML from 'react-native-render-html';

const Policy = () => {
  const html = `
     <p style="line-height: 2; text-align: justify;"><strong><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">Privacy Policy</span></strong></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">Last modified: October 26, 2022</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">Vincho, Inc., a Delaware corporation (&ldquo;<strong>Company</strong>&rdquo;), respects your privacy and is committed to protecting it through our compliance with this privacy policy (&ldquo;<strong>Privacy Policy</strong>&rdquo;) as may be referred to in other Company documentation, including but not limited to the Terms of Use. This Privacy Policy describes the types of information the Company may collect from you or that you may provide to us when you use the Vincho mobile application (&ldquo;<strong>Vincho</strong>&rdquo;) to access our services, and our practices for collecting, using, maintaining, protecting, and disclosing such information.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">This Privacy Policy applies to information we collect on Vincho:</span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">when you use the Vincho mobile application, or&nbsp;</li>
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">in text messages, phone calls, emails and other electronic messages between you and the Company.</li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">It does not apply to information:</span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">collected by the Company offline or through any other means, including on any other website operated by the Company or any third party; or&nbsp;</li>
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">any third party, including through any application or content that may link to or be accessible from or on Vincho.</li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;"><strong>By using Vincho, you accept and agree to be bound and abide by the Privacy Policy.</strong> Please read this Privacy Policy carefully to understand our policies and practices regarding your information and how we will handle it. If you do not agree with our policies and practices, your remedy is to not access and use Vincho. This Privacy Policy may change from time to time. Your continued use of Vincho after we make changes to our Privacy Policy is deemed to be the acceptance of those changes, so please check this Privacy Policy periodically for updates.&nbsp;</span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><strong>Our Policy Towards Age</strong></li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">Although we want as many people as possible to enjoy our creation, you have to be at least 18 years old to use Vincho.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">Vincho will not knowingly collect information from children under the age of 18. If the Company learns that it has collected or received personal information from a person under eighteen, it will delete that information. If you believe your child has provided us with personal information without your authorization and you would like to have the personal information deleted, please contact us by emailing support@vincho.com.</span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><strong>The Information We Collect</strong></li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">Vincho collects several types of information from you with your consent, including the following:</span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;"><em>Registration Information:&nbsp;</em>When you download the Vincho app and create an account (&ldquo;<strong>Account</strong>&rdquo;), we may collect certain information (&ldquo;<strong>Registration Information</strong>&rdquo;) about you, such as:<ul style="font-family: initial; font-size: initial; color: initial;">
            <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">Name;</li>
            <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">Username;</li>
            <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">Email address;</li>
            <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">Mobile number;</li>
            <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">Gender identity;</li>
            <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">Date of birth;</li>
            <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">Sexual preference;</li>
            <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">Photographs;</li>
            <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">Location; and</li>
            <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">Login information for social media accounts that you connect to your Vincho Account (this could include, for example, your Facebook, Google and Instagram accounts).</li>
        </ul>
    </li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">Once you register, you will be able to review and change this information at any time just by logging in to your Account (other than your date of birth and location (which, if you have given Vincho access to your location in your device settings, is automatically updated based on the location of your device)). It is your responsibility to ensure that your account details are kept up to date. If your phone number changes, please ensure that you update this in your account.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;"><br></span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">The information we collect helps to enhance your experience on Vincho and verify our Users (robots are not welcome!). Registration Information such as your sexual preference, name and username may be visible to other Users who view your profile page.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;"><br></span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">For Users who are California residents, the data we may collect falls within the following categories of &ldquo;personal information&rdquo;, as defined by the California Consumer Privacy Act (CCPA):</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">A. Identifiers, such as name and precise location;</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">B. Personal information, as defined in the California customer records law, such as contact (including email and telephone number) and financial information;</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">C. Characteristics of protected classifications under California or federal law (if you choose to provide them), such as age, gender identity, marital status, sexual orientation, race, ancestry, national origin, religion, and medical conditions;</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">D. Commercial information, such as transaction information and purchase history;</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">E. Biometric information;</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">F. Internet or network activity information, such as browsing history and interactions with Vincho;</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">G. Geolocation data, such as mobile device location;</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">H. Audio, electronic, visual and similar information, such as photos and videos;</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">I.&nbsp;Professional or employment-related information, such as work history and prior employer;</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">J. Non-public education information; and</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">K. Inferences drawn from any of the personal information listed above to create a profile or summary about, for example, an individual&rsquo;s preferences and characteristics.</span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><em>Profile Information -&nbsp;</em>We recommend and encourage you (and all our members) to think carefully about the information you disclose about yourself. We also do not recommend that you put email addresses, URLs, instant messaging details, phone numbers, full names or addresses, credit card details, national identity numbers, drivers&rsquo; licence details and other sensitive information which is open to abuse and misuse on your profile. When you post information about yourself or use the messaging function to communicate with other Users, the amount of personal information you share is at your own risk.</li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;"><br></span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><em>Profile Verification Information (Including Biometric Information):&nbsp;</em>For safety and security and to ensure you have the best possible user experience, we require Users to verify their accounts and might ask for your phone number and, in some instances, we might also ask that you carry out photo verification. We want to make sure you are not a robot! And we also want to avoid fake Vincho accounts being created which can be used for malicious activities and cybercrime &ndash; they threaten the Vincho network and spoil things for everyone. This verification might be required by us for the prevention of fraud. You can also verify your photo on a voluntary basis (to add the blue &lsquo;verified&rsquo; badge to your profile).</li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;"><br></span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">If you choose to verify your profile photo, we will scan each photo that you submit. The scan may include the use of facial recognition technology so that we can compare the photo you submit to your profile photo, to help ensure that you are who you say you are. We do not add the verification photos to your profile. We retain the scans so that we can verify you in the future and for our record-keeping purposes until we no longer need them for such purposes or for three years after your last interaction with us, whichever occurs first. After the applicable retention period expires, we take commercially reasonable steps to permanently and securely delete the scans from our systems.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;"><br></span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><em>Purchases Information:&nbsp;</em>If you decide to purchase any of our premium services, we will process your payment information and retain this securely for the prevention of fraud and for audit/tax purposes. We may also retain information on your purchase history.</li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;"><br></span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><em>Product Interaction</em>: Such as app launches, taps, clicks, scrolling information, video views, liked profiles, or other information about how the user interacts with the App. We will also collect diagnostic crash logs.</li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;"><br></span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><em>Advertising Data</em>: Such as information about the advertisements the user has seen</li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;"><br></span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><em>Geolocation Information:&nbsp;</em>If you have given Vincho access to your location in your device settings, when you use your mobile, we will collect information about WiFi access points as well as other location information about your longitude and latitude and may save your device&rsquo;s coordinates to offer certain features to you. This information helps us identify your physical location and we use it to personalize the App and make it easier for you to interact with other Users, by enabling the general locality information to be displayed to Users seeing your profile and showing you the profiles of other Users who are near you.</li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;"><br></span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">If you have given Vincho access to your location, but wish to turn this off, you can do so by the following methods:<ul style="font-family: initial; font-size: initial; color: initial;">
            <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">iPhone app &mdash; settings, privacy, location services, Vincho</li>
            <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">Android &mdash; settings, location, Vincho, permissions, location</li>
        </ul>
    </li>
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><em>Device Information:&nbsp;</em>We may collect information about your device when you use the Vincho App including the unique device identifier, device model, and operating system, for a number of purposes, as set out in this policy. In addition, if you permit us to do so, the App may access your device&rsquo;s address book solely to add someone to your contacts.</li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;"><br></span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><strong>How We Collect Information</strong></li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">We collect your information from you when you provide it to us when you submit a form on Vincho to create an Account.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">When you use Vincho, we may also collect personal data from you such as your interactions with the application automatically by using cookies or similar technologies. A cookie is a small file that can be placed on your device or browser that allows us to recognize and remember you.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">We may also ask you for information when you report a problem with us and retain records and copies of your correspondence (including email addresses), if and when you contact customer support.&nbsp;</span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><strong>How We Use Your Information That We Collect</strong></li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">The Company may use the information that we collect about you or that you provide to us, including any Personal Information:&nbsp;</span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">to present Vincho and its contents to you,</li>
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">to provide you with information or services that you request from us, for example, send you the newsletter,</li>
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">to enhance Vincho via with customized and personalized viewing recommendations for content we think will optimize your experience with Vincho,&nbsp;</li>
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">to measure or understand the effectiveness of advertising we deliver to you and others, and to deliver relevant advertising to you,</li>
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">to carry out our obligations and enforce our rights arising from any contracts entered into between you and the Company,</li>
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">to verify and process card payments,</li>
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">to notify you about changes to Vincho and your Account or purchase status,</li>
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">in any other way we may describe when you provide the information to us,</li>
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">for any other purposes for which you provide such information for.&nbsp;</li>
</ul>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><strong>How We Share Your Information That We Collect</strong></li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">Only certain authorized Vincho employees or contractors from customer services process your personal information&nbsp;for the purposes described above. These authorized employees and contractors only have access to the data necessary to perform their duties.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">Since Vincho&rsquo;s goal is to help you make meaningful connections through art works, the main sharing of your information is with other Vincho users. We also share your information with service providers and partners who assist us in operating the Services, and, in some cases, legal authorities. Read on for more details about how your information is shared with others.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">With other members</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">You share information with other members when you voluntarily disclose information on the service (including your public profile). Please be careful with your information and make sure that the content you share is stuff that you&rsquo;re comfortable being visible.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">If you choose to limit the audience for all or part of your profile or for certain content or information about you, then it will be visible according to your settings.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">If someone submits a report involving you (such as a claim you violated our Terms of Use), We may communicate to the reporter actions, if any, we took as a result of their report.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">We use third parties to help us operate and improve our services. These third parties assist us with various tasks, including data hosting and maintenance, analytics, customer care, marketing, advertising, payment processing and security operations. We also share information with partners who distribute and assist us in advertising our services.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">Sharing functionality</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">You may share other users&rsquo; profiles and they may share yours with people outside of our services, using the sharing functionality.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">For corporate transactions</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">We may transfer your information if we are involved, whether in whole or in part, in a merger, sale, acquisition, divestiture, restructuring, reorganization, dissolution, bankruptcy or other change of ownership or control.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">With law enforcement / when required by law</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">We may disclose your information if reasonably necessary: (i) to comply with a legal process, such as a court order, subpoena or search warrant, government / law enforcement investigation or other legal requirements; (ii) to assist in the prevention or detection of crime (subject in each case to applicable law); or (iii) to protect the safety of any person.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">To enforce legal rights</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">We may also share information: (i) if disclosure would mitigate our liability in an actual or threatened lawsuit; (ii) as necessary to protect our legal rights and legal rights of our members, business partners or other interested parties; (iii) to enforce our agreements with you; and (iv) to investigate, prevent, or take other action regarding illegal activity, suspected fraud or other wrongdoing.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">With your consent or at your request</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">We may ask for your consent to share your information with third parties. In any such case, we will make it clear why we want to share the information.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">We may use and share non-personal information (meaning information that, by itself, does not identify who you are such as device information, general demographics, general behavioral data, geolocation in de-identified form), as well as personal information in hashed, non-human readable form, under any of the above circumstances. We may also share this information with other companies and third parties (notably advertisers) to develop and deliver targeted advertising on our services and on websites or applications of third parties, and to analyze and report on advertising you see. We may combine this information with additional non-personal information or personal information in hashed, non-human readable form collected from other sources. &nbsp;</span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><strong>How Long Do We Retain Your Information That We Collect</strong></li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">We retain your information as long as we need it to provide our Services to you, comply with legal obligations or protect our or other users&rsquo; interests. We decide how long we need information on a case-by-case basis. Here&rsquo;s what we consider when we decide:</span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">If we need it to operate or provide our Services. For example, we need to keep some of your information to maintain your account.&nbsp;</li>
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">How long we need to retain the information to comply with certain legal obligations.</li>
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;">If we need it for other legitimate purposes, such as to prevent harm; investigate possible violations of our terms or policies; promote safety, security and integrity; or protect ourselves, including our rights, property or products</li>
</ul>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><strong>Third-party links</strong></li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">Vincho may, from time to time, contain links to and from the application of our partner networks, advertisers, and affiliates. Note that these websites have their own privacy policies and that we do not accept any responsibility or liability for these policies. Please check their policies before you submit any personal information to these websites.</span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><strong>Data Security</strong></li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">We use a combination of technical, administrative, and physical controls to maintain the security of your data. If you have a security-related concern, please email us at <a href="mailto:info@bigmanoutdoors.com">support@vincho.com</a>.&nbsp;</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">Always be sure to secure your login credentials for accessing Vincho. In order to protect you and your information, we may suspend your use of any part of Vincho, without notice, pending an investigation, if we suspect any breach of security.</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your Personal Information, we cannot guarantee the security of your Personal Information transmitted to the Company. Any transmission of Personal Information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on Vincho.</span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><strong>Changes to Your Information</strong></li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">All users may review, update, correct or delete the Personal Information they submitted by&nbsp;visiting the account profile page in the Application.&nbsp;&nbsp;</span></p>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">You may also send us an email at <a href="mailto:info@bigmanoutdoors.com">support@vincho.com</a> to request access to, correct, or delete any Personal Information that you have provided to us. We may not accommodate a request to change information if we believe the change would violate any law or legal requirement or cause the information to be incorrect.</span></p>
<ul style="line-height: 2; text-align: justify; text-align: justify;color: #f5f5f5;">
    <li style="font-family: Helvetica; font-size: 14px; line-height: 2; text-align: justify; color: #f5f5f5;"><strong>Contact Information</strong></li>
</ul>
<p style="line-height: 2; text-align: justify;"><span style="font-family: Helvetica; font-size: 14px; color: #f5f5f5;">If you have any questions, concerns or complaints about our Privacy Policy or our data collection or processing practices, or if you want to report any suspected security violations to us, please contact us at<a href="mailto:%20info@infinitihealth.org">&nbsp;</a></span><span style="color: #f5f5f5;"><a href="mailto:info@bigmanoutdoors.com"><span style="font-family: Helvetica; font-size: 14px;">support@vincho.com</span></a></span></p>  
     `;

  return (
    <CustomContainer isLoading={false}>
      <BackButton />
      <CustomKeyboardAwareScrollView>
        <View px={8} pb={8}>
          <RenderHTML contentWidth={width} source={{html}} />
        </View>
        {/*    <Text
          fontSize="xl"
          color={Colors.txtLight}
          mx="3"
          mt="6"
          fontFamily={customFonts.chanelRegular}>
          Use of Your Personal Data
        </Text>

        <Text
          fontSize="sm"
          color={Colors.txtLight}
          mx="3"
          lineHeight={24}
          mt="3"
          textAlign={'justify'}
          fontFamily={customFonts.regular}>
          The Company may use Personal Data for the following purposes: To
          provide and maintain our Service, including to monitor the usage of
          our Service. To manage Your Account: to manage Your registration as a
          user of the Service. The Personal Data You provide can give You access
          to different functionalities of the Service that are available to You
          as a registered user. For the performance of a contract: the
          development, compliance and undertaking of the purchase contract for
          the products, items or services You have purchased or of any other
          contract with Us through the Service. To contact You: To contact You
          by email, telephone calls, SMS, or other equivalent forms of
          electronic communication, such as a mobile application's push
          notifications regarding updates or informative communications related
          to the functionalities, products or contracted services, including the
          security updates, when necessary or reasonable for their
          implementation. To provide You with news, special offers and general
          information about other goods, services and events which we offer that
          are similar to those that you have already purchased or enquired about
          unless You have opted not to receive such information. To manage Your
          requests: To attend and manage Your requests to Us. For business
          transfers: We may use Your information to evaluate or conduct a
          merger, divestiture, restructuring, reorganization, dissolution, or
          other sale or transfer of some or all of Our assets, whether as a
          going concern or as part of bankruptcy, liquidation, or similar
          proceeding, in which Personal Data held by Us about our Service users
          is among the assets transferred. For other purposes: We may use Your
          information for other purposes, such as data analysis, identifying
          usage trends, determining the effectiveness of our promotional
          campaigns and to evaluate and improve our Service, products, services,
          marketing and your experience. We may share Your personal information
          in the following situations: With Service Providers: We may share Your
          personal information with Service Providers to monitor and analyze the
          use of our Service, to contact You. For business transfers: We may
          share or transfer Your personal information in connection with, or
          during negotiations of, any merger, sale of Company assets, financing,
          or acquisition of all or a portion of Our business to another company.
          With Affiliates: We may share Your information with Our affiliates, in
          which case we will require those affiliates to honor this Privacy
          Policy. Affiliates include Our parent company and any other
          subsidiaries, joint venture partners or other companies that We
          control or that are under common control with Us. With business
          partners: We may share Your information with Our business partners to
          offer You certain products, services or promotions. With other users:
          when You share personal information or otherwise interact in the
          public areas with other users, such information may be viewed by all
          users and may be publicly distributed outside. With Your consent: We
          may disclose Your personal information for any other purpose with Your
          consent.
        </Text>

        <Text
          fontSize="xl"
          color={Colors.txtLight}
          mx="3"
          mt="6"
          fontFamily={customFonts.chanelRegular}>
          Retention of Your Personal Data
        </Text>

        <Text
          fontSize="sm"
          color={Colors.txtLight}
          mx="3"
          lineHeight={24}
          mt="3"
          fontFamily={customFonts.regular}
          textAlign={'justify'}>
          The Company will retain Your Personal Data only for as long as is
          necessary for the purposes set out in this Privacy Policy. We will
          retain and use Your Personal Data to the extent necessary to comply
          with our legal obligations (for example, if we are required to retain
          your data to comply with applicable laws), resolve disputes, and
          enforce our legal agreements and policies. The Company will also
          retain Usage Data for internal analysis purposes. Usage Data is
          generally retained for a shorter period of time, except when this data
          is used to strengthen the security or to improve the functionality of
          Our Service, or We are legally obligated to retain this data for
          longer time periods.
        </Text>

        <Text
          fontSize="xl"
          color={Colors.txtLight}
          mx="3"
          mt="6"
          fontFamily={customFonts.chanelRegular}>
          Transfer of Your Personal Data
        </Text>

        <Text
          fontSize="sm"
          color={Colors.txtLight}
          mx="3"
          lineHeight={24}
          mt="3"
          fontFamily={customFonts.regular}
          textAlign={'justify'}>
          Your information, including Personal Data, is processed at the
          Company's operating offices and in any other places where the parties
          involved in the processing are located. It means that this information
          may be transferred to — and maintained on — computers located outside
          of Your state, province, country or other governmental jurisdiction
          where the data protection laws may differ than those from Your
          jurisdiction. Your consent to this Privacy Policy followed by Your
          submission of such information represents Your agreement to that
          transfer. The Company will take all steps reasonably necessary to
          ensure that Your data is treated securely and in accordance with this
          Privacy Policy and no transfer of Your Personal Data will take place
          to an organization or a country unless there are adequate controls in
          place including the security of Your data and other personal
          information.
        </Text>

        <Text
          fontSize="xl"
          color={Colors.txtLight}
          mx="3"
          mt="6"
          fontFamily={customFonts.chanelRegular}>
          Delete Your Personal Data
        </Text>

        <Text
          fontSize="sm"
          color={Colors.txtLight}
          mx="3"
          lineHeight={24}
          mt="3"
          fontFamily={customFonts.regular}
          textAlign={'justify'}>
          You have the right to delete or request that We assist in deleting the
          Personal Data that We have collected about You. Our Service may give
          You the ability to delete certain information about You from within
          the Service. You may update, amend, or delete Your information at any
          time by signing in to Your Account, if you have one, and visiting the
          account settings section that allows you to manage Your personal
          information. You may also contact Us to request access to, correct, or
          delete any personal information that You have provided to Us. Please
          note, however, that We may need to retain certain information when we
          have a legal obligation or lawful basis to do so.
        </Text>

        <Text
          fontSize="xl"
          color={Colors.txtLight}
          mx="3"
          mt="6"
          fontFamily={customFonts.chanelRegular}>
          Changes to this Privacy Policy
        </Text>

        <Text
          fontSize="sm"
          color={Colors.txtLight}
          mx="3"
          lineHeight={24}
          mt="3"
          fontFamily={customFonts.regular}
          textAlign={'justify'}>
          We may update Our Privacy Policy from time to time. We will notify You
          of any changes by posting the new Privacy Policy on this page. We will
          let You know via email and/or a prominent notice on Our Service, prior
          to the change becoming effective and update the "Last updated" date at
          the top of this Privacy Policy. You are advised to review this Privacy
          Policy periodically for any changes. Changes to this Privacy Policy
          are effective when they are posted on this page.
        </Text>

        <Text
          fontSize="xl"
          color={Colors.txtLight}
          mx="3"
          mt="6"
          fontFamily={customFonts.chanelRegular}>
          Contact Us
        </Text>

        <Text
          fontSize="sm"
          color={Colors.txtLight}
          mx="3"
          lineHeight={24}
          mt="3"
          fontFamily={customFonts.regular}
          textAlign={'justify'}>
          If you have any questions about this Privacy Policy, You can contact
          us: By email: it@apsy.io
        </Text> */}
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
};

export default Policy;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
