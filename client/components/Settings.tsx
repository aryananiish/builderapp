import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Palette,
  Globe,
  Shield,
  Download,
  Upload,
  Trash2,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  MessageSquare,
  Scale,
  Calendar,
  Clock,
  Eye,
  EyeOff,
  Key,
  LogOut,
  Save,
} from "lucide-react";

interface SettingsProps {
  className?: string;
}

export function Settings({ className }: SettingsProps) {
  // Settings state
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    vaccineReminders: true,
    feedingReminders: true,
    appointmentReminders: true,
  });

  const [preferences, setPreferences] = useState({
    theme: "dark",
    language: "en",
    units: "metric",
    timezone: "UTC",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
  });

  const [privacy, setPrivacy] = useState({
    shareData: false,
    analytics: true,
    locationTracking: false,
    profileVisible: true,
  });

  const [sounds, setSounds] = useState({
    notifications: true,
    alerts: true,
    feedbackSounds: false,
  });

  // Settings sections configuration
  const settingsSections = [
    {
      id: "profile",
      title: "Profile Settings",
      icon: User,
      description: "Manage your account and personal information",
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      description: "Configure how you receive updates",
    },
    {
      id: "appearance",
      title: "Appearance",
      icon: Palette,
      description: "Customize the look and feel",
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      icon: Shield,
      description: "Control your data and security settings",
    },
    {
      id: "data",
      title: "Data Management",
      icon: Download,
      description: "Export, import, and manage your data",
    },
  ];

  const [activeSection, setActiveSection] = useState("profile");

  // Handle toggle functions
  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSound = (key: keyof typeof sounds) => {
    setSounds((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePreferenceChange = (
    key: keyof typeof preferences,
    value: string,
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log("Saving settings:", {
      notifications,
      preferences,
      privacy,
      sounds,
    });
    alert("Settings saved successfully!");
  };

  const handleExportData = () => {
    console.log("Exporting data...");
    alert("Data export functionality would be implemented here!");
  };

  const handleImportData = () => {
    console.log("Importing data...");
    alert("Data import functionality would be implemented here!");
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      console.log("Deleting account...");
      alert("Account deletion would be implemented here!");
    }
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Account Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
              defaultValue="Pet Owner"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
              defaultValue="petowner@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
              defaultValue="+91 0000000000"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Veterinarian Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Primary Veterinarian
            </label>
            <input
              type="text"
              placeholder="Dr. Smith's Animal Clinic"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
              defaultValue="Paws Veterinary Clinic"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Emergency Contact
            </label>
            <input
              type="tel"
              placeholder="Emergency vet number"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
              defaultValue="+91 1111111111"
            />
          </div>
        </div>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Notification Channels
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">
                  Email Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleNotification("email")}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                notifications.email ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  notifications.email ? "translate-x-6" : "translate-x-1",
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">
                  Push Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Get alerts on your device
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleNotification("push")}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                notifications.push ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  notifications.push ? "translate-x-6" : "translate-x-1",
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive text messages
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleNotification("sms")}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                notifications.sms ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  notifications.sms ? "translate-x-6" : "translate-x-1",
                )}
              />
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Reminder Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Vaccine Reminders</p>
              <p className="text-sm text-muted-foreground">
                Get notified before vaccines are due
              </p>
            </div>
            <button
              onClick={() => toggleNotification("vaccineReminders")}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                notifications.vaccineReminders ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  notifications.vaccineReminders
                    ? "translate-x-6"
                    : "translate-x-1",
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Feeding Reminders</p>
              <p className="text-sm text-muted-foreground">
                Get reminded of meal times
              </p>
            </div>
            <button
              onClick={() => toggleNotification("feedingReminders")}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                notifications.feedingReminders ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  notifications.feedingReminders
                    ? "translate-x-6"
                    : "translate-x-1",
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">
                Appointment Reminders
              </p>
              <p className="text-sm text-muted-foreground">
                Get notified of upcoming appointments
              </p>
            </div>
            <button
              onClick={() => toggleNotification("appointmentReminders")}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                notifications.appointmentReminders ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  notifications.appointmentReminders
                    ? "translate-x-6"
                    : "translate-x-1",
                )}
              />
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Sound Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {sounds.notifications ? (
                <Volume2 className="h-5 w-5 text-muted-foreground" />
              ) : (
                <VolumeX className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium text-foreground">
                  Notification Sounds
                </p>
                <p className="text-sm text-muted-foreground">
                  Play sounds for notifications
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleSound("notifications")}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                sounds.notifications ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  sounds.notifications ? "translate-x-6" : "translate-x-1",
                )}
              />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => handlePreferenceChange("theme", "light")}
            className={cn(
              "p-4 rounded-lg border text-center transition-colors",
              preferences.theme === "light"
                ? "border-primary bg-primary/10"
                : "border-border hover:bg-accent",
            )}
          >
            <Sun className="h-6 w-6 mx-auto mb-2 text-foreground" />
            <p className="text-sm font-medium text-foreground">Light</p>
          </button>
          <button
            onClick={() => handlePreferenceChange("theme", "dark")}
            className={cn(
              "p-4 rounded-lg border text-center transition-colors",
              preferences.theme === "dark"
                ? "border-primary bg-primary/10"
                : "border-border hover:bg-accent",
            )}
          >
            <Moon className="h-6 w-6 mx-auto mb-2 text-foreground" />
            <p className="text-sm font-medium text-foreground">Dark</p>
          </button>
          <button
            onClick={() => handlePreferenceChange("theme", "auto")}
            className={cn(
              "p-4 rounded-lg border text-center transition-colors",
              preferences.theme === "auto"
                ? "border-primary bg-primary/10"
                : "border-border hover:bg-accent",
            )}
          >
            <Palette className="h-6 w-6 mx-auto mb-2 text-foreground" />
            <p className="text-sm font-medium text-foreground">Auto</p>
          </button>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Language & Region
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Language
            </label>
            <select
              value={preferences.language}
              onChange={(e) =>
                handlePreferenceChange("language", e.target.value)
              }
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Units
            </label>
            <select
              value={preferences.units}
              onChange={(e) => handlePreferenceChange("units", e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
            >
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, inches)</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Date Format
            </label>
            <select
              value={preferences.dateFormat}
              onChange={(e) =>
                handlePreferenceChange("dateFormat", e.target.value)
              }
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Time Format
            </label>
            <select
              value={preferences.timeFormat}
              onChange={(e) =>
                handlePreferenceChange("timeFormat", e.target.value)
              }
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
            >
              <option value="24h">24 Hour</option>
              <option value="12h">12 Hour (AM/PM)</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Privacy Controls
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">
                Share Anonymous Data
              </p>
              <p className="text-sm text-muted-foreground">
                Help improve the app by sharing usage data
              </p>
            </div>
            <button
              onClick={() => togglePrivacy("shareData")}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                privacy.shareData ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  privacy.shareData ? "translate-x-6" : "translate-x-1",
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Analytics</p>
              <p className="text-sm text-muted-foreground">
                Allow analytics to improve user experience
              </p>
            </div>
            <button
              onClick={() => togglePrivacy("analytics")}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                privacy.analytics ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  privacy.analytics ? "translate-x-6" : "translate-x-1",
                )}
              />
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Account Security
        </h3>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Key className="h-4 w-4 mr-2" />
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Shield className="h-4 w-4 mr-2" />
            Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out All Devices
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Data Export & Import
        </h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-foreground mb-2">Export Your Data</p>
            <p className="text-sm text-muted-foreground mb-4">
              Download a copy of all your pet data including profiles,
              schedules, and health records
            </p>
            <Button onClick={handleExportData} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
          </div>

          <div>
            <p className="font-medium text-foreground mb-2">Import Data</p>
            <p className="text-sm text-muted-foreground mb-4">
              Import pet data from a previously exported file or another pet
              care app
            </p>
            <Button
              variant="outline"
              onClick={handleImportData}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border border-destructive/20">
        <h3 className="text-lg font-semibold text-destructive mb-4">
          Danger Zone
        </h3>
        <div>
          <p className="font-medium text-foreground mb-2">Delete Account</p>
          <p className="text-sm text-muted-foreground mb-4">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            className="w-full"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSettings();
      case "notifications":
        return renderNotificationSettings();
      case "appearance":
        return renderAppearanceSettings();
      case "privacy":
        return renderPrivacySettings();
      case "data":
        return renderDataSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Settings Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card
              key={section.id}
              className={cn(
                "p-4 cursor-pointer transition-all duration-200 hover:shadow-lg",
                activeSection === section.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-accent/50",
              )}
              onClick={() => setActiveSection(section.id)}
            >
              <div className="text-center">
                <Icon
                  className={cn(
                    "h-6 w-6 mx-auto mb-2",
                    activeSection === section.id
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                />
                <h3 className="font-medium text-foreground text-sm mb-1">
                  {section.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {section.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">{renderCurrentSection()}</div>

        {/* Settings Summary Sidebar */}
        <div className="space-y-4">
          <Card className="p-4 bg-card border-border">
            <h3 className="font-semibold text-foreground mb-3">
              Current Settings
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Theme:</span>
                <span className="text-foreground capitalize">
                  {preferences.theme}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Language:</span>
                <span className="text-foreground">
                  {preferences.language === "en"
                    ? "English"
                    : preferences.language}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Units:</span>
                <span className="text-foreground capitalize">
                  {preferences.units}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Notifications:</span>
                <Badge
                  variant={
                    notifications.email || notifications.push
                      ? "default"
                      : "secondary"
                  }
                >
                  {notifications.email || notifications.push
                    ? "Enabled"
                    : "Disabled"}
                </Badge>
              </div>
            </div>
          </Card>

          <Button
            onClick={handleSaveSettings}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Save className="h-4 w-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
