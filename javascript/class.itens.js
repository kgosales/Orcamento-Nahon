class ItemManager {
    constructor() {
        this.itens = [];
        this.DBItens = DBModule.itensPosCirurgia;
    }

    static itens() {

        criarElemento('div', 'itens', null, '#dadosCirurgia');
        criarElemento('h3', 'label-itens', null, '#itens');

        // console.log(this.DBItens);

        const itens = DBModule.itensPosCirurgia;

        itens.forEach(item => {

            const novoItem = criarElemento('div', `item-${item.id}`, 'input-itens', '#itens');

            novoItem.innerHTML = `
                <div class="box-input">
                    <label for="check-${novoItem.id}" id="label-${novoItem.id}">${item.item}</label>
                    <input type="checkbox" name="check-${novoItem.id}" id="check-${novoItem.id}" onchange="CirurgiaModule.ativarQuantidade('${novoItem.id}','${item.id}')">
                </div>
                <div class="box-input" id="box-quant-${novoItem.id}">
                    <label for="quant-${novoItem.id}">Quantidade</label>
                    <input type="number" name="quant-${novoItem.id}" id="quant-${novoItem.id}" min="0" disabled onchange="CirurgiaModule.calcularItens('${novoItem.id}','${item.id}')">
                </div>
                <div class="box-resultado" id="box-valor-${novoItem.id}">
                    <span name="valor-${novoItem.id}" id="valor-${novoItem.id}">${formatarMoeda(0)}</span>
                </div>
            `;

            document.querySelector(`#check-${novoItem.id}`).addEventListener('change', (event) => {
                this.ativarQuantidade(event.target.id, item.id);
            })
        });

        criarElemento('div', 'totalItens', null, '#dadosCirurgia');
        criarElemento('h3', 'label-total', null, '#totalItens').innerText = 'Total dos Itens';
        criarElemento('span', 'span-total', 'box-resultado', '#totalItens').innerText = formatarMoeda(0);
    }

    ativarQuantidade(idElemento, idItem) {
        const inputQuantidade = document.querySelector(`#quant-${idElemento}`);
        inputQuantidade.disabled = !inputQuantidade.disabled;
        inputQuantidade.value = inputQuantidade.disabled ? null : 1;
        // calcularItens(idElemento, idItem);
    }

    calcularItens(idElemento, idItem) {
        const item = DBModule.itensPosCirurgia.find(item => item.id === parseInt(idItem));
        const quant = document.querySelector(`#quant-${idElemento}`).value;
        inserirDados(`#valor-${idElemento}`, formatarMoeda(item.valor * quant));
    }
}

export default ItemManager