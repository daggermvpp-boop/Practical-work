# Baza danych — dokumentacja

Baza: **`task_manager_db`** (PostgreSQL 18, obsługa przez pgAdmin 4).
Skrypty SQL znajdują się w katalogu [`../database/`](../database/).

## 1. Diagram ERD

![Diagram ERD bazy task_manager_db](../database/erd.png)

Relacje:

| Relacja | Opis |
|---|---|
| `users 1 — N tasks` | użytkownik może mieć wiele zadań (`tasks.user_id`) |
| `users 1 — N comment` | użytkownik może napisać wiele komentarzy (`comment.user_id`) |
| `tasks 1 — N comment` | zadanie może mieć wiele komentarzy (`comment.task_id`) |

Wszystkie klucze obce mają `ON DELETE CASCADE`: usunięcie użytkownika usuwa jego zadania
i komentarze, a usunięcie zadania usuwa jego komentarze.

## 2. Opis tabel

### `users`

| Kolumna | Typ | Ograniczenia | Opis |
|---|---|---|---|
| `id` | SERIAL | PK | identyfikator użytkownika |
| `username` | VARCHAR(50) | NOT NULL, UNIQUE | nazwa użytkownika |
| `email` | VARCHAR(100) | NOT NULL, UNIQUE | adres e-mail |
| `password_hash` | VARCHAR(255) | NOT NULL | hash hasła (w projekcie wartość przykładowa) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | data utworzenia konta |

### `tasks`

| Kolumna | Typ | Ograniczenia | Opis |
|---|---|---|---|
| `id` | SERIAL | PK | identyfikator zadania |
| `user_id` | INTEGER | NOT NULL, FK → `users.id` | autor zadania |
| `title` | VARCHAR(150) | NOT NULL | tytuł zadania |
| `description` | TEXT | — | opis zadania |
| `status` | VARCHAR(30) | DEFAULT `'pending'` | status: `pending` (do zrobienia) / `done` (zrobione) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | data utworzenia |

### `comment`

| Kolumna | Typ | Ograniczenia | Opis |
|---|---|---|---|
| `id` | SERIAL | PK | identyfikator komentarza |
| `task_id` | INTEGER | NOT NULL, FK → `tasks.id` | zadanie, którego dotyczy komentarz |
| `user_id` | INTEGER | NOT NULL, FK → `users.id` | autor komentarza |
| `content` | TEXT | NOT NULL | treść komentarza |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | data dodania |

## 3. Skrypty SQL

| Plik | Co robi | Kiedy uruchomić |
|---|---|---|
| [`schema.sql`](../database/schema.sql) | tworzy tabele `users`, `tasks`, `comment` z kluczami i indeksami | jako pierwszy |
| [`insert-data.sql`](../database/insert-data.sql) | czyści tabele i wgrywa po 5 przykładowych rekordów (można uruchamiać wielokrotnie) | jako drugi |
| [`select-queries.sql`](../database/select-queries.sql) | 4 przykładowe zapytania `SELECT` (sortowanie, filtr, grupowanie, złączenie) | jako trzeci |

## 4. Jak odtworzyć bazę krok po kroku

1. W pgAdmin 4 kliknij prawym przyciskiem myszy **Databases → Create → Database...** i utwórz bazę o nazwie `task_manager_db` (albo wykonaj `CREATE DATABASE task_manager_db;`).
2. Otwórz **Query Tool** połączony z nową bazą, wczytaj plik `schema.sql` i uruchom go (F5).
3. Uruchom `insert-data.sql` — skrypt czyści tabele i wgrywa 5 przykładowych rekordów do każdej z nich (dzięki temu można go uruchamiać wielokrotnie).
4. Uruchom `select-queries.sql` — np. zapytanie łączące pokaże 5 zadań z nazwami użytkowników, a zapytanie `GROUP BY` policzy zadania według statusu (3 × `done`, 2 × `pending`).

Te same kroki można wykonać z wiersza poleceń:

```bash
psql -U postgres -h localhost -d task_manager_db -f database/schema.sql
psql -U postgres -h localhost -d task_manager_db -f database/insert-data.sql
psql -U postgres -h localhost -d task_manager_db -f database/select-queries.sql
```

## 5. Normalizacja

- **1NF** — każda kolumna przechowuje jedną wartość (np. komentarz to jeden wiersz w `comment`),
- **2NF** — wszystkie kolumny zależą od pełnego klucza głównego,
- **3NF** — brak zależności przechodnich: dane użytkownika są tylko w `users`, dane zadania
  tylko w `tasks`, a komentarze odwołują się do nich przez klucze obce (nie powtarzają ich treści).

## 6. Administracja bazą danych

- Uprawnienia użytkowników: [`database-roles.md`](database-roles.md)
- Kopie zapasowe i odtwarzanie: [`backup-restore.md`](backup-restore.md)
