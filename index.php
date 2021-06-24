<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!isset($_GET['url'])) {
	$_GET['url'] = 'Index';
} 

$args_length = 0; // number of arguments
$args = [];
$url = $_GET['url'];
$url = rtrim($url, '/');
$url = filter_var($url, FILTER_SANITIZE_URL);
$url = explode('/', $url);

$controllerClass = $url[0];

if (!empty($url[1])) {
	$controllerMethod = $url[1];
}
else {
	$controllerMethod = 'index';
}
if (count($url) > 2) {
	$args = array_slice($url, 2);
}

include(__DIR__.DIRECTORY_SEPARATOR.'controllers'.DIRECTORY_SEPARATOR.$controllerClass.".php");
$controllerInstance = new $controllerClass;
call_user_func_array([$controllerInstance, $controllerMethod], $args);
