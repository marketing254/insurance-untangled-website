/**
 * Static blog content.
 *
 * Mirrors the design from `blog-doing-more-isnt-the-answer.html`.
 * Later this can be replaced by a fetch from the Google Sheets `blogs` tab —
 * keep the StaticBlogPost interface compatible.
 */

export type ContentBlock =
  | { type: "lead"; html: string }
  | { type: "p"; html: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "pullquote"; quote: string; attr?: string }
  | { type: "dialogue"; speaker: string; html: string }
  | {
      type: "takeaways";
      label: string;
      title: string;
      items: string[]; // each item supports inline HTML (strong, em)
    }
  | {
      type: "cta";
      title: string;
      description: string;
      href: string;
      label: string;
    };

export interface StaticBlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;       // YYYY-MM-DD
  dateLabel: string;  // human-readable
  readTime: number;   // minutes
  episodeNote?: string;
  image_url?: string;
  blocks: ContentBlock[];
}

export const STATIC_BLOGS: StaticBlogPost[] = [
  {
    slug: "why-doing-more-isnt-the-answer",
    title: "Why Doing “More” Isn’t the Answer — Doing the Right Things Is",
    category: "PPO Strategy · Practice Growth",
    excerpt:
      "Most dentists are working harder than ever and still not growing. The problem isn’t the effort. It’s that the effort is aimed at the wrong target.",
    author: "Ben Tuinei & Naren Arulrajah",
    date: "2026-04-22",
    dateLabel: "April 22, 2026",
    readTime: 7,
    episodeNote: "Adapted from Episode 137",
    // No image — blog cards fall back to the navy gradient + dot pattern.
    // To add a real cover image, drop the file into /public/images/blog/ and
    // set image_url to "/images/blog/your-cover.jpg".
    blocks: [
      {
        type: "lead",
        html:
          "Ask any dental practice owner about their growth strategy and you’ll usually get a list. More ads. More social posts. More software. Another insurance plan to “fill the schedule.” More, more, more. But here’s the thing nobody talks about: working harder while solving the wrong problem doesn’t just fail to help — it actively makes things worse.",
      },
      {
        type: "p",
        html:
          "This is the heart of a recent conversation between <strong>Ben Tuinei</strong> (President, Veritas Dental Resources) and <strong>Naren Arulrajah</strong> (CEO, Ekwa Marketing) on the Insurance Untangled podcast. Adapted from Episode 137, this article distills what’s become one of the most counterintuitive lessons in modern dental practice management.",
      },
      { type: "h2", text: "The action bias trap" },
      {
        type: "p",
        html:
          "“As humans, we have this bias towards action,” Naren observed early in the conversation, “especially those who end up in dental school.” Dentists are, by selection, the kids who got A’s and worked harder than everyone else. That same instinct — when in doubt, do more — carries straight into running a practice.",
      },
      {
        type: "p",
        html:
          "The problem is that running a practice rewards a different muscle: <em>knowing what to do</em>. And the two muscles often pull in opposite directions.",
      },
      {
        type: "pullquote",
        quote:
          "Being busy is not the answer. And the other problem I see is that doing the wrong thing is also not the answer.",
        attr: "Naren Arulrajah",
      },
      { type: "h2", text: "A real example: 30 new patients, no actual growth" },
      {
        type: "p",
        html:
          "Naren shared a recent call with a new client who, on paper, looked like a marketing success story.",
      },
      {
        type: "dialogue",
        speaker: "Naren",
        html:
          "I had a wonderful call with this wonderful client. He is a new client, and he’s getting 30 new patients, but his actual patient volume hasn’t changed because the conversion rate dropped. Why? The team is not trained to deal with patients who are calling from Google, saying, “Hey, can you do sedation? Can you do this? Can you do that?” The first issue is they’re missing so many calls. The second issue is the team doesn’t know how to handle them and how to convince them that this is a great practice.",
      },
      {
        type: "p",
        html:
          "Read that again. Thirty new <em>callers</em>. Almost no new <em>patients</em>. The marketing was working perfectly. The conversion was broken.",
      },
      {
        type: "p",
        html:
          "Now imagine the natural reflex. The doctor’s first instinct? “We need more leads.” So he runs Google Ads on top of the SEO. The conversion rate doesn’t go up — it gets worse. As Naren put it: “If you can’t convince somebody from Google who’s trusting you because they found you organically, and you’re only converting one out of four, how are you going to convert people who are calling from an ad?”",
      },
      { type: "h2", text: "Fix the conversion before you spend" },
      {
        type: "p",
        html: "This is what doing the <em>right</em> thing looks like:",
      },
      {
        type: "ul",
        items: [
          "If 180 phone calls are producing only seven new patients, the problem isn’t traffic. It’s call handling.",
          "If your conversion rate is 30%, getting it to 60% doubles your business — without spending another dollar on marketing.",
          "If you don’t have call tracking, you don’t have data. You have guesses.",
        ],
      },
      {
        type: "p",
        html:
          "Naren is blunt about the math: a new patient lead from SEO might cost a practice <strong>$50–60</strong>. A new patient lead from Google Ads might cost <strong>$300</strong>. Same patient. Same end result. Five-times the cost. So the question isn’t “should we do Google Ads?” — it’s “do we know which channel is producing what?”",
      },
      {
        type: "takeaways",
        label: "The 80/20 rule, applied",
        title: "Most of what dentists do for growth is wasted effort.",
        items: [
          "<strong>Find the bottleneck.</strong> Is it traffic, conversion, retention, or treatment acceptance? Each demands a different fix.",
          "<strong>Stop doing the 80% that’s useless.</strong> Most social media posts go to people in other states. Most “engagement” doesn’t book chairs.",
          "<strong>Double down on the 20% that works.</strong> If SEO is producing $60 leads, the answer is more SEO — not more channels.",
        ],
      },
      { type: "h2", text: "The same trap, on the insurance side" },
      {
        type: "p",
        html:
          "The “more is more” reflex isn’t unique to marketing. Ben sees the exact same pattern in insurance participation. Dentists signed up for 12, 20, 24 plans — directly or through umbrella networks — many of which don’t even pay enough to cover the cost of doing the dentistry.",
      },
      {
        type: "dialogue",
        speaker: "Naren",
        html:
          "An average practice collecting a million dollars that I spoke to recently was writing off $546,000 every year — meaning they’re producing $1.56 million in dentistry and only collecting a million. Why? The difference between the usual and customary fees versus, after the fee controls and the reductions, how much they actually get paid.",
      },
      {
        type: "p",
        html:
          "That’s not a small leak. That’s $546,000 in production handed to insurance carriers in exchange for the privilege of doing the work. And the doctor is busy. Maybe even <em>too busy</em>. Just not in a way that pays.",
      },
      { type: "h2", text: "Less is more (and the math proves it)" },
      {
        type: "p",
        html:
          "Here’s the part that most dentists don’t believe until they see it: the practices that participate in <em>fewer</em> plans almost always make more money than the ones in <em>more</em> plans.",
      },
      {
        type: "pullquote",
        quote:
          "We have some clients that participate with over 100 dental plans. And we have another client, not too far away, that only takes five plans. The practice with five sees more patients and is significantly more profitable.",
        attr: "Ben Tuinei",
      },
      {
        type: "p",
        html:
          "Why? Because pricing power compounds. When you’re contractually obligated to a hundred fee schedules, you have no leverage. When you’re choosy — and the plans you do take are well-negotiated — you keep more of every dollar you produce.",
      },
      { type: "h3", text: "A real fee negotiation, in numbers" },
      {
        type: "p",
        html:
          "Ben described a recent client, a Florida practice whose molar endo fee under one PPO sat in the <strong>$450</strong> range — in a market where non-negotiable rates for endodontists started at <strong>$800</strong>. After the renegotiation? The fee went to <strong>$1,200</strong>. Roughly 3x. Across the entire fee schedule, the average increase came out to about 50%.",
      },
      {
        type: "p",
        html:
          "The doctor’s reaction wasn’t celebration. It was anxiety: “Is this fee increase too high?” Ben’s response: that PPO had been underpaying her for years. The plan probably should have been dropped years ago. Every patient on it was costing the practice money.",
      },
      { type: "h2", text: "What “doing the right thing” actually looks like" },
      {
        type: "p",
        html:
          "If you take one thing away from this conversation, it should be this. <em>Doing the right thing</em> isn’t a vague aspiration. It’s a process:",
      },
      {
        type: "ol",
        items: [
          "<strong>Find where you’re actually leaking money.</strong> Conversion? Write-offs? Marketing channel mix? Treatment acceptance?",
          "<strong>Solve <em>that</em>.</strong> Not the thing the last conference speaker told you to solve.",
          "<strong>Measure with real data.</strong> Call tracking. Cost per lead by channel. Annual write-offs by carrier. Without numbers, you’re guessing.",
          "<strong>Drop what doesn’t work.</strong> The PPO that loses money. The marketing channel that doesn’t book. The “engagement” tactic that doesn’t move the needle.",
          "<strong>Repeat.</strong> The bottleneck moves. The answers change. The discipline doesn’t.",
        ],
      },
      {
        type: "p",
        html: "Or as Naren summed it up at the end of the conversation:",
      },
      {
        type: "pullquote",
        quote:
          "Are you doing the right thing? More is not more. Working smart is key. Knowing what the real problem is, knowing what’s holding you back, and just solving that — that is the key to success.",
        attr: "Naren Arulrajah, closing thought",
      },
      {
        type: "cta",
        title: "Find out where your practice is actually leaking",
        description:
          "The PPO Readiness Scorecard takes 2 minutes and gives you a personalised report on conversion, fee schedules, write-offs, and what to fix first. Free.",
        href: "/ppo-scorecard/",
        label: "Take the Free Scorecard →",
      },
      { type: "h2", text: "Want to listen to the full conversation?" },
      {
        type: "p",
        html:
          "This article is adapted from Episode 137 of the Insurance Untangled podcast. The full audio runs about 20 minutes and includes more real client examples, fee negotiation specifics, and the back-and-forth between Ben and Naren that text can’t fully capture.",
      },
      {
        type: "p",
        html:
          "Listen on <a href=\"https://podcasts.apple.com/us/podcast/insurance-untangled/id1697118974\" target=\"_blank\" rel=\"noopener\">Apple Podcasts</a>, <a href=\"https://open.spotify.com/show/2rzbZTBgqMYElL5xkZy1Bq\" target=\"_blank\" rel=\"noopener\">Spotify</a>, or <a href=\"https://www.youtube.com/playlist?list=PLYzuqhbyVkuApRBUvkXkr5Dalm_F6BYUf\" target=\"_blank\" rel=\"noopener\">YouTube</a> — or read it weekly. Either works. Just don’t keep doing more.",
      },
    ],
  },
];

export function getStaticBlog(slug: string): StaticBlogPost | undefined {
  return STATIC_BLOGS.find((b) => b.slug === slug);
}

export function getStaticBlogs(): StaticBlogPost[] {
  return STATIC_BLOGS;
}
