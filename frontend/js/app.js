const recipes = [
    {
        id: 1,
        title: "Kwantowy Stek Ribeye",
        category: "hot",
        categoryName: "Dania główne",
        time: "25 min",
        difficulty: "Poziom 4",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        description: "Ściśle tajna metoda obróbki cieplnej z użyciem marynaty kriogenicznej oraz kontrolowanej karmelizacji.",
        ingredients: [
            "Sezonowana wołowina (Ribeye) — 400g",
            "Świeży rozmaryn — 2 gałązki",
            "Czosnek — 3 ząbki",
            "Masło skondensowane — 50g",
            "Autorska mieszanka przypraw nr 7 — 5g"
        ],
        instructions: [
            "Doprowadzić mięso do temperatury pokojowej w komorze próżniowej.",
            "Natarć stek kompozycją przypraw i pozostawić na 10 minut.",
            "Smażyć na ekstremalnie rozgrzanej żeliwnej patelni dokładnie po 90 sekund z każdej strony.",
            "Dodać masło, rozmaryn i zmiażdżony czosnek, stale polewając powierzchnię.",
            "Odłożyć na drewnianą deskę na 5 minut przed porcjowaniem."
        ]
    },
    {
        id: 2,
        title: "Krem z Czarnych Trufli",
        category: "hot",
        categoryName: "Dania główne",
        time: "40 min",
        difficulty: "Poziom 3",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
        description: "Aksamitna struktura grzybowa wzbogacona ekstraktem z czarnych trufli oraz redukcją śmietankową.",
        ingredients: [
            "Grzyby leśne selekcjonowane — 500g",
            "Śmietanka 33% — 200 ml",
            "Oliwa truflowa — 10 ml",
            "Szalotka — 2 szt.",
            "Bulion warzywny skondensowany — 400 ml"
        ],
        instructions: [
            "Zeszklić posiekaną szalotkę na wolnym ogniu bez zmiany koloru.",
            "Dodać oczyszczone grzyby i dużać do całkowitego odparowania płynu.",
            "Wlać bulion i gotować na małym ogniu przez 15 minut.",
            "Zblendować masę na gładką, aksamitną emulsję.",
            "Wprowadzić śmietankę, doprowadzić do wrzenia i skropić oliwą truflową."
        ]
    },
    {
        id: 3,
        title: "Deser 'Protokół Omega'",
        category: "dessert",
        categoryName: "Desery",
        time: "30 min",
        difficulty: "Poziom 5",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
        description: "Wielowarstwowy mus czekoladowy z lustrzaną polewą i płynnym cytrusowym wnętrzem.",
        ingredients: [
            "Czekolada gorzka 72% — 200g",
            "Śmietanka do ubijania — 300 ml",
            "Świeży sok pomarańczowy — 100 ml",
            "Żelatyna w liściach — 6g",
            "Kakao alkalizowane premium — 30g"
        ],
        instructions: [
            "Zreumować żelatynę w schłodzonym soku cytrusowym.",
            "Rozpuścić czekoladę w kąpieli wodnej i delikatnie połączyć z ubitą śmietanką.",
            "Uformować cylindryczne struktury z płynnym środkiem.",
            "Poddać szybkiego mrożeniu w komorze szokowej przez 2 godziny.",
            "Pokryć lustrzaną glazurą bezpośrednio przed wydaniem."
        ]
    },
    {
        id: 4,
        title: "Eliksir 'Zero Meridian'",
        category: "drink",
        categoryName: "Eksperymenty Płynne",
        time: "10 min",
        difficulty: "Poziom 2",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
        description: "Orzeźwiający napój tonizujący na bazie niebieskiej matchy, cytrusów oraz nasyconego infuzu.",
        ingredients: [
            "Ekstrakt niebieskiej matchy (Anchan) — 5g",
            "Tonik rzemieślniczy — 150 ml",
            "Sok z limonki — 30 ml",
            "Syrop z trawy cytrynowej — 20 ml",
            "Kanduryna spożywcza (srebrna) — 0.1g"
        ],
        instructions: [
            "Rozpuścić matchę w niewielkiej objętości ciepłej wody.",
            "W wysokiej szklance połączyć sok z limonki i syrop z lodem.",
            "Dolać schłodzony tonik rzemieślniczy.",
            "Wprowadzić skoncentrowany napar z matchy dla uzyskania efektu warstwowego.",
            "Dodać bezpieczny barwnik mineralny dla metalicznego połysku."
        ]
    },
    {
        id: 5,
        title: "Łosoś w Sferycznej Skórce",
        category: "hot",
        categoryName: "Dania główne",
        time: "35 min",
        difficulty: "Poziom 4",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
        description: "Delikatny filet z dzikiego łososia pieczony w ziołowej skorupce z cytrusową nutą.",
        ingredients: [
            "Filet z łososia — 500g",
            "Świeży koper i kolendra — 50g",
            "Skórka z jednej cytryny",
            "Oliwa z oliwek extra virgin — 30 ml",
            "Sól morska gruboziarnista — 10g"
        ],
        instructions: [
            "Przygotować ziołową pastę z koprem, kolendrą, oliwą i skórką cytrynową.",
            "Pokryć filet równomierną warstwą aromatycznej mieszanki.",
            "Piec w piecu konwekcyjnym w temperaturze 180°C przez 18 minut.",
            "Odstawić na 3 minuty przed podaniem w celu ustabilizowania soków."
        ]
    },
    {
        id: 6,
        title: "Ravioli z Konfitowaną Kaczką",
        category: "hot",
        categoryName: "Dania główne",
        time: "50 min",
        difficulty: "Poziom 5",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
        description: "Ręcznie robione pierożki nadziewane szarpaną kaczką w sosie pomarańczowo-tymiankowym.",
        ingredients: [
            "Mąka durum — 300g",
            "Żółtka jaj — 6 szt.",
            "Mięso z konfitowanej kaczki — 300g",
            "Ś świeży tymianek — 3 gałązki",
            "Sok pomarańczowy redukowany — 100 ml"
        ],
        instructions: [
            "Wyrobić elastyczne ciasto makaronowe z mąki i żółtek.",
            "Nadziewać drobno posiekaną, soczystą kaczką z tymiankiem.",
            "Gotować w osolonym wrzątku przez 3-4 minuty.",
            "Podawać polane redukcją pomarańczową."
        ]
    },
    {
        id: 7,
        title: "Sferyczny Przystanek Mango",
        category: "dessert",
        categoryName: "Desery",
        time: "40 min",
        difficulty: "Poziom 5",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
        description: "Deser sferificowany z mango i marakui, imitujący egzotyczną kapsułkę smaku.",
        ingredients: [
            "Purée z mango — 200 ml",
            "Mleczan wapnia — 2g",
            "Alginian sodu — 1.5g (na kąpiel wodną)",
            "Świeża marakuja — 2 szt."
        ],
        instructions: [
            "Wymieszać purée z mango z mleczanem wapnia i schłodzić.",
            "Przygotować roztwór alginianu sodu w wodzie destylowanej.",
            "Formować sferyczne struktury, zanurzając porcje purée w kąpieli.",
            "Przepłukać w czystej wodzie przed serwowaniem."
        ]
    },
    {
        id: 8,
        title: "Koktajl 'Ametystowy Azot'",
        category: "drink",
        categoryName: "Eksperymenty Płynne",
        time: "15 min",
        difficulty: "Poziom 3",
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
        description: "Dymiący koktajl z owoców leśnych z dodatkiem infuzowanego bazy botanicznej.",
        ingredients: [
            "Sok z czarnej porzeczki — 150 ml",
            "Syrop z czarnego bzu — 30 ml",
            "Sok z cytryny — 20 ml",
            "Granulat ciekłego azotu do efektu dymienia — 10g"
        ],
        instructions: [
            "Wstrząsnąć składniki w shakerze z lodem.",
            "Przecedzić do schłodzonego kieliszka laboratoryjnego.",
            "Bezpośrednio przed podaniem zaaplikować bezpieczny efekt mgły azotowej."
        ]
    },
    {
        id: 9,
        title: "Carpaccio z Pieczonych Buraków",
        category: "hot",
        categoryName: "Dania główne",
        time: "45 min",
        difficulty: "Poziom 2",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
        description: "Cienko krojone carpaccio z karmelizowanych buraków z serem kozim i orzechami włoskimi.",
        ingredients: [
            "Buraki podłużne — 3 szt.",
            "Kozio ser dojrzewający — 100g",
            "Orzechy włoskie prażone — 40g",
            "Ocet balsamiczny z Modeny — 20 ml",
            "Oliwa rzepakowa tłoczona na zimno — 30 ml"
        ],
        instructions: [
            "Upiec buraki w całości w soli gruboziarnistej przez 40 minut.",
            "Schłodzić, obrać i pokroić na mandolinie w ultracienkie plastry.",
            "Ułożyć na talerzu, posypać pokruszonym serem kozim i orzechami.",
            "Skropić redukcją octu balsamicznego i oliwą."
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('recipesGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('recipeModal');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');
    const cursorGlow = document.getElementById('cursorGlow');

    // Интерактивное свечение за курсором
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    // Рендер карточек
    function renderRecipes(filter = 'all') {
        grid.innerHTML = '';
        const filtered = filter === 'all' ? recipes : recipes.filter(r => r.category === filter);

        filtered.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card scroll-reveal-3d';
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
            <h4>Składniki:</h4>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            <h4>Technologia przygotowania:</h4>
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

    // 3D Scroll Reveal Observer
    function observeElements() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.scroll-reveal-3d').forEach(el => {
            observer.observe(el);
        });
    }

    renderRecipes();
});