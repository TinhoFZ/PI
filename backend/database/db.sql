CREATE DATABASE pidb;

USE pidb;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE zones (
    zone_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    geometry JSON NOT NULL
);

CREATE TABLE partners (
    partner_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE treasures (
    treasure_id INT AUTO_INCREMENT PRIMARY KEY,
    zone_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    coordinate JSON NOT NULL,

    FOREIGN KEY (zone_id)
        REFERENCES zones(zone_id)
        ON DELETE CASCADE
);

CREATE TABLE quests (
    quest_id INT AUTO_INCREMENT PRIMARY KEY,
    zone_id INT NOT NULL,
    partner_id INT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,

    FOREIGN KEY (zone_id)
        REFERENCES zones(zone_id)
        ON DELETE CASCADE,

    FOREIGN KEY (partner_id)
        REFERENCES partners(partner_id)
        ON DELETE SET NULL
);

CREATE TABLE rewards (
    reward_id INT AUTO_INCREMENT PRIMARY KEY,
    quest_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,

    FOREIGN KEY (quest_id)
        REFERENCES quests(quest_id)
        ON DELETE CASCADE
);

CREATE TABLE user_treasure (
    user_treasure_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    treasure_id INT NOT NULL,
    date_collected DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (treasure_id)
        REFERENCES treasures(treasure_id)
        ON DELETE CASCADE,

    UNIQUE (user_id, treasure_id)
);

CREATE TABLE user_quest (
    user_quest_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    quest_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (quest_id)
        REFERENCES quests(quest_id)
        ON DELETE CASCADE,

    UNIQUE (user_id, quest_id)
);

CREATE TABLE user_reward (
    user_reward_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reward_id INT NOT NULL,
    redeemed_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (reward_id)
        REFERENCES rewards(reward_id)
        ON DELETE CASCADE
);

CREATE TABLE logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
);

CREATE TABLE error_logs (
    error_log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    route VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    status_code INT NOT NULL,
    error_message TEXT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
);

INSERT INTO zones (name, description, geometry)
VALUES
(
    'Marco Zero',
    'Centro histórico do Recife',
    JSON_ARRAY(
        JSON_ARRAY(-8.0632, -34.8711),
        JSON_ARRAY(-8.0627, -34.8702),
        JSON_ARRAY(-8.0618, -34.8709),
        JSON_ARRAY(-8.0624, -34.8718)
    )
),
(
    'Instituto Ricardo Brennand',
    'Museu e castelo',
    JSON_ARRAY(
        JSON_ARRAY(-8.0625, -34.9580),
        JSON_ARRAY(-8.0610, -34.9605),
        JSON_ARRAY(-8.0590, -34.9590),
        JSON_ARRAY(-8.0605, -34.9570)
    )
),
(
    'Parque da Jaqueira',
    'Área de lazer e caminhada',
    JSON_ARRAY(
        JSON_ARRAY(-8.0357, -34.9108),
        JSON_ARRAY(-8.0347, -34.9095),
        JSON_ARRAY(-8.0335, -34.9105),
        JSON_ARRAY(-8.0345, -34.9118)
    )
);

INSERT INTO quests (
    zone_id,
    partner_id,
    name,
    description
)
VALUES
(
    1,
    NULL,
    'Fotografe o Marco Zero',
    'Tire uma foto do Marco Zero e envie para o mural.'
),
(
    1,
    NULL,
    'Encontre a Placa Histórica',
    'Localize a placa histórica próxima ao monumento.'
),
(
    2,
    NULL,
    'Explore o Castelo',
    'Visite a entrada principal do Instituto Ricardo Brennand.'
);

INSERT INTO treasures (
    zone_id,
    name,
    description,
    coordinate
)
VALUES
(
    1,
    'Moeda Colonial',
    'Uma antiga moeda encontrada no Recife Antigo.',
    JSON_ARRAY(-8.0625, -34.8710)
),
(
    1,
    'Mapa Rasgado',
    'Fragmento de um mapa antigo.',
    JSON_ARRAY(-8.0620, -34.8705)
),
(
    2,
    'Espada Cerimonial',
    'Uma espada exposta no castelo.',
    JSON_ARRAY(-8.0615, -34.9590)
);

ALTER TABLE users
ADD COLUMN xp INT DEFAULT 0,
ADD COLUMN level INT DEFAULT 1,
ADD COLUMN coins INT DEFAULT 0;

ALTER TABLE quests
ADD COLUMN xp_reward INT DEFAULT 100;

ALTER TABLE treasures
ADD COLUMN xp_reward INT DEFAULT 50;

ALTER TABLE user_quest
ADD CONSTRAINT unique_user_quest
UNIQUE(user_id, quest_id);

SELECT * FROM users;
SELECT * FROM logs;
SELECT * FROM error_logs;