// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Lista para almacenar los nombres de los participantes
let participantes = [];

// Función para agregar un amigo a la lista
function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre.");
        return;
    }
    if (participantes.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        return;
    }

    participantes.push(nombre);
    actualizarLista();
    input.value = "";
}

// Función para actualizar la lista en pantalla
function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    
    participantes.forEach(nombre => {
        let li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

// Función para realizar el sorteo de amigo secreto
function sortearAmigo() {
    if (participantes.length < 2) {
        alert("Debe haber al menos 2 participantes para realizar el sorteo.");
        return;
    }
    
    let asignaciones = asignarAmigosSecreto([...participantes]);
    mostrarResultado(asignaciones);
}

// Función para asignar amigos secretos sin repeticiones
function asignarAmigosSecreto(lista) {
    let asignados = {};
    let disponibles = [...lista];
    
    lista.forEach(nombre => {
        let posibles = disponibles.filter(n => n !== nombre);
        if (posibles.length === 0) {
            return asignarAmigosSecreto(lista); // Reiniciar en caso de bloqueo
        }
        let elegido = posibles[Math.floor(Math.random() * posibles.length)];
        asignados[nombre] = elegido;
        disponibles = disponibles.filter(n => n !== elegido);
    });
    return asignados;
}

// Función para mostrar los resultados del sorteo
function mostrarResultado(asignaciones) {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "<h3>Resultados del sorteo:</h3>";

    for (let [amigo, asignado] of Object.entries(asignaciones)) {
        resultado.innerHTML += `<p>${amigo} → ${asignado}</p>`;
    }
}