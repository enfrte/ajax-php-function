<?php

class Hello 
{
	public function __construct() {} 

	public function world($arg1 = 0)
	{
		echo "Hello world ".$arg1;
	}

	public function sampleData()
	{
		print_r($_POST);
	}

	public function formData()
	{
		//var_dump($_POST);
		print_r($_POST);
	}
}
