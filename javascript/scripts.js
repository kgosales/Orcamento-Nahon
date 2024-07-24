const montarOrcamento = () => {
    const orcamento = {
        paciente: {
            nome: document.querySelector("#nome")?.value || "",
            data: document.querySelector("#data")?.value || "",
        },
        cirurgias: {
            cirurgias: CirurgiaModule.extrairCirurgias(),
            itens: ItensModule.extrairItens(),
            sessoesFisioterapia: FisioterapiaModule.extrairSessoes(),
            adicionais: {
                anestesia: 550,
                horaExtra: 520,
            },
            totalCirurgias: 0,
        },
        equipe: EquipeModule.extrairEquipe(),
        valorTotal: 0
    };

    orcamento.cirurgias.totalCirurgias = orcamento.cirurgias.cirurgias.cirurgiaSoma + orcamento.cirurgias.itens.itemSoma + orcamento.cirurgias.adicionais.anestesia + orcamento.cirurgias.adicionais.horaExtra;

    orcamento.valorTotal = orcamento.cirurgias.totalCirurgias + orcamento.equipe.arredondado;

    return orcamento;
};

// GERAL ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const montarSelect = (idSelect, optionsList, optionsText, optionsValue) => {
    const select = document.querySelector(idSelect);

    // Adiciona uma opção em branco no início
    select.add(new Option("-- Selecione --", " "));

    // Adiciona as novas opções
    optionsList.forEach((optionData) => {
        const { [optionsText]: text, [optionsValue]: value } = optionData;
        select.add(new Option(text, value));
    });
};

const criarElemento = (tag, { id, className, text, local }) => {
    const elemento = document.createElement(tag);

    id && (elemento.id = id);
    className && (elemento.className = className);
    text && (elemento.innerText = text);
    local && document.querySelector(local).appendChild(elemento);

    return elemento;
}

const inserirDados = (idElemento, dados) => {
    const elemento = document.querySelector(idElemento);
    elemento.innerText = dados;
};

const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor);
};

const calcularTotal = () => {
   
}

// CIRUGIA //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const CirurgiaModule = (() => {
    const addCirurgia = () => {

        if (!document.querySelector("#cirurgias")) {
            const headerCirurgia = document.querySelector("#header_cirurgia");
            const cirurgia = criarElemento("div", { id: "cirurgias" });
            headerCirurgia.insertAdjacentElement("afterend", cirurgia);
        }

        const quantCirurgia = document.querySelectorAll(".cirurgia").length;
        const novaCirurgiaId = `cirurgia-${quantCirurgia + 1}`;

        const novaCirurgia = criarElemento("div", { id: novaCirurgiaId, className: "cirurgia", local: "#cirurgias" });
        novaCirurgia.innerHTML = `
            <label for="select-${novaCirurgiaId}">Cirurgia</label>
            <select id="select-${novaCirurgiaId}" name="select-${novaCirurgiaId}" onchange="CirurgiaModule.exibirValorCirurgia('${novaCirurgiaId}',parseInt(this.value))"></select>
            <span class="valor-cirurgia" id="valor-${novaCirurgiaId}">${formatarMoeda(0)}</span>
            <button type="button" class="btn btn-delete" id="btn-delete-${novaCirurgiaId}">X</button>
        `;

        montarSelect(`#select-${novaCirurgiaId}`, DBModule.cirurgias, "cirurgia", "id");

        document
            .querySelector(`#btn-delete-${novaCirurgiaId}`)
            .addEventListener("click", () => deleteCirurgia(novaCirurgiaId));
    };

    const exibirValorCirurgia = (idValor, idCirurgia) => {
        const cirurgia = obterCirurgia(idCirurgia);
        inserirDados(`#valor-${idValor}`, formatarMoeda(cirurgia.avista));
    };

    const deleteCirurgia = (id) => {
        const cirurgia = document.querySelector(`#${id}`);
        cirurgia
            ? cirurgia.remove()
            : console.error(`Cirurgia com id ${id} não encontrada.`);
    };

    const obterCirurgia = (idCirurgia) => {

        if (!idCirurgia) {
            throw new Error("Cirurgia não encontrada para o ID fornecido.");
        }

        return DBModule.cirurgias.find(cir => cir.id === idCirurgia);
    };

    const somarCirurgias = (cirurgias) => {
        if (!cirurgias || cirurgias.length === 0) {
            // throw new Error("Nenhuma cirurgia encontrada ou array vazio.");
            return 0;
        }

        // Encontra o maior valor de avista
        const maiorNumero = Math.max(...cirurgias.map(cirurgia => cirurgia.avista));

        // Calcula a soma dos demais elementos (exceto o maior valor)
        const somaDemaisElementos = cirurgias
            .filter(cirurgia => cirurgia.avista !== maiorNumero)
            .reduce((total, cirurgia) => total + cirurgia.avista, 0);

        // Retorna a média ponderada
        return maiorNumero + somaDemaisElementos / 2;
    };

    const extrairCirurgias = () => {
        const cirurgiasHTML = document.querySelectorAll(".cirurgia");

        const cirurgias = Array.from(cirurgiasHTML).map((cirurgia) => {
            const idCirurgia = parseInt(cirurgia.querySelector("select").value);
            return obterCirurgia(idCirurgia)
        });

        const cirurgiaSoma = somarCirurgias(cirurgias);

        return { cirurgias, cirurgiaSoma };
    };

    return {
        addCirurgia,
        exibirValorCirurgia,
        deleteCirurgia,
        extrairCirurgias
    };
})();

