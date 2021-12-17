Vue.component('component-vehiculos',{
    data:()=>{
        return {
            accion : 'nuevo',
        msg    : '',
        status : false,
        error  : false,
        buscar : "",
        vehiculo:{
            idvehiculo      : 0,
            codigo         : '',
            nombre         : '',
            direccion      : '',
            zona           : '',     
        },
        vehiculos:[]
      }
    },
    methods:{
        buscandovehiculo(){
            this.vehiculos = this.vehiculos.filter((element,index,vehiculos) => element.nombre.toUpperCase().indexOf(this.buscar.toUpperCase())>=0 || element.codigo.toUpperCase().indexOf(this.buscar.toUpperCase())>=0 );
            if( this.buscar.length<=0){
                this.obtenerDatos();
            }
        },
        buscandoCodigovehiculo(store){
            let buscarCodigo = new campomise( (resolver,rechazar)=>{
                let index = store.index("codigo"),
                    data = index.get(this.vehiculo.codigo);
                data.onsuccess=evt=>{
                    resolver(data);
                };
                data.onerror=evt=>{
                    rechazar(data);
                };
            });
            return buscarCodigo;
        },
        async guardarvehiculo(){
            let store = this.abrirStore("tblvehiculos",'readwrite'),
                duplicado = false;
            if( this.accion=='nuevo' ){
                this.vehiculo.idvehiculo = generarIdUnicoDesdeFecha();
                
                let data = await this.buscandoCodigovehiculo(store);
                duplicado = data.result!=undefined;
            }
            if( duplicado==false){
                let query = store.put(this.vehiculo);
                query.onsuccess=event=>{
                    this.obtenerDatos();
                    this.limpiar();   
                    this.mostrarMsg('Registro guardado con éxito',false);
                };
                query.onerror=event=>{
                    this.mostrarMsg('Error al guardar registro',true);
                    console.log( event );
                };
            } else{
                this.mostrarMsg('Código de vehiculo duplicado',true);
            }
        },
        mostrarMsg(msg, error){
            this.status = true;
            this.msg = msg;
            this.error = error;
            this.quitarMsg(3);
        },
        quitarMsg(time){
            setTimeout(()=>{
                this.status=false;
                this.msg = '';
                this.error = false;
            }, time*1000);
        },
        obtenerDatos(){
            let store = this.abrirStore('tblvehiculos','readonly'),
                data = store.getAll();
            data.onsuccess=resp=>{
                this.vehiculos = data.result;
            };
        },
        
        mostrarvehiculo(campo){
            this.vehiculo = campo;
            this.accion='modificar';
        },
        limpiar(){
            this.accion='nuevo';
            this.vehiculo.idvehiculo='';
            this.vehiculo.codigo='';
            this.vehiculo.nombre='';
            this.vehiculo.direccion='';
            this.vehiculo.zona='';
           
            this.obtenerDatos();
        },
        eliminarvehiculo(campo){
            if( confirm(`¿Está seguro que desea eliminar a: ${campo.nombre}?`) ){
                let store = this.abrirStore("tblvehiculos",'readwrite'),
                    req = store.delete(campo.idvehiculo);
                req.onsuccess=resp=>{
                    this.mostrarMsg('Registro eliminado con éxito',true);
                    this.obtenerDatos();
                };
                req.onerror=resp=>{
                    this.mostrarMsg('Error al eliminar el registro',true);
                    console.log( resp );
                };
            }
        },
        abrirStore(store,modo){
            let tx = db.transaction(store,modo);
            return tx.objectStore(store);
        }
    },
    created(){
        //this.obtenerDatos();
    },
    template:`
    <form v-on:submit.prevent="guardarvehiculo" v-on:reset="limpiar">
    <div class="row">
        <div class="col-sm-5">
            <div class="row p-2">
                <div class="col-sm text-center text-white btn-dark">
                    <h5>Registro de los vehiculos</h5>
                </div>
            </div>
            <div class="row p-2">
                <div class="col-sm">Código:</div>
                <div class="col-sm">
                    <input v-model="vehiculo.codigo" required pattern="^[0-9]{4}$" type="text" class="form-control form-control-sm" placeholder="Código" >
                </div>
            </div>
            <div class="row p-2">
                <div class="col-sm">Nombre: </div>
                <div class="col-sm">
                    <input v-model="vehiculo.nombre" required pattern="[A-ZÑña-z0-9 ]{5,65}" type="text" class="form-control form-control-sm" placeholder="Nombre">
                </div>
            </div>
            <div class="row p-2">
                <div class="col-sm">Dirección: </div>
                <div class="col-sm">
                    <input v-model="vehiculo.direccion" required pattern="[A-ZÑña-z0-9 ]{5,65}" type="text" class="form-control form-control-sm" placeholder="Dirección">
                </div>
            </div>
            
            <div class="row p-2">
                <div class="col-sm"> Zona: </div>
                <div class="col-sm">
                    <input v-model="vehiculo.zona" required pattern="[A-ZÑña-z0-9 ]{5,15}" type="text" class="form-control form-control-sm" placeholder="Zona">
                </div>
            </div>
            
            <div class="row p-2">
                <div class="col-sm text-center">
                    <input type="submit" value="Guardar" class="btn btn-dark">
                    <input type="reset" value="Limpiar" class="btn btn-info">
                </div>
            </div>
            <div class="row p-2">
                <div class="col-sm text-center">
                    <div v-if="status" class="alert" v-bind:class="[error ? 'alert-danger' : 'alert-success']">
                        {{ msg }}
                    </div>
                </div>
            </div>
        </div>
        
        
        <div class="col-sm"></div>
        <div class="col-sm-6 p-2">
            <div class="row text-center text-white bg-info">
                <div class="col"><h5>vehiculos Registrados</h5></div>
            </div>
            
            <div class="row">
                <div class="col">
                    <table class="table table-sm table-hover">
                        <thead>
                            <tr>
                                <td colspan="5">
                                    <input v-model="buscar" v-on:keyup="buscandovehiculo" type="text" class="form-control form-contro-sm" placeholder="Buscar vehiculo">
                                </td>
                            </tr>
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Zona</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="campo in vehiculos" v-on:click="mostrarvehiculo(campo)">
                                <td>{{ campo.codigo }}</td>
                                <td>{{ campo.nombre }}</td>
                                <td>{{ campo.direccion }}</td>
                                <td>{{ campo.zona }}</td>
                                <td>
                                    <a @click.stop="eliminarvehiculo(campo)" class="btn btn-danger">Eliminar</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</form>
    `
});