import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Utensils,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2,
  PawPrint,
  Scale,
  Timer,
} from "lucide-react";
import { useFoodSchedules, usePets } from "@/hooks/usePetData";
import { FoodSchedule } from "@shared/petcare";

interface DietScheduleProps {
  className?: string;
}

export function DietSchedule({ className }: DietScheduleProps) {
  const {
    data: foodSchedulesData,
    loading: foodLoading,
    error: foodError,
  } = useFoodSchedules();
  const { data: petsData, loading: petsLoading } = usePets();

  const schedules = foodSchedulesData?.schedules || [];
  const pets = petsData?.pets || [];

  // Get pet name by ID
  const getPetName = (petId: string) => {
    const pet = pets.find((p) => p.id === petId);
    return pet?.name || "Unknown Pet";
  };

  // Get status icon and color
  const getStatusDisplay = (status: FoodSchedule["status"]) => {
    switch (status) {
      case "fed":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: "bg-success/10 text-success border-success/20",
          label: "Fed",
        };
      case "missed":
        return {
          icon: <XCircle className="h-4 w-4" />,
          color: "bg-destructive/10 text-destructive border-destructive/20",
          label: "Missed",
        };
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          color: "bg-primary/10 text-primary border-primary/20",
          label: "Pending",
        };
    }
  };

  // Get feeding type display
  const getFeedingTypeDisplay = (type: FoodSchedule["feedingType"]) => {
    const displays = {
      breakfast: {
        icon: "🌅",
        label: "Breakfast",
        color: "bg-orange-100 text-orange-800",
      },
      lunch: {
        icon: "☀️",
        label: "Lunch",
        color: "bg-yellow-100 text-yellow-800",
      },
      dinner: {
        icon: "🌙",
        label: "Dinner",
        color: "bg-blue-100 text-blue-800",
      },
      snack: {
        icon: "🍪",
        label: "Snack",
        color: "bg-purple-100 text-purple-800",
      },
      medication: {
        icon: "💊",
        label: "Medication",
        color: "bg-red-100 text-red-800",
      },
    };
    return displays[type] || displays.snack;
  };

  // Format days display
  const formatDays = (days: string[]) => {
    if (days.length === 7) return "Daily";
    if (
      days.length === 5 &&
      !days.includes("saturday") &&
      !days.includes("sunday")
    ) {
      return "Weekdays";
    }
    if (
      days.length === 2 &&
      days.includes("saturday") &&
      days.includes("sunday")
    ) {
      return "Weekends";
    }
    return days
      .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
      .join(", ");
  };

  // Handle feeding actions
  const handleMarkAsFed = (scheduleId: string) => {
    console.log(`Marking as fed: ${scheduleId}`);
    alert("Mark as fed functionality would be implemented here!");
  };

  const handleMarkAsMissed = (scheduleId: string) => {
    console.log(`Marking as missed: ${scheduleId}`);
    alert("Mark as missed functionality would be implemented here!");
  };

  const handleEditSchedule = (scheduleId: string) => {
    console.log(`Editing schedule: ${scheduleId}`);
    alert("Edit schedule functionality would be implemented here!");
  };

  // Loading state
  if (foodLoading || petsLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">
              Loading diet schedules...
            </span>
          </div>
        </Card>
      </div>
    );
  }

  // Error state
  if (foodError) {
    return (
      <div className={cn("space-y-6", className)}>
        <Card className="p-6 bg-card border-border">
          <div className="text-center py-8">
            <div className="text-destructive mb-2">
              Failed to load diet schedule data
            </div>
            <div className="text-sm text-muted-foreground">{foodError}</div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Diet Schedule Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {schedules.map((schedule) => {
          const petName = getPetName(schedule.petId);
          const statusDisplay = getStatusDisplay(schedule.status);
          const feedingTypeDisplay = getFeedingTypeDisplay(
            schedule.feedingType,
          );

          return (
            <Card
              key={schedule.id}
              className={cn(
                "p-6 bg-card border-border transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
                schedule.color,
              )}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Utensils className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {schedule.foodType}
                      </h3>
                      <p className="text-sm text-muted-foreground">{petName}</p>
                    </div>
                  </div>
                  <Badge className={cn("text-xs", statusDisplay.color)}>
                    <span className="flex items-center space-x-1">
                      {statusDisplay.icon}
                      <span>{statusDisplay.label}</span>
                    </span>
                  </Badge>
                </div>

                {/* Food Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className={cn("text-xs", feedingTypeDisplay.color)}
                    >
                      <span className="mr-1">{feedingTypeDisplay.icon}</span>
                      {feedingTypeDisplay.label}
                    </Badge>
                    {schedule.brand && (
                      <span className="text-sm text-muted-foreground">
                        {schedule.brand}
                      </span>
                    )}
                  </div>
                </div>

                {/* Schedule Details */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">
                      {schedule.scheduledTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">
                      {formatDays(schedule.days)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Scale className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{schedule.amount}</span>
                  </div>
                  {schedule.calories && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {schedule.calories} calories
                      </span>
                    </div>
                  )}
                </div>

                {/* Notes */}
                {schedule.notes && (
                  <div className="p-3 bg-accent/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                    <p className="text-sm text-foreground">{schedule.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  {schedule.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        className="flex-1 bg-success hover:bg-success/90"
                        onClick={() => handleMarkAsFed(schedule.id)}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Mark Fed
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleMarkAsMissed(schedule.id)}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Missed
                      </Button>
                    </>
                  )}
                  {(schedule.status === "fed" ||
                    schedule.status === "missed") && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEditSchedule(schedule.id)}
                    >
                      <Utensils className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {schedules.length === 0 && (
        <Card className="p-8 bg-card border-border text-center">
          <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No diet schedules found
          </h3>
          <p className="text-muted-foreground mb-4">
            Create feeding schedules to track your pets' nutrition
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            Create First Schedule
          </Button>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {schedules.filter((s) => s.status === "pending").length}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {schedules.filter((s) => s.status === "fed").length}
            </div>
            <div className="text-sm text-muted-foreground">Fed Today</div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">
              {schedules.filter((s) => s.status === "missed").length}
            </div>
            <div className="text-sm text-muted-foreground">Missed</div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-info">
              {schedules.reduce((total, s) => total + (s.calories || 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Calories</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
