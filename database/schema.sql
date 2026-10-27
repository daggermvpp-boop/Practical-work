-- ============================================================
--  TaskNest - struktura bazy danych
--  PostgreSQL 18 / uruchamiać w pgAdmin 4 -> Query Tool
--  (po połączeniu z bazą task_manager_db)
-- ============================================================
--
--  UWAGA: skrypt usuwa istniejące tabele i tworzy je od nowa.
--  Uruchamiaj go tylko na bazie, której strukturę chcesz odtworzyć.
--
--  Kolejność uruchamiania skryptów:
--    1. schema.sql          - struktura tabel (ten plik)
--    2. insert-data.sql     - przykładowe dane (5 rekordów w każdej tabeli)
--    3. select-queries.sql  - przykładowe zapytania SELECT
--
--  Baza używa trzech tabel:
--    users   - użytkownicy aplikacji,
--    tasks   - zadania przypisane do użytkownika,
--    comment - komentarze do zadań.
--
--  Uprawnienia dla dodatkowego użytkownika bazy opisuje
--  dokumentacja: docs/database-roles.md
-- ============================================================

-- (opcjonalnie) utworzenie bazy - wykonaj raz, jeśli baza jeszcze nie istnieje:
-- CREATE DATABASE task_manager_db;

-- ---------- usunięcie starych tabel (kolejność odwrotna do zależności) ----------

DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS tasks   CASCADE;
DROP TABLE IF EXISTS users   CASCADE;

-- ---------- tabela: users ----------
-- Użytkownicy aplikacji. username i email są unikalne.

CREATE TABLE users (
    id            SERIAL       PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL,
    email         VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_username_key UNIQUE (username),
    CONSTRAINT users_email_key    UNIQUE (email)
);

-- ---------- tabela: tasks ----------
-- Zadania. Każde zadanie należy do jednego użytkownika (user_id).
-- Usunięcie użytkownika usuwa także jego zadania (ON DELETE CASCADE).

CREATE TABLE tasks (
    id          SERIAL       PRIMARY KEY,
    user_id     INTEGER      NOT NULL,
    title       VARCHAR(150) NOT NULL,
    description TEXT,
    status      VARCHAR(30)  DEFAULT 'pending',
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tasks_user FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE
);

-- ---------- tabela: comment ----------
-- Komentarze do zadań. Komentarz zawsze należy do zadania i do użytkownika.

CREATE TABLE comment (
    id         SERIAL  PRIMARY KEY,
    task_id    INTEGER NOT NULL,
    user_id    INTEGER NOT NULL,
    content    TEXT    NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comment_task FOREIGN KEY (task_id)
        REFERENCES tasks (id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_user FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE
);

-- ---------- indeksy na kluczach obcych ----------
-- Przyspieszają zapytania łączące tabele (JOIN) i filtrowanie po user_id / task_id.

CREATE INDEX idx_tasks_user_id    ON tasks (user_id);
CREATE INDEX idx_comment_task_id  ON comment (task_id);
CREATE INDEX idx_comment_user_id  ON comment (user_id);

-- ============================================================
--  Koniec skryptu. Następny krok: insert-data.sql
-- ============================================================
