export interface CommunityUser {
  id: string;
  name: string;
  avatar: string;
  location?: string;
  petCount: number;
  memberSince: string;
  bio?: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  user: CommunityUser;
  content: string;
  images?: string[];
  tags: string[];
  category:
    | "general"
    | "health"
    | "training"
    | "lost-found"
    | "adoption"
    | "events"
    | "tips";
  likes: number;
  comments: CommunityComment[];
  timestamp: string;
  location?: string;
}

export interface CommunityComment {
  id: string;
  userId: string;
  user: CommunityUser;
  content: string;
  timestamp: string;
  likes: number;
}

export const communityUsers: CommunityUser[] = [
  {
    id: "user-1",
    name: "Sarah Johnson",
    avatar:
      "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    location: "Mumbai, Maharashtra",
    petCount: 2,
    memberSince: "2023-03-15",
    bio: "Dog mom to Max and Luna. Love hiking with my furry friends! 🐕🐱",
  },
  {
    id: "user-2",
    name: "Mike Chen",
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    location: "Bangalore, Karnataka",
    petCount: 1,
    memberSince: "2023-01-22",
    bio: "First-time cat owner learning every day. Always open to advice!",
  },
  {
    id: "user-3",
    name: "Emma Rodriguez",
    avatar:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    location: "Pune, Maharashtra",
    petCount: 3,
    memberSince: "2022-11-08",
    bio: "Rescue volunteer and proud mama of 2 dogs and 1 cat ❤️",
  },
  {
    id: "user-4",
    name: "David Park",
    avatar:
      "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    location: "Delhi, Delhi",
    petCount: 1,
    memberSince: "2023-08-03",
    bio: "Golden Retriever enthusiast. Love sharing training tips!",
  },
  {
    id: "user-5",
    name: "Lisa Thompson",
    avatar:
      "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
    location: "Chennai, Tamil Nadu",
    petCount: 2,
    memberSince: "2022-06-12",
    bio: "Veterinary technician sharing health tips for your pets 🩺",
  },
];

