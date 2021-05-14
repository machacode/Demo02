var horaInicio;

window.onload = function () {
    horaInicio = new Date();
    get("Consulta/listarUbigeo", mostrarPaises);
}

function get(url, callback) {
    requestServer("get", url, callback);
}

function requestServer(metodoHttp, url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(metodoHttp, url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.response);
        }
    }
    xhr.send();
}

function mostrarPaises(rpta) {
    console.log(rpta);

    if (rpta != null) {
        crearTablaJson(rpta, "divTabla", "spnTotalReg")
    }

    var horaFin = new Date();
    var tiempo = horaFin - horaInicio;
    spnTiempo.innerHTML = tiempo + "msg";
}

function crearTablaJson(json, nombreDiv, spnTotal) {
    var campos = Object.keys(json[0]);
    var nRegistros = json.length;
    var fila;
    var nCampos = campos.length;
    var col;
    var checkHtml = "";
    var comboHtml = "";
    var html = "<table><thead><tr class='FilaCabecera'>";
    for (var j = 0; j < nCampos; j++) {
        col = campos[j];
        html += "<th>";
        html += col;
        html += "</th>";
    }
    html += "</tr></thead><tbody>";
    comboHtml += "<option value=''>Seleccionar</option>";
    for (var i = 0; i < nRegistros; i++) {
        fila = json[i];
        html += "<tr class='FilaDatos'>";
        for (var j = 0; j < nCampos; j++) {
            col = fila[campos[j]];
            html += "<td>";
            html += col;
            html += "</td>";
        }
        html += "</tr>";
    }
    html += "</tbody></table><br><br>";

    var div = document.getElementById(nombreDiv);
    div.innerHTML = html + checkHtml;
    var span = document.getElementById(spnTotal);
    span.innerHTML = nRegistros;
}