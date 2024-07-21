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
            itens();
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

    const itens = () => {
        const divItens = document.createElement('div');
        divItens.id = 'itens';
        document.querySelector('#dadosCirurgia').appendChild(divItens);

        const labelItens = document.createElement('h3');
        labelItens.innerText = 'Itens';
        document.querySelector('#itens').appendChild(labelItens);

        const itens = DBModule.itensPosCirurgia;

        itens.forEach(item => {
            const novoItem = document.createElement('div');
            novoItem.className = 'input-itens';
            novoItem.innerHTML = `
                <div class="box-input">
                    <label for="${item.item}" id="label-${item.item}">${item.item}</label>
                    <input type="checkbox" name="${item.item}" id="check-${item.item}">
                </div>
                <div class="box-input" id="box-quant-${item.item}">
                    <label for="${item.item}">Quantidade</label>
                    <input type="number" name="${item.item}" id="quant-${item.item}" min="0" value="1">
                </div>
                <div class="box-resultado" id="box-valor-${item.item}">
                    <label for="${item.item}">Valor</label>
                    <p name="${item.item}" id="valor-${item.item}"></p>
                </div>
            `;

            // const check = document.querySelector(`#check-${item.item}`);
            // check.addEventListener('click', () => {
            //     const quant = document.querySelector(`#quant-${item.item}`);
            //     const valor = document.querySelector(`#valor-${item.item}`);
            //     const valorTotal = document.querySelector(`#valor-${item.item}-total`);

            //     if (check.checked) {
            //         quant.value = 1;
            //         valor.innerText = formatarMoeda(item.preco);
            //         valorTotal.innerText = formatarMoeda(item.preco);
            //     } else {
            //         quant.value = 0;
            //         valor.innerText = formatarMoeda(0);
            //         valorTotal.innerText = formatarMoeda(0);
            //     }

            //     valorTotal.innerText = formatarMoeda(quant.value * item.preco);
            // });

            document.querySelector('#itens').appendChild(novoItem);
        });
    }

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
