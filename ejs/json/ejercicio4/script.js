function agregarTr(prod) {
    $('#table-body').append('<tr><td>' + prod.descripcion + '</td><td>' + prod.idProveedor + '</td><td>' + prod.precio +'</td></tr>');
}

function send() {
    $('#table-body').html('');

    const xhr = new XMLHttpRequest();
    let product = {
        descripcion: $('#desc').val(),
        idProveedor: $('#providerid').val(),
        precio: parseFloat($('#price').val())
    }

    console.log(product);

    if(product.description == "" || product.providerid == "" || product.price == ""){ç
        alert('Es necesario rellenar todos los campos.');
    }else {
        xhr.open("POST", 'https://lm.iesnervion.es/reto4.php');
        xhr.responseType = "text";

        xhr.onload = () => {
            if(xhr.status == 201 || xhr.status == 200) {
                let tbody = "";
                let resp = JSON.parse(xhr.responseText);
                resp['lista'].forEach(producto => {
                    agregarTr(producto);
                });
            }else{
                $("#errores").html(xhr.status);
            }
        }

        xhr.send(JSON.stringify(product));
    }
}
