let users = [];

// variables para métricas
let suma = 0;
let min = 999;
let max = 0;
let media = 0;
let contadorEdades = 0;

function rowToUser(row) {
    let user = {
        nombre: "",
        apellidos: "",
        edad: "",
        ciudad: ""
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

function generaTr(usuario) {
    let newRow = '<tr onclick="deleteRow(this)" id="' + contadorEdades +  '"' + contadorEdades + '"><td>' + usuario.nombre + '</td><td>' + usuario.apellidos + '</td><td>' + usuario.edad + '</td><td>' + usuario.ciudad + '</td></tr>';
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
    // guardamos todo lo que ha introducido el usuario
    let usuario = {
        "nombre": $('#nombre-form').val(),
        "apellidos": $('#apellidos-form').val(),
        "edad": $('#edad-form').val(),
        "ciudad": $('#ciudad-form').val()
    };

    if (usuario.nombre == "" | usuario.apellidos == "" | usuario.edad == "" | usuario.ciudad == "") {
        alert("Todos los campos son obligatotrios.");
    }else {
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