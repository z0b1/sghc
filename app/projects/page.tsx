
import { HackClubBrand } from '../config/branding';
import { getProjects } from '../lib/actions';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  devs: string;
  technologies: string[];
  link?: string;
  live_demo_url?: string;
  image_url?: string;
}

export default async function ProjectsPage() {
  const dbProjects = await getProjects();
  const mockProjects: Project[] = dbProjects.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    devs: p.devs || 'Unknown',
    technologies: p.tech_stack || [],
    link: p.repo_url || undefined,
    live_demo_url: p.live_demo_url || undefined,
    image_url: p.image_url || undefined,
  }));
  return (
    <>

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
                  {project.image_url && (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full rounded-md mb-4"
                      style={{ objectFit: 'contain' }}
                    />
                  )}
                  <h3 className="text-2xl font-bold mb-2" style={{ color: HackClubBrand.colors.text }}>
                    <a href={project.live_demo_url || project.link} target="_blank" rel="noopener noreferrer" className="text-2xl font-bold mb-2" style={{ color: HackClubBrand.colors.text }}>
                      {project.title}
                    </a>
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
                      {project.devs}
                    </p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {project.live_demo_url && (
                      <a
                        href={project.live_demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 rounded-full font-bold text-white transition"
                        style={{ backgroundColor: HackClubBrand.colors.blue }}
                      >
                        Live Demo
                      </a>
                    )}
                    {project.link && (!project.live_demo_url) && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 rounded-full font-bold text-white transition"
                        style={{ backgroundColor: HackClubBrand.colors.green }}
                      >
                        GitHub Repo
                      </a>
                    )}
                  </div>
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
