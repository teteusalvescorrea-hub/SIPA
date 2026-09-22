/* =========================================
   SIPA — CADASTRO DE ALUNO
   ========================================= */

"use strict";

const cadastroForm = document.getElementById("cadastroForm");
const nomeInput = document.getElementById("nome");
const cpfInput = document.getElementById("cpf");
const emailInput = document.getElementById("email");
const telefoneInput = document.getElementById("telefone");
const categoriaInput = document.getElementById("categoria");
const pacoteInput = document.getElementById("pacote");
const senhaInput = document.getElementById("senha");
const confirmarSenhaInput = document.getElementById("confirmarSenha");
const mensagemCadastro = document.getElementById("mensagemCadastro");

cadastroForm.noValidate = true;

/* =========================================
   FORMATAÇÃO DO CPF
   ========================================= */

cpfInput.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");

    valor = valor.substring(0, 11);

    if (valor.length > 9) {
        valor = valor.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{1,2}).*/,
            "$1.$2.$3-$4"
        );
    } else if (valor.length > 6) {
        valor = valor.replace(
            /^(\d{3})(\d{3})(\d{1,3}).*/,
            "$1.$2.$3"
        );
    } else if (valor.length > 3) {
        valor = valor.replace(
            /^(\d{3})(\d{1,3}).*/,
            "$1.$2"
        );
    }

    this.value = valor;

    removerErroCampo(this);
});


/* =========================================
   FORMATAÇÃO DO TELEFONE
   ========================================= */

telefoneInput.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");

    valor = valor.substring(0, 11);

    if (valor.length > 10) {
        valor = valor.replace(
            /^(\d{2})(\d{5})(\d{1,4}).*/,
            "($1) $2-$3"
        );
    } else if (valor.length > 6) {
        valor = valor.replace(
            /^(\d{2})(\d{4})(\d{1,4}).*/,
            "($1) $2-$3"
        );
    } else if (valor.length > 2) {
        valor = valor.replace(
            /^(\d{2})(\d{1,5}).*/,
            "($1) $2"
        );
    }

    this.value = valor;

    removerErroCampo(this);
});


/* =========================================
   REMOVE ERRO AO PREENCHER
   ========================================= */

function removerErroCampo(campo) {
    campo.classList.remove("cadastro-field-error");

    const erro = campo.parentElement.querySelector(
        ".cadastro-error-message"
    );

    if (erro) {
        erro.remove();
    }
}


/* =========================================
   CPF
   ========================================= */

