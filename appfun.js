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

	const return_data = postJSON(params)
		.then(response => response.text())
		.then(data => data);
    console.log(await return_data);
	if (params.sendToId) {
		destinationElement = document.querySelector('#'+params.sendToId);
		destinationElement.innerHTML = '<pre>' + await return_data + '</pre>';
	}
  /*
	if (backendURI && embedId) {
    const return_data = postJSON(backendURI, {data: "Hello"})
    .then(response => response.text())
    .then(data => data);
    console.log(await return_data);
    destinationElement = document.querySelector('#'+embedId);
    destinationElement.innerHTML = '<pre>' + await return_data + '</pre>';

  }
  else if (backendURI) {
    console.log(backendURI);
  }
	*/
}

// Must return a promise 
function postJSON(params) {
	let contentType = "";
	let postBody = {};
	const uri = params.uri;

	if (params.formId) { // prepare to pass form data
		contentType = 'application/x-www-form-urlencoded';
		let formEl = document.getElementById(params.formId);
		let formData = new FormData(formEl);
		if (params.optionalData) {	// Optional data (to be added to a form request)
			// Note: optionalData keys should not conflict with form "name" values
			for (const [key, value] of Object.entries(params.optionalData)) {
				formData.append(key, value);
			}
		}
		postBody = formData;
	}
	else { // pass json 
		contentType = 'application/json';
		if (params.optionalData) {
			postBody = JSON.stringify(params.optionalData);
		}
	}

	return fetch(uri, {
		method: 'POST', 
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': contentType
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: postBody // body data type must match "Content-Type" header
	});
} 
