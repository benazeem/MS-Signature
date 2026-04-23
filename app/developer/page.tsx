import Image from "next/image";
import {
  Mail,
  MessageCircle,
  Code2,
  Database,
  Cloud,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export const metadata = {
  title: "Mohd Azeem Malik | Full-Stack Developer",
  description:
    "Portfolio of Mohd Azeem Malik, a Frontend Focused Full-Stack Web Developer specializing in scalable SaaS architectures.",
};

const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "RTK Query",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Backend & Infra",
    icon: Database,
    skills: ["Node.js", "Express.js", "MongoDB", "Redis", "BullMQ", "Docker"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      "AWS (EC2, S3, Route 53)",
      "IAM",
      "CloudWatch",
      "Monorepo (Turborepo)",
      "Git",
    ],
  },
  {
    title: "Specialized",
    icon: Layers,
    skills: [
      "AI Feature Integration",
      "Chrome Extensions",
      "Browser APIs",
      "System Design",
    ],
  },
];

export default function DeveloperPage() {
  return (
    <div className="pt-32 pb-20 overflow-hidden relative selection:bg-gold/30">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gold/3 blur-[120px] rounded-full pointer-events-none" />

      <Section className="relative z-10">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            {/* Header / Intro */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-gold/20 p-1.5 bg-primary/40 backdrop-blur-sm rotate-3">
                  <div className="relative w-full h-full rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <Image
                      src="https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop"
                      alt="Mohd Azeem Malik"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 text-center lg:text-left">
                <h1 className="font-heading text-5xl md:text-6xl text-text-light mb-4">
                  Mohd <span className="text-gradient-gold">Azeem</span> Malik
                </h1>
                <h2 className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-8">
                  Frontend Focused Full-Stack Web Developer
                </h2>
                <p className="text-text-muted text-lg leading-relaxed mb-8 max-w-2xl">
                  I build scalable, production-grade web applications with a
                  focus on API-driven architecture and secure authentication.
                  Beyond UI, my work emphasizes performance, system design, and
                  real-world SaaS workflows.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Button
                    href="mailto:azeemkhandsari@gmail.com"
                    variant="primary"
                    className="gap-2"
                  >
                    <Mail size={16} /> Contact
                  </Button>
                  <Button
                    href="https://wa.me/917895411144"
                    variant="outline"
                    className="gap-2"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </Button>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="mb-24">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                  <Layers size={20} />
                </div>
                <h3 className="text-2xl font-heading text-text-light">
                  Technical Arsenal
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillGroups.map((group) => (
                  <div
                    key={group.title}
                    className="p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-gold/20 transition-all duration-500"
                  >
                    <group.icon size={20} className="text-gold mb-4" />
                    <h4 className="text-sm font-heading text-text-light mb-4 tracking-widest uppercase">
                      {group.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md bg-white/5 text-text-muted text-[10px] font-medium border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <div className="flex justify-center gap-8 pt-12 border-t border-white/5">
              <a
                href="https://github.com/benazeem"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors text-sm font-medium"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                Github
              </a>
              <a
                href="https://www.linkedin.com/in/devazeem/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors text-sm font-medium"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                Linkedin
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
