var command_in = $("#cmd-input");
var command_out = $("#cmd-output");
var command_updated = false;

var aliases = {
    "goto ": "enter ",
    "go to ": "enter ",
    "go ": "enter ",
<<<<<<< HEAD
    "grab": "take",
    "put down": "drop",
=======
    "grab ": "take ",
>>>>>>> 793c61c1b53d69cef3b3c59da0ac7552a84cb08a
    "wc": "toilet",
    "dorway": "doorway",
    "kichen": "kitchen",
    "kichen": "kitchen",
    "berdoom": "bedroom",
	"energy drink": "energy",
	"engine": "car",
	"stashon": "station",
	"gas station": "station",
	"gas stashon": "station",
	"drusgtor": "drugstore",
	"drugs": "drugstore",
	"sation": "shop",
	"raido": "radio",
	"cofefe": "coffee",
	"enegry": "pack",
	"no slep plls": "pills",
	"plls": "pills",
	"no sleep plls": "pills",
	"no slep pills": "pills",
};

function command_parse(cmd) {
    for (var alias in aliases) {
        if (cmd.startsWith(alias)) {
            cmd = aliases[alias] + cmd.substring(alias.length, cmd.length);
        }
    }
    
    cmd = cmd.split(" ");
    if (cmd[1] != undefined)
        cmd[1] = command_parse(cmd[1])[0];
    console.log(cmd);
    return cmd;
}

function command_handle(text) {
    raw_cmd = command_in.text();
    raw_cmd = raw_cmd.substring(3, raw_cmd.length);
    command_in.text(">> ");
    var cmd = command_parse(raw_cmd);
    var result = false;

    if (cmd[0] == "eat")
        result = game.eat(cmd[1]);
    else if (cmd[0] == "drink")
        result = game.drink(cmd[1]);
    else 
        result = room_handle_command(cmd);

    if (!command_updated)
        command_output("Now is not the time to " + raw_cmd + "!");
    if (result)
        game.energy.decrease(1);

    command_updated = false;

    inventory.update();
    room_update();
    console.log("ENERGY: " + game.energy.value);
}

function command_backspace() {
    var text = command_in.text();
    if (text.length > 3)
        command_in.text(text.substring(0, text.length - 1));
}

function command_insert(key) {
    command_in.text(command_in.text() + key);
}

function command_output(text) {
    command_updated = true;
    command_out.text(text);
}

function command_output_append(text) {
    command_out.text(command_out.text() + " - " + text);
}