// ITENS PÓS CIRURGICOS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ItensModule = (() => {
    const dbItens = DBModule.itensPosCirurgia;

    const rederizarItens = () => {

        criarElemento("div", { id: "sessao-itens", local: "#container-extras" });
        criarElemento("h3", { text: "Itens", local: "#sessao-itens" });
        criarElemento("div", { id: "container-itens", local: "#sessao-itens" });

        dbItens.forEach((item) => {
            criarElemento("div", { id: `item-${item.id}`, className: "item", local: "#container-itens", })
                .innerHTML = `
                <div class="box-input box-item-check">
                    <input type="checkbox" name="itens" id="itens-${item.id}" onchange="ItensModule.habilitarQuantidade('${item.id}')">
                    <label for="itens-${item.id}">${item.item}</label>
                </div>
                <div class="box-input">
                    <label for="quant-${item.id}">Quantidade</label>
                    <input type="number" name="quant-${item.id}" id="quant-${item.id}" min="0" onchange="ItensModule.atualizarValorItem('${item.id}')" disabled>
                </div>
                <div class="box-resultado box-item-valor" id="box-valor-${item.id}">
                    <span name="valor-${item.id}" class="valor-item" id="item-valor-${item.id}">${formatarMoeda(0)}</span>
                </div>
            `
        });
    };

    const habilitarQuantidade = (idElemento) => {
        const inputQuantidade = document.querySelector(`#quant-${idElemento}`);
        inputQuantidade.disabled = !inputQuantidade.disabled;
        inputQuantidade.value = inputQuantidade.disabled ? null : 1;
        ItensModule.atualizarValorItem(idElemento);
    };

    const atualizarValorItem = (idItem) => {
        const item = dbItens.find((item) => item.id === parseInt(idItem));
        const quant = document.querySelector(`#quant-${idItem}`).value;
        inserirDados(`#item-valor-${idItem}`, formatarMoeda(item.valor * quant));
    };

    const somarItens = (itens) => {
        if (!itens || itens.length === 0) {
            return 0;
        }
        return itens.reduce((total, item) => total + item.quant * item.valor, 0);
    };

    const extrairItens = () => {

        const itens = [];
        const itensDOM = document.querySelectorAll(".item");

        itensDOM.forEach((item, index) => {

            if (item.querySelector('input[type="checkbox"]').checked) {

                dbItens.find((dbItem) => {
                    if (dbItem.id === index + 1) {
                        itens.push({
                            item: dbItem.item,
                            quant: parseInt(item.querySelector('input[type="number"]').value),
                            valor: parseFloat(dbItem.valor),
                        });
                    }
                });
            }
        });

        const itemSoma = somarItens(itens);
        return { itens, itemSoma };
    };

    rederizarItens();

    return { extrairItens, habilitarQuantidade, atualizarValorItem };
})();

// QUANTIDADE DE SESSÕES DE FISIOTERAPIA /////////////////////////////////////////////////////////////////////////////////////////////////

const FisioterapiaModule = (() => {

    const idInputSessao = "input-sessao-fisioterapia";

    const rederizarSessoesDeFisioterapia = () => {

        const sessao = criarElemento("div", { id: "sessao-fisioterapia", local: "#container-extras" });

        sessao.innerHTML = `
            <h3>Sessões de Fisioterapia</h3>
            <div class="box-input">
                <label for="sessao-fisioterapia">Quantidade de Sessões de Fisioterapia</label>
                <input type="number" name="sessao-fisioterapia" id="${idInputSessao}" min="0">
            </div>
        `;
    };

    const extrairSessoes = () => {
        const sessoes = parseInt(document.querySelector(`#${idInputSessao}`).value);
        return !isNaN(sessoes) ? sessoes : 0;
    };

    rederizarSessoesDeFisioterapia();

    return { extrairSessoes, };
})();

// EQUIPE E DINÂMICA DE FORMA DE PAGAMENTO ///////////////////////////////////////////////////////////////////////////////////////////////

const EquipeModule = (() => {
    const calcularEquipe = (valorDaEquipe, taxaJuros) => {
        const real = valorDaEquipe * (1 + taxaJuros);
        const nahon = (valorDaEquipe * 100) / (100 - taxaJuros * 100);
        const arredondado = valorArredondado(nahon);
        return { real, nahon, arredondado };
    };

    const valorArredondado = (valor) => {
        const unidade = Math.floor(valor % 10);
        return unidade < 5 ? Math.floor(valor / 10) * 10 : Math.ceil(valor / 10) * 10;
    };

    const extrairEquipe = () => {
        const valorDaEquipe = parseFloat(document.querySelector("#valorEquipe")?.value || 0);
        const taxaJuros = parseFloat(document.querySelector("#formaPagamento")?.value || 0);
        const resultado = calcularEquipe(valorDaEquipe, taxaJuros);

        const equipe = {
            valorDaEquipe,
            taxaJuros,
            real: resultado.real,
            nahon: resultado.nahon,
            arredondado: resultado.arredondado
        };

        return equipe;
    };

    const atualizarCamposEquipe = () => {
        const equipe = extrairEquipe();

        const valores = [
            { id: "#valorReal", valor: equipe.real },
            { id: "#valorNahon", valor: equipe.nahon },
            { id: "#totalEquipe", valor: equipe.arredondado }
        ];

        valores.forEach(({ id, valor }) => {
            inserirDados(id, formatarMoeda(valor && valor > 0 && equipe.taxaJuros !== 0 ? valor : 0));
        });
    };

    return { atualizarCamposEquipe, extrairEquipe };
})();
