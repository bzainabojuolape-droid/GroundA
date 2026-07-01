import { useState, useEffect, useRef } from "react";

const LOGO = "data:image/jpeg;base64,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";

const GREENS = {
  deep: "#0a2e1a",
  forest: "#0f3d22",
  mid: "#1a5c35",
  bright: "#2d8653",
  light: "#3db36b",
  pale: "#7dd4a0",
  mint: "#b8f0cc",
  fog: "#e8f9ee",
  white: "#f5fdf7",
};

// ────────────────────────────────────────────────────────────────────
// ICON SYSTEM — plain line-style SVGs, no emoji anywhere in this file.
// Every icon takes size + color (defaults to currentColor via inherit).
// ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.8 }) => {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round",
  };
  const paths = {
    home: <svg {...common}><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" /></svg>,
    community: <svg {...common}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" /><path d="M14.5 15.2c2.7.3 4.5 2 4.5 4.8" /></svg>,
    mentor: <svg {...common}><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" /><path d="M5 9h14M5 14h14" /></svg>,
    opportunities: <svg {...common}><rect x="3" y="9" width="18" height="11" rx="1.5" /><path d="M8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" /><path d="M3 13h18" /></svg>,
    profile: <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>,
    crane: <svg {...common}><path d="M5 21V6l8-3v18" /><path d="M13 6h7l-2.5 4" /><path d="M17 10v5" /><path d="M2 21h20" /><circle cx="17" cy="16" r="1.3" fill={color} stroke="none" /></svg>,
    ruler: <svg {...common}><rect x="3" y="8" width="18" height="8" rx="1" /><path d="M7 8v3M11 8v3M15 8v3M19 8v3" /></svg>,
    blueprint: <svg {...common}><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>,
    hammer: <svg {...common}><path d="M14.5 5.5 18.5 9.5" /><path d="M3 21l7.5-7.5" /><path d="M12.5 7.5 16 4l4 4-3.5 3.5z" /></svg>,
    drill: <svg {...common}><rect x="3" y="9" width="9" height="6" rx="1" /><path d="M12 10h4l3 2-3 2h-4" /><path d="M19 12h2" /></svg>,
    cert: <svg {...common}><circle cx="12" cy="9" r="6" /><path d="M9 14.5 7.5 21l4.5-2.5 4.5 2.5-1.5-6.5" /></svg>,
    network: <svg {...common}><circle cx="6" cy="6" r="2.3" /><circle cx="18" cy="6" r="2.3" /><circle cx="12" cy="18" r="2.3" /><path d="M7.8 7.3 10.5 16M16.2 7.3 13.5 16M8.3 6h7.4" /></svg>,
    building2: <svg {...common}><rect x="5" y="3" width="9" height="18" rx="1" /><rect x="14" y="9" width="5" height="12" rx="1" /><path d="M8 7h2M8 11h2M8 15h2" /></svg>,
    chart: <svg {...common}><path d="M4 20V10M10 20V4M16 20v-7M21 20H3" /></svg>,
    trophy: <svg {...common}><path d="M8 4h8v5a4 4 0 0 1-8 0V4z" /><path d="M5 6H3.5A1.5 1.5 0 0 0 2 7.5 3.5 3.5 0 0 0 5.5 11" /><path d="M19 6h1.5A1.5 1.5 0 0 1 22 7.5 3.5 3.5 0 0 1 18.5 11" /><path d="M12 13v4M9 21h6M10 17h4v4h-4z" /></svg>,
    badge: <svg {...common}><circle cx="12" cy="9" r="5.5" /><path d="M9 14 7.5 21l4.5-2.5 4.5 2.5L15 14" /><path d="M9.5 9l1.7 1.7L14.5 7" /></svg>,
    star: <svg {...common}><path d="M12 3.5l2.6 5.4 5.9.7-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.7z" /></svg>,
    sparkle: <svg {...common}><path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.5 6.5l2.5 2.5M15 15l2.5 2.5M6.5 17.5L9 15M15 9l2.5-2.5" /></svg>,
    location: <svg {...common}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.3" /></svg>,
    clock: <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>,
    money: <svg {...common}><rect x="2.5" y="6" width="19" height="12" rx="1.5" /><circle cx="12" cy="12" r="2.8" /><path d="M6 9v.01M18 15v.01" /></svg>,
    send: <svg {...common}><path d="M3 11.5 21 4l-7.5 18-3-7.5L3 11.5z" /></svg>,
    search: <svg {...common}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M19.5 19.5 15.5 15.5" /></svg>,
    bell: <svg {...common}><path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10z" /><path d="M10 18.5a2 2 0 0 0 4 0" /></svg>,
    arrow: <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
    check: <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9" /></svg>,
    camera: <svg {...common}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7l1.5-3h3L15 7" /><circle cx="12" cy="13.5" r="3.5" /></svg>,
    link: <svg {...common}><path d="M9 15l6-6" /><path d="M11 6.5l1-1a3.5 3.5 0 1 1 5 5l-1 1" /><path d="M13 17.5l-1 1a3.5 3.5 0 1 1-5-5l1-1" /></svg>,
    heartOutline: <svg {...common}><path d="M12 20s-7.5-4.8-9.5-9.5C1.2 7 3.2 4 6.5 4c2 0 3.5 1.2 5.5 3.5C14 5.2 15.5 4 17.5 4 20.8 4 22.8 7 21.5 10.5 19.5 15.2 12 20 12 20z" /></svg>,
    heartFilled: <svg {...common} fill={color}><path d="M12 20s-7.5-4.8-9.5-9.5C1.2 7 3.2 4 6.5 4c2 0 3.5 1.2 5.5 3.5C14 5.2 15.5 4 17.5 4 20.8 4 22.8 7 21.5 10.5 19.5 15.2 12 20 12 20z" /></svg>,
    comment: <svg {...common}><path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /></svg>,
    share: <svg {...common}><path d="M7 12.5V20l13-8L7 4v7.5" /></svg>,
    bookmarkOutline: <svg {...common}><path d="M6 3.5h12V21l-6-4-6 4V3.5z" /></svg>,
    bookmarkFilled: <svg {...common} fill={color}><path d="M6 3.5h12V21l-6-4-6 4V3.5z" /></svg>,
    pin: <svg {...common}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.3" /></svg>,
    filter: <svg {...common}><path d="M4 6h16M7 12h10M10 18h4" /></svg>,
    book: <svg {...common}><path d="M4 19.5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14.5" /><path d="M6 21.5h12" /><path d="M4 19.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" /></svg>,
    mail: <svg {...common}><rect x="3" y="5.5" width="18" height="13" rx="1.5" /><path d="M3.5 6.5 12 13l8.5-6.5" /></svg>,
    wrench: <svg {...common}><path d="M14.5 6.5a4 4 0 0 1-5 5L4 17l3 3 5.5-5.5a4 4 0 0 1 5-5l-2.3 2.3-2-.5-.5-2z" /></svg>,
    plant: <svg {...common}><path d="M12 21v-9" /><path d="M12 12c0-4-3-6-7-6 0 4 3 6 7 6z" /><path d="M12 12c0-3.5 2.5-5.5 6-5.5 0 3.5-2.5 5.5-6 5.5z" /></svg>,
    graduation: <svg {...common}><path d="M2 9l10-4.5L22 9l-10 4.5L2 9z" /><path d="M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" /></svg>,
    scaffold: <svg {...common}><path d="M5 21V5M19 21V5M5 9h14M5 15h14M9 5v16M15 5v16" /></svg>,
    handshake: <svg {...common}><path d="M3 11l4-3 3 1.5 2-1 2 1 3-1.5 4 3" /><path d="M7 9l5 5 2-2" /><path d="M3 11l4 5 2-1" /><path d="M21 11l-4 5-2-1" /></svg>,
    rocket: <svg {...common}><path d="M12 2c3 2 5 6 5 10 0 2-1 4-2 5l-3 3-3-3c-1-1-2-3-2-5 0-4 2-8 5-10z" /><circle cx="12" cy="10" r="1.7" /><path d="M9 17l-2.5 4M15 17l2.5 4" /></svg>,
    calendar: <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>,
    download: <svg {...common}><path d="M12 4v11" /><path d="M7.5 11 12 15.5 16.5 11" /><path d="M4 19h16" /></svg>,
    mic: <svg {...common}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></svg>,
    close: <svg {...common}><path d="M6 6l12 12M18 6L6 18" /></svg>,
    document: <svg {...common}><path d="M6 3h8l4 4v14H6V3z" /><path d="M14 3v4h4" /><path d="M9 12h6M9 16h6" /></svg>,
  };
  return paths[name] || null;
};

