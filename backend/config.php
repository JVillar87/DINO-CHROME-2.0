<?php

function getDinoChrome(): mysqli
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "dinocrome";
    //$conn = new mysqli("sql101.infinityfree.com", "if0_41887203", "RPGw6HnfUhfpOSe", "if0_41887203_dinocrome");
    $connection = new mysqli($servername, $username, $password, $dbname);
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
    return $connection;
}