let arrayRecords = [];
let inputName = null;
let inputDoctor = null;
let inputDate = null;
let inputComp = null;
let valueInputName = "";
let valueInputDoctor = "";
let valueInputDate = "";
let valueInputComp = "";
let valueSort = "id";
let valueDirection = "";
let newDate = null;
let flag = null;
let deleteIndex = null;
let updateIndex = null;
let valueInputFilterWith = "";
let valueInputFilterOn = "";
let inputNameUp = null;
let selectUp = null;
let dateUp = null;
let inputCompUp = null;
let valueInputNewName = "";
let valueInputNewDoc = "";
let valueInputNewDate = "";
let valueInputNewComp = "";

const Today = new Date();
const formatDate = (date) => {
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;
  let mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;
  let yy = date.getFullYear();
  if (yy < 10) yy = "0" + yy;
  return dd + "." + mm + "." + yy;
};
const newDateFormate = formatDate(Today);
const oldDateFormate = newDateFormate.split(".").reverse().join("-");

const token = localStorage.getItem('token');
const login = localStorage.getItem('login');

if (!token || !login) window.location.href = "autorization.html";

window.onload = async () => {

  inputNameUp = document.getElementById("inputNameUp");
  inputNameUp.addEventListener("change", updateValueNewName);

  selectUp = document.getElementById("selectUp");
  selectUp.addEventListener("change", updateValueNewDoc);

  dateUp = document.getElementById("dateUp");
  dateUp.addEventListener("change", updateValueNewDate);

  inputCompUp = document.getElementById("inputCompUp");
  inputCompUp.addEventListener("change", updateValueNewComp);

  const renderDate = document.getElementById("date");
  renderDate.value = oldDateFormate;

  inputName = document.getElementById("inputName");
  inputName.addEventListener("change", updateValueName);

  inputDoctor = document.getElementById("select");
  inputDoctor.addEventListener("change", updateValueDoctor);

  inputDate = document.getElementById("date");
  inputDate.addEventListener("change", updateValueDate);

  inputComp = document.getElementById("inputComp");
  inputComp.addEventListener("change", updateValueComp);

  allRecords();
};

const allRecords = async () => {
  let user = login;
  const resp = await fetch(`http://localhost:8000/api/records/findAllRecord?login=${user}`, {
    method: "GET",
    headers: {
      "Authorization": localStorage.getItem("token"),
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const data = await resp.json();
  arrayRecords = data;
  render();
}

const updateValueName = (event) => {
  valueInputName = event.target.value.trim();
};

const updateValueDoctor = (event) => {
  valueInputDoctor = event.target.value.trim();
};

const updateValueDate = (event) => {
  valueInputDate = event.target.value.trim();
  newDate = valueInputDate.split("-").reverse().join(".");
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
    (oldDateFormate || valueInputDate) &&
    valueInputComp &&
    login
  ) {
    const resp = await fetch("http://localhost:8000/api/records/createRecord", {
      method: "POST",
      headers: {
        "Authorization": localStorage.getItem("token"),
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: valueInputName,
        doctor: valueInputDoctor,
        data: valueInputDate || oldDateFormate,
        complaint: valueInputComp,
        user: login
      }),
    });
    const data = await resp.json();
    arrayRecords.push(data);
    inputName.value = "";
    inputDoctor.value = "";
    inputDate.value = oldDateFormate;
    inputComp.value = "";
    valueInputName = "";
    valueInputDoctor = "";
    valueInputDate = "";
    valueInputComp = "";
    render();
  } else {
    alert("?????????????? ???? ?????? ????????????!");
  }
};


const updateValueNewName = (event) => {
  valueInputNewName = event.target.value.trim();
};


const updateValueNewDoc = (event) => {
  valueInputNewDoc = event.target.value.trim();
};


const updateValueNewDate = (event) => {
  valueInputNewDate = event.target.value.trim();
};

const updateValueNewComp = (event) => {
  valueInputNewComp = event.target.value.trim();
};

const updateRecord = async () => {
  let id = updateIndex;
  const resp = await fetch(`http://localhost:8000/api/records/updateRecord`, {
    method: "PATCH",
    headers: {
      "Authorization": localStorage.getItem("token"),
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      id,
      name: valueInputNewName || inputNameUp.value,
      doctor: valueInputNewDoc || selectUp.value,
      data: valueInputNewDate || dateUp.value,
      complaint: valueInputNewComp || inputCompUp.value,
      user: login
    }),
  });
  const data = await resp.json();
  arrayRecords = data;
  render();
}

const deleteFilterData = () => {
  flag = null;
  allRecords();
}

