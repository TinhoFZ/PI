CREATE DATABASE pidb;
USE pidb;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    xp INT DEFAULT 0,
    level INT DEFAULT 1,
    coins INT DEFAULT 0,
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

CREATE TABLE locations (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    zone_id INT NOT NULL,
    quest_id INT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    coordinate JSON NOT NULL,
    type ENUM('treasure', 'quest', 'npc', 'poi') DEFAULT 'poi',
    FOREIGN KEY (zone_id) REFERENCES zones(zone_id) ON DELETE CASCADE
);

CREATE TABLE treasures (
    treasure_id INT AUTO_INCREMENT PRIMARY KEY,
    zone_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    coordinate JSON NOT NULL,
    xp_reward INT DEFAULT 50,
    FOREIGN KEY (zone_id) REFERENCES zones(zone_id) ON DELETE CASCADE
);

CREATE TABLE quests (
    quest_id INT AUTO_INCREMENT PRIMARY KEY,
    zone_id INT NOT NULL,
    partner_id INT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    xp_reward INT DEFAULT 100,
    FOREIGN KEY (zone_id) REFERENCES zones(zone_id) ON DELETE CASCADE,
    FOREIGN KEY (partner_id) REFERENCES partners(partner_id) ON DELETE SET NULL
);

CREATE TABLE rewards (
    reward_id INT AUTO_INCREMENT PRIMARY KEY,
    quest_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    FOREIGN KEY (quest_id) REFERENCES quests(quest_id) ON DELETE CASCADE
);

CREATE TABLE user_treasure (
    user_treasure_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    treasure_id INT NOT NULL,
    date_collected DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, treasure_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (treasure_id) REFERENCES treasures(treasure_id) ON DELETE CASCADE
);

