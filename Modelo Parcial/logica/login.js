var xml = new XMLHttpRequest();

window.addEventListener("load", function()
{
    document.getElementById("btnLogin").addEventListener("click", ingresar);
});

function callback()
{
	if (xml.readyState == 4) 
	{
		if (xml.status == 200) 
		{
            var respuesta = xml.responseText;
            var respuesta = JSON.parse(respuesta);

			if (respuesta.autenticado == "si") 
			{
                var email = document.getElementById("email").value;
                window.location.replace("index.html" + "?preferencias=" + JSON.stringify(respuesta.preferencias) + "&?email=" + email);
			}
			else 
			{
				alert("Usuario o contraseña incorrectos");	
			}
		}
	}
}

function ingresar()
{
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var datosLogin = 
    {
        email: email,
        password: password
    };
    var parametros = JSON.stringify(datosLogin);
    console.log(datosLogin.email);
    console.log(datosLogin.password);

    xml.open("POST", "http://localhost:1337/login", true);
    //xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  NO ADMITIDO SOLO EN ESTE SERVIDOR
    xml.onreadystatechange = callback;
    xml.send(parametros);
}