<?php
session_start();
require "config.php";

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $_SESSION['user_id'] ?? ($data['user_id'] ?? null);
$puntos = isset($data['puntos']) ? (int)$data['puntos'] : null;

if (!$user_id || $puntos === null) {
    echo json_encode(["success" => false, "message" => "user_id y puntos obligatorios"]);
    exit;
}

try {
    $connection = getDinoChrome();

    $stmt = $connection->prepare("INSERT INTO puntuaciones (usuario_id, puntos) VALUES (?, ?)");
    if (!$stmt) throw new RuntimeException('Prepare failed');
    $stmt->bind_param("ii", $user_id, $puntos);

    if (!$stmt->execute()) {
        throw new RuntimeException('Execute failed');
    }

    $stmt->close();
    $connection->close();

    echo json_encode(["success" => true, "message" => "Puntos guardados"]);
} catch (Throwable $e) {
    echo json_encode(["success" => false, "message" => "ERROR: No se pudo guardar los puntos"]);
}
