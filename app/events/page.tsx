import Navigation from '../components/Navigation';
import Link from 'next/link';
import { HackClubBrand } from '../config/branding';
import Icon from '@hackclub/icons';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
  location: string;
  registrationLimit: number;
  registered: number;
}

// Mock events data - in production, fetch from Firestore
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Spring Hackathon 2026',
    date: 'March 15, 2026',
    time: '9:00 AM - 5:00 PM',
    description: 'A 8-hour hackathon where you build amazing projects and compete for prizes.',
    location: 'School Auditorium',
    registrationLimit: 50,
    registered: 32,
  },
  {
    id: '2',
    name: 'Web Dev Workshop',
    date: 'March 22, 2026',
    time: '3:30 PM - 5:00 PM',
    description: 'Learn the basics of modern web development with React and Next.js.',
    location: 'Computer Lab Room 101',
    registrationLimit: 30,
    registered: 18,
  },
  {
    id: '3',
    name: 'AI/ML Talk & Demo',
    date: 'April 5, 2026',
    time: '4:00 PM - 5:30 PM',
    description: 'Guest speaker from tech industry talks about AI and shows live demos.',
    location: 'Main Cafeteria',
    registrationLimit: 100,
    registered: 42,
  },
];

export default function EventsPage() {
  return (
    <>
      <Navigation />
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
                    </div>

                    <p
                      className="mb-4 text-sm"
                      style={{ color: HackClubBrand.colors.muted }}
                    >
                      {event.description}
                    </p>

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

                    <button
                      className="w-full py-2 rounded-full font-bold text-white transition"
                      style={{ backgroundColor: HackClubBrand.colors.red }}
                    >
                      Register
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: HackClubBrand.colors.text,
            color: 'white',
          }}
          className="py-8 px-4 text-center"
        >
          <p>© 2026 Hack Club</p>
        </footer>
      </main>
    </>
  );
}
