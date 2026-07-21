"use client";

import { useState, type FormEvent } from "react";

const ACCESS_KEY = "829ea2ff-1b94-4aa0-b397-dcf62c342904";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setResult("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setResult("Success! Your message has been sent.");
        form.reset();
        setName("");
        setEmail("");
        setMessage("");
      } else {
        console.error("Web3Forms submit failed", response.status, response.statusText, data);
        setResult(`Error: ${data.message || "Unable to send message."}`);
      }
    } catch (error) {
      console.error("Web3Forms request error", error);
      setResult(
        error instanceof Error
          ? `Something went wrong: ${error.message}`
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-[40px] font-bold leading-tight tracking-tight text-ink md:text-[48px]">
        Contact
      </h1>
      <p className="mt-2 text-[24px] text-mute">Got a project? Let's talk.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-ink">Name</label>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">
            Email <span className="text-mute text-xs">(optional)</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
            placeholder="Your email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink">Message</label>
          <textarea
            name="message"
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-2 h-40 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
            placeholder="Write your message here."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send message"}
        </button>

        {result ? (
          <p className="text-sm font-medium text-ink/85">{result}</p>
        ) : null}
      </form>
    </div>
  );
}
