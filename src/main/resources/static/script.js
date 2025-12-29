const API_URL = "http://localhost:8080/filmes";

$(document).ready(function() {
    listarFilmes();
});

function listarFilmes() {
    $.ajax({
        url: API_URL,
        method: "GET",
        success: function(data) {
            $("#tabelaFilmes").empty(); 
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

$("#formFilme").submit(function(event) {
    // 1. Pega o formulário puro do HTML
    const form = this;

    // 2. Validação nativa (Balãozinho de erro)
    if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity(); // ISSO CRIA O ERRO BONITINHO
        return false;
    }

    event.preventDefault();

    const id = $("#filmeId").val();
    const filme = {
        titulo: $("#titulo").val().trim(),
        sinopse: $("#sinopse").val().trim(),
        genero: $("#genero").val(),
        ano: parseInt($("#ano").val())
    };

    const metodo = id ? "PUT" : "POST";
    const urlFinal = id ? `${API_URL}/${id}` : API_URL;

    $.ajax({
        url: urlFinal,
        method: metodo,
        contentType: "application/json",
        data: JSON.stringify(filme),
        success: function() {
            alert(id ? "Filme atualizado!" : "Filme cadastrado!");
            limparFormulario();
            listarFilmes();
        },
        error: function() { 
            alert("Erro na operação. Verifique a conexão com o servidor."); 
        }
    });
});

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