function get_data_from_server() {
    return data = {
        "machine": "Stroj 1",
        "timestamp": Date.now(),
        "status": [{
            "control": "I",
            "label": "napajeni zapnuto",
            "state": Math.floor(Math.random() * 2)
        }, {
            "control": "START",
            "label": "START produkce",
            "state": Math.floor(Math.random() * 2)
        }, {
            "control": "STOP",
            "label": "STOP produkce",
            "state": Math.floor(Math.random() * 3)
        }, {
            "control": "sipka nahoru a dolu",
            "label": "zvedani krytu",
            "state": Math.floor(Math.random() * 2)
        }]
    }
}
get_data_from_server()

function save_data_to_server(data) {
    
    console.log(data);
}

function add_control(){
    var control_name = prompt("Zadejte nazev nove kontrolky")
    if(control_name != null){

        var control_label = prompt("Zadejte popis nove kontrolky")
        if(control_label != null){
            control_states = "";
            var finished = false;
            while (control_states != null && finished == false){
                var control_states = prompt("Zadejte pocet stavu nove kontrolky (1-3), [sviti ,nesviti ,blika]")               
                if(control_states != null && control_states < 4){//&& Number.isInteger(control_states) == true){
                //posledni status stroje...
                data.status[data.status.length] = {
                "control": String(control_name),
                "label": String(control_label),
                "state": Math.floor(Math.random() * control_states)
                }

                console.log("Byla pridana nova kontrolka: " + control_name + " (" + control_label + ") s poctem stavu: " + control_states)
                //Refresh stranky:
                //document.location.reload();
                //document.location.reload(true);
                //$("#body").html(htmlData);
                //body.innerHTML = ''
                main();
                finished = true;
                
                }else if (control_states == null){
                    console.log("Zadavani preruseno uzivatelem")
                }
                else {
                    console.log("Zadane cislo je mimo rozsah: (1-3)")
                }
            }           
        } else {
            console.log("Zadavani preruseno uzivatelem")
        }  
    }
}

function add_logic(){

}
function current_state_by_words(input){

    var combination_by_words = [];
    for (let i = 0; i < input.length; i++) {
        if(input[i] == 0){
            combination_by_words[i] =  state_behaviour.label[0].Task
        }
        if(input[i] == 1){
            combination_by_words[i] =  state_behaviour.label[1].Task
        }
        if(input[i] == 2){
            combination_by_words[i] =  state_behaviour.label[2].Task
        }         
    }
    combination_by_words = combination_by_words.toString().replace(/\,\,/g, ',');
    return combination_by_words;
}

//Funkce pro upravu uzivatelem bez znalosti programovani:
//Prvne vyber logiky pro nastaveni zmeny:
function customise_logic(){

    var pick_successful = false;
    var state_pick = "";
    while(pick_successful == false && state_pick != null){
        var state_pick = prompt("U jakeho stavu chcete zmenit logiku kontrolek? \n(Vepiste cislo od 0 nebo cely nazev)");
        //pokud nebylo zruseno...
        if (state_pick != null) {
            if (state_pick != ""){
                for (let i = 0; i < state_data.logic.length; i++) {
                    if (state_pick.toString() == state_data.logic[i].state_label.toString() || state_pick == i){
                        console.log("Pro upravu byl zvolen stav s nazvem: " + state_data.logic[i].state_label + " a logikou stavu: " + state_data.logic[i].combination + 
                        " (" + current_state_by_words(state_data.logic[i].combination) + ") ")
                        selected_state = i;
                        pick_successful = true
                    }
                }    
                if (pick_successful == false){
                    console.log("mimo rozsah...")
                }
            } else {
                console.log("Nebylo nic zapsano")
            }  
        }
    }
    
    // Pokud bylo zvoleni uspesne, tak se definuji zmeny:
    if (pick_successful == true){
        //Osetreni pro spravny input ze strany uzivatele:
        var right_input = false;
        var change_successful = false;
        var repeat = true;
        var combination_change = "";

        while (right_input == false && repeat == true && combination_change != null){
            var combination_change = prompt("Jak si prejete zmenit zvolenou kombinaci? " + state_data.logic[selected_state].combination + 
            " ,tedy:\n "+ current_state_by_words(state_data.logic[selected_state].combination) + " ,vyuzijte stejneho ciselneho formatu")
            if (combination_change != null){
                var correct_numbers = 0;
                // Na (2*(state_data.logic[selected_state].combination.length)-1) se odkazuji vzhledem ke spravne delce, nize porovnavam se vstupem
                for (let i = 0; i < String(state_data.logic[selected_state].combination).length; i++) {
                    if (combination_change[i] > 2){
                        console.log(combination_change[i] + " je mimo rozsah moznych stavu kontrolky (zadejde cislo v rozsahu: 0-2)")
                    } else {
                        correct_numbers +=1;
                    }
                }
                combination_change = combination_change.replace(/\ /g, ',');
                combination_change = combination_change.replace(/\./g, ',');
                
            
                if ((combination_change.length == String(state_data.logic[selected_state].combination).length) && (correct_numbers == String(state_data.logic[selected_state].combination).length)){
                    right_input = true;
                } else {
                    console.log("spatne zadano, zkuste to prosim znovu")
                }
                if(right_input == true) {
                    //Probiha overovani...
                    //Pokud je rovno, netreba prepisovat + nesmi byt kombinace jiz obsazena (for cyklus)
                    if (state_data.logic[selected_state].combination != combination_change){
                        var match = false;
                        for (let i = 0; i < state_data.logic.length; i++) {
                            if (combination_change == state_data.logic[i].combination){
                                match = true;
                            }
                        }
                        if (match == false){
                            change_successful = true;
                            
                        } else {
                            console.log("Kombinace: " + combination_change + " je jiz zabrana")
                            var repeat = confirm("Kombinace: " + combination_change + " je jiz zabrana." + "\nPrejete si zkusit znovu? ")
                            if(repeat == true){
                                right_input = false;
                            } else {
                                console.log("prepis logiky prerusen uzivatelem")
                            }
                        }
                        
                    } else {
                        console.log("Kombinace je stejna, netreba menit");
                        var repeat = confirm("Kombinace je stejna, netreba menit.\nPrejete si zkusit znovu? ")
                        if(repeat == true){
                            right_input = false;
                        }else {
                            console.log("prepis logiky prerusen uzivatelem")
                        }   
                    }       
                }
            }  
        }
        //Kdyz je uspesne vlozen input je prepsana logika kontrolek...
        if (change_successful == true) {
            console.log("Kombinace " + state_data.logic[selected_state].combination + " (" + current_state_by_words(state_data.logic[selected_state].combination) + ") " +
            " pro stav s nazvem: " +  state_data.logic[selected_state].state_label + " (č.:" + selected_state + ")" + " ,byla zmenena na: " + combination_change + " (" + current_state_by_words(combination_change) + ") ")
                
            state_data.logic[selected_state].combination = combination_change;
        }        
    } 
}

