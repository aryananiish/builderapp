import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Image as ImageIcon,
  MapPin,
  Hash,
  X,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CommunityPost } from "@/data/communityData";

interface NewPostDialogProps {
  trigger?: React.ReactNode;
  onPostCreate?: (post: Partial<CommunityPost>) => void;
}

export function NewPostDialog({ trigger, onPostCreate }: NewPostDialogProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [category, setCategory] =
    useState<CommunityPost["category"]>("general");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    {
      value: "general",
      label: "General",
      description: "General pet discussions",
    },
    { value: "health", label: "Health", description: "Health tips and advice" },
    {
      value: "training",
      label: "Training",
      description: "Training tips and progress",
    },
    {
      value: "adoption",
      label: "Adoption",
      description: "Adoption stories and opportunities",
    },
    { value: "events", label: "Events", description: "Local pet events" },
    { value: "tips", label: "Tips", description: "Helpful pet care tips" },
    {
      value: "lost-found",
      label: "Lost & Found",
      description: "Missing or found pets",
    },
  ] as const;

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      const newPost: Partial<CommunityPost> = {
        content: content.trim(),
        category,
        location: location.trim() || undefined,
        tags,
        images: images.length > 0 ? images : undefined,
        timestamp: new Date().toISOString(),
      };

      onPostCreate?.(newPost);

      // Reset form
      setContent("");
      setCategory("general");
      setLocation("");
      setTags([]);
      setImages([]);
      setOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = () => {
    // In a real app, this would handle file upload
    // For now, we'll simulate adding a placeholder image
    const placeholderImages = [
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
      "https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
      "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
    ];

    const randomImage =
      placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    setImages([...images, randomImage]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Post
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-semibold text-foreground">You</h4>
              <p className="text-xs text-muted-foreground">
                Share with the community
              </p>
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Category
            </label>
            <Select
              value={category}
              onValueChange={(value: CommunityPost["category"]) =>
                setCategory(value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div>
                      <div className="font-medium">{cat.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {cat.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              What's on your mind?
            </label>
            <textarea
              placeholder="Share your thoughts, ask questions, or tell a story about your pets..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 bg-card border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              rows={4}
            />
            <div className="text-xs text-muted-foreground mt-1">
              {content.length}/500 characters
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Location (optional)
            </label>
            <input
              type="text"
              placeholder="Add your location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block flex items-center">
              <Hash className="h-4 w-4 mr-1" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                className="flex-1 p-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddTag}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block flex items-center">
              <ImageIcon className="h-4 w-4 mr-1" />
              Photos
            </label>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-black/80"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={handleImageUpload}
              className="w-full"
            >
              <Camera className="h-4 w-4 mr-2" />
              Add Photo (Demo)
            </Button>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
