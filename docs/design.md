# Design aplikacji TaskNest

## Makieta ekranów

Makieta jest zrobiona w Figmie: https://www.figma.com/design/La47nnBjcppw2h4ttijSLB

Zrobiłem 5 ekranów (zdjęcia są w katalogu `design/`):

- logowanie (`01-logowanie.png`)
- rejestracja (`02-rejestracja.png`)
- lista zadań (`03-lista-zadan.png`)
- formularz dodania zadania (`04-dodaj-zadanie.png`)
- formularz edycji zadania (`05-edytuj-zadanie.png`)

## Paleta kolorów

| Rola | Kolor HEX |
|---|---|
| Główny | `#5D536B` |
| Dodatkowy | `#7D6B91` |
| Tło | `#272838` |
| Tekst | `#DADAFF` |

Kontrast sprawdziłem według zasad WCAG (jak na webaim.org):

- tekst `#DADAFF` na tle `#272838` ma 10,68:1, czyli bardzo dobrze,
- tekst `#DADAFF` na kolorze głównym `#5D536B` (przyciski) ma 5,30:1, czyli też dobrze.

Kolor dodatkowy `#7D6B91` ma z tekstem tylko 3,53:1, więc nie używam go do tekstu, tylko do obramowań pól i ikon.

## Czcionki

- **Nagłówki:** Space Grotesk
- **Treść:** Manrope

Dlaczego te czcionki:

- Obie są w Google Fonts, więc są darmowe i łatwo je podłączyć.
- Space Grotesk wygląda nowocześnie i dobrze pasuje do nagłówków.
- Manrope jest prosta i bardzo czytelna, nawet w małym rozmiarze na ciemnym tle.
- Obie mają polskie znaki (ą, ę, ł, ś, ż i inne).

## Logo

Logo to prosty znak: kwadrat z zaokrąglonymi rogami w kolorze głównym, z ptaszkiem w środku. Ptaszek oznacza wykonane zadanie. Obok jest nazwa aplikacji TaskNest.

Pliki: `docs/logo.svg` (logo z nazwą) i `docs/logo-icon.svg` (sam znak).
