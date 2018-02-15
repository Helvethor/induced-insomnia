var rooms = {
    "office": {
        "assets": {
            "coffee": {
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
    var canvas = $("#room");
    canvas.css("background-image", "url(image/rooms/" + name + ".png)");
}

function rooms_init() {
    var container = $("#container");
    var room = $("#room");
    room.width(container.width());
    room.height(container.width() * 450 / 800);
}
