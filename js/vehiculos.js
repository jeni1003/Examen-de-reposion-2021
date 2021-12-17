$(document).ready(function() {
    var idVehiculo, opcion;
    opcion = 4;
        
    campo = $('#campo').DataTable({  
        "ajax":{            
            "url": "bd/crud.php", 
            "method": 'POST', //usamos el metodo POST
            "data":{opcion:opcion}, //enviamos opcion 4 para que haga un SELECT
            "dataSrc":""
        },
        "columns":[
            {"data": "idVehiculo"},
            {"data": "Marca"},
            {"data": "Modelo"},
            {"data": "year"},
            {"data": "num_motor"},
            {"data": "Num_Chasis"},
            {"data": "status"},
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button></div></div>"}
        ]
    });     
    
    var fila; //captura la fila, para editar o eliminar
    //submit para el Alta y Actualización
    $('#formcampo').submit(function(e){                         
        e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
        Marca = $.trim($('#Marca').val());    
        Modelo = $.trim($('#Modelo').val());
        year = $.trim($('#year').val());    
        num_motor = $.trim($('#num_motor').val());    
        Num_Chasis = $.trim($('#Num_Chasis').val());
        status = $.trim($('#status').val());                            
            $.ajax({
              url: "crud.php",
              type: "POST",
              datatype:"json",    
              data:  {idVehiculo:idVehiculo, Marca:Marca, Modelo:Modelo, year:year, num_motor:num_motor, Num_Chasis:Num_Chasis ,status:status ,opcion:opcion},    
              success: function(data) {
                campo.ajax.reload(null, false);
               }
            });			        
        $('#modalCRUD').modal('hide');											     			
    });
            
     
    
    //para limpiar los campos antes de dar de Alta una Persona
    $("#btnNuevo").click(function(){
        opcion = 1; //alta           
        idVehiculo=null;
        $("#formcampo").trigger("reset");
        $(".modal-header").css( "background-color", "#17a2b8");
        $(".modal-header").css( "color", "white" );
        $(".modal-title").text("Alta de Usuario");
        $('#modalCRUD').modal('show');	    
    });
    
    //Editar        
    $(document).on("click", ".btnEditar", function(){		        
        opcion = 2;//editar
        fila = $(this).closest("tr");	        
        idVehiculo = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
        Marca = fila.find('td:eq(1)').text();
        Modelo = fila.find('td:eq(2)').text();
        year = fila.find('td:eq(3)').text();
        num_motor = fila.find('td:eq(4)').text();
        Num_Chasis = fila.find('td:eq(5)').text();
        status = fila.find('td:eq(6)').text();
        $("#Marca").val(Marca);
        $("#Modelo").val(Modelo);
        $("#year").val(year);
        $("#num_motor").val(num_motor);
        $("#Num_Chasis").val(Num_Chasis);
        $("#status").val(status);
        $(".modal-header").css("background-color", "#007bff");
        $(".modal-header").css("color", "white" );
        $(".modal-title").text("Editar Usuario");		
        $('#modalCRUD').modal('show');		   
    });
    
    //Borrar
    $(document).on("click", ".btnBorrar", function(){
        fila = $(this);           
        idVehiculo = parseInt($(this).closest('tr').find('td:eq(0)').text()) ;		
        opcion = 3; //eliminar        
        var respuesta = confirm("¿Está seguro de borrar el registro "+idVehiculo+"?");                
        if (respuesta) {            
            $.ajax({
              url: "bd/crud.php",
              type: "POST",
              datatype:"json",    
              data:  {opcion:opcion, idVehiculo:idVehiculo},    
              success: function() {
                  campo.row(fila.parents('tr')).remove().draw();                  
               }
            });	
        }
     });
         
    });    
    