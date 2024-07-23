const carrito = [] 
const descuentoEfectivo = 0.90
const servicioDeMesa = 500 
const sumar = (num1, num2) => num1 + num2
const multiplicar = (num1, num2) => num1 * num2


const cafes = [
    {nombre:'Espresso', precio: 1200, stock:2},
    {nombre:'Café con Leche', precio: 1500, stock:2},
    {nombre:'Cappuccino', precio: 1520, stock:2},
    {nombre:'Americano', precio: 1000, stock:2},
    {nombre:'Macchiato', precio: 1700, stock:2},
    {nombre:'Moka', precio: 1800, stock:2}
]
const comidasDesayunoMerienda = [
    { nombre: 'Tostadas con mermelada', precio: 500, stock:2},
    { nombre: 'Croissant', precio: 700, stock:2},
    { nombre: 'Muffin', precio: 800, stock:2},
    { nombre: 'Panqueques', precio: 1000, stock:2},
    { nombre: 'Yogur con granola', precio: 1200, stock:2},
    { nombre: 'Avena con frutas', precio: 1100, stock:2},
    { nombre: 'Sandwich de huevo', precio: 1300, stock:2},
]
// const bebidas = [
//     { nombre: "Coca-Cola", precio: 2000, stock:2},
//     { nombre: "Pepsi", precio: 2000, stock:2},
//     { nombre: "Fanta", precio: 2000, stock:2},
//     { nombre: "Sprite", precio: 2000, stock:2},
//     { nombre: "Aquarius", precio: 1300, stock:2},
//     { nombre: "Levité", precio: 1300, stock:2},
//     { nombre: "Ser", precio: 1300, stock:2},
//     { nombre: "H2Oh!", precio: 1300, stock:2}
//   ]
//   const platos = [
//     { nombre: "Pollo asado", precio: 8500, stock:2},
//     { nombre: "Lasaña", precio: 5800, stock:2},
//     { nombre: "Ensalada César", precio: 4300, stock:2},
//     { nombre: "Salmón a la parrilla", precio: 13500, stock:2},
//     { nombre: "Bife de chorizo", precio: 9500, stock:2},
//     { nombre: "Pizza", precio: 6700, stock:2},
//     { nombre: "Pasta Alfredo", precio: 5800, stock:2},
//     { nombre: "Tacos", precio: 4600, stock:2}
//   ]

let total = 0
let mesa

const infomov = document.getElementById('info-mov')
const alertNum = document.getElementById('alertNum')
const h2 = document.getElementById('numeroMesa')
const input = document.getElementById('entradaNum')
const boton = document.getElementById('actualizarNum')
const alertCart = document.getElementById('carritoAlert')
const submenuDivB = document.getElementById('submenu')
const registro = document.createElement('p')


menu()
function menu() {
    document.addEventListener('DOMContentLoaded', () => {
        boton.onclick = () => {
            const valor = Number(input.value)
            if (valor >= 1 && valor <= 15) {
                h2.textContent = 'Mesa Numero: ' + valor
                input.style.display = 'none'
                boton.style.display = 'none'
                alertNum.style.display = 'none'
                document.getElementById('menu').classList.remove('hidden')
                menuItem()
                
            } else {
                alertNum.innerText = `Por favor, ingrese un número entre 1 y 15.`
            }
        } 
    })
}


let products = document.getElementById('contenedor')
function listaProductos(articulo) {
    articulo.forEach((producto) => {
        let contenedor = document.createElement('div')
        contenedor.className = 'itemBox'
        contenedor.innerHTML = `<h3> Producto: ${producto.nombre}</h3>
                                <h4> Precio: $${producto.precio}</h4>
                                <p>Stock: ${producto.stock}</p>`

        products.appendChild(contenedor)
    })
}

function carritoVacio(){
    document.getElementById('botonAlert').onclick = () => {
        alertCart.style.display = 'hidden'
    }
}

