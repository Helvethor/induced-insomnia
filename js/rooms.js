var rooms = {
    "office": {
        "assets": {
            "coffee": {
                "autoload": true,
                "actions": ["take", "drink"],
                "value": 2,
                "x": 180,
                "y": 360
            }
        },
        "rooms": [
            "toilet",
            "doorway"
        ],
        "commands": {
            "code": function () { return game.code(); }
        },
        "update": room_office_update,
    },
    "toilet": {
        "assets": {
            "pills": {
                "autoload": true,
                "actions": ["take", "eat"],
                "x": 730,
                "y": 140
            }
        },
        "commands": {
        },
        "rooms": [
            "office"
        ],
        "exit": "office",
    },
    "doorway": {
        "assets": {
            "key": {
                "autoload": true,
                "actions": ["take"],
                "x": 435,
                "y": 87
            }
        },
        "commands": {
        },
        "rooms": [
            "office",
            "kitchen",
            "bedroom",
            "outside",
        ],
        "exit": "outside"
    },
    "kitchen": {
        "assets": {
            "fridge": {
                "autoload": "close",
                "actions": ["open", "close"],
                "contains": "energy",
                "x": 400,
                "y": 140
            },
            "energy": {
                "autoload": false,
                "actions": ["take", "drink"],
                "x": 420,
                "y": 180
            }
        }
    }
};

var room_current = undefined;

function room_handle_command(cmd) {

    if (cmd[0] == "enter")
        return room_enter(cmd[1]);
    else if (cmd[0] == "exit")
        return room_enter(rooms[room_current].exit);
    else if (cmd[0] == "take")
        return room_take(cmd[1]);
    else if (cmd[0] == "open")
        return room_open(cmd[1]);
    else if (cmd[0] == "close")
        return room_close(cmd[1]);

    var commands = rooms[room_current].commands;
    if (commands != undefined && commands[cmd] != undefined)
        return commands[cmd]();

    return false;
}

function room_enter(name) {
    console.log("target: " + name);
    console.log("current: " + room_current);
    if (room_current != undefined && rooms[room_current].rooms.indexOf(name) < 0) {
        command_output("There is no such place!");
        return false;
    }

    var background = new Image();
    var room = $("#room");

    while (room[0].firstChild) {
        room[0].removeChild(room[0].firstChild);
    }

    room.css("background-image", "url(image/rooms/" + name + ".png)");

    var assets = rooms[name].assets;
    for (var key in assets) {
        var asset = assets[key];
        if (asset.autoload) {
            room_add_asset(key, asset);
        }
    }

    if (room_current != undefined)
        command_output("You went to the " + name);
    room_current = name;
    return true;
}

function room_take(name) {
    var asset = rooms[room_current].assets[name];

    if (asset == undefined) {
        command_output("Where did you see a " + name + "?");
        return false;
    }

    if (asset.actions.indexOf("take") < 0) {
        command_output("You are too weak to take " + name + "!");
        return false;
    }

    if (!room_remove_asset(name)) {
        command_output("Where did you see a " + name + "?");
        return false;
    }

    inventory.add(name, asset);
    asset.autoload = false;

    command_output("You grabbed the " + name + "!");
    return true;
}

function room_close(key) {
    return room_asset_do(key, "close");
}

function room_open(key) {
    if (room_asset_do(key, "open")) {
        var assets = rooms[room_current].assets;
        for (var contained in assets[key].contained) {
            room_add_asset(contained, assets[contained]);
        }
        return true;
    }
    return false;
}

function room_asset_do(key, verb) {
    console.log(verb + " " + key);
    var asset = rooms[room_current].assets[key];

    if (asset == undefined) {
        command_output("There is no such thing to " + verb + "!");
        return false;
    }

    if (asset.actions.indexOf(verb) < 0) {
        command_output("How exactly would you " + verb + " " + key + "?");
        return false;
    }

    room_remove_asset(key);
    asset.autoload = verb;
    room_add_asset(key, asset);
    return true;
}

function room_add_asset(key, asset) {
    var id = "asset-" + key;
    console.log("autoload " + id);
    var image = document.getElementById(id);

    if (image == undefined) {
        image = new Image();
        image.id = "asset-" + key;
    }

    image.onload = function() {
        console.log(image.width);
        image.style.left = asset.x * game.size_ratio + "px";
        image.style.top = asset.y * game.size_ratio + "px";
        image.style.width = image.width * game.size_ratio + "px";
        image.style.height = image.height * game.size_ratio + "px";
        image.style.position = "relative";
        $("#room").append(image);
    };
    if (typeof asset.autoload == "string")
        key += "_" + asset.autoload;
    image.src = "image/assets/" + key + ".png";
}

function room_remove_asset(key) {
    var id = "asset-" + key;
    var image = document.getElementById(id);

    if (image != undefined) {
        image.parentElement.removeChild(image);
        return true;
    }
    return false;
}

function room_update() {
    var update = rooms[room_current].update;
    if (update != undefined)
        update();
}

function room_office_update() {
    console.log("office_update");
    var w = 100 * game.size_ratio;
    var h = 20 * game.size_ratio;
    
    var text = $("#completion-text")[0];
    if (text == undefined) {
        text = document.createElement("p");
        text.textContent = "GAME CODE";
        text.id = "completion-text";
        text.style.color = "green";
        text.style.position = "absolute";
        text.style.top = 230 * game.size_ratio;
        text.style.left = 360 * game.size_ratio;
        $("#room")[0].append(text);
    }

    var bar = $("#completion-bar")[0];
    if (bar == undefined) {
        bar = document.createElement("div");
        bar.id = "completion-bar";
        bar.style.width = w;
        bar.style.height = h;
        bar.style.position = "absolute";
        bar.style.top = 280 * game.size_ratio;
        bar.style.left = 360 * game.size_ratio;
        bar.style.border = "2px dotted green";
        $("#room")[0].append(bar);
    }
    else
        $("#completion-bar").empty();
    
    for (var i = 0; i < game.completion_steps; i++) {
        var chunk = document.createElement("div");
        chunk.style.width = w / game.completion_steps; 
        chunk.style.height = h;
        chunk.style.background = "green";
        chunk.style.float = "left";
        if (i >= game.completion)
            chunk.style.background = "transparent";
        bar.append(chunk);
    }
    console.log(bar);
    console.log("COMPLETION: " + game.completion);
}

function rooms_init(game) {
    var container = $("#container");
    room = $("#room");
    game.size_ratio = container.width() / 800;
    room.width(game.size_ratio * 800);
    room.height(game.size_ratio * 450);
}
