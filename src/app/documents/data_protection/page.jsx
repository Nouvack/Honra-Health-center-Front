"use client"

import Header from "@/app/shared_components/Header"
import Footer from "@/app/shared_components/Footer"

export default function Data({small}) {
    return(
        <section className="w-full min-h-screen flex flex-col">
            {!small && <Header/>}
            <div className="mt-20 p-10">
                <p className="font-bold">Honra: Data protection</p>
                <p className="text-xs pb-10">Effective Date: 19/05/2025</p>
                <p className="font-bold">1. Introduction</p>
                <p>At Honra Health Center, we are committed to ensuring the privacy and protection of our patients’ and website visitors’ personal data. This Privacy and Data Protection Policy explains how we collect, use, store, and protect your personal information in accordance with the General Data Protection Regulation (EU Regulation 2016/679, hereinafter "GDPR") and the Spanish Organic Law 3/2018, of 5 December, on the Protection of Personal Data and Guarantee of Digital Rights ("LOPDGDD").
                    By accessing and using our website (www.[yourdomain].es), you agree to the terms of this policy.</p>
                <p className="font-bold pt-5">2. Identity of the Data Controller</p>
                <p>The data controller responsible for processing your personal data is: Honra Health Center</p>
                <p>CIF: 1234567D</p>
                <p>Registered Address: P.º de la Castellana, 89, Tetuán, 28046 Madrid</p>
                <p>Email: info@honra.com</p>
                <p>Phone: 933762024</p>
                <p className="font-bold pt-5">3. Principles of Data Processing</p>
                <p>We process your personal data according to the following principles: Lawfulness, fairness, and transparency; Purpose limitation; Data minimization; Accuracy; Storage limitation; Integrity and confidentiality; Accountability</p>
                <p className="font-bold pt-5">4. Types of Personal Data We Collect</p>
                <p>We may collect and process the following categories of personal data:</p>
                <li>Identification data: name, surname, date of birth, ID number</li>
                <li>Contact data: phone number, email address, postal address</li>
                <li>Health-related data: medical history, test results, treatment information</li>
                <li>Website usage data: IP address, browser type, device information, browsing behavior via cookies (see our Cookie Policy)</li>
                <li>Appointment and billing data: appointment records, insurance details, payment information</li>
                <p className="font-bold pt-5">5. Purpose of Data Processing</p>
                <p>Your data will be processed for the following purposes:</p>
                <li>Managing and providing healthcare services</li>
                <li>Scheduling and managing medical appointments</li>
                <li>Communicating with patients and responding to inquiries</li>
                <li>Maintaining clinical records in accordance with healthcare regulations</li>
                <li>Sending appointment reminders, health-related alerts, and other notifications</li>
                <li>Fulfilling legal and regulatory obligations</li>
                <li>Improving our website and services through analytics</li>
                <p className="font-bold pt-5">6. Legal Basis for Data Processing</p>
                <p>We process your data based on one or more of the following legal grounds:</p>
                <li>Performance of a contract for healthcare services (Article 6(1)(b) GDPR)</li>
                <li>Compliance with legal obligations (Article 6(1)(c) GDPR)</li>
                <li>Consent of the data subject (Article 6(1)(a) GDPR)</li>
                <li>Protection of vital interests (Article 6(1)(d) GDPR)</li>
                <li>Legitimate interests pursued by the data controller, such as service improvement (Article 6(1)(f) GDPR)</li>
                <p>Special category data (e.g., health data) is processed under Article 9(2)(h) GDPR for purposes of preventive or occupational medicine and medical diagnosis.</p>
                <p className="font-bold pt-5">7. Data Retention</p>
                <p>We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected and to comply with applicable laws. Clinical records will be retained for a minimum of five years after the last patient interaction, or as otherwise required by Spanish healthcare regulations.</p>
                <p className="font-bold pt-5">8. Data Recipients</p>
                <p>Your data may be shared with:</p>
                <li>Healthcare professionals involved in your care</li>
                <li>Laboratories or diagnostic centers</li>
                <li>Regulatory and governmental authorities, as required by law</li>
                <li>IT service providers that manage hosting and data security, under strict confidentiality agreements</li>
                <p>We do not sell or rent your personal data under any circumstances.</p>
                

            </div>
            
            {!small && <Footer/> }
        </section>
    )
}