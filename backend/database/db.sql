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