function validarCpf(cpf) {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += Number(cpf.charAt(i)) * (10 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    if (resto !== Number(cpf.charAt(9))) {
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += Number(cpf.charAt(i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    return resto === Number(cpf.charAt(10));
}


/* =========================================
   MENSAGEM GERAL DO CADASTRO
   ========================================= */

function mostrarMensagemCadastro(texto, tipo) {
    if (!mensagemCadastro) {
        return;
    }

    mensagemCadastro.textContent = texto;
    mensagemCadastro.className = `mensagem-cadastro ${tipo}`;
}


/* =========================================
   SUBMIT DO FORMULÁRIO
   ========================================= */

cadastroForm.addEventListener("submit", function (event) {
    event.preventDefault();


    /* -----------------------------------------
       LIMPA ERROS ANTERIORES
       ----------------------------------------- */

    document.querySelectorAll(".cadastro-error-message").forEach(function (erro) {
        erro.remove();
    });

    document.querySelectorAll(".cadastro-field-error").forEach(function (campo) {
        campo.classList.remove("cadastro-field-error");
    });


    /* -----------------------------------------
       PEGA OS VALORES
       ----------------------------------------- */

    const nome = nomeInput.value.trim();

    const cpf = cpfInput.value.replace(/\D/g, "");

    const email = emailInput.value.trim();

    const telefone = telefoneInput.value.replace(/\D/g, "");

    const categoria = categoriaInput.value;

    const pacote = Number(pacoteInput.value);

    const senha = senhaInput.value;

    const confirmarSenha = confirmarSenhaInput.value;


    let formularioValido = true;


    /* -----------------------------------------
       FUNÇÃO PARA MOSTRAR ERRO
       ----------------------------------------- */

    function mostrarErro(campo, mensagem) {
        campo.classList.add("cadastro-field-error");

        const erro = document.createElement("span");

        erro.className = "cadastro-error-message";

        erro.textContent = mensagem;

        campo.parentElement.appendChild(erro);

        formularioValido = false;
    }


    /* -----------------------------------------
       VALIDA NOME
       ----------------------------------------- */

    if (nome.length < 3) {
        mostrarErro(
            nomeInput,
            "Digite seu nome completo."
        );
    }


    /* -----------------------------------------
       VALIDA CPF
       ----------------------------------------- */

    if (!validarCpf(cpf)) {
        mostrarErro(
            cpfInput,
            "Digite um CPF válido."
        );
    }


    /* -----------------------------------------
       VALIDA E-MAIL
       ----------------------------------------- */

    if (email.length < 5 || !email.includes("@")) {
        mostrarErro(
            emailInput,
            "Digite um e-mail válido."
        );
    }


    /* -----------------------------------------
       VALIDA TELEFONE
       ----------------------------------------- */

    if (telefone.length < 10) {
        mostrarErro(
            telefoneInput,
            "Digite um telefone válido."
        );
    }


    /* -----------------------------------------
       VALIDA CATEGORIA
       ----------------------------------------- */

    if (!categoria) {
        mostrarErro(
            categoriaInput,
            "Selecione uma categoria."
        );
    }


    /* -----------------------------------------
       VALIDA PACOTE
       ----------------------------------------- */

    if (![2, 5, 10, 15, 20].includes(pacote)) {
        mostrarErro(
            pacoteInput,
            "Selecione um pacote de aulas."
        );
    }


    /* -----------------------------------------
       VALIDA SENHA
       ----------------------------------------- */

    if (senha.length < 6) {
        mostrarErro(
            senhaInput,
            "A senha deve possuir pelo menos 6 caracteres."
        );
    }


    /* -----------------------------------------
       CONFIRMA SENHA
       ----------------------------------------- */

    if (senha !== confirmarSenha) {
        mostrarErro(
            confirmarSenhaInput,
            "As senhas não coincidem."
        );
    }


    /* -----------------------------------------
       SE EXISTIR ERRO, PARA AQUI
       ----------------------------------------- */

    if (!formularioValido) {
        return;
    }


    /* -----------------------------------------
       PEGA OS ALUNOS EXISTENTES
       ----------------------------------------- */

    const alunos = obterAlunosSipa();


    /* -----------------------------------------
       VERIFICA CPF DUPLICADO
       ----------------------------------------- */

    const cpfExiste = alunos.some(
        aluno => aluno.cpf === cpf
    );


    if (cpfExiste) {
        mostrarErro(
            cpfInput,
            "Este CPF já possui uma conta cadastrada."
        );

        return;
    }


    /* -----------------------------------------
       GERA NOVO ID
       ----------------------------------------- */

    const novoId = alunos.length > 0
        ? Math.max(
            ...alunos.map(
                aluno => Number(aluno.id)
            )
        ) + 1
        : 1;


    /* -----------------------------------------
       CRIA NOVO ALUNO
       ----------------------------------------- */

    const novoAluno = {
        id: novoId,
        nome: nome,
        cpf: cpf,
        senha: senha,
        categoria: categoria,
        pacote: pacote,
        aulasRestantes: pacote,
        email: email,
        telefone: telefone
    };


    /* -----------------------------------------
       SALVA ALUNO
       ----------------------------------------- */

    alunos.push(novoAluno);

    salvarAlunosSipa(alunos);


    /* -----------------------------------------
       SUCESSO
       ----------------------------------------- */

    mostrarMensagemCadastro(
        "Cadastro realizado com sucesso! Redirecionando para o login...",
        "success"
    );


    /* -----------------------------------------
       REDIRECIONA PARA LOGIN
       ----------------------------------------- */

    setTimeout(function () {
        window.location.href = "login.html";
    }, 1500);
});