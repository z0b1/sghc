// Navigation removed, using layout Nav
import { HackClubBrand } from '../config/branding';
import Link from "next/link";
import { getMembers } from "../lib/actions";

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  grade?: string;
}

export default async function MembersPage() {
  const dbMembers = await getMembers();
  const mockMembers: Member[] = dbMembers.map(m => ({
    id: m.id,
    name: m.name,
    role: m.role,
    bio: m.bio,
    grade: m.grade || undefined
  }));


  return (
    <>

      <main style={{ backgroundColor: HackClubBrand.colors.background }}>
        {/* Header */}
        

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
            <Link href="/members/questionnaire" className="inline-block px-8 py-3 rounded-full text-lg font-bold text-white transition cursor-pointer" style={{ backgroundColor: HackClubBrand.colors.blue, color: "#ffffff" }}>
                Sign Up
              </Link>
          </div>
        </section>


      </main>
    </>
  );
}
