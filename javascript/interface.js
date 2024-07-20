// GERAL //////////////////////////////////////////////////////////////////////////////////

const montarSelect = (idSelect, optionsList, optionsText, optionsValue) => {
    const select = document.querySelector(idSelect);

    // Adiciona uma opção em branco no início
    select.add(new Option('-- Selecione --', ''));

    // Adiciona as novas opções
    optionsList.forEach(optionData => {
        const { [optionsText]: text, [optionsValue]: value, } = optionData;
        select.add(new Option(text, value));
    });
};

const inserirDados = (idElemento, dados) => {
    const elemento = document.querySelector(idElemento);
    elemento.innerText = dados;
};

// CIRUGIA ///////////////////////////////////////////////////////////////////////////////////

// Módulo de manipulação de cirurgias
const CirurgiaModule = (() => {
    const addCirurgia = () => {

        if (!document.querySelector('#cirurgias')) {
            const divCirurgias = document.createElement('div');
            divCirurgias.id = 'cirurgias';
            document.querySelector('#dadosCirurgia').appendChild(divCirurgias);
        }

        const quantCirurgia = document.querySelectorAll('.cirurgia').length;
        const novaCirurgiaId = `cirurgia-${quantCirurgia + 1}`;

        const novaCirurgia = document.createElement('div');
        novaCirurgia.className = 'cirurgia';
        novaCirurgia.id = novaCirurgiaId;
        novaCirurgia.innerHTML = `
                <label for="select-${novaCirurgiaId}">Cirurgia</label>
                <select id="select-${novaCirurgiaId}" name="select-${novaCirurgiaId}" onchange="CirurgiaModule.exibirValorCirurgia('${novaCirurgiaId}',parseInt(this.value))"></select>
                <span class="valor-cirurgia" id="valor-${novaCirurgiaId}">${formatarMoeda(0)}</span>
                <button type="button" class="btn btn-delete" id="btn-delete-${novaCirurgiaId}">X</button>
        `;

        document.querySelector('#cirurgias').appendChild(novaCirurgia);
        montarSelect(`#select-${novaCirurgiaId}`, DBModule.cirurgias, "cirurgia", "id");
        document.querySelector(`#btn-delete-${novaCirurgiaId}`).addEventListener('click', () => deleteCirurgia(novaCirurgiaId));
    };

    const exibirValorCirurgia = (idValor, idCirurgia) => {
        const cirurgia = CirurgiaDataModule.obterCirurgia(idCirurgia);
        inserirDados(`#valor-${idValor}`, formatarMoeda(cirurgia.avista));
    };
    
    const deleteCirurgia = (id) => {
        const cirurgia = document.querySelector(`#${id}`);
        cirurgia ? cirurgia.remove() : console.error(`Cirurgia com id ${id} não encontrada.`);
    };

    return { addCirurgia, exibirValorCirurgia, deleteCirurgia };
})();

// FORMATAÇÕES

const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor);
};
