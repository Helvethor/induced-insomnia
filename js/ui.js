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

    }
};