export const sampleCommunityPosts: CommunityPost[] = [
  {
    id: "post-1",
    userId: "user-1",
    user: communityUsers[0],
    content:
      "Just had the most amazing day at the dog beach with Max! 🏖️ He made so many new friends and even learned to fetch in the water. Any other Mumbai Metropolitan Area dog parents have favorite beach spots to share?",
    images: [
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
    ],
    tags: ["dogbeach", "mumbai", "goldenretriever", "socialization"],
    category: "general",
    likes: 24,
    comments: [
      {
        id: "comment-1",
        userId: "user-4",
        user: communityUsers[3],
        content:
          "Looks like so much fun! Marine Drive is another great spot if you haven't tried it yet.",
        timestamp: "2024-01-20T14:30:00Z",
        likes: 5,
      },
      {
        id: "comment-2",
        userId: "user-3",
        user: communityUsers[2],
        content:
          "Max looks so happy! We love Juhu Beach on weekdays when it's less crowded.",
        timestamp: "2024-01-20T15:45:00Z",
        likes: 3,
      },
    ],
    timestamp: "2024-01-20T10:15:00Z",
    location: "Mumbai, Maharashtra",
  },
  {
    id: "post-2",
    userId: "user-5",
    user: communityUsers[4],
    content:
      "💡 Pro tip for new pet parents: Start dental care early! Many pets develop dental issues by age 3. Daily brushing or dental chews can make a huge difference. What dental routine works for your pets?",
    tags: ["health", "dental", "tips", "prevention"],
    category: "health",
    likes: 31,
    comments: [
      {
        id: "comment-3",
        userId: "user-2",
        user: communityUsers[1],
        content:
          "Thank you for this! My vet just recommended starting this with my kitten. Any specific products you recommend?",
        timestamp: "2024-01-19T16:20:00Z",
        likes: 2,
      },
      {
        id: "comment-4",
        userId: "user-1",
        user: communityUsers[0],
        content:
          "We use enzymatic toothpaste and it's been great! Max actually enjoys the chicken flavor.",
        timestamp: "2024-01-19T17:10:00Z",
        likes: 4,
      },
    ],
    timestamp: "2024-01-19T09:30:00Z",
  },
  {
    id: "post-3",
    userId: "user-3",
    user: communityUsers[2],
    content:
      "🎉 Update on Bella! Remember the shy rescue I posted about last month? Look at her now - confident, playful, and the best snuggle buddy. Patience and love really do work miracles. To anyone considering rescue adoption, these babies just need time to trust again. ❤️",
    images: [
      "https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
    ],
    tags: ["rescue", "adoption", "transformation", "patience"],
    category: "adoption",
    likes: 45,
    comments: [
      {
        id: "comment-5",
        userId: "user-5",
        user: communityUsers[4],
        content:
          "This makes my heart so full! Bella looks so content and happy. You're amazing for giving her a chance.",
        timestamp: "2024-01-18T20:15:00Z",
        likes: 8,
      },
      {
        id: "comment-6",
        userId: "user-4",
        user: communityUsers[3],
        content:
          "What a beautiful transformation story! Thank you for sharing and inspiring others to consider rescue.",
        timestamp: "2024-01-18T21:30:00Z",
        likes: 6,
      },
    ],
    timestamp: "2024-01-18T18:45:00Z",
    location: "Pune, Maharashtra",
  },
  {
    id: "post-4",
    userId: "user-4",
    user: communityUsers[3],
    content:
      "Training win! 🏆 After 3 weeks of consistent practice, Zeus finally mastered the 'stay' command at the dog park with distractions. The key was starting small at home and gradually increasing the difficulty. Persistence pays off!",
    images: [
      "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2",
    ],
    tags: ["training", "stay", "consistency", "progress"],
    category: "training",
    likes: 18,
    comments: [
      {
        id: "comment-7",
        userId: "user-1",
        user: communityUsers[0],
        content:
          "That's awesome! Zeus looks so focused. We're working on the same command - any specific techniques that helped?",
        timestamp: "2024-01-17T14:45:00Z",
        likes: 3,
      },
    ],
    timestamp: "2024-01-17T12:20:00Z",
    location: "Delhi, Delhi",
  },
  {
    id: "post-5",
    userId: "user-2",
    user: communityUsers[1],
    content:
      "Question for experienced cat parents: My 6-month-old kitten Mochi has started knocking things off my desk. Is this normal behavior or should I be concerned? Any tips to redirect this energy? 😅",
    tags: ["kitten", "behavior", "help", "advice"],
    category: "general",
    likes: 12,
    comments: [
      {
        id: "comment-8",
        userId: "user-3",
        user: communityUsers[2],
        content:
          "Totally normal! Cats explore with their paws. Try providing more vertical space and interactive toys to redirect that curiosity.",
        timestamp: "2024-01-16T19:30:00Z",
        likes: 7,
      },
      {
        id: "comment-9",
        userId: "user-5",
        user: communityUsers[4],
        content:
          "Mike, this is classic kitten behavior! They're learning about their environment. Puzzle feeders and climbing trees can help a lot.",
        timestamp: "2024-01-16T20:15:00Z",
        likes: 5,
      },
    ],
    timestamp: "2024-01-16T17:00:00Z",
    location: "Bangalore, Karnataka",
  },
  {
    id: "post-6",
    userId: "user-1",
    user: communityUsers[0],
    content:
      "🌟 Local event alert! Animal Welfare Society is hosting a 'Paws in the Park' adoption event this Saturday from 10am-4pm at Sanjay Gandhi National Park. They'll have adoptable pets, free health screenings, and training demos. Who's going?",
    tags: ["event", "adoption", "animalwelfare", "sanjaygandhipark"],
    category: "events",
    likes: 29,
    comments: [
      {
        id: "comment-10",
        userId: "user-4",
        user: communityUsers[3],
        content:
          "Wish I could be there! Such a great cause. Hope lots of pets find their forever homes.",
        timestamp: "2024-01-15T16:45:00Z",
        likes: 4,
      },
    ],
    timestamp: "2024-01-15T14:30:00Z",
    location: "Mumbai, Maharashtra",
  },
];

export const getPostsByCategory = (category: CommunityPost["category"]) => {
  return sampleCommunityPosts.filter((post) => post.category === category);
};

export const getUserPosts = (userId: string) => {
  return sampleCommunityPosts.filter((post) => post.userId === userId);
};

export const getPopularPosts = () => {
  return [...sampleCommunityPosts].sort((a, b) => b.likes - a.likes);
};

export const getRecentPosts = () => {
  return [...sampleCommunityPosts].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
};
