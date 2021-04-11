const bal = document.getElementById("Balance");

const inr_tot = document.getElementById("inr_tot");

const inr_min = document.getElementById("inr_min");

const ul = document.getElementById("list");
const minus = document.getElementsByClassName("minus");
console.log(ul);


const btn = document.getElementById("btn");
console.log(btn);


const text = document.getElementById("groc_text");
const amt = document.getElementById("amount");

// if(localStorage.getItem('transaction' === null))
let transaction = localStorage.getItem('transaction') === null ? localStorageTransactions : [];
const localStorageTransactions = JSON.parse(localStorage.getItem('transaction'));


function IdGenerator(){
    return Math.floor(Math.random()*100000) ;  
}

// add transaction

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === "" || amt.value.trim() === "")
        alert("Please Enter The Transaction");

    else {
        const trans = {
            id:IdGenerator(), // Idgenerator generates unique id
            text: text.value,
            amt: +amt.value
        }
        console.log(text.value);

        transaction.push(trans);
        console.log();
        addTransactionDOM(trans);
        updateValues();
        updateLocalStorage();
        text.value = "";
        amt.value = "";


    }
}

//changes  to html page
function addTransactionDOM(transaction){
    const sign = transaction.amt < 0 ? "-" : "+";
    const item = document.createElement("li");
    console.log(item);
    item.classList.add(
        transaction.amt < 0 ? "minus" : "plus"
    );

    item.innerHTML = `${transaction.text}<span>${sign}${transaction.amt}
        </span><button class="del_btn" onclick="removeTransaction(${transaction.id})">x</button>
        `;
    // let del_btn = document.createElement("Button");
    // del_btn.appendChild(document.createTextNode("DELETE"));
    // item.appendChild(del_btn);
    
// console.log(item);
    ul.appendChild(item);
    // del_btn.addEventListener('click', removeTransaction(e),false);

    // console.log(del_btn);

};


//Update e
function updateValues() {
    const amounts = transaction.map(
        (transaction) => transaction.amt
    );

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts.filter(
        (item) => item > 0).reduce(
            (acc, item) => (acc += item), 0).toFixed(2);

    const expense = (amounts.filter(
        (item) => item < 0).reduce(
            (acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `RS${total}`;
    inr_tot.innerText = `RS${income}`;
    inr_min.innerText = `RS${expense}`;
}


function updateLocalStorage() {
    localStorage.setItem('transaction', JSON.stringify(transaction))
}


// function deleteFromLocalStorage(event) {

// }

function removeTransaction(id){
    transaction = transaction.filter(transaction => transaction.id !== id);
    updateLocalStorage();
     Init();
  }

function Init() {
    list.innerHTML = "";
    transaction.forEach(addTransactionDOM);
    updateValues();
}
Init();
// btn.addEventListener("click", () => {
//     addTransaction();
//     // window.location.reload();
// }, false);
btn.addEventListener('click',addTransaction);
// localStorage.clear();

