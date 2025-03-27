"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin, Mail, Home, User, Briefcase, FileText, Globe, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dictionary, getDictionary, getSavedLanguage, saveLanguage, detectBrowserLanguage } from "@/lib/dictionary"
import { ActionSearch } from "@/components/action-search"

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [language, setLanguage] = useState<string>('en')
  const [dictionary, setDictionary] = useState<Dictionary | null>(null)
  const [isChangingLanguage, setIsChangingLanguage] = useState(false)

  // Load translations on mount
  useEffect(() => {
    const initLanguage = async () => {
      // Try to get saved language from localStorage or detect from browser
      const savedLanguage = getSavedLanguage();
      setLanguage(savedLanguage);
      
      // Load dictionary
      const dict = await getDictionary(savedLanguage);
      setDictionary(dict);
    };
    
    initLanguage();
  }, []);

  // Switch language with smooth transition
  const toggleLanguage = async () => {
    // Start transition
    setIsChangingLanguage(true);
    
    // Wait for fade-out
    setTimeout(async () => {
      const newLanguage = language === 'en' ? 'pl' : 'en';
      setLanguage(newLanguage);
      saveLanguage(newLanguage);
      
      const dict = await getDictionary(newLanguage);
      setDictionary(dict);
      
      // End transition with slight delay for smoother effect
      setTimeout(() => {
        setIsChangingLanguage(false);
      }, 300);
    }, 300);
  };

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

    // Symulacja ładowania strony
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
      
      // Dodajemy małe opóźnienie przed pokazaniem treści dla płynnego przejścia
      const contentTimer = setTimeout(() => {
        setShowContent(true)
      }, 300)
      
      return () => clearTimeout(contentTimer)
    }, 2000)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(loadingTimer)
    }
  }, [])

  // If dictionary is not loaded yet, show loading screen
  if (!dictionary) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-background/80">
        <div className="relative h-24 w-24 animate-spin rounded-full border-4 border-primary border-t-transparent">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold text-primary">ON</span>
          </div>
        </div>
        <p className="mt-8 text-xl font-semibold text-primary animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Dodajemy komponent ActionSearch */}
      <ActionSearch dictionary={dictionary} />

      {/* Ekran ładowania */}
      <div 
        className={cn(
          "fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 transition-opacity duration-500",
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="relative h-24 w-24 animate-spin rounded-full border-4 border-primary border-t-transparent">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold text-primary">ON</span>
          </div>
        </div>
        <p className="mt-8 text-xl font-semibold text-primary animate-pulse">
          {dictionary.loading}
        </p>
      </div>

      {/* Główna zawartość */}
      <div 
        className={cn(
          "min-h-screen bg-gradient-to-b from-background to-background/80 pb-8 transition-opacity duration-500",
          showContent && !isChangingLanguage ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="mx-auto max-w-[800px] px-4 sm:px-6">
          {/* Language Switcher - Top Right */}
          <div className="fixed top-4 right-4 z-50">
            <Button 
              variant="outline" 
              size="sm" 
              className={cn("rounded-full transition-opacity duration-300", isChangingLanguage ? "opacity-50" : "opacity-100")}
              onClick={toggleLanguage}
              disabled={isChangingLanguage}
            >
              <Globe className="h-4 w-4 mr-2" />
              <span>{dictionary.languageSwitch}</span>
            </Button>
          </div>

          {/* Pomocnicza wskazówka skrótu klawiszowego */}
          <div className="fixed top-4 left-4 z-50 sm:flex items-center hidden">
            <div className="px-3 py-1.5 text-xs text-muted-foreground bg-background/50 backdrop-blur rounded-full border border-primary/10">
              <span>{dictionary.actionSearch.shortcutHint}</span>
            </div>
          </div>

          {/* Floating Navbar - Bottom */}
          <div className="fixed bottom-6 left-0 right-0 z-50 mx-auto w-fit md:block">
            <nav
              className={cn(
                "flex items-center justify-center gap-1 rounded-full border border-primary/10 bg-background/80 px-2 py-1 backdrop-blur transition-all sm:px-4 sm:py-2",
                scrolled ? "shadow-lg" : "",
              )}
            >
              <NavLink href="#home" icon={<Home className="h-4 w-4" />} label={dictionary.nav.home} activeSection={activeSection} />
              <NavLink href="#about" icon={<User className="h-4 w-4" />} label={dictionary.nav.about} activeSection={activeSection} />
              <NavLink
                href="#projects"
                icon={<Briefcase className="h-4 w-4" />}
                label={dictionary.nav.projects}
                activeSection={activeSection}
              />
              <NavLink
                href="#resume"
                icon={<FileText className="h-4 w-4" />}
                label={dictionary.nav.resume}
                activeSection={activeSection}
              />
              <NavLink
                href="#contact"
                icon={<Mail className="h-4 w-4" />}
                label={dictionary.nav.contact}
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
                  width={90}
                  height={90}
                  className="rounded-full mb-4"
                />
                <h2 className="text-4xl font-bold">
                  {dictionary.home.greeting} <span className="animate-pulse">Oliwer</span>
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                  {dictionary.home.intro}
                </p>
                <div className="mt-8 flex gap-4">
                  <Button asChild>
                    <Link href="#projects">{dictionary.home.cta.viewWork}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="#contact">{dictionary.home.cta.contact}</Link>
                  </Button>
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="https://github.com/naroors" aria-label="GitHub">
                      <Github className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="https://x.com/naroors_" aria-label="Twitter">
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
              <h2 className="mb-6 text-2xl font-bold">{dictionary.about.title}</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-muted-foreground">
                    {dictionary.about.bio1}
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    {dictionary.about.bio2}
                  </p>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-lg border border-primary/10">
                  <Image
                    src="/image.png?height=400&width=400"
                    alt="Oliwer Noga"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </div>
            </section>

            <section id="projects" className="py-12">
              <h2 className="mb-6 text-2xl font-bold">{dictionary.projects.title}</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    id: 1,
                    title: dictionary.projects.projectOne.title,
                    description: dictionary.projects.projectOne.description,
                    link: "https://rpe-calculator.vercel.app/",
                    codeLink: "https://github.com/naroors/rpe-calculator",
                    image: "project1.png"
                  },
                  {
                    id: 2,
                    title: dictionary.projects.projectTwo.title,
                    description: dictionary.projects.projectTwo.description,
                    link: "https://rusznaprzod.vercel.app/",
                    codeLink: "#",
                    image: "project2.png"
                  },
                  {
                    id: 3,
                    title: dictionary.projects.projectThree?.title || "Personal Portfolio",
                    description: dictionary.projects.projectThree?.description || "A modern portfolio website built with NextJS, TypeScript, and Tailwind CSS.",
                    link: "https://rusznaprzod-ai.vercel.app/",
                    codeLink: "#",
                    image: "project3.png"
                  },
                ].map((project) => (
                  <div
                    key={project.id}
                    className="group overflow-hidden rounded-lg border border-primary/10 bg-card transition-all hover:shadow-md"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-80"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={project.link}>{dictionary.projects.viewProject}</Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={project.codeLink}>
                            <Github className="mr-2 h-4 w-4" />
                            {dictionary.projects.viewCode}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="resume" className="py-12">
              <h2 className="mb-6 text-2xl font-bold">{dictionary.resume.title}</h2>
              <div className="rounded-lg border border-primary/10 bg-card p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold">{dictionary.resume.skills}</h3>
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
                  <h3 className="text-xl font-semibold">{dictionary.resume.experience}</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{dictionary.resume.job1.title}</h4>
                        <span className="text-sm text-muted-foreground">{dictionary.resume.job1.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{dictionary.resume.job1.company}</p>
                      <p className="mt-2 text-sm">
                        {dictionary.resume.job1.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{dictionary.resume.job2.title}</h4>
                        <span className="text-sm text-muted-foreground">{dictionary.resume.job2.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{dictionary.resume.job2.company}</p>
                      <p className="mt-2 text-sm">
                        {dictionary.resume.job2.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{dictionary.resume.education}</h3>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{dictionary.resume.edu.degree}</h4>
                      <span className="text-sm text-muted-foreground">{dictionary.resume.edu.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{dictionary.resume.edu.school}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/resume.pdf">{dictionary.resume.download}</Link>
                  </Button>
                </div>
              </div>
            </section>

            <section id="contact" className="py-12">
              <h2 className="mb-6 text-2xl font-bold">{dictionary.contact.title}</h2>
              <div className="rounded-lg border border-primary/10 bg-card p-6">
                <p className="mb-6 text-muted-foreground">
                  {dictionary.contact.description}
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      <a href="tel:+48531756838" className="hover:text-primary">
                        (48) 531 756 838
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <a href="mailto:oliwernoga@onet.pl" className="hover:text-primary">
                        oliwernoga@onet.pl
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Twitter className="h-5 w-5 text-primary" />
                      <a href="https://x.com/naroors_" className="hover:text-primary">
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
                        {dictionary.contact.schedule}
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" asChild>
                      <Link href="mailto:oliwernoga@onet.pl">
                        <Mail className="mr-2 h-5 w-5" />
                        {dictionary.contact.sendEmail}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="mt-12 border-t border-primary/10 py-6 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Oliwer Noga. {dictionary.footer.rights}</p>
          </footer>
        </div>
      </div>
    </>
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
        "group relative flex items-center gap-2 rounded-full px-2 py-2 text-sm font-medium transition-colors sm:px-3",
        isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground",
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
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
