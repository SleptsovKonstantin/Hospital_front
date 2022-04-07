let inputLog = null;
let inputPass = null;
let inputPassRep = null;
let valueInputLog = "";
let valueInputPass = "";
let valueInputPassRep = "";
const patternPas = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/; //латиница и цифры

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
      !valueInputLog.length <= 6 &&
      !valueInputPass.length <= 6 &&
      valueInputPassRep
    ) {
      if (valueInputPassRep === valueInputPass) {
        if (patternPas.test(valueInputPass)) {
          const resp = await fetch("http://localhost:8000/api/user/create", {
            method: "POST",
            headers: {
              authorization: localStorage.getItem("token"),
              "Content-Type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              login: valueInputLog,
              password: valueInputPass,
            }),
          });
          const { newToken } = await resp.json();
          valueInputLog = "";
          valueInputPass = "";
          valueInputPassRep = "";
          inputLog.value = "";
          inputPass.value = "";
          inputPassRep.value = "";

          if (newToken !== undefined) {
            localStorage.setItem("token", newToken);
            window.location.href = "mainPage.html";
          } else {
            alert("Такой пользователь уже существует!");
          }
        } else {
          alert("Пароли не совпадают!");
        }
      } else {
        alert(
          "Проверьте ввод данных. Длина логина и пароля должна быть не меньше 6 символов!"
        );
      }
    }
  } else {
    alert("Данные не введены!");
  }
};

const onClickAutoriz = () => {
  window.location.href = "autorization.html";
};
