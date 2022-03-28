const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            document.getElementById("tipsos").innerHTML = " ";
            pokeImage("/images/error3.png")
            limpieza();
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            /*--------imagen del pokemon---------*/
            let pokeImg = data.sprites.other.home.front_default;
            pokeImage(pokeImg);
            console.log(pokeImg);

            /*--------Nombre---------*/
            let pokenombre = data.name;
            console.log(pokenombre);
            PokeNombres(pokenombre);

            /*--------Numero---------*/
            let pokeid = data.id;
            console.log(pokeid);
            pokeID(pokeid);

            /*--------Habilidad---------*/


            /*--------Altura---------*/
            let altura = data.height;
            console.log(`Altura: ${altura/10} m`);
            pokealtu(altura);

            /*--------Peso---------*/
            let peso = data.weight;
            console.log(`Peso: ${peso/10} kg`);
            pokePeso(peso);

            /*--------Tipo(s)---------*/
            let poketipo = data.types.length;
            console.log(poketipo);
            let pokeTipo1 = data.types[0].type.name;
            document.getElementById("tipsos").innerHTML = "Tipo(s)";
            document.getElementById("tipo1").innerHTML = pokeTipo1;
            tipo1.className = pokeTipo1;
            if (poketipo > 1){
                let pokeTipo2 = data.types[1].type.name;
                document.getElementById("tipo2").innerHTML = pokeTipo2;
                tipo2.className = pokeTipo2;
            }
            if (data.types.length == 1){
                document.getElementById("tipo2").innerHTML = "";
                tipo2.className = "Notipo2"
            }
            /*if(poketipo == 1){
                tipo1 = tip[0].type.name;
                console.log(tipo1);
            }
            else{
                tipo1 = tip[0].type.name;
                console.log(tipo1);

                tipo2 = tip[1].type.name;
                console.log(tipo2);
            }*/

            /*--------Stats---------*/
            let stat = data.stats;
            let sta;
            var estadisticas = [];
            for(i = 0; i != 6; i++){
                sta = stat[i].base_stat;
                estadisticas.push(sta);
            }
            console.log(estadisticas);
            /*--------Funcion gráfica de estadisticas---------*/
            Grafico(estadisticas);
            
            /*--------Descripciones (otra url)---------*/
            let secondurl = data.species.url;
            fetch(secondurl).then((res)=>{
                if (res.status != "200") {
                    console.log(res);
                }
                else {
                    return res.json();
                }
            }).then((data)=>{
                console.log(data);
                /*--------Apodo---------*/
                let title = data.genera[5].genus;
                console.log(title);
                PokeApodo(title);
                /*--------Descripcion---------*/
                let lenguajes=data.flavor_text_entries;
                var i = 0;
                var espa = "";
                for(i ; espa != "es" ; i++){
                    espa = lenguajes[i].language.name;
                    /*console.log(espa);*/
                    var y = i;
                }
                let descripcion = lenguajes[y].flavor_text;
                console.log(descripcion);
                PokeDescri(descripcion);

                /*--------Habitat---------*/
                let habit = data.habitat;
                let casita = "";
                if(habit == null){
                    casita = "Desconocido";
                    document.getElementById("habitat").innerHTML = `Habitat: ${casita}`;
                    console.log(casita);
                }
                else{
                    casita = habit.name;
                    document.getElementById("habitat").innerHTML = `Habitat: ${casita}`;
                    console.log(casita);}
                                
            });  
        }
    });
}



const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const PokeNombres = (pokenombre) =>{
    const name = document.getElementById("nombre");
    name.innerHTML = (pokenombre.toUpperCase());
}

const pokeID = (pokeid) =>{
    const num = document.getElementById("ID");
    num.innerHTML = (`N.º ${pokeid}`);
}

const pokealtu = (altura) =>{
    const alturaa = document.getElementById("altura");
    alturaa.innerHTML = (`Altura: ${altura/10} m`);
}

const pokePeso = (peso) =>{
    const pesoo = document.getElementById("peso");
    pesoo.innerHTML = (`Peso: ${peso/10} kg`);
}

const PokeApodo = (title) =>{
    const papodo = document.getElementById("apodo");
    papodo.innerHTML = (title);
}

const PokeDescri = (descripcion) =>{
    const desc = document.getElementById("descripcion");
    desc.innerHTML = (descripcion);
}

const limpieza = () =>{
    document.getElementById("nombre").innerHTML = " ";
    document.getElementById("ID").innerHTML = " ";
    document.getElementById("altura").innerHTML = " ";
    document.getElementById("peso").innerHTML = " ";
    document.getElementById("apodo").innerHTML = " ";
    document.getElementById("descripcion").innerHTML = " ";
    document.getElementById("habitat").innerHTML = " ";
    document.getElementById("tipo1").innerHTML = " ";
    tipo1.className = "SinClase";
    document.getElementById("tipo2").innerHTML = " ";
    tipo2.className = "SinClase";
    chart.destroy();

}
/*--------Funcion gráfica de estadisticas---------*/
var chart;
const Grafico = (estadisticas) => {
    var miCanvas = document.getElementById("STATS").getContext("2d");
    if(chart){
        chart.destroy();
    }
    chart = new Chart(miCanvas,{
        type: "radar",
        data:{
            labels:["HP","Ataque","Defensa","Ataque especial","Defensa especial","Velocidad"],
            datasets:[
                {
                    label:"Estadísticas",
                    backgroundColor:"rgba(48, 48, 97, 0.322)",
                    data:estadisticas,
                }]
        }
    })
}