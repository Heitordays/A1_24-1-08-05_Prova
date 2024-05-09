document.getElementById("formJogador").addEventListener("submit", function(event) {
    event.preventDefault();

    var nome = document.getElementById("nome").value;
    var numeroCamisa = document.getElementById("numero_camisa").value;

    // Criar o objeto jogador
    var jogador = {
        nome: nome,
        numero_camisa: numeroCamisa
    };

    // Adicionar o jogador ao arquivo XML
    adicionarJogadorEmXML(jogador);

    // Exibir a mensagem de sucesso
    alert('Jogador registrado com sucesso! Já pode salvar o próximo!');

    // Limpar os campos do formulário
    document.getElementById("nome").value = "";
    document.getElementById("numero_camisa").value = "";
});

function adicionarJogadorEmXML(jogador) {
    // Ler o arquivo XML
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = this.responseXML;

            // Criar o elemento jogador
            var jogadorElement = xmlDoc.createElement('jogador');

            // Adicionar elementos filho (nome e numero_camisa) ao elemento jogador
            var nomeElement = xmlDoc.createElement('nome');
            nomeElement.textContent = jogador.nome;
            jogadorElement.appendChild(nomeElement);

            var numeroCamisaElement = xmlDoc.createElement('numero_camisa');
            numeroCamisaElement.textContent = jogador.numero_camisa;
            jogadorElement.appendChild(numeroCamisaElement);

            // Adicionar o elemento jogador ao documento XML
            xmlDoc.getElementsByTagName('jogadores')[0].appendChild(jogadorElement);

            // Serializar o documento XML em uma string XML
            var xmlString = new XMLSerializer().serializeToString(xmlDoc);

            // Salvar as modificações no arquivo XML
            salvarModificacoesXML(xmlString);
        }
    };
    xmlhttp.open("GET", "Jogadores.xml", true);
    xmlhttp.send();
}

function salvarModificacoesXML(xmlString) {
    // Criar um objeto Blob a partir da string XML
    var blob = new Blob([xmlString], { type: 'text/xml' });

    // Criar um link de download e simular o clique nele para baixar o arquivo XML
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'Jogadores.xml';
    a.click();
}