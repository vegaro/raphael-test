(function () {
    'use strict';
    var height = 4;
    require(['tree_objects'], function(tree_objects) {
        var tree = new tree_objects.Tree(height);
        var random, random_father, node, parents_array;
        for (var current_height = 0; current_height < height; current_height++) {
            // Create a random number of nodes for level i, if i = 0 create father
            random = (current_height === 0 ? 1 : Math.floor((Math.random() * 10) + 1));
            console.log("Number of nodes for height " + current_height + ": " + random);
            for (var i = 0; i < random; i++) {
                node = new tree_objects.Node(tree.get_number_of_children(), current_height);
                if (current_height !== 0) {
                    // Choose a random father and assign
                    parents_array = tree.get_nodes_for_level(current_height-1);
                    random_father = (current_height === 1 ? 0 : Math.floor(Math.random() * parents_array.length));
                    parents_array[random_father].add_child(node);
                }
                tree.add_node(node);
            }
        }
        console.log(tree);
        tree.draw("container", 600, 600);
    });
    



}());
