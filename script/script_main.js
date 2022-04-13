let arrayRecords = [];
let inputName = null;
let inputDoctor = null;
let inputDate = null;
let inputComp = null;
let valueInputName = "";
let valueInputDoctor = "";
let valueInputDate = "";
let valueInputComp = "";

const dateYesterday = new Date();
const formatDate = (date) => {
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;

  let mm = date.getMonth() + 1;

  if (mm < 10) mm = "0" + mm;

  let yy = date.getFullYear();

  if (yy < 10) yy = "0" + yy;

  return dd + "." + mm + "." + yy;
};
const newDateFormate = formatDate(dateYesterday);
console.log(newDateFormate);

window.onload = async () => {
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
  render();
};

const updateValueName = (event) => {
  valueInputName = event.target.value.trim();
};

const updateValueDoctor = (event) => {
  valueInputDoctor = event.target.value.trim();
};

const updateValueDate = (event) => {
  valueInputDate = event.target.value.trim();
  console.log(valueInputDate);
};

const updateValueComp = (event) => {
  valueInputComp = event.target.value.trim();
};

const exitPage = () => {
  localStorage.clear();
  window.location.href = "autorization.html";
};

const addRecord = async () => {
  if (
    valueInputName &&
    valueInputDoctor &&
    (valueInputDate || newDateFormate) &&
    valueInputComp
  ) {
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
        data: valueInputDate || newDateFormate,
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
    render();
  } else {
    alert("Введены не все данные!");
  }
};

const render = () => {
  const total = document.getElementById("fields");
  const content = document.getElementById("records");

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  while (total.firstChild) {
    total.removeChild(total.firstChild);
  }
  // ------------- up
  const sortRecord = document.createElement("div");
  sortRecord.id = "sortRecord";
  const sortStr = document.createElement("p");
  sortStr.innerText = `Сортировать по: `;

  const inputSort = document.createElement("select");
  inputSort.id = "inputSort";
  inputSort.size = "1";
  const optionOne = document.createElement("option");
  optionOne.innerText = ``;
  optionOne.value = `id`;
  const optionTwo = document.createElement("option");
  optionTwo.innerText = `Имя`;
  optionTwo.value = `name`;
  const optionThree = document.createElement("option");
  optionThree.innerText = `Врач`;
  optionThree.value = `doctor`;
  const optionFour = document.createElement("option");
  optionFour.innerText = `Дата`;
  optionFour.value = `data`;

  inputSort.appendChild(optionOne);
  inputSort.appendChild(optionTwo);
  inputSort.appendChild(optionThree);
  inputSort.appendChild(optionFour);
  sortRecord.appendChild(sortStr);
  sortRecord.appendChild(inputSort);

  total.appendChild(sortRecord);
  // ------------------- down table

  const upTable = document.createElement("div");
  upTable.id = "upTable";
  const nameTable = document.createElement("p");
  nameTable.innerText = "Имя";
  nameTable.className = "fieldTableName";
  const doctorTable = document.createElement("p");
  doctorTable.innerText = "Врач";
  doctorTable.className = "fieldTableDoc";
  const dateTable = document.createElement("p");
  dateTable.innerText = "Дата";
  dateTable.className = "fieldTableDate";
  const compTable = document.createElement("p");
  compTable.innerText = "Жалобы";
  compTable.className = "fieldTableComp";
  const noTable = document.createElement("p");
  noTable.innerText = "  ";
  noTable.className = "fieldTableNo";

  upTable.appendChild(nameTable);
  upTable.appendChild(doctorTable);
  upTable.appendChild(dateTable);
  upTable.appendChild(compTable);
  upTable.appendChild(noTable);
  content.appendChild(upTable);

  const table = document.createElement("table");

  arrayRecords.map((item, index) => {
    const line = document.createElement("tr");
    

  });
};
