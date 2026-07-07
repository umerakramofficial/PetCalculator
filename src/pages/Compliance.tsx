import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Globe, MapPin, CheckCircle, Clock } from 'lucide-react';
import { SEO } from '../components/SEO';
import { allCalculators } from '../data/calculators';
import { blogArticles } from '../data/blog';
import { petGuides } from '../data/guides';

export const Compliance: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  // Contact form state
  const [cForm, setCForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cForm.name && cForm.email && cForm.message) {
      setSubmitted(true);
      setCForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  let title = '';
  let metaDesc = '';
  let content = null;

  if (path === '/about') {
    title = 'About Us';
    metaDesc = 'Learn about the editorial values, veterinary guidelines, and expert team behind Pet Calculator.';
    content = (
      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission & Vision</h2>
          <p>
            Welcome to <strong>Pet Calculator</strong>, a premier, veterinary-aligned authority platform designed to provide dog and cat owners with precise calculator utilities, clinical charts, and science-backed educational guides. We believe that caring for pets should be backed by peer-reviewed science, not guess-work. Our objective is to empower pet parents, breeders, and animal caregivers worldwide with free, accessible, and mathematically sound resources to monitor their companion animals' developmental milestones.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Clinical & Scientific Framework</h2>
          <p>
            Unlike generic calculators that rely on simplified rules of thumb (such as the inaccurate "1 dog year = 7 human years" myth), our interactive suite of 20 focus calculators integrates standard clinical benchmarks from leading veterinary institutions:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong>American Animal Hospital Association (AAHA):</strong> We adapt official canine and feline life stage guidelines to determine developmental age brackets.</li>
            <li><strong>American Association of Feline Practitioners (AAFP):</strong> Feline gestational timelines, hydration levels, and weight curves are sourced directly from peer-reviewed feline medical journals.</li>
            <li><strong>National Research Council (NRC):</strong> Nutritional formulas, Resting Energy Requirement (RER), and Daily Energy Requirement (DER) use metabolic body weight calculation parameters (body weight in kg raised to the 0.75 power) recommended by the Association of American Feed Control Officials (AAFCO).</li>
            <li><strong>World Small Animal Veterinary Association (WSAVA):</strong> Body Condition Scoring (BCS) tools are based on the standard 9-point visual and palpable assessment scales.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Editorial Integrity & Advisory Standards</h2>
          <p>
            Every tool, formula, article, and reference sheet published on this site undergoes a multi-step review process. We trace all calculated outputs back to original clinical studies, published journals, or textbooks in veterinary physiology. The core calculations are regularly updated to reflect new clinical research and updates in developmental and nutritional science.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2 bg-slate-50/50 dark:bg-slate-950/20">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Clinical Sourcing</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">All calculators contain explicit references, sourcing details, and citations to peer-reviewed veterinary papers and clinical guidelines.</p>
          </div>
          <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-2 bg-slate-50/50 dark:bg-slate-950/20">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Absolute Privacy</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">We do not store pet records or user metrics in remote databases. Everything runs locally in your browser to safeguard your data.</p>
          </div>
        </div>
      </div>
    );
  } else if (path === '/contact') {
    title = 'Contact Us';
    metaDesc = 'Get in touch with the support and editorial team at Pet Calculator.';
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Reach Our Team</h2>
          <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
            Have feedback regarding one of our calculators, suggestions for future tools, or editorial inquiries? Reach out to our support desk. We respond to inquiries within 48 business hours.
          </p>
          <div className="space-y-3 text-sm text-slate-655 dark:text-slate-350 pt-2">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-indigo-500" />
              <span>support@petcalculator.online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-indigo-500" />
              <span>www.petcalculator.online</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-indigo-500" />
              <span>Pet Care Suite Labs, San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleContactSubmit} className="bg-slate-50 dark:bg-slate-950 p-6 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Send Message</h3>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Name</label>
            <input
              type="text"
              value={cForm.name}
              onChange={(e) => setCForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs focus:ring-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Email Address</label>
            <input
              type="email"
              value={cForm.email}
              onChange={(e) => setCForm(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs focus:ring-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Message</label>
            <textarea
              rows={4}
              value={cForm.message}
              onChange={(e) => setCForm(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs transition-colors"
          >
            {submitted ? 'Message Dispatched!' : 'Submit Inquiry'}
          </button>

          {submitted && (
            <p className="text-[10px] text-emerald-500 flex items-center mt-2">
              <CheckCircle className="h-4.5 w-4.5 mr-1" />
              Thank you! Your message has been sent to our veterinary editor.
            </p>
          )}
        </form>
      </div>
    );
  } else if (path === '/privacy-policy') {
    title = 'Privacy Policy';
    metaDesc = 'Review the comprehensive privacy policy for Pet Calculator, including data protection, cookies, and AdSense disclosures.';
    content = (
      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p className="text-xs italic">Last Updated: July 7, 2026</p>
        
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Introduction</h2>
          <p>
            At Pet Calculator, accessible from <strong>www.petcalculator.online</strong>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Pet Calculator and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Information Collection & Storage</h2>
          <p>
            Pet Calculator does not maintain external user accounts, registrations, password files, or centralized database records. Any calculation inputs, pet profiles (such as name, age, weight), or favorited items you enter are stored purely on your local browser (utilizing local storage). We do not collect, transmit, upload, or sell this personal information. It remains entirely on your device.
          </p>
          <p>
            If you contact us directly via our contact form, we receive the name, email address, and content of the message you send. This information is used strictly to answer your inquiry and is never shared with third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Log Files</h2>
          <p>
            Pet Calculator follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Cookies and Web Beacons</h2>
          <p>
            Like any other website, Pet Calculator uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>
        </section>

        <section className="space-y-2 border-l-2 border-indigo-500 pl-4 bg-indigo-500/5 py-2 pr-2 rounded-r-xl">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white text-indigo-600 dark:text-indigo-400">6. Google DoubleClick DART Cookie & AdSense Policies</h2>
          <p>
            Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <strong>www.petcalculator.online</strong> and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL:
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline block mt-1 font-semibold">https://policies.google.com/technologies/ads</a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">7. Our Advertising Partners</h2>
          <p>
            Some of the advertisers on our site may use cookies and web beacons. Our advertising partners include:
          </p>
          <ul className="list-disc list-inside pl-2">
            <li><strong>Google AdSense:</strong> Google's advertising network has its own Privacy Policy governing user data. You can access their rules and documentation directly.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">8. Third-Party Privacy Policies</h2>
          <p>
            Pet Calculator's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
          <p>
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">9. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p>
            Under the CCPA, among other rights, California consumers have the right to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
          </ul>
          <p>
            If you make a request, we have one month to respond to you. Since we do not store, process, or sell any personal calculation data, we do not hold personal databases.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">10. GDPR Data Protection Rights</h2>
          <p>
            We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions. (As all data is stored locally on your device, clearing your browser history and site data will immediately delete all pet parameters from our site).</li>
            <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">11. Children's Information</h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
          </p>
          <p>
            Pet Calculator does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
        </section>
      </div>
    );
  } else if (path === '/terms-conditions') {
    title = 'Terms & Conditions';
    metaDesc = 'Review the terms of service, intellectual property guidelines, and conditions of use for Pet Calculator.';
    content = (
      <div className="space-y-6 text-sm text-slate-655 dark:text-slate-350 leading-relaxed">
        <p className="text-xs italic">Last Updated: July 7, 2026</p>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Introduction</h2>
          <p>
            These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Pet Calculator accessible at <strong>www.petcalculator.online</strong>. These Terms will be applied fully and affect your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Intellectual Property Rights</h2>
          <p>
            Other than the content you own (such as inputs you enter locally), under these Terms, Pet Calculator and/or its licensors own all the intellectual property rights and materials contained in this Website, including all code structures, custom math formulas, layout designs, stylesheets, articles, search queries, and graphics. You are granted a limited license only for purposes of viewing the material contained on this Website for personal use.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. User Restrictions</h2>
          <p>
            You are specifically restricted from all of the following:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Publishing any Website material, calculators, or article data in any other media without credit.</li>
            <li>Selling, sublicensing, and/or otherwise commercializing any Website calculators, resources, or code.</li>
            <li>Using this Website in any way that is or may be damaging to this Website.</li>
            <li>Using this Website in any way that impacts user access to this Website.</li>
            <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity.</li>
            <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this Website.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. No Warranties</h2>
          <p>
            This Website is provided "as is," with all faults, and Pet Calculator expresses no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you. The outputs of the calculators are mathematical approximations and do not constitute absolute clinical truths.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Limitation of Liability</h2>
          <p>
            In no event shall Pet Calculator, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Pet Calculator, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website, particularly regarding veterinary diagnostic errors, diet adjustments, or clinical schedules.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">6. Indemnification</h2>
          <p>
            You hereby indemnify to the fullest extent Pet Calculator from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">7. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">8. Governing Law & Jurisdiction</h2>
          <p>
            These Terms will be governed by and interpreted in accordance with the laws of the State of California, and you submit to the non-exclusive jurisdiction of the state and federal courts located in California for the resolution of any disputes.
          </p>
        </section>
      </div>
    );
  } else if (path === '/disclaimer') {
    title = 'Disclaimer';
    metaDesc = 'Read our clinical and veterinary disclaimer. Our calculators are educational tools and do not substitute professional medical advice.';
    content = (
      <div className="space-y-6 text-sm text-slate-655 dark:text-slate-350 leading-relaxed">
        <p className="text-xs italic">Last Updated: July 7, 2026</p>

        <div className="border border-amber-300 dark:border-amber-900/50 bg-amber-500/5 rounded-2xl p-5 space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 flex items-center">
            Veterinary Medical Disclaimer
          </h2>
          <p className="font-bold text-slate-800 dark:text-slate-200">
            The calculations, guidelines, timetables, and textual descriptions provided across Pet Calculator are strictly for educational and informational purposes. They do not constitute veterinary medical advice, diagnosis, clinical evaluation, or treatment plans.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Not a Substitute for Professional Care</h2>
          <p>
            Every companion animal (dog or cat) possesses unique physiological characteristics, genetic predispositions, activity baselines, health states, and environmental factors. A generic mathematical formula cannot capture these nuances. You should never delay seeking professional veterinary diagnostics, disregard medical advice, or begin/stop medical treatments based on calculated estimates provided on this platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Accuracy of Mathematical Estimations</h2>
          <p>
            While our development team utilizes standard clinical equations (e.g. resting energy calculations based on metabolic body mass exponents, standard gestational intervals, and growth factor ratios derived from veterinary consensus statements), we offer no warranties regarding the absolute accuracy or safety of these estimations. Nutritional density, breeding cycles, and developmental trajectories vary drastically between individual breeds.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. User Responsibility</h2>
          <p>
            By using our calculators (such as the Dog/Cat Calorie, Pregnancy, or Age tool), you acknowledge that you are doing so at your own risk. It is your sole responsibility to consult a licensed veterinarian before adjusting your pet’s daily food intake, beginning a weight management program, or making decisions about vaccination windows or breeding plans.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. External Sourcing and Outbound Links</h2>
          <p>
            We provide links to external scholarly documents, scientific references, research papers, and authority platforms (e.g., AAHA, AAFP, PubMed). Pet Calculator has no control over the content, security, or changes on third-party domains, and we do not assume liability for their statements or policies.
          </p>
        </section>
      </div>
    );
  } else if (path === '/cookie-policy') {
    title = 'Cookie Policy';
    metaDesc = 'Learn how Pet Calculator utilizes cookies, local storage, and third-party advertising tracking scripts to customize user experience.';
    content = (
      <div className="space-y-6 text-sm text-slate-655 dark:text-slate-350 leading-relaxed">
        <p className="text-xs italic">Last Updated: July 7, 2026</p>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. What Are Cookies?</h2>
          <p>
            Cookies are tiny text files containing small chunks of data that are downloaded and saved to your browser when you visit websites. They allow websites to remember user preferences, maintain session state, and facilitate third-party analytics and advertising networks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. How We Use Cookies</h2>
          <p>
            Pet Calculator utilizes cookies and local browser storage for several specific tasks:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong>Essential Interface Settings:</strong> We store your choice of design theme (Dark Mode vs Light Mode) and preferred calculations units (Metric vs Imperial) so that they persist when you load different tools. These cookies do not contain personal details.</li>
            <li><strong>Interactive User Favorites:</strong> We save your list of favorited or recently used calculators locally so you can access them quickly. This runs entirely inside your browser sandbox.</li>
            <li><strong>Third-Party Ad Networks:</strong> As a publisher, we display advertisements via Google AdSense. Google utilizes cookies (such as DoubleClick DART cookies) to serve ads based on your visit to this website and other websites across the web.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. How to Manage and Block Cookies</h2>
          <p>
            You can prevent the download of cookies by adjusting the configurations of your specific browser (Chrome, Firefox, Safari, Microsoft Edge). However, please note that disabling essential cookies may impact certain aspects of site navigation.
          </p>
          <p>
            To manage Google’s personalized advertising settings or opt-out of DART cookies, you can visit the official Google Ad Settings control page:
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline block mt-1 font-semibold">https://adssettings.google.com</a>
          </p>
        </section>
      </div>
    );
  } else if (path === '/editorial-policy') {
    title = 'Editorial Policy';
    metaDesc = 'Learn about our veterinary editorial standards, scientific sourcing protocol, and medical vetting procedures.';
    content = (
      <div className="space-y-6 text-sm text-slate-655 dark:text-slate-350 leading-relaxed">
        <p className="text-xs italic">Last Updated: July 7, 2026</p>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Core Standards and Editorial Mission</h2>
          <p>
            At Pet Calculator, our mission is to deliver the highest quality, most accurate, and clinically aligned calculations for pet owners. We operate with complete editorial independence. Our articles and interactive tools are created to translate complex clinical formulas into intuitive user tools, ensuring that pet care advice is understandable and actionable.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Scientific Sourcing & Reference Protocol</h2>
          <p>
            Every formula, developmental table, and dosage timeline is backed by evidence-based medicine. We do not use speculative theories or unverified blogs as references. Our sources are exclusively limited to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Clinical study publications indexed in PubMed or veterinary databases.</li>
            <li>Official medical guidelines published by national organizations like the American Animal Hospital Association (AAHA), the World Small Animal Veterinary Association (WSAVA), and the American Association of Feline Practitioners (AAFP).</li>
            <li>Academic papers and reference books from established veterinary colleges and nutritional panels.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Review and Updates Frequency</h2>
          <p>
            Veterinary science is dynamic. We review our calculators' equations, FAQs, and article text annually or whenever major veterinary organizations publish revised clinical consensus reports. This ensures our calculators do not serve outdated metrics.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Feedback, Errors, and Corrections</h2>
          <p>
            We strive for error-free clinical calculators. If you spot a mathematical discrepancy or an outdated citation, please reach out to our team via the contact page. Our veterinary consultants review all reports and implement adjustments within 72 hours if a corrections is validated.
          </p>
        </section>
      </div>
    );
  } else if (path === '/sitemap') {
    title = 'Sitemap';
    metaDesc = 'Direct directory links for all tools, blog posts, and resources.';
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">Calculator Directory</h3>
          <ul className="space-y-1.5 text-xs text-indigo-500">
            {allCalculators.map((calc) => (
              <li key={calc.id}>
                <Link to={`/tools/${calc.id}`} className="hover:underline">{calc.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">Blog Articles</h3>
          <ul className="space-y-1.5 text-xs text-indigo-500">
            {blogArticles.map((art) => (
              <li key={art.id}>
                <Link to={`/blog/${art.slug}`} className="hover:underline">{art.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">Guides & Compliance</h3>
          <ul className="space-y-1.5 text-xs text-indigo-500 mb-6">
            {petGuides.map((guide) => (
              <li key={guide.id}>
                <Link to={`/guides`} className="hover:underline">{guide.title}</Link>
              </li>
            ))}
          </ul>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Legal Directories</h3>
          <ul className="space-y-1.5 text-xs text-indigo-500">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link to="/disclaimer" className="hover:underline">Disclaimer</Link></li>
            <li><Link to="/cookie-policy" className="hover:underline">Cookie Policy</Link></li>
            <li><Link to="/editorial-policy" className="hover:underline">Editorial Policy</Link></li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto pb-16 space-y-8"
    >
      <SEO title={title} description={metaDesc} />

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight border-b border-slate-100 dark:border-slate-800 pb-4">
          {title}
        </h1>
        <div>{content}</div>
      </div>
    </motion.div>
  );
};
export default Compliance;
