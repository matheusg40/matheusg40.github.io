function formatarData(data) {
  var dia = data.getUTCDate().toString().padStart(2, '0');
  var mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
  var ano = data.getUTCFullYear().toString();
  return `${dia}/${mes}/${ano}`;
}

function verificarDataFimSemana(data) {
  return data.getUTCDay() === 0 || data.getUTCDay() === 6;
}

function calcularDatas() {
  var inicioPlantio = new Date(document.getElementById("dataInicioPlantio").value + 'T00:00:00Z');
  var fimPlantio = new Date(document.getElementById("dataFimPlantio").value + 'T00:00:00Z');
  var intervaloColheita = parseInt(document.getElementById("intervaloColheita").value);
  


  if (verificarDataFimSemana(inicioPlantio) || verificarDataFimSemana(fimPlantio)) {
    alert("Por favor, escolha datas para o plantio que não caiam em finais de semana.");
    return;
  }

  var inicioInsumos = new Date();
  var fimInsumos = new Date();
  fimInsumos.setUTCDate(fimInsumos.getUTCDate() + 30);

  var intervaloDiasPlantio = Math.round((fimPlantio - inicioPlantio) / (1000 * 60 * 60 * 24));

  if (intervaloDiasPlantio < 10 || intervaloDiasPlantio > 62) {
    document.getElementById("erroIntervalo").innerHTML = "O intervalo entre a data de início e a data de fim do plantio deve ser de pelo menos 10 dias e no máximo 62 dias.";
    document.getElementById("erroIntervalo").style.color = "red";
    return;
  }else{
    document.getElementById("erroIntervalo").innerHTML = "";
  }

  var inicioColheita = new Date(fimPlantio);
  inicioColheita.setUTCDate(inicioColheita.getUTCDate() + intervaloColheita);

  var fimColheita = new Date(inicioColheita);
  fimColheita.setUTCDate(fimColheita.getUTCDate() + 60);

  var dataPagamento = new Date(fimColheita);
  dataPagamento.setUTCDate(dataPagamento.getUTCDate() + 60);

  var inicioTratosCulturais = new Date(fimPlantio);
  inicioTratosCulturais.setUTCDate(inicioTratosCulturais.getUTCDate() + 1);

  var fimTratosCulturais = new Date(inicioColheita);
  fimTratosCulturais.setUTCDate(fimTratosCulturais.getUTCDate() - 1);

  document.getElementById("inicioInsumos").innerHTML = formatarData(inicioInsumos);
  document.getElementById("fimInsumos").innerHTML = formatarData(fimInsumos);
  document.getElementById("inicioPlantio").innerHTML = formatarData(inicioPlantio);
  document.getElementById("fimPlantio").innerHTML = formatarData(fimPlantio);
  document.getElementById("inicioTratosCulturais").innerHTML = formatarData(inicioTratosCulturais);
  document.getElementById("fimTratosCulturais").innerHTML = formatarData(fimTratosCulturais);
  document.getElementById("inicioColheita").innerHTML = formatarData(inicioColheita);
  document.getElementById("fimColheita").innerHTML = formatarData(fimColheita);
  document.getElementById("dataPagamento").innerHTML = formatarData(dataPagamento);
}

function mudarIntervaloColheita() {
  var intervaloColheita = parseInt(document.getElementById("intervaloColheita").value);
  var novoIntervalo = prompt("Digite o novo intervalo desejado entre 30 e 62 dias:");

  if (novoIntervalo === null) {
    // O usuário clicou em "Cancelar"
    return;
  }

  novoIntervalo = parseInt(novoIntervalo);

  if (isNaN(novoIntervalo) || novoIntervalo < 30 || novoIntervalo > 62) {
    alert("Por favor, digite um valor válido entre 30 e 62 dias.");
    return;
  }

  document.getElementById("intervaloColheita").value = novoIntervalo;
}
