const autos = require("./autos.json")
const personas = require ("./personas.json")

const concesionaria = {
    autos,
     buscarAuto : function(patente){
         let auto = this.autos.find(auto => auto.patente === patente)
        return auto ? auto : null
     },
    venderAuto : function (patente) {
        let auto = this.buscarAuto(patente)
        auto && (auto.vendido = true)
        return auto
    },
    autosParaLaVenta : function () {
        let autos = this.autos.filter(auto => !auto.vendido)
        return autos
    },
    autosNuevos : function() {
        let autosParaLaVenta = this.autosParaLaVenta()
        return autosParaLaVenta.filter(auto => auto.km < 100)
    },
    listaDeVenta : function(params) {
        let autosVendidos = this.autos.filter(auto => auto.vendido)
        let ventas = autosVendidos.map(auto => auto.precio)
        return ventas
    },
    totalDeVentas : function () {
        let autosVendidos = this.listaDeVenta();
        return autosVendidos.length !== 0 ? autosVendidos.reduce((acum,num) => acum + num ) : 0;
    },
    puedeComprar : function(auto,persona) { 
        return auto.precio <= persona.capacidadDePagoTotal && (auto.precio / auto.cuotas)
         <= persona.capacidadDePagoEnCuotas
        
    },
    autosQuePuedeComprar : function (persona){
        let autosDisponibles = this.autosParaLaVenta()
        let listaParaLaVenta = autosDisponibles.filter(autosDisponibles => this.puedeComprar(autosDisponibles,persona))
        return listaParaLaVenta
        
    }
    
}


console.log(concesionaria.autosQuePuedeComprar(personas[1]));