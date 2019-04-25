var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));

//var personas=require('./MOCK_DATA.json');




app.get("/personas",function(req,res){
    
    res.send([{"nombre":"Chiquia","apellido":"Baptist","fecha":"1979/04/07","telefono":"4923023102"},
{"nombre":"Annissa","apellido":"Kleinlerer","fecha":"1987/11/18","telefono":"6793823280"},
{"nombre":"Reiko","apellido":"Muat","fecha":"1972/10/26","telefono":"1725850167"},
{"nombre":"Vernen","apellido":"MacConnel","fecha":"1983/11/16","telefono":"4497697435"},
{"nombre":"Frederica","apellido":"Boggers","fecha":"1975/10/17","telefono":"1141857691"},
{"nombre":"Roxy","apellido":"Edowes","fecha":"1978/01/12","telefono":"7225696366"},
{"nombre":"Lawton","apellido":"Dawdary","fecha":"1979/06/18","telefono":"1632952145"},
{"nombre":"Ki","apellido":"Beston","fecha":"1979/07/26","telefono":"8529878768"},
{"nombre":"Krysta","apellido":"Alkins","fecha":"1997/12/18","telefono":"7428838803"},
{"nombre":"Natalie","apellido":"Finnan","fecha":"1979/05/26","telefono":"5929493650"},
{"nombre":"Lusa","apellido":"Queyeiro","fecha":"1983/05/01","telefono":"6268154754"},
{"nombre":"Eleonore","apellido":"Ilsley","fecha":"1995/06/21","telefono":"6628991514"}]);
});


app.post("/nuevaPersona",function(req,res){
    setTimeout(function(){
        console.log("Llego al servidor "+JSON.stringify(req.body));
        console.log((req.body.nombre!= undefined &&req.body.nombre!= "") );
       
        if((req.body.nombre!= undefined&&req.body.nombre!= "") &&(req.body.apellido!= undefined&&req.body.nombre!= "") &&  (req.body.telefono!= undefined&&req.body.telefono!= "") && (req.body.fecha!= undefined&&req.body.fecha!= "")){
            
                console.log("Sale del servidor "+"{'respuesta': 'ok'}");
                personas.push(req.body);

                res.send({'respuesta': 'ok'});    
            
            return;
        }
        console.log("Sale del servidor "+"{'respuesta': 'error'}")
        res.send({'respuesta': 'error'});
    },2000);
    
});



app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});