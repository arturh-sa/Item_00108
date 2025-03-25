"use client"

import {useEffect, useState} from "react"
import {Moon, Sun} from "lucide-react"
import {Button} from "@/components/ui/button"

interface ThemeToggleProps {
    isMobile?: boolean
}

export function ThemeToggle({isMobile = false}: ThemeToggleProps) {
    const [isDarkMode, setIsDarkMode] = useState(false)

    // Initialize theme based on user preference or system preference
    useEffect(() => {
        // Check if user has a stored preference
        const storedTheme = localStorage.getItem("theme")

        if (storedTheme === "dark") {
            setIsDarkMode(true)
            document.documentElement.classList.add("dark")
        } else if (storedTheme === "light") {
            setIsDarkMode(false)
            document.documentElement.classList.remove("dark")
        } else {
            // Check system preference if no stored preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            setIsDarkMode(prefersDark)

            if (prefersDark) {
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove("dark")
            }
        }

        // Listen for system preference changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = (e: MediaQueryListEvent) => {
            // Only apply system preference if user hasn't manually set a preference
            if (!localStorage.getItem("theme")) {
                setIsDarkMode(e.matches)
                if (e.matches) {
                    document.documentElement.classList.add("dark")
                } else {
                    document.documentElement.classList.remove("dark")
                }
            }
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
            setIsDarkMode(false)
        } else {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
            setIsDarkMode(true)
        }
    }

    if (isMobile) {
        return (
            <Button
                variant="secondary"
                size="icon"
                onClick={toggleTheme}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                className="h-12 w-12 rounded-full shadow-lg"
            >
                {isDarkMode ? <Sun className="h-6 w-6"/> : <Moon className="h-6 w-6"/>}
                <span className="sr-only">{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</span>
            </Button>
        )
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDarkMode ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
            <span className="sr-only">{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</span>
        </Button>
    )
}

