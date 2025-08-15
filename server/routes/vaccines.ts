import { RequestHandler } from "express";
import { GetVaccinesResponse } from "@shared/api";
import { sampleVaccines } from "./data/petData";

export const handleGetVaccines: RequestHandler = (req, res) => {
  try {
    const response: GetVaccinesResponse = {
      vaccines: sampleVaccines,
      total: sampleVaccines.length,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch vaccines data",
      status: 500,
    });
  }
};
