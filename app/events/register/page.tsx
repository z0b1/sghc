"use client";

import { HackClubBrand } from "../../config/branding";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getEvents } from "../../lib/actions";

export default function EventRegisterPage() {
  const [form, setForm] = useState({
    teamName: "",
    teamLeader: "",
    numMembers: "",
    eventName: "",
  });
  const [availableEvents, setAvailableEvents] = useState<any[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    getEvents()
      .then((events) => setAvailableEvents(events))
      .catch((err) => console.error("Failed to load events", err));
  }, []);

  const selectedEvent = availableEvents.find(e => e.title === form.eventName);
  const maxMembers = selectedEvent?.max_members_per_team || 10;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Registering...");
    
    try {
      const res = await fetch("/api/event-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Successfully registered!");
        setForm({
          teamName: "",
          teamLeader: "",
          numMembers: "",
          eventName: "",
        });
      } else {
        const err = await res.text();
        setStatus(`❌ Error: ${err}`);
      }
    } catch (err) {
      setStatus("❌ Unexpected error occurred.");
    }
  };

  return (
    <>
      <main
        style={{ backgroundColor: HackClubBrand.colors.background }}
        className="flex items-center justify-center min-h-screen p-4"
      >
        <section
          className="max-w-lg w-full rounded-lg shadow-lg p-6 relative"
          style={{ backgroundColor: HackClubBrand.colors.elevated }}
        >
          <Link
            href="/events"
            className="absolute top-4 right-4 text-sm font-semibold hover:opacity-80"
            style={{ color: HackClubBrand.colors.blue }}
          >
            ← Back to Events
          </Link>
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: HackClubBrand.colors.text }}
          >
            Register for Event
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="eventName"
              value={form.eventName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
              style={{
                backgroundColor: HackClubBrand.colors.elevated,
                borderColor: HackClubBrand.colors.muted,
                color: HackClubBrand.colors.text,
              }}
            >
              <option value="" disabled>
                Select Event
              </option>
              {availableEvents.map((ev) => (
                <option key={ev.id} value={ev.title}>
                  {ev.title}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="teamName"
              placeholder="Team Name"
              value={form.teamName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
              style={{
                backgroundColor: HackClubBrand.colors.elevated,
                borderColor: HackClubBrand.colors.muted,
                color: HackClubBrand.colors.text,
              }}
            />

            <input
              type="text"
              name="teamLeader"
              placeholder="Team Leader Name"
              value={form.teamLeader}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
              style={{
                backgroundColor: HackClubBrand.colors.elevated,
                borderColor: HackClubBrand.colors.muted,
                color: HackClubBrand.colors.text,
              }}
            />

            <input
              type="number"
              name="numMembers"
              placeholder="Number of Team Members"
              min="1"
              max={maxMembers}
              value={form.numMembers}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
              style={{
                backgroundColor: HackClubBrand.colors.elevated,
                borderColor: HackClubBrand.colors.muted,
                color: HackClubBrand.colors.text,
              }}
            />

            <button
              type="submit"
              className="w-full py-2 rounded hover:opacity-80 transition font-bold text-lg cursor-pointer mt-4"
              style={{
                backgroundColor: HackClubBrand.colors.red,
                color: "#ffffff",
              }}
            >
              Register Team
            </button>
          </form>
          {status && (
            <p
              className="mt-4 text-center font-bold"
              style={{
                color: status.includes("✅")
                  ? HackClubBrand.colors.green
                  : HackClubBrand.colors.text,
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
