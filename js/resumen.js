carrito = JSON.parse(localStorage.getItem("carrito"));
precioTotal = 0;

for (mostrarCarrito of carrito) {
    $('#carro').append(`<div class="col items">
                                            <img class="w-25"src="${mostrarCarrito.img}">
                                            </img>
                                            <p class="total">Producto: ${mostrarCarrito.modelo}</p>
                                            <p class="total">Precio: ${mostrarCarrito.precio}</p>
                                            <p class="total">Cantidad: ${mostrarCarrito.cantidad} </p>
                                        </div>`);
    precioTotal = precioTotal + parseInt(mostrarCarrito.precio.replace("$", ""))* mostrarCarrito.cantidad;
}


$('#totalCarro').append(`<p class="text-center total">Total: $${precioTotal}</p>`);


function pago1(){
$("#pago").append(

    `<div class="d-flex justify-content-center">
    <button class="btn1">
    <img src="./img/paypal.png" class="btnpay" alt="">
    </button>
    <button class="btn1">
    <img src="./img/gpay.png" class="btnpay" alt="">
    </button>
    </div>
    <div>
        <h5 class="text-center">Podes pagar tambien con:</h5>
            <div class="d-flex justify-content-around">
                <img src="./img/american.png" class="tarjeta"  alt="">
                <img src="./img/visa.png" class="tarjeta" alt="">
                <img src="./img/master.png" class="tarjeta" alt="">
            </div>
           
    </div>
    


    

    
    `
    
)
}
precioTotalSeisCoutas = precioTotal/6
precioTotalDoceCoutas = precioTotal/12
precioTotalVeinticuatroCoutas = precioTotal/24
function pago2(){
    $("#pagoCoutas").append(

        `
        <ul class="list-group list-group-flush">
                <li class="list-group-item">Total: $${precioTotal}</li>
                <li class="list-group-item">En 6 Coutas= $${precioTotalSeisCoutas} </li>
                <li class="list-group-item">En 12 Coutas= $${precioTotalDoceCoutas}</li>
                <li class="list-group-item">En 24 Coutas= $${precioTotalVeinticuatroCoutas}</li>
  
        </ul>
        
        `
    )
}


