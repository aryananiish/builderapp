import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Heart,
  PawPrint,
  Calendar,
  Scale,
  FileText,
  Edit,
  Loader2,
  Plus,
  User,
  MapPin,
  Phone,
  Mail,
  Cake,
} from "lucide-react";
import { usePets, useVaccines, useFoodSchedules } from "@/hooks/usePetData";
import { Pet } from "@shared/petcare";

interface PetProfileProps {
  className?: string;
}

export function PetProfile({ className }: PetProfileProps) {
  const { data: petsData, loading: petsLoading, error: petsError } = usePets();
  const { data: vaccinesData } = useVaccines();
  const { data: foodSchedulesData } = useFoodSchedules();

  const pets = petsData?.pets || [];
  const vaccines = vaccinesData?.vaccines || [];
  const foodSchedules = foodSchedulesData?.schedules || [];

  // Get pet statistics
  const getPetStats = (petId: string) => {
    const petVaccines = vaccines.filter((v) => v.petId === petId);
    const petFoodSchedules = foodSchedules.filter((s) => s.petId === petId);

    return {
      totalVaccines: petVaccines.length,
      upcomingVaccines: petVaccines.filter((v) => v.status === "scheduled")
        .length,
      completedVaccines: petVaccines.filter((v) => v.status === "completed")
        .length,
      dailyMeals: petFoodSchedules.length,
      totalCalories: petFoodSchedules.reduce(
        (total, s) => total + (s.calories || 0),
        0,
      ),
    };
  };

  // Get pet type display info with multiple image options
  const getPetTypeInfo = (type: Pet["type"], petId: string) => {
    const typeInfo: Record<Pet["type"] | "other", {
      emoji: string;
      color: string;
      label: string;
      images?: string[];
    }> = {
      dog: {
        emoji: "🐕",
        images: [
          "https://images.pexels.com/photos/7752793/pexels-photo-7752793.jpeg", // Golden Retriever
        ],
        color: "bg-blue-100 text-blue-800",
        label: "Dog",
      },
      cat: {
        emoji: "🐱",
        images: [
          "https://images.pexels.com/photos/4336274/pexels-photo-4336274.jpeg", // Maine Coon
        ],
        color: "bg-purple-100 text-purple-800",
        label: "Cat",
      },
      bird: {
        emoji: "🦜",
        color: "bg-yellow-100 text-yellow-800",
        label: "Bird",
      },
      rabbit: {
        emoji: "🐰",
        color: "bg-pink-100 text-pink-800",
        label: "Rabbit",
      },
      hamster: {
        emoji: "🐹",
        color: "bg-orange-100 text-orange-800",
        label: "Hamster",
      },
      fish: { emoji: "🐠", color: "bg-cyan-100 text-cyan-800", label: "Fish" },
      reptile: {
        emoji: "🦎",
        color: "bg-green-100 text-green-800",
        label: "Reptile",
      },
      other: {
        emoji: "🐾",
        color: "bg-gray-100 text-gray-800",
        label: "Other",
      },
    };

    const info = typeInfo[type] || typeInfo.other;

    // Select image based on pet ID for consistency
    if (info.images) {
      const imageIndex =
        petId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        info.images.length;
      return { ...info, image: info.images[imageIndex] };
    }

    return info;
  };

  // Handle edit pet
  const handleEditPet = (petId: string) => {
    console.log(`Editing pet: ${petId}`);
    alert("Edit pet functionality would be implemented here!");
  };

  // Handle add new pet
  const handleAddPet = () => {
    console.log("Adding new pet");
    alert("Add new pet functionality would be implemented here!");
  };

  // Handle view medical history
  const handleViewMedicalHistory = (petId: string) => {
    console.log(`Viewing medical history for pet: ${petId}`);
    alert("Medical history functionality would be implemented here!");
  };

  // Loading state
  if (petsLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">
              Loading pet profiles...
            </span>
          </div>
        </Card>
      </div>
    );
  }

  // Error state
  if (petsError) {
    return (
      <div className={cn("space-y-6", className)}>
        <Card className="p-6 bg-card border-border">
          <div className="text-center py-8">
            <div className="text-destructive mb-2">
              Failed to load pet profiles
            </div>
            <div className="text-sm text-muted-foreground">{petsError}</div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Pet Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {pets.map((pet) => {
          const typeInfo = getPetTypeInfo(pet.type, pet.id);
          const stats = getPetStats(pet.id);

          return (
            <Card
              key={pet.id}
              className="p-6 bg-card border-border transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="space-y-4">
                {/* Header with Avatar */}
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    {pet.avatar ? (
                      <img
                        src={pet.avatar}
                        alt={pet.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                      />
                    ) : typeInfo.image ? (
                      <img
                        src={typeInfo.image}
                        alt={`${typeInfo.label} - ${pet.name}`}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                        <span className="text-2xl">{typeInfo.emoji}</span>
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1">
                      <Badge
                        className={cn("text-xs px-2 py-1", typeInfo.color)}
                      >
                        {typeInfo.label}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {pet.name}
                    </h3>
                    {pet.breed && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {pet.breed}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Cake className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{pet.age} years</span>
                      </div>
                      {pet.weight && (
                        <div className="flex items-center space-x-1">
                          <Scale className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">
                            {pet.weight} kg
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-primary/5 rounded-lg text-center">
                    <div className="text-lg font-bold text-primary">
                      {stats.upcomingVaccines}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Upcoming Vaccines
                    </div>
                  </div>
                  <div className="p-3 bg-success/5 rounded-lg text-center">
                    <div className="text-lg font-bold text-success">
                      {stats.completedVaccines}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Completed Vaccines
                    </div>
                  </div>
                  <div className="p-3 bg-info/5 rounded-lg text-center">
                    <div className="text-lg font-bold text-info">
                      {stats.dailyMeals}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Daily Meals
                    </div>
                  </div>
                  <div className="p-3 bg-warning/5 rounded-lg text-center">
                    <div className="text-lg font-bold text-warning">
                      {stats.totalCalories}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Daily Calories
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {pet.notes && (
                  <div className="p-3 bg-accent/50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">
                        Notes
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{pet.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEditPet(pet.id)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => handleViewMedicalHistory(pet.id)}
                  >
                    <Heart className="h-3 w-3 mr-1" />
                    Medical History
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}

        {/* Add New Pet Card */}
        <Card className="p-6 bg-card border-border border-dashed hover:bg-accent/50 transition-colors cursor-pointer">
          <div
            className="h-full flex flex-col items-center justify-center space-y-4 text-center"
            onClick={handleAddPet}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Add New Pet
              </h3>
              <p className="text-sm text-muted-foreground">
                Create a profile for your new companion
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Empty State */}
      {pets.length === 0 && (
        <Card className="p-8 bg-card border-border text-center">
          <PawPrint className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No pets found
          </h3>
          <p className="text-muted-foreground mb-4">
            Add your first pet to start managing their care
          </p>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={handleAddPet}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Pet
          </Button>
        </Card>
      )}

      {/* Summary Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <PawPrint className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">
                {pets.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Pets</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
              <Heart className="h-5 w-5 text-success" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">
                {vaccines.filter((v) => v.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Vaccines
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-info" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">
                {vaccines.filter((v) => v.status === "scheduled").length}
              </div>
              <div className="text-sm text-muted-foreground">
                Upcoming Appointments
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
              <Scale className="h-5 w-5 text-warning" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">
                {pets
                  .reduce((total, pet) => total + (pet.weight || 0), 0)
                  .toFixed(1)}
                kg
              </div>
              <div className="text-sm text-muted-foreground">Total Weight</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
