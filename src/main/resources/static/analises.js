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
    event.preventDefault();
    
    const filmeId = $("#filmeIdInput").val();
    const texto = $("#textoAnalise").val().trim();
    const nota = $("#nota").val();

    if (!filmeId) {
        alert("Você precisa informar o ID do filme!");
        return;
    }

    if (texto.length < 10) {
        alert("A análise deve ter pelo menos 10 caracteres!");
        return;
    }

    if (nota < 0 || nota > 10) {
        alert("A nota deve ser entre 0 e 10!");
        return;
    }
    const novaAnalise = {
        filme: { id: $("#filmeIdInput").val() },
        analise: $("#textoAnalise").val(),
        nota: $("#nota").val()
    };

    $.ajax({
        url: API_URL,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(novaAnalise),
        success: function() {
            alert("Análise publicada!");
            $("#formAnalise")[0].reset();
            listarAnalises(); // Atualiza a lista na hora!
        },
        error: function() {
            alert("Erro! Verifique se o ID do filme existe.");
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