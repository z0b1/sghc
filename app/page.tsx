import Link from 'next/link';
import { HackClubBrand } from './config/branding';
import Icon from '@hackclub/icons';

export default function Home() {
  return (
    <>

      <main style={{ backgroundColor: HackClubBrand.colors.background }}>
        {/* Hero Section */}
        <section
          style={{
            backgroundImage: `linear-gradient(135deg, ${HackClubBrand.colors.red} 0%, ${HackClubBrand.colors.blue} 100%)`,
            color: 'white',
          }}
          className="relative py-20 px-4 sm:py-32 overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 md:-translate-y-8">
            <img src="/flag-orpheus-top.png" alt="Orpheus Top" className="w-48 md:w-64 drop-shadow-lg" />
          </div>
          <div className="max-w-4xl mx-auto text-center mt-16 md:mt-20">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">
              Welcome to Hack Club
            </h1>
            <p className="text-lg sm:text-xl mb-8 opacity-90">
              Join your school's hacking community. Build projects, compete in hackathons, and level up your coding skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events"
                className="px-8 py-3 rounded-full text-lg font-bold transition transform hover:scale-105"
                style={{ backgroundColor: 'white', color: HackClubBrand.colors.red }}
              >
                Explore Events
              </Link>
              <Link
                href="/members"
                className="px-8 py-3 rounded-full text-lg font-bold transition transform hover:scale-105"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '2px solid white',
                }}
              >
                Meet Members
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 relative overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8">
            <div className="hidden md:block w-48 flex-shrink-0 relative h-64">
              <img src="/flag-orpheus-left.png" alt="Orpheus Left" className="absolute -left-12 -top-12 w-64 max-w-none drop-shadow-md" />
            </div>
            <div className="flex-grow">
              <h2
                className="text-3xl sm:text-4xl font-bold text-center md:text-left mb-12"
                style={{ color: HackClubBrand.colors.text }}
              >
                What We Do
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Hackathons',
                    description: 'Compete in timed coding challenges and build amazing projects.',
                    color: HackClubBrand.colors.red,
                    icon: 'code'
                  },
                  {
                    title: 'Learning',
                    description: 'Workshops and resources to help you learn new tech skills.',
                    color: HackClubBrand.colors.blue,
                    icon: 'explore'
                  },
                  {
                    title: 'Community',
                    description: 'Connect with fellow hackers and collaborate on projects.',
                    color: HackClubBrand.colors.green,
                    icon: 'welcome'
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-lg flex flex-col items-start"
                    style={{
                      backgroundColor: HackClubBrand.colors.elevated,
                      borderTop: `4px solid ${feature.color}`,
                    }}
                  >
                    <div style={{ color: feature.color }} className="mb-4">
                      <Icon glyph={feature.icon as any} size={32} />
                    </div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: feature.color }}
                    >
                      {feature.title}
                    </h3>
                    <p style={{ color: HackClubBrand.colors.muted }}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            backgroundColor: HackClubBrand.colors.sunken,
          }}
          className="py-12 px-4"
        >
          <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center text-center md:text-left gap-8">
            <img src="/icon-rounded.png" alt="Hack Club Icon" className="w-32 h-32 rounded-3xl drop-shadow-md" />
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ color: HackClubBrand.colors.text }}
              >
                Ready to Join?
              </h2>
              <p
                className="mb-6"
                style={{ color: HackClubBrand.colors.muted }}
              >
                Check out upcoming events and register today. No experience necessary!
              </p>
              <Link
                href="/events"
                className="inline-block px-8 py-3 rounded-full text-lg font-bold transition transform hover:scale-105"
                style={{
                  backgroundColor: HackClubBrand.colors.red,
                  color: 'white',
                }}
              >
                See All Events
              </Link>
            </div>
          </div>
        </section>


      </main>
    </>
  );
}
