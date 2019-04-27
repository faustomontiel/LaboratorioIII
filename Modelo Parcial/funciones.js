var xml = new XMLHttpRequest();
window.addEventListener("load",function(){
    var btn = $("btn");
    btn.addEventListener("click",validar);

});

function validar(){
    if(enviarGet()){
        window.location.replace("./index.html");
    }
}
   
function enviarGet(){
    var usr = document.getElementById("usr").value;
    var pass = document.getElementById("pass").value;

    if(usr!="" && pass!="" ){
        if(usr=="fausto" && pass=="123"){
    //var parametros ="?usr="+usr.value+"&pass="+pass.value;
    
    var parametros = {email: usr,password: pass};
    
    //xml.open("GET","http://localhost:3000/loginUsuario"+parametros,true);
    xml.open("POST"," http://localhost:1337/login",true);
    /*xml.setRequestHeader("Content-type",
     /*"application/json");//avisandole lo que tiene que saber el server.*/
    xml.onreadystatechange = callback;
    xml.send(JSON.stringify(parametros));//body.
    return true;
    }else{alert("Datos incorrectos");}
    }else{
        alert("Datos incorrectos, debe ingresar un usuario y contraseña");
        return false;
    }
}

function $(id){
    return document.getElementById(id);
}

function callback()         {
    if (xml.readyState === 4) {
        if (xml.status === 200){
            //console.log("Llego la respuesta del servidor ",xml.readyState,xml.status,xml.responseText);
            var respuesta = xml.responseText;
            if (respuesta=="true") {
                alert("Login OK");
            }
            else if(respuesta=="false"){
                alert("FALLA");
            }else{
                console.log(respuesta);
            }
        }else{
            alert("Error del servidor ",xml.status);
            }
}
}