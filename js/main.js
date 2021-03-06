$(document).ready(init);
$(document).keydown(handle_keypress);

var game = {
    size_ratio: 1,
    completion: 0,
    completion_steps: 10,
    radio_on: false,
    energy: {
        value: 1,
        decrease: function (count) {
            if (game.energy.value < 0) {
                if (room_current == "road"
                    || room_current == "outdoor_in"
                    || room_current == "station_in"
                    || room_current == "drugstore_in"){
                	room_sound("crash");
                	return game.over("You done goofed ina cra accricident!");

                }
                room_sound("sleep");
                return game.over("You fell asleep! The code was not finished and you were fried!");
            }

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
        ui.awaken();
        command_output_append("You are not tired anymore!");
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

        game.energy.increase(item.duration);
        return true;
    },
    drink: function(name) {
    	if(room_current == "toilet" && name == undefined){
    		room_sound("drink");
            command_output("GLURP GLURP GLURP! This toilet water had a strange aftertaste...");
    	}
        else if (game.consume(name, "drink")){
        	room_sound("drink");
            command_output("GLURP GLURP GLURP! You feel regenerated!");
        }

        return false;
    },
    eat: function(name) {
        if (game.consume(name, "eat")){
            command_output("NOM NOM NOM! You feel regenerated!");
            room_sound("eat");
        }

        return false;
    },
    code: function() {
        game.completion += 1;
        room_sound("code");
        if (game.completion >= game.completion_steps)
            game.over("U deed it! Teh kode is complit, it is garbaege butt komplettt!", true);
        else
            command_output("U kode lik urin teh xxM4TR1Xxx!");
        return true;
    },
    turn_on_radio: function() {
    	if (game.radio_on)
    		command_output("Radio already on and playing some fire beats !");
    	else{
    		game.energy.increase(4);
    		game.radio_on=true;
    		room_sound("slam");
    		command_output("Turning radio on. It's your favorite song, Slam Jam !")
    	}
    	return false;
    },
    over: function(how, win) {
        ui.game_over(how, win);
    },
    mix: function(item1, item2) {
    	var item = inventory.items[item1];
    	if (item == undefined){
    		command_output("You can't mix what you don't have!");
    		return false;
    	}
    	item = inventory.items[item2];
    	if (item == undefined){
    		command_output("You can't mix what you don't have!");
    		return false;
    	}
    	game.over("The room fills with darkness, as your unholy beverage sparks with energy. What you created was not meant for mortals, and the gods are angered. Their mighty wrath detroys your soul in one instant, ending your life. You did not finish the game.");
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
    room_enter("office");
    room_update();
}
