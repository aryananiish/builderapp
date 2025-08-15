import { RequestHandler } from "express";
import { GetCalendarResponse } from "@shared/api";
import { sampleEvents, weeklySchedule } from "./data/petData";

export const handleGetCalendar: RequestHandler = (req, res) => {
  try {
    const response: GetCalendarResponse = {
      events: sampleEvents,
      weeklySchedule: weeklySchedule,
      total: sampleEvents.length,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch calendar data",
      status: 500,
    });
  }
};
