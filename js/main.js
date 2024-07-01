let iniciar = confirm('Para disfrutar de la experiencia completa, abra la consola utilizando F12')
const carrito = []
const descuentoEfectivo = 0.90
const servicioDeMesa = 500 
const sumar = (num1, num2) => num1 + num2
// const restar = (num1, num2) => num1 - num2
const multiplicar = (num1, num2) => num1 * num2
const descuento = function(precioFinal,descuento){
    confirm('En efectivo tienes un 10% de descuento!!\n\n\n\nQuieres aprovecharlo?')
    if (confirm=true) {
        let precioConDescuento = multiplicar(precioFinal,descuentoEfectivo)
        console.log('$'+precioConDescuento+' Precio con descuento')
    }else{
    }
}
const cafes = [
    {nombre:'Espresso', precio: 1200},
    {nombre:'Café con Leche', precio: 1500},
    {nombre:'Cappuccino', precio: 1520},
    {nombre:'Americano', precio: 1000},
    {nombre:'Macchiato', precio: 1700},
    {nombre:'Moka', precio: 1800}
]
const comidasDesayunoMerienda = [
    { nombre: 'Tostadas con mermelada', precio: 500 },
    { nombre: 'Croissant', precio: 700 },
    { nombre: 'Muffin', precio: 800 },
    { nombre: 'Panqueques', precio: 1000 },
    { nombre: 'Yogur con granola', precio: 1200 },
    { nombre: 'Avena con frutas', precio: 1100 },
    { nombre: 'Sandwich de huevo', precio: 1300 },
]
let total = 0
let mesa


if(iniciar == true){
    numMesa()
    iniciar = false
}


//Funcion numMesa()

function numMesa() {
    mesa = parseInt(prompt('Ingresa el número de Mesa entre 1 - 15'))
    
    while (mesa <= 0 || mesa > 15 || isNaN(mesa)) {
        alert('Número de mesas disponibles [15] \n\n Ingrese número de mesa válido')
        mesa = parseInt(prompt('Ingresa el número de Mesa entre 1 - 15'))
    }
    console.log('Tu Número de mesa es: ' + mesa)
    menu()
}


//Funcion menu()

function menu() {
    let opcion = parseInt(prompt('Mesa Número ' + mesa + ':\nSeleccione Menú a visualizar \n 1-Desayuno/Merienda \n 2-Almuerzo/Cena \n 3-Ver menú completo \n 4-Salir'))
    switch(opcion) {
        case 1:
            desayunoMeriendaComida(comidasDesayunoMerienda, 'Comidas')
            break
        case 2:
            almuerzoCena()
            break
        case 3:
            menuCompleto()
            break
        case 4:
            console.log('Saliendo del menú...')
            break
        default:
            alert("Opción incorrecta")
            menu()
            break    
    }
}



function desayunoMeriendaComida(array,texto) { //array, texto
    let opciones = (' |Desayuno/Merienda| Menu de '+texto+'\n')
    for (let i = 0; i < array.length; i++) {
        opciones += i + 1 +'. '+ array[i].nombre+' $'+array[i].precio+'\n'
    }
    
    let comida = parseInt(prompt(opciones + '(Escribe la opción elegida 1-'+array.length+')'))
    
    if (comida >= 1 && comida <= array.length) {
        console.log('$' + array[comida - 1].precio +' '+ array[comida - 1].nombre )
        total += array[comida - 1].precio
    
    }else{
        alert('Opción no válida')
    }
    
    let comidaConfrimacion = confirm('Quieres pedir algo mas?')
    if (comidaConfrimacion == true) {
        desayunoMeriendaComida(comidasDesayunoMerienda)
    }else{
        desayunoMerienda(cafes)
    }
}

function desayunoMerienda(array) {
    let opciones = ('Has seleccionado Desayuno/Merienda\n¿Qué deseas tomar?\n')
    for (let i = 0; i < array.length; i++) {
        opciones += i + 1 +'. '+ array[i].nombre+' $'+array[i].precio+'\n'
    }
    
    let cafe = parseInt(prompt(opciones + '(Escribe la opción elegida 1-'+array.length+')'))
    
    if (cafe >= 1 && cafe <= array.length) {
        console.log('$' + array[cafe - 1].precio +' '+ array[cafe - 1].nombre )
        total += array[cafe - 1].precio
        
    }else {
        alert('Opción no válida')
    }
    
    cafeConfrimacion = confirm('Quieres otro cafe?')
    if (cafeConfrimacion == true) {
        desayunoMerienda(array)
    }
}

//prueba
// function pedirSegundaVez(funcionSiguiente,funcionRetorno){
//     let restConfirmacion = confirm('Quieres pedir algo mas?')
//     if (restConfirmacion == true) {
//         funcionSiguiente()
//     }else{
//         funcionRetorno()
//     }   
// }


sumar(servicioDeMesa, total)
let precioFinal = sumar(servicioDeMesa, total)
console.log('$'+ servicioDeMesa+ '  Servicio de Mesa'  +'\n$'+precioFinal+ ' Total de la cuenta')
descuento(precioFinal,descuentoEfectivo)


function almuerzoCena() {
    console.log('Función almuerzoCena no definida')
}

function menuCompleto() {
    console.log('Función menuCompleto no definida')
}



//numero de mesa ---> Tipo de menu ---> Bebidas ---> Entradas ---> Cenas ---> Postres 