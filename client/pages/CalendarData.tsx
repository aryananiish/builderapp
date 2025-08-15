import { useState, useEffect } from "react";
import { GetCalendarResponse } from "@shared/api";

export default function CalendarData() {
  const [calendarData, setCalendarData] = useState<GetCalendarResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await fetch("/api/calendar");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: GetCalendarResponse = await response.json();
        setCalendarData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch calendar data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Calendar Data</h1>
        <p>Loading calendar data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Calendar Data</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Calendar Data from /api/calendar
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Raw JSON Response:</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
          {JSON.stringify(calendarData, null, 2)}
        </pre>
      </div>

      {calendarData && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Summary:</h2>
            <p>Total Events: {calendarData.total}</p>
            <p>Events Count: {calendarData.events.length}</p>
            <p>
              Weekly Schedule Days:{" "}
              {Object.keys(calendarData.weeklySchedule).length}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Events:</h2>
            <div className="grid gap-4">
              {calendarData.events.map((event) => (
                <div key={event.id} className="border p-4 rounded-lg">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  <p className="text-sm">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm">Time: {event.time}</p>
                  <p className="text-sm">Status: {event.status}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
