import React from 'react'

const GoogleMap = () => {
    return (
        <>
            <section className="w-full h-[700px] max-w-[90%] mx-auto rounded-xl overflow-hidden shadow-lg my-10">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.1234567890123!2d115.7929967!3d-31.9806823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xafbbd7c3dd591183%3A0xe683c8a7e7212664!2sAspect%20Window%20Cleaning!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Aspect Window Cleaning Location"
                />
            </section>
        </>
    )
}

export default GoogleMap