function menuItem() {
    document.getElementById('opcion1').onclick = () => {
       
        mostrarSubmenuDesayuno()
    }

    document.getElementById('opcion2').onclick = () => {

        if (carrito.length <= 0) {
        alertCart.style.display = 'block'
        }else{
        totalCarrito()
        }
    }

    document.getElementById('opcion3').onclick = () => {
        carrito.length = 0
        alertNum.innerText = 'Pedido cancelado. Puedes hacer un nuevo pedido.'
        input.style.display = 'block'
        boton.style.display = 'block'
        h2.textContent = 'Seleccione su mesa'
        document.getElementById('menu').classList.remove('hidden')
        registro.remove()
        submenuDiv.remove()
        menu()
    }
}

function mostrarSubmenuDesayuno() {
    const submenuDiv = document.getElementById('submenu')
    submenuDiv.innerHTML = `
        <button id="subopcion1">Infusiones</button>
        <button id="subopcion2">Aperitivos</button>
        <button id="subopcion3">Pedido</button>
        <button id="subopcion4">Volver</button>`

    submenuDiv.classList.remove('hidden')

    document.getElementById('subopcion1').onclick = () => {
        carta(cafes)
    }

    document.getElementById('subopcion2').onclick = () => {
        carta(comidasDesayunoMerienda)
    }

    document.getElementById('subopcion3').onclick = () => {
            totalCarrito()
       
    }

    document.getElementById('subopcion4').onclick = () => {
        submenuDiv.classList.add('hidden')
    }
}

function carta(array) {
    const submenuDiv = document.getElementById('submenu')
    submenuDiv.innerHTML = array.map((item, index) => `
        <button class="carta-item" data-index="${index}">${item.nombre} $${item.precio}</button>`).join('') + '<button id="volverDesayuno">Volver</button>'

    document.querySelectorAll('.carta-item').forEach(button => {
        button.onclick = () => {
            const index = button.getAttribute('data-index')
            total += array[index].precio
            carrito.push(array[index])
            registro.innerText = `Añadido al carrito: ${array[index].nombre}`
            infomov.appendChild(registro)
        }
    })

    document.getElementById('volverDesayuno').onclick = () => {
        mostrarSubmenuDesayuno()
    }
}

function totalCarrito() {
    const submenuDiv = document.getElementById('submenu')
    submenuDiv.innerHTML = `<h3>Carrito:</h3>
                            <ul>${carrito.map(item => `<li>${item.nombre} - $${item.precio}</li>`).join('')}</ul>
                            <p>Cubierto: $${servicioDeMesa}</p>
                            <p>Total: $${total}</p>
                            <p>Total En efectivo: $${total*descuentoEfectivo}</p>
                            <button id="cambiarPedido">Cambiar Pedido</button>
                            <button id="volverMenu">Volver</button>`

    // document.getElementById('volverMenu').onclick = () => {
    //     mostrarSubmenuDesayuno()
    // }
    document.getElementById('volverMenu').onclick = () => {
        mostrarSubmenuDesayuno()
    }
}





































//Funcion menu()

// function menu() {  // MENU
//     let opcion = parseInt(prompt('Mesa Número ' + mesa + ':\n Escriba el numero de la opcion deseada \n 1-Desayuno/Merienda 🥐\n 2-Pedido 🛍️\n 3-Cancelar 🚪'))
//     switch(opcion) {
//         case 1:
//             desayuno('|Desayuno/Merienda|','Infusiones')
//             break
//         case 2:
//             totalCarrito()
//             break
//         case 3:
//             carrito.splice(0, carrito.length)
//             alert('Lamentamos no poder cumplir con tu pedido. Recuerda que puedes dejarnos alguna sugerencia en nuestro portal de Atencion al cliente')
//             numMesa()
//             break
//         default:
//             alert("Opción incorrecta")
//             menu()
//             break                       
//     }
// }
// function desayuno(nombreMenu, bebidas) {
//     let opcion = parseInt(prompt(nombreMenu + ' Menu de: \n\n 1| '+bebidas+'   2| Aperitivos   3| Pedido   4| Volver'))
//     switch(opcion) {
//         case 1:
//             carta(cafes, bebidas)
//             break
//         case 2:
//             carta(comidasDesayunoMerienda, 'Aperitivos')
//             break
//         case 3:
//             totalCarrito()
//             break
//         case 4:
//             menu()
//             break
//         case null:
//             menu()
//             break    
//         default:
//             alert("Opción incorrecta")
//             desayuno('|Desayuno/Merienda|',bebidas)
//             break                       
//     }
// }