const deleteRecord = async (index, deleteLogin) => {
  index = deleteIndex;
  deleteLogin = login;
  const resp = await fetch(`http://localhost:8000/api/records/deleteOneRecord?id=${index}&user=${deleteLogin}`, {
    method: "DELETE",
  });
  const data = await resp.json();
  arrayRecords = data;
  render();
}

const updateValueSort = (event) => {
  valueSort = event.target.value;
  sortingRecord();
}

const updateValueDirection = (event) => {
  valueDirection = event.target.value;
  sortingRecord();
}

const sortingRecord = async () => {
  const sort = {};
  if (valueSort === "id") {
    valueDirection = "ASC"
  }
  sort[valueSort] = valueDirection || "ASC";
  sort.user = login;
  const resp = await fetch(`http://localhost:8000/api/records/sortRecords`, {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("token"),
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(sort),
  });
  const data = await resp.json();
  arrayRecords = data;
  render();
}

const inputWithValue = (event) => {
  valueInputFilterWith = event.target.value.trim();
}


const inputOnValue = (event) => {
  valueInputFilterOn = event.target.value.trim();
}

const filterRecords = async () => {
  const resp = await fetch(`http://localhost:8000/api/records/filterRecords`, {
      method: "POST",
      headers: {
          "Authorization": localStorage.getItem("token"),
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
          valueInputFilterWith,
          valueInputFilterOn,
          user: login
      }),
  });
  const data = await resp.json();
  arrayRecords = data;
  render();
  inputWith.value = valueInputFilterWith;
  inputOn.value = valueInputFilterOn;
}

