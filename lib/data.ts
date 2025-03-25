export interface ComparisonObject {
    name: string
    description: string
    image: string
}

export interface PortionSize {
    id: string
    size: string
    calories: number
    comparisonObject: ComparisonObject
    tip?: string
}

export interface FoodItem {
    id: string
    name: string
    image?: string
    portions: PortionSize[]
}

export const foodData: FoodItem[] = [
    {
        id: "pasta",
        name: "Pasta",
        image: "/placeholder.svg?height=192&width=192",
        portions: [
            {
                id: "pasta-half-cup",
                size: "1/2 cup (cooked)",
                calories: 100,
                comparisonObject: {
                    name: "Tennis Ball",
                    description: "About the size of a tennis ball",
                    image: "/placeholder.svg?height=192&width=192",
                },
                tip: "A 1/2 cup serving of pasta is about the size of a tennis ball and contains approximately 100 calories.",
            },
            {
                id: "pasta-one-cup",
                size: "1 cup (cooked)",
                calories: 200,
                comparisonObject: {
                    name: "Baseball",
                    description: "About the size of a baseball",
                    image: "/placeholder.svg?height=192&width=192",
                },
                tip: "A 1 cup serving of pasta is about the size of a baseball and contains approximately 200 calories.",
            },
        ],
    },
    {
        id: "rice",
        name: "Rice",
        image: "/placeholder.svg?height=192&width=192",
        portions: [
            {
                id: "rice-half-cup",
                size: "1/2 cup (cooked)",
                calories: 100,
                comparisonObject: {
                    name: "Cupcake Wrapper",
                    description: "Fills a standard cupcake wrapper",
                    image: "/placeholder.svg?height=192&width=192",
                },
                tip: "A 1/2 cup serving of rice is about the amount that would fill a cupcake wrapper and contains approximately 100 calories.",
            },
            {
                id: "rice-one-cup",
                size: "1 cup (cooked)",
                calories: 200,
                comparisonObject: {
                    name: "Light Bulb",
                    description: "About the size of a standard light bulb",
                    image: "/placeholder.svg?height=192&width=192",
                },
                tip: "A 1 cup serving of rice is about the size of a standard light bulb and contains approximately 200 calories.",
            },
        ],
    },
    {
        id: "meat",
        name: "Meat",
        image: "/placeholder.svg?height=192&width=192",
        portions: [
            {
                id: "meat-3oz",
                size: "3 oz (cooked)",
                calories: 150,
                comparisonObject: {
                    name: "Deck of Cards",
                    description: "About the size of a deck of cards",
                    image: "/placeholder.svg?height=192&width=192",
                },
                tip: "A 3 oz serving of meat is about the size of a deck of cards and contains approximately 150 calories.",
            },
            {
                id: "meat-6oz",
                size: "6 oz (cooked)",
                calories: 300,
                comparisonObject: {
                    name: "Smartphone",
                    description: "About the size of a smartphone",
                    image: "/placeholder.svg?height=192&width=192",
                },
                tip: "A 6 oz serving of meat is about the size of a smartphone and contains approximately 300 calories.",
            },
        ],
    },
    {
        id: "vegetables",
        name: "Vegetables",
        image: "/placeholder.svg?height=192&width=192",
        portions: [
            {
                id: "vegetables-half-cup",
                size: "1/2 cup (cooked)",
                calories: 25,
                comparisonObject: {
                    name: "Light Bulb",
                    description: "About the size of a light bulb",
                    image: "/placeholder.svg?height=192&width=192",
                },
                tip: "A 1/2 cup serving of cooked vegetables is about the size of a light bulb and contains approximately 25 calories.",
            },
            {
                id: "vegetables-one-cup",
                size: "1 cup (raw)",
                calories: 30,
                comparisonObject: {
                    name: "Baseball",
                    description: "About the size of a baseball",
                    image: "/placeholder.svg?height=192&width=192",
                },
                tip: "A 1 cup serving of raw vegetables is about the size of a baseball and contains approximately 30 calories.",
            },
        ],
    },
    {
        id: "fruit",
        name: "Fruit",
        image: "/placeholder.svg?height=192&width=192",
        portions: [
            {
                id: "fruit-small",
                size: "1 small piece",
                calories: 60,
                comparisonObject: {
                    name: "Tennis Ball",
                    description: "About the size of a tennis ball",
                    image: "/placeholder.svg?height=192&width=192",
                },
                tip: "A small piece of fruit is about the size of a tennis ball and contains approximately 60 calories.",
            },
            {
                id: "fruit-medium",
                size: "1 medium piece",
                calories: 80,
                comparisonObject: {
                    name: "Baseball",
                    description: "About the size of a baseball",
                    image: "/placeholder.svg?height=192&width=192",
                },
                tip: "A medium piece of fruit is about the size of a baseball and contains approximately 80 calories.",
            },
        ],
    },
]

