
const inicializaVisitado = (tam) => {
    return new Array(tam).fill(null).map(() => new Array(tam).fill(0));
}

const testePegaPosicaoTabela = (grafo) => {
  const grafoAqui = grafo();
    console.log(grafoAqui)
    const tabela = document.getElementById("inicio").getElementsByTagName("tr");
    for(let lin = 0; lin < tabela.getElementsByTagName("tr").length; lin++) {
        for(let col = 0; col < tabela.getElementsByTagName("tr")[lin].getElementsByTagName("td").length; col++) {
          
          tabela.getElementsByTagName("tr")[lin].getElementsByTagName("td")[col].innerHTML = grafoAqui[lin][col]
          if(grafoAqui[lin][col] === 0) {
            tabela.getElementsByTagName("tr")[lin].getElementsByTagName("td")[col].style.backgroundColor = "green";
          }
          if(grafoAqui[lin][col] === 1) {
            tabela.getElementsByTagName("tr")[lin].getElementsByTagName("td")[col].style.backgroundColor = "red";
          }
          if(grafoAqui[lin][col] === 2) {
            tabela.getElementsByTagName("tr")[lin].getElementsByTagName("td")[col].style.backgroundColor = "blue";
          }
          if(grafoAqui[lin][col] === 3) {
            tabela.getElementsByTagName("tr")[lin].getElementsByTagName("td")[col].style.backgroundColor = "yellow";
          }
          
            console.log(tabela.getElementsByTagName("tr")[lin].getElementsByTagName("td")[col]);
        }
    }
}

const exemploGrafo = () => {
  return [
    [2,	0,	1,	0,	3],
    [1,	0,	0,	1,	0],
    [0,	0,	1,	0,	0],
    [1,	0,	1,	0,	1],
    [0,	0,	0,	0,	0]
  ];
}

const BFS = (inicio, grafoLabirinto) => {
    let {row, col} = inicio;
    const tamanhoLabinrinto = grafoLabirinto.length;
    const fila = [];
    const visitado = inicializaVisitado(tamanhoLabinrinto);
    const grafoUsado = grafoLabirinto;
    console.log(grafoUsado);
    
    const rowLinnha = [0, 1, 0, -1];
    const colColuna = [1, 0, -1, 0];

    fila.push({row, col});
    visitado[row][col] = 1;
    const caminho = [];
    caminho.push({...inicio});

    while(fila.length > 0) {
        let {row, col} = fila.shift();
        let paraAchou = false;
        
      for(let i = 0; i < 4; i++) {
        let row_Visita = row + rowLinnha[i];
        let col_Visita = col + colColuna[i];

        if (row_Visita >= 0 && col_Visita >= 0 && row_Visita < tam && col_Visita < tam) {
          if(visitado[row_Visita][col_Visita] === 0 && 
            (grafoUsado[row_Visita][col_Visita] === 4 ||grafoUsado[row_Visita][col_Visita] === 5 || grafoUsado[row_Visita][col_Visita] === 3) ) {
            caminho.push({row: row_Visita, col: col_Visita});
            fila.push({row: row_Visita, col: col_Visita});
            visitado[row_Visita][col_Visita] = 1;

            if(grafoUsado[row_Visita][col_Visita] === 3) {
              paraAchou = true;
              break;
            }

          }

        }
        if(paraAchou) {
            break;
          }
      }
      if(paraAchou) {
            break;
          }
    }
    console.log("Caminho encontrado: ", caminho);
    return caminho;
}


const mostraCamiho = (caminhoEncontrado) => {
  let inc = 0; 
  const linhasTabela = document.getElementById("inicio").getElementsByTagName("tr");

  const id = setInterval(() => {
    // console.log(caminho[inc])
    if(inc < caminhoEncontrado.length) {
      // console.log(caminhoEncontrado[inc])
      let fim = false;
      if(inc === caminhoEncontrado.length-1)
        fim=true;

        
        linhasTabela[caminhoEncontrado[inc].row].getElementsByTagName("td")[caminhoEncontrado[inc].col].style.backgroundColor = !fim ? "green" : "blue";
              
        //Utilizado para movimentar a tela para o elemnento/tag atual
        linhasTabela[ caminhoEncontrado[inc].row ]
        .getElementsByTagName("td")[ caminhoEncontrado[inc].col ]
        .scrollIntoView();
      inc++;
    } else {
      clearInterval(id);
    }
  }, 30);

}

  const atualizarPagina = () => {
    window.location.reload();
  }
