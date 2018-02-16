$(document).ready(init);
$(document).keypress(handle_keypress);

var game = {
    size_ratio: 1,
    completion: 0,
    completion_steps: 10,
    energy: {
        value: 2,
        decrease: function (count) {
            if (game.energy.value < 0)
                return game.over("sleep");

            game.energy.value -= count;
            if (game.energy.value <= 0)
                return game.tired();
        },
        increase: function (count) {
            game.energy.value += count;
            if (game.energy.value > 0)
                return game.awaken();
        }
    },
    tired: function() {
        ui.tired();
        command_output_append("You are now tired!");
    },
    awaken: function() {
        var tired = $("#tired")[0];
        if (tired != undefined) {
            tired.parentElement.removeChild(tired);
        }
    },
    consume: function(name, action) {
        var item = inventory.items[name];
        if (item == undefined) {
            command_output("You don't have any " + name + " to " + action + "!");
            return false;
        }

        if (item.actions.indexOf(action) < 0) {
            command_output("How exactly would you " + action + " " + name + "?");
            return false;
        }

        item.value -= 1;
        if (item.value <= 0)
            inventory.remove(name);

        game.energy.increase(3);
        return true; // Don't decrease energy!
    },
    drink: function(name) {
        if (game.consume(name, "drink"))
            command_output("GLURP GLURP GLURP! You feel regenerated!");
        return false;
    },
    eat: function(name) {
        if (game.consume(name, "eat"))
            command_output("NOM NOM NOM! You feel regenerated!");
        return false;
    },
    code: function() {
        game.completion += 1;
        return true;
    },
    over: function(how) {
        if (how ==  "sleep")
            command_output("You fell asleep!");
    }
}


function handle_keypress(e) {
    if (e.key == "Backspace") {
        command_backspace();
    }
    else if (e.key == "Enter") {
        command_handle();
    }
    else if (e.key.length == 1) {
        command_insert(e.key);
    }
}


function init() {
    body = $("body");
    rooms_init(game);
    room_enter("kitchen");
    room_update();
}
