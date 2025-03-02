"use client"

import { useState, useEffect, useRef } from "react"
import { Home, User, Briefcase, FileText, Mail, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dictionary } from "@/lib/dictionary"

interface ActionSearchProps {
  dictionary: Dictionary
}

interface ActionItem {
  id: string
  icon: JSX.Element
  label: string
}

export function ActionSearch({ dictionary }: ActionSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Define navigation items
  const items: ActionItem[] = [
    { id: "home", icon: <Home className="h-5 w-5" />, label: dictionary.nav.home },
    { id: "about", icon: <User className="h-5 w-5" />, label: dictionary.nav.about },
    { id: "projects", icon: <Briefcase className="h-5 w-5" />, label: dictionary.nav.projects },
    { id: "resume", icon: <FileText className="h-5 w-5" />, label: dictionary.nav.resume },
    { id: "contact", icon: <Mail className="h-5 w-5" />, label: dictionary.nav.contact },
  ]

  // Filter items based on search query
  const filteredItems = query.trim() === "" 
    ? items 
    : items.filter(item => 
        item.label.toLowerCase().includes(query.toLowerCase()) || 
        item.id.toLowerCase().includes(query.toLowerCase())
      )

  // Toggle search bar visibility
  const toggleSearch = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setQuery("")
      setSelectedIndex(0)
      // Focus input when opened
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  // Navigate to a section
  const navigateToSection = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 20,
        behavior: "smooth",
      })
    }
  }

  // Handle keyboard shortcuts and navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Space to open search
      if (e.ctrlKey && e.code === "Space") {
        e.preventDefault()
        toggleSearch()
      }

      // Handle key navigation when search is open
      if (isOpen) {
        switch (e.key) {
          case "Escape":
            setIsOpen(false)
            break
          case "ArrowDown":
            e.preventDefault()
            setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : prev))
            break
          case "ArrowUp":
            e.preventDefault()
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev))
            break
          case "Enter":
            if (filteredItems.length > 0) {
              navigateToSection(filteredItems[selectedIndex].id)
            }
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedIndex, filteredItems])

  // Reset selected index when filtered items change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query, filteredItems.length])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Search container */}
      <div
        ref={containerRef}
        className={cn(
          "fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 transition-all duration-300",
          isOpen 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="bg-card rounded-lg shadow-lg border border-primary/10 overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-2 p-4 border-b border-primary/10">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground"
              placeholder={dictionary.actionSearch?.placeholder || "Szukaj..."}
            />
            <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              ESC
            </div>
          </div>

          {/* Results list */}
          <div className="max-h-[300px] overflow-y-auto py-2">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors",
                    selectedIndex === index
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                  onClick={() => navigateToSection(item.id)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {selectedIndex === index && (
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      Enter
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-muted-foreground">
                {dictionary.actionSearch?.noResults || "Brak wyników"}
              </div>
            )}
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="p-2 bg-muted/50 border-t border-primary/10 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>{dictionary.actionSearch?.navigationHint || "Nawigacja:"}</span>
              <div className="flex gap-2">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background rounded border border-primary/10">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-background rounded border border-primary/10">↓</kbd>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background rounded border border-primary/10">Enter</kbd>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 