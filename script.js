

// Função para mostrar a descrição da campanha
function mostrarDescricao(campanha) {
    const descricao = document.getElementById(`descricao-${campanha}`);
    descricao.classList.add("ativo");
  }
  
  // Função para ocultar a descrição da campanha
  function ocultarDescricao(campanha) {
    const descricao = document.getElementById(`descricao-${campanha}`);
    descricao.classList.remove("ativo");
  }
  
  // Função para lidar com o clique no botão da campanha
  function descreverCampanha(campanha) {
    // Ocultar todas as descrições
    const descricoes = document.querySelectorAll(".descricao-campanha");
    descricoes.forEach(descricao => descricao.classList.remove("ativo"));
    // Mostrar a descrição da campanha selecionada
    mostrarDescricao(campanha);
  
    
  }
  



  function createRadioButton(id, value, description, imageurl, atributos) {
    const radioContainer = document.querySelector('#classe');
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.id = id;
    radioInput.textContent = value
    radioInput.name = 'radio-group';
    
  
    const divClasse = document.createElement('div');
    divClasse.classList.add("classe-card")
    
    
    divTituloETexto = document.createElement('div');
    divTituloETexto.classList.add("titulo-e-texto-no-card")

    divImgEAtributos = document.createElement('div');
    divImgEAtributos.classList.add("img-e-atributos-no-card")

    const nomeDaClasse = document.createElement('h3')
    nomeDaClasse.textContent = value
  
    const paragraph = document.createElement('p');
    paragraph.textContent = description;
  
    const image = document.createElement('img');
    image.src = imageurl;
    image.alt = value;
    const listaAtributos = document.createElement('ul')
    listaAtributos.id = "lista-de-atributos"
   
    for(const atributo in atributos){
      const valor = atributos[atributo]
      const atributoItem = document.createElement('li')
      atributoItem.textContent = `${atributo.toUpperCase()}: ${atributos[atributo]}`
      listaAtributos.appendChild(atributoItem)
     }

    divTituloETexto.appendChild(nomeDaClasse)
    divTituloETexto.appendChild(paragraph);

    divImgEAtributos.appendChild(image)
    divImgEAtributos.appendChild(listaAtributos)
    
    divClasse.appendChild(divTituloETexto)
    divClasse.appendChild(divImgEAtributos);
    
    

    radioContainer.appendChild(radioInput);
    radioContainer.appendChild(divClasse);
  }

  function preencherSelectClasses(campanha) {
    fetch(".\\dados-das-classe.json")
  .then(response => response.json())
  .then(data => {
    let classes = [];
    switch (campanha) {
      case "Medieval":
        classes = data.classesMedieval;
        break;
      case "Espacial":
        classes = data.classesEspacial;
        break;
    case "Vitoriana":
        classes = data.classesVitoriana;
        break;
    case "Faroeste":
        classes = data.classesFaroeste;
        break;
  
      
    }
    const selectClasses = document.getElementById("classe");
    selectClasses.innerHTML = ""; // Limpar opções anteriores
    classes.forEach(classe => {
        createRadioButton(classe.nome, classe.nome, classe.descricao,classe.img, classe.atributos)
       });
  })
  }

  function escolherCampanha(campanha){
   

    const confirmacao = document.querySelector(".titulo-da-area-de-campanha");
    confirmacao.textContent = `A campanha escolhida foi: ${campanha}`;

    const areaCards = document.querySelector(".area-de-cards");
    areaCards.style.display = "none"; 

    const escolherCampanha = document.querySelector(".escolha-campanha")
    escolherCampanha.classList.add("ativo")

    const formularioCriacaoPersonagem = document.querySelector(".criacao-personagem")
    formularioCriacaoPersonagem.classList.add("ativo")
    
    preencherSelectClasses(campanha);
  }

  // Exemplo de uso no botão
  const botaoMedieval = document.getElementById("botao-medieval");
  botaoMedieval.addEventListener("click", () => descreverCampanha("medieval"));

  const botaoEspacial = document.getElementById("botao-espacial");
  botaoEspacial.addEventListener("click", () => descreverCampanha("espacial"));

  const botaoVitoriana = document.getElementById("botao-vitoriana");
  botaoVitoriana.addEventListener("click", () => descreverCampanha("vitoriana"));

  const botaoFaroeste = document.getElementById("botao-faroeste");
  botaoFaroeste.addEventListener("click", () => descreverCampanha("faroeste"));

  
