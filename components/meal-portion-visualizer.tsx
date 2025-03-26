"use client"

import {useState, useEffect} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {toast} from "sonner"
import {z} from "zod"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {RefreshCw} from "lucide-react"
import {foodData, type FoodItem, type PortionSize} from "@/lib/data"
import PortionComparison from "./portion-comparison"

const formSchema = z.object({
    foodType: z.string({
        required_error: "Please select a food type",
    }),
    portionSize: z.string({
        required_error: "Please select a portion size",
    }),
})

type FormValues = z.infer<typeof formSchema>

// Default values
const DEFAULT_FOOD_TYPE = "pasta"
const DEFAULT_PORTION_SIZE = "pasta-half-cup"

export default function MealPortionVisualizer() {
    // Find default food and portion objects for initial state
    const defaultFood = foodData.find((f) => f.id === DEFAULT_FOOD_TYPE) || foodData[0]
    const defaultPortion = defaultFood.portions.find((p) => p.id === DEFAULT_PORTION_SIZE) || defaultFood.portions[0]

    const [selectedFood, setSelectedFood] = useState<FoodItem>(defaultFood)
    const [selectedPortion, setSelectedPortion] = useState<PortionSize>(defaultPortion)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            foodType: DEFAULT_FOOD_TYPE,
            portionSize: DEFAULT_PORTION_SIZE,
        },
    })

    // Watch for food type changes and update portion size accordingly
    const currentFoodType = form.watch("foodType")

    useEffect(() => {
        // When food type changes, update the portion size to the first available option
        const newFood = foodData.find((f) => f.id === currentFoodType)
        if (newFood && newFood.portions.length > 0) {
            const firstPortionId = newFood.portions[0].id
            form.setValue("portionSize", firstPortionId)
        }
    }, [currentFoodType, form])

    function onSubmit(data: FormValues) {
        const food = foodData.find((f) => f.id === data.foodType)
        if (!food) {
            toast.error("Invalid food type selected")
            return
        }

        const portion = food.portions.find((p) => p.id === data.portionSize)
        if (!portion) {
            toast.error("Invalid portion size selected")
            return
        }

        setSelectedFood(food)
        setSelectedPortion(portion)
        setIsDialogOpen(true)

        toast.success("Portion visualization updated", {
            description: `Showing ${portion.size} of ${food.name}`,
        })
    }

    // Store the current state before reset for potential undo
    const [previousFood, setPreviousFood] = useState<FoodItem | null>(null)
    const [previousPortion, setPreviousPortion] = useState<PortionSize | null>(null)

    function openResetDialog() {
        // Store current selections for potential undo
        setPreviousFood(selectedFood)
        setPreviousPortion(selectedPortion)
        setIsResetDialogOpen(true)
    }

    function resetVisualization() {
        form.reset({
            foodType: DEFAULT_FOOD_TYPE,
            portionSize: DEFAULT_PORTION_SIZE,
        })

        setSelectedFood(defaultFood)
        setSelectedPortion(defaultPortion)

        toast("Settings reset to defaults", {
            description: "Default food and portion size restored",
            action: {
                label: "Undo",
                onClick: () => {
                    if (previousFood && previousPortion) {
                        form.setValue("foodType", previousFood.id)
                        form.setValue("portionSize", previousPortion.id)
                        setSelectedFood(previousFood)
                        setSelectedPortion(previousPortion)
                        toast.success("Previous selection restored")
                    }
                },
            },
        })
    }

    // Get the current food object based on the selected food type
    const currentFood = foodData.find((f) => f.id === currentFoodType)

    // Validate that the current portion size exists for the current food
    const currentPortionSize = form.watch("portionSize")
    const isValidPortionSize = currentFood?.portions.some((p) => p.id === currentPortionSize)

    // Check if current selection is different from defaults
    const isDefaultSelection = currentFoodType === DEFAULT_FOOD_TYPE && currentPortionSize === DEFAULT_PORTION_SIZE

    return (
        <div className="max-w-3xl mx-auto">
            <Card className="bg-card text-card-foreground">
                <CardHeader>
                    <CardTitle>Select Food & Portion Size</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="foodType"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Food Type</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}
                                                    defaultValue={DEFAULT_FOOD_TYPE}>
                                                <SelectTrigger>
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {foodData.map((food) => (
                                                        <SelectItem key={food.id} value={food.id}>
                                                            {food.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="portionSize"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Portion Size</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}
                                                    defaultValue={DEFAULT_PORTION_SIZE}>
                                                <SelectTrigger>
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {currentFood?.portions.map((portion) => (
                                                        <SelectItem key={portion.id} value={portion.id}>
                                                            {portion.size}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button type="submit" className="flex-1" disabled={!isValidPortionSize}>
                                    Visualize Portion
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={openResetDialog}
                                    className="sm:w-10"
                                    title="Reset to defaults"
                                    disabled={isDefaultSelection}
                                >
                                    <RefreshCw className="h-4 w-4"/>
                                    <span className="sr-only">Reset to defaults</span>
                                </Button>
                            </div>

                            {!isValidPortionSize && (
                                <p className="text-sm text-destructive text-center">
                                    Please select a valid portion size for {currentFood?.name}
                                </p>
                            )}
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Visualization Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[700px] bg-background text-foreground">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedPortion?.size} of {selectedFood?.name}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedFood && selectedPortion &&
                        <PortionComparison food={selectedFood} portion={selectedPortion}/>}

                    {/* Mobile-friendly close button at the bottom */}
                    <div className="sm:hidden mt-6 pb-2">
                        <Button onClick={() => setIsDialogOpen(false)} className="w-full">
                            Close Visualization
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Reset Confirmation Dialog */}
            <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Reset to defaults?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will reset your food and portion size selections to the default values. Your current
                            selections will
                            be lost.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={resetVisualization}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Reset
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

