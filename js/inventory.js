var inventory = {
    items: {},
    update: function() {
        $("#inventory").empty();
        for (var name in inventory.items) {
            var image = new Image();
            image.src = "image/assets/" + name + ".png";
            image.style.height = "50px";
            image.style.float = "right";
            $("#inventory")[0].append(image);
        }
        console.log("INVENTORY");
        console.log(inventory.items);
    },
    add: function(name, item) {
        inventory.items[name] = item;
    },
    remove: function(name) {
        var item = inventory.items[name];
        delete inventory.items[name];
        return item;
    }
};
