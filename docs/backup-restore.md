# Instrukcja: Backup i Restore bazy danych w pgAdmin 4

Dokument opisuje pełny scenariusz: wykonanie kopii zapasowej bazy `task_manager_db`,
symulację awarii (usunięcie tabeli) oraz odtworzenie danych z kopii.
Cały scenariusz został sprawdzony na PostgreSQL 18 (wersje narzędzi `pg_dump` / `pg_restore` 18.6).

## 1. Czym jest kopia zapasowa

Kopia zapasowa (backup) to plik zawierający strukturę i dane bazy w jednym „zdjęciu”.
pgAdmin 4 pod spodem wywołuje narzędzie **`pg_dump`**, a odtworzenie wykonuje **`pg_restore`**.
Format **Custom** (albo **Tar**) tworzy archiwum skompresowane — właśnie z takiego pliku
odtwarza się dane. Format *Plain* zapisuje zwykły plik `.sql`, który uruchamia się przez `psql`.

## 2. Tworzenie kopii zapasowej (Backup)

1. W programie **pgAdmin 4** otwórz drzewo po lewej stronie, kliknij prawym przyciskiem myszy na bazę danych `task_manager_db` i wybierz **Backup...**
2. W zakładce **General** w polu *Filename* podaj ścieżkę i nazwę pliku, np. `C:\backups\task_manager_backup.backup`.
3. W polu *Format* wybierz **Custom** lub **Tar**.
4. Kliknij przycisk **Backup**.

## 3. Dlaczego trzymanie backupu na tym samym dysku co baza danych to błąd?

Trzymanie kopii zapasowej na tym samym fizycznym dysku, na którym znajduje się główna baza danych, nie zabezpiecza przed awarią sprzętową – w przypadku uszkodzenia dysku lub awarii kontrolera tracimy zarówno produkcyjne dane, jak i backup. Ponadto w przypadku uszkodzenia systemu plików lub złośliwego oprogramowania (ransomware) szyfrującego dane w tej samej lokalizacji, plik kopii zapasowej zostanie bezpowrotnie zniszczony.

Dlatego obowiązuje zasada **3-2-1**:

- **3** kopie danych (produkcja + 2 kopie zapasowe),
- **2** różne nośniki (np. dysk lokalny i dysk zewnętrzny/NAS),
- **1** kopia poza siedzibą (np. w chmurze albo na innym komputerze).

Kopię trzeba też **regularnie testować** — backup, którego nigdy nie odtworzono, nie jest
pewnym backupem. Właśnie temu służy ćwiczenie z punktów 4–6.

## 4. Symulacja awarii — usunięcie tabeli (Drop table)

Usuń tabelę `users` w Query Tool:

```sql
DROP TABLE users CASCADE;
```

Co się dzieje: tabela `users` znika razem z danymi. Słowo `CASCADE` usuwa także obiekty
zależne — **klucze obce** `fk_tasks_user` i `fk_comment_user` z tabel `tasks` i `comment`.
Tabele `tasks` i `comment` zostają na miejscu, ale tracą powiązanie z użytkownikami.

Sprawdzenie stanu po awarii:

```sql
SELECT count(*) FROM tasks;   -- działa, np. 5 wierszy
SELECT count(*) FROM users;   -- ERROR: relation "users" does not exist
```

## 5. Odtworzenie danych (Restore)

1. Kliknij prawym przyciskiem myszy bazę `task_manager_db` i wybierz **Restore...**
2. W zakładce **General** wybierz plik kopii w polu *Filename* oraz format, w jakim kopia została zrobiona (**Custom**).
3. W zakładce **Restore options** znajdź sekcję *Miscellaneous* (Różne) i przełącz **Clean before restore** na **Yes** — opcja usuwa istniejące obiekty przed odtworzeniem (odpowiednik `--clean` w `pg_restore`).
4. Kliknij przycisk **Restore**.

> Gdy *Clean before restore* jest wyłączone, a w bazie część tabel już istnieje, restore
> zakończy się ostrzeżeniami „already exists”.
> Dokumentacja opcji: <https://www.pgadmin.org/docs/pgadmin4/latest/restore_dialog.html>

## 6. Weryfikacja po odtworzeniu

```sql
SELECT (SELECT count(*) FROM users)   AS uzytkownicy,
       (SELECT count(*) FROM tasks)   AS zadania,
       (SELECT count(*) FROM comment) AS komentarze;
```

Wynik po udanym restore (przykład z ćwiczenia): `5 | 5 | 5`.

Trzeba też sprawdzić, czy wróciły klucze obce:

```sql
SELECT conname
FROM pg_constraint
WHERE connamespace = 'public'::regnamespace
ORDER BY conname;
```

Na liście powinny być m.in. `fk_tasks_user`, `fk_comment_task`, `fk_comment_user`.

## 7. To samo z wiersza poleceń (pg_dump / pg_restore)

Kopia (format Custom):

```bash
pg_dump -U postgres -h localhost -d task_manager_db -F c -f task_manager_backup.backup
```

Odtworzenie po awarii (opcje `--clean --if-exists` odpowiadają „Clean before restore”):

```bash
pg_restore -U postgres -h localhost -d task_manager_db --clean --if-exists task_manager_backup.backup
```

Sprawdzenie po odtworzeniu: `SELECT count(*) FROM users;` — dane wróciły (5 wierszy).

## 8. Wnioski

- Backup to nie tylko „zrobienie pliku” — pełny cykl to **kopia → awaria → odtworzenie →
  weryfikacja**.
- Kopie trzymamy na innym nośniku niż baza (zasada 3-2-1).
- Do codziennej pracy z pgAdmin wygodny jest format **Custom** — pozwala odtworzyć całość
  albo wybrane tabele.
- Struktura tabel jest w pliku [`../database/schema.sql`](../database/schema.sql).
