let arrayRecords = [];
let inputName = null;
let inputDoctor = null;
let inputDate = null;
let inputComp = null;
let valueInputName = "";
let valueInputDoctor = "";
let valueInputDate = "";
let valueInputComp = "";

window.onload = async() => {
  inputName = document.getElementById("inputName");
  inputName.addEventListener("change", updateValueName);
  
  inputDoctor = document.getElementById("select");
  inputDoctor.addEventListener("change", updateValueDoctor);

  inputDate = document.getElementById("date");
  inputDate.addEventListener("change", updateValueDate);

  inputComp = document.getElementById("inputComp");
  inputComp.addEventListener("change", updateValueComp);

  const resp = await fetch("http://localhost:8000/api/records/findAllRecord", {
    method: "GET",
  });
  const data = await resp.json();
  arrayRecords = data;
  console.log(arrayRecords);
  // render();
};

const updateValueName = (event) => {
  valueInputName = event.target.value.trim();
};

const updateValueDoctor = (event) => {
  valueInputDoctor = event.target.value.trim();
};

const updateValueDate = (event) => {
  valueInputDate = event.target.value.trim();
};

const updateValueComp = (event) => {
  valueInputComp = event.target.value.trim();
};

const exitPage = () => {
  localStorage.clear();
  window.location.href = "autorization.html";
};

const addRecord = async () => {
  if (valueInputName && valueInputDoctor && valueInputDate && valueInputComp) {
    const resp = await fetch("http://localhost:8000/api/records/createRecord", {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: valueInputName,
        doctor: valueInputDoctor,
        data: valueInputDate,
        complaint: valueInputComp,
      }),
    });
    const data = await resp.json();
    arrayRecords = data;
    inputName = "";
    valueInputName = "";
    valueInputDoctor = "";
    valueInputDate = "";
    valueInputComp = "";
  } else {
    alert("Введены не все данные!");
  }
};