// Distinct career-stage icons (replacing the original repeated emoji)
const careerStageIcons = {
  "Student (undergrad/SIWES)": "graduation",
  "Recent Graduate (0–2 years)": "plant",
  "Mid-level Professional (3–7 years)": "wrench",
  "Senior Professional (8+ years)": "trophy",
  "Artisan / Skilled Tradesperson": "hammer",
};

// Distinct icons for "what do you want from GroundA" — previously all the
// same repeated bolt glyph, now each option gets its own meaning.
const wantIcons = {
  "A mentor who gets my discipline": "mentor",
  "Job and internship alerts": "bell",
  "Community with women like me": "community",
  "Real talk about site & workplace life": "comment",
  "Badges to prove my skills": "badge",
};

const challengeIcons = {
  "Finding internships or jobs": "search",
  "Lack of professional network": "network",
  "No mentor or senior guidance": "mentor",
  "Getting credentials recognised": "cert",
  "Workplace discrimination or bias": "heartOutline",
};

// Architecture intentionally listed LAST everywhere a discipline list
// appears — it's adjacent to Sandra's department but not part of it.
const disciplineColors = {
  "Building": { bg: "#a8d8bc", text: "#0f3d22" },
  "Quantity Surveying": { bg: "#c8e6d4", text: "#1a5c35" },
  "Urban & Regional Planning": { bg: "#dce8d8", text: "#0a2e1a" },
  "Estate Management": { bg: "#d0e6d8", text: "#0a2e1a" },
  "Architecture": { bg: "#e6efe9", text: "#5c7a68" },
};

const professionalBodies = {
  "Building": "NIOB",
  "Quantity Surveying": "NIQS",
  "Urban & Regional Planning": "NITP",
  "Estate Management": "NIESV",
  "Architecture": "ARCON",
};

const TAG = ({ label, small }) => {
  const style = disciplineColors[label] || { bg: "#c8e6d4", text: "#0f3d22" };
  return (
    <span style={{
      background: style.bg, color: style.text,
      borderRadius: 20, padding: small ? "2px 9px" : "3px 11px",
      fontSize: small ? 9 : 10, fontWeight: 700, letterSpacing: 0.3,
      display: "inline-flex", alignItems: "center", gap: 4,
      border: `1px solid ${style.text}22`
    }}>
      <Icon name="building2" size={small ? 9 : 10} /> {label}
    </span>
  );
};

const opportunities = [
  { id: 1, type: "Job", title: "Junior Quantity Surveyor", org: "Julius Berger Nigeria Plc", location: "Abuja, FCT", discipline: "Quantity Surveying", deadline: "Jul 15, 2025", stipend: "₦180,000/mo", icon: "ruler", tags: ["Full-time", "Entry Level"] },
  { id: 2, type: "Internship", title: "Site Supervision Intern (SIWES)", org: "Gtext Homes", location: "Lagos Island", discipline: "Building", deadline: "Jul 8, 2025", stipend: "₦60,000/mo", icon: "hammer", tags: ["SIWES", "3 months"] },
  { id: 3, type: "Scholarship", title: "NIQS Women in Quantity Surveying Award", org: "Nigerian Institute of Quantity Surveyors", location: "Nationwide", discipline: "Quantity Surveying", deadline: "Aug 1, 2025", stipend: "₦500,000", icon: "cert", tags: ["Scholarship", "Female only"] },
  { id: 4, type: "Event", title: "NIOB Lagos Annual Builders' Conference 2025", org: "Nigerian Institute of Building", location: "Eko Hotel, VI", discipline: "Building", deadline: "Jul 20, 2025", stipend: "Free entry", icon: "network", tags: ["Networking", "CPD"] },
  { id: 5, type: "Job", title: "Site Engineer – Residential", org: "Mixta Africa", location: "Lekki Phase 2", discipline: "Building", deadline: "Jul 12, 2025", stipend: "₦250,000/mo", icon: "crane", tags: ["Full-time", "2yrs exp"] },
  { id: 6, type: "Scholarship", title: "AfDB Women in Infrastructure Grant", org: "African Development Bank", location: "Remote", discipline: "Quantity Surveying", deadline: "Sep 1, 2025", stipend: "$3,000 USD", icon: "building2", tags: ["International", "Postgrad"] },
  { id: 7, type: "Internship", title: "Urban Planning Intern", org: "Lagos State Physical Planning Authority", org_short: "LASPPPA", location: "Alausa, Ikeja", discipline: "Urban & Regional Planning", deadline: "Jul 25, 2025", stipend: "₦45,000/mo", icon: "chart", tags: ["Gov't", "6 months"] },
  { id: 8, type: "Job", title: "Estate Officer", org: "Alpha Mead Facilities", location: "Victoria Island", discipline: "Estate Management", deadline: "Jul 18, 2025", stipend: "₦300,000/mo", icon: "building2", tags: ["Full-time", "3yrs exp"] },
  { id: 9, type: "Internship", title: "Architectural Drafting Intern", org: "TAK Architects", location: "Ikoyi, Lagos", discipline: "Architecture", deadline: "Jul 22, 2025", stipend: "₦50,000/mo", icon: "blueprint", tags: ["SIWES", "3 months"] },
];

