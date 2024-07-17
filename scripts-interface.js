// GERAL

const montarSelect = (idSelect, optionsList, optionsValue, optionsText) => {
    const select = document.querySelector(idSelect);

    // Adiciona uma opção em branco no início
    const blankOption = new Option('- Selecione -', '');
    select.add(blankOption);

    // Adiciona as novas opções
    optionsList.forEach(optionData => {
        const option = new Option(optionData[optionsText], optionData[optionsValue]);
        select.add(option);
    });
};

const inserirDados = (idElemento, dados) => {
    const elemento = document.querySelector(idElemento);
    elemento.innerText = dados;
};

// CIRUGIA

// Módulo de manipulação de cirurgias
const CirurgiaModule = (() => {
    const addCirurgia = () => {
        const quantCirurgia = document.querySelectorAll('.cirurgia').length;
        const novaCirurgiaId = `cirurgia-${quantCirurgia + 1}`;

        const novaCirurgia = document.createElement('div');
        novaCirurgia.className = 'cirurgia';
        novaCirurgia.id = novaCirurgiaId;
        novaCirurgia.innerHTML = `
            <div class="input-cirurgia">
                <label for="select-${novaCirurgiaId}">Cirurgia</label>
                <select id="select-${novaCirurgiaId}" name="select-${novaCirurgiaId}"></select>
                <span class="btn-detalhes" id="btn-detalhes-${novaCirurgiaId}">+ Detalhes ⬇️</span>
                <span class="btn-delete" id="btn-delete-${novaCirurgiaId}">X</span>
            </div>
            <div class="detalhes-cirurgia" id="detalhes-${novaCirurgiaId}"></div>
        `;

        document.querySelector('#cirurgias').appendChild(novaCirurgia);
        montarSelect(`#select-${novaCirurgiaId}`, DBModule.cirurgias, "id", "cirurgia");

        document.querySelector(`#select-${novaCirurgiaId}`).addEventListener('change', () => atualizarDetalhesSeAberto(novaCirurgiaId));
        document.querySelector(`#btn-detalhes-${novaCirurgiaId}`).addEventListener('click', () => toggleDetalhesCirurgia(novaCirurgiaId));
        document.querySelector(`#btn-delete-${novaCirurgiaId}`).addEventListener('click', () => deleteCirurgia(novaCirurgiaId));
    };

    const atualizarDetalhesSeAberto = (id) => {
        const detalhes = document.querySelector(`#detalhes-${id}`);
        if (detalhes.classList.contains('active')) {
            DetalhesModule.detalhesCirurgia(id);
        }
    };

    const toggleDetalhesCirurgia = (id) => {
        const detalhes = document.querySelector(`#detalhes-${id}`);
        const btnDetalhes = document.querySelector(`#btn-detalhes-${id}`);

        if (detalhes) {
            const isActive = detalhes.classList.toggle('active');
            btnDetalhes.innerHTML = isActive ? '- Detalhes ⬆️' : '+ Detalhes ⬇️';
            if (isActive) {
                DetalhesModule.detalhesCirurgia(id);
            } else {
                detalhes.innerHTML = '';
            }
        } else {
            console.error(`Detalhes da cirurgia com id ${id} não encontrados.`);
        }
    };

    const deleteCirurgia = (id) => {
        const cirurgia = document.querySelector(`#${id}`);
        cirurgia ? cirurgia.remove() : console.error(`Cirurgia com id ${id} não encontrada.`);
    };

    return { addCirurgia, atualizarDetalhesSeAberto, toggleDetalhesCirurgia, deleteCirurgia };
})();

// Módulo de renderização de detalhes
const DetalhesModule = (() => {
    const detalhesCirurgia = (idDetalheCirurgia) => {
        const detalhesContainer = document.querySelector(`#detalhes-${idDetalheCirurgia}`);
        detalhesContainer.innerHTML = '';

        const select = parseInt(document.querySelector(`#select-${idDetalheCirurgia}`).value);
        const cirurgia = CirurgiaDataModule.obterCirurgia(select);

        renderizarTabelaDetalhes(detalhesContainer, cirurgia);
    };

    const renderizarTabelaDetalhes = (container, cirurgia) => {
        container.innerHTML = `
            <div class="detalhes-valor">
                <table class="tabela-detalhes-valor">
                    <tr><th colspan="4">Valores</th></tr>
                    <tr><td><b>À Vista:</b></td><td>${formatarMoeda(cirurgia.avista)}</td></tr>
                    <tr><td class="sub-title-table" colspan="4"><b>3 Vezes</b></td></tr>
                    <tr><td><b>Valor da Parcela: </b>${formatarMoeda(cirurgia.tresVezes)}</td><td><b>Total: </b>${formatarMoeda(cirurgia.tresVezes * 3)}</td></tr>
                    <tr><td class="sub-title-table" colspan="4"><b>6 Vezes</b></td></tr>
                    <tr><td><b>Valor da Parcela: </b>${formatarMoeda(cirurgia.seisVezes)}</td><td><b>Total: </b>${formatarMoeda(cirurgia.seisVezes * 6)}</td></tr>
                </table>
                <table class="tabela-detalhes-itens" id="detalhes-itens-${container.id}">
                    <thead>
                        <tr><th colspan="4">Itens Pós-Cirúrgicos</th></tr>
                        <tr><th class="sub-title-table">Item</th><th class="sub-title-table">Quant.</th><th class="sub-title-table">Valor Unitário</th><th class="sub-title-table">Valor Total</th></tr>
                    </thead>
                    <tbody>
                        ${cirurgia.itensPosCirurgia.map(item => `
                            <tr>
                                <td>${item.item}</td>
                                <td class="td-center">${item.quantidade}</td>
                                <td class="td-center">${formatarMoeda(item.valor)}</td>
                                <td class="td-center">${formatarMoeda(item.quantidade * item.valor)}</td>
                            </tr>
                        `).join('')}
                        <tr>
                            <td colspan="3"><b>Total:</b></td>
                            <td class="td-center">${formatarMoeda(cirurgia.somaItens)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><b>Total da Cirurgia: </b>${formatarMoeda(cirurgia.somaCirurgia)}</p>
        `;
    };

    return { detalhesCirurgia };
})();

// Inicialização
document.querySelector('#add-cirurgia-btn').addEventListener('click', CirurgiaModule.addCirurgia);

const exibirValorCirurgia = (idValor, idCirurgia) => {
    const cirurgia = obterCirurgia(parseInt(idCirurgia));
    inserirDados(idValor, formatarMoeda(cirurgia.avista));
};

// FORMATAÇÕES

const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor);
};
