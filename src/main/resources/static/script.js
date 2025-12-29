// URL da API
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

// Função para Cadastrar (POST) ou Atualizar (PUT)
$("#formFilme").submit(function(event) {
    // 1. O primeiro passo DEVE ser parar o formulário
    event.preventDefault();

    // 2. Captura e limpeza de dados
    const id = $("#filmeId").val();
    const tituloVal = $("#titulo").val().trim();
    const anoVal = parseInt($("#ano").val()); // Transforma em número real
    const generoVal = $("#genero").val();
    const sinopseVal = $("#sinopse").val().trim();

    // 3. BLOCO DE VALIDAÇÃO (Se entrar em qualquer IF, o 'return' para o código)
    
    if (tituloVal === "") {
        alert("Erro: O título do filme é obrigatório!");
        return false; 
    }

    if (sinopseVal.length < 10) {
        alert("Erro: A sinopse deve ter pelo menos 10 caracteres! (Você digitou apenas " + sinopseVal.length + ")");
        return false;
    }

    if (isNaN(anoVal) || anoVal < 1888 || anoVal > 2030) {
        alert("Erro: O ano deve ser entre 1888 e 2030. O valor " + anoVal + " é inválido!");
        return false;
    }

    // 4. SÓ CHEGA AQUI SE TODAS AS REGRAS ACIMA FOREM VERDADEIRAS
    const filme = {
        titulo: tituloVal,
        sinopse: sinopseVal,
        genero: generoVal,
        ano: anoVal
    };

    // 5. Agora sim, envia para a API
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

// Função para preparar a edição
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