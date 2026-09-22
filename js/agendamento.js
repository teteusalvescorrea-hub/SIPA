/* =========================================
   SIPA — SISTEMA DE AGENDAMENTO
   PARTE 1 — CALENDÁRIO
   ========================================= */

"use strict";


/* =========================================
   CONFIGURAÇÕES
   ========================================= */

let dataAtual = new Date();
// Agosto = mês 7 no JavaScript

let dataSelecionada = null;


/* =========================================
   ELEMENTOS DO HTML
   ========================================= */

const calendarDays =
    document.getElementById("calendar-days");

const calendarMonth =
    document.getElementById("calendar-month");

const previousMonthButton =
    document.getElementById("previous-month");

const nextMonthButton =
    document.getElementById("next-month");

const selectedDateLabel =
    document.getElementById("selected-date-label");

const summaryDate =
    document.getElementById("summary-date");


/* =========================================
   NOMES DOS MESES
   ========================================= */

const nomesMeses = [

    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"

];


/* =========================================
   NOMES DOS DIAS
   ========================================= */

const nomesDias = [

    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"

];


/* =========================================
   RENDERIZAR CALENDÁRIO
   ========================================= */

function renderizarCalendario() {

    if (!calendarDays) {
        return;
    }


    /* =====================================
       LIMPAR CALENDÁRIO
       ===================================== */

    calendarDays.innerHTML = "";


    /* =====================================
       PEGAR MÊS E ANO
       ===================================== */

    const ano =
        dataAtual.getFullYear();

    const mes =
        dataAtual.getMonth();


    /* =====================================
       ATUALIZAR TÍTULO
       ===================================== */

    calendarMonth.textContent =
        `${nomesMeses[mes]} ${ano}`;


    /* =====================================
       PRIMEIRO DIA DO MÊS
       ===================================== */

    const primeiroDia =
        new Date(
            ano,
            mes,
            1
        ).getDay();


    /* =====================================
       QUANTIDADE DE DIAS
       ===================================== */

    const quantidadeDias =
        new Date(
            ano,
            mes + 1,
            0
        ).getDate();


    /* =====================================
       DATA DE HOJE
       ===================================== */

    const hoje =
        new Date();

    hoje.setHours(
        0,
        0,
        0,
        0
    );


    /* =====================================
       ESPAÇOS ANTES DO PRIMEIRO DIA
       ===================================== */

    for (
        let i = 0;
        i < primeiroDia;
        i++
    ) {

        const diaVazio =
            document.createElement(
                "div"
            );


        diaVazio.classList.add(
            "calendar-day",
            "empty"
        );


        calendarDays.appendChild(
            diaVazio
        );

    }


    /* =====================================
       CRIAR OS DIAS
       ===================================== */

    for (
        let dia = 1;
        dia <= quantidadeDias;
        dia++
    ) {

        const elementoDia =
            document.createElement(
                "button"
            );


        elementoDia.type =
            "button";


        elementoDia.classList.add(
            "calendar-day"
        );


        elementoDia.textContent =
            dia;


        /* =================================
           DATA COMPLETA DO DIA
           ================================= */

        const dataDoDia =
            new Date(
                ano,
                mes,
                dia
            );


        dataDoDia.setHours(
            0,
            0,
            0,
            0
        );


        /* =================================
           VERIFICAR DOMINGO
           ================================= */

        const domingo =
            dataDoDia.getDay() === 0;


        /* =================================
           VERIFICAR SÁBADO
           ================================= */

        const sabado =
            dataDoDia.getDay() === 6;


        /* =================================
           VERIFICAR DATA PASSADA
           ================================= */

        const dataPassada =
            dataDoDia < hoje;


        /* =================================
           DOMINGO
           ================================= */

        if (domingo) {

            elementoDia.classList.add(
                "closed-day"
            );


            elementoDia.disabled =
                true;


            elementoDia.title =
                "Autoescola fechada aos domingos";

        }


        /* =================================
           DATA ANTERIOR A HOJE
           ================================= */

        if (dataPassada) {

            elementoDia.classList.add(
                "disabled"
            );


            elementoDia.disabled =
                true;


            elementoDia.title =
                "Não é possível agendar em uma data passada";

        }


        /* =================================
           VERIFICAR SE É HOJE
           ================================= */

        const ehHoje =
            dataDoDia.getTime() ===
            hoje.getTime();


        if (ehHoje) {

            elementoDia.classList.add(
                "today"
            );

        }


        /* =================================
           VERIFICAR DATA SELECIONADA
           ================================= */

        if (
            dataSelecionada &&
            dia === dataSelecionada.getDate() &&
            mes === dataSelecionada.getMonth() &&
            ano === dataSelecionada.getFullYear()
        ) {

            elementoDia.classList.add(
                "selected"
            );

        }


        /* =================================
           CLIQUE NO DIA
           ================================= */

        if (
            !domingo &&
            !dataPassada
        ) {

            elementoDia.addEventListener(
                "click",
                () => {

                    selecionarData(
                        ano,
                        mes,
                        dia
                    );

                }
            );

        }


        /* =================================
           ADICIONAR DIA AO CALENDÁRIO
           ================================= */

        calendarDays.appendChild(
            elementoDia
        );

    }

}


