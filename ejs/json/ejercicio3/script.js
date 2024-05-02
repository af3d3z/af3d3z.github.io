let users = [];
let hobbies = [];

// variables para métricas
let suma = 0;
let min = 999;
let max = 0;
let media = 0;
let contadorEdades = 0;


// checkbox listener
$('input[type=checkbox]').on('change', () => {
    if ($('input[type=checkbox]:checked').length > 3) {
        $(this).prop('checked', false);
    }
});


function envio() {
    console.log("User list: " + users);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://lm.iesnervion.es/eco.php");    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = () => {
        if(xhr.readyState == 4 && (xhr.status == 201 || xhr.status == 200)){
            let response = jsonify(xhr.responseText);
            $('#suma').html(response.calculos.suma);
            $('#min').html(response.calculos.min);
            $('#max').html(response.calculos.max);
            $('#med').html(response.calculos.media);
            console.log(response);
        }else {
            console.log("Error:" + xhr.status);
        }
    };

    xhr.send(stringify(users));
}

function rowToUser(row) {
    let user = {
        nombre: "",
        apellidos: "",
        edad: "",
        ciudad: "",
        hobbies: ""
    }

    let valores = document.getElementById(row.id).getElementsByTagName("td");
    for(let i = 0; i < 4; i++) {
        user[i] = valores[i].innerHTML;
    }

    return user;
}

function deleteRow(row) {
    console.log(users);
    let valor = document.getElementById(row.id).getElementsByTagName("td")[2].innerHTML;

    rowToUser(row);

    users.splice(users.indexOf(rowToUser(row)),1);

    contadorEdades--;
    suma -= parseInt(valor);
    media = suma / contadorEdades;

    for(let i = 0; i < users.length; i++) {
        if (parseInt(users[i].edad) < min) {
            min = users[i].edad;
        }
        if (parseInt(users[i].edad) > max) {
            max = users[i].edad;
        }
    }

    console.log("Max: " + max);
    console.log("Min: " + min);


    row.remove();
}


function printHobbies(usuario) {
    let hobbyList = "";
    for(let i = 0; i < usuario.hobbies.length; i++) {
        hobbyList += usuario.hobbies[i] + '<br>';
    } 
    return hobbyList;
}

function generaTr(usuario) {
    let newRow = '<tr onclick="deleteRow(this)" id="' + contadorEdades +  '"' + contadorEdades + '"><td>' + usuario.nombre + '</td><td>' + usuario.apellidos + '</td><td>' + usuario.edad + '</td><td>' + usuario.ciudad + '</td><td>' + printHobbies(usuario) + '</td></tr>';
    $("#userlist").append(newRow);
    contadorEdades++;
}

function jsonify(object) {
    return JSON.parse(object);
}

function stringify(object) {
    return JSON.stringify(object);
}

function generaTabla(userList) {
    $("#userlist").empty();


    let userListjson = jsonify(userList);

    for(let user of userListjson){
        generaTr(user);
    }
    
}

function insertData() {
    // liberamos los checkbox en caso de que estén desactivados
    $('input:checkbox').map(() => {
        $('input:checkbox').attr('disabled', false);
    });

    // guardamos los hobbies del usuario
    hobbies = $('input[name="hobbies"]')
    .filter(':checked')
    .map(function () {
            return $(this).val();
         }
    ).get();
    
    // guardamos todo lo que ha introducido el usuario
    let usuario = {
        "nombre": $('#nombre-form').val(),
        "apellidos": $('#apellidos-form').val(),
        "edad": $('#edad-form').val(),
        "ciudad": $('#ciudad-form').val(),
        "hobbies": hobbies
    };

    console.log(hobbies);

    if (usuario.nombre == "" | usuario.apellidos == "" | usuario.edad == "" | usuario.ciudad == "") {
        alert("Todos los campos son obligatotrios.");
    }else if(hobbies.length == 0){
        alert("At least a hobbie must be checked.");
    } else {
        if (parseInt(usuario.edad) > 0) {
            // añadimos el usuario al array
            users.push(usuario);
            console.log(users);

            // métricas
            contadorEdades++;
            suma += parseInt(usuario.edad);
            if (usuario.edad < min) {
                min = usuario.edad;
            }
            if (usuario.edad > max) {
                max = usuario.edad;
            }
            media = suma / contadorEdades;

            console.log("Suma: " + suma);
            console.log("Máximo: " + max);
            console.log("Mínimo: " + min);
            console.log("Media: " + media);

            generaTabla(stringify(users));
            console.log("Añadido nuevo usuario");
        } else {
            alert("Edad incorrecta.");
        }
    }
}


function consultaUsuario() {
    let userDiv = document.getElementById("user");
    userDiv.innerHTML = "";

    insertData();
}