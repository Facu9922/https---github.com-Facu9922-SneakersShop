//JSON ZAPATILLAS
const PROJSON = "../JSON/zapatillas.json"
const tbody = document.querySelector('.tbody')

let misZapas= [];
  //Array carrito
  let carrito =[]
  
$.getJSON(PROJSON, function (respuesta, estado){
    if(estado === "success"){
        misZapas = respuesta;
        for (const zapa of misZapas){
            if(zapa.marca =="Nike"){
                $("#zapaNike").append(
                    `
        <div class="card container-fluid"  data-id= ${zapa.id} style="width: 18rem;">
        <img id="colors" src="${zapa.imagen.color1}" class="card-img-top" data-img-id=${zapa.id} alt="...">
        <div class="card-body">
          <h5 class="card-title"> ${zapa.marca} </h5>
          <p class="card-text modelo"> ${zapa.modelo} </p>
          <p class="card-text precio"> $ ${zapa.precio} </p>
          <p class="card-text"> ID: ${zapa.id} </p>
          <p>Talles:</p>
          <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          
          
  
  <button type="button" class="btn btn-primary"   data-id= ${zapa.id}> Añadir a carrito </button>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" data-id = ${zapa.id} data-color = 1 value="clasica">
        <label class="form-check-label" for="inlineRadio1">Color 1</label>
</div>
<div class="form-check form-check-inline">
        <input class="form-check-input " type="radio" name="inlineRadioOptions" data-id = ${zapa.id} data-color = 2 value="blanca">
        <label class="form-check-label" for="inlineRadio2">Color 2</label>
</div>
</div>
      </div>`
                )
            }
            else if (zapa.marca =="Jordan"){
                $("#zapaJordan").append(
                    `
                    <div class="card container-fluid"  data-id= ${zapa.id} style="width: 18rem;">
                    <img id="colors" src="${zapa.imagen.color1}" class="card-img-top" data-img-id=${zapa.id} alt="...">
                    <div class="card-body">
                      <h5 class="card-title"> ${zapa.marca} </h5>
                      <p class="card-text modelo"> ${zapa.modelo} </p>
                      <p class="card-text precio"> $ ${zapa.precio} </p>
                      <p class="card-text"> ID: ${zapa.id} </p>
                      <p>Talles:</p>
                      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                      
                      
              
              <button type="button" class="btn btn-primary" data-id= ${zapa.id}> Añadir a carrito </button>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="id${zapa.id}color1" name="inlineRadioOptions" data-id = ${zapa.id} data-color = 1 value="clasica">
                    <label class="form-check-label" for="inlineRadio1">Color 1</label>
            </div>
            <div class="form-check form-check-inline">
                    <input class="form-check-input " type="radio" id="id${zapa.id}color2" name="inlineRadioOptions" data-id = ${zapa.id} data-color = 2 value="blanca">
                    <label class="form-check-label" for="inlineRadio2">Color 2</label>
            </div>
            </div>
                  </div>`
                )
            }
        }
    }

//Cambiar Color zapas
document.querySelectorAll('.form-check-input').forEach(radio => {
    radio.addEventListener('change', (e) => {
     let id    = e.target.dataset.id;
     let color = e.target.dataset.color;
     let zapatillaBuscada = misZapas.find(zapatilla => zapatilla.id == id)
     let img = document.querySelector(`img[data-img-id="${id}"]`);
     
     img.src = zapatillaBuscada ["imagen"][`color${color}`]
  
   })
  })


const Clickbutton= document.querySelectorAll(".btn")



Clickbutton.forEach(boton=>{
  boton.addEventListener("click",addCarrito)
})

function addCarrito(e){
 let button =e.target
 let item = button.closest(".card")
 const itemTitulo = item.querySelector(".modelo").textContent; 
 const itemPrecio = item.querySelector(".precio").textContent; 
 const itemImg =  item.querySelector(".card-img-top").src; 
 
 const nuevoZapa ={
   modelo: itemTitulo,
   precio: itemPrecio,
   img: itemImg,
   cantidad: 1
 }
 addZapaCart(nuevoZapa)

}
})

function addZapaCart(nuevoZapa){
  const inputElemento = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].modelo.trim() === nuevoZapa.modelo.trim()){
      carrito[i].cantidad ++;
      const inputValor = inputElemento[i]
      inputValor.value++;
      totalCarrito()
    return null;
  }
}
carrito.push(nuevoZapa)

renderCarrito()


}

function renderCarrito(){
  console.log(carrito)
  tbody.innerHTML +=''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img class="w-25" src=${item.img}  alt="">
              <h6 class="title">${item.modelo}</h6>
            </td>
            <td><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener("click",removeItemCarro)
  })
  totalCarrito()
}

function totalCarrito(){
  let total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    total = total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${total}`
  agregarLocalStorage()
}

function removeItemCarro(b){
  const botonDelete = b.target
  const tr = botonDelete.closest(".ItemCarrito")
  const modelo = tr.querySelector(".title").textContent
  for(let i=0; i<carrito.length; i++){
    if(carrito[i].modelo.trim()=== modelo.trim()){
      carrito.splice(i,1)
    }
  }
  tr.remove ()
  totalCarrito()
}

function agregarLocalStorage(){
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

window.onload = function(){
  const guardar = JSON.parse(localStorage.getItem("carrito"))
  if(guardar){
    carrito = guardar;
    renderCarrito()
  }
}

function comprar(){
  location.href = "resumenCarrito.html";
  const carritoJson = JSON.stringify(carrito);
  localStorage.setItem("carrito", carritoJson);
  
  
  
}
