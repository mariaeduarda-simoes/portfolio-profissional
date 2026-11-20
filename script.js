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

function destacarSecaoAtiva() {
    const secoes = document.querySelectorAll("section");
    const links = document.querySelectorAll(".main-navigation a");

    function atualizar() {
        let secaoAtual = "";

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

function ativarBotaoTopo() {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao-topo";
    botao.setAttribute("aria-label", "Voltar ao topo");
    botao.textContent = "↑";
    document.body.appendChild(botao);

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

function ativarModalCertificados() {
    
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

        previa.setAttribute("tabindex", "0");
        previa.setAttribute("role", "button");
        previa.setAttribute("aria-label", "Ampliar certificado: " + nome);

        function abrir() {
        
            conteudo.innerHTML = card.innerHTML;

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

    janela.querySelector(".modal-fechar").addEventListener("click", function () {
        janela.close();
    });

    janela.addEventListener("click", function (evento) {
        if (evento.target === janela) {
            janela.close();
        }
    });
}

function animarSecoes() {
    const secoes = document.querySelectorAll("#sobre, #certificados, #projetos, #contato");

    secoes.forEach(function (secao) {
        secao.classList.add("animar");
    });

    function mostrarSecoes() {
        secoes.forEach(function (secao) {
            
            if (secao.getBoundingClientRect().top < window.innerHeight - 100) {
                secao.classList.add("visivel");
            }
        });
    }

    window.addEventListener("scroll", mostrarSecoes);
    mostrarSecoes();
}


//chama tudo//
ativarRolagemSuave();
destacarSecaoAtiva();
ativarTema();
ativarBotaoTopo();
ativarModalCertificados();