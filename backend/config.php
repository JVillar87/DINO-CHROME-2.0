<?php

function getDinoChrome(): mysqli
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "dinocrome";

    //$connection = new mysqli($servername, $username, $password, $dbname);
    $connection = new mysqli("sql101.infinityfree.com", "if0_41887203", "RPGw6HnfUhfpOSe", "if0_41887203_dinocrome"); //BBDD INFINITYFREE (Hosting)
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
    return $connection;
}
?>