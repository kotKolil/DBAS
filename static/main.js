var IsInputActive = false
var CurrentTable = ""

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

    GetDataForTable(CurrentTable)

}


const GetDataForTable = async function(CurrentTable) {


    var response = await fetch(`http://${location.host}/api/GetAllTables`)
    let h7JH = await response.json();

    var DataTable = document.querySelector(".DataTable")
    var SqlQuery = `SELECT * FROM ${h7JH[0]}`
    console.log(CurrentTable)
    console.log(SqlQuery)


    //getting name of columns via API
    console.log(`running from AddDataFromTable ${CurrentTable}`)

    var response = await fetch(`http://${location.host}/api/GetTableInfo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, // Add headers to specify JSON content type
        body: JSON.stringify({
            name: CurrentTable,
        }),
    })

    var data = await response.json();
    console.log("logging data of table columns")
    console.log(data)
    var elementAAA = document.createElement("tr")
    data.forEach((TableName) => {
        var valueAAA = document.createElement("td")
        valueAAA.innerHTML = TableName
        elementAAA.appendChild(valueAAA)
    })

    DataTable.appendChild(elementAAA)

    //getting data from table
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

    var DataTable = document.querySelector(".DataTable")
    var SqlQuery = `SELECT * FROM ${NameOfTable}`
    console.log(CurrentTable)
    console.log(SqlQuery)

    DataTable.innerHTML = ""


    //getting name of columns via API
    console.log(`running from AddDataFromTable ${CurrentTable}`)

    var response = await fetch(`http://${location.host}/api/GetTableInfo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, // Add headers to specify JSON content type
        body: JSON.stringify({
            name: CurrentTable,
        }),
    })

    var data = await response.json();
    console.log("logging data of table columns")
    console.log(data)
    var elementAAA = document.createElement("tr")
    data.forEach((TableName) => {
        var valueAAA = document.createElement("td")
        valueAAA.innerHTML = TableName
        elementAAA.appendChild(valueAAA)
    })

    DataTable.appendChild(elementAAA)




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