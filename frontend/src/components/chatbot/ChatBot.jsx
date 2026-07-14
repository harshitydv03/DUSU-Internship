import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { findAnswer, GREETING, QUICK_CHIPS } from './knowledgeBase.js'

// Floating FAQ chatbot (bottom-right on every page). Answers come from the
// local knowledge base — swap askBot() for an apiClient.post('/chat') call
// to upgrade to an AI backend later.
const askBot = (question) => findAnswer(question)

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', ...GREETING }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing, open])

  const send = (text) => {
    const question = text.trim()
    if (!question || typing) return
    setMessages((m) => [...m, { from: 'user', text: question }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', ...askBot(question) }])
      setTyping(false)
    }, 550)
  }

  const showChips = messages.length === 1

  return (
    <>
      <button
        className="chatbot-fab"
        aria-label={open ? 'Close DU Assist chat' : 'Open DU Assist chat'}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name={open ? 'X' : 'MessageCircle'} size={26} />
      </button>

      {open && (
        <div className="chatbot-panel" role="dialog" aria-label="DU Assist chatbot">
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <Icon name="GraduationCap" size={20} />
            </div>
            <div>
              <strong>DU Assist</strong>
              <span>DUSU virtual helpdesk · instant answers</span>
            </div>
          </div>

          <div className="chatbot-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                <p>{m.text}</p>
                {m.links?.length > 0 && (
                  <div className="chat-links">
                    {m.links.map((l) => (
                      <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                        {l.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="chat-msg bot chat-typing" aria-label="DU Assist is typing">
                <span /><span /><span />
              </div>
            )}

            {showChips && !typing && (
              <div className="chatbot-chips">
                {QUICK_CHIPS.map((chip) => (
                  <button key={chip} onClick={() => send(chip)}>
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="chatbot-input"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              aria-label="Ask DU Assist"
            />
            <button type="submit" aria-label="Send message">
              <Icon name="Send" size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
