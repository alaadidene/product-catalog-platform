
"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitted(false);
  }

  const emailIsValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.name.trim() || !emailIsValid) return;

    console.log("Form submitted:", formData);
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#f8f7f2] px-5 py-16 sm:px-8">

      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-sm lg:grid-cols-2">

        {/* Left information panel */}
        <div className="flex flex-col justify-between bg-[#294b3c] p-8 text-white sm:p-12">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d9a58e]">
              We'd love to hear from you
            </p>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
              Let's start a
              <span className="block text-[#d9a58e]">
                conversation.
              </span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/70">
              Have a question about our collection or need some help?
              Send us a message and we'll be happy to hear from you.
            </p>
          </div>

          <div className="mt-16 border-t border-white/20 pt-6">
            <p className="text-xs uppercase tracking-widest text-white/50">
              Maison
            </p>
            <p className="mt-2 text-sm text-white/80">
              Curated collection. Thoughtfully selected.
            </p>
          </div>

        </div>

        {/* Contact form */}
        <div className="p-8 sm:p-12">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#bd795c]">
            Contact us
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#294b3c]">
            Send a message
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#777b70]">
            Fill in your details below.
          </p>

          <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-6">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#294b3c]"
              >
                Your name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full rounded-xl border border-[#e9e6dc] bg-[#f8f7f2] px-4 py-3 text-sm text-[#294b3c] outline-none transition placeholder:text-[#aaa99f] focus:border-[#294b3c] focus:ring-2 focus:ring-[#294b3c]/10"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#294b3c]"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className="w-full rounded-xl border border-[#e9e6dc] bg-[#f8f7f2] px-4 py-3 text-sm text-[#294b3c] outline-none transition placeholder:text-[#aaa99f] focus:border-[#294b3c] focus:ring-2 focus:ring-[#294b3c]/10"
              />

              {!emailIsValid && formData.email !== "" && (
                <p className="mt-2 text-xs text-red-500">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!formData.name.trim() || !emailIsValid}
              className="mt-2 w-full rounded-full bg-[#294b3c] px-6 py-3.5 font-semibold text-white transition hover:bg-[#bd795c] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send message →
            </button>

            {/* Success message */}
            {submitted && (
              <p
                role="status"
                className="rounded-xl bg-[#edf3ed] p-4 text-sm font-medium text-[#294b3c]"
              >
                Your form has been submitted successfully!
              </p>
            )}

          </form>
        </div>

      </div>
    </main>
  );
}
