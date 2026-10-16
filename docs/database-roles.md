# Instrukcja: Zarządzanie użytkownikami i uprawnieniami w PostgreSQL

## 1. Utworzenie użytkownika i nadanie uprawnień (SQL)
Uruchom w pgAdmin Query Tool następujące polecenia, aby utworzyć użytkownika `userek` oraz nadać mu odpowiednie prawa dostępu:

```sql
CREATE ROLE userek LOGIN PASSWORD 'P@ssW0rD';

GRANT CONNECT ON DATABASE task_manager_db TO userek;
GRANT USAGE ON SCHEMA public TO userek;
GRANT SELECT ON tasks, users, comment TO userek;