/* =========================================
   SELECIONAR DATA
   ========================================= */

function selecionarData(
    ano,
    mes,
    dia
) {

    dataSelecionada =
        new Date(
            ano,
            mes,
            dia
        );


    /* ATUALIZAR CALENDÁRIO */

    renderizarCalendario();


    /* ATUALIZAR TEXTO DA DATA */

    atualizarDataSelecionada();


    console.log(
        "Data selecionada:",
        dataSelecionada
    );

}


/* =========================================
   ATUALIZAR DATA SELECIONADA
   ========================================= */

function atualizarDataSelecionada() {

    if (!dataSelecionada) {
        return;
    }


    const dia =
        dataSelecionada.getDate();


    const mes =
        dataSelecionada.getMonth();


    const ano =
        dataSelecionada.getFullYear();


    const nomeDia =
        nomesDias[
            dataSelecionada.getDay()
        ];


    const textoData =
        `${nomeDia}, ${dia} de ${nomesMeses[mes]}`;


    /* HORÁRIOS */

    if (selectedDateLabel) {

        selectedDateLabel.textContent =
            textoData;

    }


    /* RESUMO */

    if (summaryDate) {

        summaryDate.textContent =
            `${dia.toString().padStart(2, "0")}/${(mes + 1)
                .toString()
                .padStart(2, "0")}/${ano}`;

    }

}


/* =========================================
   MÊS ANTERIOR
   ========================================= */

if (previousMonthButton) {

    previousMonthButton.addEventListener(
        "click",
        () => {

            dataAtual.setMonth(
                dataAtual.getMonth() - 1
            );


            dataSelecionada = null;


            renderizarCalendario();


            if (selectedDateLabel) {

                selectedDateLabel.textContent =
                    "Selecione uma data";

            }


            if (summaryDate) {

                summaryDate.textContent =
                    "Não selecionada";

            }

        }
    );

}


/* =========================================
   PRÓXIMO MÊS
   ========================================= */

if (nextMonthButton) {

    nextMonthButton.addEventListener(
        "click",
        () => {

            dataAtual.setMonth(
                dataAtual.getMonth() + 1
            );


            dataSelecionada = null;


            renderizarCalendario();


            if (selectedDateLabel) {

                selectedDateLabel.textContent =
                    "Selecione uma data";

            }


            if (summaryDate) {

                summaryDate.textContent =
                    "Não selecionada";

            }

        }
    );

}


/* =========================================
   INICIAR CALENDÁRIO
   ========================================= */

renderizarCalendario();
/* =========================================
   PARTE 2 — HORÁRIOS DISPONÍVEIS
   ========================================= */


/* =========================================
   ELEMENTOS
   ========================================= */

const timeSlots =
    document.getElementById("time-slots");

const summaryTime =
    document.getElementById("summary-time");

const confirmBookingButton =
    document.getElementById("confirm-booking");


/* =========================================
   HORÁRIOS DE FUNCIONAMENTO
   ========================================= */

const horariosDisponiveis = [

    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",

    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00"

];


/* =========================================
   HORÁRIOS OCUPADOS
   ========================================= */

const horariosOcupados = {};


/* =========================================
   HORÁRIO SELECIONADO
   ========================================= */

let horarioSelecionado = null;


/* =========================================
   FORMATAR DATA PARA O SISTEMA
   ========================================= */

function formatarDataSistema(data) {

    const ano =
        data.getFullYear();

    const mes =
        String(
            data.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            data.getDate()
        ).padStart(2, "0");


    return `${ano}-${mes}-${dia}`;

}


/* =========================================
   MOSTRAR HORÁRIOS
   ========================================= */

