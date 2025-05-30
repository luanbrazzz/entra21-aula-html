const listaStorage = localStorage.getItem("listaLivros");
let listaLivros = [];
if (listaStorage) {
  listaLivros = JSON.parse(listaStorage);
}

let livroAtual = null;

function buscarLivro() {
  const inputIsbn = document.getElementById("input_isbn");
  const valorIsbn = inputIsbn.value.trim();

  if (!valorIsbn) {
    alert("Por favor, digite um ISBN.");
    return;
  }

  fetch("https://brasilapi.com.br/api/isbn/v1/" + valorIsbn)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error("Livro não encontrado");
      }
      return resposta.json();
    })
    .then((json) => {
      const divInfoLivro = document.getElementById("info_livro");
      divInfoLivro.classList.remove("oculto");

      const campoTitulo = document.getElementById("titulo");
      campoTitulo.textContent = json.title || "";

      const campoSubtitulo = document.getElementById("subtitulo");
      campoSubtitulo.textContent = json.subtitle || "";

      const campoAutores = document.getElementById("autores");
      campoAutores.textContent = (json.authors && json.authors.join(", ")) || "";

      const campoEditora = document.getElementById("editora");
      campoEditora.textContent = json.publisher || "";

      const campoSinopse = document.getElementById("sinopse");
      campoSinopse.textContent = json.synopsis || "";

      const campoAno = document.getElementById("ano");
      campoAno.textContent = json.year || "";

      const campoPaginas = document.getElementById("paginas");
      campoPaginas.textContent = json.page_count || "";

      const campoCategorias = document.getElementById("categorias");
      campoCategorias.textContent = (json.subjects && json.subjects.join(", ")) || "";

      const imagemCapa = document.getElementById("img_capa");
      if (json.cover_url) {
        imagemCapa.src = json.cover_url;
        imagemCapa.classList.remove("oculto");
      } else {
        imagemCapa.classList.add("oculto");
      }

      livroAtual = json;
    })
    .catch((erro) => {
      alert("Livro não encontrado ou ISBN inválido.");
      console.error(erro);
      limparCampos();
    });
}

function clicarSalvar() {
  if (!livroAtual) {
    return;
  }

  const livroJaExiste = listaLivros.some((livro) => livro.isbn === livroAtual.isbn);
  if (livroJaExiste) {
    alert("Este livro já está salvo.");
    return;
  }

  listaLivros.push(livroAtual);
  localStorage.setItem("listaLivros", JSON.stringify(listaLivros));
  alert("Livro salvo com sucesso!");
  atualizarListaLivrosSalvos();
  limparCampos();
}

function limparCampos() {
  const inputIsbn = document.getElementById("input_isbn");
  inputIsbn.value = "";

  const divInfoLivro = document.getElementById("info_livro");
  divInfoLivro.classList.add("oculto");

  livroAtual = null;
}

function configurarEventos() {
  const botaoBuscar = document.getElementById("btn_buscar");
  botaoBuscar.addEventListener("click", buscarLivro);

  const botaoSalvar = document.getElementById("btn_salvar");
  botaoSalvar.addEventListener("click", clicarSalvar);

  const botaoCancelar = document.getElementById("btn_cancelar");
  botaoCancelar.addEventListener("click", limparCampos);

  atualizarListaLivrosSalvos(); 
}


function atualizarListaLivrosSalvos() {
  const listaElement = document.getElementById("lista_livros_salvos");
  if (!listaElement) return;

  listaElement.innerHTML = ""; // limpa a lista anterior

  listaLivros.forEach((livro) => {
    const li = document.createElement("li");
    li.textContent = livro.title || "Título não disponível";
    listaElement.appendChild(li);
  });
}

window.addEventListener("load", configurarEventos);
