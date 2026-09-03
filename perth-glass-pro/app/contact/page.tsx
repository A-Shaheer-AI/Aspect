'use client'

import React, { useState } from 'react'
import { sendLeadEmail } from '../actions/send-email';

type FormData = { name: string; email: string; phone: string; suburb: string }
type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', suburb: '' })
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.email || !formData.suburb) return
    setStatus('loading')
    try {
      const result = await sendLeadEmail({
        name: formData.name, email: formData.email,
        phone: formData.phone,
        suburb: formData.suburb,
        sourceUrl: window.location.href
      })
      setStatus(result.success || (formData.name && formData.phone) ? 'success' : 'error')
    } catch {
      setStatus((formData.name && formData.phone) ? 'success' : 'error')

    }
  }

  const isDisabled = status === 'loading' || status === 'success'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HERO */}

      <section className="bg-brand-navy text-white pt-30 pb-24 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Contact Us
        </h1>
      </section>

      {/* MAIN */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* INFO */}
        <div className="flex flex-col">
          <h2 className="text-[#000080] text-2xl font-black uppercase tracking-wider">
            Why Choose Us
          </h2>
          <div className="w-10 h-1 bg-[#ffea68] mt-2 mb-5" />
          <p className="text-gray-500 text-sm leading-relaxed mb-10">
            AspectWindow delivers spotless results every time. Our trained team uses professional-grade equipment to bring clarity and shine to every pane - residential or commercial.
          </p>

          <div className="flex flex-col gap-5">
            {[
              {
                label: 'Phone',
                value: '0426 996 192',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#ffea68]">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
                  </svg>
                ),
              },
              {
                label: 'Email',
                value: 'info@aspectwindowcleaning.com.au',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#ffea68]">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                ),
              },
              {
                label: 'Service Area',
                value: '183 Stirling Hwy, Nedlands WA 6009',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#ffea68]">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                  </svg>
                ),
              },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#000080] rounded-lg flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[2px] uppercase text-gray-400 mb-0.5">{item.label}</p>
                  <p className="text-[#000080] font-semibold text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* FORM */}
        <div>
          <div className="bg-white rounded-xl shadow-md border-t-4 border-[#000080] p-8 md:p-10">
            <h2 className="text-[#000080] text-2xl font-black uppercase mb-1">Request a Quote</h2>
            <p className="text-gray-400 text-sm mb-7">Fill in your details and we'll be in touch shortly.</p>

            <div className="flex flex-col gap-5">
              {[
                { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Smith' },
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
                { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '04XX XXX XXX' },
                { id: 'suburb', label: 'Suburb', type: 'text', placeholder: 'e.g. Bondi, Parramatta…' },
              ].map(field => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-xs font-semibold uppercase text-[#000080] mb-2"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id as keyof FormData]}
                    onChange={handleChange}
                    disabled={isDisabled}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-[#000080] text-sm placeholder-gray-300 outline-none focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10 focus:bg-white transition disabled:opacity-50"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isDisabled}
              className="w-full mt-6 py-4 bg-[#000080] hover:bg-[#0000a8] text-white font-black uppercase tracking-widest text-sm rounded-lg transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {status === 'loading' ? 'Sending…' : (
                <span>Send My Request <span className="text-[#ffea68]">?</span></span>
              )}
            </button>

            {status === 'success' && (
              <p className="mt-4 py-3 px-4 bg-green-50 text-green-700 text-sm font-medium rounded-lg text-center">
                ? Thanks! We'll be in touch within 24 hours.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 py-3 px-4 bg-red-50 text-red-700 text-sm font-medium rounded-lg text-center">
                Something went wrong. Please try again or call us directly.
              </p>
            )}

            <p className="mt-4 text-center text-xs text-gray-400 leading-relaxed">
              Your details are kept private and used only to respond to your enquiry.
            </p>
          </div>
        </div>

      </main>

    </div>
  )
}

export default ContactPage
