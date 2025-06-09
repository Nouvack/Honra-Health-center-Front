"use client"

export default function Contact() {
    return (
        <section id="contact" className="w-full h-max flex flex-col items-center mt-24">
            <p className="text-xl font-bold">Where Are We Located?</p>
            <div className="flex flex-wrap relative w-full h-max justify-center p-20">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.158679986238!2d-3.6945551232633336!3d40.44962477143444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4229189dbac4db%3A0x5400e56fb9abf5b1!2sIMMUNE%20Technology%20Institute!5e0!3m2!1sen!2ses!4v1747484405603!5m2!1sen!2ses" 
                    width="500" height="350" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <div className='w-130 h-85 ml-8 flex flex-col justify-end'>
                    <p className="font-bold">HONRA Health Center</p>
                    <p>P.º de la Castellana, 89, Tetuán, 28046 Madrid</p>
                    <p>help@honra.com</p>
                    <p>933 76 20 24</p>
                    <p>Monday to Friday: 12:00 - 18:00</p>
                </div>
            </div>
        </section>
    )
}