const communityPosts = [
  {
    id: 1, name: "Adaeze Okonkwo", role: "Site Supervisor", discipline: "Building",
    org: "Costain West Africa, Lagos", avatar: "AO", time: "2h ago",
    content: "Just wrapped up the site inspection on that Ibeju-Lekki housing project. Three years in the field and I still have to prove myself on day one of every new site. Ladies — document everything. Your site reports are your receipts.",
    likes: 84, comments: 12, tags: ["#SiteLife", "#Building"]
  },
  {
    id: 2, name: "Ngozi Eze", role: "QS Consultant", discipline: "Quantity Surveying",
    org: "FMW&H, Abuja", avatar: "NE", time: "5h ago",
    content: "Attended the NIQS symposium yesterday. Out of 200 registered attendees, 23 were women. This is exactly why GroundA needs to exist. We are here. We just need the visibility.",
    likes: 127, comments: 31, tags: ["#NIQS", "#WomenInConstruction"]
  },
  {
    id: 3, name: "Chidinma Obi", role: "Final Year Student", discipline: "Building",
    org: "UNILAG", avatar: "CO", time: "1d ago",
    content: "My mentor Mrs. Afolabi just helped me rewrite my CV and pointed me to three internships I didn't even know existed. If you're a student and you're not on GroundA yet, what are you waiting for?",
    likes: 203, comments: 47, tags: ["#Mentorship", "#UNILAG"]
  },
];

// Architecture story intentionally LAST in this array — order here drives
// display order everywhere Ground Truth stories appear.
const groundTruthStories = [
  {
    id: 1, icon: "scaffold", title: "Your First Day on Site",
    author: "Amara Suleiman", role: "Site Engineer · Abuja", discipline: "Building",
    preview: "Nobody told me I needed steel-toe boots on my first day at the Maitama housing scheme. The site foreman — a man who had been on sites for 20 years — looked me up and down and said 'madam, this is not an office.' I went home that night and bought the boots, the hi-vis, the hard hat. I came back the next morning before everyone else. I never gave him a reason to say it again.",
    tags: ["First Day", "Site Safety", "Abuja"],
    reads: "2.1k reads"
  },
  {
    id: 2, icon: "ruler", title: "Negotiating Your First Salary",
    author: "Blessing Adeyemi", role: "Quantity Surveyor · Lagos", discipline: "Quantity Surveying",
    preview: "When Perchstone offered me ₦120,000 for a junior QS role in 2022, I nearly said yes immediately. My senior at UNILAG pulled me aside. She said 'Blessing, they budgeted ₦180,000. They always offer less to women first.' I went back and asked for ₦175,000. I got ₦165,000. That conversation was worth ₦45,000 a month. Find your Aunties. They exist.",
    tags: ["Salary", "Negotiation", "QS"],
    reads: "3.4k reads"
  },
  {
    id: 3, icon: "chart", title: "Reading a City Before You Plan It",
    author: "Halima Bello", role: "Urban Planner · Abuja", discipline: "Urban & Regional Planning",
    preview: "My first field survey for a master plan, I sat in a community meeting in Karu and just listened for two hours before I said a word. The senior planner with me told me afterward: 'you'll write better plans the less you assume.' That stuck. People know their own streets better than any zoning map does.",
    tags: ["Fieldwork", "Planning", "Abuja"],
    reads: "1.6k reads"
  },
  {
    id: 4, icon: "blueprint", title: "The Ikorodu Community Clinic Project",
    author: "Fatima Danladi", role: "Architect · Lagos", discipline: "Architecture",
    preview: "I was the only woman on the project team for the Ikorodu PHC renovation — the contractor, the client rep, the M&E engineer, everyone else was male. In the first site meeting they addressed every question to my male colleague, even when I had drawn the plans. By week three I started sending meeting minutes within the hour of every meeting. By week six they were asking me directly. Competence is not enough — visibility is a skill you have to build intentionally.",
    tags: ["Project Life", "Ikorodu", "Architecture"],
    reads: "5.7k reads"
  },
];

const badges = [
  { id: 1, icon: "scaffold", name: "Foundation Builder", desc: "Completed profile setup", earned: true },
  { id: 2, icon: "mentor", name: "First Rung", desc: "Attended first mentorship session", earned: true },
  { id: 3, icon: "blueprint", name: "Blueprint Ready", desc: "CV submitted via GroundA", earned: true },
  { id: 4, icon: "star", name: "Community Pillar", desc: "First community post", earned: false },
  { id: 5, icon: "cert", name: "Site Certified", desc: "Completed Ground Truth: Site Safety", earned: false },
  { id: 6, icon: "trophy", name: "Top Structure", desc: "Referred 5 women to GroundA", earned: false },
];

const mentorshipStages = [
  { stage: 1, label: "Matched", desc: "Career goals aligned with mentor", done: true, icon: "handshake" },
  { stage: 2, label: "Discovery", desc: "3 sessions: assess & plan", done: true, icon: "blueprint" },
  { stage: 3, label: "Build", desc: "6 sessions: skills & exposure", done: false, active: true, icon: "hammer" },
  { stage: 4, label: "Launch", desc: "Final sessions: job-ready", done: false, icon: "rocket" },
];

const assessmentQuestions = [
  { q: "What is your current career stage?", options: ["Student (undergrad/SIWES)", "Recent Graduate (0–2 years)", "Mid-level Professional (3–7 years)", "Senior Professional (8+ years)", "Artisan / Skilled Tradesperson"] },
  { q: "Which discipline are you in?", options: ["Building", "Quantity Surveying", "Urban & Regional Planning", "Estate Management", "Architecture"] },
  { q: "What is your biggest career challenge right now?", options: ["Finding internships or jobs", "Lack of professional network", "No mentor or senior guidance", "Getting credentials recognised", "Workplace discrimination or bias"] },
  { q: "What do you most want from GroundA?", options: ["A mentor who gets my discipline", "Job and internship alerts", "Community with women like me", "Real talk about site & workplace life", "Badges to prove my skills"] },
];

// The mentor is a distinct person from the student — Sandra Okafor is the
// student throughout; the mentor is Funke Afolabi.
const MENTOR = {
  name: "Mrs. Funke Afolabi",
  initials: "FA",
  title: "Principal Quantity Surveyor",
  org: "Costain West Africa",
  location: "Lagos, Nigeria",
  years: "14 years experience",
  discipline: "Quantity Surveying",
};

