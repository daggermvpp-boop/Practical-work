TRUNCATE TABLE comment, tasks, users RESTART IDENTITY CASCADE;

INSERT INTO users (username, email, password_hash, created_at) VALUES
('admin', 'admin@example.com', 'hash-placeholder-1', CURRENT_TIMESTAMP),
('vlad_dev', 'vlad@example.com', 'hash-placeholder-2', CURRENT_TIMESTAMP),
('anna_k', 'anna@example.com', 'hash-placeholder-3', CURRENT_TIMESTAMP),
('maxim_t', 'maxim@example.com', 'hash-placeholder-4', CURRENT_TIMESTAMP),
('elena_prog', 'elena@example.com', 'hash-placeholder-5', CURRENT_TIMESTAMP);

INSERT INTO tasks (user_id, title, description, status, created_at) VALUES
(2, 'Przygotować makietę', 'Ekran listy i formularza', 'done', CURRENT_TIMESTAMP),
(1, 'Stworzyć bazę danych', 'Struktura tabel w PostgreSQL', 'done', CURRENT_TIMESTAMP),
(3, 'Napisać testy', 'Testy jednostkowe dla backendu', 'pending', CURRENT_TIMESTAMP),
(4, 'Skonfigurować CI/CD', 'GitHub Actions dla budowania projektu', 'pending', CURRENT_TIMESTAMP),
(5, 'Przygotować raport', 'Dokumentacja projektu', 'done', CURRENT_TIMESTAMP);

INSERT INTO comment (task_id, user_id, content, created_at) VALUES
(1, 2, 'Makieta została zatwierdzona', CURRENT_TIMESTAMP),
(1, 1, 'Tabele utworzone pomyślnie', CURRENT_TIMESTAMP),
(2, 3, 'Testy przechodzą poprawnie', CURRENT_TIMESTAMP),
(3, 4, 'Pipeline skonfigurowany', CURRENT_TIMESTAMP),
(4, 5, 'Dokumentacja wrzucona', CURRENT_TIMESTAMP);
