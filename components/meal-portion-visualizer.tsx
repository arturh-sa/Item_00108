"use client"

import {useState} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {toast} from "sonner"
import {z} from "zod"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog"
import {X} from "lucide-react"
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

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            foodType: DEFAULT_FOOD_TYPE,
            portionSize: DEFAULT_PORTION_SIZE,
        },
    })

    function onSubmit(data: FormValues) {
        const food = foodData.find((f) => f.id === data.foodType)
        if (!food) return

        const portion = food.portions.find((p) => p.id === data.portionSize)
        if (!portion) return

        setSelectedFood(food)
        setSelectedPortion(portion)
        setIsDialogOpen(true)

        toast.success("Portion visualization updated", {
            description: `Showing ${portion.size} of ${food.name}`,
        })
    }

    function resetVisualization() {
        toast("Visualization reset", {
            description: "Default values restored",
            action: {
                label: "Undo",
                onClick: () => {
                    form.setValue("foodType", selectedFood?.id || "")
                    form.setValue("portionSize", selectedPortion?.id || "")
                    setIsDialogOpen(true)
                    toast.success("Previous selection restored")
                },
            },
        })

        form.reset({
            foodType: DEFAULT_FOOD_TYPE,
            portionSize: DEFAULT_PORTION_SIZE,
        })

        setSelectedFood(defaultFood)
        setSelectedPortion(defaultPortion)
    }

    function closeDialog() {
        setIsDialogOpen(false)
    }

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
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                    // When food type changes, set portion to first available option
                                                    const newFood = foodData.find((f) => f.id === value)
                                                    if (newFood && newFood.portions.length > 0) {
                                                        form.setValue("portionSize", newFood.portions[0].id)
                                                    }
                                                }}
                                                value={field.value}
                                                defaultValue={DEFAULT_FOOD_TYPE}
                                            >
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
                                                    {foodData
                                                        .find((f) => f.id === form.watch("foodType"))
                                                        ?.portions.map((portion) => (
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

                            <Button type="submit" className="w-full">
                                Visualize Portion
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button variant="outline" onClick={resetVisualization}>
                        Reset
                    </Button>
                </CardFooter>
            </Card>

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
                    <DialogFooter className="sm:hidden mt-4 flex justify-center">
                        <Button onClick={closeDialog} className="w-full" variant="secondary">
                            <X className="h-4 w-4 mr-2"/>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

