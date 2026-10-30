// Prosta tablica zadań.
// Dane są na razie w tym pliku, później można je wziąć z bazy danych.

var zadania = [
    {
        id: 1,
        tytul: 'Zrobić diagram ERD',
        opis: 'Tabele users, tasks i comment',
        status: 'progress'
    },
    {
        id: 2,
        tytul: 'Zrobić makiety ekranów',
        opis: 'Lista zadań, formularz, logowanie',
        status: 'done'
    },
    {
        id: 3,
        tytul: 'Skonfigurować PostgreSQL',
        opis: 'Baza task_manager_db i skrypty SQL',
        status: 'todo'
    },
    {
        id: 4,
        tytul: 'Napisać README',
        opis: 'Opis projektu i instrukcja uruchomienia',
        status: 'done'
    },
    {
        id: 5,
        tytul: 'Podłączyć frontend do bazy',
        opis: 'Na razie dane są zapisane w pliku app.js',
        status: 'todo'
    }
];

var nastepneId = 6;
var edytowaneId = null;

var listaTodo = document.getElementById('lista-todo');
var listaProgress = document.getElementById('lista-progress');
var listaDone = document.getElementById('lista-done');

var pustoElements = {
    todo: document.getElementById('pusto-todo'),
    progress: document.getElementById('pusto-progress'),
    done: document.getElementById('pusto-done')
};

var liczniki = {
    todo: document.getElementById('licznik-todo'),
    progress: document.getElementById('licznik-progress'),
    done: document.getElementById('licznik-done')
};

var formularz = document.getElementById('formularz');
var formularzTytul = document.getElementById('formularzTytul');
var zadanieForm = document.getElementById('zadanieForm');
var poleTytul = document.getElementById('tytul');
var poleOpis = document.getElementById('opis');
var poleStatus = document.getElementById('status');
var blad = document.getElementById('blad');
var zapiszBtn = document.getElementById('zapiszBtn');
var szukaj = document.getElementById('szukaj');

var nazwyStatusow = {
    todo: 'Do zrobienia',
    progress: 'W trakcie',
    done: 'Zrobione'
};

// Pokazanie zadań na tablicy
function pokazZadania() {
    var szukanyTekst = szukaj.value.toLowerCase();

    listaTodo.innerHTML = '';
    listaProgress.innerHTML = '';
    listaDone.innerHTML = '';

    var policzone = { todo: 0, progress: 0, done: 0 };

    for (var i = 0; i < zadania.length; i++) {
        var zadanie = zadania[i];

        var tytul = zadanie.tytul.toLowerCase();
        var opis = zadanie.opis.toLowerCase();

        // Szukanie po tytule i opisie
        if (szukanyTekst !== '' && tytul.indexOf(szukanyTekst) === -1 && opis.indexOf(szukanyTekst) === -1) {
            continue;
        }

        var karta = utworzKarte(zadanie);

        if (zadanie.status === 'todo') {
            listaTodo.appendChild(karta);
            policzone.todo++;
        } else if (zadanie.status === 'progress') {
            listaProgress.appendChild(karta);
            policzone.progress++;
        } else {
            listaDone.appendChild(karta);
            policzone.done++;
        }
    }

    pokazLicznik('todo', policzone.todo);
    pokazLicznik('progress', policzone.progress);
    pokazLicznik('done', policzone.done);
}

// Licznik zadań w kolumnie
function pokazLicznik(status, ile) {
    liczniki[status].textContent = ile;

    if (ile === 0) {
        pustoElements[status].style.display = 'block';
    } else {
        pustoElements[status].style.display = 'none';
    }
}

// Jedna karta zadania
function utworzKarte(zadanie) {
    var karta = document.createElement('li');
    karta.className = 'zadanie';

    var tytul = document.createElement('h3');
    tytul.textContent = zadanie.tytul;

    var opis = document.createElement('p');
    if (zadanie.opis === '') {
        opis.textContent = 'Brak opisu';
    } else {
        opis.textContent = zadanie.opis;
    }

    var status = document.createElement('p');
    status.textContent = 'Status: ' + nazwyStatusow[zadanie.status];

    var edytujBtn = document.createElement('button');
    edytujBtn.type = 'button';
    edytujBtn.className = 'przycisk przycisk-jasny';
    edytujBtn.textContent = 'Edytuj';
    edytujBtn.addEventListener('click', function () {
        pokazFormularz(zadanie.id);
    });

    var usunBtn = document.createElement('button');
    usunBtn.type = 'button';
    usunBtn.className = 'przycisk przycisk-jasny';
    usunBtn.textContent = 'Usuń';
    usunBtn.addEventListener('click', function () {
        usunZadanie(zadanie.id);
    });

    karta.appendChild(tytul);
    karta.appendChild(opis);
    karta.appendChild(status);
    karta.appendChild(edytujBtn);
    karta.appendChild(usunBtn);

    return karta;
}

// Otworzenie formularza
function pokazFormularz(id) {
    formularz.classList.add('pokaz');
    blad.classList.remove('pokaz');

    if (id === null) {
        edytowaneId = null;
        formularzTytul.textContent = 'Dodaj zadanie';
        zapiszBtn.textContent = 'Dodaj';
        zadanieForm.reset();
    } else {
        edytowaneId = id;

        var zadanie = znajdzZadanie(id);

        formularzTytul.textContent = 'Edytuj zadanie';
        zapiszBtn.textContent = 'Zapisz';
        poleTytul.value = zadanie.tytul;
        poleOpis.value = zadanie.opis;
        poleStatus.value = zadanie.status;
    }
}

function ukryjFormularz() {
    formularz.classList.remove('pokaz');
    edytowaneId = null;
    zadanieForm.reset();
}

function znajdzZadanie(id) {
    for (var i = 0; i < zadania.length; i++) {
        if (zadania[i].id === id) {
            return zadania[i];
        }
    }

    return null;
}

function usunZadanie(id) {
    if (!confirm('Usunąć to zadanie?')) {
        return;
    }

    var nowaLista = [];

    for (var i = 0; i < zadania.length; i++) {
        if (zadania[i].id !== id) {
            nowaLista.push(zadania[i]);
        }
    }

    zadania = nowaLista;

    if (edytowaneId === id) {
        ukryjFormularz();
    }

    pokazZadania();
}

// Zapis zadania z formularza
zadanieForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var tytul = poleTytul.value.trim();

    if (tytul === '') {
        blad.classList.add('pokaz');
        return;
    }

    if (edytowaneId === null) {
        zadania.push({
            id: nastepneId,
            tytul: tytul,
            opis: poleOpis.value.trim(),
            status: poleStatus.value
        });

        nastepneId++;
    } else {
        var zadanie = znajdzZadanie(edytowaneId);

        zadanie.tytul = tytul;
        zadanie.opis = poleOpis.value.trim();
        zadanie.status = poleStatus.value;
    }

    ukryjFormularz();
    pokazZadania();
});

document.getElementById('dodajBtn').addEventListener('click', function () {
    pokazFormularz(null);
});

document.getElementById('anulujBtn').addEventListener('click', function () {
    ukryjFormularz();
});

szukaj.addEventListener('input', function () {
    pokazZadania();
});

// Start
pokazZadania();
