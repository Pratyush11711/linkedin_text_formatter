import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate instant client submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="bg-canvas border border-hairline rounded-xl p-8 shadow-2xs text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-ink tracking-tight mb-2">Message Sent!</h2>
        <p className="text-xs text-body leading-relaxed max-w-sm mx-auto mb-6">
          Thank you for reaching out, <strong>{formData.name || 'Friend'}</strong>. We have received your message and will reply to <code>{formData.email}</code> within 24–48 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
          }}
          className="px-4 py-2 bg-ink text-on-primary rounded-md text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-canvas border border-hairline rounded-xl p-6 shadow-2xs space-y-4">
      <h2 className="text-lg font-bold text-ink tracking-tight mb-1">Send Us a Message</h2>
      
      <div>
        <label className="block text-xs font-semibold text-ink mb-1">Your Name</label>
        <input
          type="text"
          required
          placeholder="e.g. Alex Rivera"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2.5 bg-canvas-soft border border-hairline rounded-md text-ink text-xs font-sans placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-ink mb-1">Email Address</label>
        <input
          type="email"
          required
          placeholder="alex@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2.5 bg-canvas-soft border border-hairline rounded-md text-ink text-xs font-sans placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-ink mb-1">Subject</label>
        <input
          type="text"
          required
          placeholder="Feedback, Feature Request, or Inquiry"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full p-2.5 bg-canvas-soft border border-hairline rounded-md text-ink text-xs font-sans placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-ink mb-1">Message</label>
        <textarea
          required
          rows={5}
          placeholder="Write your message here..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full p-2.5 bg-canvas-soft border border-hairline rounded-md text-ink text-xs font-sans placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-ink text-on-primary rounded-md text-xs font-bold shadow-2xs hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
      >
        {loading ? (
          <span>Sending...</span>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
};
