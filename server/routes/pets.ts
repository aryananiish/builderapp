import { RequestHandler } from "express";
import { GetPetsResponse } from "@shared/api";
import { samplePets } from "./data/petData";

export const handleGetPets: RequestHandler = (req, res) => {
  try {
    const response: GetPetsResponse = {
      pets: samplePets,
      total: samplePets.length,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch pets data",
      status: 500,
    });
  }
};
