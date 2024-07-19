const DBModule = (() => {

    const formasPagamento = [
        { id: 1, forma: "Pix", taxa: 0.005 },
        { id: 2, forma: "Débito", taxa: 0.01 },
        { id: 3, forma: "Crédito", taxa: 0.0339 },
        { id: 4, forma: "x2", taxa: 0.0453 },
        { id: 5, forma: "x3", taxa: 0.0532 },
        { id: 6, forma: "x4", taxa: 0.0611 },
        { id: 7, forma: "x5", taxa: 0.0688 },
        { id: 8, forma: "x6", taxa: 0.0765 },
        { id: 9, forma: "x7", taxa: 0.0881 },
        { id: 10, forma: "x8", taxa: 0.0956 },
        { id: 11, forma: "x9", taxa: 0.1031 },
        { id: 12, forma: "x10", taxa: 0.1105 },
        { id: 13, forma: "x11", taxa: 0.1177 },
        { id: 14, forma: "x12", taxa: 0.1249 },
        { id: 15, forma: "x13", taxa: 0.1371 },
        { id: 16, forma: "x14", taxa: 0.1441 },
        { id: 17, forma: "x15", taxa: 0.1511 },
        { id: 18, forma: "x16", taxa: 0.158 },
        { id: 19, forma: "x17", taxa: 0.1648 },
        { id: 20, forma: "x18", taxa: 0.1716 },
    ];

    const itensPosCirurgia = [
        { id: 1, item: "Meias", valor: 140 },
        { id: 2, item: "Sutiãs", valor: 148 },
        { id: 3, item: "Cintas", valor: 399 },
        { id: 4, item: "Placa Unitária", valor: 93 },
        { id: 5, item: "Conjunto de Placas (Abdomen, Flacos e Dorso)", valor: 500 },
    ];

    const cirurgias = [
        {
            id: 1,
            cirurgia: "ABDOMINOPLASTIA LIPO EM FLANCOS E DORSO (DUPLO DECÚBITO)",
            tipo: "ABDOMINOPLASTIA",
            avista: 4050,
            tresVezes: 1417.5,
            seisVezes: 742.5,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
                {
                    id: 3,
                    quantidade: 2,
                },
                {
                    id: 5,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 2,
            cirurgia: "ABDOMINOPLASTIA LIPO EM FLANCOS",
            tipo: "ABDOMINOPLASTIA",
            avista: 3712,
            tresVezes: 1299.2,
            seisVezes: 680.53,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
                {
                    id: 3,
                    quantidade: 2,
                },
                {
                    id: 5,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 3,
            cirurgia: "BLEFAROPLASTIA",
            tipo: "",
            avista: 1970,
            tresVezes: 689.5,
            seisVezes: 361.17,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 4,
            cirurgia: "GINECOMASTIA",
            tipo: "",
            avista: 2088,
            tresVezes: 730.8,
            seisVezes: 382.8,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
                {
                    id: 3,
                    quantidade: 2,
                },
            ],
        },
        {
            id: 5,
            cirurgia: "IMPLANTE CAPILAR",
            tipo: "",
            avista: 3712,
            tresVezes: 1299.2,
            seisVezes: 680.53,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 6,
            cirurgia: "LIFTING BRAQUIAL OU COXA",
            tipo: "",
            avista: 3590,
            tresVezes: 1256.5,
            seisVezes: 658.17,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 7,
            cirurgia: "LIFTING FACE (EXCETO RINOPLASTIA)",
            tipo: "",
            avista: 3712,
            tresVezes: 1299.2,
            seisVezes: 680.53,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 8,
            cirurgia: "LIFTING GLUTEO",
            tipo: "",
            avista: 3620,
            tresVezes: 1267,
            seisVezes: 663.67,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 9,
            cirurgia: "LIPOASPIRAÇÃO",
            tipo: "",
            avista: 3250,
            tresVezes: 1137.5,
            seisVezes: 595.83,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
                {
                    id: 3,
                    quantidade: 2,
                },
                {
                    id: 5,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 10,
            cirurgia: "MAMOPLASTIA REDUTORA/MASTOPEXIA",
            tipo: "",
            avista: 3710,
            tresVezes: 1298.5,
            seisVezes: 680.17,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
                {
                    id: 2,
                    quantidade: 2,
                },
            ],
        },
        {
            id: 11,
            cirurgia: "MASTECTOMIA",
            tipo: "",
            avista: 2900,
            tresVezes: 1015,
            seisVezes: 531.67,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 12,
            cirurgia: "NINFOPLASTIA",
            tipo: "",
            avista: 2770,
            tresVezes: 969.5,
            seisVezes: 507.83,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 13,
            cirurgia: "OTOPLASTIA",
            tipo: "",
            avista: 2320,
            tresVezes: 812,
            seisVezes: 425.33,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 14,
            cirurgia: "PEELING",
            tipo: "",
            avista: 2080,
            tresVezes: 728,
            seisVezes: 381.33,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 15,
            cirurgia: "PRÓTESES OU TROCA",
            tipo: "",
            avista: 2320,
            tresVezes: 812,
            seisVezes: 425.33,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
                {
                    id: 2,
                    quantidade: 2,
                },
            ],
        },
        {
            id: 16,
            cirurgia: "RETIRADA PRÓTESE",
            tipo: "",
            avista: 2080,
            tresVezes: 728,
            seisVezes: 381.33,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 17,
            cirurgia: "RETOQUE CADA CICATRIZ/ FUSO DE PELE",
            tipo: "",
            avista: 1970,
            tresVezes: 689.5,
            seisVezes: 361.17,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 18,
            cirurgia: "RINOPLASTIA",
            tipo: "",
            avista: 2700,
            tresVezes: 945,
            seisVezes: 495,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
            ],
        },
        {
            id: 19,
            cirurgia: "PEQUENA CIRURGIA",
            tipo: "",
            avista: 1280,
            tresVezes: 448,
            seisVezes: 234.67,
            anestesia: 550,
            itensPosCirurgia: [
                {
                    id: 1,
                    quantidade: 1,
                },
            ],
        },
    ];

    return { formasPagamento, itensPosCirurgia, cirurgias };
})();