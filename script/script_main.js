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
const oldDateFormate = newDateFormate.split(".").reverse().join("-");

const token = localStorage.getItem('token');
const login = localStorage.getItem('login');

if(!token || !login) window.location.href = "autorization.html";

window.onload = async () => {
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
        alert("Введены не все данные!");
    }
};

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

    // table header
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
        deleteRec.onclick = () => {
            deleteIndex = item.id;
        }
        deleteRec.setAttribute("data-toggle", "modal")
        deleteRec.setAttribute("data-target", "#myModalDelete")

        trButt.appendChild(updateRec);
        trButt.appendChild(deleteRec);
        line.appendChild(trButt);

        table.appendChild(line);
    });
    content.appendChild(table);
};