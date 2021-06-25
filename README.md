# ajax-php-function
An easy way to make ajax requests to php controllers. To see it in action, download and run in apache: http://localhost/ajax-php-function/ The demo comes with a basic controller style router, but you only need to include the `appfun.js` to your own project to make it work. 

Using the feature looks a bit like this 

	<form id="form1" onsubmit="ajaxPhpFn({
			uri: '/ajax-php-function/Hello/formData', 
			sendToId: 'ex3',
			formId: 'form1',
			optionalData: {added: 'Some added sample data.'}
		}); return false;">
		<input type="text" name="test" value="asdf">
		<button  type="submit">Submit form</button>
	</form>
	<div id="ex3"></div>

which get's sent to the Hello controller class and formData method. You can send the response back to an element. You can also add data to the form. You can use this on any element that has some kind of "on" event. 