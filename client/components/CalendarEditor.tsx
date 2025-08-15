import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { GetCalendarResponse, WeeklyScheduleItem } from "@shared/api";
import { cn } from "@/lib/utils";
import {
  Syringe,
  Utensils,
  Heart,
  Zap,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react";

interface CalendarEditorProps {
  className?: string;
}

interface EditingItem extends Partial<WeeklyScheduleItem> {
  day?: string;
}

export function CalendarEditor({ className }: CalendarEditorProps) {
  const [calendarData, setCalendarData] = useState<GetCalendarResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const types = [
    { value: "food", label: "Food", icon: "utensils", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    { value: "vaccine", label: "Vaccine", icon: "syringe", color: "bg-red-500/20 text-red-400 border-red-500/30" },
    { value: "exercise", label: "Exercise", icon: "zap", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
    { value: "appointment", label: "Appointment", icon: "heart", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  ];

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const fetchCalendarData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/calendar");
      const data: GetCalendarResponse = await response.json();
      setCalendarData(data);
    } catch (error) {
      console.error("Failed to fetch calendar data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "syringe": return <Syringe className="h-4 w-4" />;
      case "utensils": return <Utensils className="h-4 w-4" />;
      case "heart": return <Heart className="h-4 w-4" />;
      case "zap": return <Zap className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const startEditing = (item: WeeklyScheduleItem, day: string) => {
    setEditingItem({ ...item, day });
    setIsCreating(false);
  };

  const startCreating = () => {
    setEditingItem({
      id: `new-${Date.now()}`,
      petName: "",
      type: "food",
      title: "",
      description: "",
      time: "",
      status: "scheduled",
      day: "Monday",
    });
    setIsCreating(true);
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setIsCreating(false);
  };

  const saveItem = () => {
    if (!editingItem) return;
    
    // In a real app, you would send this to your API
    console.log("Saving item:", editingItem);
    alert(`Item would be saved: ${editingItem.title} on ${editingItem.day} at ${editingItem.time}`);
    
    cancelEditing();
  };

  const deleteItem = (itemId: string, day: string) => {
    // In a real app, you would send this to your API
    console.log(`Deleting item ${itemId} from ${day}`);
    alert(`Item would be deleted from ${day}`);
  };

  if (loading) {
    return (
      <div className={cn("space-y-6", className)}>
        <Card className="p-6 bg-card border-border">
          <p>Loading calendar data...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Calendar Editor</h2>
          <p className="text-muted-foreground">Manage your pet care schedule</p>
        </div>
        <Button onClick={startCreating} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Edit Form */}
      {editingItem && (
        <Card className="p-6 bg-card border-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {isCreating ? "Create New Item" : "Edit Item"}
            </h3>
            <Button variant="ghost" size="sm" onClick={cancelEditing}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="day">Day</Label>
              <Select value={editingItem.day} onValueChange={(value) => setEditingItem({...editingItem, day: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map(day => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={editingItem.time}
                onChange={(e) => setEditingItem({...editingItem, time: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="petName">Pet Name</Label>
              <Input
                id="petName"
                value={editingItem.petName}
                onChange={(e) => setEditingItem({...editingItem, petName: e.target.value})}
                placeholder="Pet name"
              />
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={editingItem.type} onValueChange={(value) => {
                const typeInfo = types.find(t => t.value === value);
                setEditingItem({
                  ...editingItem, 
                  type: value as any,
                  icon: typeInfo?.icon as any,
                  color: typeInfo?.color
                });
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editingItem.title}
                onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                placeholder="Activity title"
              />
            </div>

            <div>
              <Label htmlFor="location">Location (optional)</Label>
              <Input
                id="location"
                value={editingItem.location || ""}
                onChange={(e) => setEditingItem({...editingItem, location: e.target.value})}
                placeholder="Location"
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editingItem.description}
              onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
              placeholder="Activity description"
              rows={3}
            />
          </div>

          <div className="flex space-x-2">
            <Button onClick={saveItem} className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={cancelEditing}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 gap-6">
        {days.map(day => (
          <Card key={day} className="p-4 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">{day}</h3>
            <div className="space-y-2">
              {calendarData?.weeklySchedule[day]?.map(item => (
                <div
                  key={item.id}
                  className={cn(
                    "p-3 rounded-lg border flex items-center justify-between",
                    item.color
                  )}
                >
                  <div className="flex items-center space-x-3">
                    {getIcon(item.icon)}
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm opacity-80">
                        {item.petName} • {item.time} • {item.description}
                      </div>
                      {item.location && (
                        <div className="text-xs opacity-60">📍 {item.location}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{item.status}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditing(item, day)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteItem(item.id, day)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )) || <p className="text-muted-foreground text-sm">No activities scheduled</p>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
