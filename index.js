const mealContainer = document.getElementById('meal-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('searchBtn');

function displayMeals(meals) {
    if (meals.length > 0) { // Corrected the spelling mistake: "lenght" to "length"
        const mealsHTML = meals.map(meal => `
        <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
          <div class="card">
            <img src="${meal.strMealThumb}"" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text"></p>
            </div>
          </div>
        </div>  
        </div>
                `).join('');

        mealContainer.innerHTML = mealsHTML;
    } else {
        mealContainer.innerHTML = "No meals found.";
    }
}

function fetchMealsByName(name) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const meals = data.meals;
            displayMeals(meals || []); // Handle the case when no meals are found
        })
        .catch(error => {
            console.error("Error fetching data", error);
            mealContainer.innerHTML = "An error occurred while fetching data.";
        });
}

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {
        fetchMealsByName(searchTerm);
    }
});

// Initial display of data
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //const meals = data.meals;
        //displayMeals(meals || []); // Handle the case when no meals are found
    })
    .catch(error => {
        console.error("Error fetching data", error);
       // mealContainer.innerHTML = "An error occurred while fetching data.";
    });