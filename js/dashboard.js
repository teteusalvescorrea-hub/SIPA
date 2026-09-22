/* =========================================
   SIPA — DASHBOARD
   JAVASCRIPT DO PAINEL DO ALUNO
   ========================================= */

"use strict";


/* =========================================
   RECUPERAR ALUNO LOGADO
   ========================================= */

const alunoSalvo =
    sessionStorage.getItem("sipaAluno");

let alunoAtual = null;

if (alunoSalvo) {

    try {

        alunoAtual =
            JSON.parse(alunoSalvo);

    } catch (error) {

        console.error(
            "Erro ao carregar os dados do aluno:",
            error
        );

    }

}


/* =========================================
   PROTEGER O DASHBOARD
   ========================================= */

if (!alunoAtual) {

    window.location.href =
        "login.html";

}


/* =========================================
   ELEMENTOS DO DASHBOARD
   ========================================= */

const studentName =
    document.getElementById("student-name");

const headerStudentName =
    document.getElementById("header-student-name");

const studentInitial =
    document.getElementById("student-initial");

const studentCategory =
    document.getElementById("student-category");

const headerStudentCategory =
    document.getElementById("header-student-category");

const licenseCategory =
    document.getElementById("license-category");

const remainingLessons =
    document.getElementById("remaining-lessons");

const studentPackage =
    document.getElementById("student-package");

const progressPercent =
    document.getElementById("progress-percent");

const progressNumber =
    document.getElementById("progress-number");

const progressBar =
    document.getElementById("progress-bar");


/* =========================================
   CARREGAR DADOS DO ALUNO
   ========================================= */

function carregarDadosAluno() {

    if (!alunoAtual) {
        return;
    }


    /* NOME */

    if (studentName) {

        studentName.textContent =
            alunoAtual.nome.split(" ")[0];

    }


    if (headerStudentName) {

        headerStudentName.textContent =
            alunoAtual.nome;

    }


    /* INICIAL */

    if (studentInitial) {

        studentInitial.textContent =
            alunoAtual.nome
                .charAt(0)
                .toUpperCase();

    }


    /* CATEGORIA */

    if (studentCategory) {

        studentCategory.textContent =
            alunoAtual.categoria;

    }


    if (headerStudentCategory) {

        headerStudentCategory.textContent =
            `Categoria ${alunoAtual.categoria}`;

    }


    if (licenseCategory) {

        licenseCategory.textContent =
            `Categoria ${alunoAtual.categoria}`;

    }


    /* AULAS RESTANTES */

    if (remainingLessons) {

        remainingLessons.textContent =
            alunoAtual.aulasRestantes;

    }


    /* PACOTE */

    if (studentPackage) {

        studentPackage.textContent =
            alunoAtual.pacote;

    }


    /* PROGRESSO */

    const aulasRealizadas =
        alunoAtual.pacote -
        alunoAtual.aulasRestantes;

    const progresso =
        alunoAtual.pacote > 0
            ? Math.round(
                (aulasRealizadas /
                    alunoAtual.pacote) * 100
            )
            : 0;


    if (progressPercent) {

        progressPercent.textContent =
            `${progresso}%`;

    }


    if (progressNumber) {

        progressNumber.textContent =
            `${progresso}%`;

    }


    if (progressBar) {

        progressBar.style.width =
            `${progresso}%`;

    }

}


/* =========================================
   INICIALIZAR DASHBOARD
   ========================================= */

carregarDadosAluno();


/* =========================================
   LOGOUT
   ========================================= */

const logoutButton =
    document.getElementById("logout-button");


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        () => {

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

const mobileMenuButton =
    document.getElementById(
        "mobile-menu-button"
    );

const sidebar =
    document.querySelector(".sidebar");


if (
    mobileMenuButton &&
    sidebar
) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );

}


/* =========================================
   FECHAR MENU MOBILE
   AO CLICAR EM UM LINK
   ========================================= */

const sidebarLinks =
    document.querySelectorAll(
        ".sidebar-link"
    );


sidebarLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            if (
                window.innerWidth <= 640 &&
                sidebar
            ) {

                sidebar.classList.remove(
                    "mobile-open"
                );

            }

        }
    );

});


/* =========================================
   MENU DO DASHBOARD
   ========================================= */

sidebarLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            sidebarLinks.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );

                }
            );

            link.classList.add(
                "active"
            );

        }
    );

});


/* =========================================
   NOTIFICAÇÕES
   ========================================= */

const notificationButton =
    document.getElementById(
        "notification-button"
    );


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        () => {

            console.log(
                "Abrindo notificações..."
            );

        }
    );

}


/* =========================================
   AÇÕES RÁPIDAS
   ========================================= */

const quickActions =
    document.querySelectorAll(
        ".quick-action"
    );


quickActions.forEach((action) => {

    action.addEventListener(
        "click",
        () => {

            const actionType =
                action.dataset.action;

            console.log(
                "Ação selecionada:",
                actionType
            );

        }
    );

});


/* =========================================
   BOTÃO — VER DETALHES
   ========================================= */

