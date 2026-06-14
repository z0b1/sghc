import Navigation from '../components/Navigation';
import { HackClubBrand } from '../config/branding';

interface Project {
  id: string;
  title: string;
  description: string;
  members: string[];
  technologies: string[];
  link?: string;
}

// Mock projects data - in production, fetch from Firestore
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Study Buddy',
    description: 'AI-powered study companion that helps students prepare for exams.',
    members: ['Alex Chen', 'Morgan Lee'],
    technologies: ['React', 'OpenAI API', 'Tailwind CSS'],
    link: 'https://github.com',
  },
  {
    id: '2',
    title: 'Campus Map App',
    description: 'Interactive mobile app to navigate the school campus and find classrooms.',
    members: ['Sam Rodriguez', 'Avery Brown'],
    technologies: ['React Native', 'Google Maps API', 'TypeScript'],
    link: 'https://github.com',
  },
  {
    id: '3',
    title: 'Code Share Platform',
    description: 'Real-time collaborative code editor for pair programming.',
    members: ['Jordan Taylor', 'Riley Johnson', 'Casey Williams'],
    technologies: ['Next.js', 'Socket.io', 'MongoDB', 'Monaco Editor'],
    link: 'https://github.com',
  },
  {
    id: '4',
    title: 'Game: Pixel Adventure',
    description: 'Fun 2D platformer game built from scratch.',
    members: ['Taylor Kim'],
    technologies: ['Phaser.js', 'JavaScript', 'Canvas API'],
    link: 'https://github.com',
  },
  {
    id: '5',
    title: 'Finance Tracker',
    description: 'Personal finance app with budget tracking and analytics.',
    members: ['Morgan Lee', 'Alex Chen'],
    technologies: ['React', 'Firebase', 'Chart.js'],
    link: 'https://github.com',
  },
  {
    id: '6',
    title: 'Weather Dashboard',
    description: 'Beautiful weather app with forecasts and alerts.',
    members: ['Riley Johnson'],
    technologies: ['Vue.js', 'OpenWeather API', 'CSS'],
    link: 'https://github.com',
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main style={{ backgroundColor: HackClubBrand.colors.background }}>
        {/* Header */}
        <section
          style={{ backgroundColor: HackClubBrand.colors.green, color: 'white' }}
          className="py-12 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Member Projects</h1>
            <p className="text-lg opacity-90">
              Showcase of amazing projects built by our members
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {mockProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 rounded-lg transition transform hover:scale-105"
                  style={{
                    backgroundColor: HackClubBrand.colors.elevated,
                    boxShadow: HackClubBrand.shadows.card,
                  }}
                >
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: HackClubBrand.colors.text }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="mb-4"
                    style={{ color: HackClubBrand.colors.muted }}
                  >
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div
                      className="text-xs font-semibold mb-2 uppercase"
                      style={{ color: HackClubBrand.colors.muted }}
                    >
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{ backgroundColor: HackClubBrand.colors.blue }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Members */}
                  <div className="mb-4">
                    <div
                      className="text-xs font-semibold mb-2 uppercase"
                      style={{ color: HackClubBrand.colors.muted }}
                    >
                      Team
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: HackClubBrand.colors.text }}
                    >
                      {project.members.join(', ')}
                    </p>
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 rounded-full font-bold text-white transition"
                      style={{ backgroundColor: HackClubBrand.colors.green }}
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Submit Project CTA */}
        <section
          style={{ backgroundColor: HackClubBrand.colors.sunken }}
          className="py-12 px-4"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: HackClubBrand.colors.text }}
            >
              Built Something Cool?
            </h2>
            <p
              className="mb-6"
              style={{ color: HackClubBrand.colors.muted }}
            >
              We'd love to showcase your projects! Contact us to submit.
            </p>
            <button
              className="px-8 py-3 rounded-full text-lg font-bold text-white transition"
              style={{ backgroundColor: HackClubBrand.colors.green }}
            >
              Submit Project
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
