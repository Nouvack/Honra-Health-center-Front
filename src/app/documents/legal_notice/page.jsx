"use client"

import Header from "@/app/shared_components/Header"
import Footer from "@/app/shared_components/Footer"

export default function Legal() {
    return(
        <section className="w-full min-h-screen flex flex-col">
            <Header/>
            <div className="mt-20 p-10">
                <p className="font-bold">Honra: Legal notice</p>
                <p className="text-xs pb-10">Effective Date: 19/05/2025</p>
                <p className="font-bold">1. Identification</p>
                <p>
                    This website is owned and operated by:<br/><br/>

                    HONRA Health Center<br/>
                    P.º de la Castellana, 89, Tetuán, 28046 Madrid<br/>
                    933 76 20 24<br/>
                    help@honra.com<br/>
                    localhost:3000<br/>
                </p>
                <p className="font-bold">2. Purpose of the Website</p>
                <p>The content of this website is intended for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Users should consult a qualified healthcare provider for personalized medical attention.</p>
                <p className="font-bold">3. Disclaimer of Liability</p>
                <p>HONRA Health Center makes every effort to ensure the accuracy and reliability of the information on this website. However, the content may not be up to date or free from errors. We do not assume liability for damages resulting from the use or interpretation of the content herein.</p>
                <p className="font-bold">4. Medical Disclaimer</p>
                <p>No part of this website should be considered a substitute for professional medical evaluation or treatment. Do not disregard medical advice or delay seeking it based on content you have read here.</p>                
                <p className="font-bold">5. Intellectual Property</p>
                <p>All content on this website—including text, images, logos, and design elements—is the property of [Medical Office Name] unless otherwise stated. Unauthorized reproduction or use is prohibited.</p>
                <p className="font-bold">6. Links to Third Parties</p>
                <p>This website may contain links to external websites. [Medical Office Name] does not endorse, control, or take responsibility for the content, privacy policies, or practices of third-party websites.</p>
                <p className="font-bold">7. Privacy and Data Protection</p>
                <p>We respect your privacy. Any personal data submitted through this site (e.g., contact forms, appointment requests) will be handled in accordance with applicable data protection laws and will not be shared with third parties without your consent.</p>
                <p className="font-bold">8. Cookies</p>
                <p>This website may use cookies to enhance user experience. By using this site, you agree to the use of cookies unless you disable them in your browser settings.</p>
                <p className="font-bold">9. Jurisdiction and Applicable Law</p>
                <p>This legal notice shall be governed by and interpreted in accordance with the laws of [Your Country/State]. Any disputes arising in connection with the website shall be subject to the exclusive jurisdiction of the courts of [City/Region].</p>
                <p className="font-bold">10. Contact</p>
                <p>For questions regarding this legal notice or your data, please contact us at:<br/><br/>
                    help@honra.com<br/>
                    933 76 20 24<br/>
                </p>
            </div>
            <Footer/>
        </section>
    )
}