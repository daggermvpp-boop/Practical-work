const recipes = [
    {
        id: 1,
        title: "Квантовый Стейк Рибай",
        category: "hot",
        categoryName: "Горячее",
        time: "25 мин",
        difficulty: "Уровень 4",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        description: "Строго секретный метод прожарки с использованием криогенной подготовки и фирменного маринада.",
        ingredients: [
            "Мраморная говядина (Рибай) — 400г",
            "Розмарин свежий — 2 ветки",
            "Чеснок — 3 зубчика",
            "Масло сливочное — 50г",
            "Секретная специя №7 — 5г"
        ],
        instructions: [
            "Произвести глубокую шоковую разморозку мяса до температуры камеры.",
            "Натереть стейк фирменной смесью специй и оставить под вакуумом на 10 минут.",
            "Обжаривать на раскаленной чугунной сковороде ровно по 90 секунд с каждой стороны.",
            "Добавить сливочное масло, розмарин и давленный чеснок, непрерывно поливая мясо.",
            "Дать 'отдохнуть' на деревянной доске в течение 5 минут перед подачей."
        ]
    },
    {
        id: 2,
        title: "Черный Трюфельный Суп-Пюре",
        category: "hot",
        categoryName: "Горячее",
        time: "40 мин",
        difficulty: "Уровень 3",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
        description: "Бархатистая текстура грибного крем-супа с добавлением выдержанного трюфельного экстракта.",
        ingredients: [
            "Лесные грибы (белые/шампиньоны) — 500г",
            "Сливки 33% — 200 мл",
            "Трюфельное масло — 10 мл",
            "Лук-шалот — 2 шт",
            "Овощной бульон — 400 мл"
        ],
        instructions: [
            "Обжарить мелко нарезанный лук-шалот на медленном огне до прозрачности.",
            "Добавить подготовленные грибы и тушить до полного выпаривания влаги.",
            "Влить овощной бульон и варить на слабом огне 15 минут.",
            "Пюрировать массу погружным блендером до состояния однородного шелка.",
            "Ввести сливки, довести до первых признаков кипения и заправить трюфельным маслом."
        ]
    },
    {
        id: 3,
        title: "Десерт 'Секрет Протокола'",
        category: "dessert",
        categoryName: "Десерты",
        time: "30 мин",
        difficulty: "Уровень 5",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
        description: "Многослойный шоколадный мусс с зеркальной глазурью и жидким цитрусовым центром.",
        ingredients: [
            "Темный шоколад 72% — 200г",
            "Жирные сливки для взбивания — 300 мл",
            "Апельсиновый фреш — 100 мл",
            "Желатин листовой — 6г",
            "Какао-порошок премиум — 30г"
        ],
        instructions: [
            "Замочить желатин в холодном апельсиновом соке.",
            "Растопить шоколад на водяной бане и аккуратно соединить со взбитыми сливками.",
            "Сформировать цилиндрические формы, заполнив центр цитрусовым желе.",
            "Заморозить заготовки в шок-камере в течение 2 часов.",
            "Покрыть зеркальной глазурью перед подачей."
        ]
    },
    {
        id: 4,
        title: "Коктейль 'Нулевой Меридиан'",
        category: "drink",
        categoryName: "Напитки",
        time: "10 мин",
        difficulty: "Уровень 2",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
        description: "Освежающий тонизирующий эликсир на основе синей матчи, цитрусов и газированного инфуза.",
        ingredients: [
            "Порошок синей матчи (Анчан) — 5г",
            "Тоник премиум-класса — 150 мл",
            "Сок лайма — 30 мл",
            "Сироп лемонграсса — 20 мл",
            "Пищевой кандурин (серебристый) — 0.1г"
        ],
        instructions: [
            "Заварить синюю матчу в небольшом количестве теплой воды до полного растворения.",
            "В высоком бокале смешать сок лайма и сироп лемонграсса со льдом.",
            "Аккуратно влить охлажденный тоник.",
            "Сверху влить концентрированный настой матчи для создания градиентного эффекта.",
            "Добавить пищевой кандурин для космического мерцания."
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('recipesGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('recipeModal');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');

    // Рендер карточек
    function renderRecipes(filter = 'all') {
        grid.innerHTML = '';
        const filtered = filter === 'all' ? recipes : recipes.filter(r => r.category === filter);

        filtered.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card scroll-reveal';
            card.innerHTML = `
                <div class="recipe-img-container">
                    <span class="recipe-category">${recipe.categoryName}</span>
                    <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
                </div>
                <div class="recipe-info">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <p class="recipe-desc">${recipe.description}</p>
                    <div class="recipe-meta">
                        <span>⏱ ${recipe.time}</span>
                        <span>🔒 ${recipe.difficulty}</span>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => openModal(recipe));
            grid.appendChild(card);
        });

        observeElements();
    }

    // Модальное окно
    function openModal(recipe) {
        modalBody.innerHTML = `
            <h2>${recipe.title}</h2>
            <p>${recipe.description}</p>
            <h4>Ингредиенты:</h4>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            <h4>Технология приготовления:</h4>
            <ol>
                ${recipe.instructions.map(ins => `<li>${ins}</li>`).join('')}
            </ol>
        `;
        modal.classList.add('active');
    }

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Фильтрация
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRecipes(btn.dataset.filter);
        });
    });

    // Scroll Reveal Observer
    function observeElements() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // Инициализация
    renderRecipes();
});