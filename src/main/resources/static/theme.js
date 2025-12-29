$(document).ready(function() {
    // 1. CHECAR O COOKIE ASSIM QUE ABRIR
    // Procura se já tem um cookie salvo dizendo "dark"
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("tema=dark")) {
            $("body").addClass("dark-mode"); // Adiciona a classe escuro
            $("#btnTema").text("☀️ Modo Claro"); // Muda o texto do botão
        }
    }

    // 2. O QUE ACONTECE AO CLICAR NO BOTÃO
    $("#btnTema").click(function() {
        // Troca a classe (se tem tira, se não tem põe)
        $("body").toggleClass("dark-mode");

        // Verifica como ficou para salvar a preferência
        let tema = $("body").hasClass("dark-mode") ? "dark" : "light";

        // Salva no Cookie (para lembrar depois)
        document.cookie = "tema=" + tema + "; path=/; max-age=" + (60 * 60 * 24 * 30);

        // Muda o texto do botão
        if (tema === "dark") {
            $(this).text("☀️ Modo Claro");
        } else {
            $(this).text("🌙 Modo Escuro");
        }
    });
});