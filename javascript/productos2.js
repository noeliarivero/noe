class Conjuntos{
    constructor({nombre,precio,img}) {
        this.nombre = nombre;
            this.precio = precio;
            this.img = img;
    }
}
const imprimirDatos = document.getElementById("printCardProducts");

const conjuntoHanna = new Conjuntos("Conjunto Hanna",2370,"hola");
const conjuntoFrida = new Conjuntos("Conjunto Frida",2700,"hola");
const conjuntoEmma = new Conjuntos("Conjunto Emma",2780,"hola");
const conjuntoAstrid = new Conjuntos("Conjunto Astrid",2590,"hola");
const conjuntoGreta = new Conjuntos("Conjunto Greta",2880,"hola");

let listaConjuntos = [];

listaConjuntos.push({ 'nombre': 'Conjunto Hanna', 'precio': 2370, 'descripcion': "hola", 'img': "../media/conjunto_hanna.jpg",'cantidad':10}),
listaConjuntos.push({ 'nombre': 'Conjunto Frida', 'precio': 2370, 'descripcion': "hola", 'img': "../media/frida.jpg",'cantidad':10}),
listaConjuntos.push({ 'nombre': 'Conjunto Emma', 'precio': 2370, 'descripcion': "hola", 'img': "../media/emma.jpg",'cantidad':10}),
listaConjuntos.push({ 'nombre': 'Conjunto Astrid', 'precio': 2370, 'descripcion': "hola", 'img': "../media/astrid.jpg",'cantidad':10}),
listaConjuntos.push({ 'nombre': 'Conjunto Greta', 'precio': 2370, 'descripcion': "hola", 'img': "../media/greta.jpg",'cantidad':10}),

localStorage.setItem('listaConjuntos', JSON.stringify(listaConjuntos));
let listaStorage = JSON.parse(localStorage.getItem('session'));

listaConjuntos.forEach (element => {
    imprimirDatos.innerHTML += `
    <div class="card">
            <img src="${element.img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${element.nombre}</h5>
            <p class="card-text precio">$${element.precio}</p>
            <button  class="btn btn-primary button">Añadir a Carrito</button>
        </div>
    </div>
    `});

//carrito
const clickButton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
const clickCompra = document.querySelector('.compra')
const clickRecargar = document.querySelector('.btn-recargar')

let carrito = [];

clickButton.forEach(btn => {
    btn.addEventListener('click', añadirItemCarrito)
  })

function añadirItemCarrito(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;
    
    const newItem = {
      title: itemTitle,
      precio: itemPrice,
      img: itemImg,
      cantidad: 1
    }
  
    añadirItem(newItem)
  }

function añadirItem(newItem){
   carrito.push(newItem)
   mostrarProductosAgregados()
}

function mostrarProductosAgregados(){
    tbody.innerHTML = ''
      carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
      
        <th scope="row">-</th>
                <td class="table__productos">
                  <img src=${item.img}  alt="">
                  <h6 class="title">${item.title}</h6>
                </td>
                <td class="table__price"><p>${item.precio}</p></td>
                <td class="table__cantidad">
                  <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                  <button class="delete btn btn-danger">x</button>
                </td>
        
        `
        tr.innerHTML = Content;
        tbody.append(tr)   

      tr.querySelector(".delete").addEventListener('click', borrarItemCarrito)
      tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}
    const yaAgregado = carrito.some( repetido => item.title === item.title);
    if(!yaAgregado){
        carrito = [...carrito, item.title]
    } else{
        carrito.forEach(carrito => {
            if(item.title === item.title){
                carrito.cantidad++;
            }
        })
    }
    localStorage.setItem('carritoLF', JSON.stringify(productosCarrito));
//////////////////////////////////////////////
function CarritoTotal(){
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
      const precio = Number(item.precio.replace("$", ''))
      Total = Total + precio*item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    
    añadirLocalStorage()
  }

  function borrarItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i=0; i < carrito.length ; i++){
  
      if(carrito[i].title.trim() === title.trim()){
        carrito.splice(i, 1)
      }
    }
  
    const alert = document.querySelector('.remove')
  
    setTimeout( function(){
      alert.classList.add('remove')
    }, 2000)
      alert.classList.remove('remove')
  
    tr.remove()
    CarritoTotal()
  }
  
  function sumaCantidad(e){
    const sumaInput  = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
      if(item.title.trim() === title){
        sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
        item.cantidad = sumaInput.value;
        CarritoTotal()
      }
    })
  }  

  function añadirLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }

  




  window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
      carrito = storage;
      mostrarProductosAgregados()
    }
  }

clickCompra.addEventListener('click', comprar)
clickRecargar.addEventListener('click', borrarCarrito)

  function comprar (){
      if (carrito.length > 0){
          $('.modal').show() 
            //carrito borrar elementos del carrito
      } else {
          alert('No hay productos en el carrito, por favor seleccione un producto.')
      }
  }
    function borrarCarrito (){
      localStorage.clear()
      window.location.reload()
    }
