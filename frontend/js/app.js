// Данные рецептов
var recipes = [
    {
        id: 1,
        title: 'Стейк с розмарином',
        category: 'hot',
        categoryName: 'Основное блюдо',
        time: '25 минут',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        description: 'Стейк с розмарином и сливочным маслом. Хорошо подходит для ужина.',
        ingredients: [
            'Стейки из говядины — 2 шт.',
            'Розмарин — 2 веточки',
            'Чеснок — 2 зубчика',
            'Сливочное масло — 30 г',
            'Соль и перец — по вкусу'
        ],
        instructions: [
            'Достаньте мясо из холодильника за 20 минут до готовки и обсушите.',
            'Посолите и поперчите стейки с двух сторон.',
            'Разогрейте сковороду и жарьте по 2–4 минуты с каждой стороны.',
            'Добавьте масло, розмарин и чеснок, полейте стейки маслом.',
            'Дайте мясу отдохнуть 5 минут и подавайте.'
        ]
    },
    {
        id: 2,
        title: 'Грибной крем-суп',
        category: 'hot',
        categoryName: 'Основное блюдо',
        time: '40 минут',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
        description: 'Простой суп из шампиньонов со сливками.',
        ingredients: [
            'Шампиньоны — 400 г',
            'Сливки — 200 мл',
            'Сливочное масло — 20 г',
            'Лук — 1 шт.',
            'Вода или бульон — 500 мл'
        ],
        instructions: [
            'Нарежьте лук и обжарьте его на масле до мягкости.',
            'Добавьте нарезанные грибы и готовьте 8 минут.',
            'Влейте воду или бульон и варите 15 минут.',
            'Измельчите суп блендером.',
            'Добавьте сливки, соль и перец, прогрейте суп.'
        ]
    },
    {
        id: 3,
        title: 'Шоколадный мусс',
        category: 'dessert',
        categoryName: 'Десерт',
        time: '30 минут',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        description: 'Шоколадный десерт со сливками и апельсином.',
        ingredients: [
            'Тёмный шоколад — 150 г',
            'Сливки — 250 мл',
            'Апельсин — 1 шт.',
            'Сахарная пудра — по желанию',
            'Какао — для подачи'
        ],
        instructions: [
            'Снимите с апельсина немного цедры.',
            'Растопите шоколад на водяной бане и дайте остыть.',
            'Взбейте сливки и аккуратно добавьте шоколад и цедру.',
            'Разложите по стаканчикам и уберите в холодильник на 2 часа.',
            'Перед подачей посыпьте какао.'
        ]
    },
    {
        id: 4,
        title: 'Лимонад с лаймом',
        category: 'drink',
        categoryName: 'Напиток',
        time: '10 минут',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
        description: 'Домашний лимонад с лаймом и мятой.',
        ingredients: [
            'Лайм — 1 шт.',
            'Газированная вода — 400 мл',
            'Мята — несколько веточек',
            'Сахар или мёд — 1–2 ч. ложки',
            'Лёд — по вкусу'
        ],
        instructions: [
            'Выжмите сок лайма в кувшин и добавьте сахар или мёд.',
            'Разомните мяту ложкой.',
            'Добавьте лёд и залейте газированной водой.',
            'Перемешайте и попробуйте на вкус.',
            'Подавайте сразу.'
        ]
    }
];

var list = document.getElementById('recipes');
var modal = document.getElementById('recipeModal');
var modalBody = document.getElementById('modalBody');
var closeButton = document.getElementById('modalClose');
var filterButtons = document.querySelectorAll('.filter-btn');

// Показать карточки рецептов
function showRecipes(filter) {
    list.innerHTML = '';

    recipes.forEach(function (recipe) {
        if (filter !== 'all' && recipe.category !== filter) {
            return;
        }

        var card = document.createElement('div');
        card.className = 'recipe-card';

        var img = document.createElement('img');
        img.className = 'recipe-img';
        img.src = recipe.image;
        img.alt = recipe.title;

        var title = document.createElement('h3');
        title.className = 'recipe-title';
        title.textContent = recipe.title;

        var category = document.createElement('p');
        category.className = 'recipe-category';
        category.textContent = recipe.categoryName + ' · ' + recipe.time;

        var description = document.createElement('p');
        description.className = 'recipe-desc';
        description.textContent = recipe.description;

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(category);
        card.appendChild(description);

        card.addEventListener('click', function () {
            openRecipe(recipe);
        });

        list.appendChild(card);
    });
}

// Открыть рецепт
function openRecipe(recipe) {
    var html = '<h2>' + recipe.title + '</h2>';
    html += '<p>' + recipe.description + '</p>';

    html += '<h3>Ингредиенты</h3><ul>';
    recipe.ingredients.forEach(function (item) {
        html += '<li>' + item + '</li>';
    });
    html += '</ul>';

    html += '<h3>Приготовление</h3><ol>';
    recipe.instructions.forEach(function (step) {
        html += '<li>' + step + '</li>';
    });
    html += '</ol>';

    modalBody.innerHTML = html;
    modal.classList.add('active');
}

// Закрыть окно рецепта
function closeRecipe() {
    modal.classList.remove('active');
}

closeButton.addEventListener('click', closeRecipe);

modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        closeRecipe();
    }
});

// Кнопки фильтров
filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        filterButtons.forEach(function (item) {
            item.classList.remove('active');
        });

        button.classList.add('active');
        showRecipes(button.getAttribute('data-filter'));
    });
});

// Запуск
showRecipes('all');
