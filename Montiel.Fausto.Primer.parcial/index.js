var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));


var personas = [{
  "id": 1,
  "nombre": "Matemática",
  "cuatrimestre": 1,
  "fechaFinal": "16/11/2019",
  "turno": "Mañana"
}, {
  "id": 2,
  "nombre": "Sistema de Procesamiento de Datos",
  "cuatrimestre": 1,
  "fechaFinal": "19/11/2019",
  "turno": "Mañana"
}, {
  "id": 3,
  "nombre": "Inglés",
  "cuatrimestre": 1,
  "fechaFinal": "04/12/2019",
  "turno": "Mañana"
}, {
  "id": 4,
  "nombre": "Programación I",
  "cuatrimestre": 1,
  "fechaFinal": "25/11/2019",
  "turno": "Mañana"
}, {
  "id": 5,
  "nombre": "Laboratorio de Computación I",
  "cuatrimestre": 1,
  "fechaFinal": "25/11/2019",
  "turno": "Mañana"
}, {
  "id": 6,
  "nombre": "Arquitectura y Sistemas Operativos",
  "cuatrimestre": 2,
  "fechaFinal": "10/12/2019",
  "turno": "Mañana"
}, {
  "id": 7,
  "nombre": "Estadística",
  "cuatrimestre": 2,
  "fechaFinal": "18/11/2019",
  "turno": "Mañana"
}, {
  "id": 8,
  "nombre": "Metodología de la Investigación",
  "cuatrimestre": 2,
  "fechaFinal": "23/11/2019",
  "turno": "Mañana"
}, {
  "id": 9,
  "nombre": "Elementos de Investigación Operativa",
  "cuatrimestre": 3,
  "fechaFinal": "03/12/2019",
  "turno": "Noche"
}, {
  "id": 10,
  "nombre": "Programación III",
  "cuatrimestre": 3,
  "fechaFinal": "07/11/2019",
  "turno": "Noche"
}, {
  "id": 11,
  "nombre": "Organización Contable de la Empresa",
  "cuatrimestre": 3,
  "fechaFinal": "18/11/2019",
  "turno": "Mañana"
}, {
  "id": 12,
  "nombre": "Organización Empresarial",
  "cuatrimestre": 3,
  "fechaFinal": "25/11/2019",
  "turno": "Noche"
}, {
  "id": 13,
  "nombre": "Diseño y Administración de Bases de Datos",
  "cuatrimestre": 4,
  "fechaFinal": "06/12/2019",
  "turno": "Mañana"
}, {
  "id": 14,
  "nombre": "Legislación",
  "cuatrimestre": 4,
  "fechaFinal": "13/11/2019",
  "turno": "Noche"
}, {
  "id": 15,
  "nombre": "Metodología de Sistemas I",
  "cuatrimestre": 4,
  "fechaFinal": "14/11/2019",
  "turno": "Noche"
}];
var id =15;
app.get("/login",function(req,res){
    
    res.send("ok");
});

app.get("/loginUsuario",function(req,res){
    console.log(req.query);
    if(req.query.usr!=undefined && req.query.pass!=undefined){
        if(req.query.usr==="usuario"&&req.query.pass==="1234")
            res.send("true");    
        else
            res.send("false");
        return;
    }
    res.send("Debe ingresar Usuario y Contraseña");
    
});
app.get("/materias",function(req,res){
   
 res.send(personas);    

        return;
   
   
    
});

app.post("/loginUsuario",function(req,res){
    setTimeout(function(){
        console.log(req.body)
        if(req.body.usr!=undefined && req.body.pass!=undefined){
            if(req.body.usr==="usuario"&&req.body.pass==="1234")
                res.send("true");    
            else
                res.send("false");
            return;
        }
        res.send("Debe ingresar Usuario y Contraseña");
    },2000);
    
});

app.post("/login",function(req,res){
    setTimeout(function(){
        console.log("Llego al servidor "+JSON.stringify(req.body));
        
       
        if(req.body.email!=undefined && req.body.password!=undefined){
            if(req.body.email==="usuario"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'User'}")
                res.send({'type': 'User'});    
            }else if(req.body.email==="admin"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'Admin'}")
                res.send({'type': 'Admin'});    
            }else{
                console.log("Sale del servidor "+"{'type': 'error'}")
                res.send({'type': 'error'});
            }
            return;
        }
        console.log("Sale del servidor "+"{'type': 'error'}")
        res.send({'type': 'error'});
    },2000);
    
});


app.post("/nueva",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if((req.body.id!= undefined&&req.body.id!= "") &&(req.body.nombre!= undefined&&req.body.nombre!= "") &&(req.body.cuatrimestre!= undefined&&req.body.cuatrimestre!= "") 
			&&  (req.body.fechaFinal!= undefined&&req.body.fechaFinal!= "") && (req.body.turno!= undefined&&req.body.turno!= "")){
	
			id = id +1;
       
			
			var data = {"id":id,"nombre":req.body.nombre,"cuatrimestre":req.body.cuatrimestre,"fechaFinal":req.body.fechaFinal,"turno":req.body.turno};
				personas.push(data);
                res.send(data);    
     
            return;
        }
        res.send({'type': 'error'});
    },2000);
    
});

app.post("/editar",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if((req.body.id!= undefined&&req.body.id!= "") &&(req.body.nombre!= undefined&&req.body.nombre!= "") &&(req.body.cuatrimestre!= undefined&&req.body.cuatrimestre!= "") 
			&&  (req.body.fechaFinal!= undefined&&req.body.fechaFinal!= "") && (req.body.turno!= undefined&&req.body.turno!= "")){
	

        
				for(var i =0;i<personas.length;i++){
					if(req.body.id== personas[i].id){
						personas[i].nombre=req.body.nombre;
						personas[i].cuatrimestre=req.body.cuatrimestre;
						personas[i].fechaFinal=req.body.fechaFinal;
						personas[i].turno=req.body.turno;
							res.send({'type': 'ok'});    
							return;
					}
				}
		
        }
        res.send({'type': 'error'});
    },2000);
    
});
app.post("/eliminar",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if(req.body.id!= undefined&&req.body.id!= ""){
	
			for(var i =0;i<personas.length;i++){
					if(req.body.id== personas[i].id){
						personas.splice(i,1);
        	var data = {"type":"ok"};
							res.send(data);    
							return;
					}
				}
			
			

        }
        res.send({'type': 'error'});
    },2000);
    
});

app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});