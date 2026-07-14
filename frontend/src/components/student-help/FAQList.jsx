import { useState } from 'react'

export default function FAQList({ faqs }) {
  const [open, setOpen] = useState(0)

  return (
    <div>
      {faqs.map((f, i) => (
        <div className="faq-item" key={f.q}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
            <span>{f.q}</span>
            <span>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <div className="faq-a">{f.a}</div>}
        </div>
      ))}
    </div>
  )
}
