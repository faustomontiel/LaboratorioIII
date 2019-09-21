namespace Vehiculo
{
	declare var $:any;	

	$("#document").ready(function()
		{
			
			$("#btnAlta").click(function()
			{
				limpiarFormulario();
				$("#containerMult").modal("show");
				$("#btnAgregar").show();
				$("#btnModificar").hide();
				
			})

			$("#btnAgregar").click(agregarVehiculo);

			$("#chkId").click(mostrarVehiculos);
			$("#chkMarca").click(mostrarVehiculos);
			$("#chkModelo").click(mostrarVehiculos);
			$("#chkPrecio").click(mostrarVehiculos);
			$("#btnPromedio").click(calcularPromedio);
			$("#selectTipo").change(mostrarVehiculos);

			if(localStorage.getItem("lista")) 
		    {
		    	let listaString:any = localStorage.getItem("lista"); 

				lista = JSON.parse(listaString);
		    }

		    mostrarVehiculos();
		});



	var lista:Array<Vehiculo> = new Array<Vehiculo>();

	function agregarVehiculo()
	{
		//genero el id
		let id = buscarId();
		//tomo los valores del modal
    	let marca:string = String($("#txtMarca").val());
    	let modelo:string = String($("#txtModelo").val());
    	let precio:number = Number($("#txtPrecio").val());
   	 	let tipo:string = String($("#tipo").val());

		let vehiculo;
			
		//dependiento del tipo creo el objeto
   	 	if(tipo == "Auto")
   	 	{
   	 		vehiculo = new Auto(id, marca, modelo, precio, 2);
   	 	}
   	 	else
   	 	{
   	 		vehiculo = new Camioneta(id, marca, modelo, precio, true);
   	 	}
		//guardo y muestro el vehiculo,
		LocalStorage(vehiculo);
			
   	 	mostrarVehiculos();
	}
	/*
	public static BuscarIDMasAlto():number{
            let IDMasAlto: number = this.listaClientes.reduce(function (IDMasAlto, cliente, i, array) {
                if(cliente.getID() > IDMasAlto){
                    IDMasAlto = cliente.getID();
                }
                return IDMasAlto;
            }, 0);

            return IDMasAlto;
        }
	*/ 
	function buscarId():number
	{
		if (lista.length === 0)
		{
			return 1;
		}

	    let ultimo:Vehiculo = lista.reduce((prev, act) => (prev.id > act.id) ? prev : act);

	    return ultimo.id + 1;
	}

	function filtrar()
	{
		let tipo:string = $("#selectTipo").val(); 
		let listaFilt:any;
		let toParse=localStorage.getItem("lista");
		var carga = JSON.parse(toParse);
		
		if(tipo == "Auto")
		{
			listaFilt=carga.filter((a)=>a.cantidadPuertas!=null);
			
		}
		else
		{
			listaFilt=carga.filter((a)=>a.cuatroXcuatro!=null);
		}

		return listaFilt;
	}
	/*
	 //Calcula el promedio de edades y lo muestra.
        public static GenerarEstadisticas(): void{
            let sumaNotas:number = this.listaClientes.reduce(function(total,cliente,i,array){
                return total += cliente.getEdad();
            },0);
            let promedio:number = sumaNotas / this.listaClientes.length;
            $("#txtPromedio").val(String(promedio));
        }*/
	function calcularPromedio()
	{
		let listaFilt:Array<Vehiculo> = new Array<Vehiculo>();
		listaFilt = filtrar(); 
		let numVehiculos:number = listaFilt.length;
		let promedio:number = listaFilt.reduce(function(total:number, vehiculo):any
    	{
    		return total += vehiculo.precio;
    	},0);

    	$("#Promedio").val(promedio/numVehiculos);
	}

	function mostrarVehiculos()
	{
		$("#tBody").empty();
		let listaFilt = filtrar(); 

		let nodoTrTh:any = $("<tr>");
		let nodoTh1:any = $("<th>");
		let nodoTh2:any = $("<th>");
		let nodoTh3:any =$("<th>");
		let nodoTh4:any = $("<th>");
		let nodoTh5:any =$("<th>");
		$(nodoTh1).text("ID");
		$(nodoTh2).text("Marca");
		$(nodoTh3).text("Modelo");
		$(nodoTh4).text("Precio");
		$(nodoTh5).text("Accion");		
		

		if($('#chkId').prop('checked'))
		{
			$(nodoTrTh).append(nodoTh1);
		}

		if($('#chkMarca').prop('checked'))
		{
			$(nodoTrTh).append(nodoTh2);
		}

		if($('#chkModelo').prop('checked'))
		{
			$(nodoTrTh).append(nodoTh3);
		}

		if($('#chkPrecio').prop('checked'))
		{
			$(nodoTrTh).append(nodoTh4);
		}

		$(nodoTrTh).append(nodoTh5);

		$("#tBody").append(nodoTrTh);

	    for (var i:number = 0; i < listaFilt.length; i++) 
	    {
			//$("#filaNueva" + i).remove();
	    	let vehiculo:Vehiculo = listaFilt[i];

	        let nodoTr:any = $("<tr>");
			let nodoTd1:any = $("<td>");
			let nodoTd2:any = $("<td>");
			let nodoTd3:any =$("<td>");
			let nodoTd4:any = $("<td>");
			let nodoTd5:any = $("<td>");
			$(nodoTd1).text(String(vehiculo.id));
			$(nodoTd2).text(vehiculo.marca);
			$(nodoTd3).text(vehiculo.modelo);
			$(nodoTd4).text(String(vehiculo.precio));
			if($('#chkId').prop('checked'))
			{
				$(nodoTr).append(nodoTd1);
			}

			if ($('#chkMarca').prop('checked')) 
			{
				$(nodoTr).append(nodoTd2);
			}

			if($('#chkModelo').prop('checked'))
			{
				$(nodoTr).append(nodoTd3);
			}

			if($('#chkPrecio').prop('checked'))
			{
				$(nodoTr).append(nodoTd4);
			}
			let btnModificar=$("<button>");
			btnModificar.click(Modificar);
			btnModificar.text("Modificar");
			btnModificar.addClass("btn btn-success");
			let btnEliminar=$("<button>");
			btnEliminar.click(borrar);
			btnEliminar.text("Borrar");
			btnEliminar.addClass("btn btn-danger");
			$(nodoTd5).append(btnModificar);
			$(nodoTd5).append(btnEliminar);
			$(nodoTr).append(nodoTd5);

	        $("#tBody").append(nodoTr);
	    }
	}

	function Modificar(event:Event) 
	{
		$("#btnModificar").show();
		$("#btnAgregar").hide();
	    let tagTd:any = event.target;
	    let tagButton:any = $(tagTd).parent();
		let tag:any = $(tagButton).parent();
		let tr=$(tag).children();
	    let id:any = String($(tr[0]).text());
	    let marca:any = $(tr[1]).text();
	    let modelo:any = $(tr[2]).text();
	    let precio:any = String($(tr[3]).text());
		let tipo:any=String($(tr[4]).text());
		$("#txtId").val(id);
	    $("#txtMarca").val(marca);
	    $("#txtModelo").val(modelo);
		$("#txtPrecio").val(precio);
		$("#tipo").attr("value",tipo);
		let toParse=localStorage.getItem("lista");
		var carga = JSON.parse(toParse);
		
		for(let i=0;i<carga.length; i++)
		{
	
			if(id==carga[i].id)
			{
				var index=i;
				break;
			}
		}
		
	    
	    $("#btnModificar").click(function(){
			let tipo:string = String($("#tipo").val());
			let vehiculo:Vehiculo;
			if(tipo == "Auto")
		{
			vehiculo = new Auto(id,String($("#txtMarca").val()),String($("#txtModelo").val()),  Number($("#txtPrecio").val()), 2);
			
		}
		else
		{
			vehiculo = new Camioneta(id,String($("#txtMarca").val()),String($("#txtModelo").val()),  Number($("#txtPrecio").val()), true);
			
		}

		lista=[];
		localStorage.clear();
		for(let i=0;i<carga.length; i++)
		{
			if(i==index)
			{
				lista.push(vehiculo);
			}
			else
			{
				lista.push(carga[i]);
			}
		}
		localStorage.setItem('lista', JSON.stringify(lista));

		mostrarVehiculos();
		
		limpiarFormulario();
		});

		$("#header2").html("Modificar vehiculo");
		
		$("#containerMult").modal("show");
	}

	function limpiarFormulario()
	{
		$("#txtId").val("");
		$("#txtMarca").val("");
    	$("#txtModelo").val("");
    	$("#txtPrecio").val("");
		$("#btnAgregar").show();
		$("#btnModificar").hide();

    	$("#header2").html("Alta Vehiculo");
	}

	function borrar(event:Event)
	{
		let elemento = event.target;
    	let nodo = $(elemento).parent();
		let tr = $(nodo).parent();
		let td =$(tr).children();
		let id:string =String ($(td[0]).text());
		let toParse=localStorage.getItem("lista");
		var carga = JSON.parse(toParse);
		localStorage.clear();
		lista=[];
		for(let i=0;i<carga.length; i++)
		{

			if(id!=carga[i].id)
		{
			LocalStorage(carga[i]);
		}
		}
		mostrarVehiculos();
	}


	function LocalStorage(vehiculo:Vehiculo) 
	{
        if (localStorage.getItem("lista") === null) 
        {
            lista.push(vehiculo);
            localStorage.setItem('lista', JSON.stringify(lista));
        }
        else
        {
            let toParse:any = localStorage.getItem('lista');
            lista = JSON.parse(toParse);
            lista.push(vehiculo);
            localStorage.setItem('lista', JSON.stringify(lista));
        }
    }
}