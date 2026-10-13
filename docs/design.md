# Design aplikacji TaskNest

Aplikacja webowa do zarządzania zadaniami (HTML, CSS, JavaScript, PHP), przeznaczona głównie na komputer.
Styl: **ścisły i prosty**. Ciemny motyw, mało ozdób, małe zaokrąglenia (8 px), czytelne tabele i formularze.

![Logo](logo.svg)

## 1. Makiety ekranów

Makieta jest wykonana w Figmie: **[TaskNest - Design (makiety)](https://www.figma.com/design/La47nnBjcppw2h4ttijSLB)**

Eksporty pięciu ekranów (PNG) znajdują się w katalogu [`design/`](../design/):

| Plik | Ekran |
|---|---|
| `design/01-logowanie.png` | Logowanie |
| `design/02-rejestracja.png` | Rejestracja |
| `design/03-lista-zadan.png` | Lista zadań |
| `design/04-dodaj-zadanie.png` | Formularz dodania zadania |
| `design/05-edytuj-zadanie.png` | Formularz edycji zadania |

Układ jest przygotowany pod ekran komputera (1440 × 900 px). Zawartość jest wyśrodkowana w kolumnie: 960 px dla listy, 640 px dla formularza i 440 px dla logowania i rejestracji.

### Logowanie i rejestracja
- Karta na środku ekranu: logo, tytuł, pola **E-mail** i **Hasło** (przy rejestracji dodatkowo **Powtórz hasło**).
- Jeden główny przycisk oraz link do drugiego ekranu (*Zarejestruj się* / *Zaloguj się*).

### Lista zadań
- Pasek górny: logo, adres e-mail użytkownika i przycisk **Wyloguj**.
- Nagłówek strony z licznikiem zadań i przyciskiem **Nowe zadanie**.
- Tabela z kolumnami: *Zadanie, Termin, Priorytet, Status, Akcje*. Zadanie wykonane ma zaznaczone pole wyboru i przekreślony tytuł.
- Akcje w wierszu: **Edytuj** i **Usuń**.
- Filtrów i wyszukiwarki nie ma, ponieważ aplikacja ma być prosta.

### Formularz dodania i edycji
- Link **Wróć do listy** i tytuł ekranu (*Nowe zadanie* albo *Edytuj zadanie*).
- Pola: **Tytuł** (wymagane), **Opis**, **Termin**, **Priorytet** (Niski / Średni / Wysoki).
- Przyciski: **Anuluj** i **Zapisz zadanie**; w trybie edycji dodatkowo **Usuń zadanie**.

## 2. Paleta kolorów

| Rola | Nazwa | HEX | Zastosowanie |
|---|---|---|---|
| Główny | Main | `#5D536B` | przyciski główne, aktywny filtr, zaznaczone pole wyboru |
| Dodatkowy | Secondary | `#7D6B91` | obramowania pól i przycisków, ikony, akcenty |
| Tło | Background | `#272838` | tło aplikacji |
| Tekst | Text | `#DADAFF` | nagłówki i treść |

Kolory pomocnicze (pochodne od palety, potrzebne do stanów i kart):

| Nazwa | HEX | Zastosowanie |
|---|---|---|
| Surface | `#31334A` | tło kart i pól formularzy |
| Muted | `#A99BC0` | tekst pomocniczy, placeholdery |
| Error | `#FF9AA8` | błędy, wysoki priorytet |
| Warning | `#F2D49A` | średni priorytet |
| Success | `#8FD6B0` | niski priorytet, sukces |

Tokeny CSS gotowe do użycia w aplikacji: [`tokens.css`](tokens.css).

### Kontrast (WCAG, sprawdzone według wzoru z webaim.org)

| Para kolorów | Kontrast | Wynik | Użycie |
|---|---|---|---|
| Tekst `#DADAFF` na tle `#272838` | **10,68 : 1** | AAA | cała treść |
| Tekst `#DADAFF` na głównym `#5D536B` | **5,30 : 1** | AA | tekst na przyciskach |
| Tekst `#DADAFF` na karcie `#31334A` | 9,07 : 1 | AAA | treść kart |
| Muted `#A99BC0` na tle `#272838` | 5,62 : 1 | AA | tekst pomocniczy |
| Muted `#A99BC0` na karcie `#31334A` | 4,78 : 1 | AA | opisy w kartach |
| Dodatkowy `#7D6B91` na tle `#272838` | 3,03 : 1 | AA dla elementów UI (min. 3:1) | obramowania, ikony |
| Error / Warning / Success na tle | 7,22 / 10,13 / 8,58 : 1 | AA | etykiety priorytetu |

Uwagi:
- Kolor dodatkowy `#7D6B91` ma z tekstem tylko 3,53 : 1, więc **nie używamy go jako koloru tekstu**. Służy do obramowań i ikon, a tekst pomocniczy ma kolor Muted.
- Kolor główny `#5D536B` jest zbyt blisko tła (2,01 : 1), żeby sam wyznaczał krawędź przycisku, dlatego przyciski mają dodatkowe obramowanie `#7D6B91`.
- Znaczenie nie zależy tylko od koloru: priorytet ma też podpis tekstowy, zadanie zrobione jest przekreślone.

## 3. Czcionki (Google Fonts)

| Użycie | Czcionka | Wagi |
|---|---|---|
| Nagłówki | **Space Grotesk** | 500, 700 |
| Treść | **Manrope** | 400, 600, 700 |

Dlaczego:
- **Space Grotesk** (nagłówki) ma wyrazisty, nowoczesny charakter, który odróżnia aplikację od typowych "domyślnych" fontów, a przy tym jest czytelny w dużych rozmiarach.
- **Manrope** (treść) jest prostym, bardzo czytelnym fontem bezszeryfowym, dobrze wygląda w małych rozmiarach i na ciemnym tle.
- Obie czcionki obsługują polskie znaki (ą, ć, ę, ł, ń, ó, ś, ź, ż).
- Oba fonty są darmowe (licencja OFL), a jako zapas są fonty systemowe (`Segoe UI`, `Arial`, `sans-serif`).
- Dwa różne kroje (geometryczny nagłówek i neutralna treść) dają wyraźną hierarchię bez dodatkowych ozdób.

Podłączenie w HTML:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
```

Skala rozmiarów: tytuł ekranu 28 px, nagłówek sekcji 20 px, treść 16 px, tekst pomocniczy 14 px, etykiety 12 px. Zalecana długość linii: poniżej 80 znaków.

## 4. Logo

| Wersja | Plik |
|---|---|
| Logo z nazwą | [`logo.svg`](logo.svg) |
| Sama ikona (np. favicon) | [`logo-icon.svg`](logo-icon.svg) |

![Ikona](logo-icon.svg)

Znak to zaokrąglony kwadrat w kolorze głównym z obramowaniem w kolorze dodatkowym i znacznikiem "ptaszek" w kolorze tekstu. Ptaszek oznacza wykonane zadanie, a zaokrąglony kształt pasuje do kart i przycisków w aplikacji. Nazwa *TaskNest* jest robocza i można ją łatwo zmienić.

## 5. Zasady interfejsu i dostępności

- Wszystkie elementy klikalne mają kursor `pointer` i widoczny stan `:focus-visible` (obrys w kolorze tekstu).
- Przyciski i pola formularzy mają wysokość 44 px, a każde pole ma widoczną etykietę (nie tylko placeholder).
- Zaokrąglenie elementów to 8 px, a obramowania mają 1 px (pola i przyciski 1,5 px).
- Ikony są w formie SVG (bez emoji).
- Animacje są ograniczone do minimum i wyłączane przy `prefers-reduced-motion`.
- Znaczenie nie zależy tylko od koloru: priorytet i status mają zawsze podpis tekstowy.
- Zawartość jest w kolumnie o stałej szerokości, a przy węższych oknach (od 1024 px w dół) kolumna zajmuje całą szerokość z marginesem 24 px.

## 6. Struktura plików

```
docs/
├── design.md
├── tokens.css
├── logo.svg
└── logo-icon.svg
design/
├── 01-logowanie.png
├── 02-rejestracja.png
├── 03-lista-zadan.png
├── 04-dodaj-zadanie.png
└── 05-edytuj-zadanie.png
```
