// ============================
// LOGIN SYSTEM
// ============================

const ABHI = "SGE_ADMIN";
const NANDINI = "12345";

function login(){

  const username =
  document.getElementById("username")
  .value;

  const password =
  document.getElementById("password")
  .value;

  if(
    username === ABHI &&
    password === NANDINI
  ){

    document
    .getElementById("loginScreen")
    .style.display = "none";

  }
  else{

    alert("Wrong Username or Password");

  }

}


// ============================
// DARK MODE
// ============================

function toggleDarkMode(){

  document.body.classList.toggle("dark-mode");

}


// ============================
// ADMIN PANEL
// ============================

function toggleAdminPanel(){

  const panel =
  document.getElementById("adminPanel");

  if(panel.style.display === "block"){

    panel.style.display = "none";

  }
  else{

    panel.style.display = "block";

  }

}


// ============================
// GOOGLE SHEET CONFIG
// ============================

const DEFAULT_SHEET_ID =
"18_MFqkJYBd-ncG4d1RD6M2ZFCqlbaWeU";

const SHEETS = [

  "Ayushman",
  "CMPM Fund",
  "Aashadhya",
  "PDDU",
  "BPL"

];

let allData = [];


// ============================
// UPDATE SHEET ID
// ============================

function updateSheetID(){

  const newID =
  document
  .getElementById("sheetIDInput")
  .value
  .trim();

  if(!newID){

    alert("Please enter Sheet ID");

    return;

  }

  localStorage.setItem(
    "google_sheet_id",
    newID
  );

  alert("Sheet ID Updated");

  location.reload();

}


// ============================
// LOAD DATA
// ============================

async function loadData(){

  try{

    allData = [];

    const activeSheetID =
    localStorage.getItem("google_sheet_id")
    || DEFAULT_SHEET_ID;

    for(const sheetName of SHEETS){

      try{

        const csvURL =
        `https://docs.google.com/spreadsheets/d/${activeSheetID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

        const response =
        await fetch(csvURL);

        const csvText =
        await response.text();

        const rows =
        csvText.split("\n");

        const headers =
        rows[0].split(",");

        for(let i=1; i<rows.length; i++){

          const values =
          rows[i].split(",");

          let rowData = {};

          headers.forEach((header,index)=>{

            rowData[header.trim()] =
            values[index];

          });

          rowData._sheet = sheetName;

          allData.push(rowData);

        }

      }
      catch(sheetError){

        console.log(sheetError);

      }

    }

    document
    .getElementById("status")
    .innerText =
    `Data Fetched Successfully | Patients: ${allData.length}`;

  }

  catch(error){

    console.error(error);

    document
    .getElementById("status")
    .innerText =
    "Error Loading Data";

  }

}


// ============================
// SEARCH FUNCTION
// ============================

function searchData(){

  const query =
  document
  .getElementById("searchInput")
  .value
  .toLowerCase()
  .trim();

  const results =
  document.getElementById("results");

  results.innerHTML = "";

  if(!query){

    results.innerHTML =
    `<div class="no-result">
      Please enter something...
    </div>`;

    return;

  }

  const filtered =
  allData.filter(row => {

    return Object.values(row).some(value =>

      String(value)
      .toLowerCase()
      .includes(query)

    );

  });


  if(filtered.length === 0){

    results.innerHTML =
    `<div class="no-result">
      No matching data found..!
    </div>`;

    return;

  }


  filtered.forEach(item => {

    const card =
    document.createElement("div");

    card.className = "card";

    let html =
    `<div class="sheet">
      Sheet: ${item._sheet}
    </div>`;

    for(const key in item){

      if(key !== "_sheet"){

        html +=
        `<p>
          <strong>${key}:</strong>
          ${item[key]}
        </p>`;

      }

    }

    card.innerHTML = html;

    results.appendChild(card);

  });

}


// ============================
// LIVE SEARCH
// ============================

document
.getElementById("searchInput")
.addEventListener("input", ()=>{

  searchData();

});


// ============================
// ENTER SEARCH
// ============================

document
.getElementById("searchInput")
.addEventListener("keypress", function(e){

  if(e.key === "Enter"){

    searchData();

  }

});


// ============================
// AUTO LOAD
// ============================

loadData();
