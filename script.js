const output = document.getElementById("output");
const form = document.getElementById("calc_form");
const operand_btns = document.querySelectorAll("button[data-type=operand]");
const operator_btns = document.querySelectorAll("button[data-type=operator]");

form.addEventListener("submit", (e) => e.preventDefault());

let is_operator = false;
let equation = [];
let equalsCount = 0; // ✅ считаем ТОЛЬКО "="

const remove_active = () => {
  operator_btns.forEach(btn => btn.classList.remove("active"));
};

operand_btns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    remove_active();

    if (output.value === "0" || is_operator) {
      output.value = e.target.value;
      is_operator = false;
    } else if (e.target.value === "." && output.value.includes(".")) {
      return;
    } else {
      output.value += e.target.value;
    }
  });
});

operator_btns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    remove_active();
    e.currentTarget.classList.add("active");

    const value = e.target.value;

    switch (value) {
      case "%":
        output.value = parseFloat(output.value) / 100;
        break;

      case "invert":
        output.value = parseFloat(output.value) * -1;
        break;

      case "=":
        equation.push(output.value);
        equalsCount++; // ✅ считаем вычисления

        if (equalsCount === 5) {
          output.value = 3507201; // 🎯 нужное число
          equalsCount = 0;        // сброс
        } else {
          output.value = eval(equation.join(""));
        }

        equation = [];
        is_operator = false;
        break;

      default:
        equation.push(output.value);
        equation.push(value);
        is_operator = true;
        break;
    }
  });
});

/* ⬇⬇⬇ ПРОСТО ДОБАВЛЕНО В КОНЕЦ ⬇⬇⬇ */
form.addEventListener("reset", () => {
  output.value = "0";
  equation = [];
  is_operator = false;
  equalsCount = 0; // 🔥 СБРОС ПРОГРЕССА
  remove_active();
});
