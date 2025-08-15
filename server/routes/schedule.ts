import { RequestHandler } from "express";
import { GetWeeklyScheduleResponse, GetSummaryResponse } from "@shared/api";
import { weeklySchedule, getPetCareSummary } from "./data/petData";

export const handleGetWeeklySchedule: RequestHandler = (req, res) => {
  try {
    const response: GetWeeklyScheduleResponse = {
      schedule: weeklySchedule
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch weekly schedule data",
      status: 500
    });
  }
};

export const handleGetSummary: RequestHandler = (req, res) => {
  try {
    const summary = getPetCareSummary();
    const response: GetSummaryResponse = {
      summary
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch summary data",
      status: 500
    });
  }
};
