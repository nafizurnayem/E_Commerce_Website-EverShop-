'use client';

import { useState } from 'react';

export default function AdminTestPage() {
  const [testResults, setTestResults] = useState<any>({});

  const testLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@evershop.com',
          password: 'Admin@123'
        })
      });
      
      const data = await response.json();
      setTestResults(prev => ({ ...prev, login: { status: response.status, data } }));
      
      if (data.token) {
        localStorage.setItem('admin_token', data.token);
        return data.token;
      }
    } catch (error) {
      setTestResults(prev => ({ ...prev, login: { error: error.message } }));
    }
  };

  const testVerify = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      
      const data = await response.json();
      setTestResults(prev => ({ ...prev, verify: { status: response.status, data } }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, verify: { error: error.message } }));
    }
  };

  const runFullTest = async () => {
    setTestResults({});
    const token = await testLogin();
    if (token) {
      await testVerify(token);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Panel Debug Test</h1>
        
        <button
          onClick={runFullTest}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        >
          Run Full Test
        </button>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Environment Check</h2>
            <p>Current URL: {window.location.href}</p>
            <p>Token in localStorage: {localStorage.getItem('admin_token') ? 'Yes' : 'No'}</p>
          </div>

          {testResults.login && (
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-2">Login Test Result</h2>
              <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(testResults.login, null, 2)}
              </pre>
            </div>
          )}

          {testResults.verify && (
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-2">Verify Test Result</h2>
              <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(testResults.verify, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="mt-8">
          <a href="/admin/login" className="text-blue-600 hover:underline">
            Go to Admin Login
          </a>
          {' | '}
          <a href="/admin" className="text-blue-600 hover:underline">
            Go to Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}