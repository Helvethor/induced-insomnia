$(document).ready(init);
$(document).keypress(handle_keypress);

var game = {
    size_ratio: 1,
    energy: 1,
    inventory: {}
}


function handle_keypress(e) {
    input = $("#cmd-input");
    text = input.text();
    if (e.key == "Backspace") {
        if (text.length > 3)
            input.text(text.substring(0, text.length - 1));
    }
    else if (e.key == "Enter") {
        handle_cmd(text.substring(3, text.length));
        input.text(">> ");
    }
    else if (e.key.length == 1) {
        input.text(text + e.key);
    }
}

function handle_cmd(text) {
    console.log(text);
}

function init() {
    body = $("body");
    rooms_init(game);
    room_enter("office");
}
