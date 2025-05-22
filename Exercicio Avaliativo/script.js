// Pegando elementos do HTML
const form = document.getElementById('form-contato');
const lista = document.getElementById('lista-contatos');

// Carregar contatos salvos ao abrir a página
document.addEventListener('DOMContentLoaded', carregarContatos);

// Quando o formulário for enviado
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Impede o recarregamento da página

  // Pegando os valores digitados
  const nome = document.getElementById('nome').value;
  const telefone1 = document.getElementById('telefone1').value;
  const telefone2 = document.getElementById('telefone2').value;

  // Criando objeto do contato
  const contato = {
    nome,
    telefone1,
    telefone2
  };

  // Pegando contatos do localStorage ou criando uma lista vazia
  const contatos = JSON.parse(localStorage.getItem('contatos')) || [];

  // Adicionando o novo contato
  contatos.push(contato);

  // Salvando novamente no localStorage
  localStorage.setItem('contatos', JSON.stringify(contatos));

  // Atualiza a lista na tela
  mostrarContatoNaTela(contato);

  // Limpa o formulário
  form.reset();
});

// Função para exibir um contato na tela
function mostrarContatoNaTela(contato) {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${contato.nome}</strong><br>
                  Tel. Principal: ${contato.telefone1}<br>
                  Tel. Secundário: ${contato.telefone2 || '---'}`;
  lista.appendChild(li);
}

// Carregar todos os contatos do localStorage na tela
function carregarContatos() {
  const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
  contatos.forEach(contato => {
    mostrarContatoNaTela(contato);
  });
}
