import MealPortionVisualizer from "@/components/meal-portion-visualizer"
import {ThemeToggle} from "@/components/theme-toggle"

export default function Home() {
    return (
        <main
            className="container mx-auto py-8 px-4 min-h-screen transition-colors duration-200 bg-background text-foreground relative pb-20">
            {/* Desktop theme toggle - hidden on mobile */}
            <div className="hidden sm:flex justify-end mb-4">
                <ThemeToggle/>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-center">Meal Portion Visualizer</h1>
            <p className="text-center mb-8 max-w-2xl mx-auto">Understand serving sizes through common household
                objects</p>
            <MealPortionVisualizer/>

            {/* Mobile theme toggle - fixed at bottom right */}
            <div className="sm:hidden fixed bottom-4 right-4 z-50">
                <ThemeToggle isMobile={true}/>
            </div>
        </main>
    )
}