function mostrarHorarios() {

    if (!timeSlots) {
        return;
    }


    if (!dataSelecionada) {

        timeSlots.innerHTML = `

            <div class="empty-time-state">

                <span class="empty-time-icon">
                    ◷
                </span>

                <strong>
                    Escolha uma data
                </strong>

                <span>
                    Os horários disponíveis aparecerão aqui.
                </span>

            </div>

        `;

        return;

    }


    /* LIMPAR HORÁRIOS */

    timeSlots.innerHTML = "";


    /* DATA NO FORMATO DO SISTEMA */

    const dataChave =
        formatarDataSistema(
            dataSelecionada
        );


    /* =================================
   BUSCAR HORÁRIOS OCUPADOS
   ================================= */

/* Horários ocupados fixos */

const ocupadosFixos =
    horariosOcupados[dataChave] || [];


/* Agendamentos salvos */

const agendamentos =
    obterAgendamentos();


/* Horários ocupados pelos alunos */

const ocupadosAgendamentos =
    agendamentos
        .filter(
            (agendamento) => {

                return (
                    agendamento.dataSistema ===
                    dataChave
                );

            }
        )
        .map(
            (agendamento) => {

                return agendamento.horario;

            }
        );


/* =================================
   JUNTAR TODOS OS HORÁRIOS OCUPADOS
   ================================= */

const ocupados =
    [
        ...new Set(
            [
                ...ocupadosFixos,
                ...ocupadosAgendamentos
            ]
        )
    ];

    /* =================================
   HORÁRIOS CONFORME O DIA
   ================================= */

const diaDaSemana =
    dataSelecionada.getDay();


/* DOMINGO */

if (diaDaSemana === 0) {

    timeSlots.innerHTML = `
        <div class="empty-time-state">

            <span class="empty-time-icon">
                🔒
            </span>

            <strong>
                Autoescola fechada
            </strong>

            <span>
                Aos domingos não há aulas disponíveis.
            </span>

        </div>
    `;

    return;
}


/* =================================
   DEFINIR HORÁRIOS DO DIA
   ================================= */

let horariosDoDia =
    horariosDisponiveis;


/* =================================
   SÁBADO — ATÉ 11:00
   ================================= */

if (diaDaSemana === 6) {

    horariosDoDia =
        horariosDisponiveis.filter(
            (horario) =>
                horario <= "11:00"
        );
}

    /* =====================================
   VERIFICAR HORÁRIOS JÁ SELECIONADOS
   NESTA DATA
   ===================================== */

const aulasSelecionadasNestaData =
    aulasSelecionadas.filter(
        (aula) =>
            aula.data === dataChave
    );


/* =====================================
   MANTER O ÚLTIMO HORÁRIO CLICADO
   ===================================== */

if (
    aulasSelecionadasNestaData.length > 0
) {

    horarioSelecionado =
        aulasSelecionadasNestaData[
            aulasSelecionadasNestaData.length - 1
        ].horario;

} else {

    horarioSelecionado =
        null;

}


/* =====================================
   ATUALIZAR RESUMO DOS HORÁRIOS
   ===================================== */

if (summaryTime) {

    const horariosSelecionados =
        aulasSelecionadasNestaData.map(
            (aula) =>
                aula.horario
        );

    summaryTime.textContent =
        horariosSelecionados.length > 0
            ? horariosSelecionados.join(", ")
            : "Não selecionado";

}


    /* =====================================
       CRIAR CADA HORÁRIO
       ===================================== */

    horariosDoDia.forEach(
        (horario) => {

            const ocupado =
                ocupados.includes(
                    horario
                );

const aulaSelecionada =
    aulasSelecionadas.some(
        (aula) =>
            aula.data === dataChave &&
            aula.horario === horario
    );

            const botao =
                document.createElement(
                    "button"
                );


            botao.type =
                "button";


            botao.classList.add(
                "time-slot"
            );


            botao.textContent =
                horario;


            /* =================================
   HORÁRIO JÁ SELECIONADO
   ================================= */

if (aulaSelecionada) {

    botao.classList.add(
        "selected"
    );

}


/* =================================
   HORÁRIO OCUPADO
   ================================= */

if (ocupado) {

    botao.classList.add(
        "unavailable"
    );

    botao.disabled =
        true;

}


/* =================================
   HORÁRIO DISPONÍVEL OU SELECIONADO
   ================================= */

else {

    botao.addEventListener(
        "click",
        () => {

            selecionarHorario(
                horario
            );

        }
    );

}


            timeSlots.appendChild(
                botao
            );

        }
    );

}

/* =========================================
   LIMITE DISPONÍVEL DA CATEGORIA
   ========================================= */

function obterLimiteCategoria(
    categoria
) {

    const aluno =
        obterAlunoAtual();


    if (!aluno) {
        return 0;
    }


    const pacote =
        Number(
            aluno.pacote
        ) || 0;


    /* =====================================
       AULAS JÁ AGENDADAS
       DESTA CATEGORIA
       ===================================== */

    const agendamentos =
        obterAgendamentos();


    const aulasJaAgendadas =
        agendamentos.filter(
            (agendamento) => {

                return (
                    agendamento &&
                    agendamento.alunoCpf ===
                        aluno.cpf &&
                    agendamento.categoria ===
                        categoria &&
                    agendamento.status !==
                        "Cancelada"
                );

            }
        ).length;


    /* =====================================
       AULAS JÁ SELECIONADAS
       DESTA CATEGORIA
       ===================================== */

    const aulasJaSelecionadas =
        aulasSelecionadas.filter(
            (aula) => {

                return (
                    aula &&
                    aula.categoria ===
                        categoria
                );

            }
        ).length;


    /* =====================================
       LIMITE RESTANTE
       ===================================== */

    return Math.max(
        pacote -
        aulasJaAgendadas -
        aulasJaSelecionadas,
        0
    );

}

/* =========================================
   SELECIONAR HORÁRIO
   ========================================= */

