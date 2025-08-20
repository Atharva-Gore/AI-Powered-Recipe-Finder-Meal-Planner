// 🔑 Your RapidAPI credentials
const RAPIDAPI_KEY = "71b5b10b29mshe42540d0b985d95p12a5d1jsnf6c444b89932";
const RAPIDAPI_HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

// Search Recipes by Ingredients
async function fetchRecipes() {
  const ingredients = document.getElementById("ingredients").value.trim();
  if (!ingredients) {
    alert("Please enter some ingredients!");
    return;
  }

  const url = `https://${RAPIDAPI_HOST}/recipes/findByIngredients?ingredients=${ingredients}&number=6`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST,
      },
    });

    const data = await res.json();
    displayRecipes(data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    alert("Failed to fetch recipes. Try again later.");
  }
}

// Get Random Recipes (Surprise Me)
async function fetchRandomRecipes() {
  const url = `https://${RAPIDAPI_HOST}/recipes/random?number=3`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST,
      },
    });

    const data = await res.json();
    displayRecipes(data.recipes);
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    alert("Failed to fetch random recipes.");
  }
}

// Display Recipes in the UI
function displayRecipes(recipes) {
  const container = document.getElementById("recipes");
  container.innerHTML = "";

  if (!recipes || recipes.length === 0) {
    container.innerHTML = "<p>No recipes found. Try different ingredients!</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className =
      "bg-white shadow-md rounded-2xl p-4 m-2 w-72 hover:shadow-xl transition";

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="rounded-xl mb-3 w-full h-40 object-cover">
      <h3 class="font-bold text-lg mb-2">${recipe.title}</h3>
      <a href="https://spoonacular.com/recipes/${recipe.title
        .toLowerCase()
        .replace(/ /g, "-")}-${recipe.id}" 
        target="_blank" 
        class="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
        View Recipe
      </a>
    `;

    container.appendChild(card);
  });
}

// Attach event listeners
document.getElementById("searchBtn").addEventListener("click", fetchRecipes);
document.getElementById("randomBtn").addEventListener("click", fetchRandomRecipes);
