export interface Pet {
  id: string;
  name: string;
  type:
    | "dog"
    | "cat"
    | "bird"
    | "rabbit"
    | "hamster"
    | "fish"
    | "reptile"
    | "other";
  breed?: string;
  age: number;
  weight?: number; // in kg
  avatar?: string;
  notes?: string;
}

export interface Vaccine {
  id: string;
  petId: string;
  name: string;
  type: "core" | "non-core" | "booster";
  description?: string;
  scheduledDate: string; // ISO date string
  administeredDate?: string; // ISO date string
  nextDueDate?: string; // ISO date string
  veterinarian?: string;
  location?: string;
  status: "scheduled" | "completed" | "overdue" | "cancelled";
  color: string;
  notes?: string;
}

export interface FoodSchedule {
  id: string;
  petId: string;
  foodType: string;
  brand?: string;
  amount: string; // e.g., "1 cup", "100g"
  scheduledTime: string; // Time in HH:MM format
  days: (
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"
  )[];
  feedingType: "breakfast" | "lunch" | "dinner" | "snack" | "medication";
  calories?: number;
  status: "pending" | "fed" | "missed";
  color: string;
  notes?: string;
}

export interface PetCareEvent {
  id: string;
  petId: string;
  type:
    | "vaccine"
    | "food"
    | "vet-visit"
    | "grooming"
    | "medication"
    | "exercise";
  title: string;
  description?: string;
  date: string; // ISO date string
  time?: string; // Time in HH:MM format
  duration?: number; // in minutes
  status: "scheduled" | "completed" | "cancelled";
  color: string;
  reminders?: {
    type: "notification" | "email";
    minutesBefore: number;
  }[];
}

export interface VaccineType {
  name: string;
  description: string;
  requiredFor: Pet["type"][];
  frequency:
    | "annual"
    | "biannual"
    | "triennial"
    | "puppy-series"
    | "kitten-series"
    | "one-time";
  ageRange?: {
    min: number; // in months
    max?: number; // in months
  };
}

export const COMMON_VACCINES: VaccineType[] = [
  {
    name: "Rabies",
    description: "Protects against rabies virus",
    requiredFor: ["dog", "cat"],
    frequency: "annual",
  },
  {
    name: "DHPP (Dogs)",
    description: "Distemper, Hepatitis, Parvovirus, Parainfluenza",
    requiredFor: ["dog"],
    frequency: "annual",
  },
  {
    name: "FVRCP (Cats)",
    description: "Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia",
    requiredFor: ["cat"],
    frequency: "annual",
  },
  {
    name: "Bordetella",
    description: "Kennel cough prevention",
    requiredFor: ["dog"],
    frequency: "annual",
  },
  {
    name: "Lyme Disease",
    description: "Tick-borne disease prevention",
    requiredFor: ["dog"],
    frequency: "annual",
  },
];

export const FOOD_SCHEDULE_PRESETS = {
  dog: {
    puppy: ["breakfast", "lunch", "dinner", "snack"],
    adult: ["breakfast", "dinner"],
    senior: ["breakfast", "dinner"],
  },
  cat: {
    kitten: ["breakfast", "lunch", "dinner", "snack"],
    adult: ["breakfast", "dinner"],
    senior: ["breakfast", "dinner"],
  },
};