// function carta(array, texto) {
    
//     const opciones = array.map((item, index) => (index + 1) + '. ' + item.nombre + ' $' + item.precio).join('\n')
//     const cafe = parseInt(prompt('|Desayuno/Merienda| Menu de ' + texto + ':\n' + opciones + '\n(Escribe la opción elegida 1-' + array.length + ')'))

//     if (cafe >= 1 && cafe <= array.length) {
//         console.log('$' + array[cafe - 1].precio + ' ' + array[cafe - 1].nombre)
//         total += array[cafe - 1].precio
//         carrito.push(array[cafe - 1])
//     } else {
//         alert('Opción no válida')
//     }

//     if (confirm('¿Quieres pedir más ' + texto + '?')) {
//         carta(array, texto)
//     } else {
//         desayuno('|Desayuno/Merienda|', 'Infusiones')
//     }
// }

// function pedido(){
//     let precioFinal = sumar(servicioDeMesa, total) 
//     let totalDeCuenta = ('$'+ servicioDeMesa+ '  Servicio de Mesa'  +'\n$'+precioFinal+ ' Total de la cuenta')
    
//     return { totalDeCuenta, precioFinal }
//     }


// function cuentaMesa() {
//     return carrito.map(item => '$' + item.precio + ' ' + item.nombre).join('\n') + '\n'
// }
// function totalCarrito(){
//     let pedidoTexto = cuentaMesa()
//     let {totalDeCuenta, precioFinal} = pedido()
//     let confirmacionDeCuenta = confirm('Pedido de Mesa N' +mesa+' \n '+ pedidoTexto + totalDeCuenta)
//     if(confirmacionDeCuenta === true){
//         descuento(precioFinal)
//     }else{
//         menu()
//     }
// }

// function descuento(precioFinal){
//     let pedidoTexto = cuentaMesa()
//     let precioConDescuento = multiplicar(precioFinal,descuentoEfectivo)
//     let confirmarDescuento = confirm('En efectivo tienes un 10% de descuento!!\n\n$'+precioConDescuento+' Precio con descuento aplicado\n\nQuieres aprovecharlo?')

//     if (confirmarDescuento === true) {
//         console.log('|Pedido de Mesa N' +mesa+'| \n'+pedidoTexto +'\n$'+ servicioDeMesa+ ' Servicio de Mesa'  +'\n[$'+precioConDescuento+'] Precio Total en Efectivo')
//         alert('Pronto se acercara un mozo junto al pedido para realizar el pago')
//     }else{
//         console.log('|Pedido de Mesa N' +mesa+'| \n'+pedidoTexto +'\n$'+ servicioDeMesa+ ' Servicio de Mesa'  +'\n[$'+precioFinal+ '] Total de la cuenta')
//         console.log('"Saca la tarjeta con los siguientes datos" \nNombre y Apellido = Gonzalo fernandez\nNumero de tarjeta = 6502 7201 4327 1285\nCodigo de seguridad = 123')
//         tarjeta()
//     }
// }


// function tarjeta(){
//     let datosTarjeta = prompt('Escriba el nombre que aparece en su tarjetan')
//     let numTarjeta = prompt('Escriba los Numeros de su tarjeta')
//     let codeSeguridad = parseInt(prompt('Escriba los Numeros de seguridad'))
// if(datosTarjeta === 'Gonzalo fernandez' && numTarjeta === '6502 7201 4327 1285' && codeSeguridad === 123 ){
//     console.log('Pago realizado con exito')
//     alert('Pronto se acercara un mozo con pedido')
// }else{
//     alert('Datos incorrectos')
//     tarjeta()    
// }
// }







//numero de mesa ---> Tipo de menu ---> Bebidas ---> Entradas ---> Cenas ---> Postres 