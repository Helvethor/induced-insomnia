var rooms = {
    "office": {
        "assets": {
            "coffee": {
                "autoload": true,
                "x": 300,
                "y": 200
            }
        }
    }
};

function room_enter(name) {
    if (rooms[name] == undefined) {
        console.log("Unknown room name: " + name);
        return;
    }
    var background = new Image();
    var room = $("#room");
    room.css("background-image", "url(image/rooms/" + name + ".png)");

    var assets = rooms[name].assets;
    for (var key in assets) {
        var asset = assets[key];
        if (asset.autoload) {
            room_show_asset(key, asset);
        }
    }
}

function room_show_asset(key, asset) {
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
    image.src = "image/assets/" + key + ".png";
}

function rooms_init(game) {
    var container = $("#container");
    room = $("#room");
    game.size_ratio = container.width() / 800;
    room.width(game.size_ratio * 800);
    room.height(game.size_ratio * 450);
}
