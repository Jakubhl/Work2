

var info = ["Status","IP_adress","locality","User name","User locality"]



function logic_table(){
    var table = document.createElement('table');
    table.setAttribute('border', '2');
    //Nadpis
    var tRow = document.createElement('tr');
    var tData = document.createElement("td");
    tData.className = "bold";
    tData.colSpan = info.length;
    tData.textContent = "Computers";
    tRow.appendChild(tData);
    table.appendChild(tRow);

    var tRow = document.createElement('tr');
    
    for (let i = 0; i < info.length; i++) {
        var tData = document.createElement('td');
        tData.textContent = info[i];
        tRow.appendChild(tData);
    }

    
    table.appendChild(tRow);
    
    document.getElementById("logic_table").innerHTML = table.outerHTML;
    

}
logic_table();