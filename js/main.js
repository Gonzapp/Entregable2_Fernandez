

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

// Constantes y variables globales
const carrito = JSON.parse(localStorage.getItem('carrito')) || []
const descuentoEfectivo = 0.90
const servicioDeMesa = 500
const sumar = (num1, num2) => num1 + num2
const multiplicar = (num1, num2) => num1 * num2

const cafes = [
    { id: 1, nombre: 'Espresso', precio: 1200, stock: 2 },
    { id: 2, nombre: 'Café con Leche', precio: 1500, stock: 2 },
    { id: 3, nombre: 'Cappuccino', precio: 1520, stock: 2 },
    { id: 4, nombre: 'Americano', precio: 1000, stock: 2 },
    { id: 5, nombre: 'Macchiato', precio: 1700, stock: 2 },
    { id: 6, nombre: 'Moka', precio: 1800, stock: 2 }
]
const comidasDesayunoMerienda = [
    { id: 1, nombre: 'Tostadas con mermelada', precio: 500, stock: 2 },
    { id: 2, nombre: 'Croissant', precio: 700, stock: 2 },
    { id: 3, nombre: 'Muffin', precio: 800, stock: 2 },
    { id: 4, nombre: 'Panqueques', precio: 1000, stock: 2 },
    { id: 5, nombre: 'Yogur con granola', precio: 1200, stock: 2 },
    { id: 6, nombre: 'Avena con frutas', precio: 1100, stock: 2 },
    { id: 7, nombre: 'Sandwich de huevo', precio: 1300, stock: 2 },
]

// Inicializar total correctamente usando cantidades
let total = carrito.reduce((acc, item) => item && item.precio && item.cantidad ? acc + item.precio * item.cantidad : acc, 0)
let mesa = localStorage.getItem('mesa') || null

const infomov = document.getElementById('info-mov')
const alertNum = document.getElementById('alertNum')
const h2 = document.getElementById('numeroMesa')
const input = document.getElementById('entradaNum')
const boton = document.getElementById('actualizarNum')
const alertCart = document.getElementById('carritoAlert')
const submenuDiv = document.getElementById('submenu')
const registro = document.createElement('p')
const carritoFinal = document.createElement("div")
h2.innerText = 'Seleccione su mesa'

// Funciones
function bloquearOpciones(estado) {
    document.querySelectorAll('#menu button').forEach(btn => btn.disabled = estado)
}

menu()

function menu() {
    bloquearOpciones(true)


    if (mesa) {
        h2.textContent = 'Mesa Numero: ' + mesa
        input.style.display = 'none'
        boton.style.display = 'none'
        alertNum.innerText = ``
        document.getElementById('menu').classList.remove('hidden')
        bloquearOpciones(false)
        menuItem()
    }

    boton.onclick = () => {
        const mesaNumber = Number(input.value)
        if (mesaNumber >= 1 && mesaNumber <= 15) {
            mesa = mesaNumber
            localStorage.setItem('mesa', mesa) // Guardar mesa en localStorage
            h2.textContent = 'Mesa Numero: ' + mesa
            input.style.display = 'none'
            boton.style.display = 'none'
            alertNum.innerText = ``
            document.getElementById('menu').classList.remove('hidden')
            bloquearOpciones(false)
            menuItem()
        } else {
            alertNum.innerText = `Por favor, ingrese un número entre 1 y 15.`
        }
    }
}


function carritoVacio() {
    alertNum.innerText = 'El carrito se encuentra vacio'
}

function menuItem() {
    document.getElementById('opcion1').onclick = () => {
        alertNum.innerText = ''
        mostrarSubmenuDesayuno()
    }

    document.getElementById('opcion2').onclick = () => {
        if (carrito.length <= 0) {
            alertNum.innerText = 'El carrito se encuentra vacio'
        } else {
            totalCarrito()
        }
    }

    document.getElementById('opcion3').onclick = () => {
        alertNum.innerText = ''
        carrito.length = 0
        localStorage.removeItem('carrito')
        localStorage.removeItem('mesa')// Limpiar mesa de localStorage
        mesa = null
        total = 0
        alertNum.innerText = 'Pedido cancelado. Puedes hacer un nuevo pedido.'
        input.style.display = 'block'
        boton.style.display = 'block'
        alertNum.style.display = 'block'
        h2.innerText = 'Seleccione su mesa'
        document.getElementById('menu').classList.add('hidden')
        registro.innerHTML = ``
        submenuDiv.innerHTML = ``
        bloquearOpciones(true)
        menu()
    }
}

function mostrarSubmenuDesayuno() {
    const submenuDiv = document.getElementById('submenu')
    submenuDiv.innerHTML = `
        <button id="subopcion1">Infusiones</button>
        <button id="subopcion2">Aperitivos</button>
        <button id="subopcion3">Volver</button>`

    submenuDiv.classList.remove('hidden')

    document.getElementById('subopcion1').onclick = () => {
        carta(cafes)
    }

    document.getElementById('subopcion2').onclick = () => {
        carta(comidasDesayunoMerienda)
    }

    document.getElementById('subopcion3').onclick = () => {
        submenuDiv.classList.add('hidden')
    }
}

function carta(array) {
    const submenuDiv = document.getElementById('submenu')
    submenuDiv.innerHTML = array.map(item => `
        <button class="carta-item">${item.nombre} $${item.precio}</button>`).join('') + '<button id="volverDesayuno">Volver</button>'

    const buttons = document.querySelectorAll('.carta-item')
    buttons.forEach((button, p) => {
        const eleccionItem = array[p]

        button.onclick = () => {
            const itemExistente = carrito.find(Item => Item.nombre === eleccionItem.nombre)

            if (itemExistente) {
                
                itemExistente.cantidad += 1
            } else {
            
                const nuevoItem = { ...eleccionItem, cantidad: 1 }
                carrito.push(nuevoItem)
            }

            total += eleccionItem.precio
            localStorage.setItem('carrito', JSON.stringify(carrito)) // Guarda el carrito en localStorage
            registro.innerText = `Añadido al carrito: ${eleccionItem.nombre}`
            infomov.appendChild(registro)
            totalCarrito()
        }
    })

    document.getElementById('volverDesayuno').onclick = () => {
        mostrarSubmenuDesayuno()
    }
}


function totalCarrito() {
    const submenuDiv = document.getElementById('submenu')
    carritoFinal.className = "carrito-final"
    carritoFinal.innerHTML = `<h3>Carrito:</h3>
                            <ul>${carrito.map(item => `<li> x${item.cantidad} - ${item.nombre} - $${item.precio * item.cantidad}</li>`).join('')}</ul>
                            <p>Cubierto: $${servicioDeMesa}<br>Total: $${servicioDeMesa + total}</p> 
                            <p>Total en efectivo: $${(servicioDeMesa + total) * descuentoEfectivo}</p>
                            <button id="volverMenu">Volver</button>`
    submenuDiv.appendChild(carritoFinal)

    document.getElementById('volverMenu').onclick = () => {
        mostrarSubmenuDesayuno()
    }
}

//         <button id="cambiarPedido">Cambiar Pedido</button> proxima incorporacion