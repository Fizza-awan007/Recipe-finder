export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));
  return (
    <section>
      <h2 className="text-xl font-bold mb-2">Ingredients on hand:</h2>
      <ul className="ingredients-list mb-4" aria-live="polite">
        {ingredientsListItems}
      </ul>

      {props.ingredients.length > 3 && (
        <div className="get-recipe-container bg-gray-100 p-4 rounded">
          <div className="mb-3">
            <h3 className="text-lg font-semibold">Ready for a recipe?</h3>
            <p className="text-gray-600">
              Generate a recipe from your list of ingredients.
            </p>
          </div>
          <button
            onClick={props.getRecipe}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={props.loading}
          >
            {props.loading ? "Loading..." : "Get a recipe"}
          </button>
        </div>
      )}
    </section>
  );
}
