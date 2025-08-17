import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  TrendingUp,
  Clock,
  Heart,
  MessageCircle,
  Search,
  Filter,
  MapPin,
  PlusCircle,
} from "lucide-react";
import { CommunityPostCard } from "./CommunityPostCard";
import { NewPostDialog } from "./NewPostDialog";
import { 
  sampleCommunityPosts, 
  communityUsers, 
  getPostsByCategory, 
  getPopularPosts, 
  getRecentPosts,
  CommunityPost 
} from "@/data/communityData";
import { cn } from "@/lib/utils";

interface CommunityProps {
  className?: string;
}

export function Community({ className }: CommunityProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Community stats
  const stats = {
    totalMembers: communityUsers.length,
    totalPosts: sampleCommunityPosts.length,
    totalEngagement: sampleCommunityPosts.reduce((acc, post) => acc + post.likes + post.comments.length, 0),
  };

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = [...sampleCommunityPosts];

    // Filter by category
    if (selectedCategory !== "all") {
      posts = getPostsByCategory(selectedCategory as CommunityPost["category"]);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post => 
        post.content.toLowerCase().includes(query) ||
        post.user.name.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort posts
    if (sortBy === "popular") {
      posts = getPopularPosts().filter(post => posts.includes(post));
    } else {
      posts = getRecentPosts().filter(post => posts.includes(post));
    }

    return posts;
  }, [selectedCategory, searchQuery, sortBy]);

  const categories = [
    { value: "all", label: "All Posts", count: sampleCommunityPosts.length },
    { value: "general", label: "General", count: getPostsByCategory("general").length },
    { value: "health", label: "Health", count: getPostsByCategory("health").length },
    { value: "training", label: "Training", count: getPostsByCategory("training").length },
    { value: "adoption", label: "Adoption", count: getPostsByCategory("adoption").length },
    { value: "events", label: "Events", count: getPostsByCategory("events").length },
    { value: "tips", label: "Tips", count: getPostsByCategory("tips").length },
  ];

  const handleNewPost = (post: Partial<CommunityPost>) => {
    // In a real app, this would make an API call
    console.log("New post created:", post);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Community Header */}
      <div className="space-y-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Pet Community
            </h1>
            <p className="text-muted-foreground mt-1">
              Connect, share, and learn with fellow pet parents
            </p>
          </div>
          <NewPostDialog />
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-card border-border">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="text-lg font-semibold text-foreground">
                  {stats.totalMembers}
                </div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-card border-border">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-lg font-semibold text-foreground">
                  {stats.totalPosts}
                </div>
                <div className="text-sm text-muted-foreground">Community Posts</div>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-card border-border">
            <div className="flex items-center space-x-3">
              <Heart className="h-5 w-5 text-red-400" />
              <div>
                <div className="text-lg font-semibold text-foreground">
                  {stats.totalEngagement}
                </div>
                <div className="text-sm text-muted-foreground">Total Engagement</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs and Filters */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="local">Local</TabsTrigger>
          </TabsList>

          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{category.label}</span>
                      <Badge variant="secondary" className="ml-2">
                        {category.count}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(value: "recent" | "popular") => setSortBy(value)}>
              <SelectTrigger className="w-full md:w-32">
                {sortBy === "recent" ? (
                  <Clock className="h-4 w-4 mr-2" />
                ) : (
                  <TrendingUp className="h-4 w-4 mr-2" />
                )}
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <CommunityPostCard key={post.id} post={post} />
                ))
              ) : (
                <Card className="p-8 bg-card border-border text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No posts found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or be the first to share something!
                  </p>
                  <NewPostDialog 
                    trigger={
                      <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create First Post
                      </Button>
                    }
                  />
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Active Community Members */}
              <Card className="p-4 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Active Members
                </h3>
                <div className="space-y-3">
                  {communityUsers.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {user.name}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {user.location}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {user.petCount} {user.petCount === 1 ? "pet" : "pets"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Popular Tags */}
              <Card className="p-4 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Trending Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["goldenretriever", "rescue", "training", "health", "dogbeach", "kitten", "adoption", "tips"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(`#${tag}`)}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Community Guidelines */}
              <Card className="p-4 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Community Guidelines
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <span>•</span>
                    <span>Be kind and respectful to all members</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span>•</span>
                    <span>Share relevant pet-related content</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span>•</span>
                    <span>Help others with advice and support</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span>•</span>
                    <span>Report inappropriate content</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="following" className="space-y-4">
          <Card className="p-8 bg-card border-border text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Following Feed
            </h3>
            <p className="text-muted-foreground">
              Follow other community members to see their posts here
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="local" className="space-y-4">
          <Card className="p-8 bg-card border-border text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Local Community
            </h3>
            <p className="text-muted-foreground">
              Connect with pet parents in your area
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
