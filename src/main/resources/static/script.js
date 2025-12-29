// URL da API (o mesmo endereço que usamos no Postman)
const API_URL = "http://localhost:8080/filmes";

// Quando a página carregar, busca os filmes
$(document).ready(function() {
    listarFilmes();
});

// Função para listar (GET)
function listarFilmes() {
    $.ajax({
        url: API_URL,
        method: "GET",
        success: function(data) {
            $("#tabelaFilmes").empty(); // Limpa a tabela antes de encher
            
            // Para cada filme, cria uma linha na tabela
            data.forEach(filme => {
                $("#tabelaFilmes").append(`
                    <tr>
                        <td>${filme.id}</td>
                        <td>${filme.titulo}</td>
                        <td>${filme.genero}</td>
                        <td>${filme.ano}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editarFilme(${filme.id}, '${filme.titulo}', '${filme.sinopse}', '${filme.genero}', ${filme.ano})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="deletarFilme(${filme.id})">Excluir</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function() {
            alert("Erro ao carregar filmes. O servidor está ligado?");
        }
    });
}

// Função para Cadastrar (POST) ou Atualizar (PUT)
$("#formFilme").submit(function(event) {
    event.preventDefault(); // Não deixa a página recarregar

    const id = $("#filmeId").val();
    const filme = {
        titulo: $("#titulo").val(),
        sinopse: $("#sinopse").val(),
        genero: $("#genero").val(),
        ano: $("#ano").val()
    };

    if (id) {
        // Se tem ID, é Edição (PUT)
        $.ajax({
            url: `${API_URL}/${id}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(filme),
            success: function() {
                alert("Filme atualizado!");
                limparFormulario();
                listarFilmes();
            },
            error: function() { alert("Erro ao atualizar."); }
        });
    } else {
        // Se não tem ID, é Cadastro Novo (POST)
        $.ajax({
            url: API_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(filme),
            success: function() {
                alert("Filme cadastrado!");
                limparFormulario();
                listarFilmes();
            },
            error: function() { alert("Erro ao cadastrar."); }
        });
    }
});

// Função para Deletar (DELETE)
function deletarFilme(id) {
    if (confirm("Tem certeza que deseja excluir este filme?")) {
        $.ajax({
            url: `${API_URL}/${id}`,
            method: "DELETE",
            success: function() {
                alert("Filme excluído!");
                listarFilmes();
            },
            error: function() { alert("Erro ao excluir."); }
        });
    }
}

// Função para preparar a edição (joga os dados no formulário)
function editarFilme(id, titulo, sinopse, genero, ano) {
    $("#filmeId").val(id);
    $("#titulo").val(titulo);
    $("#sinopse").val(sinopse);
    $("#genero").val(genero);
    $("#ano").val(ano);
    
    $("#btnSalvar").text("Atualizar Filme");
    $("#btnSalvar").removeClass("btn-primary").addClass("btn-warning");
    $("#btnCancelar").show();
}

// Botão Cancelar
$("#btnCancelar").click(function() {
    limparFormulario();
});

function limparFormulario() {
    $("#formFilme")[0].reset();
    $("#filmeId").val("");
    $("#btnSalvar").text("Salvar Filme");
    $("#btnSalvar").removeClass("btn-warning").addClass("btn-primary");
    $("#btnCancelar").hide();
}