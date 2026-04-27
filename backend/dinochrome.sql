CREATE TABLE usuarios (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE puntuaciones (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    usuario_id INTEGER NOT NULL,
    puntos INTEGER NOT NULL,
    nivel VARCHAR
(50),
    fecha_logro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Esto asegura que si se borra un usuario, se borren sus puntos
    FOREIGN KEY
(usuario_id) REFERENCES usuarios
(id) ON
DELETE CASCADE
);