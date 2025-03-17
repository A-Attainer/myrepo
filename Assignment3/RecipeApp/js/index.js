const BASE_URL = 'https://gist.githubusercontent.com/abdalabaaji/8ac1f0ff9c9e919c72c5f297a9b5266e/raw/a67887ba7445a6887be4c748fcfa0931f0dd165c/recipes';
const RECIPES_KEY = 'recipes';

// Load recipes from API or Local Storage
async function loadRecipes() {
    let recipes = JSON.parse(localStorage.getItem(RECIPES_KEY)) || [];

    if (recipes.length === 0) {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) throw new Error('Failed to fetch recipes');
            recipes = await response.json();
            localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    }

    displayRecipes(recipes);
}

// Display recipes in the grid view
function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" class="card-img" />
            <div class="description">
                <h1>${recipe.name}</h1>
                <hr>
                <h2>Ingredients</h2>
                <p class="instructions">${recipe.ingredients}</p>
                <h2>Instructions</h2>
                <p class="instructions">${recipe.instructions}</p>
            </div>
            <div class="action-btns">
                <button class="btn-update" onclick="loadEditPage(${index})"><i class="fa fa-pencil">Update</i></button>
                <button class="btn-delete" onclick="deleteRecipe(${index})"><i class="fa fa-trash">Delete</i></button>
            </div>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}

// Load the edit page with the selected recipe
function loadEditPage(index) {
    const recipes = JSON.parse(localStorage.getItem(RECIPES_KEY));
    const recipe = recipes[index];
    localStorage.setItem('editIndex', index);
    loadPage('edit_page.html');
}

// Delete a recipe
function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem(RECIPES_KEY));
    recipes.splice(index, 1);
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
    loadRecipes();
}

// Handle form submission for adding/updating recipes
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-recipe-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const recipe = {
                name: document.getElementById('recipe-name').value,
                image: document.getElementById('recipe-img').value,
                ingredients: document.getElementById('recipe-ingredients').value,
                instructions: document.getElementById('recipe-instructions').value,
            };

            let recipes = JSON.parse(localStorage.getItem(RECIPES_KEY)) || [];
            const editIndex = localStorage.getItem('editIndex');

            if (editIndex !== null) {
                recipes[editIndex] = recipe; // Update existing recipe
                localStorage.removeItem('editIndex');
            } else {
                recipes.push(recipe); // Add new recipe
            }

            localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
            window.location.href = '/'; // Redirect to home page
        });
    }
});

// Load the initial page
document.addEventListener('DOMContentLoaded', loadRecipes);

// Load a new page dynamically
async function loadPage(pageUrl) {
    const mainContent = document.getElementById('main-content');
    const page = await fetch(pageUrl);
    const pageHTMLContent = await page.text();
    mainContent.innerHTML = pageHTMLContent;

    if (pageUrl === 'edit_page.html') {
        const editIndex = localStorage.getItem('editIndex');
        if (editIndex !== null) {
            const recipes = JSON.parse(localStorage.getItem(RECIPES_KEY));
            const recipe = recipes[editIndex];
            document.getElementById('recipe-name').value = recipe.name;
            document.getElementById('recipe-img').value = recipe.image;
            document.getElementById('recipe-ingredients').value = recipe.ingredients;
            document.getElementById('recipe-instructions').value = recipe.instructions;
        }
    }
}