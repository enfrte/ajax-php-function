<?php 

if (!isset($_GET['url'])) {
	$_GET['url'] = 'Index';
	include("controllers/Index.php");
} 
else {
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
	if (count($url) > 1) {
		$args = array_slice($url, 2);
	}

	include("controllers/".$controllerClass.".php");
	$controllerInstance = new $controllerClass;
	call_user_func_array([$controllerInstance, $controllerMethod], $args);

}

