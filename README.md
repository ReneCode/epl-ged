there are two ways to use ES6 JS modules:

- using webpack  (npm run pack)
	this create one transpliled file public/main.js
	index.html  /  <script src="public/main.js"></script>

- using es6-module-loader & traceur
	this transpiles the files on demand on the client-browser
	index.html  /  System.import("src/app.js")
