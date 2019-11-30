// Inicializar matriz.
const inicializaMatriz = (tamanho) => {
  return new Array(tamanho).fill(null).map(() => new Array(tamanho).fill(0));
}

//Gera posicao leatoria para buscar ao redor da posicao atual
const gerarPosicao = (vlr) => {
  return Math.floor(Math.random() * vlr);
}

//Gera o labirinto
const gerarLabirinto = (tam=10) => {
  console.log(document.getElementById("inicio"));
  let labirinto = inicializaMatriz(tam);

  const tamLabirinto = labirinto.length;
  const inicioRow = gerarPosicao(tamLabirinto);
  const inicioCol = gerarPosicao(tamLabirinto);

  labirinto[inicioRow][inicioCol] = 2;
  
  let novoCaminhoRow = inicioRow;
  let novoCaminhoCol = inicioCol;

  // Usado para verificar os arredores da posição atual para verificar se a posição é valida
  const rowX = [0, 1, 0, -1];
  const colY = [1, 0, -1, 0];
  
  let acabouCaminhos = false;
  
  let posVerifica = gerarPosicao(4);

  const pilha = [];

  //Adiciona o valor do ponto de partida na pilha
  pilha.push({row: inicioRow, col: inicioCol});
  
  //Inicializa um aray de 4 posicoes preenchido com zeros
  let posAleatorio = Array(4).fill(0);


  //Usado para saber quando os valores da pilha deve ser usados
  let chamaPilhaFlag = false;
  
  //utilizado para saber qual vai ser a segunda posicao encontrada
  let tempNovoCaminhoRow = inicioRow;
  let tempNovoCaminhoCol = inicioCol;

//Verifica se a pilha ainda tem valores.
while(pilha.length > 0) {

  //Esolhe uma posicao aleatoria para buscar em volta da posicao atual
  while(posAleatorio.indexOf(0) != -1) {
  posVerifica = gerarPosicao(4);

  //Quando uma posicao e escolhida e setado como 1 para indicar que a posicao ja foi verificada
  if(posAleatorio[posVerifica] == 0) {
    posAleatorio[posVerifica] = 1;
  }

  // Gera primeiro passo
  if (novoCaminhoRow + rowX[posVerifica] >= 0 && novoCaminhoRow + rowX[posVerifica] < tamLabirinto 
  && novoCaminhoCol + colY[posVerifica] >= 0 && novoCaminhoCol + colY[posVerifica] < tamLabirinto 
  && labirinto[ novoCaminhoRow + rowX[posVerifica] ][ novoCaminhoCol + colY[posVerifica] ] == 0
  ) {
    
    tempNovoCaminhoRow = novoCaminhoRow + rowX[posVerifica];
    tempNovoCaminhoCol = novoCaminhoCol + colY[posVerifica];
    // break;

    //Gera segundo passo
    if (tempNovoCaminhoRow + rowX[posVerifica] >= 0 && tempNovoCaminhoRow + rowX[posVerifica] < tamLabirinto
    && tempNovoCaminhoCol + colY[posVerifica] >= 0 && tempNovoCaminhoCol + colY[posVerifica] < tamLabirinto
    && labirinto[ tempNovoCaminhoRow + rowX[posVerifica] ][ tempNovoCaminhoCol + colY[posVerifica] ] == 0
    ) {
      
      labirinto[ novoCaminhoRow + rowX[posVerifica] ][ novoCaminhoCol + colY[posVerifica] ] = 4;
      labirinto[ tempNovoCaminhoRow + rowX[posVerifica] ][ tempNovoCaminhoCol + colY[posVerifica] ] = 5;
      
      novoCaminhoRow = tempNovoCaminhoRow + rowX[posVerifica];
      novoCaminhoCol = tempNovoCaminhoCol + colY[posVerifica];

      //adiciona o valor da segunda posicao no topo da pilha
      pilha.unshift({row: novoCaminhoRow, col: novoCaminhoCol});

      //reseta o array de posicoes para que possa ser utilizado novamente
      posAleatorio = Array(4).fill(0);
      break;
    }
  }

  //Caso todas as posicoes tenham sido verificadas ativa a flag indicando que deve pegar o valor do topo da pilha
  if( posAleatorio.indexOf(0) == -1 ) {
    chamaPilhaFlag = true;
  }

}  


  if( pilha.length > 0 && chamaPilhaFlag ) {
    chamaPilhaFlag=false;

    //O valor do topo da pilha indica o local onde se deve verificar para tentar encontra um caminho
    novoCaminhoRow = pilha[0].row;
    novoCaminhoCol = pilha[0].col;

    console.log(pilha[0]);

    //Remove o valor do topo da pilha
    pilha.shift();

    //Reseta o valor das posicoes.
    posAleatorio = Array(4).fill(0);
  }
}

console.log(labirinto);
}
