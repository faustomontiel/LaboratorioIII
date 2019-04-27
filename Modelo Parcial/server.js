var http = require('http');
var port = process.env.port || 1337;
http.createServer(function (request, response) {
	var headers = request.headers;
	var method = request.method;
	var url = request.url;
	var body = [];
	request.on('error', function (err) {
		console.error(err);
	}).on('data', function (chunk) {
		body.push(chunk);
	}).on('end', function () {
		body = Buffer.concat(body).toString();
		// BEGINNING OF NEW STUFF
		
		response.on('error', function (err) {
			console.error(err);
		});
		
		if (request.url.includes('getPost')) {
			
			var waitTill = new Date(new Date().getTime() + 10 * 1000);
			while (waitTill > new Date()) { }
			//if (req.query.cod == '1') {
			imagen = 'https://i.ytimg.com/vi/K962kbvmJLY/maxresdefault.jpg';
			//}
			//else {
			imagen = 'http://www.somosdiablos.com.ar/media/galeria/111/0/1/1/8/o_independiente_la_hinchada-2288110.jpg'
			//}
			
			response.end('<h2><a href="#">Blog Post Title</a></h2><p class="lead">by <a href="index.php">Start Bootstrap</a></p><p><span class="glyphicon glyphicon-time"></span> Posted on August 28, 2013 at 10:00 PM</p><hr><img class="img-responsive" src="' + imagen + '" alt=""><hr><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, veritatis, tempora, necessitatibus inventore nisi quam quia repellat ut tempore laborum possimus eum dicta id animi corrupti debitis ipsum officiis rerum.</p><a class="btn btn-primary" href="#">Read More <span class="glyphicon glyphicon-chevron-right"></span></a><hr>');
		}
		else if (request.url.includes('obtenerPosts')) {
			
			var waitTill = new Date(new Date().getTime() + 10 * 1000);
			while (waitTill > new Date()) { }
			//if (req.query.cod == '1') {
			imagen = 'https://i.ytimg.com/vi/K962kbvmJLY/maxresdefault.jpg';
			//}
			//else {
			imagen = 'http://www.somosdiablos.com.ar/media/galeria/111/0/1/1/8/o_independiente_la_hinchada-2288110.jpg'
			//}
			
			response.end('<h2><a href="#">Blog Post Title</a></h2><p class="lead">by <a href="index.php">Start Bootstrap</a></p><p><span class="glyphicon glyphicon-time"></span> Posted on August 28, 2013 at 10:00 PM</p><hr><img class="img-responsive" src="' + imagen + '" alt=""><hr><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, veritatis, tempora, necessitatibus inventore nisi quam quia repellat ut tempore laborum possimus eum dicta id animi corrupti debitis ipsum officiis rerum.</p><a class="btn btn-primary" href="#">Read More <span class="glyphicon glyphicon-chevron-right"></span></a><hr>');
		}
		else if (request.url.includes('postearNuevaEntrada')) {
			
			var waitTill = new Date(new Date().getTime() + 10 * 1000);
			while (waitTill > new Date()) { }
			//if (req.query.cod == '1') {
			response.statusCode = 200;
			response.setHeader('Content-Type', 'application/json');
			// Set CORS headers
			response.setHeader('Access-Control-Allow-Origin', '*');
			response.setHeader('Access-Control-Request-Method', '*');
			response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
			response.setHeader('Access-Control-Allow-Headers', '*');
			// Note: the 2 lines above could be replaced with this next one:
			// response.writeHead(200, {'Content-Type': 'application/json'})
			
			if (body != "") {
				var requestBodyObject = JSON.parse(body);
				requestBodyObject.date = new Date().toLocaleString();
			}
			
			response.write(JSON.stringify(requestBodyObject));
			response.end();
		}
		else if (request.url.includes('login')) {
			
			response.statusCode = 200;
			response.setHeader('Content-Type', 'application/json');
			// Set CORS headers
			response.setHeader('Access-Control-Allow-Origin', '*');
			response.setHeader('Access-Control-Request-Method', '*');
			response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
			response.setHeader('Access-Control-Allow-Headers', '*');
			// Note: the 2 lines above could be replaced with this next one:
			// response.writeHead(200, {'Content-Type': 'application/json'})
			
			if (body != "") {
				var requestBodyObject = JSON.parse(body);
				if ((requestBodyObject.email != "") && (requestBodyObject.password != "")) {
					var responseBody = {
						autenticado: 'si',
						preferencias: { color: "blue", font: "Verdana" }
					}
				}				
			}
				
			response.write(JSON.stringify(responseBody));
			response.end();
		}
		else if (request.url.includes('cambiarPreferencias')) {
			
			response.statusCode = 200;
			response.setHeader('Content-Type', 'application/json');
			// Note: the 2 lines above could be replaced with this next one:
			// response.writeHead(200, {'Content-Type': 'application/json'})
			// Set CORS headers
			response.setHeader('Access-Control-Allow-Origin', '*');
			response.setHeader('Access-Control-Request-Method', '*');
			response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
			response.setHeader('Access-Control-Allow-Headers', '*');
		
			if (body != "") {
				var requestBodyObject = JSON.parse(body);
				if (requestBodyObject.color == "blue") {
					var responseBody = {
						color: "red", 
						font: "Arial"
					}
				}
				else { 
					var responseBody = {
						color: "blue", 
						font: "Verdana"
					}
				}
			}
			
			response.write(JSON.stringify(responseBody));
			response.end();
		}
		else { 
			response.statusCode = 200;
			response.setHeader('Content-Type', 'application/json');
			// Note: the 2 lines above could be replaced with this next one:
			// response.writeHead(200, {'Content-Type': 'application/json'})
			// Set CORS headers
			response.setHeader('Access-Control-Allow-Origin', '*');
			response.setHeader('Access-Control-Request-Method', '*');
			response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
			response.setHeader('Access-Control-Allow-Headers', '*');

			if (body != "") {
				var requestBodyObject = JSON.parse(body);
				for (x in requestBodyObject) {
					requestBodyObject[x].nombre = requestBodyObject[x].nombre + " - Modificado en el server";
				}
			}
			

			var responseBody = {
				headers: headers,
				method: method,
				url: url,
				body: JSON.stringify(requestBodyObject)
			};
			
			response.write(JSON.stringify(responseBody));
			response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))
		}
		

    // END OF NEW STUFF
	});
}).listen(port, console.log("Escuchando en el puerto " + port));