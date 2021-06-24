/** DOCS...
 * { 
 * 	uri: 'php controller uri' - required 
 * 	formId: 'id of form' - optional 
 * 	optionalData: {key: 'value'} - optional 
 * 	sendToId: 'id of html element you want to send the result to' - optional 
 * }
 */
async function ajaxPhpFn(params) {
	if (!params.uri) {
		console.log('Missing minimal params');
	}

	const return_data = postData(params)
		.then(response => response.text())
		.then(data => data);
    console.log(await return_data);
	if (params.sendToId) {
		destinationElement = document.querySelector('#'+params.sendToId);
		destinationElement.innerHTML = '<pre>' + await return_data + '</pre>';
	}

}

// Must return a promise 
function postData(params) {
	const uri = params.uri;
	let formData = new FormData();

	if (params.formId) { // prepare to pass form data
		let formEl = document.getElementById(params.formId);
		formData = new FormData(formEl);
		if (params.optionalData) {	// Optional data (to be added to a form request)
			for (const [key, value] of Object.entries(params.optionalData)) {
				formData.append(key, value);
			}
		}
	}
	if (params.optionalData) {	// Optional data (to be added to a form request)
		// Note: optionalData keys that conflict with form "name" values will create an array of values
		for (const [key, value] of Object.entries(params.optionalData)) {
			formData.append(key, value);
		}
	}
	let postBody = formData;
	
	return fetch(uri, {
		method: 'POST', 
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			// Don't use 'Content-Type' to get php POST values. I don't know why it doesn't work.
			//'Content-Type': 'application/json'
			//'Content-Type': 'text/plain'
			//'Content-Type': 'multipart/form-data'
			//'Content-Type': 'application/x-www-form-urlencoded'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: postBody // body data type must match "Content-Type" header
	});
} 
