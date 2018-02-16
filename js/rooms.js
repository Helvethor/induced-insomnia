 rooms = {
    "office": {
        "name": "office",
        "assets": {
            "coffee": {
                "autoload": true,
                "available": true,
                "actions": ["take", "drop", "drink"],
                "value": 2,
				"duration": 3,
                "x": 180,
                "y": 360
            },
            "pack_6": {
                "autoload": false,
                "available": false,
                "actions": ["take", "drop"],
                "value": 2,
				"duration": 2,
                "x": 580,
                "y": 360
            },
            "pack_6": {
                "autoload": false,
                "available": false,
                "actions": ["take", "drop"],
                "value": 2,
				"duration": 2,
                "x": 580,
                "y": 360
            },
            "pack_5": {
                "autoload": false,
                "available": false,
                "actions": ["take", "drop"],
                "value": 2,
				"duration": 2,
                "x": 580,
                "y": 360
            },
            "pack_4": {
                "autoload": false,
                "available": false,
                "actions": ["take", "drop"],
                "value": 2,
				"duration": 2,
                "x": 580,
                "y": 360
            },
            "pack_3": {
                "autoload": false,
                "available": false,
                "actions": ["take", "drop"],
                "value": 2,
				"duration": 2,
                "x": 580,
                "y": 360
            },
            "pack_2": {
                "autoload": false,
                "available": false,
                "actions": ["take", "drop"],
                "value": 2,
				"duration": 2,
                "x": 580,
                "y": 360
            },
            "pack_1": {
                "autoload": false,
                "available": false,
                "actions": ["take", "drop"],
                "value": 2,
				"duration": 2,
                "x": 580,
                "y": 360
            },
            "energy": { // fake asset, you take it when there is a pack_i on the desk
                "autoload": false,
                "available": false,
                "actions": ["drink"],
                "value": 3,
				"duration": 2,
                "x": 580,
                "y": 360
            }
        },
        "rooms": [
            "toilet",
            "doorway"
        ],
        "commands": {
            "code": function () { return game.code(); },
            "drop pack": function() { return room_drop("pack_6"); },
            "take energy": room_office_take_energy,
        },
        "update": room_office_update,
        "exit": "doorway",
    },
    "toilet": {
        "name": "toilet",
        "assets": {
            "pills": {
                "autoload": true,
                "available": true,
                "actions": ["take", "drop", "eat"],
				"value": 1,
				"duration": 5,
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
        "name": "doorway",
        "assets": {
            "key": {
                "autoload": true,
                "available": true,
                "actions": ["take", "drop"],
                "x": 435,
                "y": 87
            }
        },
        "commands": {
            "enter outdoor": function() {return room_enter("outdoor_out");},
        },
        "rooms": [
            "office",
            "kitchen",
            "bedroom",
            "outdoor_out",
        ],
        "exit": "outdoor_out"
    },
    "kitchen": {
        "name": "kitchen",
        "assets": {
            "fridge": {
                "autoload": "close",
                "available": true,
                "actions": ["open", "close"],
                "contains": ["energy"],
                "x": 400,
                "y": 140
            },
            "energy": {
                "autoload": false,
                "available": true,
                "actions": ["take", "drop", "drink"],
				"value": 3,
				"duration": 2,
                "x": 320,
                "y": 55
            }
        },
		"rooms": [
			"doorway",
		],
        "exit": "doorway"
	},
	"bedroom": {
        "name": "bedroom",
		"assets": {
			"drawer": {
				"autoload": "close",
                "available": true,
				"actions": ["open", "close"],
				"contains": ["wallet"],
				"x": 80,
				"y": 260
			},
			"wallet": {
				"autoload": false,
                "available": true,
				"actions": ["take", "drop"],
				"x": 10,
				"y": 170
			}
		},
		"rooms": [
			"doorway",
		],
        "exit": "doorway"
	},
    "outdoor_out": {
        "name": "outdoor",
        "rooms": [
            "doorway",
            "outdoor_in",
        ],
        "commands":{
            "enter car": function() {return room_enter("outdoor_in");},
        }
    },
    "outdoor_in": {
        "name": "outdoor",
        "commands": {
            "turn on radio" : function() {return game.turn_on_radio(); },
            "turn on raido" : function() {return game.turn_on_radio(); },
            "drive" : function() {
                if (inventory.items["key"]!=undefined)
                    return room_enter("road");
                return command_output("You may need a key to drive...");
            },
            "exit": function() {return room_enter("outdoor_out");},
            "get out": function() {return room_enter("outdoor_out");},
            "exit car": function() {return room_enter("outdoor_out");},
            "get out of car": function() {return room_enter("outdoor_out");},
        },
        "rooms": [
            "road",
            "outdoor_out",
        ],
    },
    "drugstore_in": {
        "name": "drugstore",
        "rooms": [
            "drugstore_out",
            "outdoor_in"
        ],
        "commands":{ 
            "exit": function() {return room_enter("drugstore_out");},
            "get out": function() {return room_enter("drugstore_out");},
            "exit car": function() {return room_enter("drugstore_out");},
            "get out of car": function() {return room_enter("drugstore_out");},
            "turn on radio" : function() {return game.turn_on_radio(); },
            "turn on raido" : function() {return game.turn_on_radio(); },
            "drive" : function() {return room_enter("outdoor_in");},
        },
        "exit": "drugstore_out"
    },
    "drugstore_out": {
        "name": "drugstore",
        "rooms": [
            "drugstore_in",
        ],
        "commands": {
            "enter drugstore": room_enter_drugs,
            "go in": room_enter_drugs,
            "enter car": function() {return room_enter("station_in");},
        },
    },
    "road": {
        "name": "road",
        "commands": {
            "turn left" : function() {return room_enter("drugstore_in");},
            "go left" : function() {return room_enter("drugstore_in");},
            "drive left" : function() {return room_enter("drugstore_in");},
            "turn right": function() {return room_enter("station_in");},
            "go right": function() {return room_enter("station_in");},
            "drive right": function() {return room_enter("station_in");},
            "enter drugstore": function() {return room_enter("drugstore_in");},
            "enter station": function() {return room_enter("station_in");},
            "turn on radio" : function() {return game.turn_on_radio(); },
            "turn on raido" : function() {return game.turn_on_radio(); },
        },
        "rooms": [
            "drugstore_in",
            "station_in",
        ],
    },
    "shop": {
        "name": "shop",
        "assets": {
            "pack_6": {
                "autoload": true,
                "available": true,
                "actions": ["take", "drop"],
                "value": 1,
				"duration": 2,
                "x": 240,
                "y": 290
            },
            "coffee": {
                "autoload": true,
                "available": true,
                "actions": ["take", "drop", "drink"],
                "value": 2,
				"duration": 3,
                "x": 40,
                "y": 290
            },
            "pills": {
                "autoload": true,
                "available": true,
                "actions": ["take", "drop", "eat"],
                "value": 1,
				"duration": 5,
                "x": 270,
                "y": 290
            }
        },
        "rooms": [
            "station_out"
        ],
        "commands": {
            "take pack": function() { return room_shop_take("pack_6"); },
            "take coffee": function() { return room_shop_take("coffee"); },
            "take pills": function() { return room_shop_take("pills"); },
            "pay": room_shop_pay,
            "exit": room_shop_exit,
        },
        "paid": false,
        "taken": false,
    },
    "station_in": {
        "name": "gas station",
    	"commands": { 
    		"exit": function() {return room_enter("station_out");},
    		"get out": function() {return room_enter("station_out");},
            "exit car": function() {return room_enter("station_out");},
            "get out of car": function() {return room_enter("station_out");},
            "turn on radio" : function() {return game.turn_on_radio(); },
            "turn on raido" : function() {return game.turn_on_radio(); },
            "drive" : function() {return room_enter("outdoor_in");},
    	},
        "rooms": [
            "station_out",
            "outdoor_in"
        ]
    },
    "station_out":{
        "name": "gas station",
        "commands": {
            "enter shop": function() {return room_enter("shop");},
            "enter car": function() {return room_enter("station_in");},
        },
        "rooms": [
            "station_in",
            "shop"
        ]

    }
};

var room_current = undefined;

function room_handle_command(cmd) {
    var commands = rooms[room_current].commands;
    if (commands != undefined){
        var str = cmd.join(" ");
        if(commands[str] != undefined)
            return commands[str]();
    }
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
    else if (cmd[0] == "drop")
        return room_drop(cmd[1]);

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

    if (room_current != undefined) {
        command_output("You went to the " + rooms[name].name);

        if (name == "office"
            || name == "toilet"
            || name == "doorway"
            || name == "kitchen"
            || name == "bedroom"
            || name == "outdoor_out"
            || name == "shop"
            || name == "station_out"
            || name == "drugstore_out"
            || name == "station_in" && room_current == "station_out"
            || name == "drugstore_in" && room_current == "drugstore_out"
            || name == "outdoor_in" && room_current == "outdoor_out")
            room_sound("steps");
        else if (name == "road"
            || room_current == "road"
            || name == "outdoor_in" && room_current == "drugstore_in"
            || name == "outdoor_in" && room_current == "station_in")
            room_sound("car");

    }
    room_current = name;
    return true;
}

function room_sound(name) {
    var audio = new Audio("sound/" + name + ".ogg");
    console.log(audio);
    audio.play();
}

function room_take(name) {
    var asset = rooms[room_current].assets[name];

    if (asset == undefined || !asset.available) {
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
    asset.available = false;

    command_output("You grabbed the " + name + "!");
    return true;
}

function room_drop(key) {
    var asset = inventory.items[key];
    if (asset == undefined) {
        command_output("How would you drop something you don't have? Dummy!");
        return false;
    }

    var assets = rooms[room_current].assets;
    if (assets[key] == undefined || assets[key].actions.indexOf("drop") < 0) {
        command_output("You can't drop " + key + " here!");
        return false;
    }

    if (assets[key].available) {
        command_output("There is already " + key + " here!");
        return false;
    }
    
    assets[key].available = true;
    room_add_asset(key, assets[key]);
    inventory.remove(key);
    command_output("You dropped " + key + "!");
    return true;
}

function room_close(key) {
    if (room_asset_do(key, "close")) {
        command_output("You opened the " + key + "!");
        return true;
    }
    return false;
}

function room_open(key) {
    if (room_asset_do(key, "open")) {
        command_output("You closed the " + key + "!");
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

    var assets = rooms[room_current].assets;
    for (var contained in assets[key].contains) {
        contained_key = assets[key].contains[contained];
        contained_asset = assets[contained_key];
        if (verb == "open") {
            contained_asset.autoload = true;
            room_add_asset(contained_key, contained_asset);
            console.log("SHOW");
            console.log(contained_asset);
        }
        else {
            contained_asset.autoload = false;
            room_remove_asset(contained_key);
            console.log("HIDE");
            console.log(contained_asset);
        }
    }

    return true;
}

function room_add_asset(key, asset) {
    var id = "asset-" + key;
    console.log("add asset " + id);
    
    if (!asset.available)
        return;

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
        chunk.style.width = w / game.completion_steps - 0.1; 
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

function room_enter_drugs() {
    command_output("The durgstor is closed! Ooohhh noooosesssss!");
    return false;
}

function room_shop_pay() {
    var wallet = inventory.items["wallet"];
    if (wallet == undefined) {
        command_output("You think everything is free? This is no communism, you need ca$h!");
        return false;
    }
    rooms["shop"].paid = true;
    inventory.remove("wallet");
    command_output("You gave your entire wallet to Divid Hassselhloof!");
    return true;
}

function room_shop_take(key) {
    if (room_take(key)) {
        rooms["shop"].taken = true;
        return true;
    }
    return false;
}

function room_shop_exit() {
    if (rooms["shop"].taken && !rooms["shop"].paid) {
        command_output("You thought you could steal from TEH DIVID HASSSELHLHLOOOF???")
        game.over("Divid Hassle...lele....ell...... David kicked the shit out of your filthy ass!");
        return false;
    }
    room_enter("station_out");
    return true;
}

function room_office_take_energy() {
    for (var i = 6; i > 0; i--) {
        var asset = rooms["office"].assets["pack_" + i];
        if (asset.available) {
            room_remove_asset("pack_" + i);
            i -= 1;
            asset.available = false;
            var asset = rooms["office"].assets["pack_" + i];
            asset.available = true;
            room_add_asset("pack_" + i, asset);
            var asset = rooms["office"].assets["energy"];
            inventory.add("energy", Object.assign({}, asset));
        }
    }
    console.log(rooms["office"].assets);
}

function rooms_init(game) {
    var container = $("#container");
    room = $("#room");
    game.size_ratio = container.width() / 800;
    room.width(game.size_ratio * 800);
    room.height(game.size_ratio * 450);
}
