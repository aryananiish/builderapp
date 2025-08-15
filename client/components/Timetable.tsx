import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TimetableClass {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  time: string;
  duration: number; // in hours
  color: string;
}

interface TimetableProps {
  className?: string;
}

export function Timetable({ className }: TimetableProps) {
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Sample timetable data
  const timetableData: Record<string, TimetableClass[]> = {
    Monday: [
      {
        id: "1",
        subject: "Mathematics",
        teacher: "Dr. Smith",
        room: "Room 101",
        time: "09:00",
        duration: 2,
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30"
      },
      {
        id: "2",
        subject: "Physics",
        teacher: "Prof. Johnson",
        room: "Lab 201",
        time: "13:00",
        duration: 1.5,
        color: "bg-purple-500/20 text-purple-400 border-purple-500/30"
      },
      {
        id: "3",
        subject: "Chemistry",
        teacher: "Dr. Brown",
        room: "Lab 301",
        time: "15:00",
        duration: 2,
        color: "bg-green-500/20 text-green-400 border-green-500/30"
      }
    ],
    Tuesday: [
      {
        id: "4",
        subject: "Computer Science",
        teacher: "Mr. Wilson",
        room: "CS Lab",
        time: "08:00",
        duration: 3,
        color: "bg-orange-500/20 text-orange-400 border-orange-500/30"
      },
      {
        id: "5",
        subject: "English",
        teacher: "Ms. Davis",
        room: "Room 205",
        time: "14:00",
        duration: 1,
        color: "bg-pink-500/20 text-pink-400 border-pink-500/30"
      }
    ],
    Wednesday: [
      {
        id: "6",
        subject: "Biology",
        teacher: "Dr. Taylor",
        room: "Bio Lab",
        time: "10:00",
        duration: 2,
        color: "bg-teal-500/20 text-teal-400 border-teal-500/30"
      },
      {
        id: "7",
        subject: "History",
        teacher: "Prof. Anderson",
        room: "Room 301",
        time: "14:00",
        duration: 1,
        color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      }
    ],
    Thursday: [
      {
        id: "8",
        subject: "Art",
        teacher: "Ms. Garcia",
        room: "Art Studio",
        time: "09:00",
        duration: 2,
        color: "bg-red-500/20 text-red-400 border-red-500/30"
      },
      {
        id: "9",
        subject: "Physical Education",
        teacher: "Coach Martinez",
        room: "Gymnasium",
        time: "15:00",
        duration: 1,
        color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
      }
    ],
    Friday: [
      {
        id: "10",
        subject: "Literature",
        teacher: "Dr. White",
        room: "Room 401",
        time: "11:00",
        duration: 2,
        color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
      }
    ]
  };

  const getClassPosition = (time: string, duration: number) => {
    const startHour = parseInt(time.split(":")[0]);
    const startRow = startHour - 8 + 2; // +2 for header rows
    const spanRows = duration * 1; // Each hour is 1 row
    return { gridRowStart: startRow, gridRowEnd: startRow + spanRows };
  };

  return (
    <div className={cn("space-y-4 md:space-y-6", className)}>
      {/* Timetable Grid */}
      <Card className="p-4 md:p-6 bg-card border-border overflow-hidden">
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">Weekly Schedule</h2>
          <p className="text-sm md:text-base text-muted-foreground">Current semester timetable</p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-6 gap-1 md:gap-2 mb-4">
              <div className="p-2 md:p-3 bg-timetable-header rounded-lg">
                <span className="text-xs md:text-sm font-medium text-foreground">Time</span>
              </div>
              {days.map((day) => (
                <div key={day} className="p-2 md:p-3 bg-timetable-header rounded-lg text-center">
                  <span className="text-xs md:text-sm font-medium text-foreground">
                    <span className="md:hidden">{day.substring(0, 3)}</span>
                    <span className="hidden md:inline">{day}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="space-y-2">
              {timeSlots.map((time, timeIndex) => (
                <div key={time} className="grid grid-cols-6 gap-2 min-h-[60px]">
                  {/* Time Column */}
                  <div className="p-3 bg-timetable-cell rounded-lg flex items-center">
                    <span className="text-sm text-muted-foreground font-mono">{time}</span>
                  </div>
                  
                  {/* Day Columns */}
                  {days.map((day) => {
                    const dayClasses = timetableData[day] || [];
                    const classAtTime = dayClasses.find(cls => cls.time === time);
                    
                    return (
                      <div key={`${day}-${time}`} className="relative">
                        {classAtTime ? (
                          <div className={cn(
                            "p-3 rounded-lg border h-full min-h-[60px] transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer",
                            classAtTime.color
                          )}>
                            <div className="flex flex-col h-full">
                              <h4 className="font-medium text-sm mb-1 line-clamp-1">
                                {classAtTime.subject}
                              </h4>
                              <p className="text-xs opacity-80 mb-1">
                                {classAtTime.teacher}
                              </p>
                              <div className="mt-auto">
                                <Badge variant="outline" className="text-xs bg-background/50">
                                  {classAtTime.room}
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
        <h3 className="text-lg font-semibold text-foreground mb-4">Subjects</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.values(timetableData).flat().map((classItem) => (
            <div key={classItem.id} className="flex items-center space-x-2">
              <div className={cn("w-3 h-3 rounded-full", classItem.color.split(' ')[0])} />
              <span className="text-sm text-foreground">{classItem.subject}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">25</div>
            <div className="text-sm text-muted-foreground">Hours/Week</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">8</div>
            <div className="text-sm text-muted-foreground">Subjects</div>
          </div>
        </Card>
        
        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-info">5</div>
            <div className="text-sm text-muted-foreground">Days/Week</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
