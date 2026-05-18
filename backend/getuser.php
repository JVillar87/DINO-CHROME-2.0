<?php
session_start();
require "config.php";

header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "success" => false,
        "message" => "No hay sesión activa"
    ]);
    exit;
}

try {
    $connection = getDinoChrome();

    $stmt = $connection->prepare("SELECT username FROM users WHERE id = ?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();

    $result = $stmt->get_result()->fetch_assoc();

    if (!$result) {
        echo json_encode([
            "success" => false,
            "message" => "Usuario no encontrado"
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "username" => $result['username']
    ]);

    $stmt->close();
    $connection->close();
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "No se pudo obtener el usuario"
    ]);
}
