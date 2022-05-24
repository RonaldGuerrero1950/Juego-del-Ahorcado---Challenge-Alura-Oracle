var bancoPalabras = ["LENGUAJE", "HTML", "VISUAL", "CODIGO", "DECLARACION", "SENTENCIA", "FUNCION", "VARIABLE", "CONDICION", "DOCUMENTO", "BUCLE"];
const contenedorPalabra = document.getElementById("contenedorPalabra");
const botonInicio = document.getElementById("botonInicio");
var botonAgregarPalabra= document.getElementById("botonAgregarPalabra");
const letrasUsadasElement = document.getElementById("letrasUsadas");
const mensajeGanadorPerdedor = document.getElementById("mensaje");

var ahorcado=document.querySelector("#ahorcado");
var botonesDelJuego = document.querySelector(".botones-durante-juego");
var botonNuevoJuego = document.getElementById("botonNuevoJuego");
var botonDesistir = document.getElementById("botonDesistir");
var inputPalabra = document.getElementById("nuevaPalabra");
var guardarPalabra = document.getElementById("guardarPalabra");

let palabraSeleccionada;
let letrasUsadas;
let errores;
let aciertos;

const agregarLetraEnHtml = letra => {
    const elementoLetra = document.createElement("span");
    elementoLetra.innerHTML = letra.toUpperCase();
    letrasUsadasElement.appendChild(elementoLetra);
}


const mensajeFinal = (mensaje) => {
    var mensajePerdida = document.createElement("span");
    if(mensaje==1){        
        mensajePerdida.innerHTML = "Felicidades. Ganaste...";
        mensajePerdida.classList.add("mensagio0");
    }else{
        mensajePerdida.innerHTML = "Haz Perdido. Suerte para la proxima...";
        mensajePerdida.classList.add("mensagio");
        
    }
    mensajeGanadorPerdedor.appendChild(mensajePerdida);
}

const letraEquivocada = () => {
    errores++;
    ahorcado.style.backgroundPosition= -(254*errores)+"px";
    if(errores === 6){        
        let mensaje= 0;
        mensajeFinal(mensaje);
        terminarJuego();
    } 
}

const terminarJuego = () => {
    document.removeEventListener("keydown", eventoLetra);
    botonInicio.style.display = "block";
    botonAgregarPalabra.style.display = "block";
    botonesDelJuego.style.display="none";

}

const letraCorrecta = letra => {
    const { children } =  contenedorPalabra;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letra) {
            children[i].classList.toggle("hidden");
            aciertos++;
        }
    }
    if(aciertos === palabraSeleccionada.length){
        terminarJuego();
        let mensajeGanador = 1;
        mensajeFinal(mensajeGanador);
    };
}

        const letterInput = letra => {
            if(palabraSeleccionada.includes(letra)) {
                letraCorrecta(letra);
            } else {
                letraEquivocada();
                agregarLetraEnHtml(letra);
            }            
            letrasUsadas.push(letra);
        };

    const eventoLetra = event => {
        let teclaLetra = event.key.toUpperCase();
        if(teclaLetra.match(/^[a-zñ]$/i) && !letrasUsadas.includes(teclaLetra)) {
            letterInput(teclaLetra);
        };
    };

        const dibujarPalabra = () => {
            palabraSeleccionada.forEach(letra => {
                const elementoLetra = document.createElement("span");
                    elementoLetra.innerHTML = letra.toUpperCase();
                    elementoLetra.classList.add("letter");
                    elementoLetra.classList.add("hidden");
                    contenedorPalabra.appendChild(elementoLetra);
            });
        };

        const sortearPalabra = () => {   
                let word = bancoPalabras[Math.floor((Math.random() * bancoPalabras.length))].toUpperCase();
                palabraSeleccionada = word.split("");    
        };

    const IniciarJuego = () => {
        ahorcado.style.backgroundPosition= -(254)+"px";
        letrasUsadas = [];
        errores = 0;
        aciertos = 0;
        contenedorPalabra.innerHTML = "";
        letrasUsadasElement.innerHTML = "";
        botonInicio.style.display = "none";
        botonAgregarPalabra.style.display = "none";
        sortearPalabra();
        dibujarPalabra();
        document.addEventListener("keydown", eventoLetra);
        botonesDelJuego.style.display="block";
        mensajeGanadorPerdedor.innerHTML="";
    };

    const cargarPalabra = () =>{        
        botonInicio.style.display="none";
        botonAgregarPalabra.style.display="none";
        inputPalabra.style.visibility="visible"; 
        contenedorPalabra.innerHTML = "";
        letrasUsadasElement.innerHTML = "";  
        mensajeGanadorPerdedor.innerHTML="";     
    }

    const IniciarJuegoManual = () =>{     
        ahorcado.style.backgroundPosition= -(254)+"px";   
        letrasUsadas = [];
        errores = 0;
        aciertos = 0;
        contenedorPalabra.innerHTML = "";
        letrasUsadasElement.innerHTML = "";
        botonInicio.style.display = "none";
        botonAgregarPalabra.style.display = "none";
        dibujarPalabra();
        document.addEventListener("keydown", eventoLetra);
        botonesDelJuego.style.display="block";
        mensajeGanadorPerdedor.innerHTML="";
        inputPalabra.style.visibility="hidden";
        botonNuevoJuego.style.visibility="hidden";
    }

botonInicio.addEventListener("click", IniciarJuego);

botonNuevoJuego.addEventListener("click",IniciarJuego);

botonDesistir.addEventListener("click",() =>{
    location.reload();
})

botonAgregarPalabra.addEventListener("click", cargarPalabra);

guardarPalabra.addEventListener("click",() =>{
    var leer = document.getElementById("leerPalabra").value.toUpperCase();
    palabraSeleccionada = leer.split("");
    IniciarJuegoManual();    
})



