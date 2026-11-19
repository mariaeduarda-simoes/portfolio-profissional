// =====================================================
// script.js - Portfólio Maria Eduarda
// =====================================================


// ===== ROLAGEM SUAVE =====
function ativarRolagemSuave() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
        link.addEventListener("click", function (evento) {
            const destino = document.querySelector(link.getAttribute("href"));
            if (!destino) return;

            evento.preventDefault();
            destino.scrollIntoView({ behavior: "smooth" });
        });
    });
}


// ===== DESTACAR A SEÇÃO ATIVA NO MENU =====
function destacarSecaoAtiva() {
    const secoes = document.querySelectorAll("section");
    const links = document.querySelectorAll(".main-navigation a");

    function atualizar() {
        let secaoAtual = "";

        // A seção atual é a última cujo topo já passou da metade da tela
        secoes.forEach(function (secao) {
            if (secao.getBoundingClientRect().top <= window.innerHeight / 2) {
                secaoAtual = secao.id;
            }
        });

        links.forEach(function (link) {
            if (link.getAttribute("href") === "#" + secaoAtual) {
                link.classList.add("ativo");
            } else {
                link.classList.remove("ativo");
            }
        });
    }

    window.addEventListener("scroll", atualizar);
    atualizar();
}


// ===== TEMA CLARO / ESCURO (salvo no localStorage) =====
function ativarTema() {
    const botao = document.querySelector(".theme-toggle");

    function aplicarTema(tema) {
        if (tema === "claro") {
            document.body.classList.add("tema-claro");
            botao.innerHTML = '<i data-lucide="moon"></i>';
            botao.setAttribute("aria-label", "Mudar para o tema escuro");
        } else {
            document.body.classList.remove("tema-claro");
            botao.innerHTML = '<i data-lucide="sun"></i>';
            botao.setAttribute("aria-label", "Mudar para o tema claro");
        }

        lucide.createIcons();
    }

    // Lê o tema salvo (se não houver, usa o escuro)
    aplicarTema(localStorage.getItem("tema") || "escuro");

    botao.addEventListener("click", function () {
        let novoTema = "claro";
        if (document.body.classList.contains("tema-claro")) {
            novoTema = "escuro";
        }

        aplicarTema(novoTema);
        localStorage.setItem("tema", novoTema);
    });
}


// ===== BOTÃO DE VOLTAR AO TOPO =====
function ativarBotaoTopo() {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao-topo";
    botao.setAttribute("aria-label", "Voltar ao topo");
    botao.textContent = "↑";
    document.body.appendChild(botao);

    // Aparece depois de rolar 500px
    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) {
            botao.classList.add("mostrar");
        } else {
            botao.classList.remove("mostrar");
        }
    });

    botao.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


// ===== CERTIFICADOS AMPLIADOS =====
// Fecha pelo ×, clicando fora ou com a tecla Esc
function ativarModalCertificados() {
    // Cria a janela (dialog) e coloca no fim da página
    const janela = document.createElement("dialog");
    janela.className = "modal-certificado";
    janela.setAttribute("aria-label", "Certificado ampliado");
    janela.innerHTML =
        '<button type="button" class="modal-fechar" aria-label="Fechar">×</button>' +
        '<div class="modal-conteudo"></div>';
    document.body.appendChild(janela);

    const conteudo = janela.querySelector(".modal-conteudo");

    document.querySelectorAll(".certificate-card").forEach(function (card) {
        const previa = card.querySelector(".certificate-preview");
        const nome = card.querySelector(".certificate-name").textContent.trim();

        // Deixa a prévia utilizável pelo teclado
        previa.setAttribute("tabindex", "0");
        previa.setAttribute("role", "button");
        previa.setAttribute("aria-label", "Ampliar certificado: " + nome);

        function abrir() {
            // Copia o conteúdo do card para dentro da janela
            conteudo.innerHTML = card.innerHTML;

            // Na cópia, a prévia não é um botão
            const copia = conteudo.querySelector(".certificate-preview");
            copia.removeAttribute("tabindex");
            copia.removeAttribute("role");
            copia.removeAttribute("aria-label");

            janela.showModal();
        }

        previa.addEventListener("click", abrir);

        previa.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                abrir();
            }
        });
    });

    // Fechar pelo botão ×
    janela.querySelector(".modal-fechar").addEventListener("click", function () {
        janela.close();
    });

    // Fechar clicando fora (o clique caiu na própria janela, não no conteúdo)
    janela.addEventListener("click", function (evento) {
        if (evento.target === janela) {
            janela.close();
        }
    });
}

// ===== ANIMAÇÃO DE ENTRADA DAS SEÇÕES =====
function animarSecoes() {
    const secoes = document.querySelectorAll("#sobre, #certificados, #projetos, #contato");

    // Deixa as seções escondidas no começo
    secoes.forEach(function (secao) {
        secao.classList.add("animar");
    });

    function mostrarSecoes() {
        secoes.forEach(function (secao) {
            // Se o topo da seção já entrou na tela, mostra
            if (secao.getBoundingClientRect().top < window.innerHeight - 100) {
                secao.classList.add("visivel");
            }
        });
    }

    window.addEventListener("scroll", mostrarSecoes);
    mostrarSecoes();
}


// ===== CHAMA TUDO =====
ativarRolagemSuave();
destacarSecaoAtiva();
ativarTema();
ativarBotaoTopo();
ativarModalCertificados();