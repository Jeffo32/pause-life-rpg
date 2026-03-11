const { useState, useEffect, useCallback, useRef } = React;

// ─── CONFIG & DATA ───────────────────────────────────────────────────────────


const LIFE_CARDS_POOL = [
  // MIND (17)
  { id: 1, quote: "The obstacle is the way.", category: "Mind", rarity: "rare" },
  { id: 2, quote: "Systems over motivation. Every time.", category: "Mind", rarity: "legendary" },
  { id: 3, quote: "You don't rise to your goals. You fall to your systems.", category: "Mind", rarity: "epic" },
  { id: 4, quote: "Think in decades. Act in days.", category: "Mind", rarity: "epic" },
  { id: 5, quote: "The mind is the battlefield. Win there first.", category: "Mind", rarity: "rare" },
  { id: 6, quote: "Clarity is the ultimate advantage.", category: "Mind", rarity: "legendary" },
  { id: 7, quote: "A calm mind is an unconquerable fortress.", category: "Mind", rarity: "epic" },
  { id: 8, quote: "Simplify. Then simplify again.", category: "Mind", rarity: "rare" },
  { id: 9, quote: "What you do daily matters more than what you do occasionally.", category: "Mind", rarity: "common" },
  { id: 10, quote: "Decision speed is a superpower.", category: "Mind", rarity: "rare" },
  { id: 11, quote: "The quality of your questions determines your life.", category: "Mind", rarity: "epic" },
  { id: 12, quote: "First principles over borrowed opinions.", category: "Mind", rarity: "legendary" },
  { id: 13, quote: "Every pattern you recognize is a weapon.", category: "Mind", rarity: "rare" },
  { id: 14, quote: "Stillness is not inaction. It is preparation.", category: "Mind", rarity: "common" },
  { id: 15, quote: "Your greatest enemy is your undisciplined mind.", category: "Mind", rarity: "epic" },
  { id: 16, quote: "Sit with discomfort. That is where growth hides.", category: "Mind", rarity: "rare" },
  { id: 17, quote: "The map is not the territory. Go explore.", category: "Mind", rarity: "common" },
  // WEALTH (17)
  { id: 18, quote: "Build assets, not just income.", category: "Wealth", rarity: "legendary" },
  { id: 19, quote: "Revenue fixes everything.", category: "Wealth", rarity: "epic" },
  { id: 20, quote: "Your network is your net worth.", category: "Wealth", rarity: "rare" },
  { id: 21, quote: "Create leverage, not dependency.", category: "Wealth", rarity: "legendary" },
  { id: 22, quote: "Money follows attention. Attention follows value.", category: "Wealth", rarity: "epic" },
  { id: 23, quote: "Automate. Delegate. Eliminate. In that order.", category: "Wealth", rarity: "legendary" },
  { id: 24, quote: "The best investment is systems that work without you.", category: "Wealth", rarity: "epic" },
  { id: 25, quote: "Price is what you pay. Value is what you build.", category: "Wealth", rarity: "rare" },
  { id: 26, quote: "Cash flow is oxygen. Never forget it.", category: "Wealth", rarity: "common" },
  { id: 27, quote: "Negotiate from strength, not desperation.", category: "Wealth", rarity: "epic" },
  { id: 28, quote: "Own the distribution, own the game.", category: "Wealth", rarity: "legendary" },
  { id: 29, quote: "Every system you build is a soldier working 24/7.", category: "Wealth", rarity: "rare" },
  { id: 30, quote: "Wealth whispers. Poverty screams.", category: "Wealth", rarity: "epic" },
  { id: 31, quote: "Recurring revenue is recurring freedom.", category: "Wealth", rarity: "rare" },
  { id: 32, quote: "Scale what works. Kill what doesn't.", category: "Wealth", rarity: "legendary" },
  { id: 33, quote: "Your offers should make people feel stupid saying no.", category: "Wealth", rarity: "epic" },
  { id: 34, quote: "The deal you walk away from saves you most.", category: "Wealth", rarity: "common" },
  // BODY (17)
  { id: 35, quote: "Your body is your first business.", category: "Body", rarity: "epic" },
  { id: 36, quote: "Strength is the foundation of all other virtues.", category: "Body", rarity: "legendary" },
  { id: 37, quote: "Comfort is the enemy of achievement.", category: "Body", rarity: "rare" },
  { id: 38, quote: "The iron never lies. Neither does the mirror.", category: "Body", rarity: "epic" },
  { id: 39, quote: "Discipline is choosing what you want most over what you want now.", category: "Body", rarity: "rare" },
  { id: 40, quote: "Train like your life depends on it. It does.", category: "Body", rarity: "legendary" },
  { id: 41, quote: "Recovery is not laziness. It is strategy.", category: "Body", rarity: "common" },
  { id: 42, quote: "The body achieves what the mind believes.", category: "Body", rarity: "rare" },
  { id: 43, quote: "Sleep is the ultimate performance enhancer.", category: "Body", rarity: "epic" },
  { id: 44, quote: "Pain is information. Listen to it.", category: "Body", rarity: "common" },
  { id: 45, quote: "Consistency beats intensity. Every time.", category: "Body", rarity: "rare" },
  { id: 46, quote: "A strong body is a statement of intent.", category: "Body", rarity: "epic" },
  { id: 47, quote: "You do not have to be great to start.", category: "Body", rarity: "common" },
  { id: 48, quote: "Breathe. Brace. Lift. Repeat.", category: "Body", rarity: "rare" },
  { id: 49, quote: "Mobility is freedom your future self will thank you for.", category: "Body", rarity: "epic" },
  { id: 50, quote: "The hardest rep is showing up.", category: "Body", rarity: "legendary" },
  { id: 51, quote: "Your nervous system is the OS. Upgrade it.", category: "Body", rarity: "epic" },
  // CHARISMA (17)
  { id: 52, quote: "Move in silence. Let success make the noise.", category: "Charisma", rarity: "epic" },
  { id: 53, quote: "Be so good they cannot ignore you.", category: "Charisma", rarity: "legendary" },
  { id: 54, quote: "People remember how you made them feel.", category: "Charisma", rarity: "rare" },
  { id: 55, quote: "Your voice is a weapon. Train it.", category: "Charisma", rarity: "epic" },
  { id: 56, quote: "Silence after a statement is more powerful than words.", category: "Charisma", rarity: "legendary" },
  { id: 57, quote: "Energy is contagious. Choose what you spread.", category: "Charisma", rarity: "rare" },
  { id: 58, quote: "The room should change when you enter it.", category: "Charisma", rarity: "epic" },
  { id: 59, quote: "Listen more. Speak less. Mean every word.", category: "Charisma", rarity: "common" },
  { id: 60, quote: "Storytelling is the oldest technology. Master it.", category: "Charisma", rarity: "rare" },
  { id: 61, quote: "A good pitch does not sell. It reveals.", category: "Charisma", rarity: "epic" },
  { id: 62, quote: "Humor disarms. Use it strategically.", category: "Charisma", rarity: "common" },
  { id: 63, quote: "Presence is the rarest gift you can give someone.", category: "Charisma", rarity: "rare" },
  { id: 64, quote: "Frame the conversation. Frame the outcome.", category: "Charisma", rarity: "legendary" },
  { id: 65, quote: "Great communicators make complexity feel simple.", category: "Charisma", rarity: "epic" },
  { id: 66, quote: "Confidence is silent. Insecurity is loud.", category: "Charisma", rarity: "rare" },
  { id: 67, quote: "Your reputation enters the room before you do.", category: "Charisma", rarity: "epic" },
  { id: 68, quote: "Eye contact is a power move. Use it.", category: "Charisma", rarity: "common" },
  // LEADERSHIP (17)
  { id: 69, quote: "Lead from the front. Always.", category: "Leadership", rarity: "legendary" },
  { id: 70, quote: "Sovereignty is earned through competence.", category: "Leadership", rarity: "legendary" },
  { id: 71, quote: "Execution beats intention. Always.", category: "Leadership", rarity: "epic" },
  { id: 72, quote: "Document everything. Memory is unreliable.", category: "Leadership", rarity: "rare" },
  { id: 73, quote: "Great leaders create more leaders, not followers.", category: "Leadership", rarity: "legendary" },
  { id: 74, quote: "Remove one decision from your plate every week.", category: "Leadership", rarity: "epic" },
  { id: 75, quote: "Culture is what happens when you leave the room.", category: "Leadership", rarity: "rare" },
  { id: 76, quote: "Give feedback fast. Receive it faster.", category: "Leadership", rarity: "common" },
  { id: 77, quote: "A system without accountability is a suggestion.", category: "Leadership", rarity: "epic" },
  { id: 78, quote: "Hire slow. Fire fast. Develop always.", category: "Leadership", rarity: "rare" },
  { id: 79, quote: "Delegation without follow-up is abdication.", category: "Leadership", rarity: "legendary" },
  { id: 80, quote: "Your team's ceiling is your leadership's ceiling.", category: "Leadership", rarity: "epic" },
  { id: 81, quote: "Protect your people. They will protect your vision.", category: "Leadership", rarity: "rare" },
  { id: 82, quote: "The right person in the wrong seat is still wrong.", category: "Leadership", rarity: "common" },
  { id: 83, quote: "Lead with questions, not commands.", category: "Leadership", rarity: "epic" },
  { id: 84, quote: "Same standard. Every site. No exceptions.", category: "Leadership", rarity: "rare" },
  { id: 85, quote: "Strategic silence is the most underrated leadership tool.", category: "Leadership", rarity: "legendary" },
  // CREATOR (18)
  { id: 86, quote: "Legacy is built in the quiet hours.", category: "Creator", rarity: "epic" },
  { id: 87, quote: "Create daily. Ship weekly. Compound forever.", category: "Creator", rarity: "legendary" },
  { id: 88, quote: "Every piece of content is a soldier in your army.", category: "Creator", rarity: "epic" },
  { id: 89, quote: "The muse visits those who show up.", category: "Creator", rarity: "rare" },
  { id: 90, quote: "Edit ruthlessly. Your best work hides under your worst.", category: "Creator", rarity: "common" },
  { id: 91, quote: "One viral idea outweighs a thousand mediocre ones.", category: "Creator", rarity: "legendary" },
  { id: 92, quote: "Music is emotion encoded. Encode something real.", category: "Creator", rarity: "epic" },
  { id: 93, quote: "The lens does not lie. Neither should your story.", category: "Creator", rarity: "rare" },
  { id: 94, quote: "Design is how it works, not how it looks.", category: "Creator", rarity: "epic" },
  { id: 95, quote: "Build worlds people want to live in.", category: "Creator", rarity: "legendary" },
  { id: 96, quote: "Every creator steals. Great creators transform.", category: "Creator", rarity: "rare" },
  { id: 97, quote: "Your personal brand is your most valuable IP.", category: "Creator", rarity: "epic" },
  { id: 98, quote: "Consistency of output builds trust at scale.", category: "Creator", rarity: "common" },
  { id: 99, quote: "The best content teaches you something about yourself.", category: "Creator", rarity: "rare" },
  { id: 100, quote: "Ship imperfect work. Perfect work ships never.", category: "Creator", rarity: "epic" },
  { id: 101, quote: "Your archive is your future's goldmine.", category: "Creator", rarity: "rare" },
  { id: 102, quote: "Create the thing you wish existed.", category: "Creator", rarity: "legendary" },
  { id: 103, quote: "Attention is the new currency. Earn it honestly.", category: "Creator", rarity: "epic" },
  // SPIRIT (17)
  { id: 104, quote: "Protect your energy like capital.", category: "Spirit", rarity: "rare" },
  { id: 105, quote: "The grind is the glory.", category: "Spirit", rarity: "rare" },
  { id: 106, quote: "Progress over perfection.", category: "Spirit", rarity: "common" },
  { id: 107, quote: "Every master was once a disaster.", category: "Spirit", rarity: "common" },
  { id: 108, quote: "Gratitude is a weapon against despair.", category: "Spirit", rarity: "epic" },
  { id: 109, quote: "Move mountains by carrying away small stones.", category: "Spirit", rarity: "rare" },
  { id: 110, quote: "Ego is the enemy of growth. Starve it.", category: "Spirit", rarity: "legendary" },
  { id: 111, quote: "Be still. The answers come in silence.", category: "Spirit", rarity: "epic" },
  { id: 112, quote: "Faith without action is decoration.", category: "Spirit", rarity: "rare" },
  { id: 113, quote: "Your identity should be a compass, not a cage.", category: "Spirit", rarity: "epic" },
  { id: 114, quote: "Detach from outcomes. Attach to effort.", category: "Spirit", rarity: "legendary" },
  { id: 115, quote: "The present moment is the only arena that matters.", category: "Spirit", rarity: "rare" },
  { id: 116, quote: "Inner peace is the ultimate flex.", category: "Spirit", rarity: "epic" },
  { id: 117, quote: "Forgiveness is freedom. Give it freely.", category: "Spirit", rarity: "common" },
  { id: 118, quote: "Death awareness sharpens every decision.", category: "Spirit", rarity: "legendary" },
  { id: 119, quote: "Your moral code is your operating system.", category: "Spirit", rarity: "epic" },
  { id: 120, quote: "The quieter you become, the more you can hear.", category: "Spirit", rarity: "rare" },
];

const RARITY_COLORS = {
  common: { bg: "#6b7280", glow: "rgba(107,114,128,0.5)", label: "Common" },
  rare: { bg: "#3b82f6", glow: "rgba(59,130,246,0.6)", label: "Rare" },
  epic: { bg: "#a855f7", glow: "rgba(168,85,247,0.6)", label: "Epic" },
  legendary: { bg: "#f59e0b", glow: "rgba(245,158,11,0.7)", label: "Legendary" },
};

// ─── SVG ICON COMPONENTS ────────────────────────────────────────────────────

const svgBase = { display: "inline-block", verticalAlign: "middle" };

function HelmetIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <path d="M4 14c0-5 3.6-10 8-10s8 5 8 10" /><path d="M4 14h16v2c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-2z" /><line x1="4" y1="12" x2="20" y2="12" />
  </svg>);
}
function ScrollIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" /><line x1="9" y1="9" x2="10" y2="9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" />
  </svg>);
}
function LightningIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" style={svgBase}>
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
  </svg>);
}
function BackpackIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <rect x="5" y="8" width="14" height="14" rx="2" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /><line x1="9" y1="14" x2="15" y2="14" />
  </svg>);
}
function CardIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <polygon points="12,2 22,12 12,22 2,12" /><polygon points="12,6 18,12 12,18 6,12" />
  </svg>);
}
function CrossedSwordsIcon({ size = 12, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" /><line x1="4" y1="4" x2="8" y2="4" /><line x1="4" y1="4" x2="4" y2="8" /><line x1="20" y1="4" x2="16" y2="4" /><line x1="20" y1="4" x2="20" y2="8" />
  </svg>);
}
function BookIcon({ size = 12, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>);
}
function CrystalBallIcon({ size = 12, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <circle cx="12" cy="10" r="8" /><path d="M8 20h8" /><path d="M9 18h6" /><path d="M9 6c2 2 4 2 6 0" />
  </svg>);
}
function CrownIcon({ size = 12, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <path d="M2 20h20L19 8l-5 6-2-8-2 8-5-6z" /><line x1="2" y1="20" x2="22" y2="20" />
  </svg>);
}
function HeartIcon({ size = 12, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" style={svgBase}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>);
}
function CloverIcon({ size = 12, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <circle cx="12" cy="7" r="3" /><circle cx="7" cy="12" r="3" /><circle cx="17" cy="12" r="3" /><circle cx="12" cy="17" r="3" /><line x1="12" y1="20" x2="12" y2="23" />
  </svg>);
}
function SwordIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <line x1="12" y1="2" x2="12" y2="16" /><line x1="9" y1="16" x2="15" y2="16" /><line x1="12" y1="16" x2="12" y2="22" /><line x1="9" y1="22" x2="15" y2="22" /><line x1="8" y1="6" x2="16" y2="6" />
  </svg>);
}
function ShieldIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" />
  </svg>);
}
function GemIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <polygon points="6,3 18,3 22,9 12,22 2,9" /><line x1="2" y1="9" x2="22" y2="9" /><line x1="12" y1="22" x2="8" y2="9" /><line x1="12" y1="22" x2="16" y2="9" /><line x1="6" y1="3" x2="8" y2="9" /><line x1="18" y1="3" x2="16" y2="9" />
  </svg>);
}
function AnvilIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <path d="M4 14h16" /><path d="M6 14v4h12v-4" /><path d="M8 14V8h8v6" /><path d="M4 8h6" /><path d="M14 8h6" /><path d="M10 18v2" /><path d="M14 18v2" />
  </svg>);
}
function KnightIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <path d="M12 2C8 2 5 5 5 9v3h14V9c0-4-3-7-7-7z" /><rect x="3" y="12" width="18" height="4" rx="1" /><line x1="8" y1="16" x2="8" y2="20" /><line x1="16" y1="16" x2="16" y2="20" /><line x1="5" y1="10" x2="19" y2="10" />
  </svg>);
}
function QuillIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <path d="M20 2c-2 2-6 6-8 10l-1 4 4-1c4-2 8-6 10-8" /><path d="M11 12L4 22" />
  </svg>);
}
function BookStackIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <rect x="4" y="3" width="16" height="5" rx="1" /><rect x="4" y="10" width="16" height="5" rx="1" /><rect x="4" y="17" width="16" height="5" rx="1" />
  </svg>);
}
function PinIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
  </svg>);
}
function StandingFigureIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <circle cx="12" cy="4" r="2" /><line x1="12" y1="6" x2="12" y2="16" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="12" y1="16" x2="8" y2="22" /><line x1="12" y1="16" x2="16" y2="22" />
  </svg>);
}
function WavingHandIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <path d="M7 20l3-3" /><path d="M10 17l-5-5c-.7-.7-.7-1.8 0-2.5s1.8-.7 2.5 0l3 3" /><path d="M10.5 12.5l-2-2c-.7-.7-.7-1.8 0-2.5s1.8-.7 2.5 0l2 2" /><path d="M13 10l-1-1c-.7-.7-.7-1.8 0-2.5s1.8-.7 2.5 0l4 4" /><path d="M14.5 8.5l-1-1c-.7-.7-.7-1.8 0-2.5s1.8-.7 2.5 0" /><path d="M18.5 13.5c0 3.6-2.9 6.5-6.5 6.5H10" />
  </svg>);
}
function FireworksIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" /><circle cx="12" cy="12" r="3" />
  </svg>);
}
function FlexArmIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <path d="M4 16c0-2 1-4 3-5l3-2c1-.5 2-.5 3 0" /><path d="M13 9c1-2 3-4 5-4" /><path d="M18 5c1 0 2 1 2 2s-1 3-3 5l-3 2" /><path d="M14 14c-1 2-3 4-6 5" />
  </svg>);
}
function CheckIcon({ size = 12, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <polyline points="4,12 10,18 20,6" />
  </svg>);
}
function CrossIcon({ size = 12, color = "currentColor" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
  </svg>);
}
function CheckCircleIcon({ size = 14, color = "#4a7a3a" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <circle cx="12" cy="12" r="10" /><polyline points="8,12 11,15 16,9" />
  </svg>);
}
function MiscIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
  </svg>);
}
function ChevronIcon({ size = 12, color = "#f59e0b", open = false }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ ...svgBase, transition: "transform 0.3s ease", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
    <polyline points="9,6 15,12 9,18" />
  </svg>);
}
function DiamondMarkerIcon({ size = 10, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" style={svgBase}>
    <polygon points="12,2 22,12 12,22 2,12" />
  </svg>);
}
function DiamondFilledIcon({ size = 10, color = "#4a7a3a" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1" style={svgBase}>
    <polygon points="12,2 22,12 12,22 2,12" />
  </svg>);
}
function SparkleIcon({ size = 12, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" style={svgBase}>
    <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
  </svg>);
}
function SkullIcon({ size = 12, color = "#dc2626" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <circle cx="12" cy="10" r="8" /><circle cx="9" cy="9" r="1.5" fill={color} /><circle cx="15" cy="9" r="1.5" fill={color} /><path d="M10 15h4" /><path d="M11 15v3" /><path d="M13 15v3" />
  </svg>);
}
function UndoIcon({ size = 12, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <polyline points="1,4 1,10 7,10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>);
}
function PlusIcon({ size = 12, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={svgBase}>
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>);
}
function TrashIcon({ size = 12, color = "#dc2626" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <polyline points="3,6 5,6 21,6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>);
}
function MicIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0" /><line x1="12" y1="19" x2="12" y2="22" />
  </svg>);
}
function SpeakerIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>);
}
function TargetIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /><line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
  </svg>);
}
function FlameIcon({ size = 14, color = "#f59e0b" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={svgBase}>
    <path d="M12 22c-4 0-7-3-7-7 0-3 2-5 4-7 1-1 2-2 3-4 1 2 2 3 3 4 2 2 4 4 4 7 0 4-3 7-7 7z" />
  </svg>);
}

// Helper: compute quest progress from steps
function getQuestProgress(quest) {
  if (!quest.steps || quest.steps.length === 0) return 0;
  const done = quest.steps.filter(s => s.done).length;
  return Math.round((done / quest.steps.length) * 100);
}

// Helper: get next objective from quest
function getNextObjective(quest) {
  if (!quest.steps) return null;
  return quest.steps.find(s => !s.done) || null;
}

// ─── ICON MAPS ──────────────────────────────────────────────────────────────

const STAT_ICONS = {
  STR: <CrossedSwordsIcon size={12} />,
  INT: <BookIcon size={12} />,
  WIS: <CrystalBallIcon size={12} />,
  CHA: <CrownIcon size={12} />,
  VIT: <HeartIcon size={12} />,
  LCK: <CloverIcon size={12} />,
};

const CHARACTER_IMG = "data:image/webp;base64,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";

const DEFAULT_AVATAR = "data:image/jpeg;base64,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";

const DEFAULT_CHARACTER = {
  name: "Jefferson Wolfe",
  title: "Sovereign Architect",
  className: "Entrepreneur / Creator / Strategist",
  level: 1,
  xp: 0,
  xpToNext: 215,
  stats: { STR: 72, INT: 85, WIS: 78, CHA: 80, VIT: 68, LCK: 74 },
  avatar: DEFAULT_AVATAR,
};

// XP curve: fast early, steady mid, slow mastery
// ~200 at L1, ~800 at L25, ~1600 at L50, ~3200 at L75, ~5600 at L100
function calcXpToNext(level) {
  return Math.floor(200 + level * 15 + level * level * 0.4);
}

const SKILL_CATEGORIES_DATA = {
  mind:       { label: "Mind",       color: "#818cf8", angle: 244, desc: "Cognitive Power", fullDesc: "The forge of intellect. Sharpen perception, accelerate decisions, and build mental frameworks that cut through complexity. A powerful mind sees what others miss and moves before others react." },
  wealth:     { label: "Wealth",     color: "#f59e0b", angle: 192, desc: "Leverage & Income", fullDesc: "The engine of freedom. Master the art of converting skill into income, systems into scale, and ideas into assets that generate value while you sleep." },
  body:       { label: "Body",       color: "#ef4444", angle: 140, desc: "Physical Dominance", fullDesc: "The foundation of all power. Strength commands respect, endurance sustains the mission, and a disciplined body becomes an instrument of will." },
  charisma:   { label: "Charisma",   color: "#ec4899", angle: 88,  desc: "Social Power", fullDesc: "The art of influence without force. Control rooms through presence, shift minds through story, and bend perception through mastery of word and tone." },
  leadership: { label: "Leadership", color: "#3b82f6", angle: 36,  desc: "Empire Building", fullDesc: "The architecture of command. Build teams that execute without you, design systems that scale beyond you, and cast visions that outlive you." },
  creator:    { label: "Creation",   color: "#a855f7", angle: 340, desc: "IP & Legacy", fullDesc: "The alchemy of ideas into assets. Transform creative vision into intellectual property, stories into movements, and content into lasting cultural artifacts." },
  spirit:     { label: "Spirit",     color: "#10b981", angle: 296, desc: "Inner Stability", fullDesc: "The anchor within the storm. Cultivate unshakable calm, clarity of purpose, and the inner silence from which all true power originates." },
};

// Derive core stats from skill category averages
const STAT_FROM_SKILLS = {
  STR: { primary: "body", secondary: null },
  INT: { primary: "mind", secondary: "creator" },
  WIS: { primary: "spirit", secondary: "leadership" },
  CHA: { primary: "charisma", secondary: null },
  VIT: { primary: "body", secondary: "spirit" },
  LCK: { primary: "wealth", secondary: null },
};

function deriveStats(skillsList) {
  const catAvg = {};
  for (const catKey of Object.keys(SKILL_CATEGORIES_DATA)) {
    const active = skillsList.filter(s => s.category === catKey && s.tier === "current" && s.level > 0);
    catAvg[catKey] = active.length > 0 ? active.reduce((sum, s) => sum + s.level, 0) / active.length : 0;
  }
  const stats = {};
  for (const [stat, { primary, secondary }] of Object.entries(STAT_FROM_SKILLS)) {
    const p = catAvg[primary] || 0;
    const s = secondary ? (catAvg[secondary] || 0) : 0;
    stats[stat] = Math.round(secondary ? p * 0.7 + s * 0.3 : p);
  }
  return stats;
}

const SKILL_ICONS = {
  "Focus": <><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></>,
  "Pattern Recognition": <><path d="M4 4h4v4H4zM16 4h4v4h-4zM10 10h4v4h-4zM4 16h4v4H4zM16 16h4v4h-4z"/></>,
  "Decision Speed": <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>,
  "First-Principles Thinking": <><path d="M12 2L2 19h20L12 2z"/><line x1="12" y1="8" x2="12" y2="14"/><circle cx="12" cy="16" r="1"/></>,
  "Strategic Planning": <><path d="M2 4h6v6H2zM9 12h6v6H9zM16 4h6v6h-6z"/><path d="M5 10v2h4M15 10v2h-4"/></>,
  "Memory Retention": <><path d="M9 3C5 3 2 6 2 9.5S5 18 12 22c7-4 10-8.5 10-12.5S19 3 15 3c-1.7 0-3 .8-3 .8S10.7 3 9 3z"/></>,
  "Problem Decomposition": <><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="8" height="8" rx="1"/></>,
  "Systems Thinking": <><circle cx="12" cy="12" r="2"/><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 8l2 2M14 8l-2 2M8 16l2-2M14 16l-2-2"/></>,
  "Emotional Regulation": <><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>,
  "Stoicism": <><path d="M4 4h16v3H4z"/><line x1="6" y1="7" x2="6" y2="20"/><line x1="18" y1="7" x2="18" y2="20"/><line x1="10" y1="7" x2="10" y2="20"/><line x1="14" y1="7" x2="14" y2="20"/><path d="M3 20h18"/></>,
  "Game Theory": <><rect x="2" y="6" width="8" height="12" rx="1"/><rect x="14" y="6" width="8" height="12" rx="1"/><path d="M6 10v4M18 10v4M10 12h4"/></>,
  "Bayesian Reasoning": <><path d="M3 20L12 4l9 16z"/><path d="M7 14h10"/><circle cx="12" cy="10" r="1.5"/></>,
  "Multi-Variable Forecasting": <><path d="M3 20l4-8 4 4 4-10 6 6"/><circle cx="7" cy="12" r="1.5"/><circle cx="15" cy="6" r="1.5"/></>,
  "Negotiation Psychology": <><circle cx="8" cy="8" r="4"/><circle cx="16" cy="8" r="4"/><path d="M4 20v-2a4 4 0 0 1 4-4M20 20v-2a4 4 0 0 0-4-4"/></>,
  "Cognitive Bias Detection": <><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></>,
  "Mental Model Stacking": <><rect x="4" y="14" width="16" height="4" rx="1"/><rect x="6" y="9" width="12" height="4" rx="1"/><rect x="8" y="4" width="8" height="4" rx="1"/></>,
  "Strategic Patience": <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l-3 3"/></>,
  "Cold Read Intuition": <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  "Environmental Awareness": <><circle cx="12" cy="12" r="9"/><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18"/></>,
  "Adaptive Identity Shifting": <><path d="M12 3c-4 0-8 4-8 9h4c0-3 2-5 4-5s4 2 4 5h4c0-5-4-9-8-9z"/><path d="M4 12c0 5 4 9 8 9s8-4 8-9"/></>,
  "Narrative Framing Control": <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
  "Sales": <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
  "Copywriting": <><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></>,
  "Offer Creation": <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M10 15h4"/></>,
  "Content Creation": <><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></>,
  "Video Editing": <><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M10 9l5 3-5 3z"/></>,
  "Photography": <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
  "Music Production": <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>,
  "Public Speaking": <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></>,
  "Brand Positioning": <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
  "Negotiation": <><path d="M17 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2M7 8H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M10 12h4"/></>,
  "Pricing Strategy": <><path d="M12 2v20M6 6l12 12M18 6L6 18"/></>,
  "Delegation": <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8l3 3-3 3"/></>,
  "SOP Creation": <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h5"/><path d="M16 14l2 2 4-4"/></>,
  "Capital Allocation": <><rect x="2" y="6" width="6" height="12"/><rect x="9" y="4" width="6" height="14"/><rect x="16" y="8" width="6" height="10"/></>,
  "Equity Structuring": <><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></>,
  "Acquisition Strategy": <><circle cx="12" cy="12" r="10"/><path d="M2 12l5 5 5-5"/></>,
  "AI Automation Systems": <><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="9" cy="9" r="1.5"/><circle cx="15" cy="9" r="1.5"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></>,
  "Distribution Strategy": <><path d="M12 2l-8 8h5v12h6V10h5z"/></>,
  "IP Monetization": <><circle cx="12" cy="12" r="10"/><path d="M9 9h1l2 6 2-6h1"/></>,
  "Asset-Based Income": <><path d="M3 22V8l9-6 9 6v14M9 22v-6h6v6"/></>,
  "Investor Psychology": <><path d="M3 3v18h18"/><path d="M7 16l4-6 4 3 5-7"/></>,
  "Quiet Wealth Signaling": <><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></>,
  "Influence Architecture": <><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></>,
  "Strategic Partnerships": <><path d="M11 17a4 4 0 0 1-4-4V5h2v8a2 2 0 0 0 4 0V5h2v8a4 4 0 0 1-4 4z"/><path d="M7 21h10"/></>,
  "Media Manipulation Literacy": <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>,
  "Authority at Scale": <><path d="M12 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z"/></>,
  "Strength Training": <><path d="M6 5v14M18 5v14M6 12h12M3 7h6M15 7h6M3 17h6M15 17h6"/></>,
  "Endurance": <><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></>,
  "Mobility": <><circle cx="12" cy="5" r="2"/><path d="M12 7v4l-3 5M12 11l3 5M9 20l-2-3M15 20l2-3"/></>,
  "Flexibility": <><path d="M12 2C6 2 4 8 4 12s2 10 8 10 8-6 8-10S18 2 12 2z"/><path d="M12 2c-2 4-2 8 0 12s2 6 0 8"/></>,
  "Diet Discipline": <><circle cx="12" cy="12" r="8"/><path d="M12 4v4M15 12a3 3 0 1 1-6 0"/></>,
  "Sleep Optimization": <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>,
  "Recovery Optimization": <><path d="M12 22V8M5 12l7-4 7 4M5 16l7-4 7 4"/></>,
  "Combat Skill": <><path d="M14.5 2l5 5-11 11-5.5 1.5 1.5-5.5z"/><path d="M3 21l3-3"/></>,
  "Hormone Optimization": <><path d="M7 2h10l-2 5h4L9 22l2-8H5z"/></>,
  "VO2 Max Enhancement": <><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10"/><path d="M22 2L12 12M16 2h6v6"/></>,
  "Athletic Agility": <><path d="M4 16l4-4 4 4 4-4 4 4M4 8l4-4 4 4 4-4 4 4"/></>,
  "Breath Control": <><circle cx="12" cy="12" r="9"/><path d="M12 4v16M4 12h16"/></>,
  "Nervous System Mastery": <><path d="M12 2v6M12 16v6"/><path d="M8 8l-4 4 4 4M16 8l4 4-4 4"/><circle cx="12" cy="12" r="3"/></>,
  "Pain Tolerance": <><circle cx="12" cy="12" r="10"/><path d="M8 15l2-2 2 2 2-2 2 2"/><path d="M9 9h.01M15 9h.01"/></>,
  "Stress Tolerance": <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>,
  "Controlled Aggression": <><path d="M12 2l2 7h7l-6 4 2 7-5-4-5 4 2-7-6-4h7z"/></>,
  "Storytelling": <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
  "Audience Building": <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
  "Stage Presence": <><path d="M2 20h20M5 20V10l7-6 7 6v10"/></>,
  "Humor Timing": <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>,
  "Tone Control": <><path d="M2 16l5-5 3 3 4-4 5 5M18 6l4 4"/></>,
  "Active Listening": <><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></>,
  "Persuasion": <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h8M8 14h4"/></>,
  "Crowd Control": <><circle cx="7" cy="6" r="2"/><circle cx="17" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><path d="M2 20v-2a5 5 0 0 1 10 0v2M12 20v-2a5 5 0 0 1 10 0v2"/></>,
  "Frame Control": <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></>,
  "Seductive Energy": <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></>,
  "Conflict Management": <><path d="M14.5 2l5 5-11 11-5.5 1.5 1.5-5.5z"/></>,
  "Polarizing Presence": <><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/></>,
  "Silent Intimidation": <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><path d="M2 2l20 20"/></>,
  "Subtext Communication": <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></>,
  "Power Pausing": <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
  "Emotional State Induction": <><circle cx="12" cy="12" r="10"/><path d="M12 16c2 0 4-2 4-4M12 16c-2 0-4-2-4-4"/><circle cx="8" cy="9" r="1"/><circle cx="16" cy="9" r="1"/></>,
  "Staff Management": <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  "Roster Planning": <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01"/></>,
  "Systems Delegation": <><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></>,
  "Hiring Judgment": <><circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2M19 8l3 3M22 8l-3 3"/></>,
  "Performance Feedback": <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/></>,
  "Conflict Resolution": <><circle cx="12" cy="12" r="10"/><path d="M2 12l4 4 4-4"/></>,
  "Vision Casting": <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  "Cultural Engineering": <><path d="M12 3l9 4.5v9L12 21l-9-4.5v-9z"/><path d="M12 12l9-4.5M12 12v9M12 12L3 7.5"/></>,
  "Incentive Design": <><path d="M3 20h18"/><rect x="5" y="14" width="4" height="6"/><rect x="10" y="10" width="4" height="10"/><rect x="15" y="6" width="4" height="14"/></>,
  "Power Mapping": <><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v3M7 17l3-4M17 17l-3-4"/></>,
  "Succession Planning": <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 7l3 3-3 3"/></>,
  "Multi-Location Scaling": <><path d="M3 22V8l5-4 5 4v14M11 22V8l5-4 5 4v14"/></>,
  "Political Navigation": <><path d="M12 22s-8-4-8-10V5l8-3 8 3v7c0 6-8 10-8 10z"/></>,
  "Influence Without Title": <><circle cx="12" cy="12" r="10"/><path d="M12 8l3 4h-6z"/></>,
  "Strategic Silence": <><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></>,
  "Reputation Management": <><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></>,
  "Songwriting": <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>,
  "Voice Acting": <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></>,
  "Video Production": <><polygon points="23,7 16,12 23,17"/><rect x="1" y="5" width="15" height="14" rx="2"/></>,
  "Quote Crafting": <><path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7a3 3 0 0 1-3 3"/><path d="M19 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7a3 3 0 0 1-3 3"/></>,
  "Visual Design": <><circle cx="13.5" cy="6.5" r="2.5"/><path d="M3 20c0-3.5 3-6 7-6l1.5 5L16 12l5 8H3z"/></>,
  "Worldbuilding": <><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10M12 2a15 15 0 0 0-4 10 15 15 0 0 0 4 10"/></>,
  "Creative Direction": <><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 3v18"/></>,
  "Viral Psychology": <><path d="M4 12l1-1c3-3 8-3 11 0l1 1M7 9l1-1c2-2 5-2 7 0l1 1"/><circle cx="12" cy="15" r="2"/></>,
  "Myth Creation": <><path d="M12 3l2 5h5l-4 3 1.5 5L12 13l-4.5 3L9 11l-4-3h5z"/></>,
  "Archetype Embodiment": <><circle cx="12" cy="4" r="2"/><path d="M12 6v6M7 22l5-10 5 10M5 12h14"/></>,
  "Transmedia Storytelling": <><rect x="2" y="3" width="8" height="6" rx="1"/><rect x="14" y="3" width="8" height="6" rx="1"/><rect x="8" y="15" width="8" height="6" rx="1"/><path d="M6 9v3l6 3M18 9v3l-6 3"/></>,
  "Cultural Symbol Engineering": <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></>,
  "Timeless Messaging": <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
  "Movement Building": <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
  "Legacy IP Creation": <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></>,
  "Emotional Imprinting": <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/><path d="M12 13v4"/></>,
  "Gratitude Practice": <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></>,
  "Meditation": <><circle cx="12" cy="6" r="3"/><path d="M12 9v3M6 18c0-3 2.7-6 6-6s6 3 6 6M4 22h16"/></>,
  "Reflection": <><circle cx="12" cy="12" r="10"/><path d="M12 16v.01M12 8v4"/></>,
  "Faith": <><path d="M12 2v8M8 6h8M12 10v12M7 15h10"/></>,
  "Presence": <><circle cx="8" cy="6" r="3"/><circle cx="16" cy="6" r="3"/><path d="M2 20v-2a6 6 0 0 1 6-6M22 20v-2a6 6 0 0 0-6-6"/><path d="M12 12v10"/></>,
  "Detachment from Outcome": <><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></>,
  "Identity Stability": <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></>,
  "Ego Management": <><circle cx="12" cy="12" r="10"/><path d="M12 8l-4 8h8z"/></>,
  "Internal Validation": <><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></>,
  "Moral Clarity": <><path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5"/></>,
  "Radical Acceptance": <><circle cx="12" cy="12" r="10"/><path d="M8 12s2 4 4 4 4-4 4-4"/></>,
  "Inner Silence": <><circle cx="12" cy="12" r="10"/><path d="M9 9l6 6M15 9l-6 6"/></>,
  "Unshakeable Calm": <><path d="M2 12c0-3 2-6 5-6s5 6 5 6 2-6 5-6 5 3 5 6M2 18c0-3 2-6 5-6s5 6 5 6 2-6 5-6 5 3 5 6"/></>,
  "Death Awareness": <><circle cx="12" cy="12" r="10"/><path d="M12 6v6"/><circle cx="12" cy="16" r="1"/></>,
};

const SKILL_DESCRIPTIONS = {
  // MIND
  "Focus": "Grants the ability to enter deep work states where distractions lose their influence.",
  "Pattern Recognition": "Grants the ability to see hidden structures and predict outcomes before they unfold.",
  "Decision Speed": "Grants the ability to act decisively while others hesitate.",
  "First-Principles Thinking": "Grants the ability to dismantle flawed systems and rebuild superior ones.",
  "Systems Thinking": "Grants the ability to perceive invisible cause-and-effect chains.",
  "Problem Decomposition": "Grants the ability to shrink overwhelming challenges into manageable components.",
  "Strategic Planning": "Grants the ability to chart multi-step paths toward long-term victory.",
  "Emotional Regulation": "Grants resistance to panic, anger, and impulsive reactions.",
  "Cognitive Bias Detection": "Grants insight into flawed reasoning and manipulation.",
  "Memory Retention": "Grants rapid recall of knowledge when precision matters.",
  "Mental Model Stacking": "Grants multi-layered analysis in complex situations.",
  // WEALTH
  "Sales": "Grants the power to convert interest into income.",
  "Copywriting": "Grants influence through written persuasion.",
  "Offer Creation": "Grants the ability to craft deals that feel irresistible.",
  "Brand Positioning": "Grants control over how you are perceived in the market.",
  "Negotiation": "Grants leverage in high-stakes agreements.",
  "Capital Allocation": "Grants the ability to turn money into multiplying assets.",
  "Delegation": "Grants the power to extend your reach through others.",
  "SOP Creation": "Grants order over chaos through repeatable systems.",
  "AI Automation Systems": "Grants mechanical efficiency through intelligent tools.",
  "Pricing Strategy": "Grants authority to charge based on value, not insecurity.",
  "Distribution Strategy": "Grants the ability to move ideas and products across networks at scale.",
  "IP Monetization": "Grants recurring income from your creations.",
  // BODY
  "Strength Training": "Grants increased physical power and durability.",
  "Endurance": "Grants sustained output without early fatigue.",
  "Mobility": "Grants fluid movement without restriction.",
  "Recovery Optimization": "Grants faster regeneration after stress or strain.",
  "Diet Discipline": "Grants control over body composition and energy levels.",
  "Sleep Optimization": "Grants enhanced mental clarity and physical repair.",
  "Breath Control": "Grants mastery over stress response.",
  "Stress Tolerance": "Grants resilience under physical pressure.",
  // CHARISMA
  "Storytelling": "Grants the ability to command attention through narrative.",
  "Stage Presence": "Grants dominance in public settings.",
  "Persuasion": "Grants the power to shift beliefs without force.",
  "Tone Control": "Grants emotional precision in communication.",
  "Active Listening": "Grants deeper understanding of allies and opponents alike.",
  "Humor Timing": "Grants social leverage through well-placed levity.",
  "Frame Control": "Grants authority over how events are interpreted.",
  "Conflict Management": "Grants stability and control during confrontation.",
  // LEADERSHIP
  "Staff Management": "Grants alignment of team output with your standards.",
  "Hiring Judgment": "Grants foresight in selecting high-value allies.",
  "Performance Feedback": "Grants the ability to refine team behavior efficiently.",
  "Cultural Engineering": "Grants influence over group identity and norms.",
  "Vision Casting": "Grants the ability to rally others behind a future mission.",
  "Incentive Design": "Grants control over motivation structures.",
  "Power Mapping": "Grants awareness of influence hierarchies.",
  "Reputation Management": "Grants protection and enhancement of status.",
  "Succession Planning": "Grants continuity beyond your direct presence.",
  // CREATOR
  "Songwriting": "Grants the ability to encode emotion into melody and lyric.",
  "Voice Acting": "Grants vocal embodiment of character and tone.",
  "Video Production": "Grants visual storytelling capability.",
  "Visual Design": "Grants aesthetic authority over perception.",
  "Worldbuilding": "Grants creation of immersive universes.",
  "Myth Creation": "Grants symbolic power over identity narratives.",
  "Viral Psychology": "Grants understanding of share-driven behavior.",
  "Audience Building": "Grants long-term influence through community.",
  "Creative Direction": "Grants unified vision across creative output.",
  // SPIRIT
  "Meditation": "Grants mastery over attention.",
  "Gratitude Practice": "Grants emotional stability through perspective.",
  "Identity Stability": "Grants consistency across environments.",
  "Detachment from Outcome": "Grants calm action without emotional volatility.",
  "Ego Management": "Grants resistance to pride and insecurity.",
  "Moral Clarity": "Grants decision-making aligned with internal code.",
  "Presence": "Grants heightened awareness of the current moment.",
  "Inner Silence": "Grants reduction of internal noise and mental clutter.",
  "Stoicism": "Grants emotional armor against chaos and adversity.",
  "Game Theory": "Grants prediction of strategic moves in multi-agent scenarios.",
  "Bayesian Reasoning": "Grants dynamic belief updating from new evidence.",
  "Multi-Variable Forecasting": "Grants ability to model complex outcome chains.",
  "Negotiation Psychology": "Grants leverage through understanding hidden motivations.",
  "Strategic Patience": "Grants power through delayed gratification and timing.",
  "Cold Read Intuition": "Grants rapid character assessment without prior data.",
  "Environmental Awareness": "Grants heightened perception of spatial and social surroundings.",
  "Adaptive Identity Shifting": "Grants fluid code-switching across contexts.",
  "Narrative Framing Control": "Grants power to shape how others interpret events.",
  "Content Creation": "Grants ability to produce valuable media at speed.",
  "Video Editing": "Grants visual storytelling through post-production mastery.",
  "Photography": "Grants the eye to capture compelling visual moments.",
  "Music Production": "Grants creation of sonic landscapes and emotional triggers.",
  "Public Speaking": "Grants commanding presence in front of any audience.",
  "Equity Structuring": "Grants ownership design for long-term wealth extraction.",
  "Acquisition Strategy": "Grants the ability to identify and absorb valuable assets.",
  "Asset-Based Income": "Grants passive revenue from systems and intellectual property.",
  "Investor Psychology": "Grants understanding of capital allocation decision-making.",
  "Quiet Wealth Signaling": "Grants understated demonstrations of financial power.",
  "Influence Architecture": "Grants structural positioning for maximum leverage.",
  "Strategic Partnerships": "Grants alliance-building for compounded growth.",
  "Media Manipulation Literacy": "Grants immunity to information warfare tactics.",
  "Authority at Scale": "Grants amplified credibility across large audiences.",
  "Flexibility": "Grants range of motion and injury resilience.",
  "Combat Skill": "Grants physical confidence in confrontational scenarios.",
  "Hormone Optimization": "Grants biochemical tuning for peak performance.",
  "VO2 Max Enhancement": "Grants elite cardiovascular endurance capacity.",
  "Athletic Agility": "Grants explosive directional change and coordination.",
  "Nervous System Mastery": "Grants conscious control of autonomic responses.",
  "Pain Tolerance": "Grants ability to operate under physical distress.",
  "Controlled Aggression": "Grants channeled intensity without loss of composure.",
  "Crowd Control": "Grants ability to direct group energy and attention.",
  "Seductive Energy": "Grants magnetic pull through calibrated tension.",
  "Polarizing Presence": "Grants strong reactions that command attention.",
  "Silent Intimidation": "Grants authority through stillness and intensity.",
  "Subtext Communication": "Grants layered messaging beneath surface words.",
  "Power Pausing": "Grants control of conversational rhythm and gravity.",
  "Emotional State Induction": "Grants ability to shift the emotional climate of a room.",
  "Roster Planning": "Grants optimal team scheduling and resource allocation.",
  "Systems Delegation": "Grants ability to transfer ownership of processes cleanly.",
  "Conflict Resolution": "Grants de-escalation and productive confrontation.",
  "Multi-Location Scaling": "Grants replication of operations across sites.",
  "Political Navigation": "Grants movement through complex organizational power dynamics.",
  "Influence Without Title": "Grants authority derived from competence, not position.",
  "Strategic Silence": "Grants power through deliberate withholding of input.",
  "Quote Crafting": "Grants condensation of wisdom into memorable phrases.",
  "Archetype Embodiment": "Grants alignment with universal character patterns.",
  "Transmedia Storytelling": "Grants narrative consistency across platforms.",
  "Cultural Symbol Engineering": "Grants creation of icons that carry meaning.",
  "Timeless Messaging": "Grants communication that transcends era and context.",
  "Movement Building": "Grants mobilization of communities around shared vision.",
  "Legacy IP Creation": "Grants construction of intellectual property that outlives you.",
  "Emotional Imprinting": "Grants ability to leave lasting emotional signatures on audiences.",
  "Reflection": "Grants clarity through structured self-examination.",
  "Faith": "Grants unshakeable trust in purpose beyond evidence.",
  "Internal Validation": "Grants freedom from external approval dependency.",
  "Radical Acceptance": "Grants peace through embracing what cannot be changed.",
  "Unshakeable Calm": "Grants composure under extreme pressure.",
  "Death Awareness": "Grants urgency and perspective from mortality consciousness.",
};

const DEFAULT_SKILLS = [
  // ── MIND ──
  { name: "Focus", category: "mind", tier: "current", level: 65 },
  { name: "Pattern Recognition", category: "mind", tier: "current", level: 72 },
  { name: "Decision Speed", category: "mind", tier: "current", level: 60 },
  { name: "First-Principles Thinking", category: "mind", tier: "current", level: 68 },
  { name: "Strategic Planning", category: "mind", tier: "current", level: 74 },
  { name: "Memory Retention", category: "mind", tier: "current", level: 55 },
  { name: "Problem Decomposition", category: "mind", tier: "current", level: 66 },
  { name: "Systems Thinking", category: "mind", tier: "current", level: 70 },
  { name: "Emotional Regulation", category: "mind", tier: "current", level: 58 },
  { name: "Stoicism", category: "mind", tier: "current", level: 62 },
  { name: "Game Theory", category: "mind", tier: "advanced", level: 0 },
  { name: "Bayesian Reasoning", category: "mind", tier: "advanced", level: 0 },
  { name: "Multi-Variable Forecasting", category: "mind", tier: "advanced", level: 0 },
  { name: "Negotiation Psychology", category: "mind", tier: "advanced", level: 0 },
  { name: "Cognitive Bias Detection", category: "mind", tier: "advanced", level: 0 },
  { name: "Mental Model Stacking", category: "mind", tier: "advanced", level: 0 },
  { name: "Strategic Patience", category: "mind", tier: "undiscovered", level: 0 },
  { name: "Cold Read Intuition", category: "mind", tier: "undiscovered", level: 0 },
  { name: "Environmental Awareness", category: "mind", tier: "undiscovered", level: 0 },
  { name: "Adaptive Identity Shifting", category: "mind", tier: "undiscovered", level: 0 },
  { name: "Narrative Framing Control", category: "mind", tier: "undiscovered", level: 0 },
  // ── WEALTH ──
  { name: "Sales", category: "wealth", tier: "current", level: 72 },
  { name: "Copywriting", category: "wealth", tier: "current", level: 60 },
  { name: "Offer Creation", category: "wealth", tier: "current", level: 65 },
  { name: "Content Creation", category: "wealth", tier: "current", level: 68 },
  { name: "Video Editing", category: "wealth", tier: "current", level: 78 },
  { name: "Photography", category: "wealth", tier: "current", level: 88 },
  { name: "Music Production", category: "wealth", tier: "current", level: 55 },
  { name: "Public Speaking", category: "wealth", tier: "current", level: 50 },
  { name: "Brand Positioning", category: "wealth", tier: "current", level: 75 },
  { name: "Negotiation", category: "wealth", tier: "current", level: 62 },
  { name: "Pricing Strategy", category: "wealth", tier: "current", level: 58 },
  { name: "Delegation", category: "wealth", tier: "current", level: 64 },
  { name: "SOP Creation", category: "wealth", tier: "current", level: 66 },
  { name: "Capital Allocation", category: "wealth", tier: "advanced", level: 0 },
  { name: "Equity Structuring", category: "wealth", tier: "advanced", level: 0 },
  { name: "Acquisition Strategy", category: "wealth", tier: "advanced", level: 0 },
  { name: "AI Automation Systems", category: "wealth", tier: "advanced", level: 0 },
  { name: "Distribution Strategy", category: "wealth", tier: "advanced", level: 0 },
  { name: "IP Monetization", category: "wealth", tier: "advanced", level: 0 },
  { name: "Asset-Based Income", category: "wealth", tier: "advanced", level: 0 },
  { name: "Investor Psychology", category: "wealth", tier: "advanced", level: 0 },
  { name: "Quiet Wealth Signaling", category: "wealth", tier: "undiscovered", level: 0 },
  { name: "Influence Architecture", category: "wealth", tier: "undiscovered", level: 0 },
  { name: "Strategic Partnerships", category: "wealth", tier: "undiscovered", level: 0 },
  { name: "Media Manipulation Literacy", category: "wealth", tier: "undiscovered", level: 0 },
  { name: "Authority at Scale", category: "wealth", tier: "undiscovered", level: 0 },
  // ── BODY ──
  { name: "Strength Training", category: "body", tier: "current", level: 70 },
  { name: "Endurance", category: "body", tier: "current", level: 55 },
  { name: "Mobility", category: "body", tier: "current", level: 48 },
  { name: "Flexibility", category: "body", tier: "current", level: 45 },
  { name: "Diet Discipline", category: "body", tier: "current", level: 60 },
  { name: "Sleep Optimization", category: "body", tier: "current", level: 52 },
  { name: "Recovery Optimization", category: "body", tier: "current", level: 50 },
  { name: "Combat Skill", category: "body", tier: "advanced", level: 0 },
  { name: "Hormone Optimization", category: "body", tier: "advanced", level: 0 },
  { name: "VO2 Max Enhancement", category: "body", tier: "advanced", level: 0 },
  { name: "Athletic Agility", category: "body", tier: "advanced", level: 0 },
  { name: "Breath Control", category: "body", tier: "advanced", level: 0 },
  { name: "Nervous System Mastery", category: "body", tier: "undiscovered", level: 0 },
  { name: "Pain Tolerance", category: "body", tier: "undiscovered", level: 0 },
  { name: "Stress Tolerance", category: "body", tier: "undiscovered", level: 0 },
  { name: "Controlled Aggression", category: "body", tier: "undiscovered", level: 0 },
  // ── CHARISMA ──
  { name: "Storytelling", category: "charisma", tier: "current", level: 72 },
  { name: "Audience Building", category: "charisma", tier: "current", level: 75 },
  { name: "Stage Presence", category: "charisma", tier: "current", level: 65 },
  { name: "Humor Timing", category: "charisma", tier: "current", level: 60 },
  { name: "Tone Control", category: "charisma", tier: "current", level: 68 },
  { name: "Active Listening", category: "charisma", tier: "current", level: 58 },
  { name: "Persuasion", category: "charisma", tier: "current", level: 64 },
  { name: "Crowd Control", category: "charisma", tier: "advanced", level: 0 },
  { name: "Frame Control", category: "charisma", tier: "advanced", level: 0 },
  { name: "Seductive Energy", category: "charisma", tier: "advanced", level: 0 },
  { name: "Conflict Management", category: "charisma", tier: "advanced", level: 0 },
  { name: "Polarizing Presence", category: "charisma", tier: "advanced", level: 0 },
  { name: "Silent Intimidation", category: "charisma", tier: "undiscovered", level: 0 },
  { name: "Subtext Communication", category: "charisma", tier: "undiscovered", level: 0 },
  { name: "Power Pausing", category: "charisma", tier: "undiscovered", level: 0 },
  { name: "Emotional State Induction", category: "charisma", tier: "undiscovered", level: 0 },
  // ── LEADERSHIP ──
  { name: "Staff Management", category: "leadership", tier: "current", level: 74 },
  { name: "Roster Planning", category: "leadership", tier: "current", level: 70 },
  { name: "Systems Delegation", category: "leadership", tier: "current", level: 66 },
  { name: "Hiring Judgment", category: "leadership", tier: "current", level: 60 },
  { name: "Performance Feedback", category: "leadership", tier: "current", level: 58 },
  { name: "Conflict Resolution", category: "leadership", tier: "current", level: 62 },
  { name: "Vision Casting", category: "leadership", tier: "current", level: 68 },
  { name: "Cultural Engineering", category: "leadership", tier: "advanced", level: 0 },
  { name: "Incentive Design", category: "leadership", tier: "advanced", level: 0 },
  { name: "Power Mapping", category: "leadership", tier: "advanced", level: 0 },
  { name: "Succession Planning", category: "leadership", tier: "advanced", level: 0 },
  { name: "Multi-Location Scaling", category: "leadership", tier: "advanced", level: 0 },
  { name: "Political Navigation", category: "leadership", tier: "undiscovered", level: 0 },
  { name: "Influence Without Title", category: "leadership", tier: "undiscovered", level: 0 },
  { name: "Strategic Silence", category: "leadership", tier: "undiscovered", level: 0 },
  { name: "Reputation Management", category: "leadership", tier: "undiscovered", level: 0 },
  // ── CREATOR ──
  { name: "Songwriting", category: "creator", tier: "current", level: 55 },
  { name: "Voice Acting", category: "creator", tier: "current", level: 30 },
  { name: "Video Production", category: "creator", tier: "current", level: 82 },
  { name: "Quote Crafting", category: "creator", tier: "current", level: 70 },
  { name: "Visual Design", category: "creator", tier: "current", level: 75 },
  { name: "Worldbuilding", category: "creator", tier: "current", level: 45 },
  { name: "Creative Direction", category: "creator", tier: "current", level: 68 },
  { name: "Viral Psychology", category: "creator", tier: "advanced", level: 0 },
  { name: "Myth Creation", category: "creator", tier: "advanced", level: 0 },
  { name: "Archetype Embodiment", category: "creator", tier: "advanced", level: 0 },
  { name: "Transmedia Storytelling", category: "creator", tier: "advanced", level: 0 },
  { name: "Cultural Symbol Engineering", category: "creator", tier: "advanced", level: 0 },
  { name: "Timeless Messaging", category: "creator", tier: "undiscovered", level: 0 },
  { name: "Movement Building", category: "creator", tier: "undiscovered", level: 0 },
  { name: "Legacy IP Creation", category: "creator", tier: "undiscovered", level: 0 },
  { name: "Emotional Imprinting", category: "creator", tier: "undiscovered", level: 0 },
  // ── SPIRIT ──
  { name: "Gratitude Practice", category: "spirit", tier: "current", level: 65 },
  { name: "Meditation", category: "spirit", tier: "current", level: 50 },
  { name: "Reflection", category: "spirit", tier: "current", level: 62 },
  { name: "Faith", category: "spirit", tier: "current", level: 70 },
  { name: "Presence", category: "spirit", tier: "current", level: 72 },
  { name: "Detachment from Outcome", category: "spirit", tier: "advanced", level: 0 },
  { name: "Identity Stability", category: "spirit", tier: "advanced", level: 0 },
  { name: "Ego Management", category: "spirit", tier: "advanced", level: 0 },
  { name: "Internal Validation", category: "spirit", tier: "advanced", level: 0 },
  { name: "Moral Clarity", category: "spirit", tier: "advanced", level: 0 },
  { name: "Radical Acceptance", category: "spirit", tier: "undiscovered", level: 0 },
  { name: "Inner Silence", category: "spirit", tier: "undiscovered", level: 0 },
  { name: "Unshakeable Calm", category: "spirit", tier: "undiscovered", level: 0 },
  { name: "Death Awareness", category: "spirit", tier: "undiscovered", level: 0 },
];

const DEFAULT_QUESTS = [
  // ── SIDE QUESTS ──────────────────────────────────────────────────────────────
  { id: "sq1", name: "Photography: Milestones School", type: "side", status: "active", description: "Photography project for Milestones School", xpReward: null, steps: [
    { text: "Confirm brief and shot list with the school", done: false },
    { text: "Schedule and complete the shoot day", done: false },
    { text: "Cull and edit selects", done: false },
    { text: "Deliver final gallery and collect payment", done: false },
  ]},
  { id: "sq2", name: "Video: Tim Heavy Machinery", type: "side", status: "active", description: "Video production project for Tim Heavy Machinery", xpReward: null, steps: [
    { text: "Confirm brief, locations, and shoot schedule", done: false },
    { text: "Complete filming day(s)", done: false },
    { text: "Edit rough cut and send for review", done: false },
    { text: "Deliver final cut and collect payment", done: false },
  ]},
  { id: "sq3", name: "Website: The Green Shed", type: "side", status: "active", description: "Website build for The Green Shed", xpReward: null, steps: [
    { text: "Gather content, branding, and requirements from client", done: false },
    { text: "Design and build site", done: false },
    { text: "Client review and revisions", done: false },
    { text: "Deploy and connect to domain", done: false },
  ]},
  { id: "sq4", name: "Website: PJ", type: "side", status: "active", description: "Website build for PJ", xpReward: null, steps: [
    { text: "Gather content, branding, and requirements from client", done: false },
    { text: "Design and build site", done: false },
    { text: "Client review and revisions", done: false },
    { text: "Deploy and connect to domain", done: false },
  ]},
  { id: "sq5", name: "Music: Brecik — Daddy Cool", type: "side", status: "active", description: "Music production for Brecik — Daddy Cool", xpReward: null, steps: [
    { text: "Confirm arrangement and production direction", done: false },
    { text: "Complete production and rough mix", done: false },
    { text: "Send for feedback and revise", done: false },
    { text: "Final mix/master and deliver", done: false },
  ]},
  { id: "sq6", name: "Music: Brecik — Superfly Guy", type: "side", status: "active", description: "Music production for Brecik — Superfly Guy", xpReward: null, steps: [
    { text: "Confirm arrangement and production direction", done: false },
    { text: "Complete production and rough mix", done: false },
    { text: "Send for feedback and revise", done: false },
    { text: "Final mix/master and deliver", done: false },
  ]},

  // ── BELVU / OPS ──────────────────────────────────────────────────────────────
  { id: "belvu-p1", name: "Belvu: Foundation & First Launches", type: "main", status: "active", description: "Get every Belvu process out of heads and onto paper — SOPs, Notion hub, VA handover", xpReward: null, steps: [
    { text: "Map every process you touch at Belvu — walk each shift with a notepad", done: false },
    { text: "Write SOPs #1-3: Opening Procedure, Social Media Posting, End of Night", done: false },
    { text: "Hand social SOP to VA — have them run it solo for a full week", done: false },
    { text: "Build Notion ops hub: Staff Contacts, Schedules, SOPs, Escalation contacts", done: false },
    { text: "Write SOPs #4-6: Staff Scheduling, Inventory & Ordering, Staff Onboarding", done: false },
    { text: "VA running social 100% solo — your review is 15 min on Sundays only", done: false },
    { text: "Start exit timeline conversation with boss: 'I want everything to run without me'", done: false },
  ]},
  { id: "belvu-p2", name: "Belvu: Systems Lock-In", type: "main", status: "active", description: "Belvu runs on your SOPs — shift manager role replaceable, advisory conversation begins", xpReward: null, steps: [
    { text: "Hand SOPs to senior staff — test if someone else can run a shift", done: false },
    { text: "Complete shift manager handbook: pre-shift, during shift, end of shift, escalation", done: false },
    { text: "Full Belvu ops hub review — fix anything staff are bypassing", done: false },
    { text: "Have advisory conversation with boss: 'Here's my plan to step back'", done: false },
    { text: "Train a replacement shift manager on real shifts using the handbook", done: false },
    { text: "Propose advisory structure: retained fee, revenue share, or consulting day rate", done: false },
    { text: "Reduce shifts from 3 nights to 1 or 0 — document any remaining head-only processes", done: false },
  ]},
  { id: "belvu-p3", name: "Belvu: Advisory Transition", type: "main", status: "active", description: "Operational involvement ends — you review, you don't run", xpReward: null, steps: [
    { text: "Shift to oversight only — weekly 30-min check-in with shift manager", done: false },
    { text: "Finalize Notion ops hub — no process lives only in someone's head", done: false },
    { text: "Lock in advisory mode: 2 hours/week max, review and advise only", done: false },
    { text: "Test full handover — go quiet for 2 weeks and see what breaks", done: false },
    { text: "Fix any gaps from the handover test — that's your final operational work", done: false },
    { text: "Move to monthly check-in only — review, advise, invoice", done: false },
    { text: "Document your Belvu work as a case study: 'Systematised a 3-restaurant business in 9 months'", done: false },
  ]},
  { id: "belvu-p4", name: "Belvu: Exit & Asset", type: "main", status: "active", description: "Formally exit or lock advisory agreement — package the system as a sellable product", xpReward: null, steps: [
    { text: "Final exit conversation — signed advisory agreement or clean handover", done: false },
    { text: "Package SOP library + ops hub as a sellable 'hospitality ops starter kit'", done: false },
    { text: "If still doing shifts — stop now. Advisory only, or nothing.", done: false },
    { text: "Build hospitality ops kit as paid download ($49-$97) for Rostering app users", done: false },
    { text: "Confirm: ongoing advisory fee or clean close — write the ending with intention", done: false },
    { text: "Mark it: the system exists, it runs without you, your operational role ends here", done: false },
    { text: "Protect the asset — never go back to the floor, that chapter is closed", done: false },
  ]},

  // ── TECH / BUILD ─────────────────────────────────────────────────────────────
  { id: "tech-p1", name: "Tech: Ship Rostering & Content Gen", type: "main", status: "active", description: "Get both near-ready apps into paying users' hands — Life RPG builds in background", xpReward: null, steps: [
    { text: "Rostering app: final QA pass on 3 devices, write one-paragraph description", done: false },
    { text: "Set up Rostering landing page, pricing tier, and Stripe payments", done: false },
    { text: "Launch Rostering publicly — get at least 2 beta users, open feedback loop", done: false },
    { text: "Collect and act on Rostering feedback — fix only the top 2 issues", done: false },
    { text: "Launch Content Generator — landing page, pricing, push to 2 creator communities", done: false },
    { text: "Convert Rostering beta users to paid — personal outreach to every user", done: false },
    { text: "Target first paying customer across either app — even $1 changes everything", done: false },
  ]},
  { id: "tech-p2", name: "Tech: Revenue Growth to $500 MRR", type: "main", status: "active", description: "Both apps with paying users — push toward $500 MRR, Life RPG takes shape", xpReward: null, steps: [
    { text: "Rostering: grow to 5 paying users — outreach to 10 new operators, ask for referrals", done: false },
    { text: "Content Generator: add paid tier, run limited 50%-off-forever offer for first 10 users", done: false },
    { text: "Start tracking MRR across both apps — simple revenue dashboard", done: false },
    { text: "Life RPG: core loop playable — XP, quests, basic skill tree working", done: false },
    { text: "Midpoint audit: kill unused features, simplify both products", done: false },
    { text: "Rostering: push to 10 paying users — Facebook groups, LinkedIn, direct DMs", done: false },
    { text: "Life RPG: journal system and dark fantasy aesthetic pass complete", done: false },
    { text: "Show Life RPG to 3 people for gut reaction — document what they wish it did", done: false },
  ]},
  { id: "tech-p3", name: "Tech: Scale to $1K MRR", type: "main", status: "active", description: "Identify the stronger app, double down — Mosaic hours freed = more build time", xpReward: null, steps: [
    { text: "Identify stronger app (retention + growth) — allocate 70% build time to it", done: false },
    { text: "Push toward $1k MRR — focused outreach: 20 DMs, 3 posts, 1 community post", done: false },
    { text: "Hit or diagnose $1k MRR — is the blocker product, marketing, or pricing?", done: false },
    { text: "Redirect freed Mosaic hours: 6hrs product, 3hrs marketing, 3hrs Life RPG", done: false },
    { text: "Life RPG: quest system and XP economy working — playtest with 1 person", done: false },
    { text: "Life RPG: soft launch to 10-20 early access users", done: false },
    { text: "Set Life RPG public beta launch date for Q1 2026", done: false },
    { text: "Evaluate: Rostering + Content Generator as hospitality bundle opportunity", done: false },
  ]},
  { id: "tech-p4", name: "Tech: Compound & Launch Life RPG", type: "main", status: "active", description: "Revenue compounds, Life RPG launches publicly — 3 products, growing distribution", xpReward: null, steps: [
    { text: "December sprint: run holiday promotion for both apps", done: false },
    { text: "Target $1.5k MRR — offer annual billing at 2 months free to convert MRR to ARR", done: false },
    { text: "Life RPG: open waitlist, start collecting emails", done: false },
    { text: "Life RPG: public beta launch — ship to waitlist and build-in-public audience", done: false },
    { text: "Collect 20 pieces of Life RPG feedback, fix top 3 confusing/broken things", done: false },
    { text: "Review all 3 products: which is the flagship for 2026?", done: false },
    { text: "Target $2k+ MRR — annual plan conversions, new user campaigns, referral activations", done: false },
    { text: "Plan the next 12 months of product — clear roadmap for 2026", done: false },
  ]},

  // ── SELF / MISSION ───────────────────────────────────────────────────────────
  { id: "self-p1", name: "Mission: Define & Position", type: "main", status: "active", description: "Write the mission, pick a platform, start showing up publicly — seed the environmental idea", xpReward: null, steps: [
    { text: "Write your mission statement — one paragraph, pin it where you see it daily", done: false },
    { text: "Pick one platform to build in public (X, LinkedIn, or Instagram)", done: false },
    { text: "First public post: what you're building and why", done: false },
    { text: "Post your Rostering launch story and Content Generator dual-launch story", done: false },
    { text: "Define positioning line: 'I build [what] for [who]' — add to social bio", done: false },
    { text: "Research environmental cleanup products — 2 hours, write notes on what's missing", done: false },
    { text: "Review Phase 1 progress: SOPs, launches, revenue, VA independence", done: false },
    { text: "Health check: set a non-negotiable sleep floor (min 5.5 hrs)", done: false },
  ]},
  { id: "self-p2", name: "Mission: Build in Public", type: "main", status: "active", description: "Consistent content cadence — Mosaic exit date set, environmental idea gets a name", xpReward: null, steps: [
    { text: "Commit to 2 posts/week: build log + one insight — document Belvu systemisation", done: false },
    { text: "Reassess Mosaic timeline — set exit date, write down the MRR number that unlocks it", done: false },
    { text: "Write honest 6-month review — publish publicly for authority and accountability", done: false },
    { text: "Sketch environmental product idea: give it a name, one paragraph, create a folder", done: false },
    { text: "Mosaic: set hard exit date — define what number unlocks it if not there yet", done: false },
    { text: "Financial runway audit: calculate monthly burn, how far from exiting Mosaic", done: false },
  ]},
  { id: "self-p3", name: "Mission: Exit Mosaic & Activate Brand", type: "main", status: "active", description: "Give notice, redesign your week — Wolfe Productions becomes a real channel", xpReward: null, steps: [
    { text: "Give Mosaic notice — 4 weeks, professional, clean, grateful", done: false },
    { text: "Post the signal: 'I'm going full-time on my own products'", done: false },
    { text: "Define Wolfe Productions: personal brand umbrella, production label, or both", done: false },
    { text: "Give Wolfe Productions one active output: YouTube series, newsletter, or portfolio", done: false },
    { text: "Environmental product: 3 hours deep research on one specific idea", done: false },
    { text: "Last day at Mosaic — leave well, write a reflection post on what teaching taught you", done: false },
    { text: "Redesign your week from scratch: deep build blocks, admin window, family time", done: false },
    { text: "Brand audit: update every bio, profile, description to reflect who you are now", done: false },
  ]},
  { id: "self-p4", name: "Mission: Legacy Begins", type: "main", status: "active", description: "Year-in-review, environmental product first real move — write the next chapter", xpReward: null, steps: [
    { text: "Write year-end reflection: where you were in March vs now — publish it", done: false },
    { text: "Protect family time in December — set a hard work cutoff for Christmas week", done: false },
    { text: "Set 2026 targets: MRR goal, ideal week structure, environmental product business concept", done: false },
    { text: "Lock in content cadence: 2 posts/week minimum, non-negotiable", done: false },
    { text: "Environmental product: first real step — talk to someone, sketch prototype, or register name", done: false },
    { text: "Write your story: '12 months ago 3 jobs, no freedom — now 3 products, building the mission'", done: false },
    { text: "Year one complete: review every domain — what did you build, exit, learn, earn?", done: false },
    { text: "Write the next chapter's mission statement — this one's done", done: false },
  ]},
];

// Equipment slot definitions (around avatar)
const EQUIP_SLOTS = [
  // Left side - Clothing (each locked to specific subcategories)
  { id: "headgear", label: "Headwear", side: "left", pos: 0, category: "clothing", subcategories: ["hat", "sunnies"] },
  { id: "necklace", label: "Necklace", side: "left", pos: 1, category: "clothing", subcategories: ["necklace", "chain"] },
  { id: "top", label: "Top", side: "left", pos: 2, category: "clothing", subcategories: ["jacket", "shirt", "hoodie"] },
  { id: "pants", label: "Pants", side: "left", pos: 3, category: "clothing", subcategories: ["pants", "shorts"] },
  { id: "shoes", label: "Shoes", side: "left", pos: 4, category: "clothing", subcategories: ["shoes", "boots"] },
  // Right side - Gear (each locked to specific subcategories)
  { id: "camera", label: "Camera", side: "right", pos: 0, category: "creative_gear", subcategories: ["camera", "action_cam"] },
  { id: "lens", label: "Lens", side: "right", pos: 1, category: "creative_gear", subcategories: ["lens"] },
  { id: "laptop", label: "Computer", side: "right", pos: 2, category: "tech", subcategories: ["laptop", "desktop", "tablet"] },
  { id: "mic", label: "Audio", side: "right", pos: 3, category: "creative_gear", subcategories: ["mic", "headphones", "speaker"] },
  { id: "bag", label: "Carry", side: "right", pos: 4, category: "creative_gear", subcategories: ["bag", "backpack", "case"] },
  // Vehicle - bottom right
  { id: "vehicle", label: "Vehicle", side: "bottom_right", pos: 0, category: "transport", subcategories: ["suv", "sedan", "motorcycle", "bicycle"] },
];

const SLOT_ICONS = {
  headgear: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M2 12h20"/><path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8"/><rect x="3" y="12" width="18" height="3" rx="1"/></svg>,
  necklace: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><ellipse cx="12" cy="14" rx="8" ry="6"/><path d="M8 4l-1 6"/><path d="M16 4l1 6"/></svg>,
  top: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M8 2l-5 5 3 2 1-3h10l1 3 3-2-5-5"/><path d="M7 7v15h10V7"/></svg>,
  jacket: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M8 2l-5 5 3 2 1-3h10l1 3 3-2-5-5"/><path d="M7 7v15h10V7"/><line x1="12" y1="7" x2="12" y2="22"/><path d="M7 12h3"/><path d="M14 12h3"/></svg>,
  pants: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M6 2h12v6l-2 14h-3l-1-14-1 14H8L6 8z"/></svg>,
  shoes: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M4 16c0-3 2-6 5-7l1-5h4l1 5c3 1 5 4 5 7v3H4z"/><line x1="4" y1="19" x2="20" y2="19"/></svg>,
  camera: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="2" y="6" width="20" height="14" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 6V4h8v2"/></svg>,
  lens: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/></svg>,
  laptop: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="3" y="4" width="18" height="12" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/><path d="M7 16l-1 4"/><path d="M17 16l1 4"/></svg>,
  mic: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="17" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>,
  asset1: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  asset2: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  vehicle: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9l3-5h12l3 5v6a2 2 0 0 1-2 2M5 17a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>,
  bag: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="4" y="8" width="16" height="14" rx="2"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/><line x1="12" y1="12" x2="12" y2="16"/></svg>,
};

const DEFAULT_EQUIPMENT = {
  headgear: null,
  necklace: { name: "Silver Necklace", rarity: "rare", specs: "Sterling silver pendant", category: "clothing", subcategory: "necklace", description: "2026 Valentines Gift from Wifey" },
  top: { name: "Red Tommy H Hoodie", rarity: "rare", specs: "Tommy Hilfiger", category: "clothing", subcategory: "hoodie" },
  pants: { name: "White Ripped", rarity: "common", specs: "Slim fit distressed", category: "clothing", subcategory: "pants" },
  shoes: { name: "ASICS Gel-Nimbus 27", rarity: "rare", specs: "Running shoes", category: "clothing", subcategory: "shoes" },
  camera: { name: "Sony A7iii", rarity: "epic", specs: "Full-frame mirrorless", category: "creative_gear", subcategory: "camera" },
  lens: { name: "Batis 85mm", rarity: "epic", specs: "f/1.8 portrait lens", category: "creative_gear", subcategory: "lens" },
  laptop: { name: "MacBook Pro MAX M1", rarity: "legendary", specs: "64GB RAM, 2TB SSD", category: "tech", subcategory: "laptop" },
  mic: { name: "DJI Mic Go 2", rarity: "rare", specs: "Wireless mic system", category: "creative_gear", subcategory: "mic" },
  bag: { name: "Lowepro BP 250", rarity: "rare", specs: "Camera backpack", category: "creative_gear", subcategory: "bag" },
  vehicle: { name: "Hyundai Santa Fe Hybrid", rarity: "legendary", specs: "Calligraphy 2025", category: "transport", subcategory: "suv", description: "Primary vehicle" },
};

const DEFAULT_ASSETS = [
  // Clothing
  { name: "Black Work Shirt", rarity: "common", category: "clothing", subcategory: "shirt", specs: "Standard uniform" },
  { name: "Black Work Pants", rarity: "common", category: "clothing", subcategory: "pants", specs: "Standard uniform" },
  { name: "White Tommy H Puff", rarity: "epic", category: "clothing", subcategory: "jacket", specs: "Tommy Hilfiger puffer" },
  { name: "Black NXP Ripped", rarity: "common", category: "clothing", subcategory: "pants", specs: "NXP slim fit distressed" },
  // Tech & Gear
  { name: "iPad Pro 2025", rarity: "epic", category: "tech", subcategory: "tablet", specs: "M4 chip, 13-inch" },
  { name: "Insta360 Go 3s", rarity: "common", category: "creative_gear", subcategory: "action_cam", specs: "Tiny action camera" },
  { name: "Mac Mini M4", rarity: "rare", category: "tech", subcategory: "desktop", specs: "16GB RAM, 256GB SSD", description: "Desktop workstation" },
  { name: "Tamron 30-150mm", rarity: "rare", category: "creative_gear", subcategory: "lens", specs: "Zoom lens", description: "Versatile telephoto" },
  { name: "Tamron 24mm", rarity: "rare", category: "creative_gear", subcategory: "lens", specs: "f/2.8 wide angle", description: "Wide angle prime" },
  // Digital Products (now equippable)
  { name: "Life Card Factory", rarity: "legendary", category: "digital", subcategory: "app", specs: "life-card-factory.vercel.app", description: "AI card generation platform" },
  { name: "Life RPG App", rarity: "epic", category: "digital", subcategory: "app", specs: "Pause - Life RPG", description: "Gamified personal dashboard" },
  { name: "Roster Manager", rarity: "rare", category: "digital", subcategory: "app", specs: "Square API integration", description: "Staff scheduling app" },
  { name: "Invoice Generator", rarity: "rare", category: "digital", subcategory: "app", specs: "Stripe + QR codes", description: "Wolfe Productions invoicing" },
  // Businesses (now equippable)
  { name: "Wolfe Productions", rarity: "epic", category: "business", subcategory: "agency", specs: "Creative services", description: "Media & underwater photography" },
  { name: "Belvu Group", rarity: "legendary", category: "business", subcategory: "restaurant", specs: "3 locations", description: "Mama Vu's, Nick's Thai, The Pit" },
];

const ASSET_CAT_ICONS = {
  clothing: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M8 2l-5 5 3 2 1-3h10l1 3 3-2-5-5"/><path d="M7 7v15h10V7"/></svg>,
  tech: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  creative_gear: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="2" y="6" width="20" height="14" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 6V4h8v2"/></svg>,
  transport: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9l3-5h12l3 5v6a2 2 0 0 1-2 2M5 17a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>,
  misc: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>,
  digital: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  business: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  hardware: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  vehicle: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9l3-5h12l3 5v6a2 2 0 0 1-2 2M5 17a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>,
};

const SUBCAT_ICONS = {
  // Clothing
  hat: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M2 12h20"/><path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8"/><path d="M7 12v2h10v-2"/></svg>,
  sunnies: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="7" cy="12" r="3"/><circle cx="17" cy="12" r="3"/><path d="M10 12h4"/><path d="M1 12h3M20 12h3"/><path d="M4 12l2-4M20 12l-2-4"/></svg>,
  necklace: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><ellipse cx="12" cy="14" rx="8" ry="6"/><path d="M8 4l-1 6"/><path d="M16 4l1 6"/><circle cx="12" cy="20" r="1.5" fill={c}/></svg>,
  chain: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><ellipse cx="12" cy="15" rx="7" ry="5"/><path d="M9 4l-1 7"/><path d="M15 4l1 7"/><rect x="10" y="18" width="4" height="3" rx="1"/></svg>,
  jacket: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M8 2l-5 5 3 2 1-3h10l1 3 3-2-5-5"/><path d="M7 7v15h10V7"/><path d="M12 7v15"/></svg>,
  shirt: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M8 2l-5 5 3 2 1-3h10l1 3 3-2-5-5"/><path d="M7 7v15h10V7"/></svg>,
  hoodie: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M8 2l-5 5 3 2 1-3h10l1 3 3-2-5-5"/><path d="M7 7v15h10V7"/><path d="M9 2c0 2 1.5 3 3 3s3-1 3-3"/></svg>,
  pants: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M6 2h12v6l-2 14h-3l-1-14-1 14H8L6 8z"/></svg>,
  shorts: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M6 4h12v4l-2 8h-3l-1-8-1 8H8L6 8z"/></svg>,
  shoes: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M4 16c0-3 2-6 5-7l1-5h4l1 5c3 1 5 4 5 7H4z"/></svg>,
  boots: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M7 20h10l1-8-2-2V4h-2v4h-4V4H8v6l-2 2z"/></svg>,
  // Tech
  laptop: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/></svg>,
  desktop: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  tablet: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1"/></svg>,
  // Creative Gear
  camera: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="2" y="6" width="20" height="14" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 6V4h8v2"/></svg>,
  action_cam: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="4" y="6" width="16" height="12" rx="3"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="1"/></svg>,
  lens: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.5"/></svg>,
  mic: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="17" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>,
  headphones: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M3 14v4a2 2 0 0 0 2 2h1V14H3z"/><path d="M21 14v4a2 2 0 0 1-2 2h-1V14h3z"/></svg>,
  speaker: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="14" r="3"/><circle cx="12" cy="7" r="1.5"/></svg>,
  asset1: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  asset2: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  vehicle: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9l3-5h12l3 5v6a2 2 0 0 1-2 2M5 17a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>,
  bag: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="4" y="8" width="16" height="13" rx="2"/><path d="M8 8V5a4 4 0 0 1 8 0v3"/></svg>,
  backpack: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="5" y="7" width="14" height="15" rx="3"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/><rect x="8" y="12" width="8" height="5" rx="1"/></svg>,
  "case": (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  // Transport
  suv: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9l3-5h12l3 5v6a2 2 0 0 1-2 2M5 17a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>,
  sedan: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V9l3-5h12l3 5v6a2 2 0 0 1-2 2M5 17a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>,
  motorcycle: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="M5 14l4-6h3l2 3h3l2-3"/></svg>,
  bicycle: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="M5 17l4-8h5l5 8"/><path d="M14 9l-2 4"/></svg>,
  // Misc
  accessory: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>,
  tool: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  // Digital subcategories
  app: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1"/></svg>,
  platform: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  saas: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M19 11a4 4 0 0 0-4-4 5 5 0 0 0-10 1 3 3 0 0 0 0 6h14a3 3 0 0 0 0-6z"/><path d="M8 17v2M12 17v2M16 17v2"/></svg>,
  website: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>,
  // Business subcategories
  restaurant: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M3 3v7c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V3"/><path d="M7 3v18"/><path d="M21 3v18h-5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h5"/></svg>,
  agency: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="3" y="8" width="18" height="14" rx="2"/><path d="M7 8V6a5 5 0 0 1 10 0v2"/><circle cx="12" cy="15" r="2"/></svg>,
  brand: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>,
  venture: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  other: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
};

const INVENTORY_ICONS = {
  weapon: <SwordIcon size={14} />,
  armor: <ShieldIcon size={14} />,
  artifact: <GemIcon size={14} />,
  material: <AnvilIcon size={14} />,
};

const DEFAULT_INVENTORY = [];

const DEFAULT_CHALLENGES = [
  // BODY
  { id: "c1", name: "100 Pushups", skill: "Strength Training", category: "body", xp: 8 },
  { id: "c2", name: "30 min workout", skill: "Endurance", category: "body", xp: 10 },
  { id: "c3", name: "10 min stretching", skill: "Mobility", category: "body", xp: 5 },
  { id: "c4", name: "8 hours sleep", skill: "Sleep Optimization", category: "body", xp: 6 },
  { id: "c5", name: "Clean eating day", skill: "Diet Discipline", category: "body", xp: 7 },
  { id: "c6", name: "60-second dead hang", skill: "Strength Training", category: "body", xp: 7 },
  { id: "c7", name: "3-minute plank hold", skill: "Endurance", category: "body", xp: 8, scaleWithLevel: true },
  { id: "c8", name: "10 sprints (short distance)", skill: "Endurance", category: "body", xp: 9 },
  { id: "c9", name: "5 min breathwork session", skill: "Breath Control", category: "body", xp: 6 },
  { id: "c10", name: "Zone 2 cardio 20 mins", skill: "Endurance", category: "body", xp: 9 },
  // MIND
  { id: "c11", name: "Read 20 pages", skill: "Focus", category: "mind", xp: 8 },
  { id: "c12", name: "1 hour deep work", skill: "Strategic Planning", category: "mind", xp: 10 },
  { id: "c13", name: "Journal entry", skill: "Emotional Regulation", category: "mind", xp: 6 },
  { id: "c14", name: "Learn something new", skill: "Pattern Recognition", category: "mind", xp: 7 },
  { id: "c15", name: "10-minute visualization of long-term goal", skill: "Strategic Planning", category: "mind", xp: 7 },
  { id: "c16", name: "Study 15 mins of AI / automation", skill: "Systems Thinking", category: "mind", xp: 8 },
  // WEALTH
  { id: "c17", name: "1 sales outreach", skill: "Sales", category: "wealth", xp: 8 },
  { id: "c18", name: "Review financials", skill: "Capital Allocation", category: "wealth", xp: 7 },
  { id: "c19", name: "Automate one task", skill: "AI Automation Systems", category: "wealth", xp: 10 },
  { id: "c20", name: "Create 1 system improvement", skill: "SOP Creation", category: "wealth", xp: 9 },
  { id: "c21", name: "Reach out to 1 high-value connection", skill: "Negotiation", category: "wealth", xp: 8 },
  // SPIRIT
  { id: "c22", name: "10 min meditation", skill: "Meditation", category: "spirit", xp: 7 },
  { id: "c23", name: "Phone-free hour", skill: "Inner Silence", category: "spirit", xp: 6 },
  { id: "c24", name: "Quality family time", skill: "Presence", category: "spirit", xp: 8 },
  { id: "c25", name: "Pray intentionally", skill: "Moral Clarity", category: "spirit", xp: 7 },
  { id: "c26", name: "Express appreciation to someone directly", skill: "Gratitude Practice", category: "spirit", xp: 6 },
  { id: "c27", name: "Sit outside without stimulation for 10 mins", skill: "Detachment from Outcome", category: "spirit", xp: 7 },
  // CHARISMA
  { id: "c28", name: "Record a video", skill: "Stage Presence", category: "charisma", xp: 9 },
  { id: "c29", name: "Practice a pitch", skill: "Persuasion", category: "charisma", xp: 7 },
  { id: "c30", name: "Tell a story to someone", skill: "Storytelling", category: "charisma", xp: 6 },
  { id: "c31", name: "5-minute voice projection drills", skill: "Tone Control", category: "charisma", xp: 7 },
  // LEADERSHIP
  { id: "c32", name: "Give team feedback", skill: "Performance Feedback", category: "leadership", xp: 8 },
  { id: "c33", name: "Document a process", skill: "SOP Creation", category: "leadership", xp: 7 },
  { id: "c34", name: "Audit one recurring task", skill: "Staff Management", category: "leadership", xp: 7 },
  { id: "c35", name: "Remove one decision from your plate", skill: "Delegation", category: "leadership", xp: 9 },
  // CREATION
  { id: "c36", name: "Create content piece", skill: "Visual Design", category: "creator", xp: 9 },
  { id: "c37", name: "Write music / lyrics", skill: "Songwriting", category: "creator", xp: 8 },
  { id: "c38", name: "Edit footage", skill: "Video Production", category: "creator", xp: 9 },
];

// Daily rotation: seeded random picks 2-4 challenges per category each day
function getDailyChallenges(allChallenges, dateStr) {
  // Simple seed from date string
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) seed = ((seed << 5) - seed + dateStr.charCodeAt(i)) | 0;
  const seededRandom = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  const categories = ["body", "mind", "wealth", "spirit", "charisma", "leadership", "creator"];
  const daily = [];

  categories.forEach(cat => {
    const pool = allChallenges.filter(c => c.category === cat);
    const count = Math.min(pool.length, 2 + Math.floor(seededRandom() * 3)); // 2-4
    // Shuffle pool with seeded random
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    daily.push(...shuffled.slice(0, count));
  });

  return daily;
}

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────

async function loadData(key, fallback) {
  try {
    if (window.storage) {
      const result = await window.storage.get(key);
      return result ? JSON.parse(result.value) : fallback;
    }
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : fallback;
  } catch { return fallback; }
}

async function saveData(key, data) {
  try {
    if (window.storage) {
      await window.storage.set(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (e) { console.error("Save failed:", e); }
}

// ─── PARTICLE SYSTEM ─────────────────────────────────────────────────────────

function Particles() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {Array.from({ length: 18 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * -20;
        const opacity = Math.random() * 0.4 + 0.1;
        return (
          <div key={i} style={{
            position: "absolute", left: `${x}%`, bottom: "-10px", width: `${size}px`, height: `${size}px`,
            borderRadius: "50%", background: `radial-gradient(circle, rgba(245,158,11,${opacity + 0.3}), rgba(245,158,11,0))`,
            boxShadow: `0 0 ${size * 3}px rgba(245,158,11,${opacity})`,
            animation: `floatUp ${duration}s linear ${delay}s infinite`,
          }} />
        );
      })}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}


// ─── DATA SAVE / LOAD (in-app snapshots) ────────────────────────────────────
const BACKUP_KEYS = ["rpg-character","rpg-skills","rpg-quests","rpg-inventory","rpg-equipment","rpg-assets",
  "rpg-collected-cards","rpg-last-card-date","rpg-journal","rpg-last-daily-xp","rpg-challenges",
  "rpg-challenge-log","rpg-reminders","rpg-today-card"];

function saveBackup() {
  const data = {};
  for (const key of BACKUP_KEYS) {
    try { const val = localStorage.getItem(key); if (val) data[key] = JSON.parse(val); } catch {}
  }
  data._saveDate = new Date().toISOString();
  data._version = "1.0";
  localStorage.setItem("rpg-backup", JSON.stringify(data));
  return data._saveDate;
}

function loadBackup() {
  const raw = localStorage.getItem("rpg-backup");
  if (!raw) return null;
  const data = JSON.parse(raw);
  let count = 0;
  for (const [key, val] of Object.entries(data)) {
    if (key.startsWith("rpg-")) { localStorage.setItem(key, JSON.stringify(val)); count++; }
  }
  return { count, date: data._saveDate };
}

function getBackupDate() {
  try {
    const raw = localStorage.getItem("rpg-backup");
    if (!raw) return null;
    return JSON.parse(raw)._saveDate || null;
  } catch { return null; }
}

// ─── STAT BAR COMPONENT ──────────────────────────────────────────────────────

function StatBar({ label, value, maxValue = 100, color = "#f59e0b", icon, showValue = true, subtitle = null }) {
  const pct = Math.min((value / maxValue) * 100, 100);
  return (
    <div style={{ marginBottom: "5px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
        <span style={{ fontSize: "10px", color: "#c4a882", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>
          {icon && <span style={{ marginRight: "5px" }}>{icon}</span>}{label}
          {subtitle && <span style={{ fontSize: "7px", color: "#5a4f40", marginLeft: "4px", fontFamily: "'Fira Code', monospace", letterSpacing: "0" }}>{subtitle}</span>}
        </span>
        {showValue && <span style={{ fontSize: "10px", color: "#f59e0b", fontFamily: "'Fira Code', monospace" }}>{value}/{maxValue}</span>}
      </div>
      <div style={{
        height: "6px", background: "rgba(0,0,0,0.5)", borderRadius: "3px", overflow: "hidden",
        border: "1px solid rgba(245,158,11,0.15)", position: "relative",
      }}>
        <div style={{
          height: "100%", width: `${pct}%`, borderRadius: "4px",
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 10px ${color}44, inset 0 1px 0 rgba(255,255,255,0.2)`,
          transition: "width 1s ease",
        }} />
      </div>
    </div>
  );
}

// ─── PANEL COMPONENT ─────────────────────────────────────────────────────────

function SplashParticles({ color = "#f5c842", count = 8, spread = 60 }) {
  const particles = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360 + (Math.random() - 0.5) * 30;
    const dist = 30 + Math.random() * 40;
    const size = 1.5 + Math.random() * 1.5;
    const dur = 1 + Math.random() * 0.6;
    const delay = Math.random() * 0.3;
    const spawnAngle = Math.random() * 360;
    const spawnDist = Math.random() * spread;
    const startX = Math.cos(spawnAngle * Math.PI / 180) * spawnDist;
    const startY = Math.sin(spawnAngle * Math.PI / 180) * spawnDist;
    return { angle, dist, size, dur, delay, startX, startY };
  });
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%",
          background: color, opacity: 0,
          animation: `splashParticle ${p.dur}s ease-out ${p.delay}s forwards`,
          transform: `translate(calc(-50% + ${p.startX}px), calc(-50% + ${p.startY}px))`,
          "--px": `${Math.cos(p.angle * Math.PI / 180) * p.dist}px`,
          "--py": `${Math.sin(p.angle * Math.PI / 180) * p.dist}px`,
        }} />
      ))}
    </div>
  );
}

function Panel({ children, style = {}, className = "" }) {
  return (
    <div className={className} style={{
      background: "linear-gradient(145deg, rgba(30,25,18,0.95), rgba(20,16,12,0.98))",
      border: "1px solid rgba(245,158,11,0.2)",
      borderRadius: "8px",
      padding: "12px",
      position: "relative",
      overflow: "hidden",
      ...style,
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(135deg, rgba(245,158,11,0.03) 0%, transparent 50%)",
        borderRadius: "8px",
      }} />
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: "10px", borderBottom: "1px solid rgba(245,158,11,0.15)", paddingBottom: "8px" }}>
      <h3 style={{
        margin: 0, fontSize: "13px", color: "#f5c842", fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
        letterSpacing: "2px", textTransform: "uppercase",
        textShadow: "0 0 20px rgba(245,158,11,0.3)",
      }}>
        <span style={{ marginRight: "8px" }}>{icon}</span>{title}
      </h3>
      {subtitle && <p style={{ margin: "4px 0 0", fontSize: "10px", color: "#8a7a65", fontFamily: "'Crimson Text', serif", fontStyle: "italic" }}>{subtitle}</p>}
    </div>
  );
}

// ─── LIFE CARD COMPONENT ─────────────────────────────────────────────────────

function LifeCard({ card, isRevealing = false, isFlipped = false, onFlip, small = false }) {
  const rarity = RARITY_COLORS[card.rarity];
  const scale = small ? 0.7 : 1;

  return (
    <div
      onClick={onFlip}
      style={{
        width: `${264 * scale}px`, height: `${372 * scale}px`, perspective: "600px",
        cursor: onFlip ? "pointer" : "default", flexShrink: 0,
      }}
    >
      <div style={{
        width: "100%", height: "100%", position: "relative",
        transformStyle: "preserve-3d",
        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        {/* Front - card back */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          background: "linear-gradient(145deg, #1a1510, #0d0a07)",
          border: `2px solid ${rarity.bg}44`,
          borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 20px ${rarity.glow}, inset 0 0 30px rgba(0,0,0,0.5)`,
        }}>
          <div style={{
            width: "60%", height: "60%", border: `1px solid ${rarity.bg}66`,
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            background: `radial-gradient(circle, ${rarity.bg}11, transparent)`,
          }}>
            <svg width={36 * scale} height={36 * scale} viewBox="0 0 24 24" fill={`${rarity.bg}66`} stroke={rarity.bg} strokeWidth="1"><path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5 2.5-7.5-6-4.5h7.5z"/></svg>
          </div>
          {onFlip && <div style={{
            position: "absolute", bottom: `${12 * scale}px`, fontSize: `${9 * scale}px`,
            color: "#8a7a65", fontFamily: "'Cinzel', serif", letterSpacing: "1px",
          }}>TAP TO REVEAL</div>}
        </div>
        {/* Back - card face */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: "linear-gradient(145deg, #1a1510, #0d0a07)",
          border: `2px solid ${rarity.bg}`,
          borderRadius: "12px", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", padding: `${16 * scale}px`,
          boxShadow: `0 0 30px ${rarity.glow}, inset 0 0 20px rgba(0,0,0,0.3)`,
        }}>
          <div style={{
            position: "absolute", top: `${8 * scale}px`, right: `${8 * scale}px`,
            fontSize: `${9 * scale}px`, color: rarity.bg, fontFamily: "'Cinzel', serif",
            letterSpacing: "1px", textTransform: "uppercase",
            padding: `${2 * scale}px ${6 * scale}px`,
            border: `1px solid ${rarity.bg}44`, borderRadius: "4px",
          }}>{rarity.label}</div>
          <div style={{
            fontSize: `${12 * scale}px`, color: rarity.bg, fontFamily: "'Cinzel', serif",
            letterSpacing: "2px", textTransform: "uppercase", marginBottom: `${12 * scale}px`, opacity: 0.7,
          }}>{card.category}</div>
          <div style={{
            fontSize: `${16 * scale}px`, color: "#e8d5b5", fontFamily: "'Crimson Text', serif",
            textAlign: "center", lineHeight: 1.5, fontStyle: "italic",
          }}>"{card.quote}"</div>
          <div style={{
            position: "absolute", bottom: `${10 * scale}px`, fontSize: `${8 * scale}px`,
            color: "#5a4f40", fontFamily: "'Cinzel', serif", letterSpacing: "2px",
          }}>LIFE CARD</div>
        </div>
      </div>
    </div>
  );
}

// ─── HERO SCENE (Spatial Parallax) ──────────────────────────────────────────

function HeroScene({ expanded = false, equipment = null, onSlotPress = null, selectedSlotId = null, registerSlotRef = null, highlightSlots = false, dragCategory = null, dragSubcategory = null, onDragStart = null, onToggle = null, characterLevel = 1 }) {
  const containerRef = useRef(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const gyroEnabledRef = useRef(false);

  // Prevent scroll while dragging on avatar
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e) => {
      if (el._didDrag) e.preventDefault();
    };
    el.addEventListener("touchmove", handler, { passive: false });
    return () => el.removeEventListener("touchmove", handler);
  }, []);

  // Request gyroscope permission on first interaction (iOS requirement)
  useEffect(() => {
    const requestGyro = async () => {
      if (gyroEnabledRef.current) return;
      if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
        try {
          const perm = await DeviceOrientationEvent.requestPermission();
          if (perm === "granted") gyroEnabledRef.current = true;
        } catch (e) {}
      } else {
        gyroEnabledRef.current = true;
      }
    };
    // Try on mount (works on Android), also listen for first touch (iOS)
    requestGyro();
    const touchHandler = () => { requestGyro(); window.removeEventListener("touchstart", touchHandler); };
    window.addEventListener("touchstart", touchHandler, { once: true });
    return () => window.removeEventListener("touchstart", touchHandler);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleOrientation = (e) => {
      if (e.gamma === null || e.beta === null) return;
      // gamma = left/right tilt (-90 to 90), beta = front/back tilt (-180 to 180)
      tiltRef.current = {
        x: Math.max(-20, Math.min(20, e.gamma)) / 20,
        y: Math.max(-20, Math.min(20, (e.beta - 40))) / 20,
      };
    };

    const handleMouse = (e) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      tiltRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };

    // Smooth interpolation loop - Apple-style eased movement
    const animate = () => {
      const lerp = 0.08; // smoothing factor - lower = smoother/slower
      smoothRef.current.x += (tiltRef.current.x - smoothRef.current.x) * lerp;
      smoothRef.current.y += (tiltRef.current.y - smoothRef.current.y) * lerp;

      const layers = container.querySelectorAll("[data-depth]");
      layers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth) || 0;
        const moveX = smoothRef.current.x * depth * 12;
        const moveY = smoothRef.current.y * depth * 8;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("deviceorientation", handleOrientation);
    container.addEventListener("mousemove", handleMouse);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      container.removeEventListener("mousemove", handleMouse);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Panel>
      <div ref={containerRef}
        onTouchStart={(e) => {
          const t = e.touches[0];
          containerRef.current._touchStart = { x: t.clientX, y: t.clientY, time: Date.now() };
          containerRef.current._didDrag = false;
        }}
        onTouchMove={(e) => {
          if (!containerRef.current?._touchStart) return;
          const t = e.touches[0];
          const dx = t.clientX - containerRef.current._touchStart.x;
          const dy = t.clientY - containerRef.current._touchStart.y;
          if (Math.abs(dx) > 5 || Math.abs(dy) > 5) containerRef.current._didDrag = true;
          const rect = containerRef.current.getBoundingClientRect();
          tiltRef.current = {
            x: Math.max(-1, Math.min(1, dx / (rect.width * 0.3))),
            y: Math.max(-1, Math.min(1, dy / (rect.height * 0.3))),
          };
        }}
        onTouchEnd={() => {
          if (!containerRef.current?._didDrag) {
            const elapsed = Date.now() - (containerRef.current?._touchStart?.time || 0);
            if (elapsed < 300) onToggle && onToggle();
          }
          tiltRef.current = { x: 0, y: 0 };
          containerRef.current._touchStart = null;
        }}
        onMouseMove={(e) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          tiltRef.current = {
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
          };
        }}
        onMouseLeave={() => { tiltRef.current = { x: 0, y: 0 }; }}
        style={{
        height: expanded ? "460px" : "200px",
        borderRadius: "6px", overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 100%, rgba(245,158,11,0.06), transparent 70%)",
        border: "1px solid rgba(245,158,11,0.1)",
        position: "relative", perspective: "800px",
        cursor: "pointer",
        transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        {/* Background layer - slow movement */}
        <div data-depth="0.3" style={{
          position: "absolute", inset: "-20px",
          background: "radial-gradient(ellipse at 50% 60%, rgba(245,158,11,0.04), transparent 60%)",
        }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${10 + (i * 7.3) % 80}%`,
              top: `${5 + (i * 13.7) % 80}%`,
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              borderRadius: "50%",
              background: `rgba(245,158,11,${0.15 + (i % 4) * 0.1})`,
              boxShadow: `0 0 ${2 + (i % 3) * 2}px rgba(245,158,11,${0.1 + (i % 3) * 0.1})`,
            }} />
          ))}
        </div>

        {/* Ground glow layer - medium movement */}
        <div data-depth="0.6" style={{
          position: "absolute", bottom: "-10px", left: "-20px", right: "-20px",
          height: "120px",
          background: "radial-gradient(ellipse at 50% 100%, rgba(245,158,11,0.12), transparent 70%)",
        }} />

        {/* Character image - main layer */}
        <div data-depth="1.0" style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center",
          paddingBottom: expanded ? "20px" : "10px",
        }}>
          <img src={CHARACTER_IMG} alt="Character" draggable={false} onContextMenu={(e) => e.preventDefault()} style={{
            WebkitTouchCallout: "none",
            height: expanded ? "400px" : "170px",
            objectFit: "contain",
            filter: "drop-shadow(0 4px 20px rgba(245,158,11,0.15)) drop-shadow(0 0 40px rgba(245,158,11,0.08)) contrast(1.1) brightness(1.05)",
            transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }} />
        </div>

        {/* Level-reactive aura + ember particles */}
        {(() => {
          const lvl = characterLevel;
          // Aura intensity scales with level
          const t1 = Math.min(lvl / 10, 1);    // 0-1 over levels 1-10
          const t2 = Math.min(lvl / 25, 1);    // 0-1 over levels 1-25
          const t3 = Math.min(lvl / 50, 1);    // 0-1 over levels 1-50
          const auraColor = lvl >= 50 ? "245,158,11" : lvl >= 25 ? "234,179,8" : lvl >= 10 ? "217,159,50" : "180,140,60";
          const emberCount = Math.floor(expanded ? 6 + t2 * 14 : 3 + t2 * 5); // 6-20 embers
          return (
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3, overflow: "hidden" }}>




              {/* Ember particles - always present, count and brightness scale */}
              {Array.from({ length: emberCount }).map((_, i) => {
                const left = 25 + Math.random() * 50;
                const delay = Math.random() * 4;
                const dur = 2.5 + Math.random() * 3;
                const size = expanded ? 1 + Math.random() * (0.8 + t2 * 1) : 0.8 + Math.random() * (0.5 + t2 * 0.5);
                const startY = expanded ? (40 + Math.random() * 35) : (30 + Math.random() * 40);
                const drift = -15 + Math.random() * 30;
                const opacity = 0.3 + Math.random() * (0.4 + t2 * 0.3);
                return (
                  <div key={`ember-${i}`} style={{
                    position: "absolute",
                    left: `${left}%`,
                    bottom: `${100 - startY}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: "50%",
                    background: lvl >= 50 ? `rgba(255,200,60,${opacity})` : lvl >= 25 ? `rgba(245,180,50,${opacity})` : `rgba(${auraColor},${opacity})`,
                    boxShadow: `0 0 ${2 + t2 * 6}px rgba(${auraColor},${opacity * 0.6})`,
                    animation: `emberFloat${i % 3} ${dur}s ease-in-out ${delay}s infinite`,
                  }} />
                );
              })}


            </div>
          );
        })()}

        {/* Foreground particles - fast movement */}
        <div data-depth="1.8" style={{
          position: "absolute", inset: "-30px", pointerEvents: "none",
        }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${15 + (i * 15.7) % 70}%`,
              top: `${20 + (i * 19.3) % 60}%`,
              width: `${2 + (i % 2)}px`,
              height: `${2 + (i % 2)}px`,
              borderRadius: "50%",
              background: `rgba(245,200,66,${0.3 + (i % 3) * 0.15})`,
              boxShadow: `0 0 ${4 + (i % 3) * 3}px rgba(245,158,11,${0.2 + (i % 3) * 0.1})`,
            }} />
          ))}
        </div>

        {/* Equipment slots overlay */}
        {expanded && equipment && (
          <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
            {/* Left slots */}
            <div style={{ position: "absolute", left: "6px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "5px", pointerEvents: "auto" }}>
              {EQUIP_SLOTS.filter(s => s.side === "left").map(slot => {
                const item = equipment[slot.id];
                const rc = item ? RARITY_COLORS[item.rarity] : null;
                const IconFn = SLOT_ICONS[slot.id];
                return (
                  <div key={slot.id} ref={el => registerSlotRef && registerSlotRef(slot.id, el)}
                    onClick={() => !window._isDragging && onSlotPress && onSlotPress(slot, item)}
                    onTouchStart={(e) => {
                      if (!item || !onDragStart) return;
                      const t = e.touches[0];
                      e.currentTarget._ds = { x: t.clientX, y: t.clientY };
                      e.currentTarget._ha = true;
                      e.currentTarget._ht = setTimeout(() => {
                        if (navigator.vibrate) navigator.vibrate(30);
                        onDragStart(item, "equipment", slot.id, t.clientX, t.clientY);
                      }, 250);
                    }}
                    onTouchMove={(e) => {
                      const t = e.touches[0];
                      const ds = e.currentTarget._ds;
                      if (ds && e.currentTarget._ha && !window._isDragging) {
                        if (Math.hypot(t.clientX - ds.x, t.clientY - ds.y) > 10) {
                          clearTimeout(e.currentTarget._ht); e.currentTarget._ha = false;
                        }
                      }
                    }}
                    onTouchEnd={(e) => { clearTimeout(e.currentTarget?._ht); if(e.currentTarget) e.currentTarget._ha = false; }}
                    style={{
                      width: "44px", height: "44px", borderRadius: "8px",
                      background: item ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)",
                      border: highlightSlots && slot.category === dragCategory && slot.subcategories && slot.subcategories.includes(dragSubcategory) ? "1.5px dashed rgba(245,158,11,0.5)" : selectedSlotId === slot.id ? "2px solid #f59e0b" : `1px solid ${item ? rc.bg + "40" : "rgba(255,255,255,0.06)"}`,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
                      animation: highlightSlots && slot.category === dragCategory && slot.subcategories && slot.subcategories.includes(dragSubcategory) ? "equipSelect 1.5s ease-in-out infinite" : selectedSlotId === slot.id ? "equipSelect 1.5s ease-in-out infinite" : undefined,
                      transition: "border 0.2s",
                  }}>
                    {item ? (
                      item.image ? (
                        <img src={item.image} style={{ width: "36px", height: "36px", objectFit: "cover", borderRadius: "5px" }} />
                      ) : (
                        <>
                          {(() => { const si = item.subcategory && SUBCAT_ICONS[item.subcategory]; const ci = item.category && ASSET_CAT_ICONS[item.category]; return si ? si(16, rc.bg) : ci ? ci(16, rc.bg) : IconFn ? IconFn(15, rc.bg) : null; })()}
                          <div style={{ fontSize: "4.5px", color: rc.bg, fontFamily: "'Cinzel', serif", textAlign: "center", marginTop: "1px", maxWidth: "40px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name.split(" ").slice(0,2).join(" ")}</div>
                        </>
                      )
                    ) : (
                      <>
                        {IconFn && IconFn(15, "#3d352a")}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Right slots */}
            <div style={{ position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "5px", pointerEvents: "auto" }}>
              {EQUIP_SLOTS.filter(s => s.side === "right").map(slot => {
                const item = equipment[slot.id];
                const rc = item ? RARITY_COLORS[item.rarity] : null;
                const IconFn = SLOT_ICONS[slot.id];
                return (
                  <div key={slot.id} ref={el => registerSlotRef && registerSlotRef(slot.id, el)}
                    onClick={() => !window._isDragging && onSlotPress && onSlotPress(slot, item)}
                    onTouchStart={(e) => {
                      if (!item || !onDragStart) return;
                      const t = e.touches[0];
                      e.currentTarget._ds = { x: t.clientX, y: t.clientY };
                      e.currentTarget._ha = true;
                      e.currentTarget._ht = setTimeout(() => {
                        if (navigator.vibrate) navigator.vibrate(30);
                        onDragStart(item, "equipment", slot.id, t.clientX, t.clientY);
                      }, 250);
                    }}
                    onTouchMove={(e) => {
                      const t = e.touches[0];
                      const ds = e.currentTarget._ds;
                      if (ds && e.currentTarget._ha && !window._isDragging) {
                        if (Math.hypot(t.clientX - ds.x, t.clientY - ds.y) > 10) {
                          clearTimeout(e.currentTarget._ht); e.currentTarget._ha = false;
                        }
                      }
                    }}
                    onTouchEnd={(e) => { clearTimeout(e.currentTarget?._ht); if(e.currentTarget) e.currentTarget._ha = false; }}
                    style={{
                      width: "44px", height: "44px", borderRadius: "8px",
                      background: item ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)",
                      border: highlightSlots && slot.category === dragCategory && slot.subcategories && slot.subcategories.includes(dragSubcategory) ? "1.5px dashed rgba(245,158,11,0.5)" : selectedSlotId === slot.id ? "2px solid #f59e0b" : `1px solid ${item ? rc.bg + "40" : "rgba(255,255,255,0.06)"}`,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
                      animation: highlightSlots && slot.category === dragCategory && slot.subcategories && slot.subcategories.includes(dragSubcategory) ? "equipSelect 1.5s ease-in-out infinite" : selectedSlotId === slot.id ? "equipSelect 1.5s ease-in-out infinite" : undefined,
                      transition: "border 0.2s",
                  }}>
                    {item ? (
                      item.image ? (
                        <img src={item.image} style={{ width: "36px", height: "36px", objectFit: "cover", borderRadius: "5px" }} />
                      ) : (
                        <>
                          {(() => { const si = item.subcategory && SUBCAT_ICONS[item.subcategory]; const ci = item.category && ASSET_CAT_ICONS[item.category]; return si ? si(16, rc.bg) : ci ? ci(16, rc.bg) : IconFn ? IconFn(15, rc.bg) : null; })()}
                          <div style={{ fontSize: "4.5px", color: rc.bg, fontFamily: "'Cinzel', serif", textAlign: "center", marginTop: "1px", maxWidth: "40px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name.split(" ").slice(0,2).join(" ")}</div>
                        </>
                      )
                    ) : (
                      <>
                        {IconFn && IconFn(15, "#3d352a")}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          {/* Bottom-left slot - Locked */}
          <div style={{ position: "absolute", bottom: "6px", left: "6px", zIndex: 5 }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "8px",
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.04)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
              opacity: 0.5,
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3d352a" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <div style={{ fontSize: "4px", color: "#3d352a", fontFamily: "'Cinzel', serif", marginTop: "1px" }}>LOCKED</div>
            </div>
          </div>

          {/* Bottom-right slot - Vehicle */}
          <div style={{
            position: "absolute", bottom: "6px", right: "6px", zIndex: 5,
          }}>
            {EQUIP_SLOTS.filter(s => s.side === "bottom_right").map(slot => {
              const item = equipment[slot.id];
              const rc = item ? RARITY_COLORS[item.rarity] : null;
              const IconFn = SLOT_ICONS[slot.id];
              return (
                <div key={slot.id} ref={el => registerSlotRef && registerSlotRef(slot.id, el)}
                  onClick={() => !window._isDragging && onSlotPress && onSlotPress(slot, item)}
                  onTouchStart={(e) => {
                    if (!item || !onDragStart) return;
                    const t = e.touches[0];
                    e.currentTarget._ds = { x: t.clientX, y: t.clientY };
                    e.currentTarget._ha = true;
                    e.currentTarget._ht = setTimeout(() => {
                      if (navigator.vibrate) navigator.vibrate(30);
                      onDragStart(item, "equipment", slot.id, t.clientX, t.clientY);
                    }, 250);
                  }}
                  onTouchMove={(e) => {
                    const t = e.touches[0];
                    const ds = e.currentTarget._ds;
                    if (ds && e.currentTarget._ha && !window._isDragging) {
                      if (Math.hypot(t.clientX - ds.x, t.clientY - ds.y) > 10) {
                        clearTimeout(e.currentTarget._ht); e.currentTarget._ha = false;
                      }
                    }
                  }}
                  onTouchEnd={(e) => { clearTimeout(e.currentTarget?._ht); if(e.currentTarget) e.currentTarget._ha = false; }}
                  style={{
                    width: "44px", height: "44px", borderRadius: "8px",
                    background: item ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)",
                    border: highlightSlots && slot.category === dragCategory && slot.subcategories && slot.subcategories.includes(dragSubcategory) ? "1.5px dashed rgba(245,158,11,0.5)" : `1px solid ${item ? rc.bg + "40" : "rgba(255,255,255,0.06)"}`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
                    animation: highlightSlots && slot.category === dragCategory && slot.subcategories && slot.subcategories.includes(dragSubcategory) ? "equipSelect 1.5s ease-in-out infinite" : undefined,
                    transition: "border 0.2s",
                }}>
                  {item ? (
                    item.image ? (
                      <img src={item.image} style={{ width: "36px", height: "36px", objectFit: "cover", borderRadius: "5px" }} />
                    ) : (
                      <>
                        {(() => { const si = item.subcategory && SUBCAT_ICONS[item.subcategory]; const ci = item.category && ASSET_CAT_ICONS[item.category]; return si ? si(16, rc.bg) : ci ? ci(16, rc.bg) : IconFn ? IconFn(15, rc.bg) : null; })()}
                        <div style={{ fontSize: "4.5px", color: rc.bg, fontFamily: "'Cinzel', serif", textAlign: "center", marginTop: "1px", maxWidth: "40px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name.split(" ").slice(0,2).join(" ")}</div>
                      </>
                    )
                  ) : (
                    <>
                      {IconFn && IconFn(15, "#3d352a")}
                      <div style={{ fontSize: "4px", color: "#3d352a", fontFamily: "'Cinzel', serif", marginTop: "1px" }}>{slot.label}</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          </div>
        )}
      </div>
    </Panel>
  );
}

// ─── IMAGE CROP MODAL ─────────────────────────────────────────────────────────

function ImageCropModal({ imageSrc, onConfirm, onCancel }) {
  const canvasRef = useRef(null);
  const [imgEl, setImgEl] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [cropScale, setCropScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const lastPos = useRef(null);
  const lastPinchDist = useRef(null);
  const containerSize = 280;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const fitScale = Math.max(containerSize / img.width, containerSize / img.height);
      setCropScale(fitScale);
      setOffset({
        x: (containerSize - img.width * fitScale) / 2,
        y: (containerSize - img.height * fitScale) / 2,
      });
      setImgEl(img);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    if (!imgEl || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const pad = 4;
    const rad = 12;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, containerSize, containerSize);
    // Clip to rounded rect and draw image
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(pad, pad, containerSize - pad * 2, containerSize - pad * 2, rad);
    ctx.clip();
    ctx.drawImage(imgEl, offset.x, offset.y, imgEl.width * cropScale, imgEl.height * cropScale);
    ctx.restore();
    // Dark overlay outside rounded rect via even-odd
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.62)";
    ctx.beginPath();
    ctx.rect(0, 0, containerSize, containerSize);
    ctx.roundRect(pad, pad, containerSize - pad * 2, containerSize - pad * 2, rad);
    ctx.fill("evenodd");
    ctx.restore();
    // Rounded rect border
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(pad, pad, containerSize - pad * 2, containerSize - pad * 2, rad);
    ctx.stroke();
  }, [imgEl, offset, cropScale]);

  const onMouseDown = (e) => { setDragging(true); lastPos.current = { x: e.clientX, y: e.clientY }; };
  const onMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.current.x, dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setOffset(o => ({ x: o.x + dx, y: o.y + dy }));
  };
  const onMouseUp = () => setDragging(false);

  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinchDist.current = Math.hypot(dx, dy);
    }
  };
  const onTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length === 1 && lastPos.current) {
      const dx = e.touches[0].clientX - lastPos.current.x, dy = e.touches[0].clientY - lastPos.current.y;
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setOffset(o => ({ x: o.x + dx, y: o.y + dy }));
    } else if (e.touches.length === 2 && lastPinchDist.current) {
      const t0 = e.touches[0], t1 = e.touches[1];
      const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
      const rawDelta = dist / lastPinchDist.current;
      const delta = rawDelta > 1 ? 1 + (rawDelta - 1) * 0.45 : 1 - (1 - rawDelta) * 0.45;
      lastPinchDist.current = dist;
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const scaleRatio = containerSize / rect.width;
        const midX = ((t0.clientX + t1.clientX) / 2 - rect.left) * scaleRatio;
        const midY = ((t0.clientY + t1.clientY) / 2 - rect.top) * scaleRatio;
        setOffset(o => ({ x: midX - (midX - o.x) * delta, y: midY - (midY - o.y) * delta }));
      }
      setCropScale(s => Math.min(8, Math.max(0.1, s * delta)));
    }
  };
  const onTouchEnd = () => { lastPos.current = null; lastPinchDist.current = null; };

  const onWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1.06 : 0.95;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleRatio = containerSize / rect.width;
      const mx = (e.clientX - rect.left) * scaleRatio, my = (e.clientY - rect.top) * scaleRatio;
      setOffset(o => ({ x: mx - (mx - o.x) * delta, y: my - (my - o.y) * delta }));
    }
    setCropScale(s => Math.min(8, Math.max(0.1, s * delta)));
  };

  const confirmCrop = () => {
    const out = document.createElement("canvas");
    out.width = 300; out.height = 300;
    const ctx = out.getContext("2d");
    const ratio = 300 / containerSize;
    const rad = 12 * ratio;
    ctx.beginPath();
    ctx.roundRect(0, 0, 300, 300, rad);
    ctx.clip();
    ctx.drawImage(imgEl, offset.x * ratio, offset.y * ratio, imgEl.width * cropScale * ratio, imgEl.height * cropScale * ratio);
    onConfirm(out.toDataURL("image/jpeg", 0.88));
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 3000,
      background: "rgba(0,0,0,0.92)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{ color: "#f5c842", fontFamily: "'Cinzel Decorative', serif", fontSize: 17, marginBottom: 8 }}>Crop Photo</div>
      <div style={{ color: "#8a7a65", fontFamily: "'Fira Code', monospace", fontSize: 11, marginBottom: 20, textAlign: "center" }}>
        Drag to reposition · Pinch or scroll to zoom
      </div>
      <div style={{
        borderRadius: "12px", overflow: "hidden",
        boxShadow: "0 0 0 4px rgba(245,158,11,0.25), 0 8px 40px rgba(0,0,0,0.8)",
        cursor: dragging ? "grabbing" : "grab",
      }}>
        <canvas
          ref={canvasRef} width={containerSize} height={containerSize}
          onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onWheel={onWheel}
          style={{ display: "block", touchAction: "none", maxWidth: "80vw", maxHeight: "80vw" }}
        />
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 28, width: "100%", maxWidth: 300 }}>
        <button onClick={onCancel} style={{
          flex: 1, padding: "13px 0", borderRadius: 12,
          background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)",
          color: "#8a7a65", fontFamily: "'Cinzel', serif", fontSize: 13, cursor: "pointer",
        }}>Cancel</button>
        <button onClick={confirmCrop} style={{
          flex: 2, padding: "13px 0", borderRadius: 12,
          background: "linear-gradient(135deg, rgba(245,158,11,0.4), rgba(245,158,11,0.2))", border: "1px solid rgba(245,158,11,0.4)",
          color: "#f5c842", fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 700, cursor: "pointer",
        }}>Use Photo</button>
      </div>
    </div>
  );
}

// ─── EDIT MODAL ──────────────────────────────────────────────────────────────

function EditModal({ title, fields, values, onSave, onCancel }) {
  const [formData, setFormData] = useState(values);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "12px",
    }} onClick={onCancel}>
      <Panel style={{ maxWidth: "400px", width: "100%", maxHeight: "85vh", overflowY: "auto" }} className="">
        <div onClick={e => e.stopPropagation()}>
          <SectionHeader icon={<QuillIcon />} title={title} />
          {fields.map(f => (
            <div key={f.key} style={{ marginBottom: "12px" }}>
              <label style={{
                display: "block", fontSize: "10px", color: "#c4a882",
                fontFamily: "'Cinzel', serif", letterSpacing: "1px", marginBottom: "4px",
              }}>{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  value={formData[f.key] || ""}
                  onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                  style={{
                    width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(245,158,11,0.2)",
                    borderRadius: "4px", color: "#e8d5b5", padding: "8px", fontSize: "16px",
                    fontFamily: "'Crimson Text', serif", resize: "vertical", minHeight: "60px",
                    outline: "none", boxSizing: "border-box",
                  }}
                />
              ) : f.type === "select" ? (
                <select
                  value={formData[f.key] || ""}
                  onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                  style={{
                    width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(245,158,11,0.2)",
                    borderRadius: "4px", color: "#e8d5b5", padding: "8px", fontSize: "16px",
                    fontFamily: "'Crimson Text', serif", outline: "none",
                  }}
                >
                  {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : (
                <input
                  type={f.type || "text"}
                  value={formData[f.key] ?? ""}
                  onChange={e => setFormData(p => ({ ...p, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value }))}
                  style={{
                    width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(245,158,11,0.2)",
                    borderRadius: "4px", color: "#e8d5b5", padding: "8px", fontSize: "16px",
                    fontFamily: "'Crimson Text', serif", outline: "none", boxSizing: "border-box",
                  }}
                />
              )}
            </div>
          ))}
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            <button onClick={() => onSave(formData)} style={{
              flex: 1, padding: "10px", background: "linear-gradient(145deg, rgba(245,158,11,0.3), rgba(245,158,11,0.1))",
              border: "1px solid rgba(245,158,11,0.4)", borderRadius: "6px", color: "#f5c842",
              fontFamily: "'Cinzel', serif", fontSize: "12px", cursor: "pointer", letterSpacing: "1px",
            }}>SAVE</button>
            <button onClick={onCancel} style={{
              flex: 1, padding: "10px", background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#8a7a65",
              fontFamily: "'Cinzel', serif", fontSize: "12px", cursor: "pointer", letterSpacing: "1px",
            }}>CANCEL</button>
          </div>
        </div>
      </Panel>
    </div>
  );
}

// ─── SMALL ACTION BUTTON ─────────────────────────────────────────────────────

function ActionBtn({ onClick, children, danger = false }) {
  return (
    <button onClick={onClick} style={{
      padding: "4px 10px", fontSize: "10px", cursor: "pointer", letterSpacing: "1px",
      fontFamily: "'Cinzel', serif",
      background: danger ? "rgba(220,38,38,0.15)" : "rgba(245,158,11,0.1)",
      border: `1px solid ${danger ? "rgba(220,38,38,0.3)" : "rgba(245,158,11,0.25)"}`,
      borderRadius: "4px", color: danger ? "#ef4444" : "#c4a882",
      transition: "all 0.2s",
    }}>{children}</button>
  );
}

// ─── QUEST CREATOR MODAL ────────────────────────────────────────────────────

function QuestCreator({ onSave, onCancel, generateSteps, isGenerating, initialValues }) {
  const isEdit = !!initialValues;
  const [name, setName] = useState(initialValues?.name || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [type, setType] = useState(initialValues?.type || "main");
  const [xpReward, setXpReward] = useState(initialValues?.xpReward || "");
  const [steps, setSteps] = useState(initialValues?.steps || []);
  const [newStep, setNewStep] = useState("");
  const [aiBuilding, setAiBuilding] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showAiBuilder, setShowAiBuilder] = useState(false);

  const addStep = () => {
    const text = newStep.trim();
    if (!text) return;
    setSteps(prev => [...prev, { text, done: false }]);
    setNewStep("");
  };

  const removeStep = (idx) => setSteps(prev => prev.filter((_, i) => i !== idx));

  const testApiConnection = useCallback(async () => {
    setApiTesting(true);
    setApiTestResult(null);
    try {
      const key = localStorage.getItem("rpg-api-key") || "";
      if (!key) { setApiTestResult({ ok: false, msg: "No API key stored." }); setApiTesting(false); return; }
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 10, messages: [{ role: "user", content: "Say hi" }] }),
      });
      const data = await res.json();
      if (data.error) {
        setApiTestResult({ ok: false, msg: data.error.message || data.error.type || "Unknown error" });
      } else {
        setApiTestResult({ ok: true, msg: "Connection successful!" });
      }
    } catch (err) {
      setApiTestResult({ ok: false, msg: "Network error: " + err.message });
    }
    setApiTesting(false);
  }, []);

  const formatApiError = (errMsg) => {
    if (/credit balance/i.test(errMsg)) return "Your API key's workspace has no credits. Go to console.anthropic.com → check the workspace (top-left) → Plans & Billing to add credits. Note: each workspace has its own balance.";
    if (/invalid.*key|authentication|unauthorized/i.test(errMsg)) return "Invalid API key. Go to console.anthropic.com → API Keys to get a valid key, then update it in Settings.";
    if (/rate limit|too many/i.test(errMsg)) return "Rate limited — too many requests. Wait a moment and try again.";
    if (/overloaded/i.test(errMsg)) return "Claude is currently overloaded. Try again in a few seconds.";
    return errMsg + " Check your API key in Settings.";
  };

  const handleSmartBuild = async () => {
    const input = aiPrompt.trim() || name.trim();
    if (!input || aiBuilding) return;
    setAiBuilding(true);
    try {
      const response = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a quest designer for a dark fantasy RPG life management app. The user wants to create a quest. Generate structured quest data from their description.

User input: "${input}"
${description ? `Additional context: "${description}"` : ""}

Respond with ONLY valid JSON, no markdown or backticks:
{
  "name": "Short compelling quest name (max 6 words)",
  "description": "One sentence describing the quest goal",
  "type": "main or side (main = major life goal, side = smaller project)",
  "steps": [
    "Specific actionable step 1",
    "Specific actionable step 2",
    "... (5-10 SMART steps, each clear and measurable)"
  ],
  "skillCategory": "mind|wealth|body|charisma|leadership|creator|spirit",
  "estimatedXp": number between 50-500 based on scope
}`
          }],
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(formatApiError(data.error.message || data.error.type || "Unknown API error"));
      const rawText = data.content?.map(c => c.text || "").join("") || "";
      const parsed = JSON.parse(rawText.replace(/```json|```/g, "").trim());

      if (parsed.name && !name) setName(parsed.name);
      if (parsed.description) setDescription(parsed.description);
      if (parsed.type) setType(parsed.type);
      if (parsed.estimatedXp) setXpReward(parsed.estimatedXp);
      if (parsed.steps && parsed.steps.length > 0) {
        setSteps(parsed.steps.map(s => ({ text: s, done: false })));
      }
      setShowAiBuilder(false);
      setAiPrompt("");
    } catch (err) {
      console.error("Smart build error:", err);
    }
    setAiBuilding(false);
  };

  const inputStyle = {
    width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(245,158,11,0.2)",
    borderRadius: "4px", color: "#e8d5b5", padding: "8px", fontSize: "16px",
    fontFamily: "'Crimson Text', serif", outline: "none", boxSizing: "border-box",
  };
  const labelStyle = {
    display: "block", fontSize: "10px", color: "#c4a882",
    fontFamily: "'Cinzel', serif", letterSpacing: "1px", marginBottom: "4px",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "12px",
    }} onClick={onCancel}>
      <Panel style={{ maxWidth: "420px", width: "100%", maxHeight: "88vh", overflowY: "auto" }}>
        <div onClick={e => e.stopPropagation()}>
          <SectionHeader icon={<ScrollIcon />} title={isEdit ? "Edit Quest" : "New Quest"} subtitle={isEdit ? "Modify your mission" : "Define your mission"} />

          <div style={{ marginBottom: "10px" }}>
            <label style={labelStyle}>Quest Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter quest name..." style={inputStyle} />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label style={labelStyle}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What is this quest about?"
              style={{ ...inputStyle, resize: "vertical", minHeight: "50px" }} />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Type</label>
            <select value={type} onChange={e => setType(e.target.value)}
              style={{ ...inputStyle, background: "rgba(0,0,0,0.4)" }}>
              <option value="main">Main Quest</option>
              <option value="side">Side Quest</option>
              <option value="misc">Miscellaneous</option>
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>XP Reward (leave empty for auto)</label>
            <input type="number" value={xpReward} onChange={e => setXpReward(e.target.value)}
              placeholder="Auto-calculated" style={inputStyle} />
          </div>

          {/* Smart Quest Builder */}
          <div style={{ marginBottom: "12px" }}>
            {!showAiBuilder ? (
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={() => setShowAiBuilder(true)} style={{
                  flex: 1, padding: "10px", borderRadius: "8px", cursor: "pointer",
                  background: "rgba(147,220,255,0.06)", border: "1px solid rgba(147,220,255,0.2)",
                  color: "rgba(147,220,255,0.8)", fontFamily: "'Cinzel', serif", fontSize: "10px",
                  letterSpacing: "1px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="2" fill="rgba(147,220,255,0.9)"/>
                    <path d="M10 12 Q5 8 7 4 Q9 8 10 12" fill="rgba(147,220,255,0.15)" stroke="rgba(147,220,255,0.5)" strokeWidth="0.7"/>
                    <path d="M14 12 Q19 8 17 4 Q15 8 14 12" fill="rgba(147,220,255,0.15)" stroke="rgba(147,220,255,0.5)" strokeWidth="0.7"/>
                  </svg>
                  SMART BUILD
                </button>
              </div>
            ) : (
              <div style={{
                padding: "10px", borderRadius: "8px",
                background: "rgba(147,220,255,0.04)", border: "1px solid rgba(147,220,255,0.15)",
              }}>
                <label style={{ display: "block", fontSize: "9px", color: "rgba(147,220,255,0.7)", fontFamily: "'Cinzel', serif", letterSpacing: "1px", marginBottom: "6px" }}>
                  Describe your project or goal
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={e => setAiPrompt(e.target.value)}
                  placeholder="e.g. I need to rebuild my portfolio website with a new design, migrate content, and set up analytics..."
                  style={{
                    width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(147,220,255,0.15)",
                    borderRadius: "6px", color: "#e8d5b5", padding: "10px", fontSize: "16px",
                    fontFamily: "'Crimson Text', serif", outline: "none", boxSizing: "border-box",
                    resize: "vertical", minHeight: "70px",
                  }}
                />
                <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                  <button onClick={() => { setShowAiBuilder(false); setAiPrompt(""); }} style={{
                    padding: "7px 14px", borderRadius: "6px", cursor: "pointer",
                    background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)",
                    color: "#8a7a65", fontFamily: "'Cinzel', serif", fontSize: "9px",
                  }}>CANCEL</button>
                  <button onClick={handleSmartBuild} style={{
                    flex: 1, padding: "7px 14px", borderRadius: "6px", cursor: "pointer",
                    background: aiBuilding ? "rgba(147,220,255,0.08)" : "rgba(147,220,255,0.12)",
                    border: "1px solid rgba(147,220,255,0.3)",
                    color: "rgba(147,220,255,0.9)", fontFamily: "'Cinzel', serif", fontSize: "10px",
                    letterSpacing: "0.5px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  }}>
                    {aiBuilding ? "Building quest..." : <><SparkleIcon size={10} color="rgba(147,220,255,0.9)" /> GENERATE QUEST</>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Steps Section */}
          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Steps ({steps.length})</label>
            </div>

            {/* Existing steps */}
            {steps.map((step, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "6px 4px", borderBottom: "1px solid rgba(245,158,11,0.06)",
              }}>
                <div onClick={() => setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, done: !s.done } : s))}
                  style={{ cursor: "pointer", flexShrink: 0 }}>
                  {step.done
                    ? <DiamondFilledIcon size={8} color="#4a7a3a" />
                    : <DiamondMarkerIcon size={8} color="#5a4f40" />
                  }
                </div>
                <span style={{
                  flex: 1, fontSize: "12px", color: step.done ? "#5a6b4e" : "#c4a882", lineHeight: 1.3,
                  textDecoration: step.done ? "line-through" : "none", opacity: step.done ? 0.7 : 1,
                }}>{step.text}</span>
                <div onClick={() => removeStep(i)} style={{ cursor: "pointer", padding: "2px", flexShrink: 0 }}>
                  <TrashIcon size={10} color="#6b4040" />
                </div>
              </div>
            ))}

            {/* Add step input */}
            <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
              <input
                value={newStep}
                onChange={e => setNewStep(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addStep()}
                placeholder="Add a step..."
                style={{ ...inputStyle, fontSize: "16px", padding: "6px 8px" }}
              />
              <button onClick={addStep} style={{
                padding: "6px 10px", background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.25)", borderRadius: "4px",
                cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center",
              }}>
                <PlusIcon size={14} color="#c4a882" />
              </button>
            </div>

            {/* XP preview */}
            {steps.length > 0 && (() => {
              let totalXP;
              if (xpReward && Number(xpReward) > 0) {
                totalXP = Number(xpReward);
              } else {
                const questPct = type === "main" ? 0.20 : type === "side" ? 0.10 : 0.05;
                totalXP = Math.floor(1200 * questPct);
              }
              const perStep = Math.floor(totalXP * 0.7 / steps.length);
              const bonus = Math.floor(totalXP * 0.3);
              return (
                <div style={{
                  marginTop: "8px", padding: "6px 8px", borderRadius: "4px",
                  background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.1)",
                  fontSize: "9px", color: "#8a7a65", fontFamily: "'Fira Code', monospace",
                  display: "flex", justifyContent: "space-between",
                }}>
                  <span>+{perStep} XP/step</span>
                  <span>+{bonus} bonus</span>
                  <span>~{totalXP} total</span>
                </div>
              );
            })()}
          </div>

          <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
            <button onClick={() => {
              if (!name.trim()) return;
              onSave({ name, description, type, xpReward: xpReward ? Number(xpReward) : null, steps: steps.length > 0 ? steps : [{ text: "Complete this quest", done: false }] });
            }} style={{
              flex: 1, padding: "10px", background: "linear-gradient(145deg, rgba(245,158,11,0.3), rgba(245,158,11,0.1))",
              border: "1px solid rgba(245,158,11,0.4)", borderRadius: "6px", color: "#f5c842",
              fontFamily: "'Cinzel', serif", fontSize: "12px", cursor: "pointer", letterSpacing: "1px",
              opacity: name.trim() ? 1 : 0.4,
            }}>{ isEdit ? "SAVE CHANGES" : "CREATE QUEST"}</button>
            <button onClick={onCancel} style={{
              flex: 1, padding: "10px", background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#8a7a65",
              fontFamily: "'Cinzel', serif", fontSize: "12px", cursor: "pointer", letterSpacing: "1px",
            }}>CANCEL</button>
          </div>
        </div>
      </Panel>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

function App() {
  const [activeTab, setActiveTab] = useState("character");
  const [character, setCharacter] = useState(null);
  const [skills, setSkills] = useState(null);
  const [quests, setQuests] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [equipment, setEquipment] = useState(null);
  const [assets, setAssets] = useState(null);
  const [collectedCards, setCollectedCards] = useState(null);
  const [dailyCard, setDailyCard] = useState(null);
  const [dailyFlipped, setDailyFlipped] = useState(false);
  const [lastCardDate, setLastCardDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [splashPhase, setSplashPhase] = useState(0); // 0=idle, 1=title visible, 2=flying to header, 3=done
  const splashTimerRef = useRef(null);
  const [editModal, setEditModal] = useState(null);
  const [skillDetail, setSkillDetail] = useState(null);
  const [showLocked, setShowLocked] = useState(false);
  const [showCardOverlay, setShowCardOverlay] = useState(false);
  const [cardCopied, setCardCopied] = useState(false);
  const [challenges, setChallenges] = useState(null);
  const [challengeLog, setChallengeLog] = useState({});
  const [reminders, setReminders] = useState([]);
  const [activeNudge, setActiveNudge] = useState(null);
  const [mounted, setMounted] = useState(false);


  // Lock body scroll when any overlay is open (iOS PWA fix)
  useEffect(() => {
    const hasOverlay = activeNudge || showQuestCreator || skillDetail || itemDetail || statsExpanded || (splashPhase > 0 && splashPhase < 3);
    if (hasOverlay) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [activeNudge, showQuestCreator, skillDetail, itemDetail, statsExpanded, splashPhase]);

  // Dim screen when header buttons fly in, then clear
  useEffect(() => {
    if ((dailyCard && !dailyFlipped) || pendingDailyXp) {
      const dimTimer = setTimeout(() => setHeaderDimmed(true), 1800);
      const clearTimer = setTimeout(() => setHeaderDimmed(false), 3500);
      return () => { clearTimeout(dimTimer); clearTimeout(clearTimer); };
    }
  }, []);
  const [expandedQuest, setExpandedQuest] = useState(null);
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [mainQuestTab, setMainQuestTab] = useState("all");
  const [generatingSteps, setGeneratingSteps] = useState(false);
  const [questCompleteOverlay, setQuestCompleteOverlay] = useState(null);
  const [levelUpOverlay, setLevelUpOverlay] = useState(null);
  const [undoState, setUndoState] = useState(null);
  const [showQuestCreator, setShowQuestCreator] = useState(false);
  const [journalEntries, setJournalEntries] = useState({});
  const [dailyXpAwarded, setDailyXpAwarded] = useState(false);
  const [pendingDailyXp, setPendingDailyXp] = useState(null);
  const [xpSplash, setXpSplash] = useState(null);
  const [splashFading, setSplashFading] = useState(false);
  const [itemDetail, setItemDetail] = useState(null);
  const [itemEditModal, setItemEditModal] = useState(null);
  const [cropSrc, setCropSrc] = useState(null);
  const [cropTarget, setCropTarget] = useState(null);
  const [dragItem, setDragItem] = useState(null); // { item, source, slotId?, assetName?, startX, startY }
  const dragPosRef = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragGhostRef = useRef(null);
  const dragTimerRef = useRef(null);
  const slotRectsRef = useRef({}); // slot id -> bounding rect
  const gridRectsRef = useRef({}); // asset name -> bounding rect
  const [highlightSlots, setHighlightSlots] = useState(false);
  const [assetsExpanded, setAssetsExpanded] = useState(false);
  const [statsExpanded, setStatsExpanded] = useState(null); // stat key for popup e.g. "INT"
  const [statCatOpen, setStatCatOpen] = useState(null); // category key expanded inside popup e.g. "mind"
  const [statSkillOpen, setStatSkillOpen] = useState(null); // skill name expanded inside popup
  const lastHoverSlotRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const autoScrollRef = useRef(null);

  // ── Settings State ──
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("rpg-api-key") || "");
  const [apiKeyLocked, setApiKeyLocked] = useState(() => !!localStorage.getItem("rpg-api-key"));
  const [apiTestResult, setApiTestResult] = useState(null);
  const [apiTesting, setApiTesting] = useState(false);
  const [brightness, setBrightness] = useState(() => {
    const saved = localStorage.getItem("rpg-brightness");
    return saved ? parseFloat(saved) : 1;
  });
  const [appTheme, setAppTheme] = useState(() => localStorage.getItem("rpg-theme") || "dark-fantasy");

  // Persist brightness
  useEffect(() => {
    localStorage.setItem("rpg-brightness", String(brightness));
  }, [brightness]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem("rpg-theme", appTheme);
  }, [appTheme]);

  // Global drag management: scroll prevention, auto-scroll, ghost position, haptics, drop
  useEffect(() => {
    if (!isDragging) return;
    const prevent = (e) => e.preventDefault();
    const handleMove = (e) => {
      const touch = e.touches?.[0];
      if (!touch) return;
      dragPosRef.current = { x: touch.clientX, y: touch.clientY };
      if (dragGhostRef.current) {
        dragGhostRef.current.style.left = (touch.clientX - 28) + "px";
        dragGhostRef.current.style.top = (touch.clientY - 28) + "px";
      }
      // Update scroll zone intensity (rAF loop handles actual scrolling)
      autoScrollRef.current.y = touch.clientY;
      // Hover haptics on valid slots
      const dc = dragItem?.item?.category || "";
      const ds = dragItem?.item?.subcategory || "";
      let hSlot = null;
      for (const [sid, el] of Object.entries(slotRectsRef.current)) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (touch.clientX >= r.left && touch.clientX <= r.right && touch.clientY >= r.top && touch.clientY <= r.bottom) {
          const sd = EQUIP_SLOTS.find(s => s.id === sid);
          if (sd && sd.category === dc && sd.subcategories.includes(ds)) hSlot = sid;
          break;
        }
      }
      if (hSlot && hSlot !== lastHoverSlotRef.current) {
        if (navigator.vibrate) navigator.vibrate(10);
        lastHoverSlotRef.current = hSlot;
      } else if (!hSlot) lastHoverSlotRef.current = null;
    };
    const handleEnd = () => {
      if (!dragItem) { setIsDragging(false); setHighlightSlots(false); window._isDragging = false; return; }
      const x = dragPosRef.current.x, y = dragPosRef.current.y;
      let dropped = false;
      for (const [slotId, el] of Object.entries(slotRectsRef.current)) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
          const slotDef = EQUIP_SLOTS.find(s => s.id === slotId);
          const dCat = dragItem.item.category || "", dSub = dragItem.item.subcategory || "";
          if (!(slotDef && slotDef.category === dCat && slotDef.subcategories.includes(dSub))) {
            if (navigator.vibrate) navigator.vibrate([30,30,30]); break;
          }
          const newEquip = JSON.parse(JSON.stringify(equipment));
          const oldInSlot = newEquip[slotId] ? { ...newEquip[slotId] } : null;
          if (dragItem.source === "inventory") {
            const toEquip = JSON.parse(JSON.stringify(dragItem.item));
            delete toEquip._equipped; delete toEquip._slotId; delete toEquip._slot;
            newEquip[slotId] = toEquip;
            let na = assets.filter(a => a.name !== dragItem.assetName);
            if (oldInSlot) na = [...na, { ...oldInSlot }];
            saveEquipment(newEquip); saveAssets(na);
          } else if (dragItem.source === "equipment" && dragItem.slotId !== slotId) {
            newEquip[slotId] = JSON.parse(JSON.stringify(dragItem.item));
            if (oldInSlot) newEquip[dragItem.slotId] = oldInSlot; else delete newEquip[dragItem.slotId];
            saveEquipment(newEquip);
          }
          dropped = true;
          if (navigator.vibrate) navigator.vibrate(15);
          break;
        }
      }
      if (!dropped && dragItem.source === "equipment") {
        const newEquip = JSON.parse(JSON.stringify(equipment));
        delete newEquip[dragItem.slotId];
        const uneq = JSON.parse(JSON.stringify(dragItem.item));
        delete uneq._equipped; delete uneq._slotId; delete uneq._slot;
        saveEquipment(newEquip);
        saveAssets([...assets, uneq]);
        if (navigator.vibrate) navigator.vibrate(15);
      }
      setDragItem(null); setIsDragging(false); setHighlightSlots(false);
      window._isDragging = false; lastHoverSlotRef.current = null;
    };
    // Continuous auto-scroll rAF loop
    let scrollRaf = null;
    const scrollLoop = () => {
      const y = autoScrollRef.current?.y;
      if (y != null) {
        const scrollEl = document.scrollingElement || document.documentElement;
        const headerBottom = 80, bottomZone = 60;
        if (y < headerBottom) {
          const t = Math.max(0, 1 - y / headerBottom);
          scrollEl.scrollTop -= Math.round(t * t * 4 + 0.5);
        } else if (y > window.innerHeight - bottomZone) {
          const t = Math.max(0, 1 - (window.innerHeight - y) / bottomZone);
          scrollEl.scrollTop += Math.round(t * t * 4 + 0.5);
        }
      }
      scrollRaf = requestAnimationFrame(scrollLoop);
    };
    autoScrollRef.current = { y: null };
    scrollRaf = requestAnimationFrame(scrollLoop);
    document.addEventListener("touchmove", prevent, { passive: false });
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleEnd);
    document.body.style.overflow = "hidden";
    return () => {
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      autoScrollRef.current = { y: null };
      document.removeEventListener("touchmove", prevent);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
      document.body.style.overflow = "";
    };
  }, [isDragging, dragItem, equipment, assets]);
  const [headerDimmed, setHeaderDimmed] = useState(false);
  const [heroExpanded, setHeroExpanded] = useState(false);
  const [journalStep, setJournalStep] = useState(0);
  const [journalDraft, setJournalDraft] = useState({ amazing: "", learned: "", grateful: "" });
  const [journalView, setJournalView] = useState("menu");
  const avatarInputRef = useRef(null);
  const audioCtxRef = useRef(null);
  const undoTimerRef = useRef(null);
  const skillZoomRef = useRef(1);
  const lastTapRef = useRef(0);

  // Save helpers (must be defined before awardXP)
  const saveChar = useCallback(async (c) => { setCharacter(c); await saveData("rpg-character", c); }, []);
  const saveSkills = useCallback(async (s) => { setSkills(s); await saveData("rpg-skills", s); }, []);
  const saveEquipment = useCallback(async (eq) => { setEquipment(eq); await saveData("rpg-equipment", eq); }, []);
  const saveAssets = useCallback(async (a) => { setAssets(a); await saveData("rpg-assets", a); }, []);
  const saveInventory = useCallback(async (inv) => { setInventory(inv); await saveData("rpg-inventory", inv); }, []);
  const saveChallenges = useCallback(async (c) => { setChallenges(c); await saveData("rpg-challenges", c); }, []);
  const saveChallengeLog = useCallback(async (log) => { setChallengeLog(log); await saveData("rpg-challenge-log", log); }, []);

  // Undo-aware quest save
  const saveQuests = useCallback(async (newQuests, label) => {
    setUndoState({ quests: quests, label: label || "Action" });
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    undoTimerRef.current = setTimeout(() => setUndoState(null), 6000);
    setQuests(newQuests);
    await saveData("rpg-quests", newQuests);
  }, [quests]);

  const undoQuests = useCallback(async () => {
    if (!undoState) return;
    setQuests(undoState.quests);
    await saveData("rpg-quests", undoState.quests);
    setUndoState(null);
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
  }, [undoState]);

  // ── Sound System (Web Audio API) ──
  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playNote = useCallback((freq, startTime, duration, gain = 0.15, type = "sine") => {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    g.gain.setValueAtTime(gain, startTime);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }, [getAudioCtx]);

  const playStepCompleteSound = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      const t = ctx.currentTime;
      playNote(880, t, 0.12, 0.1);
      playNote(1174, t + 0.08, 0.15, 0.08);
    } catch {}
  }, [getAudioCtx, playNote]);

  const playQuestCompleteSound = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      const t = ctx.currentTime;
      // Triumphant brass-like fanfare: C5 E5 G5 C6
      playNote(523, t, 0.25, 0.15, "sawtooth");
      playNote(659, t + 0.15, 0.25, 0.15, "sawtooth");
      playNote(784, t + 0.30, 0.25, 0.15, "sawtooth");
      playNote(1047, t + 0.50, 0.5, 0.18, "sawtooth");
      // Shimmer
      playNote(1568, t + 0.55, 0.4, 0.06, "sine");
      playNote(2093, t + 0.65, 0.3, 0.04, "sine");
    } catch {}
  }, [getAudioCtx, playNote]);

  const playLevelUpSound = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      const t = ctx.currentTime;
      // Epic ascending arpeggio: C4 E4 G4 C5 E5 G5 C6
      const notes = [262, 330, 392, 523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        playNote(freq, t + i * 0.1, 0.35, 0.12, "sawtooth");
        playNote(freq * 1.5, t + i * 0.1 + 0.05, 0.25, 0.04, "sine");
      });
      // Final chord sustain
      playNote(523, t + 0.8, 0.8, 0.1, "sawtooth");
      playNote(659, t + 0.8, 0.8, 0.08, "sawtooth");
      playNote(784, t + 0.8, 0.8, 0.08, "sawtooth");
      playNote(1047, t + 0.8, 1.0, 0.1, "sine");
    } catch {}
  }, [getAudioCtx, playNote]);

  // ── XP Calculation ──
  const getQuestXP = useCallback((quest) => {
    if (!quest.steps || quest.steps.length === 0) return { perStep: 0, bonus: 0, total: 0 };
    let totalQuestXP;
    if (quest.xpReward && quest.xpReward > 0) {
      totalQuestXP = quest.xpReward;
    } else {
      const xpToNext = character?.xpToNext || 215;
      // Main quests = 325% of a level, Side = 200%, misc = 100%
      const questPct = quest.type === "main" ? 3.25 : quest.type === "side" ? 1.95 : 1.0;
      totalQuestXP = Math.max(80, Math.floor(xpToNext * questPct));
    }
    const stepXP = Math.floor(totalQuestXP * 0.7 / quest.steps.length);
    const bonusXP = Math.floor(totalQuestXP * 0.3);
    return { perStep: stepXP, bonus: bonusXP, total: totalQuestXP };
  }, [character]);

  // ── Auto-detect skill from quest ──
  const detectQuestSkill = useCallback((quest) => {
    const text = (quest.name + " " + (quest.description || "")).toLowerCase();
    const mapping = [
      { keywords: ["revenue", "income", "money", "sales", "pricing", "sell", "$", "earn", "profit"], skill: "Sales", category: "wealth" },
      { keywords: ["system", "sop", "automat", "process", "workflow", "deploy"], skill: "SOP Creation", category: "wealth" },
      { keywords: ["delegate", "delegation", "hire", "manager", "team", "staff"], skill: "Systems Delegation", category: "leadership" },
      { keywords: ["brand", "content", "audience", "social", "post", "channel", "media"], skill: "Brand Positioning", category: "wealth" },
      { keywords: ["video", "edit", "production", "film", "footage"], skill: "Video Production", category: "creator" },
      { keywords: ["card", "design", "visual", "art", "animation", "ui"], skill: "Visual Design", category: "creator" },
      { keywords: ["debt", "loan", "pay off", "credit", "financial", "budget", "overdraft"], skill: "Negotiation", category: "wealth" },
      { keywords: ["roster", "schedule", "shift", "square", "api", "code", "app"], skill: "SOP Creation", category: "wealth" },
      { keywords: ["music", "song", "beat", "produce", "audio"], skill: "Music Production", category: "wealth" },
      { keywords: ["speak", "stage", "present", "pitch", "talk"], skill: "Public Speaking", category: "wealth" },
      { keywords: ["write", "copy", "blog", "email", "newsletter"], skill: "Copywriting", category: "wealth" },
      { keywords: ["photo", "camera", "shoot", "image"], skill: "Photography", category: "wealth" },
      { keywords: ["offer", "package", "funnel", "launch"], skill: "Offer Creation", category: "wealth" },
      { keywords: ["story", "narrative", "myth"], skill: "Storytelling", category: "charisma" },
      { keywords: ["lead", "vision", "culture", "mentor"], skill: "Vision Casting", category: "leadership" },
      { keywords: ["gym", "train", "workout", "strength", "lift", "push"], skill: "Strength Training", category: "body" },
      { keywords: ["meditat", "mindful", "breath", "calm"], skill: "Meditation", category: "spirit" },
      { keywords: ["gratitude", "grateful", "journal", "reflect"], skill: "Gratitude Practice", category: "spirit" },
      { keywords: ["focus", "concentrat", "deep work"], skill: "Focus", category: "mind" },
      { keywords: ["plan", "strateg", "decision"], skill: "Strategic Planning", category: "mind" },
      { keywords: ["negotiate", "deal", "contract"], skill: "Negotiation", category: "wealth" },
      { keywords: ["feedback", "review", "performance"], skill: "Performance Feedback", category: "leadership" },
    ];
    for (const m of mapping) {
      if (m.keywords.some(k => text.includes(k))) {
        const s = skills.find(sk => sk.name === m.skill && sk.tier === "current");
        if (s) return { skill: m.skill, category: m.category };
      }
    }
    return null;
  }, [skills]);

    // ── Award XP & Level Up Check ──
  const awardXP = useCallback(async (amount, currentChar) => {
    let char = { ...currentChar };
    char.xp = (char.xp || 0) + amount;
    let leveledUp = false;
    let newLevel = char.level;

    while (char.xp >= char.xpToNext) {
      char.xp -= char.xpToNext;
      char.level += 1;
      // Scale xpToNext using curve: brutal after 75
      char.xpToNext = calcXpToNext(char.level);
      leveledUp = true;
      newLevel = char.level;
    }

    await saveChar(char);

    if (leveledUp) {
      // Delay level up to appear after any active splash/overlay
      // Base delay accounts for XP splash (2.2s), extra if quest complete is showing
      const delay = 2400;
      setTimeout(() => {
        setSplashFading(false);
        playLevelUpSound();
        setLevelUpOverlay({ level: newLevel });
        setTimeout(() => setSplashFading(true), 3000);
        setTimeout(() => { setLevelUpOverlay(null); setSplashFading(false); }, 3500);
      }, delay);
    }

    return { char, leveledUp };
  }, [saveChar, playLevelUpSound]);

  // Load all data

  // ─── AI COMMAND SYSTEM ───
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const aiInputRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = useCallback((onResult) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setAiMessages(prev => [...prev, { role: "assistant", text: "Voice not supported in this browser. Try Safari or Chrome." }]);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-AU";
    recognitionRef.current = recognition;

    let finalTranscript = "";

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += t + " ";
        } else {
          interim = t;
        }
      }
      // Show live transcript in input
      setAiInput(finalTranscript + interim);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (finalTranscript.trim() && onResult) {
        onResult(finalTranscript.trim());
      }
    };

    recognition.onerror = (e) => {
      setIsListening(false);
      if (e.error !== "no-speech") {
        console.error("Speech error:", e.error);
      }
    };

    setIsListening(true);
    recognition.start();
    if (navigator.vibrate) navigator.vibrate(20);
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);
  const aiScrollRef = useRef(null);

  const executeAiActions = useCallback((actions, msgs) => {
    if (!actions || !Array.isArray(actions)) return;
    const feedback = [];
    actions.forEach(action => {
      try {
        if (action.type === "create_quest") {
          const newQuest = {
            id: "q" + Date.now() + Math.random().toString(36).slice(2, 5),
            name: action.name,
            description: action.description || "",
            type: action.questType || "side",
            status: "active",
            xpReward: null,
            steps: (action.steps || []).map(s => ({ text: s, done: false })),
          };
          saveQuests([...quests, newQuest], "Quest created by AI");
          feedback.push("⚔ Quest created: " + action.name);
        } else if (action.type === "add_item") {
          const newItem = {
            name: action.name,
            rarity: action.rarity || "common",
            category: action.category || "misc",
            subcategory: action.subcategory || "",
            specs: action.specs || "",
            description: action.description || "",
            image: null,
          };
          saveAssets([...assets, newItem]);
          feedback.push("🎒 Item added: " + action.name);
        } else if (action.type === "complete_challenge") {
          const today = new Date().toDateString();
          const todayLog = challengeLog[today] || {};
          const ch = challenges.find(c => c.name.toLowerCase().includes((action.name || "").toLowerCase()));
          if (ch && !todayLog[ch.id]) {
            const newLog = { ...challengeLog, [today]: { ...todayLog, [ch.id]: true } };
            setChallengeLog(newLog);
            saveData("rpg-challenge-log", newLog);
            feedback.push("✅ Challenge completed: " + ch.name);
          }
        } else if (action.type === "complete_step") {
          const quest = quests.find(q => q.name.toLowerCase().includes((action.questName || "").toLowerCase()));
          if (quest) {
            const stepIdx = quest.steps?.findIndex(s => !s.done && s.text.toLowerCase().includes((action.stepText || "").toLowerCase()));
            if (stepIdx >= 0) {
              const newSteps = [...quest.steps];
              newSteps[stepIdx] = { ...newSteps[stepIdx], done: true };
              saveQuests(quests.map(q => q.id === quest.id ? { ...q, steps: newSteps } : q), "Step completed by AI");
              feedback.push("◆ Step completed: " + quest.steps[stepIdx].text);
            }
          }
        } else if (action.type === "create_reminder") {
          const newReminder = {
            id: "rem_" + Date.now() + Math.random().toString(36).slice(2, 5),
            text: action.text || action.name,
            createdAt: Date.now(),
            done: false,
            snoozedUntil: null,
            snoozeCount: 0,
          };
          const updatedRems = [...reminders, newReminder];
          setReminders(updatedRems);
          saveData("rpg-reminders", updatedRems);
          feedback.push("🔔 Reminder set: " + newReminder.text);
        }
      } catch (e) { console.error("AI action error:", e); }
    });
    return feedback;
  }, [quests, assets, challenges, challengeLog, reminders, saveQuests, saveAssets]);

  const sendAiMessage = useCallback(async () => {
    if (!aiInput.trim() || aiLoading) return;
    const userMsg = aiInput.trim();
    setAiInput("");
    const newMsgs = [...aiMessages, { role: "user", text: userMsg }];
    setAiMessages(newMsgs);
    setAiLoading(true);

    try {
      // Build game state context
      const activeQuests = quests.filter(q => q.status === "active").map(q => ({
        name: q.name, type: q.type, description: q.description,
        steps: q.steps?.map(s => ({ text: s.text, done: s.done })),
        progress: q.steps ? Math.round(q.steps.filter(s => s.done).length / q.steps.length * 100) : 0,
      }));
      const today = new Date().toDateString();
      const todayLog = challengeLog[today] || {};
      const challengeStatus = challenges.map(c => ({ name: c.name, skill: c.skill, category: c.category, xp: c.xp, completed: !!todayLog[c.id] }));
      const inventoryItems = assets.map(a => ({ name: a.name, category: a.category, subcategory: a.subcategory, rarity: a.rarity }));
      const equippedItems = Object.entries(equipment).filter(([k,v]) => v).map(([k,v]) => ({ slot: k, name: v.name }));
      const derivedStats = deriveStats(skills);

      // Build weekly challenge history for XP Coach
      const weekHistory = {};
      const now = new Date();
      for (let d = 0; d < 7; d++) {
        const date = new Date(now);
        date.setDate(date.getDate() - d);
        const key = date.toDateString();
        const dayLog = challengeLog[key] || {};
        const completed = Object.keys(dayLog).filter(k => dayLog[k]);
        if (completed.length > 0) {
          weekHistory[d === 0 ? "today" : d === 1 ? "yesterday" : `${d} days ago`] = {
            completed: completed.length,
            categories: completed.map(id => {
              const ch = challenges.find(c => c.id === id);
              return ch ? ch.category : "unknown";
            }),
          };
        }
      }
      // Category completion rates
      const catRates = {};
      Object.keys(SKILL_CATEGORIES_DATA).forEach(cat => {
        const catChallenges = challenges.filter(c => c.category === cat);
        let total = 0, done = 0;
        for (let d = 0; d < 7; d++) {
          const date = new Date(now);
          date.setDate(date.getDate() - d);
          const dayLog = challengeLog[date.toDateString()] || {};
          catChallenges.forEach(c => { total++; if (dayLog[c.id]) done++; });
        }
        catRates[cat] = { total, done, rate: total > 0 ? Math.round(done / total * 100) : 0 };
      });

      const systemPrompt = `You are a fairy companion AI named Navi inside "Pause - Life RPG", a dark fantasy gamified personal development app for Jefferson Wolfe. You help manage his quests, items, challenges, and provide strategic coaching.

PERSONALITY: Speak like a wise but playful fairy companion. Brief, punchy, motivating. Use dark fantasy metaphors. Never preachy. Always actionable.

CURRENT STATE:
- Character: ${character.name}, Level ${character.level}, ${character.xp}/${character.xpToNext} XP
- Stats: ${JSON.stringify(derivedStats)}
- Active Quests: ${JSON.stringify(activeQuests)}
- Today's Challenges: ${JSON.stringify(challengeStatus)}
- Inventory: ${JSON.stringify(inventoryItems)}
- Equipped: ${JSON.stringify(equippedItems)}

WEEKLY PERFORMANCE (last 7 days):
${JSON.stringify(weekHistory, null, 1)}

CATEGORY COMPLETION RATES (7-day):
${Object.entries(catRates).map(([cat, r]) => `- ${cat}: ${r.rate}% (${r.done}/${r.total})`).join("\n")}

SKILL LEVELS:
${Object.entries(SKILL_CATEGORIES_DATA).map(([k, v]) => {
  const avg = skills.filter(s => s.category === k && s.tier === "current").reduce((a, s) => a + s.level, 0) / Math.max(1, skills.filter(s => s.category === k && s.tier === "current").length);
  return `- ${v.label}: avg level ${Math.round(avg)}`;
}).join("\n")}

VOICE JOURNAL PROCESSING:
When the user sends a voice journal entry (prefixed with "Process this voice journal entry"):
1. Extract key events, achievements, and experiences from the transcript
2. Identify lessons learned
3. Note things to be grateful for
4. Extract any actionable items as quest steps or new challenges
5. Summarize in a warm, encouraging tone
6. If they mention completing tasks, create appropriate actions

XP COACH RULES:
When asked about tracking, progress, focus, or coaching:
1. Identify which categories are being neglected (low completion rate)
2. Identify which are being crushed (high rate) — acknowledge the grind
3. Suggest specific swaps or additions to balance the build
4. Flag if a quest hasn't progressed in a while
5. Give a concrete "do this next" recommendation
6. Reference actual challenge names and quest names from the data

ITEM CATEGORIES & SUBCATEGORIES:
- clothing: hat, sunnies, necklace, chain, jacket, shirt, hoodie, pants, shorts, shoes, boots
- tech: laptop, desktop, tablet
- creative_gear: camera, action_cam, lens, mic, headphones, speaker, bag, backpack, case
- transport: suv, sedan, motorcycle, bicycle
- misc: accessory, tool, other
- digital: app, platform, saas, website
- business: restaurant, agency, brand, venture

RARITY: common, rare, epic, legendary

You MUST respond with valid JSON only. No markdown, no backticks. Format:
{
  "message": "Your conversational response to the user",
  "actions": [
    { "type": "create_quest", "name": "...", "description": "...", "questType": "main|side", "steps": ["step1", "step2", ...] },
    { "type": "add_item", "name": "...", "category": "...", "subcategory": "...", "rarity": "...", "specs": "...", "description": "..." },
    { "type": "complete_challenge", "name": "partial match of challenge name" },
    { "type": "complete_step", "questName": "partial match", "stepText": "partial match" },
    { "type": "create_reminder", "text": "...", "interval": "2h" }
  ]
}

If no actions needed, return empty actions array. Keep message brief and in-character. Be direct and helpful.`;

      const response = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            ...newMsgs.slice(-10).map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })),
          ],
        }),
      });

      const data = await response.json();

      // Check for API errors
      if (data.error) {
        const errMsg = data.error.message || data.error.type || "Unknown API error";
        setAiMessages(prev => [...prev, { role: "assistant", text: formatApiError(errMsg) }]);
        setAiLoading(false);
        return;
      }

      const rawText = data.content?.map(c => c.text || "").join("") || "";

      // Parse JSON response
      let parsed;
      try {
        parsed = JSON.parse(rawText.replace(/```json|```/g, "").trim());
      } catch (e) {
        parsed = { message: rawText, actions: [] };
      }

      // Execute actions
      const feedback = executeAiActions(parsed.actions || []);
      let aiReply = parsed.message || "Done.";
      if (feedback && feedback.length > 0) {
        aiReply += "\n\n" + feedback.join("\n");
      }

      setAiMessages(prev => [...prev, { role: "assistant", text: aiReply }]);
    } catch (err) {
      setAiMessages(prev => [...prev, { role: "assistant", text: "Connection failed. Try again." }]);
      console.error("AI error:", err);
    }
    setAiLoading(false);
  }, [aiInput, aiMessages, aiLoading, quests, assets, challenges, challengeLog, character, skills, equipment, executeAiActions]);

  // Periodic reminder check every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeNudge) return; // don't stack nudges
      const nowMs = Date.now();
      const due = reminders.find(r => !r.done && (!r.snoozedUntil || nowMs >= r.snoozedUntil));
      if (due) setActiveNudge(due);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [reminders, activeNudge]);


  useEffect(() => {
    if (aiScrollRef.current) aiScrollRef.current.scrollTop = aiScrollRef.current.scrollHeight;
  }, [aiMessages, aiLoading]);

  useEffect(() => {
    (async () => {
      const [char, sk, q, inv, equip, asst, cards, lcd] = await Promise.all([
        loadData("rpg-character", DEFAULT_CHARACTER),
        loadData("rpg-skills", DEFAULT_SKILLS),
        loadData("rpg-quests", DEFAULT_QUESTS),
        loadData("rpg-inventory", DEFAULT_INVENTORY),
        loadData("rpg-equipment", DEFAULT_EQUIPMENT),
        loadData("rpg-assets", DEFAULT_ASSETS),
        loadData("rpg-collected-cards", []),
        loadData("rpg-last-card-date", null),
      ]);
      const journal = await loadData("rpg-journal", {});
      const lastDailyXp = await loadData("rpg-last-daily-xp", null);
      const chals = await loadData("rpg-challenges", DEFAULT_CHALLENGES);
      const chalLog = await loadData("rpg-challenge-log", {});
      const rems = await loadData("rpg-reminders", []);
      setChallenges(chals);
      setChallengeLog(chalLog);
      setReminders(rems);
      setJournalEntries(journal);
      setCharacter(char);
      setSkills(sk);
      setQuests(q);
      setInventory(inv);
      setEquipment(equip);
      setAssets(asst);
      setCollectedCards(cards);
      setLastCardDate(lcd);

      // Daily XP - Life Experience (scales with level)
      const today = new Date().toDateString();
      let currentChar = char;
      if (lastDailyXp !== today) {
        const dailyXP = Math.floor(20 + char.level * 1.5);
        setPendingDailyXp(dailyXP);
      }

      // Daily card logic - AI generated with static fallback
      if (lcd !== today) {
        const available = LIFE_CARDS_POOL.filter(c => !cards.find(cc => cc.id === c.id));
        const pool = available.length > 0 ? available : LIFE_CARDS_POOL;
        const staticPick = pool[Math.floor(Math.random() * pool.length)];
        let aiCard = null;
        try {
          const yLog = challengeLog[new Date(Date.now() - 86400000).toDateString()] || {};
          const yCats = Object.keys(yLog).map(id => { const c = chals.find(x => x.id === id); return c ? c.category : null; }).filter(Boolean);
          const focusCat = yCats.length > 0 ? yCats[Math.floor(Math.random() * yCats.length)] : "mind";
          const catLabel = SKILL_CATEGORIES_DATA[focusCat]?.label || "Growth";
          const aiRes = await fetch("/api/claude", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 200,
              messages: [{ role: "user", content: "Generate one motivational quote for a dark fantasy RPG life app. Theme: " + catLabel + ". User is an entrepreneur-creator focused on sovereignty, execution, family legacy. Respond ONLY with JSON no backticks: " + JSON.stringify({quote:"under 15 words",category:catLabel,rarity:"common|rare|epic|legendary"}) }],
            }),
          });
          const d = await aiRes.json();
          const t = d.content?.[0]?.text || "";
          const p = JSON.parse(t.replace(/```json|```/g, "").trim());
          if (p.quote) aiCard = { id: "ai_" + Date.now(), ...p, aiGenerated: true };
        } catch (e) {}
        setDailyCard(aiCard || staticPick);
        setDailyFlipped(false);
      } else {
        const todayCard = await loadData("rpg-today-card", null);
        if (todayCard) { setDailyCard(todayCard); setDailyFlipped(true); }
      }

      // Check for due reminders (nudge on open)
      const nowMs = Date.now();
      const dueReminder = rems.find(r => !r.done && (!r.snoozedUntil || nowMs >= r.snoozedUntil));
      if (dueReminder) {
        setTimeout(() => setActiveNudge(dueReminder), 1500); // show after splash
      }

      setLoading(false);
      // Splash: show title centered, then fly to header while panels zoom in
      setTimeout(() => setSplashPhase(1), 100);   // title fades in
      setTimeout(() => { setSplashPhase(2); setMounted(true); }, 4500);  // fade out + panels appear
      setTimeout(() => setSplashPhase(3), 5500); // splash removed
    })();
  }, []);

  const revealDailyCard = useCallback(async () => {
    if (!dailyCard || dailyFlipped) return;
    setDailyFlipped(true);
    const today = new Date().toDateString();
    const newCollected = [...(collectedCards || []), dailyCard];
    setCollectedCards(newCollected);
    setLastCardDate(today);
    await saveData("rpg-collected-cards", newCollected);
    await saveData("rpg-last-card-date", today);
    await saveData("rpg-today-card", dailyCard);
  }, [dailyCard, dailyFlipped, collectedCards]);

  const claimDailyXp = useCallback(async () => {
    if (!pendingDailyXp) return;
    const amount = pendingDailyXp;
    setPendingDailyXp(null);
    let char = { ...character };
    char.xp = (char.xp || 0) + amount;
    while (char.xp >= char.xpToNext) {
      char.xp -= char.xpToNext;
      char.level += 1;
      char.xpToNext = calcXpToNext(char.level);
    }
    setCharacter(char);
    await saveData("rpg-character", char);
    const today = new Date().toDateString();
    await saveData("rpg-last-daily-xp", today);
    setDailyXpAwarded(amount);
    setTimeout(() => setSplashFading(true), 2500);
    setTimeout(() => { setDailyXpAwarded(false); setSplashFading(false); }, 3000);
  }, [pendingDailyXp, character]);

  const showXpSplash = useCallback((amount, label) => {
    setSplashFading(false);
    setXpSplash({ amount, label });
    setTimeout(() => setSplashFading(true), 1500);
    setTimeout(() => { setXpSplash(null); setSplashFading(false); }, 2000);
  }, []);

  const toggleCategory = useCallback((cat) => {
    setCollapsedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  }, []);

  const toggleStep = useCallback(async (questId, stepIdx) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || !quest.steps) return;

    const step = quest.steps[stepIdx];
    const wasChecked = step.done;
    const newSteps = quest.steps.map((s, i) => i === stepIdx ? { ...s, done: !s.done } : s);
    const allDone = newSteps.every(s => s.done);
    const xpInfo = getQuestXP(quest);

    // Update quest
    const updatedQuests = quests.map(q => {
      if (q.id !== questId) return q;
      return { ...q, steps: newSteps, status: allDone ? "completed" : "active" };
    });
    await saveQuests(updatedQuests, "Step updated");

    // Award or remove XP for step
    if (!wasChecked) {
      // Checking step — award step XP
      playStepCompleteSound();
      const result = await awardXP(xpInfo.perStep, character);
      // Also award skill XP based on quest auto-detection
      const detectedSkill = detectQuestSkill(quest);
      if (detectedSkill) {
        const sIdx = skills.findIndex(s => s.name === detectedSkill.skill && s.tier === "current");
        if (sIdx >= 0) {
          const ns = [...skills];
          const sk = { ...ns[sIdx] };
          const xpNeed = (sk.level || 0) * 10 + 10;
          const skillAward = Math.floor(xpInfo.perStep * 0.3);
          sk.skillXp = (sk.skillXp || 0) + skillAward;
          if (sk.skillXp >= xpNeed && sk.level < 100) {
            sk.level = Math.min(100, (sk.level || 0) + 1);
            sk.skillXp = sk.skillXp - xpNeed;
          }
          ns[sIdx] = sk;
          await saveSkills(ns);
          showXpSplash(xpInfo.perStep, detectedSkill.skill);
        } else {
          showXpSplash(xpInfo.perStep, "Quest Step");
        }
      } else {
        showXpSplash(xpInfo.perStep, "Quest Step");
      }

      // Auto-complete quest if all steps done
      if (allDone) {
        // Quest complete shows after XP splash clears (2.2s)
        setTimeout(async () => {
          playQuestCompleteSound();
          setQuestCompleteOverlay({ quest, xp: xpInfo.bonus, totalXP: xpInfo.total });
          setExpandedQuest(null);
          // Award completion bonus - level up will queue after quest splash
          await awardXP(xpInfo.bonus, result.char);
          setTimeout(() => {
            setSplashFading(true);
            setTimeout(() => { setQuestCompleteOverlay(null); setSplashFading(false); }, 250);
          }, 3000);
        }, 2200);
      }
    } else {
      // Unchecking step — revert character XP
      let char = { ...character };
      char.xp = (char.xp || 0) - xpInfo.perStep;
      if (char.xp < 0) {
        char.level = Math.max(1, char.level - 1);
        char.xpToNext = calcXpToNext(char.level);
        char.xp = char.xpToNext + char.xp;
      }
      setCharacter(char);
      await saveData("rpg-character", char);

      // Revert skill XP
      const detectedSkill = detectQuestSkill(quest);
      if (detectedSkill) {
        const sIdx = skills.findIndex(s => s.name === detectedSkill.skill && s.tier === "current");
        if (sIdx >= 0) {
          const ns = [...skills];
          const sk = { ...ns[sIdx] };
          const skillAward = Math.floor(xpInfo.perStep * 0.3);
          sk.skillXp = (sk.skillXp || 0) - skillAward;
          if (sk.skillXp < 0) {
            sk.level = Math.max(0, (sk.level || 0) - 1);
            const prevXpNeeded = sk.level * 10 + 10;
            sk.skillXp = prevXpNeeded + sk.skillXp;
          }
          ns[sIdx] = sk;
          await saveSkills(ns);
        }
      }
    }
  }, [quests, character, skills, saveQuests, saveSkills, getQuestXP, awardXP, detectQuestSkill, playStepCompleteSound, playQuestCompleteSound, showXpSplash]);

  const generateStepsForQuest = useCallback(async (questName, questDesc) => {
    setGeneratingSteps(true);
    try {
      const response = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Generate 3-10 specific, actionable steps to complete this quest/goal. Each step should be concrete and measurable — something you can check off.

Quest: ${questName}
Description: ${questDesc || "No description provided"}

Return ONLY a JSON array of strings, no other text. Example: ["Step 1 text", "Step 2 text"]`
          }],
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(formatApiError(data.error.message || data.error.type || "Unknown API error"));
      const text = data.content?.map(i => i.text || "").join("") || "[]";
      const clean = text.replace(/```json|```/g, "").trim();
      const steps = JSON.parse(clean);
      setGeneratingSteps(false);
      return steps.map(t => ({ text: t, done: false }));
    } catch (e) {
      console.error("Step generation failed:", e);
      setGeneratingSteps(false);
      return [{ text: "Define the first actionable step", done: false }];
    }
  }, []);

  // ── Voice: Text-to-Speech ──
  const speak = useCallback((text) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      u.pitch = 0.9;
      window.speechSynthesis.speak(u);
    } catch {}
  }, []);


  // ── Journal ──
  const saveJournal = useCallback(async (date, entry) => {
    const updated = { ...journalEntries, [date]: entry };
    setJournalEntries(updated);
    await saveData("rpg-journal", updated);
  }, [journalEntries]);

  const handleAvatarUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setCropSrc(ev.target.result); setCropTarget("avatar"); };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, []);

  if (loading || !character) {
    return (
      <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 0%, #1a150e 0%, #0d0a07 50%, #050403 100%)", position: "relative", overflow: "hidden" }}>
        {/* Background particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${10 + (i * 7.3) % 80}%`, top: `${5 + (i * 13.7) % 80}%`,
            width: `${1 + (i % 3)}px`, height: `${1 + (i % 3)}px`,
            borderRadius: "50%",
            background: `rgba(245,158,11,${0.15 + (i % 4) * 0.1})`,
            boxShadow: `0 0 ${2 + (i % 3) * 2}px rgba(245,158,11,${0.1 + (i % 3) * 0.1})`,
            animation: `splashEmber ${3 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
          }} />
        ))}
        <div style={{ position: "absolute", bottom: "50%", left: 0, right: 0, height: "120px", background: "radial-gradient(ellipse at 50% 100%, rgba(245,158,11,0.08), transparent 70%)" }} />
      </div>
    );
  }

  const tabs = [
    { id: "character", label: "Hero", icon: <HelmetIcon size={18} color="currentColor" /> },
    { id: "challenges", label: "Daily", icon: <TargetIcon size={18} color="currentColor" /> },
    { id: "quests", label: "Quests", icon: <ScrollIcon size={18} color="currentColor" /> },
    { id: "journal", label: "Journal", icon: <BookIcon size={18} color="currentColor" /> },
    { id: "skills", label: "Skills", icon: <LightningIcon size={18} color="currentColor" /> },
    { id: "inventory", label: "Items", icon: <BackpackIcon size={18} color="currentColor" /> },
  ];

  const SKILL_CATEGORIES = Object.keys(SKILL_CATEGORIES_DATA);

  return (
    <>
    <div style={{
      height: "100vh",
      background: "radial-gradient(ellipse at 50% 0%, #1a150e 0%, #0d0a07 50%, #050403 100%)",
      color: "#e8d5b5", fontFamily: "'Crimson Text', serif",
      position: "relative", overflow: "hidden",
      overscrollBehavior: "none", WebkitOverflowScrolling: "touch",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Fira+Code:wght@400&display=swap" rel="stylesheet" />

      <Particles />

      {/* Hidden file input for avatar upload */}
      <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: "none" }} />

      {/* Header button dim overlay - state driven */}
      {headerDimmed && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 45,
          background: 'rgba(0,0,0,0.6)',
          pointerEvents: 'none',
          animation: 'fadeIn 0.3s ease',
        }} />
      )}

      {/* Settings panel moved outside overflow:hidden container */}

      {/* Ambient vignette */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "900px", margin: "0 auto", padding: "0 10px", paddingBottom: activeTab === "character" ? (heroExpanded ? "80px" : "0") : "80px", height: "100vh", overflowY: (activeTab === "character" && !heroExpanded) ? "hidden" : "auto", overflowX: "hidden" }}>

        {/* Title Banner — Liquid Glass (fixed) */}
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          textAlign: "center", padding: "calc(14px + env(safe-area-inset-top, 0px)) 0 14px",
          background: "linear-gradient(180deg, rgba(13,10,7,0.9) 0%, rgba(13,10,7,0.7) 60%, rgba(13,10,7,0) 100%)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          {/* Hamburger Menu Button - top left */}
          <div onClick={(e) => { e.stopPropagation(); setShowSettings(true); }} style={{
            position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)',
            width: '36px', height: '36px', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 51,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a7a65" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>
          <div style={{
            fontSize: "8px", color: "#8a7a65", letterSpacing: "4px", fontFamily: "'Cinzel', serif",
            textTransform: "uppercase", marginBottom: "2px",
          }}>PAUSE</div>
          <h1 style={{
            margin: 0, fontSize: "22px", fontFamily: "'Cinzel Decorative', serif",
            color: "#f5c842", letterSpacing: "3px",
            textShadow: "0 0 40px rgba(245,158,11,0.3), 0 2px 4px rgba(0,0,0,0.5)",
          }}>LIFE RPG</h1>
          <div style={{
            width: "140px", height: "1px", margin: "4px auto",
            background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)",
          }} />
          {/* Date display - top right */}
          <div style={{
            position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)',
            fontSize: '10px', color: '#8a7a65', fontFamily: "'Cinzel', serif",
            letterSpacing: '1px', textAlign: 'right',
          }}>
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        {/* Spacer for fixed header */}
        <div style={{ height: "calc(70px + env(safe-area-inset-top, 0px))" }} />

        {/* ═══ CHARACTER TAB ═══ */}
        {activeTab === "character" && (
          <div style={{
            display: "grid", gap: "10px",
            gridTemplateColumns: "1fr", 
            opacity: mounted ? 1 : 0,
            transform: mounted ? "scale(1) translateY(0)" : "scale(0.92) translateY(20px)",
            transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}>
            {/* Character Header */}
            <Panel>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                {/* Avatar - click to upload */}
                <div onClick={() => avatarInputRef.current?.click()} style={{
                  width: "60px", height: "60px", borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(145deg, #1a150e, #0d0a07)",
                  border: "2px solid rgba(245,158,11,0.4)",
                  boxShadow: "0 0 20px rgba(245,158,11,0.2), inset 0 0 20px rgba(0,0,0,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "26px", cursor: "pointer", overflow: "hidden",
                }}>
                  {character.avatar ? (
                    <img src={character.avatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : "🐺"}
                </div>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <h2 style={{
                      margin: 0, fontSize: "17px", fontFamily: "'Cinzel Decorative', serif",
                      color: "#f5c842", textShadow: "0 0 15px rgba(245,158,11,0.2)",
                    }}>{character.name}</h2>
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                      {/* Daily XP Button - green diamond */}
                      {pendingDailyXp && (
                        <div onClick={() => { claimDailyXp(); setHeaderDimmed(false); }} style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer',
                          animation: 'headerXpGlow 2s ease-in-out infinite',
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981" stroke="none"><path d="M12 2l10 10-10 10L2 12z"/></svg>
                        </div>
                      )}
                      {/* Daily Card Button - purple */}
                      {dailyCard && !dailyFlipped && (
                        <div onClick={() => { setShowCardOverlay(true); setHeaderDimmed(false); }} style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer',
                          animation: 'headerCardGlow 2s ease-in-out infinite',
                        }}>
                          <CardIcon size={16} color="#a855f7" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "#c4a882", fontFamily: "'Cinzel', serif", letterSpacing: "1px", marginTop: "2px" }}>
                    {character.title}
                  </div>
                  <div style={{ fontSize: "11px", color: "#8a7a65", fontStyle: "italic", marginTop: "2px" }}>
                    {character.className}
                  </div>
                  {/* Level & XP */}
                  <div style={{ marginTop: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3px" }}>
                      <span style={{ fontSize: "12px", fontFamily: "'Cinzel', serif", color: "#4ade80", fontWeight: 600 }}>
                        LEVEL {character.level}
                      </span>
                      <span style={{ fontSize: "10px", color: "#8a7a65", fontFamily: "'Fira Code', monospace" }}>
                        {character.xp} / {character.xpToNext} XP
                      </span>
                    </div>
                    <div style={{
                      height: "8px", background: "rgba(0,0,0,0.5)", borderRadius: "4px",
                      border: "1px solid rgba(34,197,94,0.2)", overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%", width: `${(character.xp / character.xpToNext) * 100}%`,
                        background: "linear-gradient(90deg, #166534, #22c55e, #4ade80)",
                        borderRadius: "5px",
                        boxShadow: "0 0 10px rgba(34,197,94,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
                        transition: "width 1s ease",
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </Panel>

            {/* Core Stats - derived from skills */}
            <Panel>
              <SectionHeader icon={<CrossedSwordsIcon />} title="Core Attributes" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 12px" }}>
                {Object.entries(deriveStats(skills)).map(([key, val]) => {
                  const src = STAT_FROM_SKILLS[key];
                  const srcLabel = src.secondary
                    ? `${SKILL_CATEGORIES_DATA[src.primary]?.label}+${SKILL_CATEGORIES_DATA[src.secondary]?.label}`
                    : SKILL_CATEGORIES_DATA[src.primary]?.label;
                  return (
                    <div key={key} onClick={() => { setStatsExpanded(key); setStatCatOpen(null); setStatSkillOpen(null); }} style={{ cursor: "pointer" }}>
                      <StatBar label={key} value={val} icon={STAT_ICONS[key]} subtitle={srcLabel} />
                    </div>
                  );
                })}
              </div>
            </Panel>

            {/* Hero / Avatar Viewer */}
            <HeroScene expanded={heroExpanded} equipment={heroExpanded ? equipment : null} characterLevel={character.level} onToggle={() => setHeroExpanded(!heroExpanded)} onSlotPress={(slot, item) => item && setItemDetail(item)} />

          </div>
        )}

        {/* ═══ CHALLENGES TAB ═══ */}
        {activeTab === "challenges" && challenges && (() => {
          const today = new Date().toDateString();
          const todayLog = challengeLog[today] || {};
          const dailyChallenges = getDailyChallenges(challenges, today).filter(c => {
            const sk = skills.find(s => s.name === c.skill);
            return sk && sk.tier === "current";
          });
          const completedCount = Object.keys(todayLog).filter(k => todayLog[k]).length;
          const totalXpToday = dailyChallenges.filter(c => todayLog[c.id]).reduce((sum, c) => sum + c.xp, 0);

          // Plank scaling based on character level
          const charLevel = character?.level || 1;
          const plankMinutes = 3 + Math.floor(charLevel / 10);
          const getDisplayName = (c) => {
            if (c.scaleWithLevel) return c.name.replace("3-minute", `${plankMinutes}-minute`);
            return c.name;
          };

          // Streak calculation
          const getStreak = () => {
            let streak = 0;
            const d = new Date();
            if (Object.keys(todayLog).filter(k => todayLog[k]).length > 0) streak = 1;
            else { d.setDate(d.getDate() - 1); }
            for (let i = 0; i < 365; i++) {
              const key = d.toDateString();
              if (i > 0 || streak === 0) {
                const dayLog = challengeLog[key] || {};
                if (Object.keys(dayLog).filter(k => dayLog[k]).length > 0) streak++;
                else break;
              }
              d.setDate(d.getDate() - 1);
            }
            return streak;
          };
          const streak = getStreak();
          const streakMultiplier = streak >= 30 ? 2.0 : streak >= 14 ? 1.75 : streak >= 7 ? 1.5 : streak >= 3 ? 1.25 : 1.0;

          const completeChallenge = async (challenge) => {
            if (todayLog[challenge.id]) return;
            const newLog = { ...challengeLog, [today]: { ...todayLog, [challenge.id]: true } };
            await saveChallengeLog(newLog);

            // Award XP to the matching skill (only if unlocked)
            const xpAmount = Math.round(challenge.xp * streakMultiplier);
            const skillIdx = skills.findIndex(s => s.name === challenge.skill && s.tier === "current");
            if (skillIdx >= 0) {
              const newSkills = [...skills];
              const s = { ...newSkills[skillIdx] };
              const xpNeeded = (s.level || 0) * 10 + 10;
              s.skillXp = (s.skillXp || 0) + xpAmount;
              if (s.skillXp >= xpNeeded && s.level < 100) {
                s.level = Math.min(100, (s.level || 0) + 1);
                s.skillXp = s.skillXp - xpNeeded;
              }
              newSkills[skillIdx] = s;
              await saveSkills(newSkills);
            }

            // Also award character XP
            if (character) {
              await awardXP(Math.round(xpAmount * 0.5), character);
              showXpSplash(xpAmount, challenge.skill);
            }
            playStepCompleteSound();
          };

          const uncompleteChallenge = async (challenge) => {
            if (!todayLog[challenge.id]) return;
            const newLog = { ...challengeLog, [today]: { ...todayLog } };
            delete newLog[today][challenge.id];
            await saveChallengeLog(newLog);

            // Revert skill XP
            const xpAmount = Math.round(challenge.xp * streakMultiplier);
            const skillIdx = skills.findIndex(s => s.name === challenge.skill && s.tier === "current");
            if (skillIdx >= 0) {
              const newSkills = [...skills];
              const s = { ...newSkills[skillIdx] };
              s.skillXp = Math.max(0, (s.skillXp || 0) - xpAmount);
              // Handle level revert if needed
              if (s.skillXp < 0) {
                s.level = Math.max(0, (s.level || 0) - 1);
                const prevXpNeeded = s.level * 10 + 10;
                s.skillXp = prevXpNeeded + s.skillXp;
              }
              newSkills[skillIdx] = s;
              await saveSkills(newSkills);
            }

            // Revert character XP
            if (character) {
              const charXpToRevert = Math.round(xpAmount * 0.5);
              let char = { ...character };
              char.xp = (char.xp || 0) - charXpToRevert;
              if (char.xp < 0) {
                char.level = Math.max(1, char.level - 1);
                char.xpToNext = calcXpToNext(char.level);
                char.xp = char.xpToNext + char.xp;
              }
              setCharacter(char);
              await saveData("rpg-character", char);
            }
          };

          const categories = ["body", "mind", "wealth", "spirit", "charisma", "leadership", "creator"];
          const catNames = { body: "Body", mind: "Mind", wealth: "Wealth", spirit: "Spirit", charisma: "Charisma", leadership: "Leadership", creator: "Creation" };

          return (
            <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "scale(1) translateY(0)" : "scale(0.95) translateY(15px)", transition: "opacity 0.5s 0.3s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s", display: "grid", gap: "10px" }}>
              {/* Daily Stats Banner */}
              <Panel>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <TargetIcon size={16} />
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "13px", letterSpacing: "1.5px", color: "#f5c842" }}>DAILY CHALLENGES</span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[
                    { label: "Completed", value: `${completedCount}/${dailyChallenges.length}`, color: "#10b981" },
                    { label: "XP Earned", value: totalXpToday, color: "#f59e0b" },
                    { label: "Streak", value: `${streak}d`, color: streak >= 7 ? "#ef4444" : "#818cf8" },
                    { label: "Multiplier", value: `${streakMultiplier}x`, color: streakMultiplier > 1 ? "#f5c842" : "#6b5d4a" },
                  ].map((s, i) => (
                    <div key={i} style={{
                      flex: 1, textAlign: "center", padding: "8px 2px", borderRadius: "8px",
                      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
                    }}>
                      <div style={{ fontSize: "15px", color: s.color, fontFamily: "'Fira Code', monospace", fontWeight: 600 }}>{s.value}</div>
                      <div style={{ fontSize: "7px", color: "#6b6055", fontFamily: "'Cinzel', serif", letterSpacing: "0.6px", textTransform: "uppercase", marginTop: "2px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {streakMultiplier > 1 && (
                  <div style={{
                    marginTop: "8px", padding: "6px 10px", borderRadius: "6px",
                    background: "rgba(245,200,66,0.06)", border: "1px solid rgba(245,200,66,0.1)",
                    fontSize: "10px", color: "#d4a843", fontFamily: "'Crimson Text', serif", fontStyle: "italic", textAlign: "center",
                  }}>
                    {streak} day streak active — all XP rewards multiplied by {streakMultiplier}x
                  </div>
                )}
              </Panel>

              {/* Challenge Cards by Category */}
              {categories.map(cat => {
                const catChallenges = dailyChallenges.filter(c => c.category === cat);
                if (catChallenges.length === 0) return null;
                const catData = SKILL_CATEGORIES_DATA[cat];
                const catDone = catChallenges.filter(c => todayLog[c.id]).length;
                return (
                  <Panel key={cat}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{
                          width: "8px", height: "8px", borderRadius: "2px",
                          background: catData.color, boxShadow: `0 0 8px ${catData.color}40`,
                        }} />
                        <span style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px", color: catData.color }}>{catNames[cat] || catData.label}</span>
                      </div>
                      <span style={{ fontSize: "10px", color: "#6b6055", fontFamily: "'Fira Code', monospace" }}>{catDone}/{catChallenges.length}</span>
                    </div>
                    {catChallenges.map(challenge => {
                      const done = !!todayLog[challenge.id];
                      const xpDisplay = Math.round(challenge.xp * streakMultiplier);
                      return (
                        <div key={challenge.id}
                          onClick={() => done ? uncompleteChallenge(challenge) : completeChallenge(challenge)}
                          style={{
                            display: "flex", alignItems: "center", gap: "10px",
                            padding: "10px 12px", marginBottom: "4px", borderRadius: "8px",
                            background: done ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.02)",
                            border: `1px solid ${done ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.04)"}`,
                            cursor: "pointer",
                            opacity: done ? 0.7 : 1,
                            transition: "all 0.2s ease",
                          }}>
                          {/* Diamond checkbox */}
                          <div style={{
                            width: "22px", height: "22px", flexShrink: 0,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill={done ? "#10b981" : "none"} stroke={done ? "none" : "rgba(255,255,255,0.15)"} strokeWidth="2"><path d="M12 2l10 10-10 10L2 12z"/></svg>
                          </div>
                          {/* Info */}
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: "13px", color: done ? "#6b6055" : "#e8d5b5",
                              fontFamily: "'Crimson Text', serif",
                              textDecoration: done ? "line-through" : "none",
                            }}>{getDisplayName(challenge)}</div>
                            <div style={{
                              fontSize: "9px", color: done ? "#4a4540" : `${catData.color}90`,
                              fontFamily: "'Fira Code', monospace", marginTop: "2px",
                            }}>
                              {challenge.skill}
                            </div>
                          </div>
                          {/* XP badge */}
                          <div style={{
                            padding: "3px 8px", borderRadius: "4px",
                            background: done ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.08)",
                            border: `1px solid ${done ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.12)"}`,
                          }}>
                            <span style={{
                              fontSize: "10px", fontFamily: "'Fira Code', monospace", fontWeight: 600,
                              color: done ? "#10b981" : "#f59e0b",
                            }}>+{xpDisplay} xp</span>
                          </div>
                        </div>
                      );
                    })}
                  </Panel>
                );
              })}
            </div>
          );
        })()}

        {/* ═══ QUESTS TAB ═══ */}
        {activeTab === "quests" && (
          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "scale(1) translateY(0)" : "scale(0.95) translateY(15px)", transition: "opacity 0.5s 0.3s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s", display: "grid", gap: "10px" }}>

            {/* Current Objective Banner */}
            {(() => {
              const activeQuests = quests.filter(q => q.status === "active" && q.steps?.some(s => !s.done));
              const topQuest = activeQuests.find(q => q.type === "main") || activeQuests[0];
              const nextStep = topQuest ? getNextObjective(topQuest) : null;
              if (!topQuest || !nextStep) return null;
              return (
                <Panel style={{ borderColor: "rgba(245,158,11,0.3)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <DiamondMarkerIcon size={12} color="#f59e0b" />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: "9px", color: "#8a7a65", fontFamily: "'Cinzel', serif",
                        letterSpacing: "2px", textTransform: "uppercase", marginBottom: "3px",
                      }}>CURRENT OBJECTIVE</div>
                      <div style={{ fontSize: "12px", color: "#f5c842", fontFamily: "'Crimson Text', serif" }}>
                        {nextStep.text}
                      </div>
                      <div style={{ fontSize: "9px", color: "#6b5d4a", fontStyle: "italic", marginTop: "2px" }}>
                        — {topQuest.name}
                      </div>
                    </div>
                  </div>
                </Panel>
              );
            })()}

            <Panel>
              <SectionHeader icon={<ScrollIcon />} title="Quest Log" subtitle="Active missions and objectives" />
              <div style={{ marginBottom: "10px" }}>
                <ActionBtn onClick={() => setShowQuestCreator(true)}>+ NEW QUEST</ActionBtn>
              </div>

              {[
                { key: "main", label: "Main Quests", icon: <CrossedSwordsIcon size={11} />, color: "#f59e0b" },
                { key: "side", label: "Side Quests", icon: <PinIcon size={11} />, color: "#8a7a65" },
                { key: "misc", label: "Miscellaneous", icon: <MiscIcon size={11} />, color: "#6b5d4a" },
              ].map(category => {
                const allInCategory = quests.filter(q => q.type === category.key && q.status === "active");
                if (allInCategory.length === 0) return null;
                const isCollapsed = collapsedCategories[category.key];

                // Sub-tab filtering for main quests
                const mainSubTabs = [
                  { key: "all", label: "All" },
                  { key: "belvu", label: "Belvu / Ops" },
                  { key: "tech", label: "Tech / Build" },
                  { key: "self", label: "Self / Mission" },
                ];
                const filtered = category.key === "main" && mainQuestTab !== "all"
                  ? allInCategory.filter(q => q.id.startsWith(mainQuestTab + "-"))
                  : allInCategory;

                return (
                  <div key={category.key} style={{ marginBottom: "8px" }}>
                    {/* Category Header - collapsible */}
                    <div
                      onClick={() => toggleCategory(category.key)}
                      style={{
                        display: "flex", alignItems: "center", gap: "6px", cursor: "pointer",
                        padding: "8px 4px",
                        borderBottom: "1px solid rgba(245,158,11,0.08)",
                        userSelect: "none",
                      }}
                    >
                      <ChevronIcon size={10} color={category.color} open={!isCollapsed} />
                      <span style={{ marginRight: "2px" }}>{category.icon}</span>
                      <span style={{
                        fontSize: "11px", color: category.color, fontFamily: "'Cinzel', serif",
                        letterSpacing: "2px", textTransform: "uppercase", flex: 1,
                      }}>{category.label}</span>
                      <span style={{
                        fontSize: "9px", color: "#5a4f40", fontFamily: "'Fira Code', monospace",
                      }}>{filtered.length}</span>
                    </div>

                    {/* Sub-tabs for Main Quests */}
                    {category.key === "main" && !isCollapsed && (
                      <div style={{
                        display: "flex", gap: "0px", padding: "6px 4px 2px",
                        borderBottom: "1px solid rgba(245,158,11,0.06)",
                      }}>
                        {mainSubTabs.map(tab => {
                          const isActive = mainQuestTab === tab.key;
                          return (
                            <div
                              key={tab.key}
                              onClick={(e) => { e.stopPropagation(); setMainQuestTab(tab.key); }}
                              style={{
                                padding: "4px 10px",
                                fontSize: "9px",
                                fontFamily: "'Cinzel', serif",
                                letterSpacing: "1.5px",
                                textTransform: "uppercase",
                                cursor: "pointer",
                                color: isActive ? "#f5c842" : "#6b5d4a",
                                borderBottom: isActive ? "2px solid #f59e0b" : "2px solid transparent",
                                transition: "color 0.2s, border-color 0.2s",
                                userSelect: "none",
                              }}
                            >{tab.label}</div>
                          );
                        })}
                      </div>
                    )}

                    {/* Quest List - smooth drawer */}
                    <div style={{
                      maxHeight: isCollapsed ? "0px" : `${filtered.length * 300}px`,
                      overflow: "hidden",
                      transition: isCollapsed
                        ? "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s"
                        : "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s 0.05s",
                      opacity: isCollapsed ? 0 : 1,
                    }}>
                      <div style={{ paddingLeft: "4px" }}>
                        {filtered.map(quest => {
                          const progress = getQuestProgress(quest);
                          const isExpanded = expandedQuest === quest.id;
                          const nextObj = getNextObjective(quest);

                          return (
                            <div key={quest.id} style={{ borderBottom: "1px solid rgba(245,158,11,0.04)" }}>
                              {/* Quest Row - tap to expand */}
                              <div
                                onClick={() => setExpandedQuest(isExpanded ? null : quest.id)}
                                style={{
                                  display: "flex", alignItems: "center", gap: "8px",
                                  padding: "10px 6px", cursor: "pointer", userSelect: "none",
                                  background: isExpanded ? "rgba(245,158,11,0.04)" : "transparent",
                                  transition: "background 0.2s",
                                }}
                              >
                                <ChevronIcon size={9} color="#5a4f40" open={isExpanded} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{
                                    fontSize: "13px", color: isExpanded ? "#f5c842" : "#e8d5b5",
                                    fontWeight: 600, transition: "color 0.2s",
                                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                  }}>{quest.name}</div>
                                </div>
                                <span style={{
                                  fontSize: "9px", fontFamily: "'Fira Code', monospace",
                                  color: progress === 100 ? "#4a7a3a" : "#5a4f40", flexShrink: 0,
                                }}>{progress}%</span>
                              </div>

                              {/* Expanded Quest Detail */}
                              {isExpanded && (
                                <div style={{
                                  padding: "0 6px 12px 25px",
                                  animation: "fadeSlideDown 0.25s ease",
                                }}>
                                  {/* Description + Bonus XP */}
                                  <div style={{
                                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                                    marginBottom: "10px", gap: "8px",
                                  }}>
                                    {quest.description && (
                                      <div style={{
                                        fontSize: "11px", color: "#8a7a65", fontStyle: "italic",
                                        lineHeight: 1.5, flex: 1,
                                        paddingLeft: "4px", borderLeft: "2px solid rgba(245,158,11,0.15)",
                                      }}>{quest.description}</div>
                                    )}
                                    {quest.steps && quest.steps.length > 0 && (() => {
                                      const xi = getQuestXP(quest);
                                      return <span style={{ fontSize: "10px", color: "#4ade80", fontFamily: "'Fira Code', monospace", flexShrink: 0, whiteSpace: "nowrap" }}>+{xi.bonus} XP</span>;
                                    })()}
                                  </div>

                                  {/* Progress bar */}
                                  <div style={{ marginBottom: "10px" }}>
                                    <StatBar label="" value={progress} showValue={false} color={
                                      category.key === "main" ? "#f59e0b" : category.key === "side" ? "#6b7280" : "#5a4f40"
                                    } />
                                  </div>

                                  {/* Steps / Objectives */}
                                  {quest.steps && quest.steps.length > 0 && (() => {
                                    const xpInfo = getQuestXP(quest);
                                    return (
                                    <div style={{ marginBottom: "10px" }}>
                                      <div style={{
                                        display: "flex", justifyContent: "space-between", alignItems: "center",
                                        marginBottom: "6px", padding: "0 4px",
                                      }}>
                                        <span style={{ fontSize: "9px", color: "#5a4f40", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>
                                          OBJECTIVES ({quest.steps.filter(s=>s.done).length}/{quest.steps.length})
                                        </span>
                                      </div>
                                      {quest.steps.map((step, si) => {
                                        const isNext = nextObj && nextObj.text === step.text && !step.done;
                                        return (
                                          <div
                                            key={si}
                                            onClick={(e) => { e.stopPropagation(); toggleStep(quest.id, si); }}
                                            style={{
                                              display: "flex", alignItems: "flex-start", gap: "8px",
                                              padding: "6px 4px", cursor: "pointer", userSelect: "none",
                                              borderRadius: "4px",
                                              background: isNext ? "rgba(245,158,11,0.05)" : "transparent",
                                              transition: "background 0.2s",
                                            }}
                                          >
                                            {step.done
                                              ? <DiamondFilledIcon size={10} color="#4a7a3a" />
                                              : <DiamondMarkerIcon size={10} color={isNext ? "#f59e0b" : "#3d352a"} />
                                            }
                                            <span style={{
                                              fontSize: "11px", lineHeight: 1.4, flex: 1,
                                              color: step.done ? "#5a6b4e" : isNext ? "#e8d5b5" : "#8a7a65",
                                              textDecoration: step.done ? "line-through" : "none",
                                              opacity: step.done ? 0.7 : 1,
                                            }}>{step.text}</span>
                                            {!step.done && (
                                              <span style={{ fontSize: "8px", color: "#4ade80", fontFamily: "'Fira Code', monospace", flexShrink: 0 }}>
                                                +{xpInfo.perStep} xp
                                              </span>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    );
                                  })()}

                                  {/* Actions */}
                                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                                    <ActionBtn onClick={(e) => {
                                      e.stopPropagation();
                                      setShowQuestCreator(quest);
                                    }}>EDIT</ActionBtn>
                                    <ActionBtn onClick={async (e) => {
                                      e.stopPropagation();
                                      const xpInfo = getQuestXP(quest);
                                      const remaining = quest.steps?.filter(s => !s.done).length || 0;
                                      const stepXpTotal = remaining * xpInfo.perStep;
                                      saveQuests(quests.map(q => q.id === quest.id ? {
                                        ...q, status: "completed", steps: q.steps?.map(s => ({ ...s, done: true }))
                                      } : q), "Quest completed");
                                      setExpandedQuest(null);
                                      playQuestCompleteSound();
                                      setQuestCompleteOverlay({ quest, xp: xpInfo.bonus, totalXP: stepXpTotal + xpInfo.bonus });
                                      const result = await awardXP(stepXpTotal + xpInfo.bonus, character);
                                      setTimeout(() => setQuestCompleteOverlay(null), 3500);
                                    }}><CheckIcon size={10} color="currentColor" /> COMPLETE</ActionBtn>
                                    <ActionBtn danger onClick={(e) => {
                                      e.stopPropagation();
                                      saveQuests(quests.map(q => q.id === quest.id ? { ...q, status: "abandoned" } : q), "Quest abandoned");
                                      setExpandedQuest(null);
                                    }}><CrossIcon size={10} color="currentColor" /> ABANDON</ActionBtn>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Completed quests */}
              {quests.filter(q => q.status === "completed").length > 0 && (
                <div style={{ marginTop: "4px" }}>
                  <div
                    onClick={() => toggleCategory("completed")}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px", cursor: "pointer",
                      padding: "8px 4px",
                      borderBottom: "1px solid rgba(74,122,58,0.1)",
                      userSelect: "none",
                    }}
                  >
                    <ChevronIcon size={10} color="#4a7a3a" open={!collapsedCategories.completed} />
                    <CheckCircleIcon size={11} />
                    <span style={{
                      fontSize: "11px", color: "#4a7a3a", fontFamily: "'Cinzel', serif",
                      letterSpacing: "2px", textTransform: "uppercase", flex: 1,
                    }}>Completed</span>
                    <span style={{
                      fontSize: "9px", color: "#3d5a30", fontFamily: "'Fira Code', monospace",
                    }}>{quests.filter(q => q.status === "completed").length}</span>
                  </div>
                  <div style={{
                    maxHeight: collapsedCategories.completed ? "0px" : `${quests.filter(q => q.status === "completed").length * 60}px`,
                    overflow: "hidden",
                    transition: collapsedCategories.completed
                      ? "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s"
                      : "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s 0.05s",
                    opacity: collapsedCategories.completed ? 0 : 1,
                  }}>
                    <div style={{ paddingLeft: "4px" }}>
                      {quests.filter(q => q.status === "completed").map(quest => (
                        <div key={quest.id} style={{
                          padding: "8px 6px", display: "flex", alignItems: "center", gap: "8px",
                          borderBottom: "1px solid rgba(74,122,58,0.05)",
                        }}>
                          <DiamondFilledIcon size={8} color="#3d5a30" />
                          <span style={{
                            fontSize: "12px", color: "#5a6b4e", textDecoration: "line-through",
                            flex: 1, opacity: 0.7,
                          }}>{quest.name}</span>
                          <ActionBtn danger onClick={() => saveQuests(quests.filter(q => q.id !== quest.id), "Deleted completed quest")}>
                            <CrossIcon size={9} color="currentColor" />
                          </ActionBtn>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Abandoned quests */}
              {quests.filter(q => q.status === "abandoned").length > 0 && (
                <div style={{ marginTop: "4px" }}>
                  <div
                    onClick={() => toggleCategory("abandoned")}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px", cursor: "pointer",
                      padding: "8px 4px",
                      borderBottom: "1px solid rgba(220,38,38,0.08)",
                      userSelect: "none",
                    }}
                  >
                    <ChevronIcon size={10} color="#7a3a3a" open={!collapsedCategories.abandoned} />
                    <SkullIcon size={11} color="#7a3a3a" />
                    <span style={{
                      fontSize: "11px", color: "#7a3a3a", fontFamily: "'Cinzel', serif",
                      letterSpacing: "2px", textTransform: "uppercase", flex: 1,
                    }}>Abandoned</span>
                    <span style={{
                      fontSize: "9px", color: "#5a3030", fontFamily: "'Fira Code', monospace",
                    }}>{quests.filter(q => q.status === "abandoned").length}</span>
                  </div>
                  <div style={{
                    maxHeight: collapsedCategories.abandoned ? "0px" : `${quests.filter(q => q.status === "abandoned").length * 70}px`,
                    overflow: "hidden",
                    transition: collapsedCategories.abandoned
                      ? "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s"
                      : "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s 0.05s",
                    opacity: collapsedCategories.abandoned ? 0 : 1,
                  }}>
                    <div style={{ paddingLeft: "4px" }}>
                      {quests.filter(q => q.status === "abandoned").map(quest => (
                        <div key={quest.id} style={{
                          padding: "8px 6px", display: "flex", alignItems: "center", gap: "8px",
                          borderBottom: "1px solid rgba(220,38,38,0.04)",
                        }}>
                          <SkullIcon size={8} color="#5a3030" />
                          <span style={{
                            fontSize: "12px", color: "#6b4a4a", textDecoration: "line-through",
                            flex: 1, opacity: 0.6,
                          }}>{quest.name}</span>
                          <ActionBtn onClick={() => {
                            saveQuests(quests.map(q => q.id === quest.id ? { ...q, status: "active" } : q), "Quest resumed");
                          }}><UndoIcon size={9} color="currentColor" /> RESUME</ActionBtn>
                          <ActionBtn danger onClick={() => saveQuests(quests.filter(q => q.id !== quest.id), "Deleted abandoned quest")}>
                            <CrossIcon size={9} color="currentColor" />
                          </ActionBtn>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Panel>
          </div>
        )}

        {/* ═══ JOURNAL TAB ═══ */}
        {activeTab === "journal" && (() => {
          const today = new Date().toDateString();
          const todayEntry = journalEntries[today];
          const alreadySaved = !!todayEntry;
          const PROMPTS = [
            { key: "amazing", label: "What amazing things happened today?", icon: <SparkleIcon size={14} color="#f5c842" /> },
            { key: "learned", label: "What did you learn?", icon: <BookIcon size={14} color="#f5c842" /> },
            { key: "grateful", label: "What are you grateful for?", icon: <HeartIcon size={14} color="#f5c842" /> },
          ];
          const currentPrompt = PROMPTS[journalStep];
          const allAnswered = journalDraft.amazing.trim() && journalDraft.learned.trim() && journalDraft.grateful.trim();
          const allDates = Object.keys(journalEntries).sort((a, b) => new Date(b) - new Date(a));

          return (
            <div style={{ display: "grid", gap: "10px", opacity: mounted ? 1 : 0, transform: mounted ? "scale(1) translateY(0)" : "scale(0.95) translateY(15px)", transition: "opacity 0.5s 0.3s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s" }}>

              {/* ─── MENU VIEW ─── */}
              {journalView === "menu" && (
                <Panel>
                  <SectionHeader icon={<BookIcon />} title="Adventurer's Journal" subtitle="Record your journey" />

                  {alreadySaved && (
                    <div style={{
                      padding: "8px 10px", marginBottom: "12px", borderRadius: "6px",
                      background: "rgba(74,122,58,0.08)", border: "1px solid rgba(74,122,58,0.15)",
                      fontSize: "11px", color: "#4a7a3a", fontFamily: "'Cinzel', serif",
                      letterSpacing: "1px", textAlign: "center",
                    }}>✦ TODAY'S ENTRY RECORDED ✦</div>
                  )}

                  {/* Voice Journal Entry */}
                  <div
                    onClick={() => {
                      setAiOpen(true);
                      setTimeout(() => {
                        setAiInput("");
                        startListening((text) => {
                          // Send voice transcript to AI for journal processing
                          const journalPrompt = `Process this voice journal entry. Extract what happened today, what was learned, and what to be grateful for. Also identify any actionable items (new quests, completed challenges, etc). Here's what I said: "${text}"`;
                          setAiInput(journalPrompt);
                        });
                      }, 300);
                    }}
                    style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "12px", borderRadius: "8px", cursor: "pointer",
                      background: "rgba(147,220,255,0.04)", border: "1px solid rgba(147,220,255,0.15)",
                      marginBottom: "10px",
                    }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "10px",
                      background: "rgba(147,220,255,0.08)", border: "1px solid rgba(147,220,255,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(147,220,255,0.8)" strokeWidth="1.5">
                        <rect x="9" y="2" width="6" height="11" rx="3"/>
                        <path d="M5 10a7 7 0 0 0 14 0"/>
                        <line x1="12" y1="17" x2="12" y2="22"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "rgba(147,220,255,0.9)", fontFamily: "'Cinzel', serif", fontWeight: 600 }}>Voice Journal</div>
                      <div style={{ fontSize: "9px", color: "#6b5d4a" }}>Speak your thoughts · Navi will organize them</div>
                    </div>
                  </div>

                  {/* New Entry button */}
                  <div
                    onClick={() => {
                      if (alreadySaved) {
                        setJournalDraft({ ...todayEntry });
                        setJournalStep(3);
                      } else {
                        setJournalDraft({ amazing: "", learned: "", grateful: "" });
                        setJournalStep(0);
                      }
                      setJournalView("new");
                    }}
                    style={{
                      padding: "16px", marginBottom: "8px", borderRadius: "8px", cursor: "pointer",
                      background: "linear-gradient(145deg, rgba(245,158,11,0.08), rgba(245,158,11,0.02))",
                      border: "1px solid rgba(245,158,11,0.2)",
                      display: "flex", alignItems: "center", gap: "12px",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <QuillIcon size={20} color="#f5c842" />
                    <div>
                      <div style={{ fontSize: "14px", color: "#f5c842", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>
                        {alreadySaved ? "View Today's Entry" : "New Entry"}
                      </div>
                      <div style={{ fontSize: "11px", color: "#8a7a65", marginTop: "2px" }}>
                        {alreadySaved ? "Review or edit your journal" : "Answer today's three questions"}
                      </div>
                    </div>
                    <ChevronIcon size={12} color="#5a4f40" open={false} />
                  </div>

                  {/* Previous Entries button */}
                  <div
                    onClick={() => setJournalView("history")}
                    style={{
                      padding: "16px", borderRadius: "8px", cursor: "pointer",
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid rgba(245,158,11,0.08)",
                      display: "flex", alignItems: "center", gap: "12px",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <BookIcon size={20} color="#8a7a65" />
                    <div>
                      <div style={{ fontSize: "14px", color: "#c4a882", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>
                        Previous Entries
                      </div>
                      <div style={{ fontSize: "11px", color: "#6b5d4a", marginTop: "2px" }}>
                        {allDates.length} {allDates.length === 1 ? "entry" : "entries"} recorded
                      </div>
                    </div>
                    <ChevronIcon size={12} color="#5a4f40" open={false} />
                  </div>

                  {dailyFlipped && dailyCard && (
                    <div style={{ textAlign: "center", padding: "14px 8px", marginTop: "8px", borderTop: "1px solid rgba(245,158,11,0.08)" }}>
                      <div style={{ fontSize: "15px", color: "#e8d5b5", fontFamily: "Crimson Text, serif", fontStyle: "italic", lineHeight: 1.6 }}>"{dailyCard.quote}"</div>
                      <div style={{ fontSize: "9px", color: "#5a4f40", fontFamily: "Cinzel, serif", letterSpacing: "1.5px", marginTop: "10px", textTransform: "uppercase" }}>{dailyCard.category}</div>
                    </div>
                  )}
                </Panel>
              )}

              {/* ─── NEW ENTRY VIEW ─── */}
              {journalView === "new" && (
                <Panel>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <div onClick={() => { setJournalView("menu"); setJournalStep(0); }}
                      style={{ cursor: "pointer", padding: "4px", transform: "rotate(180deg)" }}>
                      <ChevronIcon size={12} color="#8a7a65" open={false} />
                    </div>
                    <SectionHeader icon={<QuillIcon />} title={alreadySaved ? "Today's Entry" : "New Entry"} subtitle={today} />
                  </div>

                  {/* Progress dots */}
                  <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
                    {PROMPTS.map((p, i) => (
                      <div key={i} style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: i < journalStep ? "#f59e0b" : i === journalStep && journalStep < 3 ? "rgba(245,158,11,0.5)" : "rgba(245,158,11,0.15)",
                        border: i === journalStep && journalStep < 3 ? "1px solid #f59e0b" : "1px solid transparent",
                        transition: "all 0.3s",
                      }} />
                    ))}
                  </div>

                  {journalStep < 3 ? (
                    <div key={journalStep} style={{ animation: "fadeSlideDown 0.3s ease" }}>
                      {/* Question */}
                      <div style={{
                        display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px",
                        justifyContent: "center",
                      }}>
                        {currentPrompt.icon}
                        <span style={{
                          fontSize: "13px", color: "#f5c842", fontFamily: "'Cinzel', serif",
                          letterSpacing: "1px", textAlign: "center",
                        }}>{currentPrompt.label}</span>
                        <button onClick={() => speak(currentPrompt.label)} style={{
                          background: "none", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "4px",
                          padding: "3px 6px", cursor: "pointer", display: "flex", alignItems: "center",
                        }}><SpeakerIcon size={11} color="#8a7a65" /></button>
                      </div>

                      {/* Answer textarea */}
                      <textarea
                        value={journalDraft[currentPrompt.key] || ""}
                        onChange={e => setJournalDraft(prev => ({ ...prev, [currentPrompt.key]: e.target.value }))}
                        placeholder="Write your answer..."
                        autoFocus
                        style={{
                          width: "100%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(245,158,11,0.2)",
                          borderRadius: "6px", color: "#e8d5b5", padding: "12px", fontSize: "16px",
                          fontFamily: "'Crimson Text', serif", resize: "vertical", minHeight: "80px",
                          outline: "none", boxSizing: "border-box",
                        }}
                      />

                      {/* Navigation */}
                      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                        {journalStep > 0 && (
                          <button onClick={() => setJournalStep(s => s - 1)} style={{
                            padding: "8px 16px", background: "rgba(0,0,0,0.3)",
                            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#8a7a65",
                            fontFamily: "'Cinzel', serif", fontSize: "11px", cursor: "pointer", letterSpacing: "1px",
                          }}>BACK</button>
                        )}
                        <button onClick={() => {
                          if (journalDraft[currentPrompt.key]?.trim()) setJournalStep(s => s + 1);
                        }} style={{
                          flex: 1, padding: "10px", borderRadius: "6px", cursor: "pointer",
                          fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
                          background: journalDraft[currentPrompt.key]?.trim()
                            ? "linear-gradient(145deg, rgba(245,158,11,0.3), rgba(245,158,11,0.1))"
                            : "rgba(0,0,0,0.2)",
                          border: journalDraft[currentPrompt.key]?.trim()
                            ? "1px solid rgba(245,158,11,0.4)"
                            : "1px solid rgba(255,255,255,0.05)",
                          color: journalDraft[currentPrompt.key]?.trim() ? "#f5c842" : "#5a4f40",
                        }}>
                          {journalStep < 2 ? "NEXT" : "REVIEW"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Review & Save */
                    <div style={{ animation: "fadeSlideDown 0.3s ease" }}>
                      <div style={{
                        fontSize: "10px", color: "#8a7a65", fontFamily: "'Cinzel', serif",
                        letterSpacing: "2px", textTransform: "uppercase", textAlign: "center", marginBottom: "12px",
                      }}>{alreadySaved ? "YOUR ENTRY" : "REVIEW YOUR ENTRY"}</div>
                      {PROMPTS.map((p, i) => (
                        <div key={p.key} style={{
                          marginBottom: "10px", padding: "8px",
                          background: "rgba(0,0,0,0.2)", borderRadius: "6px",
                          cursor: "pointer", border: "1px solid rgba(245,158,11,0.06)",
                        }} onClick={() => setJournalStep(i)}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                            {p.icon}
                            <span style={{ fontSize: "9px", color: "#8a7a65", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>
                              {p.label}
                            </span>
                          </div>
                          <div style={{
                            fontSize: "12px", color: "#c4a882", paddingLeft: "20px",
                            fontStyle: "italic", lineHeight: 1.4,
                          }}>{journalDraft[p.key]}</div>
                        </div>
                      ))}
                      <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                        <button onClick={() => setJournalStep(2)} style={{
                          padding: "8px 16px", background: "rgba(0,0,0,0.3)",
                          border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#8a7a65",
                          fontFamily: "'Cinzel', serif", fontSize: "11px", cursor: "pointer", letterSpacing: "1px",
                        }}>BACK</button>
                        {allAnswered && (
                          <button onClick={async () => {
                            await saveJournal(today, { ...journalDraft });
                            setJournalStep(0);
                            setJournalDraft({ amazing: "", learned: "", grateful: "" });
                            setJournalView("menu");
                          }} style={{
                            flex: 1, padding: "10px",
                            background: "linear-gradient(145deg, rgba(245,158,11,0.3), rgba(245,158,11,0.1))",
                            border: "1px solid rgba(245,158,11,0.4)", borderRadius: "6px", color: "#f5c842",
                            fontFamily: "'Cinzel', serif", fontSize: "12px", cursor: "pointer", letterSpacing: "1px",
                          }}>✦ SAVE ENTRY ✦</button>
                        )}
                      </div>
                    </div>
                  )}
                </Panel>
              )}

              {/* ─── HISTORY VIEW ─── */}
              {journalView === "history" && (
                <Panel>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <div onClick={() => setJournalView("menu")}
                      style={{ cursor: "pointer", padding: "4px", transform: "rotate(180deg)" }}>
                      <ChevronIcon size={12} color="#8a7a65" open={false} />
                    </div>
                    <SectionHeader icon={<BookIcon />} title="Previous Entries" subtitle={`${allDates.length} entries`} />
                  </div>

                  {allDates.length === 0 ? (
                    <div style={{
                      textAlign: "center", padding: "30px 10px", color: "#5a4f40",
                      fontStyle: "italic", fontSize: "13px",
                    }}>No entries yet. Start writing today.</div>
                  ) : (
                    allDates.map(date => {
                      const entry = journalEntries[date];
                      return (
                        <div key={date} style={{
                          padding: "10px 0", borderBottom: "1px solid rgba(245,158,11,0.06)",
                        }}>
                          <div style={{
                            fontSize: "10px", color: "#f59e0b", fontFamily: "'Cinzel', serif",
                            letterSpacing: "1px", marginBottom: "6px",
                          }}>{date}</div>
                          {entry.amazing && <div style={{ fontSize: "12px", color: "#c4a882", marginBottom: "4px", lineHeight: 1.4 }}>
                            <SparkleIcon size={9} color="#8a7a65" /> {entry.amazing}
                          </div>}
                          {entry.learned && <div style={{ fontSize: "12px", color: "#c4a882", marginBottom: "4px", lineHeight: 1.4 }}>
                            <BookIcon size={9} /> {entry.learned}
                          </div>}
                          {entry.grateful && <div style={{ fontSize: "12px", color: "#c4a882", lineHeight: 1.4 }}>
                            <HeartIcon size={9} /> {entry.grateful}
                          </div>}
                        </div>
                      );
                    })
                  )}
                </Panel>
              )}
            </div>
          );
        })()}

        {/* ═══ SKILLS TAB ═══ */}
        {activeTab === "skills" && (() => {
          const treeW = 5000, treeH = 5000;
          const cx = treeW / 2, cy = treeH / 2;
          const allNodes = [];
          const allLines = [];

          Object.entries(SKILL_CATEGORIES_DATA).forEach(([catKey, catData]) => {
            const catSkills = skills.filter(s => s.category === catKey);
            const current = catSkills.filter(s => s.tier === "current");
            const advanced = catSkills.filter(s => s.tier === "advanced");
            const undiscovered = catSkills.filter(s => s.tier === "undiscovered");
            const baseRad = (catData.angle * Math.PI) / 180;
            const perpRad = baseRad + Math.PI / 2;
            const hubDist = 200;
            const hubX = cx + Math.cos(baseRad) * hubDist;
            const hubY = cy + Math.sin(baseRad) * hubDist;
            allNodes.push({ x: hubX, y: hubY, type: "hub", category: catKey, name: catData.label, desc: catData.desc, color: catData.color });

            const placeSkills = (list, tier, startD, spacing, perpS) => {
              const nodes = [];
              list.forEach((skill, i) => {
                const along = startD + Math.floor(i / 2) * spacing;
                const side = (i % 2 === 0) ? 1 : -1;
                const perp = (list.length % 2 === 1 && i === list.length - 1) ? 0 : perpS * side;
                const nx = hubX + Math.cos(baseRad) * along + Math.cos(perpRad) * perp;
                const ny = hubY + Math.sin(baseRad) * along + Math.sin(perpRad) * perp;
                const idx = skills.indexOf(skill);
                allNodes.push({ x: nx, y: ny, type: tier, category: catKey, ...skill, color: catData.color, idx });
                nodes.push({ x: nx, y: ny });
                if (i < 2) {
                  allLines.push({ x1: hubX, y1: hubY, x2: nx, y2: ny, color: catData.color, opacity: tier === "current" ? 0.2 : 0.08, width: 1.2 });
                } else if (i >= 2) {
                  const p = nodes[i - 2];
                  allLines.push({ x1: p.x, y1: p.y, x2: nx, y2: ny, color: catData.color, opacity: tier === "current" ? 0.15 : 0.06, width: 1 });
                }
              });
              return nodes;
            };
            placeSkills(current, "current", 240, 180, 100);
            const advStart = 180 + Math.ceil(current.length / 2) * 160 + 120;
            placeSkills(advanced, "advanced", advStart + 60, 160, 90);
            const undStart = advStart + Math.ceil(advanced.length / 2) * 140 + 100;
            placeSkills(undiscovered, "undiscovered", undStart + 60, 150, 85);
            const total = undStart + Math.ceil(undiscovered.length / 2) * 130 + 60;
            allLines.push({ x1: hubX + Math.cos(baseRad) * 80, y1: hubY + Math.sin(baseRad) * 80, x2: hubX + Math.cos(baseRad) * total, y2: hubY + Math.sin(baseRad) * total, color: catData.color, opacity: 0.05, width: 0.8 });
          });



          const getTierStyle = (node) => {
            if (node.type === "hub") return { size: 56, border: node.color, glow: `${node.color}40`, bg: `${node.color}cc` };
            if (node.type === "undiscovered") return { size: 34, border: "rgba(255,255,255,0.06)", glow: "transparent", bg: `${node.color}20` };
            if (node.type === "advanced") return { size: 36, border: `${node.color}40`, glow: `${node.color}10`, bg: `${node.color}30` };
            const l = node.level || 0;
            if (l >= 80) return { size: 44, border: "#f5c842", glow: "rgba(245,200,66,0.25)", bg: `${node.color}66` };
            if (l >= 60) return { size: 42, border: node.color, glow: `${node.color}20`, bg: `${node.color}55` };
            return { size: 40, border: `${node.color}70`, glow: `${node.color}10`, bg: `${node.color}44` };
          };

          const catIcon = (cat, color, size) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {cat === "mind" && <><circle cx="12" cy="12" r="9"/><path d="M12 3c0 4-3 6-3 9s3 5 3 5 3-2 3-5-3-5-3-9z"/></>}
              {cat === "wealth" && <><polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9"/></>}
              {cat === "body" && <><path d="M6.5 6.5c0-2 1.5-3.5 3.5-3.5h4c2 0 3.5 1.5 3.5 3.5"/><path d="M4 11h16"/><path d="M8 11v8l4-3 4 3v-8"/></>}
              {cat === "charisma" && <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>}
              {cat === "leadership" && <><path d="M2 20h20"/><path d="M5 20V8l7-5 7 5v12"/><path d="M10 20v-5h4v5"/></>}
              {cat === "creator" && <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>}
              {cat === "spirit" && <><path d="M12 21c-4 0-7-3-7-7 0-3 2-5 4-7 1-1 2-2 3-4 1 2 2 3 3 4 2 2 4 4 4 7 0 4-3 7-7 7z"/><path d="M12 21v-8"/></>}
            </svg>
          );

          // Lightbox-style zoom: overflow hidden, touch-action none, manual pan+zoom
          const initViewport = (el) => {
            if (!el) return;
            const content = el.querySelector("[data-tree]");
            if (!content) return;
            if (el.dataset.ready) return;
            el.dataset.ready = "1";

            let scale = 0.8;
            let panX = -(cx * scale - el.clientWidth / 2);
            let panY = -(cy * scale - el.clientHeight / 2);

            const apply = () => {
              content.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
            };

            apply();

            // Touch state
            let touching = false;
            let lastX = 0, lastY = 0;
            let startDist = 0, startScale = 1;
            let startPanX = 0, startPanY = 0;
            let startMidX = 0, startMidY = 0;
            let lastTap = 0;
            let velocityX = 0, velocityY = 0;
            let lastMoveTime = 0;
            let momentumId = null;
            let tapStartX = 0, tapStartY = 0, didMove = false;

            const getDist = (t) => Math.hypot(
              t[0].clientX - t[1].clientX,
              t[0].clientY - t[1].clientY
            );

            const clampPan = () => {
              const vw = el.clientWidth;
              const vh = el.clientHeight;
              const scaledW = treeW * scale;
              const scaledH = treeH * scale;
              // If content smaller than viewport, center it
              if (scaledW <= vw) {
                panX = (vw - scaledW) / 2;
              } else {
                panX = Math.max(-(scaledW - vw), Math.min(0, panX));
              }
              if (scaledH <= vh) {
                panY = (vh - scaledH) / 2;
              } else {
                panY = Math.max(-(scaledH - vh), Math.min(0, panY));
              }
              // Guard against NaN
              if (!isFinite(panX)) panX = 0;
              if (!isFinite(panY)) panY = 0;
            };

            const animZoom = (from, to, pivotX, pivotY) => {
              if (!isFinite(from) || !isFinite(to) || from === 0) return;
              const contentX = (pivotX - panX) / from;
              const contentY = (pivotY - panY) / from;
              let t = 0;
              const step = () => {
                t += 0.06;
                if (t > 1) t = 1;
                const e = 1 - Math.pow(1 - t, 3);
                scale = from + (to - from) * e;
                panX = pivotX - contentX * scale;
                panY = pivotY - contentY * scale;
                clampPan();
                apply();
                if (t < 1) requestAnimationFrame(step);
              };
              requestAnimationFrame(step);
            };

            const doMomentum = () => {
              velocityX *= 0.92;
              velocityY *= 0.92;
              if (Math.abs(velocityX) < 0.5 && Math.abs(velocityY) < 0.5) return;
              panX += velocityX;
              panY += velocityY;
              clampPan();
              apply();
              momentumId = requestAnimationFrame(doMomentum);
            };

            el.addEventListener("touchstart", (e) => {
              e.preventDefault();
              if (momentumId) { cancelAnimationFrame(momentumId); momentumId = null; }
              velocityX = 0; velocityY = 0;

              if (e.touches.length === 1) {
                touching = true;
                didMove = false;
                lastX = e.touches[0].clientX;
                lastY = e.touches[0].clientY;
                tapStartX = lastX;
                tapStartY = lastY;
                lastMoveTime = Date.now();
              } else if (e.touches.length === 2) {
                touching = false;
                startDist = getDist(e.touches);
                startScale = scale;
                startPanX = panX;
                startPanY = panY;
                const rect = el.getBoundingClientRect();
                startMidX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
                startMidY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
              }
            }, { passive: false });

            el.addEventListener("touchmove", (e) => {
              e.preventDefault();

              if (e.touches.length === 1 && touching) {
                const dx = e.touches[0].clientX - lastX;
                const dy = e.touches[0].clientY - lastY;
                if (!didMove && Math.hypot(e.touches[0].clientX - tapStartX, e.touches[0].clientY - tapStartY) > 8) {
                  didMove = true;
                }
                const now = Date.now();
                const dt = now - lastMoveTime;
                if (dt > 0) {
                  velocityX = dx * (16 / dt);
                  velocityY = dy * (16 / dt);
                }
                lastMoveTime = now;
                lastX = e.touches[0].clientX;
                lastY = e.touches[0].clientY;
                panX += dx;
                panY += dy;
                clampPan();
                apply();
              } else if (e.touches.length === 2) {
                const d = getDist(e.touches);
                const r = d / startDist;
                const ns = Math.max(0.3, Math.min(2.5, startScale * r));

                // Pinch midpoint in viewport
                const rect = el.getBoundingClientRect();
                const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
                const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

                // Content point that was under the start midpoint
                const contentX = (startMidX - startPanX) / startScale;
                const contentY = (startMidY - startPanY) / startScale;

                scale = ns;
                // Keep content point under current midpoint
                panX = midX - contentX * scale;
                panY = midY - contentY * scale;
                clampPan();
                apply();
              }
            }, { passive: false });

            el.addEventListener("touchend", (e) => {
              e.preventDefault();

              if (e.touches.length === 0) {
                const now = Date.now();
                // Double-tap detection
                if (now - lastTap < 300 && now - lastTap > 50 && e.changedTouches.length === 1) {
                  const rect = el.getBoundingClientRect();
                  const tx = e.changedTouches[0].clientX - rect.left;
                  const ty = e.changedTouches[0].clientY - rect.top;
                  const target = scale < 0.9 ? 1.3 : 0.25;
                  animZoom(scale, target, tx, ty);
                  lastTap = 0;
                } else if (!didMove && e.changedTouches.length === 1) {
                  // Single tap — find tapped node
                  lastTap = now;
                  const tapEl = document.elementFromPoint(
                    e.changedTouches[0].clientX,
                    e.changedTouches[0].clientY
                  );
                  if (tapEl) {
                    const nodeEl = tapEl.closest("[data-skill]");
                    if (nodeEl) {
                      const idx = parseInt(nodeEl.dataset.skill);
                      const node = allNodes[idx];
                      if (node && node.type === "hub") {
                        const catData = SKILL_CATEGORIES_DATA[node.category];
                        const catSkills = skills.filter(s => s.category === node.category);
                        setShowLocked(false);
                        setSkillDetail({
                          name: catData.label,
                          category: node.category,
                          tier: "hub",
                          level: 0,
                          color: node.color,
                          isCategory: true,
                          catSkills,
                        });
                      } else if (node && node.type !== "hub") {
                        setSkillDetail({
                          name: node.name,
                          category: node.category,
                          tier: node.type,
                          level: node.level || 0,
                          skillXp: node.skillXp || 0,
                          color: node.color,
                          idx: node.idx,
                        });
                      }
                    }
                  }
                } else {
                  lastTap = now;
                  // Start momentum
                  if (touching && (Math.abs(velocityX) > 1 || Math.abs(velocityY) > 1)) {
                    momentumId = requestAnimationFrame(doMomentum);
                  }
                }
                touching = false;
              } else if (e.touches.length === 1) {
                // Went from 2 fingers to 1 — reset single-touch tracking
                touching = true;
                lastX = e.touches[0].clientX;
                lastY = e.touches[0].clientY;
                velocityX = 0; velocityY = 0;
                lastMoveTime = Date.now();
              }
            }, { passive: false });
          };

          return (
            <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "scale(1) translateY(0)" : "scale(0.95) translateY(15px)", transition: "opacity 0.5s 0.3s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s" }}>
              <div ref={initViewport} style={{
                width: "100%", height: "calc(100vh - 140px)",
                overflow: "hidden", borderRadius: "0px",
                background: "radial-gradient(ellipse at 50% 50%, rgba(20,16,10,0.95), rgba(5,4,3,1))",
                touchAction: "none",
                userSelect: "none", WebkitUserSelect: "none",
              }}>
                <div data-tree style={{
                  width: `${treeW}px`, height: `${treeH}px`,
                  position: "absolute", transformOrigin: "0 0",
                  willChange: "transform",
                }}>
                    {/* SVG lines */}
                    <svg width={treeW} height={treeH} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                      <defs>
                        <radialGradient id="cGlow2">
                          <stop offset="0%" stopColor="rgba(245,158,11,0.1)" />
                          <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                      </defs>
                      <circle cx={cx} cy={cy} r={200} fill="url(#cGlow2)" />
                      {allLines.map((line, i) => (
                        <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                          stroke={line.color} strokeWidth={line.width} opacity={line.opacity}
                          strokeDasharray={line.dashed ? "4,8" : "none"} />
                      ))}
                    </svg>

                    {/* Nodes */}
                    {allNodes.map((node, i) => {
                      const ts = getTierStyle(node);
                      const isLocked = node.type === "undiscovered";
                      const isAdv = node.type === "advanced";
                      const isHub = node.type === "hub";
                      return (
                        <div key={i} data-skill={i}
                          style={{
                            position: "absolute",
                            left: `${node.x}px`, top: `${node.y}px`,
                            transform: "translate(-50%, -50%)",
                            display: "flex", flexDirection: "column", alignItems: "center",
                            cursor: isHub ? "default" : "pointer",
                            gap: "2px", zIndex: isHub ? 5 : 2,
                            padding: "6px",
                            minWidth: `${ts.size + 16}px`, minHeight: `${ts.size + 16}px`,
                          }}>
                          <div style={{
                            width: `${ts.size}px`, height: `${ts.size}px`, borderRadius: isHub ? "14px" : "10px",
                            background: `radial-gradient(circle at 40% 35%, ${ts.bg}, rgba(5,4,3,0.95))`,
                            border: `2px solid ${ts.border}`,
                            boxShadow: `0 0 ${isHub ? 20 : 8}px ${ts.glow}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            filter: isLocked ? "blur(2px)" : "none",
                            opacity: isLocked ? 0.3 : isAdv ? 0.55 : 1,
                          }}>
                            {isHub ? catIcon(node.category, node.color, ts.size * 0.45) : isLocked ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                              </svg>
                            ) : (
                              <svg width={isAdv ? "13" : "14"} height={isAdv ? "13" : "14"} viewBox="0 0 24 24" fill="none" stroke={isAdv ? `${node.color}60` : node.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={isAdv ? 0.5 : 0.8}>
                                {SKILL_ICONS[node.name] || <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/>}
                              </svg>
                            )}
                          </div>
                          <div style={{
                            fontSize: isHub ? "10px" : "7.5px",
                            color: isLocked ? "rgba(255,255,255,0.1)" : isHub ? node.color : isAdv ? `${node.color}70` : "#b8a68e",
                            fontFamily: "'Cinzel', serif", textAlign: "center",
                            maxWidth: isHub ? "90px" : "68px", lineHeight: 1.15,
                            letterSpacing: isHub ? "1.5px" : "0.2px",
                            textTransform: isHub ? "uppercase" : "none",
                            filter: isLocked ? "blur(3px)" : "none", marginTop: "1px",
                          }}>
                            {isLocked ? "???" : node.name}
                          </div>
                          {node.type === "current" && node.level > 0 && (
                            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                              <svg width="26" height="3">
                                <rect x="0" y="0" width="26" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
                                <rect x="0" y="0" width={`${(node.level / 100) * 26}`} height="3" rx="1.5" fill={node.color} opacity="0.6" />
                              </svg>
                              <span style={{ fontSize: "6.5px", color: `${node.color}80`, fontFamily: "'Fira Code', monospace" }}>{node.level}</span>
                            </div>
                          )}
                          {isAdv && (
                            <span style={{ fontSize: "5.5px", color: `${node.color}40`, fontFamily: "'Cinzel', serif", letterSpacing: "0.8px" }}>LOCKED</span>
                          )}
                        </div>
                      );
                    })}

                    {/* Center avatar */}
                    <div style={{
                      position: "absolute", left: `${cx}px`, top: `${cy}px`,
                      transform: "translate(-50%, -50%)",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", zIndex: 10,
                    }}>
                      <div style={{
                        width: "72px", height: "72px", borderRadius: "50%",
                        border: "2px solid rgba(245,158,11,0.5)",
                        boxShadow: "0 0 40px rgba(245,158,11,0.15), 0 0 80px rgba(245,158,11,0.06)",
                        overflow: "hidden", background: "linear-gradient(145deg, #1a150e, #0d0a07)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px",
                      }}>
                        {character.avatar ? (
                          <img src={character.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : "🐺"}
                      </div>
                      <div style={{ fontSize: "12px", color: "#f5c842", fontFamily: "'Cinzel Decorative', serif", textShadow: "0 0 12px rgba(245,158,11,0.25)" }}>{character.name}</div>
                      <div style={{ fontSize: "8px", color: "#8a7a65", fontFamily: "'Cinzel', serif", letterSpacing: "1.5px", textTransform: "uppercase" }}>{character.title}</div>
                      <div style={{ fontSize: "7px", color: "#5a4f40", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>LEVEL {character.level}</div>
                    </div>
                  </div>
                </div>
              </div>
          );
        })()}

        {/* ═══ INVENTORY TAB ═══ */}
        {activeTab === "inventory" && equipment && assets && (
          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "scale(1) translateY(0)" : "scale(0.95) translateY(15px)", transition: "opacity 0.5s 0.3s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s", display: "grid", gap: "10px" }}>
            {/* Avatar with equipment */}
            <HeroScene expanded={true} equipment={equipment} highlightSlots={isDragging} dragCategory={isDragging && dragItem ? dragItem.item.category : null} dragSubcategory={isDragging && dragItem ? dragItem.item.subcategory : null} onDragStart={(item, source, slotId, x, y) => {
                dragPosRef.current = { x, y };
                setDragItem({ item, source, slotId, assetName: item.name });
                setIsDragging(true); setHighlightSlots(true); window._isDragging = true;
              }} registerSlotRef={(id, el) => { if (el) slotRectsRef.current[id] = el; }} selectedSlotId={isDragging && dragItem ? dragItem.slotId || null : null} onSlotPress={(slot, slotItem) => { if (!isDragging && slotItem) setItemDetail(slotItem); }} />

            {/* Inventory Grid - Physical Items */}
            <Panel>
              <SectionHeader icon={<BackpackIcon />} title="Inventory" subtitle="Hold to drag · Drop on slot to equip" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "5px" }}>
                {assets.filter(a => !["digital","business","transport"].includes(a.category)).map((item, idx) => {
                  const rc = RARITY_COLORS[item.rarity];
                  const catIcon = item.category && ASSET_CAT_ICONS[item.category];
                  return (
                    <div key={item.name + (item._slotId || "")}
                      onClick={() => !isDragging && setItemDetail(item)}
                      onTouchStart={(e) => {
                        const touch = e.touches[0];
                        const startX = touch.clientX, startY = touch.clientY;
                        e.currentTarget._dragStart = { x: startX, y: startY };
                        e.currentTarget._holdActive = true;
                        dragTimerRef.current = setTimeout(() => {
                          if (navigator.vibrate) navigator.vibrate(30);
                          dragPosRef.current = { x: startX, y: startY };
                          setDragItem({ item, source: "inventory", slotId: null, assetName: item.name });
                          setIsDragging(true);
                          setHighlightSlots(true);
                          window._isDragging = true;

                        }, 250);
                      }}
                      onTouchMove={(e) => {
                        const touch = e.touches[0];
                        const start = e.currentTarget._dragStart;
                        if (start && e.currentTarget._holdActive && !isDragging) {
                          const dist = Math.hypot(touch.clientX - start.x, touch.clientY - start.y);
                          if (dist > 10) { clearTimeout(dragTimerRef.current); e.currentTarget._holdActive = false; }
                        }
                        if (isDragging) {
                          dragPosRef.current = { x: touch.clientX, y: touch.clientY };
                          if (dragGhostRef.current) {
                            dragGhostRef.current.style.left = (touch.clientX - 28) + "px";
                            dragGhostRef.current.style.top = (touch.clientY - 28) + "px";
                          }
                          // Auto-scroll when dragging near screen edges
                          const edgeZone = 60;
                          const scrollSpeed = 8;
                          const scrollEl = document.scrollingElement || document.documentElement;
                          if (touch.clientY < edgeZone) {
                            scrollEl.scrollTop -= scrollSpeed;
                          } else if (touch.clientY > window.innerHeight - edgeZone) {
                            scrollEl.scrollTop += scrollSpeed;
                          }
                          // Haptic on hover over valid equipment slots
                          let hoveringSlot = null;
                          const dragCat = dragItem ? (dragItem.item.category || "misc") : "";
                          for (const [slotId, el] of Object.entries(slotRectsRef.current)) {
                            if (!el) continue;
                            const r = el.getBoundingClientRect();
                            if (touch.clientX >= r.left && touch.clientX <= r.right && touch.clientY >= r.top && touch.clientY <= r.bottom) {
                              const sd = EQUIP_SLOTS.find(s => s.id === slotId);
                              const dragSub = dragItem ? (dragItem.item.subcategory || "") : "";
                              const valid = sd && sd.category === dragCat && sd.subcategories.includes(dragSub);
                              if (valid) hoveringSlot = slotId;
                              break;
                            }
                          }
                          if (hoveringSlot && hoveringSlot !== lastHoverSlotRef.current) {
                            if (navigator.vibrate) navigator.vibrate(10);
                            lastHoverSlotRef.current = hoveringSlot;
                          } else if (!hoveringSlot) {
                            lastHoverSlotRef.current = null;
                          }
                        }
                      }}
                      onTouchEnd={(e) => {
                        clearTimeout(dragTimerRef.current);
                        e.currentTarget._holdActive = false;

                        lastHoverSlotRef.current = null;
                        if (isDragging && dragItem) {
                          const x = dragPosRef.current.x, y = dragPosRef.current.y;
                          let dropped = false;
                          for (const [slotId, el] of Object.entries(slotRectsRef.current)) {
                            if (!el) continue;
                            const r = el.getBoundingClientRect();
                            if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
                              // Validate category + subcategory vs slot
                              const slotDef = EQUIP_SLOTS.find(s => s.id === slotId);
                              const dragCat = dragItem.item.category || "";
                              const dragSub = dragItem.item.subcategory || "";
                              const allowed = slotDef && slotDef.category === dragCat && slotDef.subcategories.includes(dragSub);
                              if (!allowed) {
                                if (navigator.vibrate) navigator.vibrate([30, 30, 30]);
                                break;
                              }
                              const newEquip = JSON.parse(JSON.stringify(equipment));
                              const oldInSlot = newEquip[slotId] ? { ...newEquip[slotId] } : null;
                              if (dragItem.source === "inventory") {
                                const toEquip = JSON.parse(JSON.stringify(dragItem.item));
                                const cat = toEquip.category || "misc";
                                delete toEquip._equipped; delete toEquip._slotId; delete toEquip._slot;
                                newEquip[slotId] = toEquip;
                                let newAssets = assets.filter(a => a.name !== dragItem.assetName);
                                if (oldInSlot) newAssets = [...newAssets, { ...oldInSlot, category: oldInSlot.category || cat }];
                                saveEquipment(newEquip);
                                saveAssets(newAssets);
                              } else if (dragItem.source === "equipment" && dragItem.slotId !== slotId) {
                                // Validate: both slots must be same side
                                const fromSlot = EQUIP_SLOTS.find(s => s.id === dragItem.slotId);
                                if (fromSlot && slotDef && fromSlot.side === slotDef.side) {
                                  newEquip[slotId] = JSON.parse(JSON.stringify(dragItem.item));
                                  if (oldInSlot) newEquip[dragItem.slotId] = oldInSlot;
                                  else delete newEquip[dragItem.slotId];
                                  saveEquipment(newEquip);
                                } else {
                                  if (navigator.vibrate) navigator.vibrate([30, 30, 30]);
                                }
                              }
                              dropped = true;
                              if (navigator.vibrate) navigator.vibrate(15);
                              break;
                            }
                          }
                          if (!dropped && dragItem.source === "equipment") {
                            const newEquip = JSON.parse(JSON.stringify(equipment));
                            delete newEquip[dragItem.slotId];
                            const unequipped = JSON.parse(JSON.stringify(dragItem.item));
                            delete unequipped._equipped; delete unequipped._slotId; delete unequipped._slot;
                            if (!unequipped.category) unequipped.category = "misc";
                            saveEquipment(newEquip);
                            saveAssets([...assets, unequipped]);
                          }
                          setDragItem(null);
                          setIsDragging(false);
                          setHighlightSlots(false);
                        }
                      }}
                      style={{
                        aspectRatio: "1", borderRadius: "6px",
                        background: "rgba(0,0,0,0.4)",
                        border: isDragging && dragItem && dragItem.assetName === item.name ? `2px solid #f59e0b` : `1px solid ${rc.bg}30`,
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: item.image ? "flex-end" : "center",
                        padding: item.image ? "0" : "4px", cursor: "pointer", position: "relative",
                        boxShadow: isDragging && dragItem && dragItem.assetName === item.name ? undefined : `inset 0 0 12px ${rc.bg}08`,
                        animation: isDragging && dragItem && dragItem.assetName === item.name ? "equipSelect 1.5s ease-in-out infinite" : undefined,
                        overflow: "hidden",
                        touchAction: isDragging ? "none" : "auto",
                    }}>
                      {item._equipped && <div style={{ position: "absolute", top: "2px", right: "2px", width: "5px", height: "5px", borderRadius: "50%", background: "#10b981", zIndex: 2 }} />}
                      {item.image ? (
                        <>
                          <img src={item.image} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "5px" }} />
                          <div style={{ position: "relative", zIndex: 1, width: "100%", padding: "2px 3px 3px", background: "linear-gradient(transparent, rgba(0,0,0,0.8))", borderRadius: "0 0 5px 5px" }}>
                            <div style={{ fontSize: "7px", color: "#fff", fontFamily: "'Cinzel', serif", textAlign: "center", lineHeight: 1.1, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
                              {item.name.split(" ").slice(0, 2).join(" ")}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ marginBottom: "2px" }}>
                            {(() => { const si = item.subcategory && SUBCAT_ICONS[item.subcategory]; return si ? si(20, rc.bg) : catIcon ? catIcon(20, rc.bg) : <GemIcon size={20} color={rc.bg} />; })()}
                          </div>
                          <div style={{ fontSize: "7px", color: rc.bg, fontFamily: "'Cinzel', serif", textAlign: "center", lineHeight: 1.1, maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {item.name.split(" ").slice(0, 2).join(" ")}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
                {/* Empty slots - tap to add */}
                {Array.from({ length: Math.max(0, 15 - assets.filter(a => !['digital','business','transport'].includes(a.category)).length) }).map((_, i) => (
                  <div key={`empty-${i}`} onClick={() => {
                    if (!isDragging) {
                      setItemEditModal({ name: "", rarity: "common", description: "", specs: "", category: "misc", subcategory: "", image: null, isNew: true });
                    }
                  }} style={{
                    aspectRatio: "1", borderRadius: "6px",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px dashed rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3d352a" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                ))}
              </div>
            </Panel>
            {/* Assets Panel - Digital Products, Businesses & Vehicle */}
            {(() => {
              const assetCats = ["digital", "business", "transport"];
              const assetItems = assets.filter(a => assetCats.includes(a.category));
              const equippedAssets = EQUIP_SLOTS.filter(s => assetCats.includes(s.category)).map(s => equipment[s.id] ? { ...equipment[s.id], _equipped: true, _slotLabel: s.label } : null).filter(Boolean);
              const allAssets = [...equippedAssets, ...assetItems];
              if (allAssets.length === 0) return null;
              const catLabels = { digital: "Digital Products", business: "Businesses", transport: "Vehicles" };
              return (
                <Panel>
                  <div onClick={() => setAssetsExpanded(!assetsExpanded)} style={{ cursor: "pointer" }}>
                    <SectionHeader icon={<GemIcon />} title="Assets" subtitle={`${allAssets.length} items`} />
                  </div>
                  <div style={{ maxHeight: assetsExpanded ? "1000px" : "0", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}>
                  {["digital", "business", "transport"].map(cat => {
                    const items = allAssets.filter(a => a.category === cat);
                    if (items.length === 0) return null;
                    const IconFn = ASSET_CAT_ICONS[cat];
                    return (
                      <div key={cat} style={{ marginBottom: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                          {IconFn && IconFn(12, "#8a7a65")}
                          <span style={{ fontSize: "9px", color: "#8a7a65", fontFamily: "'Cinzel', serif", letterSpacing: "1.5px", textTransform: "uppercase" }}>{catLabels[cat]}</span>
                        </div>
                        {items.map((item) => {
                          const rc = RARITY_COLORS[item.rarity];
                          const SubIcon = item.subcategory && SUBCAT_ICONS[item.subcategory];
                          return (
                            <div key={item.name} onClick={() => setItemDetail(item)} style={{
                              padding: "8px 10px", marginBottom: "4px", borderRadius: "8px",
                              background: "rgba(0,0,0,0.3)",
                              border: `1px solid ${rc.bg}22`,
                              cursor: "pointer",
                              display: "flex", alignItems: "center", gap: "8px",
                            }}>
                              {item.image ? (
                                <img src={item.image} style={{ width: "30px", height: "30px", objectFit: "cover", borderRadius: "6px" }} />
                              ) : (
                                <div style={{ width: "30px", height: "30px", borderRadius: "6px", background: `${rc.bg}10`, border: `1px solid ${rc.bg}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  {SubIcon ? SubIcon(15, rc.bg) : IconFn ? IconFn(15, rc.bg) : <GemIcon size={15} color={rc.bg} />}
                                </div>
                              )}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: "10px", color: rc.bg, fontWeight: 600, fontFamily: "'Cinzel', serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                                <div style={{ fontSize: "8px", color: "#6b5d4a", fontFamily: "'Fira Code', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.specs}</div>
                              </div>
                              {item._equipped && <span style={{ fontSize: "7px", color: "#10b981", fontFamily: "'Cinzel', serif", letterSpacing: "0.5px", flexShrink: 0 }}>EQUIPPED</span>}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                  </div>
                </Panel>
              );
            })()}


          </div>
        )}

{/* Footer */}
        <div style={{
          textAlign: "center", padding: "16px 0 calc(100px + env(safe-area-inset-bottom, 0px))", fontSize: "9px",
          color: "#3d352a", fontFamily: "'Cinzel', serif", letterSpacing: "2px",
        }}>
          JEFFERSON WOLFE · LIFE RPG · v1.0
        </div>
      </div>

      {/* ═══ ITEM DETAIL POPUP ═══ */}
      {itemDetail && (
        <div onClick={() => setItemDetail(null)} style={{
          position: "fixed", inset: 0, zIndex: 2000,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
          animation: "fadeIn 0.2s ease",
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "linear-gradient(145deg, #1a150e, #0d0a07)",
            border: `1px solid ${RARITY_COLORS[itemDetail.rarity].bg}40`,
            borderRadius: "12px", padding: "20px", maxWidth: "280px", width: "90%",
            boxShadow: `0 0 30px ${RARITY_COLORS[itemDetail.rarity].bg}15`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "8px",
                background: `${RARITY_COLORS[itemDetail.rarity].bg}15`,
                border: `1px solid ${RARITY_COLORS[itemDetail.rarity].bg}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {itemDetail.category && ASSET_CAT_ICONS[itemDetail.category] ? ASSET_CAT_ICONS[itemDetail.category](22, RARITY_COLORS[itemDetail.rarity].bg) : <GemIcon size={22} color={RARITY_COLORS[itemDetail.rarity].bg} />}
              </div>
              <div>
                <div style={{ fontSize: "14px", color: RARITY_COLORS[itemDetail.rarity].bg, fontFamily: "'Cinzel', serif", fontWeight: 600 }}>{itemDetail.name}</div>
                <div style={{ fontSize: "8px", color: RARITY_COLORS[itemDetail.rarity].bg, fontFamily: "'Cinzel', serif", letterSpacing: "1.5px", textTransform: "uppercase", opacity: 0.7 }}>{RARITY_COLORS[itemDetail.rarity].label}{itemDetail._equipped ? " · EQUIPPED" : ""}</div>
              </div>
            </div>
            {itemDetail.specs && <div style={{ fontSize: "11px", color: "#b8a68e", fontFamily: "'Fira Code', monospace", marginBottom: "6px", padding: "6px 8px", borderRadius: "4px", background: "rgba(255,255,255,0.03)" }}>{itemDetail.specs}</div>}
            {itemDetail.description && <div style={{ fontSize: "12px", color: "#8a7a65", fontFamily: "'Crimson Text', serif", fontStyle: "italic", lineHeight: 1.5 }}>{itemDetail.description}</div>}
            {itemDetail.image && <div style={{ marginBottom: "10px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}><img src={itemDetail.image} style={{ width: "100%", height: "120px", objectFit: "cover" }} /></div>}
            <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
              <button onClick={() => { setItemEditModal({ ...itemDetail, subcategory: itemDetail.subcategory || "", isNew: false, _origName: itemDetail.name }); setItemDetail(null); }} style={{
                flex: 1, padding: "8px", fontSize: "9px",
                fontFamily: "'Cinzel', serif", letterSpacing: "1.5px",
                background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: "6px", color: "#f59e0b", cursor: "pointer",
              }}>EDIT</button>
              <button onClick={() => setItemDetail(null)} style={{
                flex: 1, padding: "8px", fontSize: "9px",
                fontFamily: "'Cinzel', serif", letterSpacing: "1.5px",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "6px", color: "#8a7a65", cursor: "pointer",
              }}>CLOSE</button>
            </div>
          </div>
        </div>
      )}

            {/* ═══ ITEM EDIT/ADD MODAL ═══ */}
      {itemEditModal && (() => {
        const [form, setForm] = [itemEditModal, setItemEditModal];
        const updateField = (k, v) => setItemEditModal(prev => ({ ...prev, [k]: v }));
        const handleImageUpload = (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (ev) => { setCropSrc(ev.target.result); setCropTarget("item"); };
          reader.readAsDataURL(file);
          e.target.value = "";
        };
        const handleSave = () => {
          if (!form.name.trim()) return;
          const item = { name: form.name, rarity: form.rarity, description: form.description, specs: form.specs, category: form.category, subcategory: form.subcategory || "", image: form.image };
          if (form.isNew) {
            saveAssets([...assets, item]);
          } else if (form._equipped && form._slot) {
            // Update equipped item
            const slotId = EQUIP_SLOTS.find(s => s.label === form._slot)?.id;
            if (slotId) {
              const newEquip = { ...equipment };
              newEquip[slotId] = { ...newEquip[slotId], name: item.name, rarity: item.rarity, description: item.description, specs: item.specs, image: item.image };
              saveEquipment(newEquip);
            }
          } else {
            const idx = assets.findIndex(a => a.name === form._origName || a.name === form.name);
            if (idx >= 0) {
              const newAssets = [...assets];
              newAssets[idx] = item;
              saveAssets(newAssets);
            }
          }
          setItemEditModal(null);
        };
        const handleDelete = () => {
          if (form._equipped && form._slot) {
            const slotId = EQUIP_SLOTS.find(s => s.label === form._slot)?.id;
            if (slotId) {
              const newEquip = { ...equipment };
              delete newEquip[slotId];
              saveEquipment(newEquip);
            }
          } else {
            const newAssets = assets.filter(a => a.name !== form.name && a.name !== form._origName);
            saveAssets(newAssets);
          }
          setItemEditModal(null);
        };
        const inputStyle = {
          width: "100%", padding: "8px 10px", fontSize: "16px", borderRadius: "6px",
          background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)",
          color: "#e8d5b5", fontFamily: "'Crimson Text', serif", outline: "none",
        };
        const labelStyle = {
          fontSize: "8px", color: "#6b6055", fontFamily: "'Cinzel', serif",
          letterSpacing: "1px", textTransform: "uppercase", marginBottom: "3px", display: "block",
        };
        return (
          <div onClick={() => setItemEditModal(null)} style={{
            position: "fixed", inset: 0, zIndex: 2000,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
            animation: "fadeIn 0.2s ease",
          }}>
            <div onClick={(e) => e.stopPropagation()} style={{
              background: "linear-gradient(145deg, #1a150e, #0d0a07)",
              border: "1px solid rgba(245,158,11,0.15)",
              borderRadius: "12px", padding: "20px", maxWidth: "92vw", width: "100%",
              maxHeight: "85vh", overflowY: "auto",
            }}>
              <div style={{ fontSize: "14px", color: "#f5c842", fontFamily: "'Cinzel Decorative', serif", marginBottom: "16px", textAlign: "center" }}>
                {form.isNew ? "New Item" : "Edit Item"}
              </div>

              {/* Image */}
              <div style={{ marginBottom: "12px", textAlign: "center" }}>
                {form.image ? (
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <img src={form.image} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px", border: "1px solid rgba(245,158,11,0.15)" }} />
                    <button onClick={() => updateField("image", null)} style={{
                      position: "absolute", top: "4px", right: "4px", width: "20px", height: "20px",
                      borderRadius: "50%", background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "#8a7a65", fontSize: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>✕</button>
                  </div>
                ) : (
                  <label style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                    padding: "16px", borderRadius: "8px", cursor: "pointer",
                    border: "1px dashed rgba(245,158,11,0.15)", background: "rgba(0,0,0,0.2)",
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5a4f40" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    <span style={{ fontSize: "8px", color: "#5a4f40", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>ADD IMAGE</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                  </label>
                )}
              </div>

              {/* Name */}
              <div style={{ marginBottom: "10px" }}>
                <label style={labelStyle}>Item Name</label>
                <input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Item name..." style={inputStyle} />
              </div>

              {/* Category */}
              <div style={{ marginBottom: "10px" }}>
                <label style={labelStyle}>Category</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {[
                    { val: "clothing", label: "Clothing" },
                    { val: "tech", label: "Tech" },
                    { val: "creative_gear", label: "Gear" },
                    { val: "transport", label: "Transport" },
                    { val: "misc", label: "Misc" },
                    { val: "digital", label: "Digital" },
                    { val: "business", label: "Business" },
                  ].map(c => (
                    <button key={c.val} onClick={() => { updateField("category", c.val); if (form.category !== c.val) updateField("subcategory", ""); }} style={{
                      padding: "6px 10px", fontSize: "10px", borderRadius: "6px",
                      fontFamily: "'Cinzel', serif", cursor: "pointer",
                      background: form.category === c.val ? "rgba(245,158,11,0.15)" : "rgba(0,0,0,0.3)",
                      border: `1px solid ${form.category === c.val ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.06)"}`,
                      color: form.category === c.val ? "#f5c842" : "#5a4f40",
                    }}>{c.label}</button>
                  ))}
                </div>
              </div>
              {/* Subcategory - appears after category selected */}
              {form.category && (() => {
                const subcats = {
                  clothing: ["hat", "sunnies", "necklace", "chain", "jacket", "shirt", "hoodie", "pants", "shorts", "shoes", "boots"],
                  tech: ["laptop", "desktop", "tablet"],
                  creative_gear: ["camera", "action_cam", "lens", "mic", "headphones", "speaker", "bag", "backpack", "case"],
                  transport: ["suv", "sedan", "motorcycle", "bicycle"],
                  misc: ["accessory", "tool", "other"],
                };
                const opts = subcats[form.category];
                if (!opts) return null;
                return (
                  <div style={{ marginBottom: "10px" }}>
                    <label style={labelStyle}>Type</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                      {opts.map(s => {
                        const IconFn = SUBCAT_ICONS[s];
                        const active = form.subcategory === s;
                        return (
                          <button key={s} onClick={() => updateField("subcategory", s)} style={{
                            padding: "5px 8px", fontSize: "9px", borderRadius: "6px",
                            fontFamily: "'Cinzel', serif", cursor: "pointer",
                            display: "flex", alignItems: "center", gap: "4px",
                            background: active ? "rgba(245,158,11,0.15)" : "rgba(0,0,0,0.3)",
                            border: `1px solid ${active ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.06)"}`,
                            color: active ? "#f5c842" : "#5a4f40",
                          }}>
                            {IconFn && IconFn(12, active ? "#f5c842" : "#5a4f40")}
                            {s.charAt(0).toUpperCase() + s.slice(1).replace("_", " ")}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Rarity */}
              <div style={{ marginBottom: "10px" }}>
                <label style={labelStyle}>Rarity</label>
                <div style={{ display: "flex", gap: "6px" }}>
                  {["common", "rare", "epic", "legendary"].map(r => (
                    <button key={r} onClick={() => updateField("rarity", r)} style={{
                      flex: 1, padding: "6px 2px", fontSize: "8px", borderRadius: "4px",
                      fontFamily: "'Cinzel', serif", letterSpacing: "0.5px", cursor: "pointer",
                      background: form.rarity === r ? RARITY_COLORS[r].bg + "20" : "rgba(0,0,0,0.3)",
                      border: `1px solid ${form.rarity === r ? RARITY_COLORS[r].bg + "60" : "rgba(255,255,255,0.06)"}`,
                      color: form.rarity === r ? RARITY_COLORS[r].bg : "#5a4f40",
                      textTransform: "uppercase",
                    }}>{r}</button>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div style={{ marginBottom: "10px" }}>
                <label style={labelStyle}>Specs</label>
                <input value={form.specs || ""} onChange={(e) => updateField("specs", e.target.value)} placeholder="e.g. 64GB RAM, 2TB SSD" style={inputStyle} />
              </div>

              {/* Description */}
              <div style={{ marginBottom: "14px" }}>
                <label style={labelStyle}>Description</label>
                <textarea value={form.description || ""} onChange={(e) => updateField("description", e.target.value)} placeholder="Brief description..." rows={2} style={{ ...inputStyle, resize: "none" }} />
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "8px" }}>
                {!form.isNew && (
                  <button onClick={handleDelete} style={{
                    padding: "8px", fontSize: "9px", borderRadius: "6px", cursor: "pointer",
                    fontFamily: "'Cinzel', serif", letterSpacing: "1px",
                    background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444",
                  }}>DELETE</button>
                )}
                <button onClick={() => setItemEditModal(null)} style={{
                  flex: 1, padding: "8px", fontSize: "9px", borderRadius: "6px", cursor: "pointer",
                  fontFamily: "'Cinzel', serif", letterSpacing: "1.5px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#8a7a65",
                }}>CANCEL</button>
                <button onClick={handleSave} style={{
                  flex: 1, padding: "8px", fontSize: "9px", borderRadius: "6px", cursor: "pointer",
                  fontFamily: "'Cinzel', serif", letterSpacing: "1.5px",
                  background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#f5c842",
                }}>SAVE</button>
              </div>
            </div>
          </div>
        );
      })()}

            {/* ═══ DRAG GHOST ═══ */}
      {isDragging && dragItem && (
        <div ref={dragGhostRef} style={{
          position: "fixed",
          left: dragPosRef.current.x - 28,
          top: dragPosRef.current.y - 28,
          width: "56px", height: "56px",
          zIndex: 4000,
          pointerEvents: "none",
          borderRadius: "8px",
          background: "rgba(0,0,0,0.8)",
          border: `2px solid ${RARITY_COLORS[dragItem.item.rarity]?.bg || "#f59e0b"}60`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 12px ${RARITY_COLORS[dragItem.item.rarity]?.bg || "#f59e0b"}30`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          transform: "scale(1.1)",
          transition: "transform 0.1s",
        }}>
          {dragItem.item.image ? (
            <img src={dragItem.item.image} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }} />
          ) : (
            <>
              {(() => {
                const subIcon = dragItem.item.subcategory && SUBCAT_ICONS[dragItem.item.subcategory];
                const catIcon = dragItem.item.category && ASSET_CAT_ICONS[dragItem.item.category];
                const rc = RARITY_COLORS[dragItem.item.rarity];
                return subIcon ? subIcon(22, rc?.bg || "#f59e0b") : catIcon ? catIcon(22, rc?.bg || "#f59e0b") : <GemIcon size={22} color={rc?.bg || "#f59e0b"} />;
              })()}
              <div style={{ fontSize: "6px", color: RARITY_COLORS[dragItem.item.rarity]?.bg || "#f59e0b", fontFamily: "'Cinzel', serif", textAlign: "center", marginTop: "2px", maxWidth: "50px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {dragItem.item.name.split(" ").slice(0, 2).join(" ")}
              </div>
            </>
          )}
        </div>
      )}

            {/* ═══ STAT DRILL-DOWN POPUP ═══ */}
      {statsExpanded && STAT_FROM_SKILLS[statsExpanded] && (() => {
        const statKey = statsExpanded;
        const src = STAT_FROM_SKILLS[statKey];
        const cats = [src.primary, ...(src.secondary ? [src.secondary] : [])];
        const statVal = deriveStats(skills)[statKey];
        return (
          <div onClick={(e) => { if (e.target === e.currentTarget) { setStatsExpanded(null); setStatCatOpen(null); setStatSkillOpen(null); } }} style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
          }}>
            <div style={{
              background: "linear-gradient(180deg, #1a150e, #0d0a07)",
              border: "1px solid rgba(245,158,11,0.2)", borderRadius: "16px",
              padding: "20px", maxWidth: "92vw", width: "100%", maxHeight: "80vh", overflowY: "auto",
            }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "14px" }}>{STAT_ICONS[statKey]}</span>
                    <span style={{ fontSize: "18px", color: "#f5c842", fontFamily: "'Cinzel Decorative', serif", fontWeight: 700 }}>{statKey}</span>
                  </div>
                  <div style={{ fontSize: "10px", color: "#6b5d4a", fontFamily: "'Fira Code', monospace", marginTop: "2px" }}>
                    {cats.map((c, i) => SKILL_CATEGORIES_DATA[c]?.label).join(" + ")}
                  </div>
                </div>
                <div style={{ fontSize: "28px", color: "#f5c842", fontFamily: "'Fira Code', monospace", fontWeight: 700 }}>{statVal}</div>
              </div>

              {/* Stat bar */}
              <div style={{ marginBottom: "16px" }}>
                <StatBar label="" value={statVal} showValue={false} />
              </div>

              {/* Source categories with skill drawers */}
              {cats.map(catKey => {
                const catData = SKILL_CATEGORIES_DATA[catKey];
                if (!catData) return null;
                const catSkills = skills.filter(s => s.category === catKey);
                const activeSkills = catSkills.filter(s => s.tier === "current");
                const avgLevel = activeSkills.length > 0 ? Math.round(activeSkills.reduce((s, sk) => s + sk.level, 0) / activeSkills.length) : 0;
                const weight = src.secondary ? (catKey === src.primary ? "70%" : "30%") : "100%";
                const isOpen = statCatOpen === catKey;
                return (
                  <div key={catKey} style={{ marginBottom: "6px" }}>
                    <div onClick={(e) => { e.stopPropagation(); setStatCatOpen(isOpen ? null : catKey); setStatSkillOpen(null); }} style={{
                      display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px",
                      borderRadius: "8px", cursor: "pointer",
                      background: isOpen ? `${catData.color}12` : "rgba(0,0,0,0.3)",
                      border: `1px solid ${isOpen ? catData.color + "35" : "rgba(255,255,255,0.05)"}`,
                      transition: "all 0.2s",
                    }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: catData.color, flexShrink: 0, boxShadow: `0 0 8px ${catData.color}50` }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ fontSize: "13px", color: catData.color, fontFamily: "'Cinzel', serif", fontWeight: 600 }}>{catData.label}</div>
                          <div style={{ fontSize: "14px", color: catData.color, fontFamily: "'Fira Code', monospace", fontWeight: 600 }}>{avgLevel}</div>
                        </div>
                        <div style={{ height: "4px", background: "rgba(0,0,0,0.5)", borderRadius: "2px", overflow: "hidden", marginTop: "4px", border: `1px solid ${catData.color}15` }}>
                          <div style={{ height: "100%", width: `${avgLevel}%`, borderRadius: "2px", background: `linear-gradient(90deg, ${catData.color}66, ${catData.color})`, boxShadow: `0 0 6px ${catData.color}30`, transition: "width 0.8s ease" }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
                          <div style={{ fontSize: "8px", color: "#6b5d4a", fontFamily: "'Fira Code', monospace" }}>{catData.desc} · {weight}</div>
                          <div style={{ fontSize: "8px", color: "#5a4f40" }}>{activeSkills.length}/{catSkills.length} skills</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ maxHeight: isOpen ? "800px" : "0", overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)" }}>
                      <div style={{ padding: "6px 0 4px 20px" }}>
                        {catSkills.map(sk => {
                          const tierColor = sk.tier === "current" ? catData.color : sk.tier === "advanced" ? "#5a4f40" : "#2a2520";
                          const locked = sk.tier !== "current";
                          const skillOpen = statSkillOpen === sk.name;
                          const today = new Date().toDateString();
                          const todayLog = challengeLog[today] || {};
                          const relatedChallenges = challenges.filter(c => c.skill === sk.name || c.category === catKey);
                          const skillChallenges = challenges.filter(c => c.skill === sk.name);
                          const uncompletedChallenges = skillChallenges.filter(c => !todayLog[c.id]);
                          return (
                            <div key={sk.name}>
                              <div onClick={() => !locked && setStatSkillOpen(skillOpen ? null : sk.name)} style={{
                                display: "flex", flexDirection: "column", gap: "2px", padding: "5px 10px",
                                marginBottom: "3px", borderRadius: "6px",
                                background: skillOpen ? `${catData.color}15` : locked ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.3)",
                                border: skillOpen ? `1px solid ${catData.color}25` : "1px solid transparent",
                                opacity: locked ? 0.45 : 1,
                                cursor: locked ? "default" : "pointer",
                                transition: "all 0.2s",
                              }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tierColor} strokeWidth="1.5">
                                    {SKILL_ICONS[sk.name] || <circle cx="12" cy="12" r="6"/>}
                                  </svg>
                                  <div style={{ flex: 1, fontSize: "10px", color: tierColor, fontFamily: "'Cinzel', serif" }}>{sk.name}</div>
                                  {!locked && <div style={{ fontSize: "10px", color: catData.color, fontFamily: "'Fira Code', monospace", fontWeight: 600 }}>{sk.level}</div>}
                                  {locked && <div style={{ fontSize: "7px", color: "#3d352a", fontFamily: "'Cinzel', serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>{sk.tier === "advanced" ? "ADV" : "???"}</div>}
                                </div>
                                {!locked && (
                                  <div style={{ height: "3px", background: "rgba(0,0,0,0.4)", borderRadius: "1.5px", overflow: "hidden", marginLeft: "22px" }}>
                                    <div style={{ height: "100%", width: `${sk.level}%`, borderRadius: "1.5px", background: `linear-gradient(90deg, ${catData.color}55, ${catData.color})`, transition: "width 0.6s ease" }} />
                                  </div>
                                )}
                              </div>
                              {/* Skill detail expansion */}
                              {skillOpen && !locked && (
                                <div style={{ padding: "6px 10px 10px 32px", marginBottom: "4px" }}>
                                  {/* Description */}
                                  <div style={{ fontSize: "9px", color: "#8a7a65", fontFamily: "'Crimson Text', serif", fontStyle: "italic", marginBottom: "8px", lineHeight: 1.4 }}>
                                    {SKILL_DESCRIPTIONS[sk.name] || `Level ${sk.level}/100`}
                                  </div>
                                  {/* Related challenges */}
                                  {uncompletedChallenges.length > 0 ? (
                                    <div>
                                      <div style={{ fontSize: "8px", color: "#6b5d4a", fontFamily: "'Cinzel', serif", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                                        Challenges to level up
                                      </div>
                                      {uncompletedChallenges.map(ch => (
                                        <div key={ch.id} style={{
                                          display: "flex", alignItems: "center", gap: "6px", padding: "4px 8px",
                                          marginBottom: "2px", borderRadius: "4px",
                                          background: "rgba(0,0,0,0.25)",
                                        }}>
                                          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: catData.color, flexShrink: 0 }} />
                                          <div style={{ flex: 1, fontSize: "9px", color: "#c4a882", fontFamily: "'Cinzel', serif" }}>{ch.name}</div>
                                          <div style={{ fontSize: "8px", color: "#f59e0b", fontFamily: "'Fira Code', monospace" }}>+{ch.xp}xp</div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : skillChallenges.length > 0 ? (
                                    <div style={{ fontSize: "9px", color: "#10b981", fontFamily: "'Fira Code', monospace" }}>
                                      ✓ All challenges completed today
                                    </div>
                                  ) : (
                                    <div style={{ fontSize: "9px", color: "#5a4f40", fontFamily: "'Fira Code', monospace" }}>
                                      No challenges linked yet
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Close */}
              <button onClick={() => { setStatsExpanded(null); setStatCatOpen(null); setStatSkillOpen(null); }} style={{
                width: "100%", marginTop: "12px", padding: "10px", borderRadius: "8px",
                background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)",
                color: "#8a7a65", fontFamily: "'Cinzel', serif", fontSize: "12px", cursor: "pointer",
              }}>Close</button>
            </div>
          </div>
        );
      })()}


      {/* ═══ ACCOUNTABILITY NUDGE ═══ */}
      {activeNudge && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1100,
          display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", overscrollBehavior: "contain",
        }} onClick={(e) => e.target === e.currentTarget && setActiveNudge(null)}>
          <div style={{
            background: "linear-gradient(180deg, #1a150e, #0d0a07)",
            border: "1px solid rgba(147,220,255,0.2)", borderRadius: "16px",
            padding: "24px", maxWidth: "340px", width: "100%", textAlign: "center",
          }}>
            {/* Fairy icon */}
            <div style={{ marginBottom: "12px" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 0 8px rgba(147,220,255,0.6))" }}>
                <circle cx="12" cy="12" r="2" fill="rgba(180,230,255,0.9)"/>
                <path d="M10 12 Q5 8 7 4 Q9 8 10 12" fill="rgba(147,220,255,0.15)" stroke="rgba(147,220,255,0.5)" strokeWidth="0.7"/>
                <path d="M14 12 Q19 8 17 4 Q15 8 14 12" fill="rgba(147,220,255,0.15)" stroke="rgba(147,220,255,0.5)" strokeWidth="0.7"/>
                <path d="M10 12 Q5 16 7 20 Q9 16 10 12" fill="rgba(147,220,255,0.08)" stroke="rgba(147,220,255,0.3)" strokeWidth="0.5"/>
                <path d="M14 12 Q19 16 17 20 Q15 16 14 12" fill="rgba(147,220,255,0.08)" stroke="rgba(147,220,255,0.3)" strokeWidth="0.5"/>
              </svg>
            </div>

            <div style={{ fontSize: "10px", color: "rgba(147,220,255,0.7)", fontFamily: "'Cinzel', serif", letterSpacing: "2px", marginBottom: "6px" }}>
              NAVI REMINDER
            </div>

            <div style={{ fontSize: "15px", color: "#e8d5b5", fontFamily: "'Crimson Text', serif", lineHeight: 1.5, marginBottom: "8px" }}>
              {activeNudge.text}
            </div>

            {activeNudge.snoozeCount > 0 && (
              <div style={{ fontSize: "9px", color: "#5a4f40", fontFamily: "'Fira Code', monospace", marginBottom: "12px" }}>
                Reminded {activeNudge.snoozeCount} time{activeNudge.snoozeCount > 1 ? "s" : ""} already
              </div>
            )}

            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              {/* Done */}
              <button onClick={() => {
                const updated = reminders.map(r => r.id === activeNudge.id ? { ...r, done: true, completedAt: Date.now() } : r);
                setReminders(updated);
                saveData("rpg-reminders", updated);
                setActiveNudge(null);
                if (navigator.vibrate) navigator.vibrate(15);
              }} style={{
                flex: 1, padding: "10px", borderRadius: "8px", cursor: "pointer",
                background: "rgba(74,122,58,0.15)", border: "1px solid rgba(74,122,58,0.3)",
                color: "#4ade80", fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.5px",
              }}>✓ DONE</button>

              {/* Snooze 1hr */}
              <button onClick={() => {
                const snoozedUntil = Date.now() + 60 * 60 * 1000;
                const updated = reminders.map(r => r.id === activeNudge.id ? { ...r, snoozedUntil, snoozeCount: (r.snoozeCount || 0) + 1 } : r);
                setReminders(updated);
                saveData("rpg-reminders", updated);
                setActiveNudge(null);
              }} style={{
                flex: 1, padding: "10px", borderRadius: "8px", cursor: "pointer",
                background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)",
                color: "#f59e0b", fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.5px",
              }}>1HR</button>

              {/* Snooze 3hr */}
              <button onClick={() => {
                const snoozedUntil = Date.now() + 3 * 60 * 60 * 1000;
                const updated = reminders.map(r => r.id === activeNudge.id ? { ...r, snoozedUntil, snoozeCount: (r.snoozeCount || 0) + 1 } : r);
                setReminders(updated);
                saveData("rpg-reminders", updated);
                setActiveNudge(null);
              }} style={{
                flex: 1, padding: "10px", borderRadius: "8px", cursor: "pointer",
                background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)",
                color: "#8a7a65", fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.5px",
              }}>3HR</button>

              {/* Dismiss */}
              <button onClick={() => {
                const updated = reminders.filter(r => r.id !== activeNudge.id);
                setReminders(updated);
                saveData("rpg-reminders", updated);
                setActiveNudge(null);
              }} style={{
                padding: "10px", borderRadius: "8px", cursor: "pointer",
                background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)",
                color: "#5a4f40", fontFamily: "'Cinzel', serif", fontSize: "11px",
              }}>✕</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ QUEST COMPLETE OVERLAY ═══ */}
      {questCompleteOverlay && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 2000,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.85)",
          animation: splashFading ? "splashFadeOut 0.5s ease forwards" : "fadeIn 0.3s ease",
        }} onClick={() => { setSplashFading(false); setQuestCompleteOverlay(null); }}>
          <div style={{
            textAlign: "center", padding: "40px 30px",
            animation: "questCompleteIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            <SplashParticles color="#f5c842" count={12} spread={45} />
            {/* Glow ring */}
            <div style={{
              width: "80px", height: "80px", margin: "0 auto 20px",
              borderRadius: "50%",
              border: "2px solid rgba(245,158,11,0.6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 40px rgba(245,158,11,0.3), 0 0 80px rgba(245,158,11,0.15), inset 0 0 30px rgba(245,158,11,0.1)",
              animation: "glowPulse 2s ease infinite",
            }}>
              <CheckCircleIcon size={36} color="#f59e0b" />
            </div>
            <div style={{
              fontSize: "10px", color: "#8a7a65", fontFamily: "'Cinzel', serif",
              letterSpacing: "4px", textTransform: "uppercase", marginBottom: "8px",
            }}>QUEST COMPLETED</div>
            <div style={{
              fontSize: "20px", color: "#f5c842", fontFamily: "'Cinzel Decorative', serif",
              letterSpacing: "2px", marginBottom: "16px",
              textShadow: "0 0 30px rgba(245,158,11,0.4)",
            }}>{questCompleteOverlay.quest?.name}</div>
            <div style={{
              display: "inline-block", padding: "8px 24px",
              background: "linear-gradient(145deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))",
              border: "1px solid rgba(245,158,11,0.3)", borderRadius: "20px",
            }}>
              <span style={{
                fontSize: "16px", color: "#f59e0b", fontFamily: "'Cinzel', serif",
                fontWeight: 700, letterSpacing: "1px",
              }}>+{questCompleteOverlay.totalXP} XP</span>
            </div>
            <div style={{
              marginTop: "10px", fontSize: "10px", color: "#5a4f40",
              fontFamily: "'Fira Code', monospace",
            }}>
              ({questCompleteOverlay.xp} bonus)
            </div>
            <div style={{
              marginTop: "24px", fontSize: "9px", color: "#3d352a",
              fontFamily: "'Cinzel', serif", letterSpacing: "2px",
            }}>TAP TO DISMISS</div>
          </div>
        </div>
      )}

      {/* ═══ LEVEL UP OVERLAY ═══ */}
      {levelUpOverlay && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 3000,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.92)",
          animation: splashFading ? "splashFadeOut 0.5s ease forwards" : "fadeIn 0.3s ease",
        }} onClick={(e) => e.stopPropagation()}>
          {/* Particle burst */}
          {/* Particle burst */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i / 24) * 360;
              const dist = 120 + Math.random() * 80;
              const size = 2 + Math.random() * 3;
              const delay = Math.random() * 0.3;
              return (
                <div key={i} style={{
                  position: "absolute", left: "50%", top: "50%",
                  width: `${size}px`, height: `${size}px`, borderRadius: "50%",
                  background: `rgba(245,${140 + Math.random() * 60},11,${0.6 + Math.random() * 0.4})`,
                  boxShadow: `0 0 ${size * 3}px rgba(245,158,11,0.5)`,
                  animation: `levelBurst 1.5s ease-out ${delay}s both`,
                  transform: `translate(-50%, -50%)`,
                  "--burst-x": `${Math.cos(angle * Math.PI / 180) * dist}px`,
                  "--burst-y": `${Math.sin(angle * Math.PI / 180) * dist}px`,
                }} />
              );
            })}
          </div>
          <div style={{
            textAlign: "center", position: "relative", zIndex: 1,
            animation: "levelUpIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            {/* Crown */}
            <div style={{
              marginBottom: "12px",
              animation: "levelFloat 2s ease-in-out infinite",
              filter: "drop-shadow(0 0 20px rgba(245,158,11,0.6))",
            }}>
              <CrownIcon size={48} color="#f5c842" />
            </div>
            <div style={{
              fontSize: "10px", color: "#c4a882", fontFamily: "'Cinzel', serif",
              letterSpacing: "6px", textTransform: "uppercase", marginBottom: "6px",
            }}>LEVEL UP</div>
            <div style={{
              fontSize: "64px", color: "#f5c842", fontFamily: "'Cinzel Decorative', serif",
              fontWeight: 700, lineHeight: 1,
              textShadow: "0 0 40px rgba(245,158,11,0.5), 0 0 80px rgba(245,158,11,0.25), 0 4px 8px rgba(0,0,0,0.5)",
              marginBottom: "8px",
            }}>{levelUpOverlay.level}</div>
            <div style={{
              fontSize: "12px", color: "#8a7a65", fontFamily: "'Crimson Text', serif",
              fontStyle: "italic",
            }}>Your power grows stronger</div>
            <div style={{
              marginTop: "20px",
              width: "200px", height: "1px", margin: "20px auto 0",
              background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)",
            }} />
            <div style={{
              marginTop: "16px", fontSize: "9px", color: "#3d352a",
              fontFamily: "'Cinzel', serif", letterSpacing: "2px",
            }}>TAP TO CONTINUE</div>
          </div>
        </div>
      )}

      {/* Daily Card Overlay */}
      {showCardOverlay && dailyCard && (
        <div onClick={() => { if (!dailyFlipped) { revealDailyCard(); } }} style={{ position: "fixed", inset: 0, zIndex: 2500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
          <div onClick={(e) => { e.stopPropagation(); setShowCardOverlay(false); setCardCopied(false); }} style={{ position: "absolute", top: "16px", right: "16px", cursor: "pointer", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CrossIcon size={14} color="#8a7a65" />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <div style={{ animation: "cardFloat 3s ease-in-out infinite" }}>
            <LifeCard card={dailyCard} isFlipped={dailyFlipped} onFlip={!dailyFlipped ? () => revealDailyCard() : undefined} />
          </div>
            </div>
          {dailyFlipped && (
            <div onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(dailyCard.quote).then(() => { setCardCopied(true); setTimeout(() => setCardCopied(false), 2000); }); }} style={{ marginTop: "20px", padding: "8px 20px", borderRadius: "8px", background: cardCopied ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)", border: "1px solid " + (cardCopied ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)"), cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              {cardCopied ? <CheckIcon size={12} color="#10b981" /> : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8a7a65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>}
              <span style={{ fontSize: '11px', color: cardCopied ? '#10b981' : '#8a7a65', fontFamily: "'Cinzel', serif", letterSpacing: '1px' }}>{cardCopied ? 'COPIED' : 'COPY QUOTE'}</span>
            </div>
          )}
        </div>
      )}

      {/* Skill Detail Modal */}
      {skillDetail && (() => {
        const sd = skillDetail;
        const catData = SKILL_CATEGORIES_DATA[sd.category];
        const isCat = sd.isCategory;
        const desc = isCat ? catData.fullDesc : SKILL_DESCRIPTIONS[sd.name];
        const tierLabel = sd.tier === "current" ? "UNLOCKED" : sd.tier === "advanced" ? "LOCKED" : sd.tier === "hub" ? "SKILL BRANCH" : "UNDISCOVERED";
        const tierColor = sd.tier === "current" ? "#10b981" : sd.tier === "advanced" ? "#f59e0b" : sd.tier === "hub" ? sd.color : "#6b7280";
        const catSkills = isCat ? sd.catSkills : null;
        const unlocked = catSkills ? catSkills.filter(s => s.tier === "current") : [];
        const locked = catSkills ? catSkills.filter(s => s.tier !== "current") : [];
        const avgLevel = unlocked.length ? Math.round(unlocked.reduce((a, s) => a + (s.level || 0), 0) / unlocked.length) : 0;
        return (
          <div onClick={() => setSkillDetail(null)} style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
          }}>
            <div onClick={(e) => e.stopPropagation()} style={{
              background: "linear-gradient(145deg, #1a150e, #0d0a07)",
              border: `1px solid ${sd.color}30`,
              borderRadius: "16px", padding: "28px 24px", maxWidth: "360px", width: "100%",
              boxShadow: `0 0 40px ${sd.color}15, 0 20px 60px rgba(0,0,0,0.5)`,
              maxHeight: "80vh", overflowY: "auto",
            }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                <div style={{
                  width: isCat ? "58px" : "52px", height: isCat ? "58px" : "52px",
                  borderRadius: isCat ? "14px" : "12px",
                  background: isCat ? `${sd.color}50` : `radial-gradient(circle at 40% 35%, ${sd.color}15, rgba(5,4,3,0.95))`,
                  border: `2px solid ${sd.tier === "undiscovered" ? "rgba(255,255,255,0.06)" : sd.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 ${isCat ? 24 : 16}px ${sd.color}${isCat ? "35" : "20"}`,
                  filter: sd.tier === "undiscovered" ? "blur(2px)" : "none",
                  opacity: sd.tier === "undiscovered" ? 0.4 : sd.tier === "advanced" ? 0.6 : 1,
                }}>
                  {isCat ? (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={sd.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {sd.category === "mind" && <><circle cx="12" cy="12" r="9"/><path d="M12 3c0 4-3 6-3 9s3 5 3 5 3-2 3-5-3-5-3-9z"/></>}
                      {sd.category === "wealth" && <><polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9"/></>}
                      {sd.category === "body" && <><path d="M6.5 6.5c0-2 1.5-3.5 3.5-3.5h4c2 0 3.5 1.5 3.5 3.5"/><path d="M4 11h16"/><path d="M8 11v8l4-3 4 3v-8"/></>}
                      {sd.category === "charisma" && <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>}
                      {sd.category === "leadership" && <><path d="M2 20h20"/><path d="M5 20V8l7-5 7 5v12"/><path d="M10 20v-5h4v5"/></>}
                      {sd.category === "creator" && <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>}
                      {sd.category === "spirit" && <><path d="M12 21c-4 0-7-3-7-7 0-3 2-5 4-7 1-1 2-2 3-4 1 2 2 3 3 4 2 2 4 4 4 7 0 4-3 7-7 7z"/><path d="M12 21v-8"/></>}
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={sd.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={sd.tier === "undiscovered" ? 0.3 : 0.9}>
                      {sd.tier === "undiscovered" ? (
                        <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>
                      ) : (
                        SKILL_ICONS[sd.name] || <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/>
                      )}
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: isCat ? "18px" : "16px", fontWeight: 600, color: isCat ? sd.color : "#e8d5b5",
                    fontFamily: "'Cinzel', serif", lineHeight: 1.2,
                    filter: sd.tier === "undiscovered" ? "blur(4px)" : "none",
                  }}>
                    {sd.tier === "undiscovered" ? "???" : sd.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                    {isCat ? (
                      <span style={{ fontSize: "9px", letterSpacing: "1.2px", color: "#8a7a65", fontFamily: "'Cinzel', serif", textTransform: "uppercase" }}>{catData.desc}</span>
                    ) : (
                      <>
                        <span style={{ fontSize: "9px", letterSpacing: "1.2px", color: catData.color, fontFamily: "'Cinzel', serif", textTransform: "uppercase" }}>{catData.label}</span>
                        <span style={{ fontSize: "8px", letterSpacing: "1px", color: tierColor, fontFamily: "'Fira Code', monospace", padding: "1px 6px", border: `1px solid ${tierColor}40`, borderRadius: "4px" }}>{tierLabel}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Category stats */}
              {isCat && (
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                  {[
                    { label: "Skills", value: catSkills.length },
                    { label: "Unlocked", value: unlocked.length },
                    { label: "Avg Level", value: avgLevel },
                  ].map((s, i) => (
                    <div key={i} style={{
                      flex: 1, textAlign: "center", padding: "8px 4px", borderRadius: "8px",
                      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
                    }}>
                      <div style={{ fontSize: "15px", color: sd.color, fontFamily: "'Fira Code', monospace", fontWeight: 600 }}>{s.value}</div>
                      <div style={{ fontSize: "8px", color: "#6b6055", fontFamily: "'Cinzel', serif", letterSpacing: "0.8px", textTransform: "uppercase", marginTop: "2px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Level bar (skill only) */}
              {!isCat && sd.tier === "current" && (() => {
                const skillXp = sd.skillXp || 0;
                const xpNeeded = (sd.level || 0) * 10 + 10;
                const pct = Math.min(100, (skillXp / xpNeeded) * 100);
                return (
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "9px", color: "#8a7a65", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>LEVEL</span>
                    <span style={{ fontSize: "11px", color: sd.color, fontFamily: "'Fira Code', monospace", fontWeight: 600 }}>{sd.level}</span>
                  </div>
                  <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.06)" }}>
                    <div style={{
                      height: "100%", borderRadius: "3px", width: `${sd.level}%`,
                      background: `linear-gradient(90deg, ${sd.color}60, ${sd.color})`,
                      boxShadow: `0 0 8px ${sd.color}40`,
                    }} />
                  </div>
                  {/* Skill XP to next level */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", marginBottom: "3px" }}>
                    <span style={{ fontSize: "8px", color: "#6b6055", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>NEXT LEVEL</span>
                    <span style={{ fontSize: "9px", color: "#8a7a65", fontFamily: "'Fira Code', monospace" }}>{skillXp} / {xpNeeded} XP</span>
                  </div>
                  <div style={{ height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.04)" }}>
                    <div style={{
                      height: "100%", borderRadius: "2px", width: `${pct}%`,
                      background: `linear-gradient(90deg, ${sd.color}40, ${sd.color}90)`,
                      transition: "width 0.5s ease",
                    }} />
                  </div>
                </div>
                );
              })()}

              {/* Description */}
              <div style={{
                fontSize: "13px", lineHeight: 1.65, color: sd.tier === "undiscovered" ? "#3a352e" : "#b8a68e",
                fontFamily: "'Crimson Text', serif", fontStyle: "italic",
                padding: "12px 14px", borderRadius: "8px",
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
                filter: sd.tier === "undiscovered" ? "blur(3px)" : "none",
              }}>
                {desc || (sd.tier === "undiscovered" ? "This skill has not yet been revealed." : "A powerful ability waiting to be mastered.")}
              </div>

              {/* Category skill list */}
              {isCat && unlocked.length > 0 && (
                <div style={{ marginTop: "14px" }}>
                  <div style={{ fontSize: "9px", color: "#6b6055", fontFamily: "'Cinzel', serif", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Unlocked Skills</div>
                  {unlocked.map((s, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "8px", padding: "6px 0",
                      borderBottom: i < unlocked.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sd.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                        {SKILL_ICONS[s.name] || <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/>}
                      </svg>
                      <span style={{ flex: 1, fontSize: "12px", color: "#c4b69a", fontFamily: "'Crimson Text', serif" }}>{s.name}</span>
                      <span style={{ fontSize: "10px", color: `${sd.color}90`, fontFamily: "'Fira Code', monospace" }}>{s.level}</span>
                    </div>
                  ))}
                </div>
              )}
              {isCat && locked.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                  <div onClick={() => setShowLocked(!showLocked)} style={{
                    fontSize: "9px", color: "#4a4540", fontFamily: "'Cinzel', serif",
                    letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
                    padding: "6px 0",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4a4540" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{
                      transform: showLocked ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease", flexShrink: 0,
                    }}>
                      <path d="M9 5l7 7-7 7"/>
                    </svg>
                    Locked · {locked.length}
                  </div>
                  {showLocked && locked.map((s, i) => {
                    const isUndiscovered = s.tier === "undiscovered";
                    return (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: "8px", padding: "5px 0",
                        borderBottom: i < locked.length - 1 ? "1px solid rgba(255,255,255,0.02)" : "none",
                      }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={isUndiscovered ? "rgba(255,255,255,0.08)" : `${sd.color}40`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
                          {isUndiscovered ? (
                            <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>
                          ) : (
                            SKILL_ICONS[s.name] || <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/>
                          )}
                        </svg>
                        <span style={{
                          flex: 1, fontSize: "11px", fontFamily: "'Crimson Text', serif",
                          color: isUndiscovered ? "#2a2520" : "#6b6055",
                          filter: isUndiscovered ? "blur(3px)" : "none",
                        }}>{isUndiscovered ? "???" : s.name}</span>
                        <span style={{
                          fontSize: "7px", letterSpacing: "0.8px",
                          color: isUndiscovered ? "#2a2520" : "#f59e0b80",
                          fontFamily: "'Fira Code', monospace",
                        }}>{isUndiscovered ? "???" : "LOCKED"}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Close */}
              <div style={{ marginTop: "16px" }}>
                <button onClick={() => setSkillDetail(null)} style={{
                  width: "100%", padding: "10px", borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)", color: "#8a7a65",
                  fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "1px",
                  cursor: "pointer", textTransform: "uppercase",
                }}>Close</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Edit Modal */}
      {editModal && (
        <EditModal
          title={editModal.title}
          fields={editModal.fields}
          values={editModal.values}
          onSave={editModal.onSave}
          onCancel={() => setEditModal(null)}
        />
      )}

      {/* Quest Creator / Editor Modal */}
      {showQuestCreator && (
        <QuestCreator
          generateSteps={generateStepsForQuest}
          isGenerating={generatingSteps}
          initialValues={showQuestCreator !== true ? showQuestCreator : undefined}
          onCancel={() => setShowQuestCreator(false)}
          onSave={(d) => {
            if (showQuestCreator !== true && showQuestCreator.id) {
              // Edit mode
              saveQuests(quests.map(q => q.id === showQuestCreator.id ? { ...q, ...d } : q), "Quest edited");
            } else {
              // Create mode
              saveQuests([...quests, { ...d, id: `q${Date.now()}`, status: "active" }], "New quest created");
            }
            setShowQuestCreator(false);
          }}
        />
      )}

      {/* XP Gained Splash */}
      {xpSplash && (
        <div onClick={() => { setSplashFading(false); setXpSplash(null); }} style={{
          position: "fixed", inset: 0, zIndex: 2000,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.85)",
          animation: splashFading ? "splashFadeOut 0.5s ease forwards" : "fadeIn 0.2s ease",
          cursor: "pointer",
        }}>
          <div style={{
            position: "relative",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
            animation: "xpSplashIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            <div style={{
              fontSize: "32px", color: "#f5c842", fontFamily: "'Cinzel Decorative', serif",
              textShadow: "0 0 30px rgba(245,158,11,0.5), 0 0 60px rgba(245,158,11,0.2)",
              letterSpacing: "2px",
            }}>
              +{xpSplash.amount} XP
            </div>
            <div style={{
              fontSize: "11px", color: "#8a7a65", fontFamily: "'Cinzel', serif",
              letterSpacing: "2px", textTransform: "uppercase",
            }}>
              {xpSplash.label}
            </div>
          </div>
        </div>
      )}

      {/* Daily XP Splash - full screen dim + animate to level bar */}
      {dailyXpAwarded && (
        <div onClick={() => { setSplashFading(false); setDailyXpAwarded(false); }} style={{
          position: "fixed", inset: 0, zIndex: 2000,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.85)",
          animation: splashFading ? "splashFadeOut 0.5s ease forwards" : "fadeIn 0.3s ease",
          cursor: "pointer",
        }}>
          <div style={{
            position: "relative",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
            animation: "xpSplashIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            <div style={{
              fontSize: "36px", color: "#f5c842", fontFamily: "'Cinzel Decorative', serif",
              textShadow: "0 0 40px rgba(245,158,11,0.6), 0 0 80px rgba(245,158,11,0.3)",
              letterSpacing: "2px",
            }}>
              +{dailyXpAwarded} XP
            </div>
            <div style={{
              fontSize: "12px", color: "#8a7a65", fontFamily: "'Cinzel', serif",
              letterSpacing: "3px", textTransform: "uppercase",
            }}>
              Life Experience
            </div>
          </div>
        </div>
      )}

      {/* Undo Toast */}
      {undoState && (
        <div style={{
          position: "fixed", bottom: "calc(76px + env(safe-area-inset-bottom, 0px))", left: "50%", transform: "translateX(-50%)",
          zIndex: 200, display: "flex", alignItems: "center", gap: "10px",
          padding: "8px 16px",
          background: "rgba(13, 10, 7, 0.92)",
          backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          borderRadius: "10px",
          border: "1px solid rgba(245, 158, 11, 0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          animation: "fadeSlideUp 0.3s ease",
        }}>
          <span style={{
            fontSize: "11px", color: "#c4a882", fontFamily: "'Crimson Text', serif",
          }}>{undoState.label}</span>
          <button onClick={undoQuests} style={{
            padding: "4px 12px", fontSize: "10px", cursor: "pointer",
            fontFamily: "'Cinzel', serif", letterSpacing: "1px",
            background: "rgba(245,158,11,0.15)",
            border: "1px solid rgba(245,158,11,0.3)", borderRadius: "6px",
            color: "#f5c842", display: "flex", alignItems: "center", gap: "4px",
          }}><UndoIcon size={10} color="#f5c842" /> UNDO</button>
        </div>
      )}


      {/* ═══ AI COMMAND PANEL ═══ */}
      {aiOpen && (
        <div style={{
          position: "fixed", bottom: "calc(76px + env(safe-area-inset-bottom, 0px))", left: "8px", right: "8px",
          zIndex: 200, maxHeight: "55vh",
          background: "linear-gradient(180deg, rgba(20,16,10,0.98), rgba(10,8,5,0.99))",
          border: "1px solid rgba(245,158,11,0.2)",
          borderRadius: "16px",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.6), 0 0 60px rgba(245,158,11,0.05)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            padding: "12px 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: "1px solid rgba(245,158,11,0.1)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5c842" strokeWidth="1.5"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M5 12a7 7 0 0 0 14 0"/><path d="M12 19v3M8 22h8"/></svg>
              <span style={{ fontSize: "12px", color: "#f5c842", fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>AI COMMAND</span>
            </div>
            <div onClick={() => setAiOpen(false)} style={{ cursor: "pointer", padding: "4px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8a7a65" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </div>
          </div>

          {/* Messages */}
          <div ref={aiScrollRef} style={{
            flex: 1, overflowY: "auto", padding: "12px 16px",
            display: "flex", flexDirection: "column", gap: "10px",
            minHeight: "100px", maxHeight: "35vh",
          }}>
            {aiMessages.length === 0 && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "11px", color: "#5a4f40", fontFamily: "'Cinzel', serif", marginBottom: "8px" }}>What can I help with?</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
                  {[
                    "How am I tracking this week?",
                    "What should I focus on today?",
                    "Which skills am I neglecting?",
                    "New quest: ...",
                    "Add item: ...",
                    "Give me a challenge",
                  ].map(s => (
                    <div key={s} onClick={() => { setAiInput(s.endsWith("...") ? s : s); if (!s.endsWith("...")) sendAiMessage(); }}
                      style={{
                        padding: "5px 10px", borderRadius: "12px", fontSize: "9px",
                        background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)",
                        color: "#c4a882", fontFamily: "'Cinzel', serif", cursor: "pointer",
                      }}>{s}</div>
                  ))}
                </div>
              </div>
            )}
            {aiMessages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                padding: "8px 12px", borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                background: msg.role === "user" ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${msg.role === "user" ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.06)"}`,
              }}>
                <div style={{
                  fontSize: "11px", color: msg.role === "user" ? "#e8d5b5" : "#c4a882",
                  fontFamily: "'Crimson Text', serif", lineHeight: 1.5, whiteSpace: "pre-wrap",
                }}>{msg.text}</div>
              </div>
            ))}
            {aiLoading && (
              <div style={{ alignSelf: "flex-start", padding: "8px 12px" }}>
                <div style={{ fontSize: "11px", color: "#5a4f40", fontStyle: "italic" }}>Thinking...</div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{
            padding: "8px 12px 10px", display: "flex", gap: "8px", alignItems: "center",
            borderTop: "1px solid rgba(245,158,11,0.1)",
          }}>
            <input
              ref={aiInputRef}
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendAiMessage(); } }}
              placeholder="Command your world..."
              style={{
                flex: 1, padding: "10px 14px", fontSize: "13px",
                background: "rgba(0,0,0,0.4)", border: "1px solid rgba(245,158,11,0.15)",
                borderRadius: "12px", color: "#e8d5b5", outline: "none",
                fontFamily: "'Crimson Text', serif",
              }}
            />
            {/* Mic button */}
            <div onClick={() => {
              if (isListening) { stopListening(); } 
              else { startListening((text) => { setAiInput(text); }); }
            }} style={{
              width: "38px", height: "38px", borderRadius: "12px",
              background: isListening ? "rgba(239,68,68,0.2)" : "rgba(0,0,0,0.3)",
              border: `1px solid ${isListening ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.06)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
              animation: isListening ? "micPulse 1.5s ease-in-out infinite" : undefined,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isListening ? "#ef4444" : "#5a4f40"} strokeWidth="1.5">
                <rect x="9" y="2" width="6" height="11" rx="3"/>
                <path d="M5 10a7 7 0 0 0 14 0"/>
                <line x1="12" y1="17" x2="12" y2="22"/>
                <line x1="8" y1="22" x2="16" y2="22"/>
              </svg>
            </div>
            {/* Send button */}
            <div onClick={() => { if (isListening) stopListening(); sendAiMessage(); }} style={{
              width: "38px", height: "38px", borderRadius: "12px",
              background: aiInput.trim() ? "rgba(245,158,11,0.2)" : "rgba(0,0,0,0.3)",
              border: `1px solid ${aiInput.trim() ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.06)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={aiInput.trim() ? "#f5c842" : "#5a4f40"} strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Fairy Button */}
      <div onClick={() => { setAiOpen(!aiOpen); if (!aiOpen) setTimeout(() => aiInputRef.current?.focus(), 100); }} style={{
        position: "fixed", bottom: "calc(82px + env(safe-area-inset-bottom, 0px))", right: "16px", zIndex: 150,
        width: "48px", height: "48px", borderRadius: "50%",
        background: aiOpen ? "rgba(147,220,255,0.12)" : "rgba(10,8,6,0.7)",
        border: `1px solid ${aiOpen ? "rgba(147,220,255,0.35)" : "rgba(147,220,255,0.15)"}`,
        boxShadow: aiOpen ? "0 0 25px rgba(147,220,255,0.2), 0 0 50px rgba(147,220,255,0.08)" : "0 4px 20px rgba(0,0,0,0.5), 0 0 20px rgba(147,220,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "all 0.3s",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        animation: aiOpen ? undefined : "fairyBob 3s ease-in-out infinite",
      }}>
        {aiOpen ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(147,220,255,0.8)" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ animation: "fairyGlow 2s ease-in-out infinite" }}>
            <circle cx="12" cy="12" r="2" fill="rgba(180,230,255,0.9)"/>
            <circle cx="12" cy="12" r="4" fill="none" stroke="rgba(147,220,255,0.2)" strokeWidth="0.5"/>
            <path d="M10 12 Q5 8 7 4 Q9 8 10 12" fill="rgba(147,220,255,0.15)" stroke="rgba(147,220,255,0.5)" strokeWidth="0.7"/>
            <path d="M14 12 Q19 8 17 4 Q15 8 14 12" fill="rgba(147,220,255,0.15)" stroke="rgba(147,220,255,0.5)" strokeWidth="0.7"/>
            <path d="M10 12 Q5 16 7 20 Q9 16 10 12" fill="rgba(147,220,255,0.08)" stroke="rgba(147,220,255,0.3)" strokeWidth="0.5"/>
            <path d="M14 12 Q19 16 17 20 Q15 16 14 12" fill="rgba(147,220,255,0.08)" stroke="rgba(147,220,255,0.3)" strokeWidth="0.5"/>
          </svg>
        )}
      </div>

      
      {/* ═══ SPLASH TITLE OVERLAY ═══ */}
      {splashPhase > 0 && splashPhase < 3 && (
        <div onClick={() => { setSplashPhase(3); setMounted(true); }} style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: splashPhase === 1 ? "radial-gradient(ellipse at 50% 0%, #1a150e 0%, #0d0a07 50%, #050403 100%)" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: splashPhase === 2 ? "none" : "auto",
          transition: "background 0.8s ease-out",
        }}>
          {/* Particles drifting down from the light source */}
          {splashPhase === 1 && Array.from({ length: 30 }).map((_, i) => {
            const size = 0.8 + (i % 5) * 0.5;
            // Spawn from the top-center light area (30-70% width)
            const left = 30 + (i * 1.37) % 40;
            const dur = 7 + (i % 6) * 2;
            // Negative delay so some particles start already on screen mid-fall
            const delay = -(i * 0.6) % 8;
            return (
              <div key={`sp${i}`} style={{
                position: "absolute",
                left: `${left}%`, top: `-2%`,
                width: `${size}px`, height: `${size}px`,
                borderRadius: "50%",
                background: `rgba(245,${155 + (i % 5) * 18},11,${0.12 + (i % 4) * 0.08})`,
                boxShadow: `0 0 ${2 + (i % 3) * 2}px rgba(245,158,11,${0.06 + (i % 3) * 0.05})`,
                animation: `splashFall${i % 3} ${dur}s linear ${delay}s infinite`,
              }} />
            );
          })}

          {/* Title block */}
          <div style={{
            textAlign: "center",
            opacity: splashPhase === 1 ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}>
            <div style={{
              fontSize: "8px", color: "#8a7a65", letterSpacing: "4px",
              fontFamily: "'Cinzel', serif", textTransform: "uppercase", marginBottom: "2px",
            }}>PAUSE</div>
            <h1 style={{
              margin: 0, fontSize: "32px", fontFamily: "'Cinzel Decorative', serif",
              color: "#f5c842", letterSpacing: "3px",
              textShadow: "0 0 40px rgba(245,158,11,0.3), 0 2px 4px rgba(0,0,0,0.5)",
            }}>LIFE RPG</h1>
            <div style={{
              width: "140px", height: "1px", margin: "6px auto",
              background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)",
              opacity: 1,
            }} />
          </div>

          {/* Tap to skip */}
          {splashPhase === 1 && (
            <div style={{
              position: "absolute", bottom: "15%",
              fontSize: "9px", color: "#3d352a", fontFamily: "'Fira Code', monospace",
              animation: "splashTapIn 0.5s ease 0.8s both",
            }}>tap to skip</div>
          )}
        </div>
      )}

{/* Floating Dock Navigation */}
      <div style={{
        position: "fixed", bottom: "max(12px, env(safe-area-inset-bottom, 12px))", left: "50%", transform: "translateX(-50%)",
        zIndex: 100, display: "flex", gap: "2px", padding: "6px 10px",
        background: "rgba(13, 10, 7, 0.9)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderRadius: "16px",
        border: "1px solid rgba(245, 158, 11, 0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 60px rgba(245,158,11,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
        opacity: mounted ? 1 : 0, transform: mounted ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(20px)",
        transition: "opacity 0.6s 0.4s, transform 0.6s 0.4s",
      }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => {
            if (tab.id === "character" && activeTab === "character") {
              setHeroExpanded(prev => !prev);
            } else {
              setActiveTab(tab.id);
              if (tab.id !== "character") setHeroExpanded(false);
            }
          }} style={{
            padding: "6px 8px", fontSize: "8px", cursor: "pointer",
            fontFamily: "'Cinzel', serif", letterSpacing: "0.5px", border: "none",
            borderRadius: "10px",
            background: activeTab === tab.id
              ? "linear-gradient(145deg, rgba(245,158,11,0.3), rgba(245,158,11,0.1))"
              : "transparent",
            color: activeTab === tab.id ? "#f5c842" : "#6b5d4a",
            transition: "all 0.3s",
            textTransform: "uppercase",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "2px",
            minWidth: "44px",
            boxShadow: activeTab === tab.id ? "0 0 20px rgba(245,158,11,0.15)" : "none",
          }}>
            <span style={{
              fontSize: "16px",
              filter: activeTab === tab.id ? "drop-shadow(0 0 6px rgba(245,158,11,0.4))" : "none",
              transition: "all 0.3s",
              transform: activeTab === tab.id ? "scale(1.15)" : "scale(1)",
            }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ═══ IMAGE CROP MODAL ═══ */}
      {cropSrc && (
        <ImageCropModal
          imageSrc={cropSrc}
          onConfirm={(base64) => {
            if (cropTarget === "avatar") {
              saveChar({ ...character, avatar: base64 });
            } else if (cropTarget === "item") {
              setItemEditModal(prev => prev ? { ...prev, image: base64 } : prev);
            }
            setCropSrc(null);
            setCropTarget(null);
          }}
          onCancel={() => { setCropSrc(null); setCropTarget(null); }}
        />
      )}

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; touch-action: manipulation; -webkit-user-select: none; user-select: none; }
        *::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
        html, body { overscroll-behavior: none; overflow: hidden; height: 100vh; }
        button, [onClick] { touch-action: manipulation; }
        @keyframes headerCardFlyIn {
          0% { transform: translateY(-50%) translateX(80px); opacity: 0; }
          60% { transform: translateY(-50%) translateX(-4px); opacity: 1; }
          100% { transform: translateY(-50%) translateX(0); opacity: 1; }
        }
        @keyframes headerCardGlow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(168,85,247,0.2)); }
          50% { filter: drop-shadow(0 0 8px rgba(168,85,247,0.6)); }
        }
        @keyframes headerXpFlyIn {
          0% { transform: translateY(-50%) translateX(80px); opacity: 0; }
          60% { transform: translateY(-50%) translateX(-4px); opacity: 1; }
          100% { transform: translateY(-50%) translateX(0); opacity: 1; }
        }
        @keyframes headerXpGlow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(16,185,129,0.2)); }
          50% { filter: drop-shadow(0 0 8px rgba(16,185,129,0.6)); }
        }
        @keyframes micPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
        }
        
        }
        
        
        }
        
        }
        
        }
        
        
        }
        @keyframes splashFall0 {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          8% { opacity: 1; }
          70% { opacity: 0.6; }
          100% { transform: translateY(105vh) translateX(6px); opacity: 0; }
        }
        @keyframes splashFall1 {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          8% { opacity: 1; }
          70% { opacity: 0.5; }
          100% { transform: translateY(105vh) translateX(-8px); opacity: 0; }
        }
        @keyframes splashFall2 {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          8% { opacity: 1; }
          70% { opacity: 0.7; }
          100% { transform: translateY(105vh) translateX(3px); opacity: 0; }
        }
        @keyframes splashTapIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes splashEmber {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-8px) scale(1.3); opacity: 1; }
        }
        @keyframes fairyGlow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(147,220,255,0.5)); }
          50% { filter: drop-shadow(0 0 12px rgba(147,220,255,0.9)); }
        }
        @keyframes fairyBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes auraPulse {
          0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.6; transform: translateX(-50%) scale(1.08); }
        }
        @keyframes auraRing {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.15); }
        }
        @keyframes emberFloat0 {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(-80px) translateX(8px); opacity: 0; }
        }
        @keyframes emberFloat1 {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-100px) translateX(-12px); opacity: 0; }
        }
        @keyframes emberFloat2 {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          75% { opacity: 0.6; }
          100% { transform: translateY(-60px) translateX(15px); opacity: 0; }
        }
        @keyframes equipSelect {
          0%, 100% { box-shadow: 0 0 0 2px rgba(245,158,11,0.4); }
          50% { box-shadow: 0 0 0 2px rgba(245,158,11,0.8), 0 0 12px rgba(245,158,11,0.3); }
        }
        @keyframes splashFadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes levelEdgeGlow {
          0%, 100% { box-shadow: inset 0 0 25px rgba(245,158,11,0.1), inset 0 0 50px rgba(245,158,11,0.04); }
          50% { box-shadow: inset 0 0 40px rgba(245,158,11,0.18), inset 0 0 70px rgba(245,158,11,0.07); }
        }
        @keyframes splashParticle {
          0% { opacity: 0.8; transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          70% { opacity: 0.6; }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--px), var(--py)) scale(0.3); }
        }
        @keyframes xpSplashIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes fadeSlideDown { 0% { opacity: 0; transform: translateY(-4px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeSlideUp { 0% { opacity: 0; transform: translateX(-50%) translateY(10px); } 100% { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes questCompleteIn {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 40px rgba(245,158,11,0.3), 0 0 80px rgba(245,158,11,0.15); }
          50% { box-shadow: 0 0 60px rgba(245,158,11,0.5), 0 0 120px rgba(245,158,11,0.25); }
        }
        @keyframes levelUpIn {
          0% { opacity: 0; transform: scale(0.5); }
          60% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes levelFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes levelBurst {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--burst-x)), calc(-50% + var(--burst-y))) scale(1); opacity: 0; }
        }
        button:hover { filter: brightness(1.2); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
        ::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); border-radius: 3px; }
      `}</style>
    </div>

    {/* ═══ SETTINGS PANEL — rendered via portal to bypass all overflow/stacking issues ═══ */}
    {showSettings && ReactDOM.createPortal(
      <div style={{ position: 'fixed', inset: 0, zIndex: 9998, display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Crimson Text', serif" }}>
        {/* Backdrop */}
        <div onClick={() => setShowSettings(false)} style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
        }} />
        {/* Panel */}
        <div style={{
          position: 'relative', width: '90%', maxWidth: '400px', maxHeight: '85vh', overflowY: 'auto',
          background: 'linear-gradient(145deg, rgba(26,21,14,0.98), rgba(13,10,7,0.98))',
          border: '1px solid rgba(245,158,11,0.3)', borderRadius: '16px',
          padding: '24px 20px', boxShadow: '0 0 60px rgba(0,0,0,0.8), 0 0 30px rgba(245,158,11,0.1)',
        }}>
          {/* Close button */}
          <div onClick={() => setShowSettings(false)} style={{
            position: 'absolute', top: '12px', right: '12px', width: '28px', height: '28px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            color: '#8a7a65', fontSize: '18px', opacity: 0.7,
          }}>✕</div>

          <h2 style={{
            margin: '0 0 20px', fontSize: '18px', fontFamily: "'Cinzel Decorative', serif",
            color: '#f5c842', letterSpacing: '2px', textAlign: 'center',
            textShadow: '0 0 20px rgba(245,158,11,0.3)',
          }}>Settings</h2>

          {/* ── Data Backup ── */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', color: '#8a7a65', letterSpacing: '2px', fontFamily: "'Cinzel', serif", marginBottom: '10px', textTransform: 'uppercase' }}>Data Backup</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { saveBackup(); alert('Backup saved!'); }} style={{
                flex: 1, padding: '10px', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: '10px', color: '#4ade80', fontFamily: "'Cinzel', serif", fontSize: '13px',
                cursor: 'pointer', letterSpacing: '1px',
              }}>SAVE</button>
              <button onClick={() => {
                const result = loadBackup();
                if (!result) { alert('No backup found.'); return; }
                alert(`Restored ${result.count} data keys. Reloading...`);
                window.location.reload();
              }} style={{
                flex: 1, padding: '10px', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
                borderRadius: '10px', color: '#60a5fa', fontFamily: "'Cinzel', serif", fontSize: '13px',
                cursor: 'pointer', letterSpacing: '1px',
              }}>LOAD</button>
            </div>
            {(() => { const d = getBackupDate(); return d ? (
              <div style={{ fontSize: '9px', color: '#5a4f42', fontFamily: "'Fira Code', monospace", marginTop: '8px', textAlign: 'center' }}>
                Last backup: {new Date(d).toLocaleString()}
              </div>
            ) : null; })()}
          </div>

          {/* ── API Key ── */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', color: '#8a7a65', letterSpacing: '2px', fontFamily: "'Cinzel', serif", marginBottom: '10px', textTransform: 'uppercase' }}>Navi Connection</div>
            {apiKeyLocked ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{
                    flex: 1, padding: '10px 14px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
                    borderRadius: '10px', color: '#4ade80', fontSize: '12px', fontFamily: "'Fira Code', monospace",
                  }}>API Key Connected</div>
                  <button onClick={() => { setApiKeyLocked(false); setApiKey(""); localStorage.removeItem("rpg-api-key"); setApiTestResult(null); }} style={{
                    padding: '10px 14px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '10px', color: '#f87171', fontSize: '11px', fontFamily: "'Cinzel', serif",
                    cursor: 'pointer', whiteSpace: 'nowrap',
                  }}>Remove</button>
                </div>
                <button onClick={testApiConnection} disabled={apiTesting} style={{
                  width: '100%', padding: '8px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                  borderRadius: '10px', color: '#a5b4fc', fontSize: '11px', fontFamily: "'Cinzel', serif",
                  cursor: apiTesting ? 'wait' : 'pointer', letterSpacing: '1px', transition: 'all 0.2s',
                }}>{apiTesting ? "Testing..." : "Test Connection"}</button>
                {apiTestResult && (
                  <div style={{
                    marginTop: '6px', padding: '8px 12px', borderRadius: '8px', fontSize: '11px', lineHeight: 1.4,
                    background: apiTestResult.ok ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                    border: '1px solid ' + (apiTestResult.ok ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'),
                    color: apiTestResult.ok ? '#4ade80' : '#f87171',
                    fontFamily: "'Fira Code', monospace", wordBreak: 'break-word',
                  }}>{apiTestResult.msg}</div>
                )}
              </div>
            ) : (
              <div>
                <input
                  type="password"
                  placeholder="sk-ant-... (Anthropic API Key)"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px',
                    color: '#e8d5b0', fontSize: '12px', fontFamily: "'Fira Code', monospace",
                    outline: 'none', marginBottom: '8px',
                  }}
                />
                <button onClick={() => {
                  if (apiKey.trim()) {
                    localStorage.setItem("rpg-api-key", apiKey.trim());
                    setApiKeyLocked(true);
                  }
                }} style={{
                  width: '100%', padding: '10px', background: apiKey.trim() ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
                  border: '1px solid ' + (apiKey.trim() ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.1)'),
                  borderRadius: '10px', color: apiKey.trim() ? '#f5c842' : '#555',
                  fontFamily: "'Cinzel', serif", fontSize: '13px', cursor: apiKey.trim() ? 'pointer' : 'default',
                  letterSpacing: '1px', transition: 'all 0.2s',
                }}>Connect</button>
                <div style={{ fontSize: '10px', color: '#5a4a35', marginTop: '6px', lineHeight: 1.4 }}>
                  Your key is stored locally on this device only. Get one at console.anthropic.com
                </div>
              </div>
            )}
          </div>

          {/* ── Brightness ── */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', color: '#8a7a65', letterSpacing: '2px', fontFamily: "'Cinzel', serif", marginBottom: '10px', textTransform: 'uppercase' }}>
              Brightness — {Math.round(brightness * 100)}%
            </div>
            <input
              type="range" min="0.3" max="1.3" step="0.05" value={brightness}
              onChange={(e) => setBrightness(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#f59e0b' }}
            />
          </div>

          {/* ── Theme (placeholder) ── */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '11px', color: '#8a7a65', letterSpacing: '2px', fontFamily: "'Cinzel', serif", marginBottom: '10px', textTransform: 'uppercase' }}>App Theme</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'dark-fantasy', label: 'Dark Fantasy', color: '#f59e0b' },
                { id: 'midnight', label: 'Midnight', color: '#6366f1' },
                { id: 'blood-moon', label: 'Blood Moon', color: '#ef4444' },
                { id: 'forest', label: 'Forest', color: '#22c55e' },
              ].map(t => (
                <button key={t.id} onClick={() => setAppTheme(t.id)} style={{
                  flex: '1 1 45%', padding: '10px 8px', background: appTheme === t.id ? `rgba(${t.id === 'dark-fantasy' ? '245,158,11' : t.id === 'midnight' ? '99,102,241' : t.id === 'blood-moon' ? '239,68,68' : '34,197,94'},0.15)` : 'rgba(0,0,0,0.3)',
                  border: `1px solid ${appTheme === t.id ? t.color : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '10px', color: appTheme === t.id ? t.color : '#5a4a35',
                  fontFamily: "'Cinzel', serif", fontSize: '11px', cursor: 'pointer',
                  transition: 'all 0.2s', letterSpacing: '0.5px',
                }}>{t.label}</button>
              ))}
            </div>
            <div style={{ fontSize: '10px', color: '#5a4a35', marginTop: '6px' }}>More themes coming soon</div>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}
