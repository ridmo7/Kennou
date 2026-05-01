export interface Video {
  title: string;
  duration: string;
}

export interface Module {
  id: string;
  num: string;
  title: string;
  description: string;
  videos: Video[];
}

export const MODULES: Module[] = [
  {
    id: "emotional-intelligence",
    num: "01",
    title: "Emotional Intelligence",
    description: "Understanding yourself and others in professional settings. Learn how to read rooms, manage your reactions, and build empathy in the workplace.",
    videos: [
      { title: "What is Emotional Intelligence?", duration: "15:30" },
      { title: "Self-Awareness in Professional Settings", duration: "14:20" },
      { title: "Managing Emotions Under Pressure", duration: "16:45" },
    ],
  },
  {
    id: "interview-mastery",
    num: "02",
    title: "Interview Mastery",
    description: "Frameworks, techniques, and structured practice that will genuinely prepare you for corporate interviews at top firms.",
    videos: [
      { title: "The STAR Method Deep Dive", duration: "18:00" },
      { title: "Competency-Based Questions", duration: "15:45" },
      { title: "Strengths-Based Interviews", duration: "14:30" },
      { title: "How to Close an Interview", duration: "12:00" },
    ],
  },
  {
    id: "professional-networking",
    num: "03",
    title: "Professional Networking",
    description: "Building genuine connections without feeling fake. Learn how to approach people, follow up, and create real professional relationships.",
    videos: [
      { title: "Networking is Not What You Think", duration: "13:20" },
      { title: "How to Approach Anyone", duration: "14:50" },
      { title: "Following Up & Staying Connected", duration: "12:10" },
    ],
  },
  {
    id: "communication-presence",
    num: "04",
    title: "Communication & Presence",
    description: "Speaking clearly, presenting confidently, and owning the room — whether it's a meeting, a presentation, or a casual conversation.",
    videos: [
      { title: "Finding Your Professional Voice", duration: "15:00" },
      { title: "Presentation Skills Crash Course", duration: "18:30" },
      { title: "Active Listening & Asking Questions", duration: "13:45" },
    ],
  },
  {
    id: "corporate-culture",
    num: "05",
    title: "Corporate Culture",
    description: "The unwritten rules nobody tells you about. Understand office dynamics, hierarchies, and how to navigate them authentically.",
    videos: [
      { title: "Unspoken Rules of Corporate Life", duration: "16:20" },
      { title: "Managing Up & Building Relationships", duration: "14:40" },
    ],
  },
  {
    id: "personal-branding",
    num: "06",
    title: "Personal Branding",
    description: "Your CV, LinkedIn presence, and the story that makes people remember you. Craft a narrative that opens doors.",
    videos: [
      { title: "CV That Gets Past the Filter", duration: "15:10" },
      { title: "LinkedIn: Your Digital First Impression", duration: "13:50" },
      { title: "Telling Your Story Authentically", duration: "16:00" },
    ],
  },
];

export function getModuleById(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}
