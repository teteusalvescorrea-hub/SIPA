/* =========================================
   SIPA — MEU PERFIL
   PARTE 1 — CARREGAR DADOS DO ALUNO
   ========================================= */

"use strict";


/* =========================================
   ELEMENTOS
   ========================================= */

const profileAvatar =
    document.getElementById(
        "profile-avatar"
    );

const profileName =
    document.getElementById(
        "profile-name"
    );

const profileCategory =
    document.getElementById(
        "profile-category"
    );

const profileFullName =
    document.getElementById(
        "profile-full-name"
    );

const profileCpf =
    document.getElementById(
        "profile-cpf"
    );

const profileEmail =
    document.getElementById(
        "profile-email"
    );

const profilePhone =
    document.getElementById(
        "profile-phone"
    );

const profileCourseCategory =
    document.getElementById(
        "profile-course-category"
    );

const profilePackage =
    document.getElementById(
        "profile-package"
    );

const profileRemaining =
    document.getElementById(
        "profile-remaining"
    );


/* =========================================
   BUSCAR ALUNO LOGADO
   ========================================= */

function obterAluno() {

    const alunoSalvo =
        sessionStorage.getItem(
            "sipaAluno"
        );


    if (!alunoSalvo) {

        window.location.href =
            "login.html";

        return null;

    }


    try {

        return JSON.parse(
            alunoSalvo
        );

    } catch (error) {

        console.error(
            "Erro ao carregar aluno:",
            error
        );

        window.location.href =
            "login.html";

        return null;

    }

}


/* =========================================
   FORMATAR CPF
   ========================================= */

function formatarCpf(cpf) {

    if (!cpf) {

        return "-";

    }


    const numero =
        String(cpf).replace(
            /\D/g,
            ""
        );


    if (numero.length !== 11) {

        return cpf;

    }


    return (
        numero.substring(0, 3) +
        "." +
        numero.substring(3, 6) +
        "." +
        numero.substring(6, 9) +
        "-" +
        numero.substring(9, 11)
    );

}


/* =========================================
   FORMATAR TELEFONE
   ========================================= */

function formatarTelefone(telefone) {

    if (!telefone) {

        return "-";

    }


    const numero =
        String(telefone).replace(
            /\D/g,
            ""
        );


    if (numero.length === 11) {

        return (
            "(" +
            numero.substring(0, 2) +
            ") " +
            numero.substring(2, 7) +
            "-" +
            numero.substring(7, 11)
        );

    }


    if (numero.length === 10) {

        return (
            "(" +
            numero.substring(0, 2) +
            ") " +
            numero.substring(2, 6) +
            "-" +
            numero.substring(6, 10)
        );

    }


    return telefone;

}


/* =========================================
   CATEGORIA
   ========================================= */

function obterNomeCategoria(categoria) {

    const categorias = {

        A:
            "Categoria A — Moto",

        B:
            "Categoria B — Carro",

        AB:
            "Categoria AB — Carro + Moto"

    };


    return (
        categorias[categoria] ||
        "Categoria não informada"
    );

}


/* =========================================
   CARREGAR PERFIL
   ========================================= */

function carregarPerfil() {

    const aluno =
        obterAluno();


    if (!aluno) {

        return;

    }


    /* =====================================
       NOME
       ===================================== */

    const nomeCompleto =
        aluno.nome || "Aluno";


    const primeiroNome =
        nomeCompleto
            .trim()
            .split(" ")[0];


    if (profileName) {

        profileName.textContent =
            nomeCompleto;

    }


    if (profileFullName) {

        profileFullName.textContent =
            nomeCompleto;

    }


    /* =====================================
       INICIAL
       ===================================== */

    if (profileAvatar) {

        profileAvatar.textContent =
            primeiroNome
                .charAt(0)
                .toUpperCase();

    }


    /* =====================================
       CATEGORIA
       ===================================== */

    const categoria =
        aluno.categoria;


    const nomeCategoria =
        obterNomeCategoria(
            categoria
        );


    if (profileCategory) {

        profileCategory.textContent =
            nomeCategoria;

    }


    if (profileCourseCategory) {

        profileCourseCategory.textContent =
            categoria || "-";

    }


    /* =====================================
       CPF
       ===================================== */

    if (profileCpf) {

        profileCpf.textContent =
            formatarCpf(
                aluno.cpf
            );

    }


    /* =====================================
       E-MAIL
       ===================================== */

    if (profileEmail) {

        profileEmail.textContent =
            aluno.email || "-";

    }


    /* =====================================
       TELEFONE
       ===================================== */

    if (profilePhone) {

        profilePhone.textContent =
            formatarTelefone(
                aluno.telefone
            );

    }


    /* =====================================
       PACOTE
       ===================================== */

    if (profilePackage) {

        profilePackage.textContent =
            aluno.pacote
                ? `${aluno.pacote}`
                : "-";

    }


    /* =====================================
       AULAS RESTANTES
       ===================================== */

    if (profileRemaining) {

        profileRemaining.textContent =
            aluno.aulasRestantes ?? "-";

    }


    /* =====================================
       CONSOLE
       ===================================== */

    console.log(
        "Perfil carregado:",
        aluno
    );

}


/* =========================================
   LOGOUT
   ========================================= */

const logoutButton =
    document.getElementById(
        "profile-logout"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            sessionStorage.removeItem(
                "sipaAluno"
            );


            window.location.href =
                "login.html";

        }
    );

}


/* =========================================
   INICIAR
   ========================================= */

carregarPerfil();

