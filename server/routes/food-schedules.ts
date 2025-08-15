import { RequestHandler } from "express";
import { GetFoodSchedulesResponse } from "@shared/api";
import { sampleFoodSchedules } from "./data/petData";

export const handleGetFoodSchedules: RequestHandler = (req, res) => {
  try {
    const response: GetFoodSchedulesResponse = {
      schedules: sampleFoodSchedules,
      total: sampleFoodSchedules.length
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch food schedules data",
      status: 500
    });
  }
};
