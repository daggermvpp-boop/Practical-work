# Instrukcja: Zarządzanie użytkownikami i uprawnieniami w PostgreSQL

Dokument opisuje krok po kroku, jak w bazie `task_manager_db` utworzyć dodatkowe konto
`userek`, nadać mu prawo tylko do odczytu danych i sprawdzić, że nie może zmieniać danych.
Wszystkie polecenia wykonujemy w **pgAdmin 4 → Query Tool** (działają też w `psql`).

## 1. Po co osobne konto dla aplikacji

- Aplikacja (albo inny użytkownik) powinna łączyć się z bazą przez konto z **minimalnymi
  uprawnieniami** — tylko tymi, które są naprawdę potrzebne.
- Konto `userek` ma wyłącznie czytać dane (`SELECT`), więc nawet błąd w aplikacji nie zmieni
  i nie usunie danych.
- Konto `postgres` (superużytkownik) służy tylko do administracji bazą.

## 2. Utworzenie użytkownika i nadanie uprawnień (SQL)

Uruchom w Query Tool połączonym z bazą `task_manager_db` jako `postgres`:

```sql
CREATE ROLE userek LOGIN PASSWORD 'P@ssW0rD';

GRANT CONNECT ON DATABASE task_manager_db TO userek;
GRANT USAGE ON SCHEMA public TO userek;
GRANT SELECT ON tasks, users, comment TO userek;
```

| Polecenie | Co daje |
|---|---|
| `CREATE ROLE ... LOGIN PASSWORD` | tworzy konto, które może logować się hasłem |
| `GRANT CONNECT ON DATABASE` | prawo połączenia z bazą `task_manager_db` |
| `GRANT USAGE ON SCHEMA public` | prawo „widzenia” obiektów w schemacie (samo w sobie **nie** daje dostępu do danych) |
| `GRANT SELECT ON ...` | prawo tylko do odczytu tabel `tasks`, `users`, `comment` |

> Gdyby konto miało także dodawać dane, trzeba by dodatkowo:
> ```sql
> GRANT INSERT ON tasks, comment TO userek;
> GRANT USAGE ON SEQUENCE tasks_id_seq, comment_id_seq TO userek;
> ```
> Kolumny `id` korzystają z sekwencji — bez `USAGE` na sekwencji `INSERT` zakończy się błędem.

## 3. Test uprawnień

Jako `postgres` wykonaj:

```sql
SET ROLE userek;      -- kolejne polecenia wykonujemy jako userek
SELECT current_user;
SELECT count(*) FROM tasks;
INSERT INTO users (username, email, password_hash)
VALUES ('test_role_user', 'test_role@example.com', 'hash');
RESET ROLE;           -- powrót do konta postgres
SELECT current_user;
```

Wynik (sprawdzony na PostgreSQL 18):

| Polecenie | Wynik |
|---|---|
| `SELECT current_user` | `userek` |
| `SELECT count(*) FROM tasks` | działa — odczyt jest dozwolony |
| `INSERT INTO users ...` | błąd `permission denied for table users`, `SQL state: 42501` |
| `RESET ROLE` + `SELECT current_user` | `postgres` |

![Test uprawnień w pgAdmin 4](screenshots/uprawnienia-pgadmin.png)

> Komunikat błędu może być wyświetlony w języku interfejsu serwera (np. „нет доступа
> к таблице users”). Najważniejszy jest kod `SQL state: 42501` — oznacza brak uprawnień.

## 4. Sprawdzenie uprawnień jednym zapytaniem

```sql
SELECT table_name, privilege_type
FROM information_schema.role_table_grants
WHERE grantee = 'userek'
ORDER BY table_name, privilege_type;
```

Oczekiwany wynik — dokładnie 3 wiersze:

| table_name | privilege_type |
|---|---|
| comment | SELECT |
| tasks | SELECT |
| users | SELECT |

## 5. Odebranie uprawnień i usunięcie konta (sprzątanie)

```sql
REVOKE SELECT ON tasks, users, comment FROM userek;
REVOKE USAGE ON SCHEMA public FROM userek;
DROP ROLE userek;
```

`DROP ROLE` **nie zadziała**, dopóki rola ma jakiekolwiek uprawnienia — serwer zwróci błąd:

```
ERROR: role "userek" cannot be dropped because some objects depend on it
DETAIL: privileges for schema public, privileges for table tasks, ...
```

Dlatego najpierw wykonujemy `REVOKE`, a dopiero potem `DROP ROLE`.

## 6. Wnioski

- Uprawnienia nadajemy **pojedynczo i świadomie** (`CONNECT`, `USAGE`, `SELECT`, …) — nie
  przez dodanie konta do grupy superużytkowników.
- Hasła kont nie trzymamy w repozytorium; w tym projekcie `P@ssW0rD` to wartość ćwiczeniowa.
- Warto regularnie sprawdzać uprawnienia zapytaniem z punktu 4.
- Struktura, na której ćwiczymy, jest w pliku [`../database/schema.sql`](../database/schema.sql).
