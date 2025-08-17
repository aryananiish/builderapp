import { useState } from "react";
import { Calendar, Clock, MapPin, Phone, Star, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VetConsultDialogProps {
  children: React.ReactNode;
}

export function VetConsultDialog({ children }: VetConsultDialogProps) {
  const [step, setStep] = useState(1);
  const [selectedVet, setSelectedVet] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    petName: "",
    ownerName: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
    consultationType: "",
    symptoms: "",
    urgency: "",
  });

  const veterinarians = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: "General Practice",
      experience: "8 years",
      rating: 4.8,
      availableToday: true,
      consultationFee: "₹800",
      image:
        "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg",
      location: "Pet Care Center, Mumbai",
      phone: "+91 98765 43210",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialization: "Surgery & Emergency",
      experience: "12 years",
      rating: 4.9,
      availableToday: false,
      consultationFee: "₹1200",
      image:
        "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg",
      location: "Animal Hospital, Delhi",
      phone: "+91 98765 43211",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialization: "Dermatology",
      experience: "6 years",
      rating: 4.7,
      availableToday: true,
      consultationFee: "₹900",
      image:
        "https://images.pexels.com/photos/5407205/pexels-photo-5407205.jpeg",
      location: "Skin & Coat Clinic, Bangalore",
      phone: "+91 98765 43212",
    },
  ];

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookAppointment = () => {
    const selectedVetInfo = veterinarians.find((vet) => vet.id === selectedVet);

    // Here you would typically send the data to your backend
    console.log("Booking appointment:", {
      ...formData,
      veterinarian: selectedVetInfo,
    });

    // Show success message or redirect
    alert(`Appointment booked successfully with ${selectedVetInfo?.name}!`);
    setStep(1);
    setSelectedVet(null);
    setFormData({
      petName: "",
      ownerName: "",
      phone: "",
      appointmentDate: "",
      appointmentTime: "",
      consultationType: "",
      symptoms: "",
      urgency: "",
    });
  };

  const isFormValid = () => {
    return (
      formData.petName &&
      formData.ownerName &&
      formData.phone &&
      formData.appointmentDate &&
      formData.appointmentTime &&
      formData.consultationType &&
      selectedVet
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Book Veterinary Consultation
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose a veterinarian and schedule your pet's appointment
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Available Veterinarians
              </h3>
              <div className="grid gap-4">
                {veterinarians.map((vet) => (
                  <Card
                    key={vet.id}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedVet === vet.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedVet(vet.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={vet.image}
                        alt={vet.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-foreground">
                            {vet.name}
                          </h4>
                          <div className="flex items-center space-x-2">
                            {vet.availableToday && (
                              <Badge
                                variant="secondary"
                                className="bg-success/10 text-success"
                              >
                                Available Today
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-primary">
                              {vet.consultationFee}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {vet.specialization} • {vet.experience} experience
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{vet.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{vet.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>{vet.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedVet}
                className="bg-primary hover:bg-primary/90"
              >
                Continue to Booking
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Appointment Details
              </h3>
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="text-sm"
              >
                Change Veterinarian
              </Button>
            </div>

            {selectedVet && (
              <Card className="p-4 bg-muted/20">
                <div className="flex items-center space-x-3">
                  <img
                    src={
                      veterinarians.find((vet) => vet.id === selectedVet)?.image
                    }
                    alt="Selected vet"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {
                        veterinarians.find((vet) => vet.id === selectedVet)
                          ?.name
                      }
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {
                        veterinarians.find((vet) => vet.id === selectedVet)
                          ?.specialization
                      }{" "}
                      •{" "}
                      {
                        veterinarians.find((vet) => vet.id === selectedVet)
                          ?.consultationFee
                      }
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Pet Name *
                </label>
                <Input
                  placeholder="Enter your pet's name"
                  value={formData.petName}
                  onChange={(e) => handleInputChange("petName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Owner Name *
                </label>
                <Input
                  placeholder="Enter your name"
                  value={formData.ownerName}
                  onChange={(e) =>
                    handleInputChange("ownerName", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Phone Number *
                </label>
                <Input
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Consultation Type *
                </label>
                <Select
                  value={formData.consultationType}
                  onValueChange={(value) =>
                    handleInputChange("consultationType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select consultation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Checkup</SelectItem>
                    <SelectItem value="vaccination">Vaccination</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="surgery">
                      Surgery Consultation
                    </SelectItem>
                    <SelectItem value="dental">Dental Care</SelectItem>
                    <SelectItem value="skin">Skin & Allergies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Preferred Date *
                </label>
                <Input
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) =>
                    handleInputChange("appointmentDate", e.target.value)
                  }
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Preferred Time *
                </label>
                <Select
                  value={formData.appointmentTime}
                  onValueChange={(value) =>
                    handleInputChange("appointmentTime", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Urgency Level
                </label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => handleInputChange("urgency", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Routine Care</SelectItem>
                    <SelectItem value="medium">
                      Medium - Some Concern
                    </SelectItem>
                    <SelectItem value="high">High - Urgent Care</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Symptoms or Concerns
              </label>
              <Textarea
                placeholder="Describe your pet's symptoms or the reason for the visit..."
                rows={3}
                value={formData.symptoms}
                onChange={(e) => handleInputChange("symptoms", e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="text-sm"
              >
                Back
              </Button>
              <Button
                onClick={handleBookAppointment}
                disabled={!isFormValid()}
                className="bg-primary hover:bg-primary/90"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
