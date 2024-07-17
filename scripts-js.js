const obterDados = () => {
    const dados = {
        paciente: {},
        cirurgias: {},
        equipe: {},
        valorTotal: 0,
    };

    // PACIENTE
    dados.paciente.nome = document.querySelector("#nome")?.value || "";
    dados.paciente.data = document.querySelector("#data")?.value || "";

    // CIRURGIAS
    dados.cirurgias.cirurgias = Array.from(
        document.querySelectorAll(".cirurgia select")
    ).map((select) => {
        const idCirurgia = parseInt(select.value);
        return CirurgiaDataModule.obterCirurgia(idCirurgia);
    });

    dados.cirurgias.somaCirurgias = dados.cirurgias.cirurgias.reduce((acc, cir) => acc + cir.avista, 0);
    dados.cirurgias.somaItensCirurgias = dados.cirurgias.cirurgias.reduce((acc, cir) => acc + cir.somaItens, 0);

    dados.cirurgias.adicionais = {
        anestesia: 500,
        horaExtra: 300,
    }

    dados.cirurgias.valorTotal = dados.cirurgias.somaCirurgias + dados.cirurgias.somaItensCirurgias + dados.cirurgias.adicionais.anestesia + dados.cirurgias.adicionais.horaExtra;

    // EQUIPE
    dados.equipe.valor = parseFloat(
        document.querySelector("#valorEquipe")?.value || 0
    );
    dados.equipe.taxaPagamento = parseFloat(
        document.querySelector("#formaPagamento")?.value || 0
    );
    dados.equipe.taxaAjustes = parseFloat(
        document.querySelector("#taxaAjustes")?.value || 0
    );

    dados.equipe.valorTotal = calcularEquipe(dados.equipe.valor, dados.equipe.taxaPagamento);

    dados.valorTotal = dados.equipe.valorTotal + dados.cirurgias.valorTotal;

    return dados;
};

// Módulo de Dados de Cirurgias
const CirurgiaDataModule = (() => {
    const obterCirurgia = (idCirurgia) => {
        const cirurgia = DBModule.cirurgias.find(cir => cir.id === idCirurgia);

        if (!cirurgia) {
            console.error(`Cirurgia com id ${idCirurgia} não encontrada.`);
            return null;
        }

        const itensPosCirurgia = obterItensCirurgicos(cirurgia.itensPosCirurgia);
        const somaItens = itensPosCirurgia.reduce((total, item) => total + (item.valor * item.quantidade), 0);
        const somaCirurgia = cirurgia.avista + somaItens;

        return { ...cirurgia, itensPosCirurgia, somaItens, somaCirurgia };
    };

    const obterItensCirurgicos = (itens) => {
        return itens.map(item => {
            const query = DBModule.itensPosCirurgia.find(itensPos => itensPos.id === item.id);

            if (!query) {
                console.error(`Item pós-cirúrgico com id ${item.id} não encontrado.`);
                return null;
            }

            return {
                id: query.id,
                item: query.item,
                valor: query.valor,
                quantidade: item.quantidade,
            };
        }).filter(item => item !== null); // Filtra itens não encontrados
    };

    return { obterCirurgia, obterItensCirurgicos };
})();

const valorReal = (valorEquipe, taxa) => {
    return valorEquipe * (1 + taxa);
};

const valorMarcele = (valorEquipe, taxa) => {
    return (valorEquipe * 100) / (100 - taxa * 100);
};

const valorArredondado = (valor) => {
    const unidade = Math.floor(valor % 10); // Obtém a unidade do número

    if (unidade < 5) {
        return Math.floor(valor / 10) * 10; // Arredonda para baixo
    } else {
        return Math.ceil(valor / 10) * 10; // Arredonda para cima
    }
};

const calcularEquipe = (valor, taxa) => {

    let real = valorReal(valor, taxa);
    let marcele = valorMarcele(valor, taxa);
    let arredondado = valorArredondado(marcele);

    if (valor > 0 && taxa != 0) {
        inserirDados("#valorReal", formatarMoeda(real));
        inserirDados("#valorMarcele", formatarMoeda(marcele));
        inserirDados("#totalEquipe", formatarMoeda(arredondado));
    }

    return arredondado;
};

const calcularTotal = () => {
    const dados = obterDados();
    inserirDados("#resultado-total", formatarMoeda(dados.valorTotal));
}