import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer
} from 'recharts';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Load various stats
      const [users, events, nations] = await Promise.all([
        api.getUsers(),
        api.getEvents({ limit: 1000 }),
        api.getNations(),
      ]);

      // Calculate statistics
      const userStats = {
        total: users.length,
        byRole: users.reduce((acc, u) => {
          acc[u.role] = (acc[u.role] || 0) + 1;
          return acc;
        }, {}),
        active: users.filter(u => u.status === 'active').length,
        pending: users.filter(u => u.status === 'pending').length,
      };

      const eventStats = {
        total: events.length,
        byStatus: events.reduce((acc, e) => {
          acc[e.status] = (acc[e.status] || 0) + 1;
          return acc;
        }, {}),
        byType: events.reduce((acc, e) => {
          acc[e.event_type] = (acc[e.event_type] || 0) + 1;
          return acc;
        }, {}),
      };

      setStats({
        users: userStats,
        events: eventStats,
        nations: nations.length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-stone-100">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="p-6 text-stone-100">Error loading statistics</div>;
  }

  const userRoleData = Object.entries(stats.users.byRole).map(([role, count]) => ({
    name: role,
    value: count,
  }));

  const eventStatusData = Object.entries(stats.events.byStatus).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  return (
    <div className="p-6 space-y-6 bg-stone-900 text-stone-100">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-stone-800 p-4 rounded border border-stone-700">
          <div className="text-stone-400 text-sm">Total Users</div>
          <div className="text-2xl font-bold">{stats.users.total}</div>
        </div>
        <div className="bg-stone-800 p-4 rounded border border-stone-700">
          <div className="text-stone-400 text-sm">Active Users</div>
          <div className="text-2xl font-bold">{stats.users.active}</div>
        </div>
        <div className="bg-stone-800 p-4 rounded border border-stone-700">
          <div className="text-stone-400 text-sm">Total Events</div>
          <div className="text-2xl font-bold">{stats.events.total}</div>
        </div>
        <div className="bg-stone-800 p-4 rounded border border-stone-700">
          <div className="text-stone-400 text-sm">Nations</div>
          <div className="text-2xl font-bold">{stats.nations}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Roles Pie Chart */}
        <div className="bg-stone-800 p-4 rounded border border-stone-700">
          <h2 className="text-xl font-semibold mb-4">Users by Role</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userRoleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {userRoleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Event Status Pie Chart */}
        <div className="bg-stone-800 p-4 rounded border border-stone-700">
          <h2 className="text-xl font-semibold mb-4">Events by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={eventStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {eventStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
