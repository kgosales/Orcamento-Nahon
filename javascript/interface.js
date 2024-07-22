

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

const criarElemento = (tag, id, className, local) => {
    const elemento = document.createElement(tag);
    elemento.id = id;
    elemento.className = className;
    document.querySelector(local).appendChild(elemento);
    return elemento
}

// CIRUGIA ///////////////////////////////////////////////////////////////////////////////////

// Módulo de manipulação de cirurgias
// const CirurgiaModule = (() => {
//     const addCirurgia = () => {

//         if (!document.querySelector('#cirurgias')) {
//             criarElemento('div', 'cirurgias', null, '#dadosCirurgia');
//             itens();
//         }

//         const quantCirurgia = document.querySelectorAll('.cirurgia').length;
//         const novaCirurgiaId = `cirurgia-${quantCirurgia + 1}`;

//         const novaCirurgia = criarElemento('div', novaCirurgiaId, 'cirurgia', '#cirurgias');
//         novaCirurgia.innerHTML = `
//             <label for="select-${novaCirurgiaId}">Cirurgia</label>
//             <select id="select-${novaCirurgiaId}" name="select-${novaCirurgiaId}" onchange="CirurgiaModule.exibirValorCirurgia('${novaCirurgiaId}',parseInt(this.value))"></select>
//             <span class="valor-cirurgia" id="valor-${novaCirurgiaId}">${formatarMoeda(0)}</span>
//             <button type="button" class="btn btn-delete" id="btn-delete-${novaCirurgiaId}">X</button>
//         `;

//         montarSelect(`#select-${novaCirurgiaId}`, DBModule.cirurgias, "cirurgia", "id");
//         document.querySelector(`#btn-delete-${novaCirurgiaId}`).addEventListener('click', () => deleteCirurgia(novaCirurgiaId));
//     };

//     const exibirValorCirurgia = (idValor, idCirurgia) => {
//         const cirurgia = CirurgiaDataModule.obterCirurgia(idCirurgia);
//         inserirDados(`#valor-${idValor}`, formatarMoeda(cirurgia.avista));
//     };

//     const deleteCirurgia = (id) => {
//         const cirurgia = document.querySelector(`#${id}`);
//         cirurgia ? cirurgia.remove() : console.error(`Cirurgia com id ${id} não encontrada.`);
//     };

//     const itens = () => {

//         criarElemento('div', 'itens', null, '#dadosCirurgia');
//         criarElemento('h3', 'label-itens', null, '#itens');

//         const itens = DBModule.itensPosCirurgia;

//         itens.forEach(item => {

//             const novoItem = criarElemento('div', `item-${item.id}`, 'input-itens', '#itens');

//             novoItem.innerHTML = `
//                 <div class="box-input">
//                     <label for="check-${novoItem.id}" id="label-${novoItem.id}">${item.item}</label>
//                     <input type="checkbox" name="check-${novoItem.id}" id="check-${novoItem.id}" onchange="CirurgiaModule.ativarQuantidade('${novoItem.id}','${item.id}')">
//                 </div>
//                 <div class="box-input" id="box-quant-${novoItem.id}">
//                     <label for="quant-${novoItem.id}">Quantidade</label>
//                     <input type="number" name="quant-${novoItem.id}" id="quant-${novoItem.id}" min="0" disabled onchange="CirurgiaModule.calcularItens('${novoItem.id}','${item.id}')">
//                 </div>
//                 <div class="box-resultado" id="box-valor-${novoItem.id}">
//                     <span name="valor-${novoItem.id}" id="valor-${novoItem.id}">${formatarMoeda(0)}</span>
//                 </div>
//             `;
//         });

//         criarElemento('div', 'totalItens', null, '#dadosCirurgia');
//         criarElemento('h3', 'label-total', null, '#totalItens').innerText = 'Total dos Itens';
//         criarElemento('span', 'span-total', 'box-resultado', '#totalItens').innerText = formatarMoeda(0);
//     }

//     const ativarQuantidade = (idElemento, idItem) => {
//         const inputQuantidade = document.querySelector(`#quant-${idElemento}`);
//         inputQuantidade.disabled = !inputQuantidade.disabled;
//         inputQuantidade.value = inputQuantidade.disabled ? null : 1;
//         calcularItens(idElemento, idItem);
//     }

//     const calcularItens = (idElemento, idItem) => {
//         const item = DBModule.itensPosCirurgia.find(item => item.id === parseInt(idItem));
//         const quant = document.querySelector(`#quant-${idElemento}`).value;
//         inserirDados(`#valor-${idElemento}`, formatarMoeda(item.valor * quant));
//     }

//     return { addCirurgia, exibirValorCirurgia, deleteCirurgia, ativarQuantidade, calcularItens };
// })();

// FORMATAÇÕES

const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor);
};
