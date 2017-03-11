module.exports = loadres;

function loadres(res) {
	if (res === "" || res === [])
		return new Promise(function(resolve, reject) {
			reject("no resource");
		});
	
	if (Object.prototype.toString.call(res) === "[object String]") {
		
		let t = _type(r);
		if (t === "css")
			_loadStyle(r);
		else if (t === "script")
			_loadScript(r);
		else
			new Promise(function(resolve, reject) {
				reject("contains unsupported resource");
			});
		
		return r;
	}
	else if (Object.prototype.toString.call(res) === "[object Array]") {
		return Promise.all(res.map(function(r) {
			let t = _type(r);
			if (t === "css")
				_loadStyle(r);
			else if (t === "script")
				_loadScript(r);
			else
				new Promise(function(resolve, reject) {
					reject("contains unsupported resource");
				});
			return r;
		}))
	}
}

function _type(url) {
	if (url.indexOf(".css") === url.length-4)
		return "css";
	else if (url.indexOf(".js") === url.length-3)
		return "script";
}

function _loadScript(url) {
	new Promise(function(resolve, reject) {
		let pos = document.getElementsByTagName("body")[0];
		let res = document.createElement("script");
		res.src = url;
		res.type = 'text/javascript';
		res.async = true;
		res.addEventListener("load", function() {
			resolve(res);
		})
		res.addEventListener("error", function(e) {
			reject(`load failed: ${url}`);
		});
		pos.appendChild(res);	
	});
}

function _loadStyle(url, resolve, reject) {
	new Promise(function(resolve, reject) {
		let pos = document.getElementsByTagName("head")[0];
		let res = document.createElement("link");
		res.href = url;
		res.rel = "stylesheet";
		res.addEventListener("load", function() {
			resolve(res);
		})
		res.addEventListener("error", function(e) {
			reject(`load failed: ${url}`);
		});
		pos.appendChild(res);
	});
}