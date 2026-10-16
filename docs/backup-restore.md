# Instrukcja: Backup i Restore bazy danych w pgAdmin 4

## 1. Tworzenie kopii zapasowej (Backup)
1. W programie **pgAdmin 4** otwórz drzewo po lewej stronie, kliknij prawym przyciskiem myszy na bazę danych `task_manager_db` i wybierz **Backup...**
2. W zakładce **General** w polu *Filename* podaj ścieżkę i nazwę pliku, np. `C:\backups\task_manager_backup.backup`.
3. W polu *Format* wybierz **Custom** lub **Tar**.
4. Kliknij przycisk **Backup**.

### Dlaczego trzymanie backupu na tym samym dysku co baza danych to błąd?
Trzymanie kopii zapasowej na tym samym fizycznym dysku, na którym znajduje się główna baza danych, nie zabezpiecza przed awarią sprzętową – w przypadku uszkodzenia dysku lub awarii kontrolera tracimy zarówno produkcyjne dane, jak i backup. Ponadto w przypadku uszkodzenia systemu plików lub złośliwego oprogramowania (ransomware) szyfrującego dane w tej samej lokalizacji, plik kopii zapasowej zostanie bezpowrotnie zniszczony.

## 2. Usunięcie tabeli (Drop table)
Wykonaj w Query Tool zapytanie usuwające tabelę:
```sql
DROP TABLE users CASCADE;