function q1Calcular() {
  var aluno = document.getElementById('aluno').value;
  var disciplina = document.getElementById('disciplina').value;
  var n1 = Number(document.getElementById('nota1').value);
  var n2 = Number(document.getElementById('nota2').value);
  var out = document.getElementById('q1out');
  if (!aluno || !disciplina || isNaN(n1) || isNaN(n2)) {
    out.textContent = 'Preencha todos os campos.'; return;
  }
  var media = (n1 + n2) / 2;
  out.textContent = 'Aluno: ' + aluno + '\nDisciplina: ' + disciplina +
                    '\nNota 1: ' + n1 + '\nNota 2: ' + n2 +
                    '\nMédia: ' + media.toFixed(2);
}
function q1Limpar() {
  document.getElementById('aluno').value = '';
  document.getElementById('disciplina').value = '';
  document.getElementById('nota1').value = '';
  document.getElementById('nota2').value = '';
  document.getElementById('q1out').textContent = '';
}

function q2Calcular() {
  var ano = parseInt(document.getElementById('anoNasc').value, 10);
  var out = document.getElementById('q2out');
  if (isNaN(ano)) { out.textContent = 'Informe um ano válido.'; return; }
  var idade = 2024 - ano;
  out.textContent = 'Quem nasceu em ' + ano + ' irá completar ' + idade + ' anos em 2024.';
}
function q2Limpar() {
  document.getElementById('anoNasc').value = '';
  document.getElementById('q2out').textContent = '';
}

function fatorial(n) {
  if (n < 0 || Math.floor(n) !== n) return NaN;
  if (n === 0 || n === 1) return 1;
  var r = 1;
  for (var i = 2; i <= n; i++) r = r * i;
  return r;
}
function q3Calcular() {
  var n = Number(document.getElementById('fatNum').value);
  var out = document.getElementById('q3out');
  if (isNaN(n) || n < 0 || Math.floor(n) !== n) {
    out.textContent = 'Informe um inteiro >= 0.'; return;
  }
  out.textContent = n + '! = ' + fatorial(n);
}
function q3Limpar() {
  document.getElementById('fatNum').value = '';
  document.getElementById('q3out').textContent = '';
}

function q4Calcular() {
  var n = Number(document.getElementById('parimparNum').value);
  var out = document.getElementById('q4out');
  if (isNaN(n) || Math.floor(n) !== n) {
    out.textContent = 'Informe um número inteiro.'; return;
  }
  var tipo = (Math.abs(n) % 2 === 0) ? 'par' : 'ímpar';
  out.textContent = 'O número ' + n + ' que foi digitado é ' + tipo + '!';
}
function q4Limpar() {
  document.getElementById('parimparNum').value = '';
  document.getElementById('q4out').textContent = '';
}

function q5Calcular() {
  var n = Number(document.getElementById('tabNum').value);
  var lim = Number(document.getElementById('tabLim').value);
  var out = document.getElementById('q5out');
  if (isNaN(n) || Math.floor(n) !== n || isNaN(lim) || Math.floor(lim) !== lim || lim <= 0) {
    out.textContent = 'Informe um número inteiro e um limite inteiro > 0.'; return;
  }
  var linhas = [];
  for (var i = 0; i <= lim; i++) linhas.push(n + ' x ' + i + ' = ' + (n * i));
  out.textContent = linhas.join('\n');
}
function q5Limpar() {
  document.getElementById('tabNum').value = '';
  document.getElementById('tabLim').value = '10';
  document.getElementById('q5out').textContent = '';
}
