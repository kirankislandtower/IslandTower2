'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

export default function QuoteModal({ open, onClose }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setSubmitted(false);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-card rounded-xl shadow-2xl p-8 md:p-10"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-ring"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-normal text-foreground mb-2">Request received</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Thank you. Our team will get back to you within one business day.
                </p>
              </div>
            ) : (
              <>
                <h3 id="quote-modal-title" className="text-2xl md:text-3xl font-normal text-foreground tracking-tight mb-2">
                  Get a Quote
                </h3>
                <p className="text-muted-foreground text-sm mb-8">
                  Tell us about your project and our team will follow up shortly.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label htmlFor="quote-name" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-email" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      Email
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-company" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      Company (optional)
                    </label>
                    <input
                      id="quote-company"
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus-ring focus:border-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-details" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      Project Details
                    </label>
                    <textarea
                      id="quote-details"
                      rows={3}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm resize-none focus-ring focus:border-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full bg-accent text-on-accent font-mono uppercase tracking-widest text-sm px-6 py-4 rounded-md hover:bg-accent/90 transition-colors cursor-pointer focus-ring"
                  >
                    Submit Request
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
