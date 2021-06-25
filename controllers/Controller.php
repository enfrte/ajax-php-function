<?php

class Controller 
{
	public function __construct()
	{
		
	}

	public static function render($path)
	{
		include($path);
	}
}
