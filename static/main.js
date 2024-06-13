var IsInputActive = false
var CurrentTable = ""
var CurrentOperation = ""

const AddTablesToNavBar = async function() {
    console.log("What you are looking for in console?")
    let elem = document.querySelector(".tables-navbar");
    var response = await fetch(`http://${location.host}/api/GetAllTables`)
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

    CurrentTable = json[0]

    console.log(CurrentTable)
}

const AddDataToTable = function(arr) {
    table = document.querySelector(".")
}

const GetDataForTable = async function() {


    var response = await fetch(`http://${location.host}/api/GetAllTables`)
    let h7JH = await response.json();

    console.log("я ебу собак")
    var DataTable = document.querySelector(".DataTable")
    var SqlQuery = `SELECT * FROM ${h7JH[0]}`
    console.log(CurrentTable)
    console.log(SqlQuery)



    var response = await fetch(`http://${location.host}/api/RawSQL`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, // Add headers to specify JSON content type
        body: JSON.stringify({
            query: SqlQuery,
        }),
    })
    var data = await response.json();
    data.forEach((arr) => {
        var elementAAA = document.createElement("tr")
        arr.forEach(
            (DataValue) => {
                var valueAAA = document.createElement("td")
                valueAAA.innerHTML = DataValue
                elementAAA.appendChild(valueAAA)

            }
        )
        DataTable.appendChild(elementAAA)
    })
}

//adding KeyBoard event to page
window.addEventListener("keydown", async(e) => {
    var elem = document.querySelector(".RawSQLInput");
    var DataTable = document.querySelector(".DataTable")

    DataTable.innerHTML = ""


    if (IsInputActive && e.key === "Enter") {
        console.log("sending request");
        var response = await fetch(`http://${location.host}/api/RawSQL`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, // Add headers to specify JSON content type
            body: JSON.stringify({
                query: elem.value,
            }),
        })

        var data = await response.json();

        data.forEach((arr) => {
            var elementAAA = document.createElement("tr")
            arr.forEach(
                (DataValue) => {
                    var valueAAA = document.createElement("td")
                    valueAAA.innerHTML = DataValue
                    elementAAA.appendChild(valueAAA)

                }
            )
            DataTable.appendChild(elementAAA)
        })







    }
});

const ReadTable = async function(NameOfTable) {

    console.log("я ебу собак")
    var DataTable = document.querySelector(".DataTable")
    var SqlQuery = `SELECT * FROM ${NameOfTable}`
    console.log(CurrentTable)
    console.log(SqlQuery)

    DataTable.innerHTML = ""


    var response = await fetch(`http://${location.host}/api/RawSQL`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, // Add headers to specify JSON content type
        body: JSON.stringify({
            query: SqlQuery,
        }),
    })
    var data = await response.json();
    data.forEach((arr) => {
        var elementAAA = document.createElement("tr")
        arr.forEach(
            (DataValue) => {
                var valueAAA = document.createElement("td")
                valueAAA.innerHTML = DataValue
                elementAAA.appendChild(valueAAA)

            }
        )
        DataTable.appendChild(elementAAA)
    })

}

const NewWindowCUD = async function(TypeOfOperation) {

    CurrentOperation = TypeOfOperation

    //creating windows
    var NewDiv = document.createElement("div")
    NewDiv.className = "pop-up-window"

    NewDiv.innerHTML = `Insert data for ${CurrentOperation}`


    // var response = await fetch(`${location.host}/api/GetTableInfo?name=${CurrentTable}`)
    // var data = await response.json()
    // var NumOfRow = data["NumOfRow"]

    // for (var j = 0; j < NumOfRow; i++) {
    //     var input = document.createElement("input")
    //     NewDiv.appendChild(input)
    // }


    document.body.append(NewDiv)



}