<?php

header('Access-Control-Allow-Origin: *');
require_once('parser/parser.php');

$word = $_GET['word'];
$content = file_get_contents("http://www.jeuxdemots.org/rezo-xml.php?gotermsubmit=Chercher&gotermrel=".$word."&output=onlyxml");

parse($content);
