import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';
import {CustomContainer, CustomKeyboardAwareScrollView} from '~/components';
import {BackButton} from '~/components';
import RenderHTML from 'react-native-render-html';
import {width} from '~/utils/dimension';

const Terms = () => {
  const html = `
<p class="p1" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>Terms of Use</strong></span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Last Modified: October 25, 2022</span></p>
<ul style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li style="line-height: 2; text-align: justify;color: #f5f5f5;"><span style="color: #f5f5f5;"><strong style="font-family: helvetica; font-size: medium;">Introduction</strong></span></li>
</ul>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Welcome to Vincho, owns and operates by Vincho, Inc., a Delaware corporation (the &ldquo;Company&rdquo; or &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;, and &ldquo;Vincho&rdquo;). The terms &ldquo;<strong>you</strong>&rdquo; refer to the person using the Application. Together you and Vincho may be referred to as the &ldquo;<strong>Parties</strong>&rdquo; or separately as &ldquo;<strong>Party</strong>.&rdquo;</span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">These terms of use (&ldquo;<strong>Terms</strong>&rdquo;) describe your rights and responsibilities regarding the Vincho mobile application (&ldquo;<strong>Application</strong>&rdquo;). Use of the Application is governed by these Terms and our Privacy Policy. By accessing or using the Application, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms and our Privacy Policy. If you do not want to agree to any of these Terms, you must not use the Application.</span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>Modification</strong></span></li>
</ul>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">The Company reserves the right, in its sole discretion, to amend these Terms, in whole or in part, at any time and for any reason, without penalty or liability to you or any third party. You should check the Terms from time to time when you use the Application to determine if any changes have been made. You can determine when the Terms were last revised by referring to the &ldquo;Last Modified&rdquo; notation above. Your continued use of the Application will be deemed acceptance to the amended or updated terms. If any of the provisions of these Terms are not acceptable to you, your only remedy is to discontinue your use of the Application.</span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>Description of Vincho</strong></span></li>
</ul>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">The Application is intended to provide a virtual environment for users to share and view artworks and meet new friends or find dates (&ldquo;<strong>Services</strong>&rdquo;).</span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You understand that the Application gathers unique information from you to enable it to provide services to you, including your partner preference and sexual orientation (collectively, &ldquo;<strong>Your Information</strong>&rdquo;).<span class="Apple-converted-space">&nbsp;</span></span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You acknowledge that your reliance on any communications with the other users in the Application is solely at your own risk and you assume full responsibility for all risks associated herewith.</span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>Eligibility</strong></span></li>
</ul>
<p class="p4" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">To use the Services through the Application, the following must be true:</span></p>
<ul class="ul1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You are at least 18 years of age or older.</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You live in the United States, where the Services are available.</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You are not a person who is barred from using the Service under the laws of the United States (for example, you do not appear on the U.S. Treasury Department&rsquo;s list of Specially Designated Nationals or face any other similar prohibition),</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You have not committed, been convicted of, or pled no contest to a felony, a sex crime, or any crime involving violence or a threat of violence, unless you have received clemency for a non-violent crime and we have determined that you are not likely to pose a threat to other users of our Service, and that you are not required to register as a sex offender with any state, federal or local sex offender registry,</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You have not previously been removed from the Service by us, unless you have our express written permission to create a new account.</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><span class="s1">You agree to be legally bound by and comply with these Terms and Privacy Policy [</span><span class="s3">link</span><span class="s1">].</span></span></li>
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You must have compatible mobile devices, access to the Internet, and certain necessary software required use the Application.</span></li>
</ul>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You understand and agree that satisfying the above requirements does not guarantee that you will receive Services through the Application. In addition to the above requirements, the Company reserves the right to change or include new requirements as deemed appropriate in their sole discretion without providing prior notice to you. <span class="Apple-converted-space">&nbsp;</span></span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>Registration and User Accounts</strong></span></li>
</ul>
<p class="p4" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">To receive Services through the Application, you are required to create an individual user account (&ldquo;<strong>Account</strong>&rdquo;). You agree that you will not create more than one Account or create an Account for anyone other than yourself without first receiving permission from the other person. In exchange for your access to the Application and use of the Services you agree to:<span class="Apple-converted-space">&nbsp;</span></span></p>
<ul class="ul1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">provide true, accurate, current, and complete information about yourself as prompted by our Account registration form; and<span class="Apple-converted-space">&nbsp;</span></span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">to maintain, and promptly update such Account information, each time you log on, as far as possible to keep it true, accurate, current, and complete. If you provide any information that is untrue, inaccurate, not current, or incomplete, or the Company has reasonable grounds to suspect that such Account information is untrue, inaccurate, not current, or incomplete, the Company reserves the right to terminate your Account.</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">certify that you are (i) over the age of 18 or have the legal ability to consent to the Services and (ii) physically located or are a resident of the Country you have chosen as your current residency when creating your Account.<span class="Apple-converted-space">&nbsp;</span></span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">remain responsible for maintaining the confidentiality of your Account, and any other security information related to your Account at all times. The Company will not be liable for any loss that you incur because of someone else accessing and using your Account, either with or without your knowledge.</span></li>
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">comply with these Terms and all applicable local, state, national and international laws, rules and regulations, including without limitation, privacy laws, intellectual property laws, anti-spam laws, and regulatory requirements,</span></li>
</ul>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>Your Responsibilities and Acknowledgement</strong></span></li>
</ul>
<p class="p6" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">As a condition of your use of the Application, you agree to the following:</span></p>
<ul class="ul1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">all the information you provided through the Application is accurate, complete and correct, and you will accurately maintain and update it as needed;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">your permission to use the Application is personal (the Application will be used only by you), and your identification information is accurate and truthful.<span class="Apple-converted-space">&nbsp;</span></span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">you will keep confidential your Account password and that you will exit from your Account at the end of each session. You are responsible for all activities that occur under your account and for maintaining the confidentiality of your password. You are responsible for changing your password promptly if you think it has been compromised. You may not transfer or share your password with anyone, or create more than one account. You may not use anyone else&rsquo;s account at any time.</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">you will immediately notify the Company of any unauthorized use of your Account, or any other breach of security that you become aware of involving or relating to the Services by emailing <a href="mailto:info@vriends.com"><span class="s4" style="color: #f5f5f5;">support@vincho.com</span></a></span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You understand and agree that the provision of Services through the Application depends on the completeness and accuracy of your Information. The Company is unable to verify all of your Information. Therefore, the Company is not responsible for any consequences if your Information is inaccurate or incomplete. If your Information is inaccurate, incomplete, or not maintained, or Vincho has reasonable grounds to suspect as much, Vincho has the right to suspend or terminate your account and your use of the Services. In addition, the Company may take all actions it deems necessary or reasonable to maintain the security of the Application, Services and your Account.</span></li>
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You acknowledge and agree that the Company makes no guarantee that the Services shall lead to any particular result.</span></li>
</ul>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>Restrictions on Use</strong></span></li>
</ul>
<p class="p7" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You will not use, or encourage or permit others to use, the Application except as expressly permitted in these Terms. Specifically, you will not:</span></p>
<ul class="ul1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Access or use the Application in any manner or for any purpose that infringes, misappropriates, or otherwise violates any intellectual property right or other right of any third party, or that violates any applicable local, state or federal law or regulation, or is prohibited by these Terms;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">License, sublicense, sell, resell, transfer, assign, distribute or otherwise commercially exploit or make available to any third party the Application or related materials in any way;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Use or access the Application to create or develop competing products or services or for any other purpose that is to the Company&rsquo;s detriment or commercial disadvantage;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Take any action or use the Application in any manner which could damage, destroy,<span class="Apple-converted-space">&nbsp; </span>disrupt, disable, impair, overburden, interfere with, or otherwise impede or harm in any manner our Application or any content, in whole or in part;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Disrupt, interfere with, violate the security of, or attempt to gain unauthorized access to our Application or any computer network;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Bypass, breach, avoid, remove, deactivate, impair, descramble, or otherwise circumvent any security device, protection, or technological measure implemented by Vincho or any of our service providers to protect our Application;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Input, upload, transmit, distribute, or otherwise run or propagate any virus, application, Trojan horse, or any other harmful computer code that could damage or alter a computer, portable device, computer network, communication network, data, or our Application, or any other system, device, or property;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Remove, delete, alter, or obscure any trademarks, specifications, warranties, or disclaimers, or any copyright, trademark, patent, or other intellectual property or proprietary rights notices from our Application or any content made available to you on or through our Application;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Use any manual process or automated device to monitor or copy any content made available on or through our Application for any unauthorized purposes;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Copy, duplicate, download, store in a retrieval system, publish, transmit or otherwise reproduce, transfer, distribute, store, disseminate, aggregate, use as a component of or as the basis for a database or otherwise use in any form or by any means any data, text, reports, or other materials related to Vincho or third-party content from the Application; or</span></li>
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Encourage or enable any other individual to do any of the foregoing.</span></li>
</ul>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>Communications with Other Users</strong></span></li>
</ul>
<p class="p8" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">The Service enables users to communicate information to others through their social actions (e.g., messaging, swiping&hellip;etc). We authorize you to use these tools for non-commercial purposes, unless otherwise expressly approved by the Company. You are solely responsible for your interactions with other users. The Company reserves the right, but has no obligation, to monitor disputes between you and other users and respond as necessary to enforce these Terms.</span></p>
<p class="p8" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Please note that any information you share through your profile on the Application (subject to certain privacy settings) will be seen by other users of the Application, so be mindful as to what you choose to share, and do not share in this manner any content or information that is confidential, that you do not want others to see or use, or that is subject to third party rights. The Company is not responsible for another user&rsquo;s use, misuse or misappropriation of any information you share via the Application.</span></p>
<p class="p8" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You agree to treat other users in a courteous and respectful manner, both on and off our Services and to be respectful when communicating with any of our customer care representatives or other employees. Though Vincho strives to encourage a respectful user experience, Vincho is not responsible for the conduct of any user on or off of the Application. You agree to use caution in all interactions with other users, particularly if you decide to communicate off the Application or meet in person. In addition, you agree that you will not provide your financial information (for example, your credit card or bank account information), or wire or otherwise send money to other Vincho users.</span></p>
<p class="p8" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER VINCHO USERS. YOU UNDERSTAND THAT VINCHO DOES NOT CONDUCT CRIMINAL BACKGROUND CHECKS ON ITS USERS OR OTHERWISE INQUIRE INTO THE BACKGROUND OF ITS USERS. VINCHO MAKES NO REPRESENTATIONS OR WARRANTIES AS TO THE CONDUCT OR COMPATIBILITY OF USERS. VINCHO RESERVES THE RIGHT TO CONDUCT &ndash; AND YOU AUTHORIZE VINCHO TO CONDUCT &ndash; ANY CRIMINAL BACKGROUND CHECK OR OTHER SCREENINGS (SUCH AS SEX OFFENDER REGISTER SEARCHES) AT ANY TIME USING AVAILABLE PUBLIC RECORDS OBTAINED BY IT OR WITH THE ASSISTANCE OF A CONSUMER REPORTING AGENCY, AND YOU AGREE THAT ANY INFORMATION YOU PROVIDE MAY BE USED FOR THAT PURPOSE.</span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>Content</strong></span></li>
</ul>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Content as used in these Terms means the <span class="s3">materials uploaded to the Application</span> by the users. All Content, whether publicly posted or privately transmitted, is the sole responsibility of the person who originated such Content.</span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Although we want our users to be able express themselves as much as possible and post all sorts of things on Vincho, we have to impose restrictions on certain content which:</span></p>
<ul class="ul1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">contains language or imagery which could be deemed offensive or is likely to harass, upset, embarrass, alarm or annoy any other person (including for example and without limitation, language that could be deemed discriminatory towards an individual&rsquo;s race, color, ethnicity, national origin, religion, disability, sexual orientation, gender expression, gender identity or physical appearance);</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">is obscene, pornographic, violent or otherwise may offend human dignity (including for example and without limitation, language that could be deemed discriminatory towards an individual&rsquo;s race, color, ethnicity, national origin, religion, disability, sexual orientation, gender expression, gender identity or physical appearance);</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">is abusive, insulting or threatening, discriminatory or which promotes or encourages racism, sexism, hatred or bigotry (including for example and without limitation, language that could be deemed discriminatory towards an individual&rsquo;s race, color, ethnicity, national origin, religion, disability, sexual orientation, gender expression, gender identity or physical appearance);</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">encourages any illegal activity including, without limitation, terrorism, inciting racial hatred or the submission of which in itself constitutes committing a criminal offence;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">is defamatory or libelous;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">relates to commercial activities (including, without limitation, sales, competitions and advertising, links to other websites or premium line telephone numbers);</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">involves the transmission of &ldquo;junk&rdquo; mail or &ldquo;spam&rdquo;;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">contains any spyware, adware, viruses, corrupt files, worm programs or other malicious code designed to interrupt, damage or limit the functionality of or disrupt any software, hardware, telecommunications, networks, servers or other equipment, Trojan horse or any other material designed to damage, interfere with, wrongly intercept or expropriate any data or personal information whether from Vincho or otherwise;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">shows another person which was created or distributed without that person&rsquo;s consent;</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">is harmful to minors; or</span></li>
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">impersonates any other person, including falsely stating your name.</span></li>
</ul>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Vincho operates a zero-tolerance policy for this kind of content.</span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">If you choose to upload or send Content in the Application, you must not submit any Content that does not comply with these Terms or any applicable law. For example, the Content you submit must not include third-party intellectual property (such as copyrighted material) unless you have permission from that party or are otherwise legally entitled to do so. You are legally responsible for the Content you uploaded on the Application. We may use automated systems that analyze your Content to help detect infringement and abuse, such as spam, malware, infringing and illegal content.</span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You retain ownership rights in your Content. However, we do require you to grant certain rights to the Company, as described below:</span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">By uploading Content to the Application, you grant the Company a perpetual, irrevocable, worldwide, non-exclusive, royalty-free, fully paid and fully sublicensable right and license to perform, distribute, modify, reproduce, create derivative works of, and otherwise commercially or non-commercially use all such Content in any manner determined solely by the Company.</span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">The licenses granted by you continue for a commercially reasonable period of time after you remove or delete your Content from the Application. You understand and agree, however, that the Company may retain, but not display, distribute, or perform, server copies of Content that have been removed or deleted.&nbsp;</span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You may remove your Content from the Application at any time. You also have the option to make a copy of your Content before removing it. You must remove your Content if you no longer have the rights required by these Terms.</span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">If the Company reasonably believes that any Content is in breach of these Terms or may cause harm to the Company, our users, or third parties, we may remove or take down that Content in our sole discretion. We will notify you with the reason for our action unless we reasonably believe that to do so: (a) would breach the law or the direction of a legal enforcement authority or would otherwise risk legal liability for the Company; (b) would compromise an investigation or the integrity or operation of the Application; or (c) would cause harm to any user, other third party, the Company or our affiliates.&nbsp;</span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Although Vincho reserves the right to review and remove Content that violates these Terms, such Content is the sole responsibility of the user who posts it, and Vincho cannot guarantee that all Content will comply with this Agreement. If you see Content on the Service that violates this Agreement, please report it within the Application or via email at <span class="s5">support@vincho.com</span>.</span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">VINCHO ASSUMES NO RESPONSIBILITY FOR ANY CONTENT THAT YOU OR ANOTHER USER OR THIRD PARTY POSTS, SENDS OR RECEIVES THROUGH THE APPLICATION. ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE APPLICATION IS ACCESSED AT YOUR OWN DISCRETION AND RISK.</span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>10)</strong><span class="s1"><strong>Notice and Procedure for Making Claims of Copyright Infringement.</strong></span></span></li>
</ul>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">We respect the intellectual property rights of others and request all users of Vincho to do the same. Pursuant to the U.S. Digital Millennium Copyright Act (&ldquo;<strong>DMCA</strong>&rdquo;), notifications of claimed copyright infringement should be sent to <span class="s6">support@vincho.com</span>. Upon the receipt of written notification of infringement and subject to applicable copyright laws, the Company may remove or disable access to any such content.</span></p>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">To be effective, the notification of claimed infringement must be a written communication that includes substantially the following:</span></p>
<ul class="ul1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">A physical or electronic signature of the person authorized to act on behalf of the owner of the right that is allegedly infringed;</span></li>
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Identification of the work and the pertinent exclusive legal right claimed to be infringed, or if multiple works or legal rights are covered by a single notification, a representative list of such elements;</span></li>
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Identification of the material that is claimed to infringe or to be the subject of infringing activity and the access to which is to be disabled, and information reasonably sufficient to permit us to locate the material, including the precise location on the Services where they discovered the work claimed to be infringing;</span></li>
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">Information reasonably sufficient to permit us to contact them, such as an address, telephone number, and, if available, an electronic mail address at which you may be contacted;</span></li>
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">A statement that they have a good faith belief that the use of the material, in the manner complained of, is not authorized by the copyright owner, its agent, or the law;</span></li>
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">A statement that the information in the notification is accurate, and under penalty of perjury, that they are authorized to act on behalf of the owner of copyright that is allegedly infringed.</span></li>
</ul>
<p class="p2" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">After receiving the communication, Vincho may ask person who submitted the claimed infringement to provide further or supplemental information, prior to removing any Content on Vincho, as we deem necessary to comply with applicable law. We may also provide the user who uploaded the allegedly infringing content, with the contact details of person who submitted the claimed infringement, for the former to be able to contact the latter and challenge the claim. It is the policy of Vincho to terminate the user accounts of repeat infringers.</span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>Device Compatibility</strong></span></li>
</ul>
<p class="p7" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">The Company does not promise that the Application is compatible with all devices and with all versions/updates of all operating systems or firmware. If you update your operating system or firmware, your version of the application may not function properly. Company may, but is not obligated to, provide updates to the application that improve compatibility with updated devices. It is your sole responsibility to confirm compatibility before purchasing any sessions.</span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>12)</strong><span class="s1"><strong>Disclaimer of Warranties</strong></span></span></li>
</ul>
<p class="p9" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">The Application is available &ldquo;as is&rdquo; and &ldquo;as available&rdquo; and without any warranties of any kind. Without limiting the generality of the foregoing:</span></p>
<ul class="ul1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">all content, materials, information, software, products, tools, and services included in or available through the Application are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranty of any kind, express or implied. to the fullest extent provided by law, the Company hereby disclaims all warranties of any kind, whether express or implied, statutory, or otherwise, including but not limited to any warranties of merchantability, non-infringement, and fitness for particular purpose. the foregoing does not affect any warranties that cannot be excluded or limited under applicable law.</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">in no event shall we be liable to you or anyone else for any decision made or action taken in reliance on any content on the Application or the use of any services offered through the Application.</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">we make no guarantees, representations or warranties, whether expressed or implied, with respect to completeness, accuracy, reliability, or availability of the Application.</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">to the fullest extent provided by law, we will not be liable for any loss or damage caused by a distributed denial-of-service attack, viruses, or other technologically harmful material that may infect your computer equipment, computer programs, data, or other proprietary material due to your use of the Application or any services or items obtained through the Application or to your downloading of any material posted on it, or on any Application linked to it.</span></li>
<li class="li5" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">neither the Company nor anyone associated with the Company represents or warrants that the Application, its content, or any Services will be accurate, reliable, error-free, or uninterrupted, that defects will be corrected, that the Application or the server that makes it available are free of viruses or other harmful components, or that the Application or any services or items obtained through the Application will otherwise meet your needs or expectations.</span></li>
<li class="li10" style="line-height: 2; text-align: justify;"><span class="s1" style="font-family: helvetica; font-size: medium; color: #f5f5f5;">you understand and agree that the Company assumes no responsibility for the timeliness, deletion, mis-delivery or failure to store any content, user communications or personalization settings.</span></li>
</ul>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>13)</strong><span class="s1"><strong>Limitation on Liability</strong></span></span></li>
</ul>
<p class="p11" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">To the fullest extent provided by law, in no event will Vincho, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the Application, any websites linked to it, or any content in the Application, including any direct, indirect, special, incidental, consequential, or punitive damages, including but not limited to, personal injury, pain and suffering, emotional distress, loss of revenue, loss of profits, loss of business or anticipated savings, loss of use, loss of goodwill, loss of data, and whether caused by tort (including negligence), breach of contract, or otherwise, even if foreseeable.</span></p>
<p class="p11" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">In no event shall our total liability to you for all damages, losses and causes of action whether in contract, tort (including negligence) or otherwise exceed the amount paid by you to the Company for the Services in the 3 months preceding the claim.<span class="Apple-converted-space">&nbsp;</span></span></p>
<p class="p7" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">In the event some jurisdictions do not allow the exclusion or limitation of damages to the extent indicated above, the Company&rsquo;s liability in such jurisdictions shall be limited to the extent permitted by applicable law.</span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>14)</strong><span class="s1"><strong> Indemnification</strong></span></span></li>
</ul>
<p class="p7" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">You agree to defend, indemnify, and hold harmless Vincho, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&rsquo; fees) arising out of or relating to your violation of these Terms or your use of the Application.</span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>15)</strong><span class="s1"><strong>Governing Law and Jurisdiction</strong></span></span></li>
</ul>
<p class="p12" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">All matters relating to <span class="s9">Vincho</span>, Privacy Policy, these Terms<span class="s9">,</span> and any dispute or claim arising therefrom or related thereto, in each case, including non-contractual disputes or claims, shall be governed by and construed in accordance with the laws of the State of California without giving effect to any choice or conflict of law provision or rule (whether of the State of California or any other jurisdiction).</span></p>
<p class="p13" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">&nbsp;</span></p>
<p class="p14" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">IF YOU ARE A CALIFORNIA RESIDENT, YOU HEREBY WAIVE CALIFORNIA CIVIL CODE SECTION 1542 IN CONNECTION WITH THE FOREGOING, WHICH STATES: &ldquo;A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM OR HER MUST HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE DEBTOR.</span></p>
<p class="p15" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">We encourage you to contact Vincho&rsquo;s Customer Service department via email at support@vincho.com if you have concerns or complaints about the Application or the Services. Generally, user complaints can be satisfactorily resolved this way. If we cannot resolve your concerns informally, disputes between you and Vincho shall be resolved pursuant to this section.</span></p>
<p class="p15" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">At the Company&rsquo;s sole discretion, it may require you to submit any disputes arising out of or relating to any aspect of your relationship with Vincho, first to mediation in the Los Angeles County, California, U.S., then next to final and binding confidential arbitration under the Rules of Arbitration of the American Arbitration Association applying the laws of the State of California, without regard to its choice of law provisions. Under this Agreement, arbitrators can award the same individual relief affecting individual parties that a court can award, including damages and an award of attorneys&rsquo; fees, if the applicable law allows. You and the Company each agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated or representative action.<span class="Apple-converted-space">&nbsp;</span></span></p>
<p class="p15" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">PLEASE BE AWARE THAT YOU ARE GIVING UP THE RIGHT TO LITIGATE A DISPUTE IN COURT BEFORE A JUDGE OR JURY.<span class="Apple-converted-space">&nbsp;</span></span></p>
<p class="p16" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><span class="s10">YOU AND THE COMPANY AGREE TO ARBITRATE IN EACH OF OUR INDIVIDUAL CAPACITIES ONLY, NOT AS A REPRESENTATIVE OR MEMBER OF A CLASS, AND EACH OF US EXPRESSLY WAIVES</span><span class="s1">THE RIGHT TO FILE OR PARTICIPATE IN A CLASS ACTION AGAINST THE OTHER OR OTHERWISE TO SEEK RELIEF ON A CLASS BASIS, INCLUDING ANY CURRENTLY PENDING ACTIONS AGAINST VINCHO. TO THE FULLEST EXTENT ALLOWABLE BY LAW, THERE SHALL BE NO RIGHT OR AUTHORITY FOR ANY CLAIMS TO BE ARBITRATED OR LITIGATED ON A CLASS, COLLECTIVE, REPRESENTATIVE, CONSOLIDATED, OR PRIVATE ATTORNEY GENERAL BASIS. THE ARBITRATOR CAN AWARD THE SAME RELIEF AVAILABLE IN COURT PROVIDED THAT THE ARBITRATOR MAY ONLY AWARD FINAL RELIEF (INCLUDING INJUNCTIVE OR DECLARATORY RELIEF) IN FAVOR OF THE INDIVIDUAL PARTY SEEKING RELIEF AND ONLY TO THE EXTENT NECESSARY TO PROVIDE FINAL RELIEF WARRANTED BY THAT INDIVIDUAL PARTY&rsquo;S CLAIM. THE ARBITRATOR MAY NOT AWARD FINAL RELIEF FOR, AGAINST, OR ON BEHALF OF ANYONE WHO IS NOT A PARTY TO THE ARBITRATION ON A CLASS, COLLECTIVE, REPRESENTATIVE, OR PRIVATE ATTORNEY GENERAL BASIS.<strong> <span class="Apple-converted-space">&nbsp;</span></strong></span></span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>16)</strong><span class="s1"><strong> Waiver and Severability</strong></span></span></li>
</ul>
<p class="p11" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">No waiver by Vincho of any term or condition set out in these Terms should be deemed a further or continuing waiver of such term or a waiver of any other term, and any failure of Vincho to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.</span></p>
<p class="p7" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms will continue in full force and effect.</span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>17)</strong><span class="s1"><strong> Entire Agreement</strong></span></span></li>
</ul>
<p class="p7" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">These Terms and the Privacy Policyconstitute the sole and entire agreement between you and the Company regarding the Application and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the Application unless otherwise set forth in a written agreement between you and Vincho.</span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>18)</strong><span class="s1"><strong>Conflict</strong></span></span></li>
</ul>
<p class="p7" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">In the event of any conflict or inconsistency between the provisions of these Terms and the provisions of any of the other agreements between you and the Company, the provisions of this Agreement shall control.<span class="Apple-converted-space">&nbsp;</span></span></p>
<ul class="ol1" style="line-height: 2; text-align: justify;color: #f5f5f5;">
<li class="li3" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;"><strong>19)</strong><span class="s1"><strong>Contact Information</strong></span></span></li>
</ul>
<p class="p11" style="line-height: 2; text-align: justify;"><span style="font-family: helvetica; font-size: medium; color: #f5f5f5;">All notices of copyright infringement claims should be sent by the means set out above. All other feedback, comments, requests for technical support, and other communications relating to the Application should be directed to support@vincho.com</span></p>`;

  return (
    <CustomContainer isLoading={false}>
      <BackButton />

      <CustomKeyboardAwareScrollView>
        <View px={8} pb={8}>
          <RenderHTML contentWidth={width} source={{html}} />
        </View>

        {/*         <Text
          fontSize="xl"
          color={Colors.txtLight}
          mx="3"
          mt="6"
          fontFamily={customFonts.chanelRegular}>
          Introduction
        </Text>

        <Text
          fontSize="sm"
          color={Colors.txtLight}
          mx="3"
          lineHeight={24}
          mt="3"
          fontFamily={customFonts.regular}
          textAlign={'justify'}>
          Welcome to Vincho, owns and operates by Vincho, Inc., a Delaware
          corporation (the “Company” or “we”, “our”, “us”, and “Vincho”). The
          terms “you” refer to the person using the Application. Together you
          and Vincho may be referred to as the “Parties” or separately as
          “Party.” These terms of use (“Terms”) describe your rights and
          responsibilities regarding the Vincho mobile application
          (“Application”). Use of the Application is governed by these Terms and
          our Privacy Policy. By accessing or using the Application, you
          acknowledge that you have read, understood, and agreed to be legally
          bound by these Terms and our Privacy Policy. If you do not want to
          agree to any of these Terms, you must not use the Application.
        </Text>

        <Text
          fontSize="xl"
          color={Colors.txtLight}
          mx="3"
          mt="6"
          fontFamily={customFonts.chanelRegular}>
          Modification
        </Text>

        <Text
          fontSize="sm"
          color={Colors.txtLight}
          mx="3"
          lineHeight={24}
          mt="3"
          fontFamily={customFonts.regular}
          textAlign={'justify'}>
          The Company reserves the right, in its sole discretion, to amend these
          Terms, in whole or in part, at any time and for any reason, without
          penalty or liability to you or any third party. You should check the
          Terms from time to time when you use the Application to determine if
          any changes have been made. You can determine when the Terms were last
          revised by referring to the “Last Modified” notation above. Your
          continued use of the Application will be deemed acceptance to the
          amended or updated terms. If any of the provisions of these Terms are
          not acceptable to you, your only remedy is to discontinue your use of
          the Application.
        </Text>

        <Text
          fontSize="xl"
          color={Colors.txtLight}
          mx="3"
          mt="6"
          fontFamily={customFonts.chanelRegular}>
          Description of Vincho
        </Text>

        <Text
          fontSize="sm"
          color={Colors.txtLight}
          mx="3"
          lineHeight={24}
          mt="3"
          fontFamily={customFonts.regular}
          textAlign={'justify'}>
          The Application is intended to provide a virtual environment for users
          to share and view artworks and meet new friends or find dates
          (“Services”). You understand that the Application gathers unique
          information from you to enable it to provide services to you,
          including your partner preference and sexual orientation
          (collectively, “Your Information”). You acknowledge that your reliance
          on any communications with the other users in the Application is
          solely at your own risk and you assume full responsibility for all
          risks associated herewith.
        </Text>

        <Text
          fontSize="xl"
          color={Colors.txtLight}
          mx="3"
          mt="6"
          fontFamily={customFonts.chanelRegular}>
          Eligibility
        </Text>

        <Text
          fontSize="sm"
          color={Colors.txtLight}
          mx="3"
          lineHeight={24}
          mt="3"
          fontFamily={customFonts.regular}
          textAlign={'justify'}>
          To use the Services through the Application, the following must be
          true: You are at least 18 years of age or older. You live in the
          United States, where the Services are available. You are not a person
          who is barred from using the Service under the laws of the United
          States (for example, you do not appear on the U.S. Treasury
          Department’s list of Specially Designated Nationals or face any other
          similar prohibition), You have not committed, been convicted of, or
          pled no contest to a felony, a sex crime, or any crime involving
          violence or a threat of violence, unless you have received clemency
          for a non-violent crime and we have determined that you are not likely
          to pose a threat to other users of our Service, and that you are not
          required to register as a sex offender with any state, federal or
          local sex offender registry, You have not previously been removed from
          the Service by us, unless you have our express written permission to
          create a new account. You agree to be legally bound by and comply with
          these Terms and Privacy Policy [link]. You must have compatible mobile
          devices, access to the Internet, and certain necessary software
          required use the Application. You understand and agree that satisfying
          the above requirements does not guarantee that you will receive
          Services through the Application. In addition to the above
          requirements, the Company reserves the right to change or include new
          requirements as deemed appropriate in their sole discretion without
          providing prior notice to you.
        </Text> */}
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
};

export default Terms;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
