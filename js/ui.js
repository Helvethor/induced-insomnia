var ui = {
    tired: function() {
        var image = $("#tired")[0];
        if (image != undefined)
            return;
        image = new Image();
        image.src = "image/ui/tired.png";
        image.id = "tired";
        image.style.width = game.size_ratio * image.width;
        image.style.height = game.size_ratio * image.height;
        image.style.position = "absolute";
        image.style.top = 0;
        $("#ui")[0].append(image);
    },
    awaken: function() {
        var tired = $("#tired")[0];
        if (tired != undefined) {
            tired.parentElement.removeChild(tired);
        }
    },
    game_over: function(how, win) {
        var screen = document.createElement("div");
        screen.id = "game_over";
        screen.style.width = game.size_ratio * 800;
        screen.style.height = game.size_ratio * 450;
        screen.style.position = "absolute";
        screen.style.background = "black";
        screen.style.top = 0;
        var text = document.createElement("p");
        if (win) {
            text.innerHTML = "You won!<br>";
            text.style.color = "cyan";
        }
        else {
            text.innerHTML = "You lost!<br><br>";
            text.style.color = "red";
        }
        text.innerHTML += how + "<br><br>Press F5 to replay (intergated faturr!)";
        text.style.textAlign = "center";
        text.style.marginTop = 100;
        text.style.fontSize = 40;
        screen.append(text);
        $("#ui").append(screen);
    }
};
