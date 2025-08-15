import { useState } from "react";
import { Calendar, Clock, Users, Settings, BarChart3, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timetable } from "./Timetable";

interface DashboardProps {
  className?: string;
}

export function Dashboard({ className }: DashboardProps) {
  const [activeView, setActiveView] = useState("timetable");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "timetable", label: "Timetable", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "students", label: "Students", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Header */}
      <header className="border-b border-border bg-dashboard-header backdrop-blur supports-[backdrop-filter]:bg-dashboard-header/95">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">TimeTable Pro</span>
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

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-dashboard-nav">
          <div className="p-6">
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
                    onClick={() => setActiveView(item.id)}
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
          <div className="p-6">
            {activeView === "timetable" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Class Timetable</h1>
                    <p className="text-muted-foreground mt-1">Manage your weekly schedule</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    Add Class
                  </Button>
                </div>
                
                <Timetable />
              </div>
            )}
            
            {activeView === "analytics" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <span className="text-foreground font-medium">Weekly Hours</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-foreground">32</span>
                      <span className="text-muted-foreground ml-1">hours</span>
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-success" />
                      <span className="text-foreground font-medium">Total Students</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-foreground">156</span>
                      <span className="text-muted-foreground ml-1">students</span>
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-card border-border">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-info" />
                      <span className="text-foreground font-medium">Classes Today</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-foreground">6</span>
                      <span className="text-muted-foreground ml-1">classes</span>
                    </div>
                  </Card>
                </div>
              </div>
            )}
            
            {activeView === "students" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-foreground">Students</h1>
                <Card className="p-8 bg-card border-border text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Student management coming soon...</p>
                </Card>
              </div>
            )}
            
            {activeView === "settings" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                <Card className="p-8 bg-card border-border text-center">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Settings panel coming soon...</p>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
