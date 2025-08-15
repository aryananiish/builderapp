import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleGetPets } from "./routes/pets";
import { handleGetVaccines } from "./routes/vaccines";
import { handleGetFoodSchedules } from "./routes/food-schedules";
import { handleGetEvents } from "./routes/events";
import { handleGetWeeklySchedule, handleGetSummary } from "./routes/schedule";
import { handleGetCalendar } from "./routes/calendar";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Pet Care API routes
  app.get("/api/pets", handleGetPets);
  app.get("/api/vaccines", handleGetVaccines);
  app.get("/api/food-schedules", handleGetFoodSchedules);
  app.get("/api/events", handleGetEvents);
  app.get("/api/weekly-schedule", handleGetWeeklySchedule);
  app.get("/api/summary", handleGetSummary);
  app.get("/api/calendar", handleGetCalendar);

  return app;
}