const viewLessonButton =
    document.getElementById(
        "view-lesson-button"
    );


if (viewLessonButton) {

    viewLessonButton.addEventListener(
        "click",
        () => {

            console.log(
                "Abrindo detalhes da próxima aula..."
            );

        }
    );

}


/* =========================================
   BOTÃO — VER TODAS AS AULAS
   ========================================= */

const viewAllLessons =
    document.getElementById(
        "view-all-lessons"
    );


if (viewAllLessons) {

    viewAllLessons.addEventListener(
        "click",
        () => {

            console.log(
                "Abrindo todas as aulas..."
            );

        }
    );

}


/* =========================================
   FECHAR SIDEBAR AO CLICAR FORA
   NO CELULAR
   ========================================= */

document.addEventListener(
    "click",
    (event) => {

        if (
            window.innerWidth > 640 ||
            !sidebar ||
            !sidebar.classList.contains(
                "mobile-open"
            )
        ) {

            return;

        }


        const clickedInsideSidebar =
            sidebar.contains(event.target);

        const clickedMenuButton =
            mobileMenuButton &&
            mobileMenuButton.contains(
                event.target
            );


        if (
            !clickedInsideSidebar &&
            !clickedMenuButton
        ) {

            sidebar.classList.remove(
                "mobile-open"
            );

        }

    }
);


/* =========================================
   BUSCAR AGENDAMENTOS
   ========================================= */

function obterAgendamentosDashboard() {

    const dados =
        localStorage.getItem(
            "sipaAgendamentos"
        );


    if (!dados) {
        return [];
    }


    try {

        const agendamentos =
            JSON.parse(dados);

        return Array.isArray(agendamentos)
            ? agendamentos
            : [];

    } catch (error) {

        console.error(
            "Erro ao carregar agendamentos:",
            error
        );

        return [];

    }

}


/* =========================================
   BUSCAR ALUNO LOGADO
   ========================================= */

function obterAlunoDashboard() {

    const aluno =
        sessionStorage.getItem(
            "sipaAluno"
        );


    if (!aluno) {
        return null;
    }


    try {

        return JSON.parse(aluno);

    } catch (error) {

        console.error(
            "Erro ao carregar aluno:",
            error
        );

        return null;

    }

}


/* =========================================
   CONVERTER DATA
   ========================================= */

function converterDataDashboard(data) {

    if (!data) {
        return null;
    }


    const partes =
        data.split("-");


    if (partes.length !== 3) {
        return null;
    }


    return new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
    );

}


/* =========================================
   CRIAR DATA + HORA DA AULA
   ========================================= */

function criarDataHoraAula(agendamento) {

    if (
        !agendamento ||
        !agendamento.dataSistema ||
        !agendamento.horario
    ) {

        return null;

    }


    const partesData =
        agendamento.dataSistema.split("-");

    const partesHorario =
        agendamento.horario.split(":");


    if (
        partesData.length !== 3 ||
        partesHorario.length < 2
    ) {

        return null;

    }


    const ano =
        Number(partesData[0]);

    const mes =
        Number(partesData[1]) - 1;

    const dia =
        Number(partesData[2]);

    const hora =
        Number(partesHorario[0]);

    const minuto =
        Number(partesHorario[1]);


    const dataHora =
        new Date(
            ano,
            mes,
            dia,
            hora,
            minuto,
            0,
            0
        );


    if (
        Number.isNaN(
            dataHora.getTime()
        )
    ) {

        return null;

    }


    return dataHora;

}


/* =========================================
   BUSCAR PRÓXIMA AULA
   ========================================= */

function buscarProximaAula() {

    const aluno =
        obterAlunoDashboard();


    if (!aluno) {
        return null;
    }


    const agendamentos =
        obterAgendamentosDashboard();


    const agora =
        new Date();


    /* =====================================
       PEGAR SOMENTE AS AULAS DO ALUNO
       QUE AINDA NÃO ACONTECERAM
       ===================================== */

    const aulasFuturas =
        agendamentos.filter(
            (agendamento) => {

                /* ALUNO */

                if (
                    String(
                        agendamento.alunoCpf
                    ) !==
                    String(
                        aluno.cpf
                    )
                ) {

                    return false;

                }


                /* DATA E HORÁRIO */

                if (
                    !agendamento.dataSistema ||
                    !agendamento.horario
                ) {

                    return false;

                }


                /* CRIAR DATA COMPLETA */

                const dataHoraAula =
                    criarDataHoraAula(
                        agendamento
                    );


                if (!dataHoraAula) {

                    return false;

                }


                /* IGNORAR AULAS PASSADAS */

                return (
                    dataHoraAula >= agora
                );

            }
        );


    /* =====================================
       NENHUMA AULA FUTURA
       ===================================== */

    if (
        aulasFuturas.length === 0
    ) {

        return null;

    }


    /* =====================================
       ORDENAR DA MAIS PRÓXIMA
       PARA A MAIS DISTANTE
       ===================================== */

    aulasFuturas.sort(
        (a, b) => {

            const dataA =
                criarDataHoraAula(a);

            const dataB =
                criarDataHoraAula(b);


            return (
                dataA.getTime() -
                dataB.getTime()
            );

        }
    );


    return aulasFuturas[0];

}


