import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function ModeratorDashboard() {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPendingEvents();
  }, []);

  const loadPendingEvents = async () => {
    try {
      const events = await api.getEvents({ status: 'pending', limit: 50 });
      setPendingEvents(events);
    } catch (error) {
      console.error('Error loading pending events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (eventId) => {
    try {
      await api.approveEvent(eventId);
      loadPendingEvents();
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };

  const handleReject = async (eventId) => {
    const reason = prompt('Rejection reason:');
    if (reason) {
      try {
        await api.rejectEvent(eventId, reason);
        loadPendingEvents();
      } catch (error) {
        console.error('Error rejecting event:', error);
      }
    }
  };

  if (loading) {
    return <div className="p-6 text-stone-100">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-stone-900 text-stone-100">
      <h1 className="text-3xl font-bold">Moderator Dashboard</h1>

      <div className="bg-stone-800 p-4 rounded border border-stone-700">
        <h2 className="text-xl font-semibold mb-4">Pending Events</h2>
        
        {pendingEvents.length === 0 ? (
          <p className="text-stone-400">No pending events</p>
        ) : (
          <div className="space-y-4">
            {pendingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-stone-700 p-4 rounded border border-stone-600"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{event.change_description}</div>
                    <div className="text-sm text-stone-400 mt-2">
                      Type: {event.event_type} | By: {event.user?.username || 'Unknown'}
                    </div>
                    <div className="text-xs text-stone-500 mt-1">
                      {new Date(event.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleApprove(event.id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(event.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
