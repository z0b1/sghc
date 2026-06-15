import Link from 'next/link';
import Icon from '@hackclub/icons';
import { HackClubBrand } from '../config/branding';

import { getEvents } from '../lib/actions';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  duration?: string;
  maxMembersPerTeam?: number;
  detailedDescription?: string;
  registrationLimit: number;
  registered: number;
}

export default async function EventsPage() {
  const dbEvents = await getEvents();
  const mockEvents: Event[] = dbEvents.map(e => ({
    id: e.id,
    name: e.title,
    date: new Date(e.date).toLocaleDateString(),
    time: e.time,
    description: e.description,
    duration: e.duration,
    maxMembersPerTeam: e.max_members_per_team,
    detailedDescription: e.detailed_description,
    location: e.location,
    registrationLimit: e.registration_limit,
    registered: e.registered_count
  }));
  return (
    <>

      <main style={{ backgroundColor: HackClubBrand.colors.background }}>
        {/* Header */}
        <section
          style={{ backgroundColor: HackClubBrand.colors.red, color: 'white' }}
          className="py-12 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Upcoming Events</h1>
            <p className="text-lg opacity-90">
              Register for our exciting hackathons, workshops, and talks
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {mockEvents.length === 0 ? (
              <div className="text-center py-12">
                <p style={{ color: HackClubBrand.colors.muted }}>
                  No events scheduled yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-6 rounded-lg transition transform hover:scale-105"
                    style={{
                      backgroundColor: HackClubBrand.colors.elevated,
                      boxShadow: HackClubBrand.shadows.card,
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className="text-xl font-bold flex-1"
                        style={{ color: HackClubBrand.colors.text }}
                      >
                        {event.name}
                      </h3>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div
                        className="text-sm flex items-center gap-2"
                        style={{ color: HackClubBrand.colors.muted }}
                      >
                        <Icon glyph="event-code" size={20} /> {event.date}
                      </div>
                      <div
                        className="text-sm flex items-center gap-2"
                        style={{ color: HackClubBrand.colors.muted }}
                      >
                        <Icon glyph="clock" size={20} /> {event.time}
                      </div>
                      <div
                        className="text-sm flex items-center gap-2"
                        style={{ color: HackClubBrand.colors.muted }}
                      >
                        <Icon glyph="pin" size={20} /> {event.location}
                      </div>
                      {event.duration && (
                        <div
                          className="text-sm flex items-center gap-2"
                          style={{ color: HackClubBrand.colors.muted }}
                        >
                          <Icon glyph="history" size={20} /> {event.duration}
                        </div>
                      )}
                      {event.maxMembersPerTeam && (
                        <div
                          className="text-sm flex items-center gap-2"
                          style={{ color: HackClubBrand.colors.muted }}
                        >
                          <Icon glyph="group" size={20} /> Max {event.maxMembersPerTeam} per team
                        </div>
                      )}
                    </div>

                    <p
                      className="mb-4 text-sm"
                      style={{ color: HackClubBrand.colors.muted }}
                    >
                      {event.description}
                    </p>

                    {event.detailedDescription && (
                      <details className="mb-4 text-sm" style={{ color: HackClubBrand.colors.text }}>
                        <summary className="cursor-pointer font-semibold mb-2" style={{ color: HackClubBrand.colors.blue }}>More Details</summary>
                        <div className="p-3 rounded whitespace-pre-wrap" style={{ backgroundColor: HackClubBrand.colors.sunken }}>
                          {event.detailedDescription}
                        </div>
                      </details>
                    )}

                    {/* Registration Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: HackClubBrand.colors.muted }}>
                          Registered
                        </span>
                        <span style={{ color: HackClubBrand.colors.red }}>
                          {event.registered}/{event.registrationLimit}
                        </span>
                      </div>
                      <div
                        className="w-full h-2 rounded-full"
                        style={{ backgroundColor: HackClubBrand.colors.sunken }}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${(event.registered / event.registrationLimit) * 100}%`,
                            backgroundColor: HackClubBrand.colors.red,
                          }}
                        />
                      </div>
                    </div>

                    <Link
                      href="/events/register"
                      className="block text-center w-full py-2 rounded-full font-bold text-white transition hover:opacity-80"
                      style={{ backgroundColor: HackClubBrand.colors.red }}
                    >
                      Register
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>


      </main>
    </>
  );
}
