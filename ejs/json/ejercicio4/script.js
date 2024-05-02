function send() {
    const xhr = new XMLHttpRequest();
    let product = {
        description: $('#desc').val(),
        providerid: $('#providerid').val(),
        price: $('#price').val()
    }

    if(product.description == "" || product.providerid == "" || product.price == ""){ç
        alert('Es necesario rellenar todos los campos.');
    }else {
        xhr.open("POST", 'https://lm.ciclo.iesnervion.es/reto4.php');
        xhr.responseType = "json";

        xhr.onload = () => {
            if(xhr.status == 201) {
                let tbody = "";
                let list = JSON.parse(xhr.responseText);
                console.log(list);
            }else{
                $("#errores").html(xhr.status);
            }
        }

        xhr.send(JSON.stringify(product));
    }
}
