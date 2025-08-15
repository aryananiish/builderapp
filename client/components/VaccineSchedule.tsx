import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Syringe,
  Calendar,
  MapPin,
  Clock,
  User,
  Phone,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useVaccines, usePets } from "@/hooks/usePetData";
import { Vaccine } from "@shared/petcare";

interface VaccineScheduleProps {
  className?: string;
}

export function VaccineSchedule({ className }: VaccineScheduleProps) {
  const {
    data: vaccinesData,
    loading: vaccinesLoading,
    error: vaccinesError,
  } = useVaccines();
  const { data: petsData, loading: petsLoading } = usePets();

  const vaccines = vaccinesData?.vaccines || [];
  const pets = petsData?.pets || [];

  // Get pet name by ID
  const getPetName = (petId: string) => {
    const pet = pets.find((p) => p.id === petId);
    return pet?.name || "Unknown Pet";
  };

  // Get status icon and color
  const getStatusDisplay = (status: Vaccine["status"]) => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: "bg-success/10 text-success border-success/20",
          label: "Completed",
        };
      case "overdue":
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          color: "bg-destructive/10 text-destructive border-destructive/20",
          label: "Overdue",
        };
      case "cancelled":
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          color: "bg-muted text-muted-foreground border-muted-foreground/20",
          label: "Cancelled",
        };
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          color: "bg-primary/10 text-primary border-primary/20",
          label: "Scheduled",
        };
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  // Handle booking appointment
  const handleBookAppointment = (vaccineId: string) => {
    // In a real app, this would open a booking modal or navigate to booking page
    console.log(`Booking appointment for vaccine: ${vaccineId}`);
    alert("Booking functionality would be implemented here!");
  };

  // Handle rescheduling
  const handleReschedule = (vaccineId: string) => {
    console.log(`Rescheduling vaccine: ${vaccineId}`);
    alert("Rescheduling functionality would be implemented here!");
  };

  // Loading state
  if (vaccinesLoading || petsLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">
              Loading vaccine schedules...
            </span>
          </div>
        </Card>
      </div>
    );
  }

  // Error state
  if (vaccinesError) {
    return (
      <div className={cn("space-y-6", className)}>
        <Card className="p-6 bg-card border-border">
          <div className="text-center py-8">
            <div className="text-destructive mb-2">
              Failed to load vaccine data
            </div>
            <div className="text-sm text-muted-foreground">{vaccinesError}</div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Vaccine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {vaccines.map((vaccine) => {
          const petName = getPetName(vaccine.petId);
          const statusDisplay = getStatusDisplay(vaccine.status);
          const scheduledDateTime = formatDate(vaccine.scheduledDate);
          const nextDueDateTime = vaccine.nextDueDate
            ? formatDate(vaccine.nextDueDate)
            : null;

          return (
            <Card
              key={vaccine.id}
              className={cn(
                "p-6 bg-card border-border transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
                vaccine.color,
              )}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Syringe className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {vaccine.name}
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

                {/* Vaccine Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Badge variant="outline" className="text-xs">
                      {vaccine.type}
                    </Badge>
                    {vaccine.description && (
                      <span className="text-muted-foreground">
                        {vaccine.description}
                      </span>
                    )}
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">
                      {scheduledDateTime.date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">
                      {scheduledDateTime.time}
                    </span>
                  </div>
                  {vaccine.location && (
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {vaccine.location}
                      </span>
                    </div>
                  )}
                  {vaccine.veterinarian && (
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {vaccine.veterinarian}
                      </span>
                    </div>
                  )}
                </div>

                {/* Next Due Date */}
                {nextDueDateTime && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">
                      Next Due:
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {nextDueDateTime.date} at {nextDueDateTime.time}
                    </p>
                  </div>
                )}

                {/* Notes */}
                {vaccine.notes && (
                  <div className="p-3 bg-accent/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                    <p className="text-sm text-foreground">{vaccine.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  {vaccine.status === "scheduled" && (
                    <>
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => handleBookAppointment(vaccine.id)}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Book Now
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleReschedule(vaccine.id)}
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        Reschedule
                      </Button>
                    </>
                  )}
                  {vaccine.status === "overdue" && (
                    <Button
                      size="sm"
                      className="flex-1 bg-destructive hover:bg-destructive/90"
                      onClick={() => handleBookAppointment(vaccine.id)}
                    >
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Book Urgent
                    </Button>
                  )}
                  {vaccine.status === "completed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      disabled
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {vaccines.length === 0 && (
        <Card className="p-8 bg-card border-border text-center">
          <Syringe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No vaccines scheduled
          </h3>
          <p className="text-muted-foreground mb-4">
            Keep your pets healthy by scheduling their vaccinations
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            Schedule First Vaccine
          </Button>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {vaccines.filter((v) => v.status === "scheduled").length}
            </div>
            <div className="text-sm text-muted-foreground">Scheduled</div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {vaccines.filter((v) => v.status === "completed").length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">
              {vaccines.filter((v) => v.status === "overdue").length}
            </div>
            <div className="text-sm text-muted-foreground">Overdue</div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-info">
              {vaccines.length}
            </div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
