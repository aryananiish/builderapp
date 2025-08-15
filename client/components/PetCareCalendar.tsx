import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Syringe,
  Utensils,
  Heart,
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  Loader2,
  Zap,
} from "lucide-react";
import { Pet, Vaccine, FoodSchedule, PetCareEvent } from "@shared/petcare";
import { useWeeklySchedule, useSummary } from "@/hooks/usePetData";

interface PetCareCalendarProps {
  className?: string;
}

interface PetCareItem {
  id: string;
  petName: string;
  type: "vaccine" | "food" | "appointment";
  title: string;
  description: string;
  time: string;
  color: string;
  icon: "syringe" | "utensils" | "heart";
  status: "scheduled" | "completed" | "overdue";
  location?: string;
}

export function PetCareCalendar({ className }: PetCareCalendarProps) {
  const timeSlots = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Fetch data from API
  const {
    data: scheduleData,
    loading: scheduleLoading,
    error: scheduleError,
  } = useWeeklySchedule();
  const {
    data: summaryData,
    loading: summaryLoading,
    error: summaryError,
  } = useSummary();

  const petCareData = scheduleData?.schedule || {};
  const summary = summaryData?.summary;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "syringe":
        return <Syringe className="h-3 w-3" />;
      case "utensils":
        return <Utensils className="h-3 w-3" />;
      case "heart":
        return <Heart className="h-3 w-3" />;
      case "zap":
        return <Zap className="h-3 w-3" />;
      default:
        return <CalendarIcon className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  // Loading state
  if (scheduleLoading || summaryLoading) {
    return (
      <div className={cn("space-y-4 md:space-y-6", className)}>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">
              Loading pet care data...
            </span>
          </div>
        </Card>
      </div>
    );
  }

  // Error state
  if (scheduleError || summaryError) {
    return (
      <div className={cn("space-y-4 md:space-y-6", className)}>
        <Card className="p-6 bg-card border-border">
          <div className="text-center py-8">
            <div className="text-destructive mb-2">
              Failed to load pet care data
            </div>
            <div className="text-sm text-muted-foreground">
              {scheduleError || summaryError}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4 md:space-y-6", className)}>
      {/* Pet Care Calendar Grid */}
      <Card className="p-4 md:p-6 bg-card border-border overflow-hidden">
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
            Weekly Pet Care Schedule
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Keep track of vaccines, feeding times, and appointments
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Header */}
            <div className="grid grid-cols-8 gap-1 md:gap-2 mb-4">
              <div className="p-2 md:p-3 bg-timetable-header rounded-lg">
                <span className="text-xs md:text-sm font-medium text-foreground">
                  Time
                </span>
              </div>
              {days.map((day) => (
                <div
                  key={day}
                  className="p-2 md:p-3 bg-timetable-header rounded-lg text-center"
                >
                  <span className="text-xs md:text-sm font-medium text-foreground">
                    <span className="md:hidden">{day.substring(0, 3)}</span>
                    <span className="hidden md:inline">{day}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="space-y-2">
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-8 gap-2 min-h-[60px]">
                  {/* Time Column */}
                  <div className="p-3 bg-timetable-cell rounded-lg flex items-center">
                    <span className="text-sm text-muted-foreground font-mono">
                      {time}
                    </span>
                  </div>

                  {/* Day Columns */}
                  {days.map((day) => {
                    const dayEvents = petCareData[day] || [];
                    const eventAtTime = dayEvents.find(
                      (event) => event.time === time,
                    );

                    return (
                      <div key={`${day}-${time}`} className="relative">
                        {eventAtTime ? (
                          <div
                            className={cn(
                              "p-3 rounded-lg border h-full min-h-[60px] transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer",
                              eventAtTime.color,
                            )}
                          >
                            <div className="flex flex-col h-full">
                              <div className="flex items-center space-x-1 mb-1">
                                {getIcon(eventAtTime.icon)}
                                <h4 className="font-medium text-xs line-clamp-1">
                                  {eventAtTime.title}
                                </h4>
                              </div>
                              <p className="text-xs opacity-80 mb-1 line-clamp-1">
                                {eventAtTime.petName}
                              </p>
                              <p className="text-xs opacity-70 mb-2 line-clamp-2">
                                {eventAtTime.description}
                              </p>

                              <div className="mt-auto space-y-1">
                                {eventAtTime.location && (
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-2 w-2 opacity-60" />
                                    <span className="text-xs opacity-60 line-clamp-1">
                                      {eventAtTime.location}
                                    </span>
                                  </div>
                                )}
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-xs",
                                    getStatusColor(eventAtTime.status),
                                  )}
                                >
                                  {eventAtTime.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 bg-timetable-cell rounded-lg h-full min-h-[60px] border border-timetable-border hover:bg-accent/50 transition-colors cursor-pointer group">
                            <div className="flex items-center justify-center h-full">
                              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                Free
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Legend */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Activity Types
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Syringe className="h-4 w-4 text-red-400" />
              <span className="text-sm text-foreground font-medium">
                Vaccines
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Health & Prevention
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Utensils className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-foreground font-medium">
                Feeding
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Meals & Nutrition
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-foreground font-medium">
                Exercise
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Walking & Activity
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-green-400" />
              <span className="text-sm text-foreground font-medium">Care</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Grooming & Checkups
            </span>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Syringe className="h-5 w-5 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {summary?.upcomingVaccines || 0}
            </div>
            <div className="text-sm text-muted-foreground">Vaccines Due</div>
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Utensils className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-success">
              {summary?.dailyMeals || 0}
            </div>
            <div className="text-sm text-muted-foreground">Daily Meals</div>
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-info">
              {summary?.totalPets || 0}
            </div>
            <div className="text-sm text-muted-foreground">Active Pets</div>
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-warning">
              {summary?.upcomingEvents || 0}
            </div>
            <div className="text-sm text-muted-foreground">Upcoming Events</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
