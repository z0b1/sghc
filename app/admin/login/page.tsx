'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { HackClubBrand } from '../../config/branding';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      const data = await response.json();
      // Store token in localStorage
      localStorage.setItem('adminToken', data.token);
      router.push('/admin/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>

      <main
        style={{
          backgroundColor: HackClubBrand.colors.background,
          minHeight: 'calc(100vh - 64px)',
        }}
        className="flex items-center justify-center px-4 py-12"
      >
        <div
          className="w-full max-w-md p-8 rounded-lg"
          style={{
            backgroundColor: HackClubBrand.colors.elevated,
            boxShadow: HackClubBrand.shadows.card,
          }}
        >
          <h1
            className="text-3xl font-bold mb-2 text-center"
            style={{ color: HackClubBrand.colors.text }}
          >
            Admin Dashboard
          </h1>
          <p
            className="text-center mb-6"
            style={{ color: HackClubBrand.colors.muted }}
          >
            Enter the admin password to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                style={{ color: HackClubBrand.colors.text }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 rounded-lg border transition focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: HackClubBrand.colors.background,
                  borderColor: HackClubBrand.colors.border,
                  color: HackClubBrand.colors.text,
                  outlineColor: HackClubBrand.colors.red,
                }}
              />
            </div>

            {error && (
              <div
                className="p-3 rounded-lg text-sm"
                style={{
                  backgroundColor: '#ffebee',
                  color: HackClubBrand.colors.red,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-full font-bold text-white transition disabled:opacity-50"
              style={{ backgroundColor: HackClubBrand.colors.red }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p
            className="text-center text-xs mt-6"
            style={{ color: HackClubBrand.colors.muted }}
          >
            For security: Change the default password in production!
          </p>
        </div>
      </main>
    </>
  );
}
