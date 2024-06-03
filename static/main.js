var IsInputActive = false
var CurrentTable = ""

const AddTablesToNavBar = async function() {
    let elem = document.querySelector(".tables-navbar");
    const response = await fetch(`http://${location.host}/api/GetAllTables`)
    let json = await response.json();
    json.forEach(element => {

        let div = document.createElement('div');
        div.className = "table-card";
        div.innerHTML = element;
        div.onclick = () => {
            console.log("clicked")
            CurrentTable = element;
        }

        elem.appendChild(div)


    });
}


//handling input submit
let KbrdEvent = function(e) {

    if (e.key == "Enter" && IsInputActive) {

    }
}

//adding KeyBoard event to page
window.addEventListener("keydown", KbrdEvent);