/* =========================================
   ELEMENTOS DA PRÓXIMA AULA
   ========================================= */

const nextLessonDay =
    document.getElementById(
        "next-lesson-day"
    );


const nextLessonWeekday =
    document.getElementById(
        "next-lesson-weekday"
    );


const nextLessonMonth =
    document.getElementById(
        "next-lesson-month"
    );


const nextLessonTime =
    document.getElementById(
        "next-lesson-time"
    );


const nextLessonInstructor =
    document.getElementById(
        "next-lesson-instructor"
    );


const nextLessonVehicle =
    document.getElementById(
        "next-lesson-vehicle"
    );


const nextLessonCategory =
    document.getElementById(
        "next-lesson-category"
    );


/* =========================================
   LOCALIZAÇÃO DA PRÓXIMA AULA
   ========================================= */

const nextLessonLocation =
    document.querySelector(
        ".lesson-footer > span"
    );


/* =========================================
   NOMES DOS DIAS
   ========================================= */

const diasSemanaSipa = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
];


/* =========================================
   NOMES DOS MESES
   ========================================= */

const mesesSipa = [
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
   MOSTRAR PRÓXIMA AULA
   ========================================= */

function carregarProximaAula() {

    const aula =
        buscarProximaAula();


    /* =====================================
       NENHUMA AULA FUTURA
       ===================================== */

    if (!aula) {

        if (nextLessonDay) {

            nextLessonDay.textContent =
                "—";

        }


        if (nextLessonWeekday) {

            nextLessonWeekday.textContent =
                "Nenhuma aula agendada";

        }


        if (nextLessonMonth) {

            nextLessonMonth.textContent =
                "Agende sua próxima aula";

        }


        if (nextLessonTime) {

            nextLessonTime.textContent =
                "—";

        }


        if (nextLessonInstructor) {

            nextLessonInstructor.textContent =
                "—";

        }


        if (nextLessonVehicle) {

            nextLessonVehicle.textContent =
                "—";

        }


        if (nextLessonCategory) {

            nextLessonCategory.textContent =
                "—";

        }


        if (nextLessonLocation) {

            nextLessonLocation.textContent =
                "Unidade Centro";

        }


        return;

    }


    /* =====================================
       CONVERTER DATA
       ===================================== */

    const data =
        converterDataDashboard(
            aula.dataSistema
        );


    if (!data) {
        return;
    }


    /* =====================================
       DIA
       ===================================== */

    if (nextLessonDay) {

        nextLessonDay.textContent =
            String(
                data.getDate()
            ).padStart(2, "0");

    }


    /* =====================================
       DIA DA SEMANA
       ===================================== */

    if (nextLessonWeekday) {

        nextLessonWeekday.textContent =
            diasSemanaSipa[
                data.getDay()
            ];

    }


    /* =====================================
       MÊS E ANO
       ===================================== */

    if (nextLessonMonth) {

        nextLessonMonth.textContent =
            `${mesesSipa[data.getMonth()]} de ${data.getFullYear()}`;

    }


    /* =====================================
       HORÁRIO
       ===================================== */

    if (nextLessonTime) {

        nextLessonTime.textContent =
            aula.horario;

    }


    /* =====================================
       INSTRUTOR
       ===================================== */

    if (nextLessonInstructor) {

        nextLessonInstructor.textContent =
            aula.instrutor ||
            "—";

    }


    /* =====================================
       VEÍCULO
       ===================================== */

    if (nextLessonVehicle) {

        nextLessonVehicle.textContent =
            aula.veiculo ||
            "—";

    }


    /* =====================================
       CATEGORIA
       ===================================== */

    if (nextLessonCategory) {

        nextLessonCategory.textContent =
            aula.categoriaNome ||
            aula.categoria ||
            "—";

    }


    /* =====================================
       LOCALIZAÇÃO DA AULA
       ===================================== */

    if (nextLessonLocation) {

        if (
            aula.categoria === "B" ||
            aula.categoriaNome === "Carro"
        ) {

            nextLessonLocation.textContent =
                "🚗 Av. Carlos Lindenberg, 1500 — Centro, Vila Velha/ES";

        } else if (
            aula.categoria === "A" ||
            aula.categoriaNome === "Moto"
        ) {

            nextLessonLocation.textContent =
                "🏍️ Rua Professor Augusto, 320 — Centro, Vila Velha/ES";

        } else if (
            aula.categoria === "AB" ||
            aula.categoriaNome === "Carro + Moto"
        ) {

            nextLessonLocation.textContent =
                "🚗 Carro: Av. Carlos Lindenberg, 1500 — Centro, Vila Velha/ES | 🏍️ Moto: Rua Professor Augusto, 320 — Centro, Vila Velha/ES";

        } else {

            nextLessonLocation.textContent =
                "Unidade Centro";

        }

    }

}


/* =========================================
   EXECUTAR
   ========================================= */

carregarProximaAula();