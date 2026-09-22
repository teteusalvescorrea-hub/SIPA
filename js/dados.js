/* =========================================
   SIPA — DADOS CENTRAIS
   BASE DE DADOS DA SIMULAÇÃO
   ========================================= */

"use strict";


/* =========================================
   ALUNOS DEMONSTRAÇÃO
   ========================================= */

const alunosSipa = [
    {
        id: 1,
        nome: "Lucas Almeida",
        cpf: "12345678901",
        senha: "123456",
        categoria: "B",
        pacote: 20,
        aulasRestantes: 12,
        email: "lucas.almeida@email.com",
        telefone: "27999990001"
    },

    {
        id: 2,
        nome: "Mariana Santos",
        cpf: "23456789012",
        senha: "123456",
        categoria: "B",
        pacote: 15,
        aulasRestantes: 8,
        email: "mariana.santos@email.com",
        telefone: "27999990002"
    },

    {
        id: 3,
        nome: "Gabriel Oliveira",
        cpf: "34567890123",
        senha: "123456",
        categoria: "A",
        pacote: 20,
        aulasRestantes: 14,
        email: "gabriel.oliveira@email.com",
        telefone: "27999990003"
    },

    {
        id: 4,
        nome: "Ana Beatriz Costa",
        cpf: "45678901234",
        senha: "123456",
        categoria: "AB",
        pacote: 20,
        aulasRestantes: 10,
        email: "ana.beatriz@email.com",
        telefone: "27999990004"
    },

    {
        id: 5,
        nome: "Rafael Martins",
        cpf: "56789012345",
        senha: "123456",
        categoria: "B",
        pacote: 10,
        aulasRestantes: 5,
        email: "rafael.martins@email.com",
        telefone: "27999990005"
    }
];


/* =========================================
   INSTRUTORES
   ========================================= */

const instrutoresCarroSipa = [
    {
        nome: "Ronaldo",
        veiculo: "HB20"
    },
    {
        nome: "Marcos",
        veiculo: "HB20"
    },
    {
        nome: "Eduardo",
        veiculo: "HB20"
    },
    {
        nome: "Paulo",
        veiculo: "HB20"
    },
    {
        nome: "Fernando",
        veiculo: "HB20"
    }
];


const instrutoresMotoSipa = [
    {
        nome: "Carlos",
        veiculo: "CG Titan"
    },
    {
        nome: "Felipe",
        veiculo: "CG Titan"
    },
    {
        nome: "André",
        veiculo: "CG Titan"
    },
    {
        nome: "Bruno",
        veiculo: "CG Titan"
    },
    {
        nome: "Diego",
        veiculo: "CG Titan"
    }
];


/* =========================================
   HORÁRIOS DE FUNCIONAMENTO
   ========================================= */

const horariosSipa = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00"
];


/* =========================================
   HORÁRIOS BLOQUEADOS
   ========================================= */

const horariosBloqueadosSipa = {
    "11:00": true,
    "12:00": true
};


/* =========================================
   CATEGORIAS
   ========================================= */

const categoriasSipa = {
    B: "Carro",
    A: "Moto",
    AB: "Carro + Moto"
};


/* =========================================
   LOCALSTORAGE — ALUNOS
   ========================================= */

function inicializarAlunosSipa() {

    const alunosSalvos =
        localStorage.getItem("sipaAlunos");

    if (!alunosSalvos) {

        localStorage.setItem(
            "sipaAlunos",
            JSON.stringify(alunosSipa)
        );

        return alunosSipa;
    }

    try {

        return JSON.parse(alunosSalvos);

    } catch (error) {

        console.error(
            "Erro ao carregar alunos do SIPA:",
            error
        );

        localStorage.setItem(
            "sipaAlunos",
            JSON.stringify(alunosSipa)
        );

        return alunosSipa;
    }
}


/* =========================================
   OBTER ALUNOS
   ========================================= */

function obterAlunosSipa() {

    return inicializarAlunosSipa();

}


/* =========================================
   SALVAR ALUNOS
   ========================================= */

function salvarAlunosSipa(alunos) {

    localStorage.setItem(
        "sipaAlunos",
        JSON.stringify(alunos)
    );

}


/* =========================================
   BUSCAR ALUNO PELO CPF
   ========================================= */

function buscarAlunoPorCpf(cpf) {

    const alunos =
        obterAlunosSipa();

    return alunos.find(
        aluno => aluno.cpf === cpf
    );

}


/* =========================================
   ATUALIZAR ALUNO
   ========================================= */

function atualizarAlunoSipa(alunoAtualizado) {

    const alunos =
        obterAlunosSipa();

    const indice =
        alunos.findIndex(
            aluno => aluno.id === alunoAtualizado.id
        );

    if (indice === -1) {
        return false;
    }

    alunos[indice] =
        alunoAtualizado;

    salvarAlunosSipa(alunos);

    return true;
}


/* =========================================
   INICIALIZAÇÃO
   ========================================= */

inicializarAlunosSipa();