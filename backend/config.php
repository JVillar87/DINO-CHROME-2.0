<?php

function getDinoChrome(): mysqli
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "dinocrome";
    $connection = new mysqli($servername, $username, $password, $dbname);
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
    return $connection;
}