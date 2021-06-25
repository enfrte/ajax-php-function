<?php

class Index 
{
	protected $views_folder;
	public function __construct() {
		$this->views_folder = __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR;
	}

	public function index($arg1 = 0)
	{
		return include($this->views_folder.'index.html');
	}
}
