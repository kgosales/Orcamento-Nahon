import ItemManager from "./class.itens.js";

class CirurgiaManager {
    constructor() {
        this.cirurgias = [];
        this.DBCirurgias = DBModule.cirurgias;
    }

    obterCirurgia(idCirurgia) {

        if (!idCirurgia) {
            throw new Error("Cirurgia não encontrada para o ID fornecido.");
        }

        return this.DBCirurgias.find(cir => cir.id === idCirurgia);
    };

    addCirurgia() {

        if (!document.querySelector('#cirurgias')) {
            criarElemento('div', 'cirurgias', null, '#dadosCirurgia');
            ItemManager.itens();
        }

        const quantCirurgia = document.querySelectorAll('.cirurgia').length;
        const novaCirurgiaId = `cirurgia-${quantCirurgia + 1}`;

        const novaCirurgia = criarElemento('div', novaCirurgiaId, 'cirurgia', '#cirurgias');
        novaCirurgia.innerHTML = `
            <label for="select-${novaCirurgiaId}">Cirurgia</label>
            <select id="select-${novaCirurgiaId}" name="select-${novaCirurgiaId}"></select>
            <span class="valor-cirurgia" id="valor-${novaCirurgiaId}">${formatarMoeda(0)}</span>
            <button type="button" class="btn btn-delete" id="btn-delete-${novaCirurgiaId}">X</button>
        `;

        montarSelect(`#select-${novaCirurgiaId}`, DBModule.cirurgias, "cirurgia", "id");
    };

    exibirValorCirurgia(idValor, idCirurgia) {
        const cirurgia = this.obterCirurgia(idCirurgia);
        inserirDados(`#valor-${idValor}`, formatarMoeda(cirurgia.avista));
    };

    deletarCirurgia(id) {
        const cirurgia = document.querySelector(`#${id}`);
        cirurgia ? cirurgia.remove() : console.error(`Cirurgia com id ${id} não encontrada.`);
    };

    somarCirurgias(cirurgias) {
        if (!cirurgias || cirurgias.length === 0) {
            throw new Error("Nenhuma cirurgia encontrada ou array vazio.");
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
}

export default CirurgiaManager