function selecionarHorario(
    horario
) {

    if (!dataSelecionada) {
        return;
    }


    /* =====================================
       DATA NO FORMATO DO SISTEMA
       ===================================== */

    const dataSistema =
        formatarDataSistema(
            dataSelecionada
        );


    /* =====================================
       VERIFICAR SE O HORÁRIO JÁ FOI
       SELECIONADO
       ===================================== */

    const indiceSelecionado =
        aulasSelecionadas.findIndex(
            (aula) =>
                aula.data ===
                    dataSistema &&

                aula.horario ===
                    horario
        );


    /* =====================================
       SE JÁ ESTIVER SELECIONADO:
       DESMARCAR
       ===================================== */

    if (
        indiceSelecionado !== -1
    ) {

        aulasSelecionadas.splice(
            indiceSelecionado,
            1
        );


        /* ==============================
           VERIFICAR SE AINDA EXISTEM
           HORÁRIOS SELECIONADOS NESTA DATA
           ============================== */

        const restantesNestaData =
            aulasSelecionadas.filter(
                (aula) =>
                    aula.data ===
                    dataSistema
            );


        if (
            restantesNestaData.length > 0
        ) {

            horarioSelecionado =
                restantesNestaData[
                    restantesNestaData.length - 1
                ].horario;

        } else {

            horarioSelecionado =
                null;

        }


        mostrarHorarios();

        atualizarContadorAulas();

        atualizarInstrutorDisponivel();

        verificarAgendamento();


        console.log(
            "Horário desmarcado:",
            horario
        );


        return;

    }

/* =====================================
   VERIFICAR LIMITE DA CATEGORIA
   ===================================== */

const limiteRestante =
    obterLimiteCategoria(
        categoriaSelecionada
    );


if (
    limiteRestante <= 0
) {

    if (
        categoriaSelecionada === "A"
    ) {

        mostrarMensagem(
            "Você já atingiu o limite de aulas de moto deste pacote.",
            "error"
        );

    } else {

        mostrarMensagem(
            "Você já atingiu o limite de aulas de carro deste pacote.",
            "error"
        );

    }

    return;

}

    /* =====================================
       ADICIONAR NOVO HORÁRIO
       ===================================== */

       

    aulasSelecionadas.push({

    data:
        dataSistema,

    horario:
        horario,

    categoria:
        categoriaSelecionada

});


    /* =====================================
       GUARDAR ÚLTIMO HORÁRIO CLICADO
       ===================================== */

    horarioSelecionado =
        horario;


    /* =====================================
       ATUALIZAR TELA
       ===================================== */

    atualizarContadorAulas();

    mostrarHorarios();

    atualizarInstrutorDisponivel();

    verificarAgendamento();


    console.log(
        "Horário selecionado:",
        horario
    );

    console.log(
        "Aulas selecionadas:",
        aulasSelecionadas
    );

}


/* =========================================
   VERIFICAR AGENDAMENTO
   ========================================= */

function verificarAgendamento() {

    if (!confirmBookingButton) {
        return;
    }


    const categoriaSelecionada =
        document.querySelector(
            ".category-option.selected"
        );


    const categoria =
        categoriaSelecionada
            ? categoriaSelecionada.dataset.category
            : null;


    const data =
        dataSelecionada;


    const horario =
        horarioSelecionado;


    /*
       Só libera o botão quando
       categoria + data + horário
       estiverem selecionados.
    */

    confirmBookingButton.disabled =
        !(
            categoria &&
            data &&
            horario
        );

}


/* =========================================
   ATUALIZAR CALENDÁRIO
   ========================================= */

const renderizarCalendarioOriginal =
    renderizarCalendario;


renderizarCalendario =
    function () {

        renderizarCalendarioOriginal();

        mostrarHorarios();

    };
    /* =========================================
   PARTE 3 — CATEGORIA + INSTRUTOR
   ========================================= */


/* =========================================
   ELEMENTOS
   ========================================= */

const categoryOptions =
    document.querySelectorAll(
        ".category-option"
    );

    /* =========================================
   CATEGORIAS PERMITIDAS PELO PACOTE
   ========================================= */

function carregarCategoriasPermitidas() {

    const alunoSalvo =
        sessionStorage.getItem("sipaAluno");

    if (!alunoSalvo) {
        return;
    }

    try {

        const aluno =
            JSON.parse(alunoSalvo);

        const categoriaAluno =
            aluno.categoria;

        categoryOptions.forEach(
            (option) => {

                const categoria =
                    option.dataset.category;

                let permitida = false;

                if (categoriaAluno === "B") {

                    permitida =
                        categoria === "B";

                }

                else if (categoriaAluno === "A") {

                    permitida =
                        categoria === "A";

                }

                else if (categoriaAluno === "AB") {

                    permitida =
                        categoria === "B" ||
                        categoria === "A";

                }

                option.style.display =
                    permitida
                        ? ""
                        : "none";
            }
        );

    } catch (error) {

        console.error(
            "Erro ao carregar categoria do aluno:",
            error
        );

    }
}

carregarCategoriasPermitidas();

const summaryCategory =
    document.getElementById(
        "summary-category"
    );

const selectedInstructor =
    document.getElementById(
        "selected-instructor"
    );

const selectedVehicle =
    document.getElementById(
        "selected-vehicle"
    );

const instructorAvatar =
    document.querySelector(
        ".instructor-avatar"
    );


/* =========================================
   INSTRUTORES
   ========================================= */

