import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

export default function NationLeaderDashboard() {
  const { user } = useAuthStore();
  const [nation, setNation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.nation_id) {
      loadNation();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadNation = async () => {
    try {
      const data = await api.getNation(user.nation_id);
      setNation(data);
    } catch (error) {
      console.error('Error loading nation:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-stone-100">Loading...</div>;
  }

  if (!user?.nation_id) {
    return (
      <div className="p-6 text-stone-100">
        <p>You are not assigned to a nation. Contact an admin to be assigned.</p>
      </div>
    );
  }

  if (!nation) {
    return <div className="p-6 text-stone-100">Nation not found</div>;
  }

  // Mock military data (would come from actual data)
  const militaryData = [
    { name: 'Knights', value: 500 },
    { name: 'Infantry', value: 2000 },
    { name: 'Archers', value: 800 },
    { name: 'Cavalry', value: 300 },
  ];

  return (
    <div className="p-6 space-y-6 bg-stone-900 text-stone-100">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{nation.name}</h1>
          {nation.short_name && (
            <p className="text-stone-400">{nation.short_name}</p>
          )}
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-stone-800 p-4 rounded border border-stone-700">
          <div className="text-stone-400 text-sm">Population</div>
          <div className="text-2xl font-bold">{nation.population?.toLocaleString() || 'N/A'}</div>
        </div>
        <div className="bg-stone-800 p-4 rounded border border-stone-700">
          <div className="text-stone-400 text-sm">Military Strength</div>
          <div className="text-2xl font-bold">{nation.military_strength?.toLocaleString() || 'N/A'}</div>
        </div>
        <div className="bg-stone-800 p-4 rounded border border-stone-700">
          <div className="text-stone-400 text-sm">Treasury</div>
          <div className="text-2xl font-bold">{nation.treasury?.toLocaleString() || '0'} gold</div>
        </div>
      </div>

      {/* Military Composition */}
      <div className="bg-stone-800 p-4 rounded border border-stone-700">
        <h2 className="text-xl font-semibold mb-4">Military Composition</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={militaryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {militaryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Nation Info */}
      <div className="bg-stone-800 p-4 rounded border border-stone-700">
        <h2 className="text-xl font-semibold mb-4">Nation Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-stone-400 text-sm">Ruler</div>
            <div className="font-semibold">{nation.current_ruler || 'N/A'}</div>
          </div>
          <div>
            <div className="text-stone-400 text-sm">Capital</div>
            <div className="font-semibold">{nation.capital_city || 'N/A'}</div>
          </div>
          <div>
            <div className="text-stone-400 text-sm">Government</div>
            <div className="font-semibold">{nation.government_type || 'N/A'}</div>
          </div>
          <div>
            <div className="text-stone-400 text-sm">Stability</div>
            <div className="font-semibold">{nation.stability || 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
