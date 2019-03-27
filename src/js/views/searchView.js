import {elements} from './base';


export const getInput = () => elements.searchInput.value;

//Clears the input of the user
export const clearInput = () => {
    elements.searchInput.value = '';
};

//Clears the results for the next batch of results
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('result__link--active');
    });

    document.querySelector(`a[href="#${id}"]`).classList.add('result__link--active');
}

//Algorithm that shortens the title of a recipe
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

//Inserts the recipie: title, image, publisher into inner html
const renderRecipe = recipe => {
    const markup = `
                <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;
    elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (page, type) => `

<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
</button>

            <!--
                <button class="btn-inline results__btn--prev">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-left"></use>
                    </svg>
                    <span>Page 1</span>
                </button>
                <button class="btn-inline results__btn--next">
                    <span>Page 3</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                     </svg>
                </button>
            -->
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;

    if (page === 1 && pages > 1) {
       button = createButton(page, 'next');
    } else if (page < pages){
        button = `
        createButton(page, 'prev')
        createButton(page, 'next')
        `;
    } else if (page = pages && pages > 1) {
        button = createButton(page, 'prev');

    }

    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
}

// Foreach cycle that inserts the recipies 30 times
export const renderResults = (recipies, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipies.slice(start, end).forEach(renderRecipe);

    renderButtons(page, recipies.length, resPerPage);
};