import Navigation from '../components/Navigation';
import { HackClubBrand } from '../config/branding';

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  grade?: string;
}

// Mock members data - in production, fetch from Firestore
const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Club President',
    bio: 'Full-stack developer. Loves building cool projects.',
    grade: '12',
  },
  {
    id: '2',
    name: 'Sam Rodriguez',
    role: 'Vice President',
    bio: 'AI/ML enthusiast. Competitive programmer.',
    grade: '11',
  },
  {
    id: '3',
    name: 'Jordan Taylor',
    role: 'Events Lead',
    bio: 'Organized the Spring Hackathon.',
    grade: '12',
  },
  {
    id: '4',
    name: 'Casey Williams',
    role: 'Treasurer',
    bio: 'Manages sponsorships and budget.',
    grade: '11',
  },
  {
    id: '5',
    name: 'Morgan Lee',
    role: 'Member',
    bio: 'Learning web development.',
    grade: '10',
  },
  {
    id: '6',
    name: 'Taylor Kim',
    role: 'Member',
    bio: 'Game dev enthusiast.',
    grade: '9',
  },
  {
    id: '7',
    name: 'Riley Johnson',
    role: 'Member',
    bio: 'Data science explorer.',
    grade: '11',
  },
  {
    id: '8',
    name: 'Avery Brown',
    role: 'Member',
    bio: 'Mobile app developer.',
    grade: '12',
  },
];

export default function MembersPage() {
  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: HackClubBrand.colors.background }}>
        {/* Header */}
        <section
          style={{ backgroundColor: HackClubBrand.colors.blue, color: 'white' }}
          className="py-12 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Our Members</h1>
            <p className="text-lg opacity-90">
              Meet the hackers making Hack Club awesome
            </p>
          </div>
        </section>

        {/* Members Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-4 rounded-lg text-center transition transform hover:scale-105"
                  style={{
                    backgroundColor: HackClubBrand.colors.elevated,
                    boxShadow: HackClubBrand.shadows.card,
                  }}
                >
                  {/* Avatar Placeholder */}
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white"
                    style={{ backgroundColor: HackClubBrand.colors.blue }}
                  >
                    {member.name.charAt(0)}
                  </div>

                  <h3
                    className="font-bold mb-1"
                    style={{ color: HackClubBrand.colors.text }}
                  >
                    {member.name}
                  </h3>

                  <div
                    className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 text-white"
                    style={{ backgroundColor: HackClubBrand.colors.red }}
                  >
                    {member.role}
                  </div>

                  {member.grade && (
                    <div
                      className="text-xs mb-2"
                      style={{ color: HackClubBrand.colors.muted }}
                    >
                      Grade {member.grade}
                    </div>
                  )}

                  <p
                    className="text-sm"
                    style={{ color: HackClubBrand.colors.muted }}
                  >
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section
          style={{ backgroundColor: HackClubBrand.colors.sunken }}
          className="py-12 px-4"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: HackClubBrand.colors.text }}
            >
              Want to Join?
            </h2>
            <p
              className="mb-6"
              style={{ color: HackClubBrand.colors.muted }}
            >
              We're always looking for new members. No experience necessary!
            </p>
            <button
              className="px-8 py-3 rounded-full text-lg font-bold text-white transition"
              style={{ backgroundColor: HackClubBrand.colors.blue }}
            >
              Sign Up
            </button>
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
