import { Pet, Vaccine, FoodSchedule, PetCareEvent } from "./petcare";

export interface PingResponse {
  message: string;
}

export interface DemoResponse {
  message: string;
  timestamp: string;
}

// Pet Care API Interfaces
export interface GetPetsResponse {
  pets: Pet[];
  total: number;
}

export interface GetVaccinesResponse {
  vaccines: Vaccine[];
  total: number;
}

export interface GetFoodSchedulesResponse {
  schedules: FoodSchedule[];
  total: number;
}

export interface GetEventsResponse {
  events: PetCareEvent[];
  total: number;
}

export interface WeeklyScheduleItem {
  id: string;
  petName: string;
  type: "vaccine" | "food" | "appointment" | "exercise";
  title: string;
  description: string;
  time: string;
  color: string;
  icon: "syringe" | "utensils" | "heart" | "zap";
  status: "scheduled" | "completed" | "overdue";
  location?: string;
}

export interface GetWeeklyScheduleResponse {
  schedule: Record<string, WeeklyScheduleItem[]>;
}

export interface PetCareSummary {
  totalPets: number;
  upcomingVaccines: number;
  dailyMeals: number;
  upcomingEvents: number;
  weeklyExercises: number;
}

export interface GetSummaryResponse {
  summary: PetCareSummary;
}

// Error response type
export interface ApiError {
  error: string;
  message: string;
  status: number;
}