//Vyjadreni chovani kontrolek slovy:
state_behaviour = {
    "label":[{
        "Task": "nesviti"
    },{
        "Task": "sviti"
    },{
        "Task": "blika"
    }]
}

//Urceni zadane logiky:
state_data = {
    "logic": [{
        "state_label": "vypnuti hlavniho vypinace",
        "combination": [0,0,0,0]
    }, {
        "state_label": "napeti vypnuto",
        "combination": [0,0,1,1]
    }, {
        "state_label": "napeti zapnuto",
        "combination": [1,0,0,1]
    }, {
        "state_label": "stroj vyrabi",
        "combination": [1,1,0,0]
    }, {
        "state_label": "chyba stroje",
        "combination": [1,0,2,1]
    }, {
        "state_label": "havarijni stop 1",
        "combination": [0,1,1,0]
    }, {
        "state_label": "havarijni stop 2",
        "combination": [0,0,2,1]
    }, {
        "state_label": "zaucovani stroje",
        "combination": [1,1,0,1]
    }]
}

//MAIN---------------------------------------------------------------------------------------------------------------------

function main(){
    

    document.write("Nazev stroje: " + data.machine);
    document.write("<br>");
    document.write("<h3>Stav stroje: </h3>");
    document.write("Kontrolka: ");
    document.write("<br>");
    //Vypis aktualnich nahodnych stavu kontrolek:
    var current_combination = [0,0,0,0]
    for (let i = 0; i < data.status.length; i++) {
        current_combination[i] = data.status[i].state
        document.write(data.status[i].control + ": " + data.status[i].label + ":" + " " + state_behaviour.label[data.status[i].state].Task + " (" + data.status[i].state + ")")
        document.write("<br>");
    }

    // Hledani shody nahodnych stavu s nastavenou logikou a prirazeni stavu stroje:
    var sum_of_bad_combinations = 0;
    var result = "";
   
    for (let i = 0; i < state_data.logic.length; i++) {
        if (current_combination.toString() == state_data.logic[i].combination.toString()){
            //console.log(state_data.logic[i].state_label)
            result = state_data.logic[i].state_label;
            document.write("<br>");
            document.write("Vysledek: " + state_data.logic[i].state_label)
            document.write("<br>");
     
        } else {
            sum_of_bad_combinations += 1;
        }
    }
    if (result == "chyba stroje"){
        var error_message = prompt("Chyba stroje\nVepiste poznamku/duvod chyby: ");
        save_data_to_server("timestamp: " + data.timestamp + ", stroj: " + data.machine + 
        ", stav stroje: "+ state_data.logic[4].state_label + ", poznamka: "+ error_message);
    }
    //Pokud nebyla nalezena jedina shoda:
    if (sum_of_bad_combinations == state_data.logic.length){
        document.write("<br>");  
        document.write("Vysledek: neplatny stav")
        document.write("<br>");  
    }
}

main();