const render = () => {
  const total = document.getElementById("fields");
  const filterField = document.getElementById("filterFields");
  const content = document.getElementById("records");

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  while (filterField.firstChild) {
    filterField.removeChild(filterField.firstChild);
  }

  while (total.firstChild) {
    total.removeChild(total.firstChild);
  }

  // sorting 
  const sortBlock = document.createElement("div");
  sortBlock.id = "sortBlock";
  const sortRecord = document.createElement("div");
  sortRecord.id = "sortRecord";
  const sortStr = document.createElement("p");
  sortStr.innerText = `?????????????????????? ????: `;
  const inputSort = document.createElement("select");
  inputSort.id = "inputSort";
  inputSort.size = "1";
  const optionOne = document.createElement("option");
  optionOne.innerText = ``;
  optionOne.value = `id`;
  const optionTwo = document.createElement("option");
  optionTwo.innerText = `??????`;
  optionTwo.value = `name`;
  const optionThree = document.createElement("option");
  optionThree.innerText = `????????`;
  optionThree.value = `doctor`;
  const optionFour = document.createElement("option");
  optionFour.innerText = `????????`;
  optionFour.value = `data`;


  inputSort.appendChild(optionOne);
  inputSort.appendChild(optionTwo);
  inputSort.appendChild(optionThree);
  inputSort.appendChild(optionFour);
  sortRecord.appendChild(sortStr);
  sortRecord.appendChild(inputSort);
  sortBlock.appendChild(sortRecord);

  // sorting direction
  const direction = document.createElement("div");
  direction.id = "direction";
  const strDirection = document.createElement("p");
  strDirection.innerText = `??????????????????????:`
  const inputDirection = document.createElement("select");
  inputDirection.id = "inputDirection";
  const optionNo = document.createElement("option");
  optionNo.innerText = ``;
  optionNo.value = ``;
  const optionUp = document.createElement("option");
  optionUp.innerText = `???? ??????????????????????`;
  optionUp.value = `ASC`;
  const optionDown = document.createElement("option");
  optionDown.innerText = `???? ????????????????`;
  optionDown.value = `DESC`;
  inputDirection.appendChild(optionNo);
  inputDirection.appendChild(optionUp);
  inputDirection.appendChild(optionDown);
  direction.appendChild(strDirection);
  direction.appendChild(inputDirection);
  sortBlock.appendChild(direction);

  inputSort.addEventListener("change", updateValueSort);
  inputDirection.addEventListener("change", updateValueDirection);

  if (valueSort !== "id") {
    inputSort.value = valueSort;
    inputDirection.value = valueDirection;
    direction.style.display = "flex";
  } else {
    direction.style.display = "none";
  }

  //date filtering
  const filterData = document.createElement("div");
  filterData.id = "filterData";
  const strData = document.createElement("p");
  strData.className = "strData";
  strData.innerText = "???????????????? ???????????? ???? ????????: "
  const addfilter = document.createElement("img");
  addfilter.src = "../img/AddDate.png";
  addfilter.type = "button";
  addfilter.onclick = () => {
    addFilterData()
  }
  filterData.appendChild(strData);
  filterData.appendChild(addfilter);

  total.appendChild(filterData);
  total.appendChild(sortBlock);

  // adding a lower filter block
  if (flag === 1) {
    filterData.style.display = "none";
    const withBlock = document.createElement("div");
    withBlock.id = "withBlock";
    const textWith = document.createElement("p");
    textWith.innerText = "C: ";
    const inputWith = document.createElement("input");
    inputWith.addEventListener("change", inputWithValue);
    inputWith.id = "inputWith"
    inputWith.type = "date";
    withBlock.appendChild(textWith)
    withBlock.appendChild(inputWith)
    const onBlock = document.createElement("div");
    onBlock.id = "onBlock";
    const textOn = document.createElement("p");
    textOn.innerText = "????: ";
    const inputOn = document.createElement("input");
    inputOn.addEventListener("change", inputOnValue);
    inputOn.id = "inputOn";
    inputOn.type = "date";
    onBlock.appendChild(textOn);
    onBlock.appendChild(inputOn);
    const buttonBlock = document.createElement("div");
    buttonBlock.id = "buttonBlock";
    const filterButton = document.createElement("input");
    filterButton.type = "button";
    filterButton.value = "??????????????????????";
    filterButton.onclick = () => {
      filterRecords();
    }
    const deleteButton = document.createElement("img");
    deleteButton.src = "../img/delete.png";
    deleteButton.type = "button";
    deleteButton.onclick = () => deleteFilterData();
    buttonBlock.appendChild(filterButton);
    buttonBlock.appendChild(deleteButton);

    filterField.appendChild(withBlock)
    filterField.appendChild(onBlock)
    filterField.appendChild(buttonBlock)
  }

  // table header
  const upTable = document.createElement("div");
  upTable.id = "upTable";
  const nameTable = document.createElement("p");
  nameTable.innerText = "??????";
  nameTable.className = "fieldTableName";
  const doctorTable = document.createElement("p");
  doctorTable.innerText = "????????";
  doctorTable.className = "fieldTableDoc";
  const dateTable = document.createElement("p");
  dateTable.innerText = "????????";
  dateTable.className = "fieldTableDate";
  const compTable = document.createElement("p");
  compTable.innerText = "????????????";
  compTable.className = "fieldTableComp";
  const noTable = document.createElement("p");
  noTable.innerText = "";
  noTable.className = "fieldTableNo";

  upTable.appendChild(nameTable);
  upTable.appendChild(doctorTable);
  upTable.appendChild(dateTable);
  upTable.appendChild(compTable);
  upTable.appendChild(noTable);
  content.appendChild(upTable);

  const table = document.createElement("table");
  table.id = "newTable";

  arrayRecords.map((item, index) => {
    const line = document.createElement("tr");
    line.className = "newLine";
    const trName = document.createElement("th");
    trName.className = "lineName";
    trName.innerText = item.name;
    const trDoc = document.createElement("th");
    trDoc.className = "lineDoc";
    trDoc.innerText = item.doctor;
    const trDate = document.createElement("th");
    trDate.className = "lineDate";
    trDate.innerText = item.data.split("-").reverse().join(".");
    const trComp = document.createElement("th");
    trComp.className = "lineComp";
    trComp.innerText = item.complaint;
    const trButt = document.createElement("th");
    trButt.className = "lineButt";
    line.appendChild(trName);
    line.appendChild(trDoc);
    line.appendChild(trDate);
    line.appendChild(trComp);

    const updateRec = document.createElement("img");
    updateRec.src = "../img/update.png";
    updateRec.type = "button";
    updateRec.onclick = () => {
      updateIndex = item.id;
      inputNameUp.value = item.name;
      selectUp.value = item.doctor;
      dateUp.value = item.data.split(".").reverse().join("-");
      inputCompUp.value = item.complaint;
    }
    updateRec.setAttribute("data-toggle", "modal")
    updateRec.setAttribute("data-target", "#myModalUpdate")

    const deleteRec = document.createElement("img");
    deleteRec.src = "../img/delete.png";
    deleteRec.type = "button";
    deleteRec.onclick = () => deleteIndex = item.id;
    deleteRec.setAttribute("data-toggle", "modal")
    deleteRec.setAttribute("data-target", "#myModalDelete")

    trButt.appendChild(updateRec);
    trButt.appendChild(deleteRec);
    line.appendChild(trButt);

    table.appendChild(line);
  });
  content.appendChild(table);
};