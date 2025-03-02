"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Laptop } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function SettingsMenu({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { theme, setTheme } = useTheme()
  const [primaryColor, setPrimaryColor] = useState("blue")

  const handleColorChange = (color: string) => {
    setPrimaryColor(color)
    document.documentElement.style.setProperty("--primary", `var(--${color})`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="theme" className="text-right">
              Theme
            </Label>
            <Select value={theme} onValueChange={(value) => setTheme(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center">
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center">
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center">
                    <Laptop className="mr-2 h-4 w-4" />
                    System
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Primary Color
            </Label>
            <Select value={primaryColor} onValueChange={handleColorChange}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

