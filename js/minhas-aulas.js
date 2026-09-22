"use strict";

/* =========================================
   SIPA — MINHAS AULAS
   ========================================= */


/* =========================================
   ELEMENTOS
   ========================================= */

const lessonsList =
    document.getElementById("lessons-list");

const totalLessons =
    document.getElementById("total-lessons");

const lessonsCount =
    document.getElementById("lessons-count");

const nextLessonSummary =
    document.getElementById("next-lesson-summary");


/* =========================================
   BUSCAR ALUNO LOGADO
   ========================================= */

function obterAluno() {

    const alunoSalvo =
        sessionStorage.getItem("sipaAluno");

    if (!alunoSalvo) {

        window.location.href =
            "login.html";

        return null;
    }

    try {

        return JSON.parse(alunoSalvo);

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
   BUSCAR AGENDAMENTOS
   ========================================= */

function obterAgendamentos() {

    const dados =
        localStorage.getItem(
            "sipaAgendamentos"
        );

    if (!dados) {
        return [];
    }

    try {

        return JSON.parse(dados);

    } catch (error) {

        console.error(
            "Erro ao carregar agendamentos:",
            error
        );

        return [];
    }
}


/* =========================================
   CONVERTER DATA
   ========================================= */

function converterData(data) {

    const partes =
        data.split("-");

    return new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
    );
}


/* =========================================
   CALCULAR HORAS ÚTEIS
   REGRA DE CANCELAMENTO
   ========================================= */

function calcularHorasUteis(
    inicio,
    fim
) {

    let totalHoras = 0;

    let atual =
        new Date(inicio);


    while (atual < fim) {

        const diaSemana =
            atual.getDay();


        /* =====================================
           DOMINGO
           ===================================== */

        if (diaSemana === 0) {

            atual.setDate(
                atual.getDate() + 1
            );

            atual.setHours(
                0,
                0,
                0,
                0
            );

            continue;
        }


        /* =====================================
           LIMITE DO DIA
           ===================================== */

        const limiteDia =
            new Date(atual);


        /*
         * SÁBADO
         * Conta somente até 12:00.
         */

        if (diaSemana === 6) {

            limiteDia.setHours(
                12,
                0,
                0,
                0
            );

        } else {

            /*
             * SEGUNDA A SEXTA
             */

            limiteDia.setHours(
                23,
                59,
                59,
                999
            );
        }


        const fimDoPeriodo =
            fim < limiteDia
                ? fim
                : limiteDia;


        if (fimDoPeriodo > atual) {

            totalHoras +=
                (
                    fimDoPeriodo - atual
                ) /
                (
                    1000 * 60 * 60
                );
        }


        /* =====================================
           PRÓXIMO DIA
           ===================================== */

        atual.setDate(
            atual.getDate() + 1
        );

        atual.setHours(
            0,
            0,
            0,
            0
        );
    }


    return totalHoras;
}


/* =========================================
   BUSCAR AULAS DO ALUNO
   ========================================= */

function buscarAulasDoAluno() {

    const aluno =
        obterAluno();

    if (!aluno) {
        return [];
    }


    const agendamentos =
        obterAgendamentos();


    return agendamentos.filter(
        (agendamento) => {

            return (
                agendamento.alunoCpf ===
                aluno.cpf
            );

        }
    );
}


/* =========================================
   ORDENAR AULAS
   ========================================= */

function ordenarAulas(aulas) {

    return aulas.sort(
        (a, b) => {

            const dataA =
                converterData(
                    a.dataSistema
                );

            const dataB =
                converterData(
                    b.dataSistema
                );


            const horaA =
                Number(
                    a.horario
                        .split(":")[0]
                );

            const horaB =
                Number(
                    b.horario
                        .split(":")[0]
                );


            dataA.setHours(
                horaA
            );

            dataB.setHours(
                horaB
            );


            return dataA - dataB;

        }
    );
}


/* =========================================
   MOSTRAR ESTADO VAZIO
   ========================================= */

function mostrarEstadoVazio() {

    if (!lessonsList) {
        return;
    }


    lessonsList.innerHTML = `

        <div class="lessons-empty">

            <div class="lessons-empty-icon">
                ◷
            </div>

            <strong>
                Você ainda não possui aulas agendadas
            </strong>

            <span>
                Agende sua próxima aula para começar
                sua formação.
            </span>

            <a
                href="agendamento.html"
                class="new-lesson-button"
            >
                + Agendar minha primeira aula
            </a>

        </div>

    `;
}


/* =========================================
   CRIAR CARD DA AULA
   ========================================= */

function criarCardAula(aula) {

    const item =
        document.createElement(
            "article"
        );


    item.className =
        "lesson-item";


    item.innerHTML = `

        <div class="lesson-date">

            <div class="lesson-date-icon">
                ◫
            </div>

            <div class="lesson-date-info">

                <span>
                    DATA
                </span>

                <strong>
                    ${aula.data}
                </strong>

                <small>
                    ${aula.horario}
                </small>

            </div>

        </div>


        <div class="lesson-main-info">

            <strong class="lesson-category">
                ${aula.categoriaNome}
            </strong>

            <span class="lesson-instructor">
                Instrutor: ${aula.instrutor}
            </span>

        </div>


        <div class="lesson-details">

            <div class="lesson-detail">

    <span class="lesson-detail-icon">
        ${
            aula.categoria === "A"
                ? "🏍️"
                : aula.categoria === "B"
                    ? "🚗"
                    : "🚗🏍️"
        }
    </span>

    ${aula.veiculo}

</div>

            <div class="lesson-detail">

                <span class="lesson-detail-icon">
                    ◎
                </span>

                Unidade Centro

            </div>

        </div>


        <div class="lesson-status">

            <span class="lesson-status-badge">

                <span class="lesson-status-dot"></span>

                ${aula.status}

            </span>

        </div>


        <div class="lesson-actions">

            <button
                type="button"
                class="cancel-lesson-button"
                data-date="${aula.dataSistema}"
                data-time="${aula.horario}"
            >
                Cancelar aula
            </button>

        </div>

    `;


    return item;
}


/* =========================================
   MODAL DE SUCESSO
   ========================================= */

function mostrarSucessoCancelamento(
    dataFormatada,
    horario
) {

    const modal =
        document.createElement(
            "div"
        );


    modal.className =
        "cancel-success-overlay";


    modal.innerHTML = `

        <div class="cancel-success-modal">

            <div class="cancel-success-icon">
                ✓
            </div>


            <h2>
                Aula cancelada com sucesso!
            </h2>


            <p>

                Sua aula do dia

                <strong>
                    ${dataFormatada}
                </strong>

                às

                <strong>
                    ${horario}
                </strong>

                foi cancelada corretamente.

            </p>


            <div class="cancel-success-info">

                <strong>
                    Seu saldo foi atualizado.
                </strong>

                <span>
                    A aula retornou para seu saldo
                    e poderá ser reagendada.
                </span>

            </div>


            <button
                type="button"
                class="cancel-success-button"
                id="close-cancel-success"
            >
                Entendi
            </button>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    const closeButton =
        document.getElementById(
            "close-cancel-success"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                modal.remove();

            }
        );

    }

}


/* =========================================
   CANCELAR AULA
   ========================================= */

function cancelarAula(
    data,
    horario
) {

    console.log(
        "Tentando cancelar:",
        data,
        horario
    );


    /* =====================================
       ALUNO
       ===================================== */

    const aluno =
        obterAluno();


    if (!aluno) {
        return;
    }


    /* =====================================
       DATA DA AULA
       ===================================== */

    const partesData =
        data.split("-");


    const partesHorario =
        horario.split(":");


    const dataAula =
        new Date(

            Number(partesData[0]),

            Number(partesData[1]) - 1,

            Number(partesData[2]),

            Number(partesHorario[0]),

            Number(partesHorario[1] || 0),

            0,

            0

        );


    /* =====================================
       DATA ATUAL
       ===================================== */

    const agora =
        new Date();


    /* =====================================
       VERIFICAR SE A AULA JÁ PASSOU
       ===================================== */

    if (dataAula <= agora) {

        alert(
            "Não é possível cancelar uma aula que já passou."
        );

        return;
    }


    /* =====================================
       CALCULAR HORAS ÚTEIS
       ===================================== */

    const horasUteis =
        calcularHorasUteis(
            agora,
            dataAula
        );


    console.log(
        "Horas úteis disponíveis:",
        horasUteis
    );


    /* =====================================
       REGRA DE 48 HORAS ÚTEIS
       ===================================== */

    if (horasUteis < 48) {

        alert(

            "Não é possível cancelar esta aula.\n\n" +

            "O cancelamento deve ser solicitado " +

            "com pelo menos 48 horas úteis " +
            "de antecedência.\n\n" +

            "Tempo disponível: " +

            horasUteis.toFixed(1) +

            " horas úteis."

        );

        return;
    }


    /* =====================================
       DATA FORMATADA
       ===================================== */

    const dataFormatada =
        `${partesData[2]}/${partesData[1]}/${partesData[0]}`;


    /* =====================================
       MODAL DE CONFIRMAÇÃO
       ===================================== */

    const modalConfirmacao =
        document.createElement("div");


    modalConfirmacao.className =
        "cancel-confirm-overlay";


    modalConfirmacao.innerHTML = `

        <div class="cancel-confirm-modal">

            <div class="cancel-confirm-icon">
                ?
            </div>

            <h2>
                Tem certeza que deseja cancelar?
            </h2>

            <p>
                Deseja realmente cancelar sua aula do dia
                <strong>${dataFormatada}</strong>
                às
                <strong>${horario}</strong>?
            </p>

            <div class="cancel-confirm-info">

                <strong>
                    Atenção
                </strong>

                <span>
                    Essa aula será devolvida ao seu saldo
                    e poderá ser reagendada.
                </span>

            </div>

            <div class="cancel-confirm-actions">

                <button
                    type="button"
                    class="cancel-confirm-back"
                    id="cancel-confirm-back"
                >
                    Voltar
                </button>

                <button
                    type="button"
                    class="cancel-confirm-yes"
                    id="cancel-confirm-yes"
                >
                    Confirmar cancelamento
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        modalConfirmacao
    );


    /* =================================
       BOTÃO VOLTAR
       ================================= */

    const voltarConfirmacao =
        document.getElementById(
            "cancel-confirm-back"
        );


    if (voltarConfirmacao) {

        voltarConfirmacao.addEventListener(
            "click",
            function () {

                modalConfirmacao.remove();

            }
        );

    }


    /* =================================
       BOTÃO CONFIRMAR
       ================================= */

    const confirmarCancelamento =
        document.getElementById(
            "cancel-confirm-yes"
        );


    if (confirmarCancelamento) {

        confirmarCancelamento.addEventListener(
            "click",
            function () {

                modalConfirmacao.remove();


                /* =================================
                   BUSCAR AGENDAMENTOS
                   ================================= */

                const agendamentos =
                    obterAgendamentos();


                /* =================================
                   LOCALIZAR AULA
                   ================================= */

                const aulaEncontrada =
                    agendamentos.find(
                        function (agendamento) {

                            return (
                                agendamento.alunoCpf ===
                                    aluno.cpf &&

                                agendamento.dataSistema ===
                                    data &&

                                agendamento.horario ===
                                    horario
                            );

                        }
                    );


                if (!aulaEncontrada) {

                    alert(
                        "Não foi possível encontrar esta aula."
                    );

                    return;
                }


                /* =================================
                   REMOVER AULA
                   ================================= */

                const agendamentosAtualizados =
                    agendamentos.filter(
                        function (agendamento) {

                            return !(
                                agendamento.alunoCpf ===
                                    aluno.cpf &&

                                agendamento.dataSistema ===
                                    data &&

                                agendamento.horario ===
                                    horario
                            );

                        }
                    );


                /* =================================
                   SALVAR AGENDAMENTOS
                   ================================= */

                localStorage.setItem(
                    "sipaAgendamentos",
                    JSON.stringify(
                        agendamentosAtualizados
                    )
                );


                /* =================================
                   DEVOLVER AULA AO SALDO
                   ================================= */

                const saldoAtual =
                    Number(
                        aluno.aulasRestantes
                    ) || 0;

                const pacote =
                    Number(
                        aluno.pacote
                    ) || 0;

                aluno.aulasRestantes =
                    Math.min(
                        saldoAtual + 1,
                        pacote
                    );


                /* =================================
                   ATUALIZAR SESSION STORAGE
                   ================================= */

                sessionStorage.setItem(
                    "sipaAluno",
                    JSON.stringify(
                        aluno
                    )
                );


                /* =================================
                   ATUALIZAR BASE CENTRAL
                   ================================= */

                if (
                    typeof atualizarAlunoSipa ===
                    "function"
                ) {

                    atualizarAlunoSipa(
                        aluno
                    );

                }


                /* =================================
                   MOSTRAR SUCESSO
                   ================================= */

                mostrarSucessoCancelamento(
                    dataFormatada,
                    horario
                );


                /* =================================
                   ATUALIZAR LISTA
                   ================================= */

                carregarAulas();

            }
        );

    }

}


