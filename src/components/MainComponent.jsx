import React, { useState } from "react"
import IngredientsList from "./IngredientsList"
import ChefRecipe from "./ChefRecipe"
import { getRecipeFromMistral } from "../ai"

export default function MainComponent() {
    const [ingredients, setIngredients] = useState(
        []
    )
    const [recipe, setRecipe] = useState("")
    const [loading, setLoading] = useState(false) 
    const recipeSection = React.useRef(null)

    React.useEffect(() => {
        if (loading && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [loading])

    async function getRecipe() {
        setLoading(true)
        setRecipe("")

        try {
            const recipeMarkdown = await getRecipeFromMistral(ingredients)
            setRecipe(recipeMarkdown)
        } catch (err) {
            setRecipe("Error fetching recipe")
        } finally {
            setLoading(false)
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        if (newIngredient && !ingredients.includes(newIngredient)) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {loading && (
                <p>
                    Chef is pondering...
                    <span className="spinner"></span>
                </p>
            )}
            {recipe && <ChefRecipe recipe={recipe} />}
        </main>
    )
}