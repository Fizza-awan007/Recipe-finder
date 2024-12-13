import React, { useState } from "react";
import IngredientsList from "../components/IngredientsList";
import ClaudeRecipe from "../components/ClaudeRecipe";
import { getRecipeFromMistral } from "./ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipeShown, setRecipeShown] = React.useState(false);
  const [newIngredient, setNewIngredient] = useState("");
  const [loading, setLoading] = React.useState(false);

  // async function getRecipe() {
  //   const recipeMarkdown = await getRecipeFromMistral(ingredients);
  //   console.log("ark downn-------", recipeMarkdown);
  //   setRecipeShown(recipeMarkdown);
  // }

  async function getRecipe() {
    setLoading(true);
    try {
      const recipeMarkdown = await getRecipeFromMistral(ingredients);
      console.log("Recipe Markdown:", recipeMarkdown);
      setRecipeShown(recipeMarkdown);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setLoading(false);
    }
  }

  const addIngredient = (e) => {
    e.preventDefault();

    // Trim the ingredient and prevent adding empty or duplicate ingredients
    const trimmedIngredient = newIngredient.trim();
    if (trimmedIngredient && !ingredients.includes(trimmedIngredient)) {
      setIngredients((prevIngredients) => [
        ...prevIngredients,
        trimmedIngredient,
      ]);
      // Clear the input after adding
      setNewIngredient("");
    }
  };
  return (
    <main className="p-4 max-w-md mx-auto">
      <form onSubmit={(e) => addIngredient(e)} className="flex mb-4">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          className="flex-grow mr-2 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add ingredient
        </button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}

      {recipeShown && <ClaudeRecipe recipeShown={recipeShown} />}

      {loading ? (
        <p className="bg-green-500 text-white px-4 py-2 rounded">
          Loading recipe...
        </p>
      ) : (
        recipeShown && <ClaudeRecipe recipeShown={recipeShown} />
      )}
    </main>
  );
}
