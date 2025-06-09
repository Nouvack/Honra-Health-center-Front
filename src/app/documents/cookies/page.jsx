"use client"

import Footer from "@/app/shared_components/Footer"
import Header from "@/app/shared_components/Header"

export default function Cookies() {
    return(
        <section className="w-full min-h-screen flex flex-col">
            <Header/>
            <div className="mt-20 p-10">
                <p className="font-bold">Honra: Cookies Policy</p>
                <p className="text-xs ">Effective Date: 19/05/2025</p>
                <p className="text-xs pb-10">Last updated: 19/05/2025</p>
                <p className="font-bold">1. What are Cookies?</p>
                <p>Cookies are small text files stored on your device (computer, smartphone, tablet) when you visit a website. They help websites remember your preferences and improve your user experience.</p>
                <p className="font-bold">2. Types of Cookies We Use</p>
                <p>We may use the following types of cookies:
                    <li>Essential Cookies: Necessary for the website to function properly (e.g., to load pages or access secure areas).</li>
                    <li>Performance Cookies: Collect anonymous data about how visitors use our website, helping us improve functionality and user experience.</li>
                    <li>Functionality Cookies: Remember your preferences and choices (e.g., language settings).</li>
                    <li>Third-Party Cookies: Set by external services we use (e.g., Google Analytics) for analytics, advertising, or embedded content.</li>
                </p>
                <p className="font-bold">3. Purpose of Using Cookies</p>
                <p>We use cookies to:
                    <li>Ensure proper functioning of the website</li>
                    <li>Analyze traffic and usage behavior</li>
                    <li>Enhance user experience</li>
                    <li>Remember user preferences for future visits</li>
                </p>
                <p className="font-bold">4. Third-Party Cookies</p>
                <p>Some content or services on our website may be provided by third parties, such as:
                    <li>Google Analytics – for visitor tracking and statistics</li>
                    <li>YouTube or other embedded content – for displaying videos </li>
                    These third-party services may also place cookies on your device.
                </p>
                <p className="font-bold">5. Managing Cookies</p>
                <p>You can manage or disable cookies through your browser settings. Please note that disabling some cookies may affect the functionality of our website.</p>
                <p className="font-bold">6. Consent</p>
                <p>By continuing to use our website, you consent to the use of cookies as outlined in this policy. When required by law, we will request your explicit consent before storing non-essential cookies on your device.</p>
                <p className="font-bold">7. Changes to This Policy</p>
                <p>We may update this Cookies Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>             
            </div>
            <Footer/>
        </section>
    )
}