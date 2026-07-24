import { site } from "@/lib/data";

export const metadata = { title: "About - Shehryar Hassan" };

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-[40px] font-bold leading-tight tracking-tight text-ink md:text-[48px]">
        About
      </h1>
      <p className="mt-2 text-[14.5px] text-mute">The long version.</p>

      <div className="mt-8 space-y-5 text-[14.5px] leading-[1.75] text-ink/85">
        <p>
          I&apos;m Shehryar Hassan, an AI engineer. I like turning fuzzy
          product ideas into live software, fast. I care equally about the
          model, the interface, and the boring plumbing that makes it feel
          good in the hand.
        </p>
        <p>
          Right now I&apos;m Founding Engineer at{" "}
          <a className="ulink" href="https://kay.ai" target="_blank" rel="noreferrer">
            kay.ai
          </a>{" "}
          , where we build AI co-workers that own real workflows for insurance
          brokerages. Before that I was Co-Founder / CTO at Dreamboat.ai, and
          shipped Engagebud and Influencerbit in earlier chapters.
        </p>
        <p>
          On the side I run a small studio of side-projects such as Promptsmint,
          AidenGPT, Gita Chat, and niahere. Each one is a deliberate experiment
          in what a small AI product can do when a single person owns the
          whole stack.
        </p>
        <p>
          Outside of work I read a lot, run occasionally, and study the Gita.
          If you&apos;re building something interesting, come say hi via{" "}
          <a className="ulink" href={site.socials.email}>
            Email
          </a>
          .
        </p>
      </div>
    </div>
  );
}
