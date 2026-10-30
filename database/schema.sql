

DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS tasks   CASCADE;
DROP TABLE IF EXISTS users   CASCADE;


CREATE TABLE users (
    id            SERIAL       PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL,
    email         VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_username_key UNIQUE (username),
    CONSTRAINT users_email_key    UNIQUE (email)
);


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


CREATE INDEX idx_tasks_user_id    ON tasks (user_id);
CREATE INDEX idx_comment_task_id  ON comment (task_id);
CREATE INDEX idx_comment_user_id  ON comment (user_id);

-- ============================================================
--  Koniec skryptu. Następny krok: insert-data.sql
-- ============================================================
