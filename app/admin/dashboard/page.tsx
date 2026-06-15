'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { HackClubBrand } from '../../config/branding';
import { getMembers, addMember, removeMember } from '../../lib/actions';

type TabType = 'events' | 'members' | 'projects' | 'leaderboard';

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  grade?: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('events');
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  
  const [members, setMembers] = useState<Member[]>([]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState<Partial<Member>>({});

  const router = useRouter();

  useEffect(() => {
    // Check if admin token exists
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setAuthorized(true);

    // Fetch live data
    getMembers().then(data => {
      setMembers(data as Member[]);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [router]);

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.role || !newMember.bio) return;
    
    await addMember({
      name: newMember.name,
      role: newMember.role,
      bio: newMember.bio,
      grade: newMember.grade,
    });
    
    // Refresh members list
    const updated = await getMembers();
    setMembers(updated as Member[]);
    setNewMember({});
    setShowAddMember(false);
  };

  const handleRemoveMember = async (id: string) => {
    await removeMember(id);
    setMembers(members.filter(m => m.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/');
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: HackClubBrand.colors.background }}
      >
        <p style={{ color: HackClubBrand.colors.muted }}>Loading...</p>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <>

      <main style={{ backgroundColor: HackClubBrand.colors.background }}>
        {/* Dashboard Header */}
        <section
          style={{ backgroundColor: HackClubBrand.colors.red, color: 'white' }}
          className="py-6 px-4 flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full font-bold bg-white transition hover:opacity-80"
            style={{ color: HackClubBrand.colors.red }}
          >
            Logout
          </button>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b" style={{ borderBottomColor: HackClubBrand.colors.border }}>
            {(['events', 'members', 'projects', 'leaderboard'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 font-semibold capitalize transition"
                style={{
                  color: activeTab === tab ? 'white' : HackClubBrand.colors.muted,
                  backgroundColor:
                    activeTab === tab ? HackClubBrand.colors.red : 'transparent',
                  borderRadius: activeTab === tab ? HackClubBrand.radii.default : '0',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Areas */}
          {activeTab === 'events' && (
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: HackClubBrand.colors.text }}>
                Manage Events
              </h2>
              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: HackClubBrand.colors.elevated,
                  boxShadow: HackClubBrand.shadows.card,
                }}
              >
                <p style={{ color: HackClubBrand.colors.muted }} className="mb-4">
                  Coming soon: Create, edit, and delete events
                </p>
                <button
                  className="px-4 py-2 rounded-full font-bold text-white"
                  style={{ backgroundColor: HackClubBrand.colors.red }}
                >
                  + New Event
                </button>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold" style={{ color: HackClubBrand.colors.text }}>
                  Manage Members
                </h2>
                <button
                  onClick={() => setShowAddMember(!showAddMember)}
                  className="px-4 py-2 rounded-full font-bold text-white transition hover:opacity-80"
                  style={{ backgroundColor: HackClubBrand.colors.blue }}
                >
                  {showAddMember ? 'Cancel' : '+ Add Member'}
                </button>
              </div>

              {showAddMember && (
                <div className="mb-6 p-6 rounded-lg border" style={{ borderColor: HackClubBrand.colors.border, backgroundColor: HackClubBrand.colors.elevated }}>
                  <h3 className="text-xl font-bold mb-4" style={{ color: HackClubBrand.colors.text }}>Add New Member</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Name"
                        className="p-2 border rounded"
                        style={{
                          borderColor: HackClubBrand.colors.border,
                          backgroundColor: HackClubBrand.colors.elevated,
                          color: HackClubBrand.colors.text,
                        }}
                        value={newMember.name || ''}
                        onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Role (e.g. Member)"
                        className="p-2 border rounded"
                        style={{
                          borderColor: HackClubBrand.colors.border,
                          backgroundColor: HackClubBrand.colors.elevated,
                          color: HackClubBrand.colors.text,
                        }}
                        value={newMember.role || ''}
                        onChange={e => setNewMember({ ...newMember, role: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Grade (optional)"
                        className="p-2 border rounded"
                        style={{
                          borderColor: HackClubBrand.colors.border,
                          backgroundColor: HackClubBrand.colors.elevated,
                          color: HackClubBrand.colors.text,
                        }}
                        value={newMember.grade || ''}
                        onChange={e => setNewMember({ ...newMember, grade: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Bio"
                        className="p-2 border rounded md:col-span-2"
                        style={{
                          borderColor: HackClubBrand.colors.border,
                          backgroundColor: HackClubBrand.colors.elevated,
                          color: HackClubBrand.colors.text,
                        }}
                        value={newMember.bio || ''}
                        onChange={e => setNewMember({ ...newMember, bio: e.target.value })}
                      />
                  </div>
                  <button
                    onClick={handleAddMember}
                    className="px-4 py-2 rounded font-bold text-white transition hover:opacity-80"
                    style={{ backgroundColor: HackClubBrand.colors.green }}
                  >
                    Save Member
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {members.map(member => (
                  <div
                    key={member.id}
                    className="flex justify-between items-center p-4 rounded-lg"
                    style={{
                      backgroundColor: HackClubBrand.colors.elevated,
                      boxShadow: HackClubBrand.shadows.small
                    }}
                  >
                    <div>
                      <h4 className="font-bold text-lg" style={{ color: HackClubBrand.colors.text }}>
                        {member.name}
                        <span
                          className="text-xs font-bold px-2 py-1 rounded-full text-white ml-2 align-middle"
                          style={{ backgroundColor: HackClubBrand.colors.blue }}
                        >
                          {member.role}
                        </span>
                      </h4>
                      <p className="text-sm mt-1" style={{ color: HackClubBrand.colors.muted }}>
                        {member.bio} {member.grade && `• Grade ${member.grade}`}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="px-3 py-1 rounded text-white font-semibold text-sm transition hover:opacity-80"
                      style={{ backgroundColor: HackClubBrand.colors.red }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {members.length === 0 && (
                  <p style={{ color: HackClubBrand.colors.muted }}>No members found.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: HackClubBrand.colors.text }}>
                Manage Projects
              </h2>
              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: HackClubBrand.colors.elevated,
                  boxShadow: HackClubBrand.shadows.card,
                }}
              >
                <p style={{ color: HackClubBrand.colors.muted }} className="mb-4">
                  Coming soon: Add and showcase member projects
                </p>
                <button
                  className="px-4 py-2 rounded-full font-bold text-white"
                  style={{ backgroundColor: HackClubBrand.colors.green }}
                >
                  + Add Project
                </button>
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: HackClubBrand.colors.text }}>
                Live Leaderboard
              </h2>
              <div
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: HackClubBrand.colors.elevated,
                  boxShadow: HackClubBrand.shadows.card,
                }}
              >
                <p style={{ color: HackClubBrand.colors.muted }} className="mb-4">
                  Coming soon: Update and manage live leaderboard scores
                </p>
                <button
                  className="px-4 py-2 rounded-full font-bold text-white"
                  style={{ backgroundColor: HackClubBrand.colors.orange }}
                >
                  Update Leaderboard
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
