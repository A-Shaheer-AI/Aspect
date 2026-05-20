'use client'

import Script from 'next/script'

export default function BlogTestPage() {
    return (
        <div className="">
            <div id="soro-blog">

                <Script
                    src="https://app.trysoro.com/api/embed/65ff2513-b8d9-46ab-8913-cba6381d8ef3?theme=dark"
                    strategy="afterInteractive"
                />
            </div>
        </div>
    )
}