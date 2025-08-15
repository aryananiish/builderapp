import { useState, useEffect } from "react";
import {
  GetPetsResponse,
  GetVaccinesResponse,
  GetFoodSchedulesResponse,
  GetEventsResponse,
  GetWeeklyScheduleResponse,
  GetSummaryResponse,
  ApiError,
} from "@shared/api";

interface UseApiDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useApiData<T>(url: string): UseApiDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

// Specific hooks for each endpoint
export function usePets() {
  return useApiData<GetPetsResponse>("/api/pets");
}

export function useVaccines() {
  return useApiData<GetVaccinesResponse>("/api/vaccines");
}

export function useFoodSchedules() {
  return useApiData<GetFoodSchedulesResponse>("/api/food-schedules");
}

export function useEvents() {
  return useApiData<GetEventsResponse>("/api/events");
}

export function useWeeklySchedule() {
  return useApiData<GetWeeklyScheduleResponse>("/api/weekly-schedule");
}

export function useSummary() {
  return useApiData<GetSummaryResponse>("/api/summary");
}

// Combined hook for all pet data
export function useAllPetData() {
  const pets = usePets();
  const vaccines = useVaccines();
  const foodSchedules = useFoodSchedules();
  const events = useEvents();
  const weeklySchedule = useWeeklySchedule();
  const summary = useSummary();

  const loading =
    pets.loading ||
    vaccines.loading ||
    foodSchedules.loading ||
    events.loading ||
    weeklySchedule.loading ||
    summary.loading;

  const error =
    pets.error ||
    vaccines.error ||
    foodSchedules.error ||
    events.error ||
    weeklySchedule.error ||
    summary.error;

  const refetchAll = () => {
    pets.refetch();
    vaccines.refetch();
    foodSchedules.refetch();
    events.refetch();
    weeklySchedule.refetch();
    summary.refetch();
  };

  return {
    pets: pets.data,
    vaccines: vaccines.data,
    foodSchedules: foodSchedules.data,
    events: events.data,
    weeklySchedule: weeklySchedule.data,
    summary: summary.data,
    loading,
    error,
    refetch: refetchAll,
  };
}
