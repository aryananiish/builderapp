import { useState } from "react";
import { Calendar, Heart, Users, Settings, BarChart3, Bell, Menu, X, Syringe, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PetCareCalendar } from "./PetCareCalendar";

interface DashboardProps {
  className?: string;
}

export function Dashboard({ className }: DashboardProps) {
  const [activeView, setActiveView] = useState("calendar");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "calendar", label: "Pet Calendar", icon: Calendar },
    { id: "vaccines", label: "Vaccines", icon: Syringe },
    { id: "feeding", label: "Feeding", icon: Utensils },
    { id: "pets", label: "My Pets", icon: Heart },
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
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">PetCare Pro</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
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
        <aside className={`
          w-64 border-r border-border bg-dashboard-nav transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed inset-y-0 left-0 z-50 md:z-auto
        `}>
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
        <main className="flex-1 overflow-auto bg-dashboard-content">
          <div className="p-4 md:p-6">
            {activeView === "calendar" && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">Pet Care Calendar</h1>
                    <p className="text-muted-foreground mt-1">Track vaccines, feeding times, and appointments</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                    Add Event
                  </Button>
                </div>

                <PetCareCalendar />
              </div>
            )}
            
            {activeView === "vaccines" && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">Vaccine Schedule</h1>
                    <p className="text-muted-foreground mt-1">Keep your pets healthy with timely vaccinations</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                    Schedule Vaccine
                  </Button>
                </div>
                <Card className="p-6 md:p-8 bg-card border-border text-center">
                  <Syringe className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm md:text-base">Vaccine management coming soon...</p>
                </Card>
              </div>
            )}

            {activeView === "feeding" && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">Feeding Schedule</h1>
                    <p className="text-muted-foreground mt-1">Track meal times and nutrition for your pets</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                    Add Feeding Time
                  </Button>
                </div>
                <Card className="p-6 md:p-8 bg-card border-border text-center">
                  <Utensils className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm md:text-base">Feeding management coming soon...</p>
                </Card>
              </div>
            )}

            {activeView === "pets" && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Pets</h1>
                    <p className="text-muted-foreground mt-1">Manage your pet profiles and information</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                    Add Pet
                  </Button>
                </div>
                <Card className="p-6 md:p-8 bg-card border-border text-center">
                  <Heart className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm md:text-base">Pet management coming soon...</p>
                </Card>
              </div>
            )}

            {activeView === "analytics" && (
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Pet Care Analytics</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center space-x-2">
                      <Syringe className="h-5 w-5 text-primary" />
                      <span className="text-foreground font-medium">Vaccines This Month</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-foreground">3</span>
                      <span className="text-muted-foreground ml-1">scheduled</span>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-success" />
                      <span className="text-foreground font-medium">Active Pets</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-foreground">2</span>
                      <span className="text-muted-foreground ml-1">pets</span>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center space-x-2">
                      <Utensils className="h-5 w-5 text-info" />
                      <span className="text-foreground font-medium">Meals Today</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-foreground">6</span>
                      <span className="text-muted-foreground ml-1">scheduled</span>
                    </div>
                  </Card>
                </div>
              </div>
            )}
            

            {activeView === "settings" && (
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
                <Card className="p-6 md:p-8 bg-card border-border text-center">
                  <Settings className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm md:text-base">Settings panel coming soon...</p>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
