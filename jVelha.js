const celulas = document.querySelectorAll('.celula');
const JogadorX = 'X';
const JogadorO = 'O';
let checarTurno = true;
const combinacoes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.addEventListener('click', event => {
  if (event.target.matches('.celula')) {
    jogar(event.target.id);
  }
});

function jogar(id) {
  const celula = document.getElementById(id);
  turno = checarTurno ? JogadorX : JogadorO;
  celula.textContent = turno;
  celula.classList.add(turno);
  checarVencedor(turno);
}

function checarVencedor(turno) {
  const vencedor = combinacoes.some(comb => {
    return comb.every(index => {
      return celulas[index].classList.contains(turno);
    });
  });

  if (vencedor) {
    encerrarJogo(turno);
  } else if (checarEmpate()) {
    encerrarJogo();
  } else {
    checarTurno = !checarTurno;
  }
}

function checarEmpate() {
  let x = 0;
  let o = 0;

  for (index in celulas) {
    if (!isNaN(index)) {
      if (celulas[index].classList.contains(JogadorX)) {
        x++;
      }

      if (celulas[index].classList.contains(JogadorO)) {
        o++;
      }
    }
  }

  return x + o === 9 ? true : false;
}

function encerrarJogo(vencedor = null) {
  const telaEscura = document.getElementById('tela-escura');
  const h2 = document.createElement('h2');
  const h3 = document.createElement('h3');
  let mensagem = null;

  telaEscura.style.display = 'block';
  telaEscura.appendChild(h2);
  telaEscura.appendChild(h3);

  if (vencedor) {
    h2.innerHTML = `O player <span> ${vencedor} </span> Venceu`;
  } else {
    h2.innerHTML = 'Empatou';
  }

  let contador = 3;
  setInterval(() => {
    h3.innerHTML = `Reiniciando em ${contador--}`;
  }, 1000);

  setTimeout(() => location.reload(), 4000);
}