//Parte de cração de personagens
function criarPersonagem(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Obter os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const classes = document.getElementsByName("radio-group");
    const historia = document.getElementById("historia").value;
    const atributos = document.getElementById("lista-de-atributos").childNodes
    const aventura = document.querySelector(".titulo-da-area-de-campanha")
    //console.log(atributos.childNodes.textContent)

    let listaAtributos = []
    for(const atributo of atributos){
      listaAtributos.push(atributo.textContent)
    }
    // ... (obtenha os valores dos outros campos)
  
  let classeEscolhida=""
  for(const classe of classes){
    if(classe.checked){
      classeEscolhida = classe.id
    }
  }
  
  
    // Crie o objeto do personagem
    const personagem = {
      nome: nome,
      descricao: descricao,
      classe: classeEscolhida,
      historia: historia,
      atributos: listaAtributos,
      aventura: aventura.innerText.split(":")[1]
      
    };
    
  
    // Exiba as informações do personagem ou prossiga para a próxima etapa
    const descriçãoInicialDoPersonagem = `O personagem é da classe ${personagem.classe} se chama ${personagem.nome} possui a descrição física: ${descricao}, sua história de vida é: ${historia}, seus atributos para o inicio da aventura são ${personagem.atributos.map(atributo => atributo )}`; // Substitua por sua lógica
    
    const textoStartAventura = `Você é o mestre de uma aventura rpg de fantasia que se passa no cenário ${personagem.aventura}. interaja com player em turnos e quando oportuno peça para que o player role um dado e te diga o valor para que baseado no dado e nos pontos de habilidade ele tenha como resultado sucesso, conseguindo o que deseja ou fracasso, recebendo a consequência. ${descriçãoInicialDoPersonagem}`

    fazerRequisicaoPost(textoStartAventura).finally(() => {
      loader.style.display = 'none'; // Hide the loader after the message is sent
    });;
    const formularioCriacaoPersonagem = document.querySelector(".criacao-personagem")
    const tituloAventura = document.querySelector("#aventura")
    formularioCriacaoPersonagem.classList.remove("ativo")
    const confirmacao = document.querySelector(".titulo-da-area-de-campanha");
    setTimeout(()=>{
      formularioCriacaoPersonagem.classList.add("remover")
      tituloAventura.classList.add("ativo")
      confirmacao.classList.add("desativado")

    },1000)
    

    
  }
  

  // Adicionar event listener ao formulário
  const formulario = document.getElementById("formulario-personagem");
  formulario.addEventListener("submit", criarPersonagem);
  
  const areaDeInteracao = document.getElementById("desenrolar-da-aventura")
  const botaoAcao = document.getElementById("agir")
  const interacaoComMestre = document.getElementById("fala-com-mestre")

  botaoAcao.addEventListener("click", function(event) {
    event.preventDefault()
    const interacao = interacaoComMestre.value
    fazerRequisicaoPost(interacao).finally(() => {
      loader.style.display = 'none'; // Hide the loader after the message is sent
    });;
    interacaoComMestre.value = ""
    areaDeInteracao.innerHTML += `<div class="parte-do-player">${interacao}</div>`;
    areaDeInteracao.scrollTop = areaDeInteracao.scrollHeight
  })
let historico = []

async function fazerRequisicaoPost(interacao) {
    
    const url = 'https://desafio-imersao-ia.onrender.com'; // Substitua por sua URL
    const dados = { // Objeto com dados a serem enviados
      pergunta: interacao ,
      history:historico.map(item => ({ role: item.role, parts: item.parts }))
    };
    console.log(dados.history)
    
    const options = {
      method: 'POST', // Definir o método como POST
      headers: {
        'Content-Type': 'application/json' // Definir cabeçalho para JSON
      },
      body: JSON.stringify(dados) // Converter dados para JSON
    };
  
    try {
        
      const response = await fetch(url, options); // Fazer a requisição
      const responseData = await response.text() // Converter a resposta para JSON
    
    areaDeInteracao.innerHTML += `<div class="parte-do-mestre">${responseData}</div>`
    areaDeInteracao.scrollTop = areaDeInteracao.scrollHeight
      
      historico = [...historico, {
        "role": "user",
        "parts": [{text: dados.pergunta}]
      },
      {
        "role": "model",
        "parts": [{text: responseData}]
      }
        ]

        // console.log(historico)
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }
