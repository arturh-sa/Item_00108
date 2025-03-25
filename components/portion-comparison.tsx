"use client"

import {useState, useEffect} from "react"
import Image from "next/image"
import type {FoodItem, PortionSize} from "@/lib/data"

interface PortionComparisonProps {
    food: FoodItem
    portion: PortionSize
}

export default function PortionComparison({food, portion}: PortionComparisonProps) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null
    }

    return (
        <div className="py-4 bg-background text-foreground">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col items-center">
                    <div className="relative w-48 h-48 mb-4">
                        <Image
                            src={food.image || `/placeholder.svg?height=192&width=192`}
                            alt={`${food.name}`}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <p className="text-center font-medium">
                        {portion.size} of {food.name}
                    </p>
                    <p className="text-center text-muted-foreground dark:text-gray-400">{portion.calories} calories</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="relative w-48 h-48 mb-4">
                        <Image
                            src={portion.comparisonObject.image || `/placeholder.svg?height=192&width=192`}
                            alt={portion.comparisonObject.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <p className="text-center font-medium">Looks like: {portion.comparisonObject.name}</p>
                    <p className="text-center text-muted-foreground dark:text-gray-400">{portion.comparisonObject.description}</p>
                </div>
            </div>

            <div className="flex justify-center border-t mt-6 pt-4">
                <p className="text-center text-sm text-muted-foreground dark:text-gray-400 max-w-md">
                    {portion.tip ||
                        `A ${portion.size} serving of ${food.name} is approximately the size of ${portion.comparisonObject.name}.`}
                </p>
            </div>
        </div>
    )
}

