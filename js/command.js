var command_in = $("#cmd-input");
var command_out = $("#cmd-output");
var command_updated = false;

var aliases = {
    "goto ": "enter ",
    "go out": "exit",
    "go back": "exit",
    "go to ": "enter ",
    "go ": "enter ",
    "grab": "take",
    "put down": "drop",
    "wc": "toilet",
    "dorway": "doorway",
    "hallway": "doorway",
    "kichen": "kitchen",
    "berdoom": "bedroom",
	"energy drink": "energy",
	"engine": "car",
	"motor": "car",
	"stashon": "station",
	"gas station": "station",
	"gas stashon": "station",
    "drugstore": "drugstore",
    "drugs" : "drugstore",
	"drusgtor": "drugstore",
	"drugz": "drugstore",
	"sation": "shop",
	"raido": "radio",
	"cofefe": "coffee",
	"cafe": "coffee",
	"enegry": "pack",
	"no slep plls": "pills",
	"plls": "pills",
	"no sleep plls": "pills",
	"no sleep pills": "pills",
	"no slep pills": "pills",
    "cup" : "coffee",
    "mug" : "coffee",
    "can": "energy",
    "redbull": "energy",
    "outside": "outdoor",
    "closet": "wardrobe",
    "armory": "wardrobe", // U n3v3r no o dumb te user is
    "armoire": "wardrobe",
    "dorway": "doorway",
    "house": "doorway",
    "cash": "wallet",
    "money": "wallet",
    "$": "wallet",
    "dollar": "wallet",
};

var ignored_words = [
    "a", "an", "of", "the", "for", "by", "with", "before", "after", "my"
];

function command_ignore_words(cmd) {
    var words = cmd.split(" ");
    for (var i in words)  {
        var j = ignored_words.indexOf(words[i]);
        if (j >= 0) {
            words.splice(i, 1);
        }
    }
    return words.join(" ");
}

function command_parse(cmd) {
    console.log("cmd input: " + cmd);
    cmd = command_ignore_words(cmd);
    console.log("cmd ignored: " + cmd);
    for (var alias in aliases) {
        if (cmd.startsWith(alias)) {
            cmd = aliases[alias] + cmd.substring(alias.length, cmd.length);
        }
    }
    
    cmd = cmd.split(" ");
    if (cmd[1] != undefined)
        cmd[1] = command_parse(cmd.slice(1,cmd.length).join(" "))[0];
    console.log(cmd);
    return cmd;
}

function command_handle(text) {
    raw_cmd = command_in.text().toLowerCase();
    raw_cmd = raw_cmd.substring(3, raw_cmd.length);
    command_in.text(">> ");
    var cmd = command_parse(raw_cmd);
    cmd = cmd.slice(0, cmd.length > 2 ? 2 : cmd.length);
    var result = false;
    if (cmd[0] == "eat")
        result = game.eat(cmd[1]);
    else if (cmd[0] == "drink")
        result = game.drink(cmd[1]);
    else if (cmd[0] == "sleep")
        result = game.over("You slept for 7 months. You didn't finish your game. You lost your job.");
    else if (cmd[0] == "die")
        result = game.over("You died... just plain old died...");
    else if (cmd[0] == "something") {
        command_output("Smart gril... But this won't help you kode!");
        result = false;
    } else if(cmd[0] == "shit") {
        command_output("Congrats! You shat your pants! But it's not the right game...");
        result = false;
    } else if(cmd[0] == "fap") {
        command_output("You did it. It doesn't help much, but you did it nevertheless...");
        result = false;
    } else if(cmd[0] == "do") {
        if (cmd[1] == "barrel")
            command_output("You did a barrel roll!");
        else if (cmd[1] == "drugs")
            command_output("You're high... It's bad to do drugz you know?");
        result = false;
    } else if(cmd[0] == "sudo") {
        game.energy.increase(100);
        command_output("Now playing god mode. ;)");
    }
    else if(cmd[0] == "mix"){
        game.mix(cmd[1], cmd[2]);
    }else if(cmd[0] == "test"){
        command_output("Everything seems fine.");
    }
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