export default function GroundADemo() {
  const [screen, setScreen] = useState("splash");
  const [activeTab, setActiveTab] = useState("home");
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessStep, setAssessStep] = useState(0);
  const [assessAnswers, setAssessAnswers] = useState({});
  const [assessDone, setAssessDone] = useState(false);
  const [notification, setNotification] = useState(null);
  const [badgeCelebration, setBadgeCelebration] = useState(null);
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState(communityPosts);
  const [likedPosts, setLikedPosts] = useState({});
  const [savedOpps, setSavedOpps] = useState({});
  const [filterType, setFilterType] = useState("All");
  const [storyOpen, setStoryOpen] = useState(null);
  const [confetti, setConfetti] = useState([]);
  const notifTimer = useRef(null);

  useEffect(() => {
    if (screen === "main" && activeTab === "home") {
      notifTimer.current = setTimeout(() => {
        setNotification({ msg: "Your mentor confirmed your session", sub: `${MENTOR.name} · Tuesday 4:00 PM`, icon: "calendar" });
        setTimeout(() => setNotification(null), 5000);
      }, 8000);
    }
    return () => clearTimeout(notifTimer.current);
  }, [screen, activeTab]);

  const triggerBadge = (badge) => {
    const particles = Array.from({ length: 18 }, (_, i) => ({
      id: i, x: Math.random() * 300 - 150, y: Math.random() * -200 - 50,
      color: [GREENS.light, GREENS.pale, GREENS.mint, "#d4af37", "#fff"][Math.floor(Math.random() * 5)],
      size: Math.random() * 8 + 4,
    }));
    setConfetti(particles);
    setBadgeCelebration(badge);
    setTimeout(() => { setBadgeCelebration(null); setConfetti([]); }, 3500);
  };

  const submitPost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(), name: "Sandra Okafor", role: "Building Student",
      discipline: "Building", org: "UNILAG", avatar: "SO", time: "Just now",
      content: postText, likes: 0, comments: 0, tags: ["#GroundA"]
    };
    setPosts([newPost, ...posts]);
    setPostText("");
    setTimeout(() => {
      triggerBadge({ icon: "star", name: "Community Pillar", desc: "You posted your first community update!" });
    }, 600);
  };

  const toggleLike = (id) => setLikedPosts(p => ({ ...p, [id]: !p[id] }));
  const toggleSave = (id) => setSavedOpps(p => ({ ...p, [id]: !p[id] }));

  const filteredOpps = filterType === "All" ? opportunities : opportunities.filter(o => o.type === filterType);

  // SPLASH
  if (screen === "splash") {
    return (
      <div onClick={() => setScreen("onboard")} style={{
        minHeight: "100vh", background: `linear-gradient(160deg, ${GREENS.deep} 0%, ${GREENS.forest} 30%, ${GREENS.mid} 65%, ${GREENS.bright} 100%)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        cursor: "pointer", position: "relative", overflow: "hidden", fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: 32,
      }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", borderRadius: "50%", opacity: 0.06,
            width: [300,200,400,150,250,180][i], height: [300,200,400,150,250,180][i],
            background: GREENS.mint,
            top: ["-10%","60%","30%","80%","-5%","45%"][i],
            left: ["-10%","70%","50%","-5%","30%","60%"][i],
          }} />
        ))}
        <div style={{ textAlign: "center", zIndex: 2 }}>
          <div style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}>
            <img src={LOGO} alt="GroundA" style={{ width: 96, height: 96, borderRadius: 22, boxShadow: "0 12px 32px rgba(0,0,0,0.35)" }} />
          </div>
          <div style={{ fontSize: 42, fontWeight: 900, color: "#fff", letterSpacing: -1, lineHeight: 1 }}>Ground<span style={{ color: GREENS.mint }}>A</span></div>
          <div style={{ color: GREENS.pale, fontSize: 13, marginTop: 6, letterSpacing: 1, textTransform: "uppercase" }}>Built for the women who build Nigeria</div>
          <div style={{ marginTop: 48, color: GREENS.mint, fontSize: 13, opacity: 0.8, display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
            <span>Tap to begin</span> <Icon name="arrow" size={13} />
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 24, color: GREENS.pale, fontSize: 10, opacity: 0.5 }}>
          Networking · Mentorship · Opportunities · Community
        </div>
      </div>
    );
  }

  // ONBOARDING
  if (screen === "onboard") {
    return (
      <div style={{
        minHeight: "100vh", background: `linear-gradient(135deg, ${GREENS.forest} 0%, ${GREENS.mid} 60%, ${GREENS.bright} 100%)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 28, fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}>
        <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: 24, padding: 32, maxWidth: 380, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "center" }}><img src={LOGO} alt="GroundA" style={{ width: 52, height: 52, borderRadius: 12 }} /></div>
            <div style={{ fontSize: 26, fontWeight: 900, color: GREENS.deep, letterSpacing: -0.5, marginTop: 6 }}>Welcome to GroundA</div>
            <div style={{ color: GREENS.mid, fontSize: 13, marginTop: 6 }}>Your career in the built environment starts here.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { icon: "mentor", label: "Create your profile", desc: "Name, discipline, career stage" },
              { icon: "blueprint", label: "Take the Career Assessment", desc: "3 minutes — shapes your whole experience" },
              { icon: "handshake", label: "Get matched with a mentor", desc: "By discipline and career stage" },
              { icon: "opportunities", label: "Access opportunities", desc: "Jobs, internships, scholarships, events" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: GREENS.fog, borderRadius: 12, padding: "10px 14px" }}>
                <span style={{ color: GREENS.mid, display: "flex" }}><Icon name={s.icon} size={22} /></span>
                <div>
                  <div style={{ fontWeight: 700, color: GREENS.deep, fontSize: 13 }}>{s.label}</div>
                  <div style={{ color: GREENS.mid, fontSize: 11 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => { setScreen("main"); setShowAssessment(true); }} style={{
            marginTop: 24, width: "100%", background: `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})`,
            color: "#fff", border: "none", borderRadius: 14, padding: "15px 0", fontSize: 15,
            fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <Icon name="rocket" size={16} color="#fff" /> Start My Journey
          </button>
          <div style={{ textAlign: "center", marginTop: 12, color: GREENS.mid, fontSize: 11 }}>
            Already have an account? <span style={{ fontWeight: 700, cursor: "pointer" }}>Sign in →</span>
          </div>
        </div>
      </div>
    );
  }

  // MAIN APP
  const tabs = [
    { key: "home", label: "Home", icon: "home" },
    { key: "community", label: "Community", icon: "community" },
    { key: "mentor", label: "Mentor", icon: "mentor" },
    { key: "opps", label: "Opportunities", icon: "opportunities" },
    { key: "profile", label: "Profile", icon: "profile" },
  ];

  const headerEyebrow = {
    home: { icon: "logo", text: "GroundA" },
    community: { icon: "community", text: "Community" },
    mentor: { icon: "mentor", text: "Mentorship" },
    opps: { icon: "opportunities", text: "Opportunities" },
    profile: { icon: "profile", text: "My Profile" },
  }[activeTab];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: GREENS.fog, minHeight: "100vh", maxWidth: 430, margin: "0 auto", position: "relative", paddingBottom: 80 }}>

      {/* LIVE NOTIFICATION */}
      {notification && (
        <div style={{
          position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
          background: GREENS.deep, color: "#fff", borderRadius: 16, padding: "12px 18px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)", zIndex: 9999, minWidth: 300, maxWidth: 380,
          display: "flex", alignItems: "center", gap: 12, animation: "slideDown 0.4s ease",
        }}>
          <span style={{ color: GREENS.mint, display: "flex" }}><Icon name={notification.icon} size={22} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{notification.msg}</div>
            <div style={{ fontSize: 11, color: GREENS.pale, marginTop: 2 }}>{notification.sub}</div>
          </div>
          <button onClick={() => setNotification(null)} style={{ background: "none", border: "none", color: GREENS.pale, cursor: "pointer", display: "flex" }}><Icon name="close" size={15} /></button>
        </div>
      )}

      {/* BADGE CELEBRATION */}
      {badgeCelebration && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9998,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ position: "relative", overflow: "visible" }}>
            {confetti.map(p => (
              <div key={p.id} style={{
                position: "absolute", width: p.size, height: p.size, background: p.color,
                borderRadius: Math.random() > 0.5 ? "50%" : 2,
                left: "50%", top: "50%", transform: `translate(${p.x}px, ${p.y}px)`,
                transition: "all 1.5s cubic-bezier(0.25,0.46,0.45,0.94)",
                opacity: 0.9,
              }} />
            ))}
            <div style={{
              background: "#fff", borderRadius: 24, padding: 32, textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)", minWidth: 260,
              animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            }}>
              <div style={{ color: GREENS.bright, display: "flex", justifyContent: "center" }}><Icon name={badgeCelebration.icon} size={52} /></div>
              <div style={{ fontSize: 11, color: GREENS.mid, fontWeight: 700, letterSpacing: 1, marginTop: 10, textTransform: "uppercase" }}>Badge Earned</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: GREENS.deep, marginTop: 4 }}>{badgeCelebration.name}</div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{badgeCelebration.desc}</div>
              <button onClick={() => setBadgeCelebration(null)} style={{
                marginTop: 20, background: `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})`,
                color: "#fff", border: "none", borderRadius: 12, padding: "10px 24px",
                fontWeight: 700, cursor: "pointer", fontSize: 13,
              }}>Keep Building</button>
            </div>
          </div>
        </div>
      )}

      {/* CAREER ASSESSMENT MODAL */}
      {showAssessment && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,40,20,0.8)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 24, padding: 28, width: "100%", maxWidth: 390, boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            {!assessDone ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 11, color: GREENS.mid, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "flex", alignItems: "center", gap: 5 }}>
                      <Icon name="blueprint" size={12} /> Career Assessment
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: GREENS.deep }}>Question {assessStep + 1} of {assessmentQuestions.length}</div>
                  </div>
                  <button onClick={() => setShowAssessment(false)} style={{ background: GREENS.fog, border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: GREENS.mid }}><Icon name="close" size={14} /></button>
                </div>
                <div style={{ background: GREENS.fog, borderRadius: 99, height: 6, marginBottom: 20 }}>
                  <div style={{ background: `linear-gradient(90deg, ${GREENS.mid}, ${GREENS.bright})`, borderRadius: 99, height: 6, width: `${((assessStep + 1) / assessmentQuestions.length) * 100}%`, transition: "width 0.4s" }} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: GREENS.deep, marginBottom: 16 }}>
                  {assessmentQuestions[assessStep].q}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {assessmentQuestions[assessStep].options.map((opt, i) => {
                    let iconName = "check";
                    if (assessStep === 0) iconName = careerStageIcons[opt];
                    else if (assessStep === 1) iconName = "building2";
                    else if (assessStep === 2) iconName = challengeIcons[opt];
                    else if (assessStep === 3) iconName = wantIcons[opt];
                    const selected = assessAnswers[assessStep] === opt;
                    return (
                      <button key={i} onClick={() => {
                        setAssessAnswers(p => ({ ...p, [assessStep]: opt }));
                        if (assessStep < assessmentQuestions.length - 1) setAssessStep(s => s + 1);
                        else setAssessDone(true);
                      }} style={{
                        background: selected ? `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})` : GREENS.fog,
                        color: selected ? "#fff" : GREENS.deep,
                        border: `2px solid ${selected ? GREENS.bright : GREENS.mint}`,
                        borderRadius: 12, padding: "11px 16px", fontSize: 13, fontWeight: 600,
                        cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                        display: "flex", alignItems: "center", gap: 10,
                      }}>
                        <span style={{ display: "flex", flexShrink: 0 }}><Icon name={iconName} size={17} /></span> {opt}
                      </button>
                    );
                  })}
                </div>
                {assessStep > 0 && (
                  <button onClick={() => setAssessStep(s => s - 1)} style={{ marginTop: 14, background: "none", border: "none", color: GREENS.mid, fontSize: 12, cursor: "pointer" }}>
                    ← Back
                  </button>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <div style={{ display: "flex", justifyContent: "center" }}><img src={LOGO} alt="GroundA" style={{ width: 56, height: 56, borderRadius: 13 }} /></div>
                <div style={{ fontSize: 20, fontWeight: 900, color: GREENS.deep, marginTop: 10 }}>Assessment Complete</div>
                <div style={{ fontSize: 13, color: "#666", marginTop: 6, lineHeight: 1.5 }}>
                  Based on your responses, we're matching you with a <strong>{assessAnswers[1]}</strong> mentor suited to your stage and goals.
                </div>
                <div style={{ background: GREENS.fog, borderRadius: 14, padding: 16, marginTop: 16, textAlign: "left" }}>
                  <div style={{ fontSize: 11, color: GREENS.mid, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Your Match</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15 }}>{MENTOR.initials}</div>
                    <div>
                      <div style={{ fontWeight: 800, color: GREENS.deep, fontSize: 14 }}>{MENTOR.name}</div>
                      <div style={{ fontSize: 11, color: GREENS.mid }}>{MENTOR.title} · 14 yrs exp · Lagos</div>
                      <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center" }}>
                        <TAG label={assessAnswers[1] || "Building"} small />
                        <span style={{ fontSize: 9, color: GREENS.mid, fontWeight: 700 }}>{professionalBodies[assessAnswers[1]] || professionalBodies["Building"]}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => {
                  setShowAssessment(false);
                  setTimeout(() => triggerBadge({ icon: "blueprint", name: "Blueprint Ready", desc: "Career Assessment completed!" }), 300);
                }} style={{
                  marginTop: 20, width: "100%", background: `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})`,
                  color: "#fff", border: "none", borderRadius: 14, padding: "14px 0",
                  fontWeight: 800, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  <Icon name="handshake" size={16} color="#fff" /> Accept My Mentor
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* GROUND TRUTH STORY MODAL */}
      {storyOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,40,20,0.85)", zIndex: 800, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: "24px 24px 0 0", padding: 28, maxWidth: 430, width: "100%", maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <TAG label={storyOpen.discipline} />
              <button onClick={() => setStoryOpen(null)} style={{ background: GREENS.fog, border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", display: "flex", color: GREENS.mid }}><Icon name="close" size={14} /></button>
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, color: GREENS.deep, lineHeight: 1.3, marginBottom: 8 }}>{storyOpen.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 800 }}>
                {storyOpen.author.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: GREENS.deep, fontSize: 12 }}>{storyOpen.author}</div>
                <div style={{ fontSize: 10, color: GREENS.mid }}>{storyOpen.role}</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: "#333", lineHeight: 1.7, fontStyle: "italic" }}>"{storyOpen.preview}"</div>
            <div style={{ marginTop: 20, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {storyOpen.tags.map(t => (
                <span key={t} style={{ background: GREENS.fog, color: GREENS.mid, borderRadius: 20, padding: "3px 10px", fontSize: 10, fontWeight: 600 }}>#{t}</span>
              ))}
            </div>
            <div style={{ marginTop: 16, color: GREENS.mid, fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name="book" size={12} /> {storyOpen.reads}
            </div>
          </div>
        </div>
      )}

      {/* TOP HEADER */}
      <div style={{
        background: `linear-gradient(135deg, ${GREENS.deep} 0%, ${GREENS.forest} 50%, ${GREENS.mid} 100%)`,
        padding: "20px 20px 24px", color: "#fff",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: GREENS.pale, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, display: "flex", alignItems: "center", gap: 5 }}>
              {headerEyebrow.icon === "logo" ? <img src={LOGO} alt="" style={{ width: 13, height: 13, borderRadius: 3 }} /> : <Icon name={headerEyebrow.icon} size={12} />} {headerEyebrow.text}
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 2 }}>
              {activeTab === "home" && "Good morning, Sandra"}
              {activeTab === "community" && "Women Building Nigeria"}
              {activeTab === "mentor" && "Your Mentorship Journey"}
              {activeTab === "opps" && "Opportunities Hub"}
              {activeTab === "profile" && "Sandra Okafor"}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => setNotification({ msg: "Your mentor confirmed your session", sub: `${MENTOR.name} · Tuesday 4:00 PM`, icon: "calendar" })}
              style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              <Icon name="bell" size={17} />
            </button>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${GREENS.bright}, ${GREENS.pale})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: GREENS.deep }}>SO</div>
          </div>
        </div>
      </div>

      {/* ── HOME TAB ── */}
      {activeTab === "home" && (
        <div style={{ padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              { label: "Sessions Done", value: "2", icon: "mentor", color: GREENS.mid },
              { label: "Badges Earned", value: "3", icon: "badge", color: GREENS.forest },
              { label: "Opps Saved", value: "5", icon: "opportunities", color: GREENS.deep },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 14, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
                <div style={{ color: s.color, display: "flex", justifyContent: "center", marginBottom: 4 }}><Icon name={s.icon} size={22} /></div>
                <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 9, color: "#888", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Mentor card */}
          <div style={{ background: `linear-gradient(135deg, ${GREENS.forest}, ${GREENS.mid})`, borderRadius: 18, padding: 18, marginBottom: 16, color: "#fff" }}>
            <div style={{ fontSize: 10, color: GREENS.mint, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name="mentor" size={11} /> Your Mentor
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${GREENS.bright}, ${GREENS.pale})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: GREENS.deep, fontSize: 15 }}>{MENTOR.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{MENTOR.name}</div>
                <div style={{ fontSize: 11, color: GREENS.pale }}>{MENTOR.title} · {MENTOR.org} · 14 yrs</div>
                <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center" }}>
                  <TAG label="Quantity Surveying" small />
                  <span style={{ fontSize: 9, color: GREENS.mint, fontWeight: 700 }}>NIQS</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 14, background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 11, color: GREENS.mint, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}><Icon name="calendar" size={11} /> Next Session</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>Tuesday, July 8 · 4:00 PM · Google Meet</div>
            </div>
            <button onClick={() => setNotification({ msg: `Message sent to ${MENTOR.name}`, sub: "She'll respond within 24 hours", icon: "mail" })}
              style={{ marginTop: 12, background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="mail" size={13} color="#fff" /> Message Mentor
            </button>
          </div>

          {/* Ground Truth preview */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontWeight: 800, color: GREENS.deep, fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>
                <Icon name="opportunities" size={15} /> Ground Truth
              </div>
              <span style={{ fontSize: 11, color: GREENS.mid, fontWeight: 700, cursor: "pointer" }} onClick={() => setActiveTab("community")}>See all →</span>
            </div>
            {groundTruthStories.slice(0, 2).map(s => (
              <div key={s.id} onClick={() => setStoryOpen(s)} style={{ background: "#fff", borderRadius: 14, padding: 14, marginBottom: 10, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", borderLeft: `4px solid ${GREENS.bright}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <TAG label={s.discipline} small />
                  <span style={{ fontSize: 10, color: "#aaa" }}>{s.reads}</span>
                </div>
                <div style={{ fontWeight: 800, color: GREENS.deep, fontSize: 13, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5 }}>{s.preview.slice(0, 100)}...</div>
                <div style={{ fontSize: 10, color: GREENS.mid, marginTop: 6, fontWeight: 600 }}>by {s.author} · {s.role}</div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Take Assessment", icon: "blueprint", action: () => { setAssessStep(0); setAssessDone(false); setAssessAnswers({}); setShowAssessment(true); } },
              { label: "Browse Jobs", icon: "opportunities", action: () => setActiveTab("opps") },
              { label: "Join Community", icon: "community", action: () => setActiveTab("community") },
              { label: "My Badges", icon: "badge", action: () => setActiveTab("profile") },
            ].map((a, i) => (
              <button key={i} onClick={a.action} style={{
                background: "#fff", border: `2px solid ${GREENS.mint}`, borderRadius: 14,
                padding: "14px 10px", cursor: "pointer", textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}>
                <div style={{ color: GREENS.mid, display: "flex", justifyContent: "center", marginBottom: 6 }}><Icon name={a.icon} size={22} /></div>
                <div style={{ fontSize: 11, fontWeight: 700, color: GREENS.deep }}>{a.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── COMMUNITY TAB ── */}
      {activeTab === "community" && (
        <div style={{ padding: 16 }}>
          <div style={{ background: `linear-gradient(135deg, ${GREENS.deep}, ${GREENS.forest})`, borderRadius: 18, padding: 18, marginBottom: 16, color: "#fff" }}>
            <div style={{ fontSize: 10, color: GREENS.mint, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name="opportunities" size={11} /> Ground Truth
            </div>
            <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 6 }}>Real stories from women on site</div>
            <div style={{ fontSize: 12, color: GREENS.pale, lineHeight: 1.5, marginBottom: 14 }}>The unwritten rules. The real experiences. The guide a trusted senior colleague would give you before your first day.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {groundTruthStories.map(s => (
                <div key={s.id} onClick={() => setStoryOpen(s)} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: 12, cursor: "pointer", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <TAG label={s.discipline} small />
                    <span style={{ fontSize: 9, color: GREENS.pale, display: "flex", alignItems: "center", gap: 4 }}><Icon name="book" size={10} /> {s.reads}</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 3 }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: GREENS.pale, lineHeight: 1.4 }}>{s.preview.slice(0, 90)}... <span style={{ color: GREENS.mint, fontWeight: 700 }}>Read</span></div>
                  <div style={{ fontSize: 10, color: GREENS.mint, marginTop: 6 }}>by {s.author} · {s.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Post Composer */}
          <div style={{ background: "#fff", borderRadius: 18, padding: 16, marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 12, flexShrink: 0 }}>SO</div>
              <div style={{ flex: 1 }}>
                <textarea value={postText} onChange={e => setPostText(e.target.value)}
                  placeholder="Share something with the community..."
                  style={{ width: "100%", border: "none", outline: "none", fontSize: 13, color: GREENS.deep, resize: "none", fontFamily: "inherit", background: "transparent", minHeight: 60 }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, paddingTop: 10, borderTop: `1px solid ${GREENS.fog}` }}>
                  <div style={{ display: "flex", gap: 12, color: GREENS.mid }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", color: "inherit" }}><Icon name="camera" size={16} /></button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", color: "inherit" }}><Icon name="link" size={16} /></button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", color: "inherit" }}><Icon name="document" size={16} /></button>
                  </div>
                  <button onClick={submitPost} style={{
                    background: postText.trim() ? `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})` : GREENS.fog,
                    color: postText.trim() ? "#fff" : "#aaa",
                    border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12,
                    fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <Icon name="send" size={13} /> Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Community Feed */}
          <div style={{ fontSize: 12, color: GREENS.mid, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5, display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="community" size={13} /> Community Feed
          </div>
          {posts.map(p => (
            <div key={p.id} style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 13, flexShrink: 0 }}>{p.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 800, color: GREENS.deep, fontSize: 13 }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: "#888" }}>{p.role} · {p.org}</div>
                    </div>
                    <span style={{ fontSize: 10, color: "#aaa" }}>{p.time}</span>
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <TAG label={p.discipline} small />
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#333", lineHeight: 1.6, marginBottom: 10 }}>{p.content}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                {p.tags.map(t => <span key={t} style={{ background: GREENS.fog, color: GREENS.mid, borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 600 }}>{t}</span>)}
              </div>
              <div style={{ display: "flex", gap: 16, paddingTop: 10, borderTop: `1px solid ${GREENS.fog}` }}>
                <button onClick={() => toggleLike(p.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: likedPosts[p.id] ? GREENS.bright : "#888" }}>
                  <Icon name={likedPosts[p.id] ? "heartFilled" : "heartOutline"} size={15} /> {p.likes + (likedPosts[p.id] ? 1 : 0)}
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#888", fontWeight: 600 }}><Icon name="comment" size={15} /> {p.comments}</button>
                <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#888", fontWeight: 600 }}><Icon name="share" size={15} /> Share</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MENTOR TAB ── */}
      {activeTab === "mentor" && (
        <div style={{ padding: 16 }}>
          <div style={{ background: `linear-gradient(135deg, ${GREENS.deep}, ${GREENS.mid})`, borderRadius: 20, padding: 20, marginBottom: 16, color: "#fff" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: `linear-gradient(135deg, ${GREENS.bright}, ${GREENS.pale})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20, color: GREENS.deep }}>{MENTOR.initials}</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 17 }}>{MENTOR.name}</div>
                <div style={{ fontSize: 12, color: GREENS.pale }}>{MENTOR.title} · {MENTOR.org}</div>
                <div style={{ fontSize: 11, color: GREENS.pale }}>{MENTOR.location} · {MENTOR.years}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center" }}>
                  <TAG label="Quantity Surveying" small />
                  <span style={{ fontSize: 9, color: GREENS.mint, fontWeight: 700 }}>NIQS</span>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[{ n: "14", l: "Yrs Exp" }, { n: "23", l: "Mentees" }, { n: "4.9", l: "Rating" }].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: 10, textAlign: "center" }}>
                  <div style={{ fontWeight: 900, fontSize: 18 }}>{s.n}</div>
                  <div style={{ fontSize: 9, color: GREENS.pale }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Stage Progress Tracker */}
          <div style={{ background: "#fff", borderRadius: 18, padding: 18, marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <div style={{ fontWeight: 800, color: GREENS.deep, fontSize: 15, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="mentor" size={15} /> Mentorship Journey
            </div>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 16 }}>Stage 3 of 4 — Build Phase</div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: 20, left: 20, right: 20, height: 3, background: GREENS.fog, borderRadius: 99, zIndex: 0 }}>
                <div style={{ width: "55%", height: "100%", background: `linear-gradient(90deg, ${GREENS.mid}, ${GREENS.bright})`, borderRadius: 99 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                {mentorshipStages.map((s, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "25%" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: s.done ? `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})` : s.active ? "#fff" : GREENS.fog,
                      border: s.active ? `3px solid ${GREENS.bright}` : s.done ? "none" : `2px solid ${GREENS.mint}`,
                      boxShadow: s.active ? `0 0 0 4px ${GREENS.mint}` : "none",
                      color: s.done ? "#fff" : GREENS.mid,
                    }}>
                      <Icon name={s.done ? "check" : s.icon} size={18} />
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: s.done || s.active ? GREENS.deep : "#aaa", marginTop: 6, textAlign: "center" }}>{s.label}</div>
                    <div style={{ fontSize: 9, color: "#aaa", textAlign: "center", marginTop: 2, lineHeight: 1.3 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sessions */}
          <div style={{ background: "#fff", borderRadius: 18, padding: 16, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
            <div style={{ fontWeight: 800, color: GREENS.deep, fontSize: 14, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="calendar" size={14} /> Sessions
            </div>
            {[
              { date: "Tue Jul 8", time: "4:00 PM", topic: "Portfolio review & site visit prep", status: "upcoming" },
              { date: "Mon Jun 23", time: "3:00 PM", topic: "CV feedback & internship strategy", status: "done" },
              { date: "Wed Jun 11", time: "5:00 PM", topic: "Goal setting & career mapping", status: "done" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 2 ? `1px solid ${GREENS.fog}` : "none" }}>
                <div style={{ color: s.status === "upcoming" ? GREENS.bright : GREENS.mid, display: "flex", alignItems: "center" }}>
                  <Icon name={s.status === "upcoming" ? "blueprint" : "check"} size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: GREENS.deep, fontSize: 12 }}>{s.topic}</div>
                  <div style={{ fontSize: 10, color: "#888" }}>{s.date} · {s.time}</div>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, color: s.status === "upcoming" ? GREENS.bright : "#aaa", background: s.status === "upcoming" ? GREENS.fog : "#f5f5f5", borderRadius: 20, padding: "2px 8px", alignSelf: "center" }}>
                  {s.status === "upcoming" ? "Upcoming" : "Done"}
                </span>
              </div>
            ))}
          </div>

          <button onClick={() => triggerBadge({ icon: "mentor", name: "First Rung", desc: "Attended your first mentorship session!" })}
            style={{ width: "100%", background: `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})`, color: "#fff", border: "none", borderRadius: 14, padding: "14px 0", fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Icon name="calendar" size={15} color="#fff" /> Book Next Session
          </button>
        </div>
      )}

      {/* ── OPPORTUNITIES TAB ── */}
      {activeTab === "opps" && (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: "10px 14px", display: "flex", gap: 8, alignItems: "center", marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
            <span style={{ color: GREENS.mid, display: "flex" }}><Icon name="search" size={16} /></span>
            <input placeholder="Search jobs, internships, scholarships..." style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: GREENS.deep, fontFamily: "inherit" }} />
            <button style={{ background: GREENS.fog, border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", color: GREENS.mid, display: "flex" }}><Icon name="filter" size={14} /></button>
          </div>

          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 14 }}>
            {["All", "Job", "Internship", "Scholarship", "Event"].map(f => (
              <button key={f} onClick={() => setFilterType(f)} style={{
                background: filterType === f ? `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})` : "#fff",
                color: filterType === f ? "#fff" : GREENS.mid, border: `1.5px solid ${filterType === f ? GREENS.bright : GREENS.mint}`,
                borderRadius: 20, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
              }}>
                {f === "All" ? "All" : f === "Job" ? "Jobs" : f === "Internship" ? "Internships" : f === "Scholarship" ? "Scholarships" : "Events"}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 10, color: GREENS.mid, fontWeight: 700, marginBottom: 10 }}>{filteredOpps.length} opportunities found</div>

          {filteredOpps.map(o => (
            <div key={o.id} style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", borderLeft: `4px solid ${o.type === "Job" ? GREENS.mid : o.type === "Internship" ? GREENS.bright : o.type === "Scholarship" ? "#d4af37" : GREENS.light}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap", alignItems: "center" }}>
                    <span style={{
                      background: o.type === "Job" ? GREENS.fog : o.type === "Internship" ? "#e8f4e8" : o.type === "Scholarship" ? "#fef9e7" : "#e8f9ee",
                      color: o.type === "Scholarship" ? "#b8860b" : GREENS.mid,
                      borderRadius: 20, padding: "2px 9px", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5,
                      display: "flex", alignItems: "center", gap: 4,
                    }}>
                      <Icon name={o.type === "Job" ? "ruler" : o.type === "Internship" ? "graduation" : o.type === "Scholarship" ? "trophy" : "calendar"} size={10} /> {o.type}
                    </span>
                    <TAG label={o.discipline} small />
                  </div>
                  <div style={{ fontWeight: 800, color: GREENS.deep, fontSize: 14 }}>{o.title}</div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{o.org_short || o.org}</div>
                </div>
                <button onClick={() => {
                  toggleSave(o.id);
                  if (!savedOpps[o.id]) {
                    setTimeout(() => triggerBadge({ icon: "bookmarkFilled", name: "Opportunity Spotter", desc: `Saved: ${o.title}` }), 200);
                  }
                }} style={{ background: "none", border: "none", cursor: "pointer", color: GREENS.mid, display: "flex" }}>
                  <Icon name={savedOpps[o.id] ? "bookmarkFilled" : "bookmarkOutline"} size={19} />
                </button>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 10 }}>
                <span style={{ fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 4 }}><Icon name="location" size={11} /> {o.location}</span>
                <span style={{ fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 4 }}><Icon name="clock" size={11} /> {o.deadline}</span>
                <span style={{ fontSize: 10, color: GREENS.mid, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}><Icon name="money" size={11} /> {o.stipend}</span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {o.tags.map(t => <span key={t} style={{ background: GREENS.fog, color: GREENS.mid, borderRadius: 20, padding: "2px 9px", fontSize: 9, fontWeight: 600 }}>{t}</span>)}
              </div>
              <button onClick={() => setNotification({ msg: `Applied to ${o.title}`, sub: `${o.org_short || o.org} · Application sent via GroundA`, icon: "send" })}
                style={{ width: "100%", background: `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})`, color: "#fff", border: "none", borderRadius: 10, padding: "10px 0", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── PROFILE TAB ── */}
      {activeTab === "profile" && (
        <div style={{ padding: 16 }}>
          <div style={{ background: `linear-gradient(135deg, ${GREENS.deep}, ${GREENS.forest}, ${GREENS.mid})`, borderRadius: 20, padding: 24, marginBottom: 16, color: "#fff", textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${GREENS.bright}, ${GREENS.pale})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 24, color: GREENS.deep, margin: "0 auto 12px" }}>SO</div>
            <div style={{ fontSize: 20, fontWeight: 900 }}>Sandra Okafor</div>
            <div style={{ fontSize: 12, color: GREENS.pale, marginTop: 2 }}>Building Student</div>
            <div style={{ marginTop: 6 }}><TAG label="Building" small /></div>
            <div style={{ fontSize: 11, color: GREENS.pale, marginTop: 4 }}>University of Lagos · SIWES Year 4</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14 }}>
              <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "3px 10px", fontSize: 10, color: "#fff", fontWeight: 600 }}>UNILAG</span>
              <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "3px 10px", fontSize: 10, color: "#fff", fontWeight: 600 }}>Lagos</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
            {[{ n: "3", l: "Badges", icon: "badge" }, { n: "2", l: "Sessions", icon: "mentor" }, { n: "5", l: "Opps Saved", icon: "opportunities" }].map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 14, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
                <div style={{ color: GREENS.mid, display: "flex", justifyContent: "center", marginBottom: 4 }}><Icon name={s.icon} size={22} /></div>
                <div style={{ fontSize: 22, fontWeight: 900, color: GREENS.mid }}>{s.n}</div>
                <div style={{ fontSize: 10, color: "#888" }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* CV Features */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
            <div style={{ fontWeight: 800, color: GREENS.deep, fontSize: 14, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="blueprint" size={14} /> GroundA CV
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setNotification({ msg: "CV downloaded", sub: "Your GroundA CV includes all 3 badges", icon: "download" })} style={{ flex: 1, background: `linear-gradient(135deg, ${GREENS.mid}, ${GREENS.bright})`, color: "#fff", border: "none", borderRadius: 10, padding: "10px 0", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Icon name="download" size={13} color="#fff" /> Download CV
              </button>
              <button onClick={() => setNotification({ msg: "Interview Prep loaded", sub: "Practice session ready for your role", icon: "mic" })} style={{ flex: 1, background: GREENS.fog, color: GREENS.mid, border: `1.5px solid ${GREENS.mint}`, borderRadius: 10, padding: "10px 0", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Icon name="mic" size={13} /> Interview Prep
              </button>
            </div>
          </div>

          {/* Badges */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
            <div style={{ fontWeight: 800, color: GREENS.deep, fontSize: 14, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="trophy" size={14} /> Achievement Badges
            </div>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 14 }}>3 of 6 earned — verified digital credentials</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {badges.map(b => (
                <div key={b.id} onClick={() => b.earned && triggerBadge(b)} style={{
                  borderRadius: 14, padding: 14, textAlign: "center", cursor: b.earned ? "pointer" : "default",
                  background: b.earned ? `linear-gradient(135deg, ${GREENS.fog}, #fff)` : "#fafafa",
                  border: `2px solid ${b.earned ? GREENS.mint : "#eee"}`,
                  opacity: b.earned ? 1 : 0.5,
                }}>
                  <div style={{ color: b.earned ? GREENS.mid : "#bbb", display: "flex", justifyContent: "center" }}><Icon name={b.icon} size={26} /></div>
                  <div style={{ fontSize: 9, fontWeight: 800, color: b.earned ? GREENS.deep : "#aaa", marginTop: 6, lineHeight: 1.3 }}>{b.name}</div>
                  {b.earned && <div style={{ fontSize: 8, color: GREENS.mid, marginTop: 3 }}>Tap to celebrate</div>}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, background: GREENS.fog, borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: GREENS.mid, fontWeight: 700 }}>Badges auto-added to your GroundA CV</div>
              <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>Share on LinkedIn, COREN profiles & job applications</div>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: `linear-gradient(180deg, ${GREENS.deep} 0%, ${GREENS.forest} 100%)`,
        display: "flex", borderTop: `1px solid ${GREENS.mid}`,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
      }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
            flex: 1, background: "none", border: "none", padding: "10px 0",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer",
            color: activeTab === t.key ? GREENS.mint : GREENS.pale,
            opacity: activeTab === t.key ? 1 : 0.5,
          }}>
            <Icon name={t.icon} size={20} />
            <span style={{ fontSize: 9, fontWeight: 700 }}>{t.label}</span>
            {activeTab === t.key && <div style={{ width: 4, height: 4, borderRadius: "50%", background: GREENS.mint }} />}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes slideDown { from { opacity:0; transform: translateX(-50%) translateY(-20px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
        @keyframes popIn { from { opacity:0; transform: scale(0.7); } to { opacity:1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
