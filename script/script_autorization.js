let inputLog = null;
let inputPass = null;
let valueInputLog = "";
let valueInputPass = "";
const patternPas = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

window.onload = () => {
  inputLog = document.getElementById("newLogin");
  inputLog.addEventListener("change", updateValueLog);

  inputPass = document.getElementById("newPass");
  inputPass.addEventListener("change", updateValuePas);
};

const updateValueLog = (event) => {
  valueInputLog = event.target.value.trim();
};

const updateValuePas = (event) => {
  valueInputPass = event.target.value.trim();
};

const registrationUser = () => {
  window.location.href = "registration.html";
};

const enterMain = async () => {
  if (valueInputLog && valueInputPass) {
    const resp = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: {
        "Authorization": localStorage.getItem("token"),
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        login: valueInputLog,
        password: valueInputPass,
      }),
    });
    const { newToken, user } = await resp.json();
    valueInputLog = "";
    valueInputPass = "";
    inputLog.value = "";
    inputPass.value = "";

    if (newToken && user) {
      localStorage.setItem("token", newToken);
      localStorage.setItem("login", user.logChange);
      window.location.href = "mainPage.html";
    } else {
      alert("Неправильный логин или пароль!");
    }
  } else {
    alert("Проверьте правильность ввода данных!");
  }
};
