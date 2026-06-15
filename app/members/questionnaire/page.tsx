"use client";

import { HackClubBrand } from "../../config/branding";

import { useState } from "react";

export default function QuestionnairePage() {
  const [form, setForm] = useState({ name: "", email: "", studentClass: "", studentYear: "", interests: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("✅ Sent! Thank you.");
        setForm({ name: "", email: "", interests: "" });
      } else {
        const err = await res.text();
        setStatus(`❌ Error: ${err}`);
      }
    } catch (err) {
      setStatus(`❌ Unexpected error`);
    }
  };

  return (
    <>

      <main style={{ backgroundColor: HackClubBrand.colors.background }} className="flex items-center justify-center min-h-screen p-4">
                  <section className="max-w-lg w-full rounded-lg shadow-lg p-6" style={{ backgroundColor: HackClubBrand.colors.elevated }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: HackClubBrand.colors.text }}>
            Membership Questionnaire
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
              style={{ backgroundColor: HackClubBrand.colors.elevated, borderColor: HackClubBrand.colors.muted, color: HackClubBrand.colors.text }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
              style={{ backgroundColor: HackClubBrand.colors.elevated, borderColor: HackClubBrand.colors.muted, color: HackClubBrand.colors.text }}
            />
            <div className="flex gap-4">
              <select
                name="studentClass"
                value={form.studentClass}
                onChange={handleChange}
                required
                className="w-1/2 px-3 py-2 border rounded"
                style={{ backgroundColor: HackClubBrand.colors.elevated, borderColor: HackClubBrand.colors.muted, color: HackClubBrand.colors.text }}
              >
                <option value="" disabled>Select Class</option>
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                  <option key={num} value={num.toString()}>Class {num}</option>
                ))}
              </select>
              <select
                name="studentYear"
                value={form.studentYear}
                onChange={handleChange}
                required
                className="w-1/2 px-3 py-2 border rounded"
                style={{ backgroundColor: HackClubBrand.colors.elevated, borderColor: HackClubBrand.colors.muted, color: HackClubBrand.colors.text }}
              >
                <option value="" disabled>Select Year</option>
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num.toString()}>Year {num}</option>
                ))}
              </select>
            </div>
            <textarea
              name="interests"
              placeholder="Why do you want to join?"
              value={form.interests}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border rounded"
              style={{ backgroundColor: HackClubBrand.colors.elevated, borderColor: HackClubBrand.colors.muted, color: HackClubBrand.colors.text }}
            />
            <button
                  type="submit"
                  className="w-full py-2 rounded hover:opacity-80 transition font-bold text-lg cursor-pointer"
                  style={{ backgroundColor: HackClubBrand.colors.blue, color: "#ffffff" }}
                >
              Submit
            </button>
          </form>
          {status && (
  <p
    className="mt-4 text-center font-bold"
    style={{
      color: status.includes('✅') ? HackClubBrand.colors.green : HackClubBrand.colors.red,
    }}
  >
    {status}
  </p>
)}
        </section>
      </main>
    </>
  );
}
