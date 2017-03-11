# loadres

loadres means load resources, and resources include scripts and styles.  
so the package will provides you a promise way to load resources.

you can use loadres like following:

1.load one script or style

```js
	loadres('jQuery.min.js')
	.then(res) {
		...
	}
	
	loadres('bootstrap.min.css')
	.then(res) {
		...
	}
```

2.load scripts

```js
	loadres([
		'jQuery.min.js',
		'jQuery-ui.min.js',
		'bootstrap.min.js'
	])
	.then(res) {
		...
	}
```

3.load scripts and styles
```
	loadres([
		'jQuery-ui.min.css',
		'bootstrap.min.css',
		'jQuery.min.js',
		'jQuery-ui.min.js',
		'bootstrap.min.js'
	])
```

**NOTE**

loadres will recognize resource type automatically, and  
will mount styles to the bottom of header tag.   
will mount scripts to the bottom of body tag.