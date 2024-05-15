const URL = 'https://lm.iesnervion.es/reto4.php';

function agregarTr(prod) {
    $('#table-body').append("<tr onclick='borrar(" + prod.id + ")'><td>" + prod.descripcion + "</td><td>" + prod.idProveedor + "</td><td>" + prod.precio + "</td></tr><br>");
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

    if (product.description == "" || product.providerid == "" || product.price == "") {
        alert('Es necesario rellenar todos los campos.');
    } else {
        xhr.open("POST", URL);
        xhr.responseType = "text";

        xhr.onload = () => {
            if (xhr.status == 201 || xhr.status == 200) {
                let resp = JSON.parse(xhr.responseText);
                resp['lista'].forEach(producto => {
                    agregarTr(producto);
                });
            } else {
                $("#errores").html(xhr.status);
            }
        }

        xhr.send(JSON.stringify(product));
    }
}

function borrar(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', URL + '?' + 'id=' + id, true);
    console.log("marrana");
    xhr.onload = () => {
        if (xhr.status == 201 || xhr.status == 200) {
            console.log("ola");
            get();
            let resp = JSON.parse(xhr.responseText);
            $('#errores').html('<h2 style="color:green">Se ha eliminado correctamente.</h2>');
        } else {
            $("#errores").html(xhr.status);
        }
    }
    xhr.send();
}

function get() {
    $('#table-body').html('');

    const xhr = new XMLHttpRequest();

    xhr.open("GET", URL);
    xhr.responseType = "text";

    xhr.onload = () => {
        if (xhr.status == 201 || xhr.status == 200) {
            let resp = JSON.parse(xhr.responseText);
            resp['lista'].forEach(producto => {
                agregarTr(producto);
                $("#errores").html("<h2 style='color:green'>Se ha eliminado correctamente</h2>");
            });
        } else {
            $("#errores").html(xhr.status);
        }
    }

    xhr.send();
}
