function openNav() {

    var x = document.getElementById("navigation");


    if (x.className === "navigation") { //verifica se o nome é navigation
        x.className += " menujs"; //se for adiciona a class menujs q eu formatei
        document.getElementById("treslinhas-icon").innerHTML = "&Cross;";
    } else {
        x.className = "navigation"; // se aperta de novo volta pro normal
        document.getElementById("treslinhas-icon").innerHTML = "&#9776;";


    }
}