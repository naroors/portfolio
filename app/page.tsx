"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin, Mail, Home, User, Briefcase, FileText } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Determine which section is currently in view
      const sections = ["home", "about", "projects", "resume", "contact"]
      let currentSection = "home"

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (section === "contact") {
            // Special case for contact section
            if (rect.top <= window.innerHeight) {
              currentSection = section
              break
            }
          } else if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pb-8">
      <div className="mx-auto max-w-[800px] px-4 sm:px-6">
        {/* Floating Navbar - Bottom */}
        <div className="fixed bottom-6 left-0 right-0 z-50 mx-auto w-fit md:block">
          <nav
            className={cn(
              "flex items-center justify-center gap-1 rounded-full border border-primary/10 bg-background/80 px-4 py-2 backdrop-blur transition-all",
              scrolled ? "shadow-lg" : "",
            )}
          >
            <NavLink href="#home" icon={<Home className="h-4 w-4" />} label="Home" activeSection={activeSection} />
            <NavLink href="#about" icon={<User className="h-4 w-4" />} label="About" activeSection={activeSection} />
            <NavLink
              href="#projects"
              icon={<Briefcase className="h-4 w-4" />}
              label="Projects"
              activeSection={activeSection}
            />
            <NavLink
              href="#resume"
              icon={<FileText className="h-4 w-4" />}
              label="Resume"
              activeSection={activeSection}
            />
            <NavLink
              href="#contact"
              icon={<Mail className="h-4 w-4" />}
              label="Contact"
              activeSection={activeSection}
            />
          </nav>
        </div>

        {/* Main Content */}
        <main className="mt-12">
          <section id="home" className="py-12">
            <div className="flex flex-col items-center text-center">
              <Image
                src="/profile.png"
                alt="Oliwer's profile picture"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h2 className="text-4xl font-bold">
                Hello, I'm <span className="animate-pulse">Oliwer</span>
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                I build modern web applications with a focus on user experience and performance.
              </p>
              <div className="mt-8 flex gap-4">
                <Button asChild>
                  <Link href="#projects">View My Work</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#contact">Contact Me</Link>
                </Button>
              </div>
              <div className="mt-6 flex justify-center space-x-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://github.com/naroors" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://twitter.com/naroors" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://linkedin.com/in/naroors" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="mailto:oliwernoga@onet.pl" aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="about" className="py-12">
            <h2 className="mb-6 text-2xl font-bold">About Me</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-muted-foreground">
                  I'm a fullstack web developer with expertise in React, Next.js, and Node.js. I'm passionate about
                  creating clean, efficient, and user-friendly applications that solve real-world problems.
                </p>
                <p className="mt-4 text-muted-foreground">
                  With over 5 years of experience in the industry, I've worked on a variety of projects from small
                  business websites to large-scale enterprise applications.
                </p>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg border border-primary/10">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Oliwer Noga"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          </section>

          <section id="projects" className="py-12">
            <h2 className="mb-6 text-2xl font-bold">Featured Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((project) => (
                <div
                  key={project}
                  className="group overflow-hidden rounded-lg border border-primary/10 bg-card transition-all hover:shadow-md"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=300&width=600&text=Project+${project}`}
                      alt={`Project ${project}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Project Title {project}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      A brief description of the project and the technologies used.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="#">View Project</Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="#">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="resume" className="py-12">
            <h2 className="mb-6 text-2xl font-bold">Resume</h2>
            <div className="rounded-lg border border-primary/10 bg-card p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold">Skills</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "GraphQL", "PostgreSQL", "AWS"].map(
                    (skill) => (
                      <div
                        key={skill}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                      >
                        {skill}
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold">Experience</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Senior Frontend Developer</h4>
                      <span className="text-sm text-muted-foreground">2021 - Present</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Tech Company Inc.</p>
                    <p className="mt-2 text-sm">
                      Led the development of the company's main product, improving performance by 40%.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Web Developer</h4>
                      <span className="text-sm text-muted-foreground">2018 - 2021</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Digital Agency Ltd.</p>
                    <p className="mt-2 text-sm">
                      Developed and maintained websites for various clients using modern web technologies.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Education</h3>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">BSc in Computer Science</h4>
                    <span className="text-sm text-muted-foreground">2014 - 2018</span>
                  </div>
                  <p className="text-sm text-muted-foreground">University of Technology</p>
                </div>
              </div>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/resume.pdf">Download Full Resume</Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="contact" className="py-12">
            <h2 className="mb-6 text-2xl font-bold">Get In Touch</h2>
            <div className="rounded-lg border border-primary/10 bg-card p-6">
              <p className="mb-6 text-muted-foreground">
                Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:contact@naroors.com" className="hover:text-primary">
                      contact@naroors.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Twitter className="h-5 w-5 text-primary" />
                    <a href="https://twitter.com/naroors" className="hover:text-primary">
                      @naroors
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-5 w-5 text-primary" />
                    <a href="https://linkedin.com/in/naroors" className="hover:text-primary">
                      linkedin.com/in/naroors
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="https://calendly.com/naroors">
                      <FileText className="mr-2 h-5 w-5" />
                      Schedule a call
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" asChild>
                    <Link href="mailto:contact@naroors.com">
                      <Mail className="mr-2 h-5 w-5" />
                      Send an email
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 border-t border-primary/10 py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Oliwer Noga. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

function NavLink({
  href,
  icon,
  label,
  activeSection,
}: { href: string; icon: React.ReactNode; label: string; activeSection: string }) {
  const sectionId = href.replace("#", "")
  const isActive = activeSection === sectionId

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 20,
        behavior: "smooth",
      })
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "group relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground",
      )}
    >
      {icon}
      <span>{label}</span>
      <span
        className={cn(
          "absolute inset-0 -z-10 rounded-full transition-all duration-300",
          isActive
            ? "bg-primary/10 shadow-[0_0_10px_rgba(var(--primary),0.3)]"
            : "bg-primary/0 group-hover:bg-primary/10 group-hover:shadow-[0_0_10px_rgba(var(--primary),0.3)]",
        )}
      />
    </Link>
  )
}

function MobileNavLink({
  href,
  icon,
  label,
  activeSection,
}: { href: string; icon: React.ReactNode; label: string; activeSection: string }) {
  const sectionId = href.replace("#", "")
  const isActive = activeSection === sectionId

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 20,
        behavior: "smooth",
      })
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 px-2 py-1 transition-colors",
        isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground",
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

