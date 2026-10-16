
SELECT username, email 
FROM users 
ORDER BY username ASC;

SELECT title, status 
FROM tasks 
WHERE status = 'done';


SELECT status, COUNT(*) AS task_count 
FROM tasks 
GROUP BY status 
ORDER BY task_count DESC;


SELECT t.title, u.username 
FROM tasks t 
JOIN users u ON u.id = t.user_id;