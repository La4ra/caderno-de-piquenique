export const receitasIniciais = [
  {
    id: 1,
    titulo: "Bolo de Fubá Cremoso com Goiabada",
    criador: "Laura (Fundadora)",
    tipoCriador: "Oficial",
    categoria: "Bolos & Tortas",
    tempoPreparo: "45 min",
    ingredientes: "3 ovos, 2 xícaras de leite, 1 xícara de fubá, 1 xícara de açúcar, 50g de queijo ralado, 1 colher de fermento e cubos de goiabada.",
    modoPreparo: "Bata todos os ingredientes líquidos no liquidificador, adicione o fubá e o fermento. Despeje em forma untada, coloque os cubos de goiabada passados na farinha e asse a 180°C por 40 minutos.",
    temAula: true,
    salva: true,
    republicada: false,
    imagem: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    titulo: "Focaccia de Alecrim e Tomate Confit",
    criador: "Chef Mateus (Criador Parceiro)",
    tipoCriador: "Parceiro",
    categoria: "Pães & Salgados",
    tempoPreparo: "2h 10min",
    ingredientes: "500g de farinha de trigo, 350ml de água morna, 10g de fermento biológico seco, azeite extra virgem, sal grosso, alecrim fresco e tomates cereja.",
    modoPreparo: "Misture a farinha, água e fermento até formar massa pegajosa. Deixe descansar 1h30, abra na assadeira com bastante azeite, faça furinhos com os dedos, decore e asse a 220°C por 25 minutos.",
    temAula: true,
    salva: false,
    republicada: true,
    imagem: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    titulo: "Limonada Rosa com Hortelã do Jardim",
    criador: "Laura (Fundadora)",
    tipoCriador: "Oficial",
    categoria: "Bebidas",
    tempoPreparo: "10 min",
    ingredientes: "4 limões tahiti, 100ml de suco de framboesa ou morango coado, 1 litro de água gelada, folhas de hortelã e gelo a gosto.",
    modoPreparo: "Esprema os limões na hora para não amargar, misture com o suco vermelho e a água gelada. Sirva em jarra de vidro com bastante gelo e ramos de hortelã.",
    temAula: false,
    salva: true,
    republicada: false,
    imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
  }
];

export const adendosIniciais = [
  {
    id: 101,
    receitaId: 1,
    autor: "Camila (Assinante)",
    mencaoReceita: "Bolo de Fubá Cremoso com Goiabada",
    texto: "Adendo: passar os cubos de goiabada no fubá em vez da farinha de trigo também impede que eles afundem na massa!"
  },
  {
    id: 102,
    receitaId: 2,
    autor: "Rafael (Assinante)",
    mencaoReceita: "Focaccia de Alecrim e Tomate Confit",
    texto: "Fiz para o piquenique de domingo e adicionei azeitonas pretas sem caroço por cima. Ficou incrível!"
  }
];