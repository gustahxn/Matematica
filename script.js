

// calc fatorial
function fatorial(n) {
  if (n < 0) throw new Error("Fatorial não definido para negativos.");
  let resultado = 1n;
  for (let i = 2n; i <= BigInt(n); i++) resultado *= i;
  return resultado;
}


// formata número
function fmt(valor) {
  return valor.toLocaleString("pt-BR");
}


// mostra resultado
function mostrarResultado(idResult, idSteps, valor, passos) {
  const elRes = document.getElementById(idResult);
  const elSteps = document.getElementById(idSteps);

  elRes.className = "result";
  elRes.textContent = "Resultado: " + fmt(valor);

  elSteps.innerHTML = passos
    .map(p => `<span class="step-line">${p}</span>`)
    .join("");
}


// erros
function mostrarErro(idResult, idSteps, msg) {
  const elRes = document.getElementById(idResult);
  const elSteps = document.getElementById(idSteps);

  elRes.className = "result error";
  elRes.textContent = msg;
  elSteps.innerHTML = "";
}


// validation
function lerInteiro(id, nome) {
  const val = document.getElementById(id).value.trim();
  if (val === "") throw new Error(`Informe o valor de ${nome}.`);
  const n = parseInt(val, 10);
  if (isNaN(n) || n < 0) throw new Error(`${nome} deve ser um inteiro não-negativo.`);
  if (n > 20) throw new Error(`${nome} deve ser no máximo 20 para evitar números astronômicos.`);
  return n;
}



// permutação simples
function calcPermutacaoSimples() {
  try {
    const n = lerInteiro("ps-n", "n");
    const result = fatorial(n);

    const passos = [
      `Fórmula: P${n} = ${n}!`,
      `Cálculo: ${Array.from({ length: n }, (_, i) => i + 1).join(" × ") || "1"} = ${fmt(result)}`,
    ];

    mostrarResultado("ps-result", "ps-steps", result, passos);
  } catch (e) {
    mostrarErro("ps-result", "ps-steps", e.message);
  }
}



// permutação com repetição
function calcPermutacaoRepeticao() {
  try {
    const n = lerInteiro("pr-n", "n");
    const gruposStr = document.getElementById("pr-grupos").value.trim();

    if (gruposStr === "") throw new Error("Informe os grupos de repetição.");

    const grupos = gruposStr.split(",").map(s => {
      const v = parseInt(s.trim(), 10);
      if (isNaN(v) || v < 0) throw new Error("Cada grupo deve ser inteiro não-negativo.");
      return v;
    });

    const soma = grupos.reduce((a, b) => a + b, 0);
    if (soma > n) throw new Error("A soma dos grupos não pode ser maior que n.");

    const fatN = fatorial(n);
    let denominador = 1n;
    grupos.forEach(g => { denominador *= fatorial(g); });

    if (fatN % denominador !== 0n) throw new Error("Os valores fornecidos não produzem um resultado inteiro. Verifique os grupos.");

    const result = fatN / denominador;

    const gruposLabel = grupos.map(g => `${g}!`).join(" × ");
    const passos = [
      `Fórmula: P(${n}; ${grupos.join(", ")}) = ${n}! / (${gruposLabel})`,
      `Numerador: ${n}! = ${fmt(fatN)}`,
      `Denominador: ${gruposLabel} = ${fmt(denominador)}`,
      `Resultado: ${fmt(fatN)} / ${fmt(denominador)} = ${fmt(result)}`,
    ];

    mostrarResultado("pr-result", "pr-steps", result, passos);
  } catch (e) {
    mostrarErro("pr-result", "pr-steps", e.message);
  }
}



// cálculo de anagrama
function calcAnagrama() {
  try {
    const palavraStr = document.getElementById("an-palavra").value.trim().toUpperCase();
    // remove espaços
    const palavra = palavraStr.replace(/\s+/g, '');

    if (!palavra) throw new Error("Informe uma palavra.");
    if (palavra.length > 20) throw new Error("A palavra deve ter no máximo 20 letras para evitar números astronômicos.");

    const n = palavra.length;
    const contagem = {};
    for (const letra of palavra) {
      contagem[letra] = (contagem[letra] || 0) + 1;
    }

    const grupos = Object.values(contagem).filter(c => c > 1);
    const fatN = fatorial(n);
    let denominador = 1n;
    grupos.forEach(g => { denominador *= fatorial(g); });

    const result = fatN / denominador;

    const repeticoesStr = Object.entries(contagem)
      .filter(([_, c]) => c > 1)
      .map(([letra, c]) => `${letra}: ${c}`)
      .join(", ");

    const gruposLabel = grupos.map(g => `${g}!`).join(" × ");

    const passos = [
      `Palavra: ${palavraStr} (Total: ${n} letras)`,
      repeticoesStr ? `Repetições: ${repeticoesStr}` : "Nenhuma letra se repete.",
      `Fórmula: ${n}! / (${gruposLabel || "1"})`,
      `Numerador: ${n}! = ${fmt(fatN)}`,
      `Denominador: ${gruposLabel || "1"} = ${fmt(denominador)}`,
      `Resultado: ${fmt(fatN)} / ${fmt(denominador)} = ${fmt(result)}`,
    ];

    mostrarResultado("an-result", "an-steps", result, passos);
  } catch (e) {
    mostrarErro("an-result", "an-steps", e.message);
  }
}



// arranjo simples
function calcArranjoSimples() {
  try {
    const n = lerInteiro("as-n", "n");
    const p = lerInteiro("as-p", "p");

    if (p > n) throw new Error("p não pode ser maior que n.");

    const fatN = fatorial(n);
    const fatNmenosP = fatorial(n - p);
    const result = fatN / fatNmenosP;

    const passos = [
      `Fórmula: A(${n}, ${p}) = ${n}! / (${n} − ${p})!`,
      `Numerador: ${n}! = ${fmt(fatN)}`,
      `Denominador: (${n} − ${p})! = ${n - p}! = ${fmt(fatNmenosP)}`,
      `Resultado: ${fmt(fatN)} / ${fmt(fatNmenosP)} = ${fmt(result)}`,
    ];

    mostrarResultado("as-result", "as-steps", result, passos);
  } catch (e) {
    mostrarErro("as-result", "as-steps", e.message);
  }
}



// combinação simples
function calcCombinacaoSimples() {
  try {
    const n = lerInteiro("cs-n", "n");
    const p = lerInteiro("cs-p", "p");

    if (p > n) throw new Error("p não pode ser maior que n.");

    const fatN = fatorial(n);
    const fatP = fatorial(p);
    const fatNmenosP = fatorial(n - p);
    const denominador = fatP * fatNmenosP;
    const result = fatN / denominador;

    const passos = [
      `Fórmula: C(${n}, ${p}) = ${n}! / (${p}! × (${n} − ${p})!)`,
      `Numerador: ${n}! = ${fmt(fatN)}`,
      `${p}! = ${fmt(fatP)}`,
      `(${n} − ${p})! = ${n - p}! = ${fmt(fatNmenosP)}`,
      `Denominador: ${fmt(fatP)} × ${fmt(fatNmenosP)} = ${fmt(denominador)}`,
      `Resultado: ${fmt(fatN)} / ${fmt(denominador)} = ${fmt(result)}`,
    ];

    mostrarResultado("cs-result", "cs-steps", result, passos);
  } catch (e) {
    mostrarErro("cs-result", "cs-steps", e.message);
  }
}



// navegação de abas
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});


// acionar com enter
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const panel = input.closest(".panel");
      panel.querySelector(".btn-calc").click();
    }
  });
});