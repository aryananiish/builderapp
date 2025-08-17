import { useState } from "react";
import {
  Calendar,
  Heart,
  Users,
  Settings,
  BarChart3,
  Bell,
  Menu,
  X,
  Syringe,
  Utensils,
  Loader2,
  Zap,
  PawPrint,
  ShoppingBag,
  User,
} from "lucide-react";
import { useSummary } from "@/hooks/usePetData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PetCareCalendar } from "./PetCareCalendar";
import { VaccineSchedule } from "./VaccineSchedule";
import { DietSchedule } from "./DietSchedule";
import { PetProfile } from "./PetProfile";
import { Settings as SettingsComponent } from "./Settings";

interface DashboardProps {
  className?: string;
}

export function Dashboard({ className }: DashboardProps) {
  const [activeView, setActiveView] = useState("calendar");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch summary data for analytics
  const {
    data: summaryData,
    loading: summaryLoading,
    error: summaryError,
  } = useSummary();

  const navigationItems = [
    { id: "profiles", label: "Pet Profiles", icon: User },
    { id: "calendar", label: "Pet Calendar", icon: Calendar },
    { id: "vaccines", label: "Vaccines", icon: Syringe },
    { id: "feeding", label: "Diet", icon: Utensils },
    { id: "shop", label: "Pet Shop", icon: ShoppingBag },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Header */}
      <header className="border-b border-border bg-dashboard-header backdrop-blur supports-[backdrop-filter]:bg-dashboard-header/95">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <PawPrint className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                PAWSPECTIVE
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">A</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)] relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
          w-64 border-r border-border bg-dashboard-nav transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:inset-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          fixed inset-y-0 left-0 z-50 md:z-auto
        `}
        >
          <div className="p-4 md:p-6">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "secondary" : "ghost"}
                    className={`w-full justify-start text-left ${
                      activeView === item.id
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                    onClick={() => {
                      setActiveView(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-dashboard-content">
          <div className="p-4 md:p-6">
            {activeView === "calendar" && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      Pet Care Calendar
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Track vaccines, feeding times, and appointments
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                    Add Event
                  </Button>
                </div>

                <PetCareCalendar onNavigate={setActiveView} />
              </div>
            )}

            {activeView === "vaccines" && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      Vaccine Schedule
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Keep your pets healthy with timely vaccinations
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                    Schedule Vaccine
                  </Button>
                </div>
                <VaccineSchedule />
              </div>
            )}

            {activeView === "feeding" && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      Diet Schedule
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Track meal times and nutrition for your pets
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                    Add Diet Schedule
                  </Button>
                </div>
                <DietSchedule />
              </div>
            )}

            {activeView === "profiles" && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      Pet Profiles
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Manage your pets' information and health records
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                    Add New Pet
                  </Button>
                </div>
                <PetProfile />
              </div>
            )}

            {activeView === "shop" && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      Pet Shop
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Find everything your pets need
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                    View Cart (0)
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {/* Premium Dog Food */}
                  <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <img
                        src="https://images.pexels.com/photos/13581209/pexels-photo-13581209.jpeg"
                        alt="Premium dog food with happy dog"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">
                        Premium Dog Food
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        High-quality nutrition for adult dogs
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">₹1,493</Badge>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Cat Toy Set */}
                  <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <img
                        src="https://images.pexels.com/photos/16577568/pexels-photo-16577568.jpeg"
                        alt="Fluffy kitten playing with toys"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">
                        Interactive Cat Toys
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Set of 5 engaging toys for cats
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">₹995</Badge>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Dog Leash */}
                  <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <img
                        src="https://images.pexels.com/photos/32255850/pexels-photo-32255850.jpeg"
                        alt="Happy Jack Russell Terrier in outdoor park"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">
                        Reflective Dog Leash
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        6ft durable leash with LED lights
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">₹1,244</Badge>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Pet Bed */}
                  <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <img
                        src="https://images.pexels.com/photos/2646483/pexels-photo-2646483.jpeg"
                        alt="Gray tabby cat sleeping soundly"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">
                        Cozy Pet Bed
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Orthopedic support for better sleep
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">₹2,489</Badge>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Grooming Kit */}
                  <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <img
                        src="https://images.pexels.com/photos/9230441/pexels-photo-9230441.jpeg"
                        alt="Professional grooming brushes and tools"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">
                        Professional Grooming Kit
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Complete set for pet grooming
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">₹1,991</Badge>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Digital Health Tracker */}
                  <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <img
                        src="https://images.pexels.com/photos/20782645/pexels-photo-20782645.jpeg"
                        alt="White cat with smart collar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">
                        Digital Health Tracker
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Smart collar for health monitoring
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">₹4,481</Badge>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Smart Water Fountain */}
                  <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <img
                        src="https://images.pexels.com/photos/22798164/pexels-photo-22798164.jpeg"
                        alt="Beautiful decorative fountain with lotus flower"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">
                        Smart Water Fountain
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Auto-refilling with filtration system
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">₹2,987</Badge>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Training Treats */}
                  <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <img
                        src="https://images.pexels.com/photos/4692169/pexels-photo-4692169.jpeg"
                        alt="Delicious training treats and snacks"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">
                        Training Treat Pack
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Healthy rewards for good behavior
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">₹796</Badge>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeView === "analytics" && (
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Pet Care Analytics
                </h1>

                {summaryLoading ? (
                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <span className="ml-2 text-muted-foreground">
                        Loading analytics...
                      </span>
                    </div>
                  </Card>
                ) : summaryError ? (
                  <Card className="p-6 bg-card border-border">
                    <div className="text-center py-8">
                      <div className="text-destructive mb-2">
                        Failed to load analytics data
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {summaryError}
                      </div>
                    </div>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                    <Card
                      className="p-6 bg-card border-border cursor-pointer hover:shadow-md hover:border-primary/50 transition-all duration-200 hover:scale-105"
                      onClick={() => setActiveView("vaccines")}
                    >
                      <div className="flex items-center space-x-2">
                        <Syringe className="h-5 w-5 text-primary" />
                        <span className="text-foreground font-medium">
                          Upcoming Vaccines
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-foreground">
                          {summaryData?.summary?.upcomingVaccines || 0}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          scheduled
                        </span>
                      </div>
                    </Card>

                    <Card
                      className="p-6 bg-card border-border cursor-pointer hover:shadow-md hover:border-primary/50 transition-all duration-200 hover:scale-105"
                      onClick={() => setActiveView("profiles")}
                    >
                      <div className="flex items-center space-x-2">
                        <Heart className="h-5 w-5 text-success" />
                        <span className="text-foreground font-medium">
                          Active Pets
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-foreground">
                          {summaryData?.summary?.totalPets || 0}
                        </span>
                        <span className="text-muted-foreground ml-1">pets</span>
                      </div>
                    </Card>

                    <Card
                      className="p-6 bg-card border-border cursor-pointer hover:shadow-md hover:border-primary/50 transition-all duration-200 hover:scale-105"
                      onClick={() => setActiveView("feeding")}
                    >
                      <div className="flex items-center space-x-2">
                        <Utensils className="h-5 w-5 text-info" />
                        <span className="text-foreground font-medium">
                          Daily Meals
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-foreground">
                          {summaryData?.summary?.dailyMeals || 0}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          scheduled
                        </span>
                      </div>
                    </Card>

                    <Card
                      className="p-6 bg-card border-border cursor-pointer hover:shadow-md hover:border-primary/50 transition-all duration-200 hover:scale-105"
                      onClick={() => setActiveView("calendar")}
                    >
                      <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-cyan-400" />
                        <span className="text-foreground font-medium">
                          Weekly Exercises
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-foreground">
                          {summaryData?.summary?.weeklyExercises || 0}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          activities
                        </span>
                      </div>
                    </Card>

                    <Card
                      className="p-6 bg-card border-border cursor-pointer hover:shadow-md hover:border-primary/50 transition-all duration-200 hover:scale-105"
                      onClick={() => setActiveView("calendar")}
                    >
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-warning" />
                        <span className="text-foreground font-medium">
                          Upcoming Events
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-foreground">
                          {summaryData?.summary?.upcomingEvents || 0}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          events
                        </span>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            )}

            {activeView === "settings" && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      Settings
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Customize your app preferences and account settings
                    </p>
                  </div>
                </div>
                <SettingsComponent />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
