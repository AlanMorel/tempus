<?php
    $data = file_get_contents("php://input");
    $json = json_decode($data, true);
    $encode = json_encode($json, JSON_PRETTY_PRINT);

    $timeline = '../timeline.json';
    $handle = fopen($timeline, 'w') or die('Cannot open timeline:  ' . $timeline);
    fwrite($handle, $encode);
?>
