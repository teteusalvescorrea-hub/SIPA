/* =========================================
   SIPA — MEU PROGRESSO
   ========================================= */

"use strict";



/* =========================================
   ELEMENTOS DA PÁGINA
   ========================================= */

const progressPercentage =
    document.getElementById(
        "progress-percentage"
    );


const progressMessage =
    document.getElementById(
        "progress-message"
    );


const completedLessons =
    document.getElementById(
        "completed-lessons"
    );


const remainingLessons =
    document.getElementById(
        "remaining-lessons"
    );


const packageLessons =
    document.getElementById(
        "package-lessons"
    );


const scheduledLessons =
    document.getElementById(
        "scheduled-lessons"
    );


const studentCategory =
    document.getElementById(
        "student-category"
    );


const progressBarPercentage =
    document.getElementById(
        "progress-bar-percentage"
    );


const progressFill =
    document.getElementById(
        "progress-fill"
    );


const progressCircle =
    document.getElementById(
        "progress-circle"
    );


const progressPackageLabel =
    document.getElementById(
        "progress-package-label"
    );


const logoutButton =
    document.getElementById(
        "progress-logout"
    );



/* =========================================
   BUSCAR ALUNO LOGADO
   ========================================= */

function obterAluno() {

    const alunoSalvo =
        sessionStorage.getItem(
            "sipaAluno"
        );


    /*
     * Se não existir aluno logado,
     * volta para o login.
     */

    if (!alunoSalvo) {

        window.location.href =
            "login.html";

        return null;

    }


    try {

        const alunoSessao =
            JSON.parse(
                alunoSalvo
            );


        let aluno =
            alunoSessao;



        /*
         * Buscar a versão mais atualizada
         * do aluno na base central.
         */

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



                /*
                 * Atualizar também a sessão.
                 */

                sessionStorage.setItem(
                    "sipaAluno",
                    JSON.stringify(
                        aluno
                    )
                );

            }

        }


        return aluno;


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


    /*
     * Se ainda não existir nenhum
     * agendamento, retorna lista vazia.
     */

    if (!dados) {

        return [];

    }


    try {

        const agendamentos =
            JSON.parse(
                dados
            );


        /*
         * Garante que o retorno seja
         * realmente uma lista.
         */

        if (
            Array.isArray(
                agendamentos
            )
        ) {

            return agendamentos;

        }


        return [];


    } catch (error) {

        console.error(
            "Erro ao carregar agendamentos:",
            error
        );


        return [];

    }

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


    /*
     * Filtra somente os agendamentos
     * pertencentes ao aluno logado.
     */

    return agendamentos.filter(
        (agendamento) => {

            return (
                String(
                    agendamento.alunoCpf
                ) ===
                String(
                    aluno.cpf
                )
            );

        }
    );

}



/* =========================================
   CONVERTER DATA DO AGENDAMENTO
   ========================================= */

function criarDataDaAula(aula) {

    if (
        !aula ||
        !aula.dataSistema ||
        !aula.horario
    ) {

        return null;

    }


    const data =
        new Date(
            `${aula.dataSistema}T${aula.horario}:00`
        );


    if (
        Number.isNaN(
            data.getTime()
        )
    ) {

        return null;

    }


    return data;

}



/* =========================================
   ATUALIZAR PROGRESSO
   ========================================= */

