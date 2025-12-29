const API_URL = "http://localhost:8080/analises";

$(document).ready(function() {
    console.log("Página carregada, buscando análises..."); // Para debug
    listarAnalises();
});

function listarAnalises() {
    $.ajax({
        url: API_URL,
        method: "GET",
        success: function(data) {
            $("#listaAnalises").empty(); // Limpa antes de preencher
            
            if (data.length === 0) {
                $("#listaAnalises").html("<p>Nenhuma análise encontrada.</p>");
                return;
            }

            data.forEach(analise => {
                const nomeFilme = analise.filme ? analise.filme.titulo : "Filme Excluído";
                
                $("#listaAnalises").append(`
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${nomeFilme}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Nota: ${analise.nota}</h6>
                                <p class="card-text">"${analise.analise}"</p>
                                <button class="btn btn-danger btn-sm" onclick="deletarAnalise(${analise.id})">Excluir</button>
                            </div>
                        </div>
                    </div>
                `);
            });
        },
        error: function(error) {
            console.log("Erro ao buscar análises:", error);
            alert("Erro ao carregar análises. Verifique se o servidor está rodando.");
        }
    });
}

$("#formAnalise").submit(function(event) {
    // 1. Para o envio automático
    event.preventDefault();

    // 2. Captura os valores
    const filmeId = $("#filmeIdInput").val();
    const texto = $("#textoAnalise").val().trim();
    const notaVal = parseFloat($("#nota").val()); // Transforma em número decimal

    // --- BLOCO DE VALIDAÇÃO DA NOTA (0 a 10) ---
    if (isNaN(notaVal) || notaVal < 0 || notaVal > 10) {
        alert("Erro: A nota deve ser um valor entre 0 e 10!");
        return false; // Interrompe o envio aqui
    }

    if (texto.length < 5) {
        alert("Erro: Por favor, escreva uma análise um pouco mais detalhada.");
        return false;
    }
    // -------------------------------------------

    const novaAnalise = {
        filme: { id: filmeId },
        analise: texto,
        nota: notaVal
    };

    // 3. Envio AJAX
    $.ajax({
        url: API_URL,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(novaAnalise),
        success: function() {
            alert("Análise publicada com sucesso!");
            $("#formAnalise")[0].reset();
            listarAnalises();
        },
        error: function() {
            alert("Erro ao publicar! Verifique se o ID do filme existe.");
        }
    });
});

function deletarAnalise(id) {
    if (confirm("Apagar essa análise?")) {
        $.ajax({
            url: `${API_URL}/${id}`,
            method: "DELETE",
            success: function() {
                listarAnalises();
            }
        });
    }
}