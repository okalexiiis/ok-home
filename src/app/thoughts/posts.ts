import type { Post } from "@/lib/thoughts";

// One-time seed data. The live source of truth is MongoDB — run `pnpm seed:thoughts`
// to load these into the database. Safe to edit or delete after seeding.
export const seedPosts: Post[] = [
  {
    slug: "on-finishing-things",
    title: "on finishing things",
    date: "2026-05-20",
    tags: ["life", "creativity"],
    excerpt: "Starting is easy. The middle is where projects go to die.",
    body: `I have a folder full of beginnings. Half-built apps, the first three chapters of stories, repos with a single ambitious commit and nothing after.

The truth is that starting is cheap. It costs nothing but enthusiasm, and enthusiasm is the most abundant resource I have. The hard part is the middle — the long stretch where the novelty is gone but the finish line isn't in sight yet.

## what changed

I stopped trying to feel motivated and started showing up anyway. Twenty minutes a day on the boring middle beats a weekend of inspired sprinting followed by three months of nothing.

Finishing is a skill. Like any skill, you get better by doing it badly until you don't.`,
  },
  {
    slug: "why-i-still-use-arch",
    title: "why i still use arch",
    date: "2026-04-08",
    tags: ["tech", "linux"],
    excerpt:
      "People think it's about flexing. It's actually about understanding.",
    body: `Every few months someone asks me why I bother with Arch when I could just install something that works out of the box.

The honest answer is that I like knowing what's on my machine. When you build the system yourself, there are no mysteries. Something breaks, you know exactly which piece you added and why.

## the cost

It's not free. I've spent evenings fixing things a normal distro would have handled for me. But I've never once been confused about how my own computer works, and that's worth more to me than the saved hours.

The minimalism isn't aesthetic. It's a side effect of only installing what I actually use.`,
  },
  {
    slug: "taste-is-a-muscle",
    title: "taste is a muscle",
    date: "2026-02-15",
    tags: ["creativity", "art"],
    excerpt:
      "You don't find your taste. You build it, one bad opinion at a time.",
    body: `When I was younger I thought taste was something you either had or didn't. Some people were just born knowing what was good.

I don't believe that anymore. Taste is built by paying attention. By consuming a lot, and more importantly, by asking yourself *why* something works after you experience it.

## the gap

There's a famous idea that creative people have taste long before they have the skill to match it. The gap between what you can make and what you can recognize as good is painful — but that gap is the whole point. It's the thing pulling you forward.

Close it by making more, not by lowering your standards.`,
  },
];