function carregarProgresso() {

    const aluno =
        obterAluno();


    if (!aluno) {

        return;

    }


    const aulas =
        buscarAulasDoAluno();



    /* =====================================
       DADOS DO PACOTE
       ===================================== */

    const pacote =
        Number(
            aluno.pacote
        ) || 0;


    const restantes =
        Number(
            aluno.aulasRestantes
        ) || 0;



    /* =====================================
       DATA ATUAL
       ===================================== */

    const agora =
        new Date();



    /* =====================================
       SEPARAR AULAS

       FUTURAS =
       AGENDADAS

       PASSADAS =
       REALIZADAS
       ===================================== */

    const aulasRealizadas =
        aulas.filter(
            (aula) => {

                const dataAula =
                    criarDataDaAula(
                        aula
                    );


                if (!dataAula) {

                    return false;

                }


                return (
                    dataAula <
                    agora
                );

            }
        );



    const aulasAgendadas =
        aulas.filter(
            (aula) => {

                const dataAula =
                    criarDataDaAula(
                        aula
                    );


                if (!dataAula) {

                    return false;

                }


                return (
                    dataAula >=
                    agora
                );

            }
        );



    const realizadas =
        aulasRealizadas.length;


    const agendadas =
        aulasAgendadas.length;



    /* =====================================
       CALCULAR PORCENTAGEM
       ===================================== */

    let percentual =
        0;


    if (pacote > 0) {

        percentual =
            Math.round(
                (
                    realizadas /
                    pacote
                ) * 100
            );

    }


    /*
     * Garantir que a porcentagem
     * fique entre 0 e 100.
     */

    percentual =
        Math.max(
            0,
            Math.min(
                100,
                percentual
            )
        );



    /* =====================================
       AULAS REALIZADAS
       ===================================== */

    if (completedLessons) {

        completedLessons.textContent =
            realizadas;

    }



    /* =====================================
       AULAS RESTANTES
       ===================================== */

    if (remainingLessons) {

        remainingLessons.textContent =
            restantes;

    }



    /* =====================================
       PACOTE CONTRATADO
       ===================================== */

    if (packageLessons) {

        packageLessons.textContent =
            pacote;

    }



    /* =====================================
       AULAS AGENDADAS
       ===================================== */

    if (scheduledLessons) {

        scheduledLessons.textContent =
            agendadas;

    }



    /* =====================================
       CATEGORIA
       ===================================== */

    if (studentCategory) {

        const categorias = {

            A: "A",

            B: "B",

            AB: "AB"

        };


        studentCategory.textContent =
            categorias[
                aluno.categoria
            ] || "-";

    }



    /* =====================================
       PORCENTAGEM DO CÍRCULO
       ===================================== */

    if (progressPercentage) {

        progressPercentage.textContent =
            `${percentual}%`;

    }



    /* =====================================
       PORCENTAGEM DA BARRA
       ===================================== */

    if (progressBarPercentage) {

        progressBarPercentage.textContent =
            `${percentual}%`;

    }



    /* =====================================
       PREENCHER BARRA
       ===================================== */

    if (progressFill) {

        progressFill.style.width =
            `${percentual}%`;

    }



    /* =====================================
       ATUALIZAR CÍRCULO
       ===================================== */

    if (progressCircle) {

        progressCircle.style.background =
            `conic-gradient(
                #247cff ${percentual}%,
                #122d57 ${percentual}%
            )`;

    }



    /* =====================================
       TEXTO DA LEGENDA
       ===================================== */

    if (progressPackageLabel) {

        progressPackageLabel.textContent =
            `${pacote} aulas`;

    }



    /* =====================================
       MENSAGEM DE PROGRESSO
       ===================================== */

    if (progressMessage) {


        if (percentual === 0) {

            progressMessage.textContent =
                "Continue avançando!";

        }


        else if (percentual < 25) {

            progressMessage.textContent =
                "Você está começando!";

        }


        else if (percentual < 50) {

            progressMessage.textContent =
                "Você está evoluindo!";

        }


        else if (percentual < 75) {

            progressMessage.textContent =
                "Você está na metade do caminho!";

        }


        else if (percentual < 100) {

            progressMessage.textContent =
                "Está quase lá!";

        }


        else {

            progressMessage.textContent =
                "Parabéns! Formação concluída!";

        }

    }



    /* =====================================
       CONSOLE
       ===================================== */

    console.log(
        "SIPA — Progresso do aluno:",
        {
            aluno: aluno.nome,
            cpf: aluno.cpf,
            categoria: aluno.categoria,
            pacote: pacote,
            realizadas: realizadas,
            agendadas: agendadas,
            restantes: restantes,
            percentual: percentual
        }
    );

}



/* =========================================
   LOGOUT
   ========================================= */

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

carregarProgresso();