CREATE TABLE user_quest (
    user_quest_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    quest_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    UNIQUE (user_id, quest_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (quest_id) REFERENCES quests(quest_id) ON DELETE CASCADE
);

CREATE TABLE user_reward (
    user_reward_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reward_id INT NOT NULL,
    redeemed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (reward_id) REFERENCES rewards(reward_id) ON DELETE CASCADE
);

CREATE TABLE logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE error_logs (
    error_log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    route VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    status_code INT NOT NULL,
    error_message TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, xp, level, coins)
VALUES
('Eduardo', 'edu@stog.com', '123456', 500, 3, 200),
('Bruno', 'bruno@stog.com', '123456', 1200, 5, 500),
('Ligia', 'ligia@stog.com', '123456', 800, 4, 300),
('Matheus', 'matheus@stog.com', '123456', 100, 1, 50),
('Diogenes', 'diogenes@stog.com', '123456', 600, 3, 180);

INSERT INTO partners (name, description)
VALUES
('Prefeitura do Recife', 'Turismo e cultura'),
('Museu Brennand', 'Instituto histórico'),
('Café Histórico Recife', 'Descontos para exploradores'),
('Parque da Jaqueira Admin', 'Gestão do parque'),
('Olinda Cultural', 'Patrimônio histórico');

INSERT INTO zones (name, description, geometry)
VALUES
('Marco Zero', 'Centro histórico do Recife',
    JSON_ARRAY(
        JSON_ARRAY(-8.0648, -34.8738),
        JSON_ARRAY(-8.0640, -34.8678),
        JSON_ARRAY(-8.0600, -34.8685),
        JSON_ARRAY(-8.0608, -34.8742),
        JSON_ARRAY(-8.0648, -34.8738)
    )
),

('Instituto Brennand', 'Museu medieval e castelo',
    JSON_ARRAY(
        JSON_ARRAY(-8.0670, -34.9635),
        JSON_ARRAY(-8.0670, -34.9540),
        JSON_ARRAY(-8.0580, -34.9540),
        JSON_ARRAY(-8.0580, -34.9635),
        JSON_ARRAY(-8.0670, -34.9635)
    )
),

('Parque da Jaqueira', 'Área verde urbana',
    JSON_ARRAY(
        JSON_ARRAY(-8.0380, -34.9140),
        JSON_ARRAY(-8.0380, -34.9070),
        JSON_ARRAY(-8.0320, -34.9070),
        JSON_ARRAY(-8.0320, -34.9140),
        JSON_ARRAY(-8.0380, -34.9140)
    )
),

('Boa Viagem', 'Orla turística da praia',
    JSON_ARRAY(
        JSON_ARRAY(-8.1170, -34.8950),
        JSON_ARRAY(-8.1170, -34.8890),
        JSON_ARRAY(-8.1100, -34.8890),
        JSON_ARRAY(-8.1100, -34.8950),
        JSON_ARRAY(-8.1170, -34.8950)
    )
),

('Olinda Centro Histórico', 'Cidade alta histórica',
    JSON_ARRAY(
        JSON_ARRAY(-8.0140, -34.8510),
        JSON_ARRAY(-8.0140, -34.8450),
        JSON_ARRAY(-8.0080, -34.8450),
        JSON_ARRAY(-8.0080, -34.8510),
        JSON_ARRAY(-8.0140, -34.8510)
    )
);

INSERT INTO quests (zone_id, partner_id, name, description, xp_reward)
VALUES
(1, 1, 'Explorar Marco Zero', 'Descubra pontos históricos', 100),
(1, NULL, 'Segredos do Recife Antigo', 'Missão investigativa', 150),
(2, 2, 'Castelo Brennand', 'Explore o museu', 200),
(2, NULL, 'Sala Proibida', 'Encontre área secreta', 250),
(3, 4, 'Corrida no Parque', 'Complete o circuito', 80),
(4, NULL, 'Orla Completa', 'Explore toda praia', 180),
(5, 5, 'Subida Histórica', 'Chegue ao alto da Sé', 160);

INSERT INTO treasures (zone_id, name, description, coordinate, xp_reward)
VALUES
(1, 'Moeda Antiga', 'Relíquia colonial', JSON_ARRAY(-8.0625,-34.8710), 50),
(1, 'Mapa Rasgado', 'Fragmento histórico', JSON_ARRAY(-8.0620,-34.8705), 60),
(2, 'Espada Medieval', 'Arma cerimonial', JSON_ARRAY(-8.0615,-34.9590), 100),
(2, 'Armadura do Guardião', 'Proteção antiga', JSON_ARRAY(-8.0608,-34.9602), 120),
(3, 'Insígnia Verde', 'Símbolo do parque', JSON_ARRAY(-8.0345,-34.9100), 40),
(4, 'Concha Rara', 'Item marítimo', JSON_ARRAY(-8.1115,-34.8915), 90),
(5, 'Sino Antigo', 'Relíquia de igreja', JSON_ARRAY(-8.0125,-34.8470), 130);

INSERT INTO locations (zone_id, quest_id, name, description, coordinate, type)
VALUES
(1, 1, 'Estátua Marco Zero', 'Centro simbólico', JSON_ARRAY(-8.0633,-34.8711), 'poi'),
(1, 2, 'Placa Histórica', 'Missão inicial', JSON_ARRAY(-8.0622,-34.8720), 'quest'),
(2, 3, 'Entrada do Castelo', 'Acesso principal', JSON_ARRAY(-8.0615,-34.9588), 'poi'),
(2, 4, 'Sala Secreta', 'Área escondida', JSON_ARRAY(-8.0595,-34.9605), 'treasure'),
(3, 5, 'Trilha Central', 'Caminho principal', JSON_ARRAY(-8.0352,-34.9092), 'poi'),
(4, NULL, 'Calçadão Boa Viagem', 'Orla turística', JSON_ARRAY(-8.1130,-34.8920), 'poi'),
(5, 7, 'Igreja da Sé', 'Ponto histórico', JSON_ARRAY(-8.0115,-34.8475), 'quest');

INSERT INTO user_quest (user_id, quest_id, completed)
VALUES
(1,1,1),
(1,2,0),
(2,3,1),
(3,4,0),
(4,5,0);

INSERT INTO user_treasure (user_id, treasure_id)
VALUES
(1,1),
(1,2),
(2,3),
(3,1),
(3,5);

INSERT INTO rewards (quest_id, name, description)
VALUES
(1,'Cupom Café','Desconto parceiro'),
(2,'XP Bonus','Experiência extra'),
(3,'Entrada VIP','Acesso especial'),
(4,'Badge Explorador','Conquista rara'),
(5,'Kit Energia','Item de stamina');
