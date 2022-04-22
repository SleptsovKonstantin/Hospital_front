let inputLog = null;
let inputPass = null;
let inputPassRep = null;
let valueInputLog = "";
let valueInputPass = "";
let valueInputPassRep = "";
const patternPas = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
const lenghtPass = /^[0-9a-zA-Z!@#$%^&*]{6,}$/;

window.onload = () => {
  inputLog = document.getElementById("newLogin");
  inputLog.addEventListener("change", updateValueLog);

  inputPass = document.getElementById("newPass");
  inputPass.addEventListener("change", updateValuePas);

  inputPassRep = document.getElementById("newPassRep");
  inputPassRep.addEventListener("change", updateValuePasRep);
};

const updateValueLog = (event) => {
  valueInputLog = event.target.value.trim();
};

const updateValuePas = (event) => {
  valueInputPass = event.target.value.trim();
};

const updateValuePasRep = (event) => {
  valueInputPassRep = event.target.value.trim();
};

const onClickRegist = async () => {
  if (valueInputLog && valueInputPass && valueInputPassRep) {
    if (
      lenghtPass.test(valueInputLog) &&
      lenghtPass.test(valueInputPass)
    ) {
      if (valueInputPassRep === valueInputPass) {
        if (patternPas.test(valueInputPass)) {
          const resp = await fetch("http://localhost:8000/api/user/create", {
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
          valueInputPassRep = "";
          inputLog.value = "";
          inputPass.value = "";
          inputPassRep.value = "";

          if (newToken !== undefined) {
            localStorage.setItem("token", newToken);
            localStorage.setItem("login", user.logChange);
            window.location.href = "mainPage.html";
          } else {
            alert("Такой пользователь уже существует!");
          }
        } else {
          alert(
            "Пароль должен содержать латинские буквы, минимум 1 заглавную букву и 1 цифру!"
          );
        }
      } else {
        alert("Пароли не совпадают!");
      }
    } else {
      alert(
        "Проверьте ввод данных. Длина логина и пароля должна быть не меньше 6 символов!"
      );
    }
  } else {
    alert("Введены не все данные!");
  }
};

const onClickAutoriz = () => {
  window.location.href = "autorization.html";
};