/* =========================================
   CLIQUE NO BOTÃO CANCELAR
   ========================================= */

if (lessonsList) {

    lessonsList.addEventListener(
        "click",
        function (event) {

            const botao =
                event.target.closest(
                    ".cancel-lesson-button"
                );


            if (!botao) {
                return;
            }


            console.log(
                "Botão cancelar clicado"
            );


            const data =
                botao.dataset.date;


            const horario =
                botao.dataset.time;


            console.log(
                "Data:",
                data,
                "Horário:",
                horario
            );


            if (!data || !horario) {

                alert(
                    "Não foi possível identificar os dados da aula."
                );

                return;
            }


            cancelarAula(
                data,
                horario
            );

        }
    );

}


/* =========================================
   MOSTRAR AULAS
   ========================================= */

function carregarAulas() {

    const aulas =
        ordenarAulas(
            buscarAulasDoAluno()
        );


    /* =====================================
       TOTAL
       ===================================== */

    if (totalLessons) {

        totalLessons.textContent =
            aulas.length;

    }


    if (lessonsCount) {

        lessonsCount.textContent =
            `${aulas.length} ${
                aulas.length === 1
                    ? "aula"
                    : "aulas"
            }`;

    }


    /* =====================================
       NENHUMA AULA
       ===================================== */

    if (
        aulas.length === 0
    ) {

        mostrarEstadoVazio();


        if (nextLessonSummary) {

            nextLessonSummary.textContent =
                "Nenhuma";

        }


        return;
    }


    /* =====================================
       PRÓXIMA AULA
       ===================================== */

    if (nextLessonSummary) {

        nextLessonSummary.textContent =
            `${aulas[0].data} • ${aulas[0].horario}`;

    }


    /* =====================================
       LIMPAR LISTA
       ===================================== */

    if (lessonsList) {

        lessonsList.innerHTML =
            "";

    }


    /* =====================================
       CRIAR CARDS
       ===================================== */

    aulas.forEach(
        (aula) => {

            const card =
                criarCardAula(
                    aula
                );


            if (lessonsList) {

                lessonsList.appendChild(
                    card
                );

            }

        }
    );

}


/* =========================================
   LOGOUT
   ========================================= */

const logoutButton =
    document.getElementById(
        "lessons-logout"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function (event) {

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
   MENU MOBILE
   ========================================= */

const mobileMenu =
    document.getElementById(
        "lessons-mobile-menu"
    );


const sidebar =
    document.querySelector(
        ".lessons-sidebar"
    );


if (
    mobileMenu &&
    sidebar
) {

    mobileMenu.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );

}


/* =========================================
   FECHAR MENU AO CLICAR FORA
   ========================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            window.innerWidth > 640
            ||
            !sidebar
            ||
            !sidebar.classList.contains(
                "mobile-open"
            )
        ) {

            return;
        }


        const clicouSidebar =
            sidebar.contains(
                event.target
            );


        const clicouMenu =
            mobileMenu &&
            mobileMenu.contains(
                event.target
            );


        if (
            !clicouSidebar &&
            !clicouMenu
        ) {

            sidebar.classList.remove(
                "mobile-open"
            );

        }

    }
);


/* =========================================
   INICIAR
   ========================================= */

carregarAulas();