<?php
session_start();
require "config.php";

$connection = getDinoChrome();

$data = json_decode(file_get_contents("php://input"), true);

if (!$data['username'] || !$data['password']) {
    echo json_encode(["error" => "Usuario y contraseña obligatorios"]);
    exit;
}

$stmt = $connection->prepare("SELECT id, username, avatar, password FROM users WHERE username=?");
$stmt->bind_param("s", $data['username']);
$stmt->execute();
$res = $stmt->get_result()->fetch_assoc();

if ($res && $data['password'] === $res['password']) {
    $_SESSION['user_id'] = $res['id'];
    echo json_encode([
        "status" => "ok",
        "id" => $res['id'],
        "username" => $res['username'],
        "avatar" => $res['avatar']
    ]);
} else {
    echo json_encode(["error" => "Usuario o contraseña incorrectos"]);
}