const instrutores = {

    B: [

        {
            nome: "Carlos Mendes",
            veiculo: "HB20"
        },

        {
            nome: "Rafael Souza",
            veiculo: "HB20"
        },

        {
            nome: "André Martins",
            veiculo: "HB20"
        },

        {
            nome: "Marcos Oliveira",
            veiculo: "HB20"
        },

        {
            nome: "Felipe Santos",
            veiculo: "HB20"
        }

    ],


    A: [

        {
            nome: "João Pereira",
            veiculo: "CG Titan"
        },

        {
            nome: "Lucas Ferreira",
            veiculo: "CG Titan"
        },

        {
            nome: "Bruno Almeida",
            veiculo: "CG Titan"
        },

        {
            nome: "Diego Rodrigues",
            veiculo: "CG Titan"
        },

        {
            nome: "Thiago Costa",
            veiculo: "CG Titan"
        }

    ]

};


/* =========================================
   CATEGORIA ATUAL
   ========================================= */

let categoriaSelecionada = null;


/* =========================================
   SELECIONAR CATEGORIA
   ========================================= */

categoryOptions.forEach(
    (option) => {

        option.addEventListener(
            "click",
            () => {

                /* =========================
                   REMOVER SELEÇÃO ANTERIOR
                   ========================= */

                categoryOptions.forEach(
                    (item) => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                /* =========================
                   SELECIONAR ATUAL
                   ========================= */

                option.classList.add(
                    "selected"
                );


                categoriaSelecionada =
                    option.dataset.category;


                /* =========================
                   ATUALIZAR RESUMO
                   ========================= */

                atualizarCategoria();


                /* =========================
                   ATUALIZAR INSTRUTOR
                   ========================= */

                atualizarInstrutorDisponivel();


                /* =========================
                   VERIFICAR AGENDAMENTO
                   ========================= */

                verificarAgendamento();


                console.log(
                    "Categoria selecionada:",
                    categoriaSelecionada
                );

            }
        );

    }
);


/* =========================================
   ATUALIZAR CATEGORIA
   ========================================= */

function atualizarCategoria() {

    if (!summaryCategory) {
        return;
    }


    const nomesCategorias = {

        B: "Categoria B — Carro",

        A: "Categoria A — Moto",

        AB: "Categoria AB — Carro + Moto"

    };


    summaryCategory.textContent =
        nomesCategorias[
            categoriaSelecionada
        ] || "Não selecionada";

}


/* =========================================
   ATUALIZAR INSTRUTOR
   ========================================= */

function atualizarInstrutor() {

    if (
        !selectedInstructor ||
        !selectedVehicle
    ) {

        return;

    }


    /* =====================================
       CATEGORIA AB
       ===================================== */

    if (
        categoriaSelecionada === "AB"
    ) {

        selectedInstructor.textContent =
            "Instrutor será definido";

        selectedVehicle.textContent =
            "Veículo conforme o horário escolhido";

        if (instructorAvatar) {

            instructorAvatar.textContent =
                "?";

        }

        return;

    }


    /* =====================================
       BUSCAR INSTRUTORES
       ===================================== */

    const lista =
        instrutores[
            categoriaSelecionada
        ];


    if (
        !lista ||
        lista.length === 0
    ) {

        selectedInstructor.textContent =
            "Nenhum instrutor disponível";

        selectedVehicle.textContent =
            "Aguarde novas disponibilidades";

        return;

    }


    /* =====================================
       ESCOLHER INSTRUTOR
       ===================================== */

    const indice =
        Math.floor(
            Math.random() *
            lista.length
        );


    const instrutor =
        lista[indice];


    selectedInstructor.textContent =
        instrutor.nome;


    selectedVehicle.textContent =
        `Veículo: ${instrutor.veiculo}`;


    if (instructorAvatar) {

        instructorAvatar.textContent =
            instrutor.nome
                .charAt(0)
                .toUpperCase();

    }

}


/* =========================================
   ATUALIZAR PACOTE DO ALUNO
   ========================================= */

const bookingPackageInfo =
    document.getElementById(
        "booking-package-info"
    );

    /* =========================================
   CONTADOR DE AULAS SELECIONADAS
   ========================================= */

const selectedLessonsCount =
    document.getElementById(
        "selected-lessons-count"
    );

let aulasSelecionadas = [];


/* =========================================
   ATUALIZAR CONTADOR
   ========================================= */

function atualizarContadorAulas() {

    if (!selectedLessonsCount) {
        return;
    }

    selectedLessonsCount.textContent =
        aulasSelecionadas.length;

}

function carregarInformacoesPacote() {

    if (!bookingPackageInfo) {
        return;
    }


    const alunoSalvo =
        sessionStorage.getItem(
            "sipaAluno"
        );


    if (!alunoSalvo) {
        return;
    }


    try {

        const alunoSessao =
            JSON.parse(
                alunoSalvo
            );


        let aluno =
            alunoSessao;


        /* ==============================
           BUSCAR ALUNO NA BASE CENTRAL
           ============================== */

        if (
            typeof buscarAlunoPorCpf ===
            "function"
        ) {

            const alunoCentral =
                buscarAlunoPorCpf(
                    alunoSessao.cpf
                );


            if (alunoCentral) {

                aluno =
                    alunoCentral;


                /* ==============================
                   ATUALIZAR SESSÃO
                   ============================== */

                sessionStorage.setItem(
                    "sipaAluno",
                    JSON.stringify(
                        aluno
                    )
                );

            }

        }


        /* ==============================
           MOSTRAR PACOTE
           ============================== */

        bookingPackageInfo.textContent =
            `${aluno.pacote} aulas — ` +
            `${aluno.aulasRestantes} restantes`;


    } catch (error) {

        console.error(
            "Erro ao carregar informações do pacote:",
            error
        );

    }

}

carregarInformacoesPacote();
/* =========================================
   PARTE 4 — DISPONIBILIDADE DO INSTRUTOR
   ========================================= */


/* =========================================
   AULAS DOS INSTRUTORES
   ========================================= */

const agendaInstrutores = {

    "Carlos Mendes": {
        categoria: "B",
        aulas: {
            "2026-08-18": ["08:00", "14:00"],
            "2026-08-19": ["09:00", "16:00"]
        }
    },

    "Rafael Souza": {
        categoria: "B",
        aulas: {
            "2026-08-18": ["10:00"],
            "2026-08-19": ["13:00"]
        }
    },

    "André Martins": {
        categoria: "B",
        aulas: {
            "2026-08-18": ["07:00", "15:00"]
        }
    },

    "Marcos Oliveira": {
        categoria: "B",
        aulas: {
            "2026-08-18": ["09:00"],
            "2026-08-19": ["14:00"]
        }
    },

    "Felipe Santos": {
        categoria: "B",
        aulas: {
            "2026-08-18": ["16:00"],
            "2026-08-19": ["17:00"]
        }
    },


    /* =====================================
       INSTRUTORES DE MOTO
       ===================================== */

    "João Pereira": {
        categoria: "A",
        aulas: {
            "2026-08-18": ["08:00", "14:00"]
        }
    },

    "Lucas Ferreira": {
        categoria: "A",
        aulas: {
            "2026-08-18": ["09:00"],
            "2026-08-19": ["15:00"]
        }
    },

    "Bruno Almeida": {
        categoria: "A",
        aulas: {
            "2026-08-18": ["10:00", "16:00"]
        }
    },

    "Diego Rodrigues": {
        categoria: "A",
        aulas: {
            "2026-08-18": ["13:00"]
        }
    },

    "Thiago Costa": {
        categoria: "A",
        aulas: {
            "2026-08-18": ["17:00"],
            "2026-08-19": ["08:00"]
        }
    }

};


/* =========================================
   BUSCAR INSTRUTORES LIVRES
   ========================================= */

function buscarInstrutoresLivres(
    categoria,
    data,
    horario
) {

    if (
        !categoria ||
        !data ||
        !horario
    ) {

        return [];

    }


    const dataChave =
        formatarDataSistema(data);


    const lista =
        instrutores[categoria] || [];


    /* =================================
       BUSCAR AGENDAMENTOS SALVOS
       ================================= */

    const agendamentos =
        obterAgendamentos();


    /* =================================
       FILTRAR INSTRUTORES
       ================================= */

    const instrutoresLivres =
        lista.filter(
            (instrutor) => {

                /* =========================
                   AGENDA FIXA DO INSTRUTOR
                   ========================= */

                const agenda =
                    agendaInstrutores[
                        instrutor.nome
                    ];


                if (agenda) {

                    const aulasDoDia =
                        agenda.aulas[
                            dataChave
                        ] || [];


                    if (
                        aulasDoDia.includes(
                            horario
                        )
                    ) {

                        return false;

                    }

                }


                /* =========================
                   AGENDAMENTOS DO SISTEMA
                   ========================= */

                const instrutorOcupado =
                    agendamentos.some(
                        (agendamento) => {

                            return (
                                agendamento.dataSistema ===
                                    dataChave

                                &&

                                agendamento.horario ===
                                    horario

                                &&

                                agendamento.instrutor ===
                                    instrutor.nome
                            );

                        }
                    );


                /* =========================
                   RETORNAR DISPONIBILIDADE
                   ========================= */

                return !instrutorOcupado;

            }
        );


    return instrutoresLivres;

}


/* =========================================
   ATUALIZAR INSTRUTOR DISPONÍVEL
   ========================================= */

function atualizarInstrutorDisponivel() {

    if (
        !selectedInstructor ||
        !selectedVehicle
    ) {

        return;

    }


    /* =====================================
       SEM CATEGORIA
       ===================================== */

    if (!categoriaSelecionada) {

        selectedInstructor.textContent =
            "Será definido após escolher o horário";

        selectedVehicle.textContent =
            "Veículo disponível conforme a categoria";

        if (instructorAvatar) {

            instructorAvatar.textContent =
                "?";

        }

        return;

    }


    /* =====================================
       SEM DATA OU HORÁRIO
       ===================================== */

    if (
        !dataSelecionada ||
        !horarioSelecionado
    ) {

        selectedInstructor.textContent =
            "Escolha data e horário";

        selectedVehicle.textContent =
            "O instrutor será definido automaticamente";

        if (instructorAvatar) {

            instructorAvatar.textContent =
                "?";

        }

        return;

    }


    /* =====================================
       CATEGORIA AB
       ===================================== */

    if (
        categoriaSelecionada === "AB"
    ) {

        const livresCarro =
            buscarInstrutoresLivres(
                "B",
                dataSelecionada,
                horarioSelecionado
            );


        const livresMoto =
            buscarInstrutoresLivres(
                "A",
                dataSelecionada,
                horarioSelecionado
            );


        if (
            livresCarro.length === 0 &&
            livresMoto.length === 0
        ) {

            selectedInstructor.textContent =
                "Nenhum instrutor disponível";

            selectedVehicle.textContent =
                "Escolha outro horário";

            instructorAvatar.textContent =
                "!";

            return;

        }


        if (livresCarro.length > 0) {

            const instrutor =
                livresCarro[0];


            selectedInstructor.textContent =
                instrutor.nome;


            selectedVehicle.textContent =
                "HB20 • Categoria B";


            instructorAvatar.textContent =
                instrutor.nome
                    .charAt(0)
                    .toUpperCase();

        } else {

            const instrutor =
                livresMoto[0];


            selectedInstructor.textContent =
                instrutor.nome;


            selectedVehicle.textContent =
                "CG Titan • Categoria A";


            instructorAvatar.textContent =
                instrutor.nome
                    .charAt(0)
                    .toUpperCase();

        }


        return;

    }


    /* =====================================
       BUSCAR INSTRUTORES DA CATEGORIA
       ===================================== */

    const livres =
        buscarInstrutoresLivres(
            categoriaSelecionada,
            dataSelecionada,
            horarioSelecionado
        );


    /* =====================================
       NENHUM DISPONÍVEL
       ===================================== */

    if (livres.length === 0) {

        selectedInstructor.textContent =
            "Nenhum instrutor disponível";

        selectedVehicle.textContent =
            "Escolha outro horário";

        instructorAvatar.textContent =
            "!";

        return;

    }


    /* =====================================
       ESCOLHER PRIMEIRO LIVRE
       ===================================== */

    const instrutor =
        livres[0];


    selectedInstructor.textContent =
        instrutor.nome;


    selectedVehicle.textContent =
        `Veículo: ${instrutor.veiculo}`;


    instructorAvatar.textContent =
        instrutor.nome
            .charAt(0)
            .toUpperCase();

}


/* =========================================
   ATUALIZAR INSTRUTOR AO ESCOLHER HORÁRIO
   ========================================= */

const selecionarHorarioOriginal =
    selecionarHorario;


selecionarHorario =
    function (horario) {

        selecionarHorarioOriginal(
            horario
        );

        atualizarInstrutorDisponivel();

    };
    /* =========================================
   PARTE 5 — CONFIRMAÇÃO DO AGENDAMENTO
   ========================================= */


/* =========================================
   SALVAR AGENDAMENTOS DO ALUNO
   ========================================= */

function obterAgendamentos() {

    const agendamentosSalvos =
        localStorage.getItem("sipaAgendamentos");

    if (!agendamentosSalvos) {
        return [];
    }

    try {

        return JSON.parse(
            agendamentosSalvos
        );

    } catch (error) {

        console.error(
            "Erro ao carregar agendamentos:",
            error
        );

        return [];
    }
}


/* =========================================
   OBTER ALUNO ATUAL
   ========================================= */

function obterAlunoAtual() {

    const alunoSalvo =
        sessionStorage.getItem("sipaAluno");

    if (!alunoSalvo) {
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

        return null;
    }
}


/* =========================================
   MOSTRAR MENSAGEM
   ========================================= */

function mostrarMensagem(
    mensagem,
    tipo
) {

    const bookingMessage =
        document.getElementById(
            "booking-message"
        );

    if (!bookingMessage) {
        return;
    }

    bookingMessage.textContent =
        mensagem;

    bookingMessage.className =
        "booking-message visible";

    bookingMessage.classList.add(
        tipo
    );
}

/* =========================================
   CONFIRMAR TODAS AS AULAS SELECIONADAS
   ========================================= */

if (confirmBookingButton) {

    confirmBookingButton.addEventListener(
        "click",
        function () {

            /* ==============================
               OBTER ALUNO
               ============================== */

            const aluno =
                obterAlunoAtual();

            if (!aluno) {

                mostrarMensagem(
                    "Não foi possível identificar o aluno.",
                    "error"
                );

                return;
            }


            /* ==============================
               VERIFICAR SE EXISTEM AULAS
               ============================== */

            if (aulasSelecionadas.length === 0) {

                mostrarMensagem(
                    "Selecione pelo menos uma aula.",
                    "error"
                );

                return;
            }


            /* ==============================
   VERIFICAR LIMITE POR CATEGORIA
   ============================== */

const quantidadeA =
    aulasSelecionadas.filter(
        (aula) =>
            aula.categoria === "A"
    ).length;


const quantidadeB =
    aulasSelecionadas.filter(
        (aula) =>
            aula.categoria === "B"
    ).length;


/* =====================================
   SALDO DISPONÍVEL ANTES DAS SELEÇÕES
   ===================================== */

const saldoA =
    obterLimiteCategoria("A") +
    quantidadeA;


const saldoB =
    obterLimiteCategoria("B") +
    quantidadeB;


/* =====================================
   VALIDAR MOTO
   ===================================== */

if (
    quantidadeA > saldoA
) {

    mostrarMensagem(
        "A quantidade de aulas de moto selecionadas ultrapassa o limite disponível.",
        "error"
    );

    return;

}


/* =====================================
   VALIDAR CARRO
   ===================================== */

if (
    quantidadeB > saldoB
) {

    mostrarMensagem(
        "A quantidade de aulas de carro selecionadas ultrapassa o limite disponível.",
        "error"
    );

    return;

}


            /* ==============================
               CATEGORIA
               ============================== */

            if (!categoriaSelecionada) {

                mostrarMensagem(
                    "Selecione uma categoria.",
                    "error"
                );

                return;
            }


            /* ==============================
               NOMES DAS CATEGORIAS
               ============================== */

            const nomesCategorias = {

                A:
                    "Categoria A — Moto",

                B:
                    "Categoria B — Carro",

                AB:
                    "Categoria AB — Carro + Moto"

            };


            /* ==============================
               RECUPERAR AGENDAMENTOS
               ============================== */

            const agendamentos =
                obterAgendamentos();


            /* ==============================
               CRIAR TODAS AS AULAS
               ============================== */

            aulasSelecionadas.forEach(
                function (aulaSelecionada) {

                    const dataPartes =
                        aulaSelecionada.data.split("-");

                    const data =
                        new Date(
                            Number(dataPartes[0]),
                            Number(dataPartes[1]) - 1,
                            Number(dataPartes[2])
                        );


                    /* ==========================
                       BUSCAR INSTRUTOR
                       ========================== */

                    const categoriaDaAula =
    aulaSelecionada.categoria;


const livres =
    buscarInstrutoresLivres(
        categoriaDaAula,
        data,
        aulaSelecionada.horario
    );


                    if (
                        livres.length === 0
                    ) {

                        return;
                    }


                    const instrutor =
                        livres[0];


                    /* ==========================
                       FORMATAR DATA
                       ========================== */

                    const dataFormatada =
                        `${String(
                            data.getDate()
                        ).padStart(2, "0")}/` +

                        `${String(
                            data.getMonth() + 1
                        ).padStart(2, "0")}/` +

                        `${data.getFullYear()}`;


                    /* ==========================
                       VERIFICAR DUPLICIDADE
                       ========================== */

                    const duplicado =
                        agendamentos.some(
                            function (agendamento) {

                                return (
                                    agendamento.dataSistema ===
                                        aulaSelecionada.data &&

                                    agendamento.horario ===
                                        aulaSelecionada.horario &&

                                    agendamento.alunoCpf ===
                                        aluno.cpf
                                );

                            }
                        );


                    if (duplicado) {
                        return;
                    }


                    /* ==========================
                       CRIAR AGENDAMENTO
                       ========================== */

                    const novoAgendamento = {

                        id:
                            Date.now() +
                            Math.random(),

                        alunoCpf:
                            aluno.cpf,

                        alunoNome:
                            aluno.nome,

                        categoria:
    aulaSelecionada.categoria,

categoriaNome:
    nomesCategorias[
        aulaSelecionada.categoria
    ],

                        data:
                            dataFormatada,

                        dataSistema:
                            aulaSelecionada.data,

                        horario:
                            aulaSelecionada.horario,

                        instrutor:
                            instrutor.nome,

                        veiculo:
                            instrutor.veiculo,

                        unidade:
                            "Centro",

                        status:
                            "Confirmada",

                        criadoEm:
                            new Date().toISOString()

                    };


                    agendamentos.push(
                        novoAgendamento
                    );

                }
            );


            /* ==============================
               SALVAR TODAS AS AULAS
               ============================== */

            localStorage.setItem(
                "sipaAgendamentos",
                JSON.stringify(
                    agendamentos
                )
            );


            /* ==============================
               DESCONTAR AULAS DO PACOTE
               ============================== */

            aluno.aulasRestantes =
                Number(
                    aluno.aulasRestantes
                ) -
                aulasSelecionadas.length;


            /* ==============================
               ATUALIZAR SESSÃO
               ============================== */

            sessionStorage.setItem(
                "sipaAluno",
                JSON.stringify(
                    aluno
                )
            );


            /* ==============================
               ATUALIZAR BASE CENTRAL
               ============================== */

            if (
                typeof atualizarAlunoSipa ===
                "function"
            ) {

                atualizarAlunoSipa(
                    aluno
                );

            }


            /* ==============================
               ATUALIZAR PACOTE
               ============================== */

            carregarInformacoesPacote();


            /* ==============================
               SUCESSO
               ============================== */

            mostrarMensagem(
                `${aulasSelecionadas.length} aulas foram agendadas com sucesso!`,
                "success"
            );


            /* ==============================
               LIMPAR SELEÇÃO
               ============================== */

            aulasSelecionadas = [];

            atualizarContadorAulas();


            /* ==============================
               BLOQUEAR BOTÃO
               ============================== */

            confirmBookingButton.disabled =
                true;


            /* ==============================
               IR PARA DASHBOARD
               ============================== */

            setTimeout(
                function () {

                    window.location.href =
                        "dashboard.html";

                },
                1800
            );

        }
    );

}

/* =========================================
   LOGOUT
   ========================================= */

const bookingLogout =
    document.getElementById(
        "booking-logout"
    );

if (bookingLogout) {

    bookingLogout.addEventListener(
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