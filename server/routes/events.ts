import { RequestHandler } from "express";
import { GetEventsResponse } from "@shared/api";
import { sampleEvents } from "./data/petData";

export const handleGetEvents: RequestHandler = (req, res) => {
  try {
    const response: GetEventsResponse = {
      events: sampleEvents,
      total: sampleEvents.length
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch events data",
      status: 500
    });
  }
};
