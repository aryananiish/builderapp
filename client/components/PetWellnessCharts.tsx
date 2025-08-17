import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import {
  Heart,
  Activity,
  Shield,
  Utensils,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useSummary } from "@/hooks/usePetData";
import { samplePets, sampleVaccines, sampleFoodSchedules, sampleEvents } from "@/data/samplePetData";

interface PetWellnessChartsProps {
  className?: string;
}

export function PetWellnessCharts({ className }: PetWellnessChartsProps) {
  const { data: summaryData, loading, error } = useSummary();

  // Prepare chart data
  const vaccinationStatusData = [
    { name: "Up to date", value: 3, color: "#10b981", icon: "✓" },
    { name: "Due soon", value: 1, color: "#f59e0b", icon: "⏰" },
    { name: "Overdue", value: 0, color: "#ef4444", icon: "⚠" },
  ];

  const petTypeDistribution = [
    { name: "Dogs", value: 1, color: "#3b82f6" },
    { name: "Cats", value: 1, color: "#8b5cf6" },
    { name: "Birds", value: 0, color: "#06b6d4" },
    { name: "Others", value: 0, color: "#84cc16" },
  ];

  const activityLevels = [
    { pet: "Max", exercise: 85, nutrition: 92, health: 88, overall: 88 },
    { pet: "Luna", exercise: 65, nutrition: 88, health: 94, overall: 82 },
  ];

  const weeklyActivityData = [
    { day: "Mon", Max: 3, Luna: 2 },
    { day: "Tue", Max: 2, Luna: 1 },
    { day: "Wed", Max: 2, Luna: 1 },
    { day: "Thu", Max: 2, Luna: 2 },
    { day: "Fri", Max: 3, Luna: 1 },
    { day: "Sat", Max: 4, Luna: 2 },
    { day: "Sun", Max: 2, Luna: 2 },
  ];

  const healthMetrics = [
    { category: "Vaccinations", score: 95, color: "#10b981" },
    { category: "Nutrition", score: 90, color: "#3b82f6" },
    { category: "Exercise", score: 75, color: "#f59e0b" },
    { category: "Checkups", score: 100, color: "#8b5cf6" },
  ];

  const nutritionBreakdown = [
    { type: "Breakfast", calories: 600, meals: 2 },
    { type: "Lunch", calories: 150, meals: 1 },
    { type: "Dinner", calories: 600, meals: 2 },
    { type: "Snacks", calories: 0, meals: 0 },
  ];

  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];

  if (loading) {
    return (
      <div className={className}>
        <Card className="p-6 bg-card border-border">
          <div className="text-center py-8">
            <div className="text-muted-foreground">Loading wellness data...</div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <Card className="p-6 bg-card border-border">
          <div className="text-center py-8">
            <div className="text-destructive">Failed to load wellness data</div>
            <div className="text-sm text-muted-foreground mt-2">{error}</div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Wellness Score */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Overall Wellness Score</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="90%" data={activityLevels}>
              <RadialBar
                minAngle={15}
                label={{ position: "insideStart", fill: "#fff" }}
                background
                clockWise
                dataKey="overall"
                fill="#10b981"
              />
              <Legend iconSize={18} layout="horizontal" verticalAlign="bottom" />
              <Tooltip formatter={(value) => [`${value}%`, "Wellness Score"]} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-center mt-4">
            <div className="text-2xl font-bold text-primary">85%</div>
            <div className="text-sm text-muted-foreground">Average Wellness</div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-foreground">Vaccination Status</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={vaccinationStatusData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {vaccinationStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {vaccinationStatusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pet Health Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-foreground">Health Metrics by Category</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={healthMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="category"
                stroke="#9ca3af"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value) => [`${value}%`, "Score"]}
              />
              <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                {healthMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-foreground">Weekly Activity Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="Max"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="Luna"
                stackId="1"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
              />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Nutrition and Pet Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center space-x-2 mb-4">
            <Utensils className="h-5 w-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-foreground">Daily Nutrition Breakdown</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={nutritionBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="type" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value, name) => [
                  name === "calories" ? `${value} cal` : `${value} meals`,
                  name === "calories" ? "Calories" : "Meals",
                ]}
              />
              <Bar dataKey="calories" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-foreground">Pet Type Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={petTypeDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value, percent }) => 
                  value > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : null
                }
              >
                {petTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, "Pets"]} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Individual Pet Wellness Cards */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center space-x-2 mb-6">
          <Heart className="h-5 w-5 text-red-400" />
          <h3 className="text-lg font-semibold text-foreground">Individual Pet Wellness</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activityLevels.map((pet, index) => (
            <div key={pet.pet} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-foreground">{pet.pet}</h4>
                <Badge
                  variant={pet.overall >= 85 ? "default" : pet.overall >= 70 ? "secondary" : "destructive"}
                >
                  {pet.overall}% Wellness
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Exercise</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-secondary rounded-full h-2">
                      <div
                        className="bg-cyan-400 h-2 rounded-full transition-all"
                        style={{ width: `${pet.exercise}%` }}
                      />
                    </div>
                    <span className="text-sm text-foreground w-8">{pet.exercise}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Nutrition</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-secondary rounded-full h-2">
                      <div
                        className="bg-blue-400 h-2 rounded-full transition-all"
                        style={{ width: `${pet.nutrition}%` }}
                      />
                    </div>
                    <span className="text-sm text-foreground w-8">{pet.nutrition}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Health</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-secondary rounded-full h-2">
                      <div
                        className="bg-green-400 h-2 rounded-full transition-all"
                        style={{ width: `${pet.health}%` }}
                      />
                    </div>
                    <span className="text-sm text-foreground w-8">{pet.health}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
