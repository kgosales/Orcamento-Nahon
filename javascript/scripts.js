const obterDados = () => {
    const dados = {
        paciente: {},
        cirurgias: {
            adicionais: {
                anestesia: 500,
                horaExtra: 500,
            }
        },
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

    dados.cirurgias.somaCirurgias = CirurgiaDataModule.somarCirurgias(dados.cirurgias.cirurgias);
    dados.cirurgias.somaItensCirurgias = dados.cirurgias.cirurgias.reduce((acc, cir) => acc + cir.somaItens, 0);

    // EQUIPE
    dados.equipe.valor = parseFloat(
        document.querySelector("#valorEquipe")?.value || 0
    );
    dados.equipe.taxaPagamento = parseFloat(
        document.querySelector("#formaPagamento")?.value || 0
    );

    dados.equipe.valorTotal = calcularEquipe(dados.equipe.valor, dados.equipe.taxaPagamento);

    dados.valorTotal = dados.equipe.valorTotal + dados.cirurgias.valorTotal;

    return dados;
};

// Módulo de Dados de Cirurgias
const CirurgiaDataModule = (() => {
    const obterCirurgia = (idCirurgia) => {

        if (!idCirurgia) {
            throw new Error("Cirurgia não encontrada para o ID fornecido.");
        }

        return DBModule.cirurgias.find(cir => cir.id === idCirurgia);
    };

    // const somarCirurgias = (cirurgias) => {
    //     if (!cirurgias || cirurgias.length === 0) {
    //         throw new Error("Nenhuma cirurgia encontrada ou array vazio.");
    //     }

    //     const maiorNumero = Math.max(...cirurgias.map(cirurgia => cirurgia.avista));
    //     const somaDemaisElementos = cirurgias.reduce((total, cirurgia) => {
    //         if (cirurgia.avista !== maiorNumero) {
    //             return total + cirurgia.avista;
    //         }
    //         return total;
    //     }, 0);

    //     return maiorNumero + somaDemaisElementos / 2;
    // };

    const somarCirurgias = (cirurgias) => {
        if (!cirurgias || cirurgias.length === 0) {
            throw new Error("Nenhuma cirurgia encontrada ou array vazio.");
        }

        const maiorNumero = Math.max(...cirurgias);
        const somaDemaisElementos = cirurgias.reduce((total, valor) => total + valor - maiorNumero, 0);

        return maiorNumero + somaDemaisElementos / 2;
    };

    return { obterCirurgia, somarCirurgias };
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