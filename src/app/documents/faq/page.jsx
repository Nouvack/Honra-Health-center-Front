"use client"

import Header from "@/app/shared_components/Header"
import Footer from "@/app/shared_components/Footer"

export default function Faq() {
    return(
        <section className="w-full min-h-screen flex flex-col">
            <Header/>
            <div className="mt-20 p-10">
                <p className="font-bold">Honra: Frquently Asked Questions (FAQ)</p>
                <p className="text-xs pb-10">Effective Date: 19/05/2025</p>
                <p className="font-bold">1. What services do you offer?</p>
                <p>We provide a range of medical services including general consultations, preventive care, chronic condition management, and [list specialty services, e.g., dermatology, pediatrics, internal medicine]. For a full list, please visit our Services page.</p>
                <p className="font-bold">2. Do I need an appointment?</p>
                <p>Yes, we recommend scheduling an appointment to ensure availability. In some cases, we may accept walk-ins depending on the day and provider availability.</p>
                <p className="font-bold">3. How can I make an appointment?</p>
                <p>You can schedule an appointment by:
                    <li>Calling us at 933 76 20 24</li>
                    <li>Using our online booking system [link if available]</li>
                    <li>Sending an email to [Email Address]</li>
                </p>
                <p className="font-bold">4. What insurance plans do you accept?</p>
                <p>We accept most major insurance providers. Please contact our office or check our Insurance page for a current list of accepted plans.</p>
                <p className="font-bold">5. What should I bring to my appointment?</p>
                <p>Please bring:
                    <li>A valid photo ID</li>
                    <li>Your insurance card</li>
                    <li>A list of current medications</li>
                    <li>Any relevant medical records or referrals (if applicable)</li>
                </p>
                <p className="font-bold">6. Do you offer telemedicine or virtual visits?</p>
                <p>Yes, we offer telehealth appointments for certain types of visits. Please contact us to find out if your concern can be addressed virtually.</p>
                <p className="font-bold">7. What is your cancellation policy?</p>
                <p>We kindly ask that you notify us at least 24 hours in advance if you need to cancel or reschedule your appointment. Late cancellations or no-shows may be subject to a fee.</p>
                
            </div>
            <Footer/>
        </section>
    )
}