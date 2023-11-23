function formatarData(data) {
  var dia = data.getUTCDate().toString().padStart(2, '0');
  var mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
  var ano = data.getUTCFullYear().toString();
  return `${dia}/${mes}/${ano}`;
}

function calcularDatas() {
  var dataPagamentoInput = document.getElementById("dataPagamento");
  var dataPagamento = new Date(dataPagamentoInput.value + 'T00:00:00Z');
  var erroIntervalo = document.getElementById("erroIntervalo");

  // Limpa a mensagem de erro
  erroIntervalo.innerHTML = "";

  // Verifica se a data de pagamento está preenchida
  if (!dataPagamentoInput.value) {
    erroIntervalo.innerHTML = "Por favor, preencha a data de pagamento.";
    erroIntervalo.style.color = "red";
    return;
  }

  var inicioInsumos = new Date();
  var fimInsumos = new Date();
  fimInsumos.setUTCMonth(fimInsumos.getUTCMonth() + 1);

  var inicioTratosCulturais = new Date();
  var fimTratosCulturais = new Date(dataPagamento);
  fimTratosCulturais.setUTCDate(fimTratosCulturais.getUTCDate() - 123);

  var inicioColheita = new Date(dataPagamento);
  inicioColheita.setUTCDate(inicioColheita.getUTCDate() - 122);

  var fimColheita = new Date(dataPagamento);
  fimColheita.setUTCDate(fimColheita.getUTCDate() - 60);

  document.getElementById("inicioInsumos").innerHTML = formatarData(inicioInsumos);
  document.getElementById("fimInsumos").innerHTML = formatarData(fimInsumos);
  document.getElementById("inicioTratosCulturais").innerHTML = formatarData(inicioTratosCulturais);
  document.getElementById("fimTratosCulturais").innerHTML = formatarData(fimTratosCulturais);
  document.getElementById("inicioColheita").innerHTML = formatarData(inicioColheita);
  document.getElementById("fimColheita").innerHTML = formatarData(fimColheita);

  // Limpa a mensagem de erro se não houver problema
  erroIntervalo.innerHTML = "";
}
