define(["../public/vendor/raphael/raphael"], function (Raphael) {
    var paper;
    var NODE_SIZE = 15;
    var Tree = function (height) {
        this.nodes = [];
        this.height = height;
        this.number_of_children = 0;
    };
    Tree.prototype.get_number_of_children = function () {
        return this.number_of_children;
    };
    Tree.prototype.get_nodes_for_level = function (level) {
        return this.nodes[level];
    };
    Tree.prototype.add_node = function (node) {
        if (this.nodes[node.get_height()] === undefined) {
            this.nodes[node.get_height()] = [];
        }
        this.nodes[node.get_height()].push(node);
        this.number_of_children += 1;
    };
    Tree.prototype.toString = function () {
        var string = "[";
        for (var i = this.nodes.length - 1; i >= 0; i--) {
            string += "[" + this.nodes[i].toString() + "]";
        }
        string += "]";
        return string;
    };
    Tree.prototype.draw = function (container_id, w, h) {
        var container = document.getElementById(container_id);
        paper = new Raphael(container, w, h);
        this.nodes[0][0].draw(paper.canvas.offsetLeft + paper.width/2, 60, NODE_SIZE, paper.width);
    };

    var Node = function (value, height) {
        this.children = [];
        this.value = value;
        this.height = height;
    };
    Node.prototype.get_value = function () {
        return this.value;
    };
    Node.prototype.get_height = function () {
        return this.height;
    };
    Node.prototype.add_child = function (node) {
        this.children.push(node);
    };
    Node.prototype.toString = function () {
        var string = "value: " + this.value + "; height: " + this.height + "; children: ";
        for (var i = this.children.length - 1; i >= 0; i--) {
            string += " " + this.children[i].get_value();
        }
        return string;
    };

    Node.prototype.draw = function (node_x, node_y, size, width) {
        console.log('draw ' + this.value);

        paper.circle(node_x, node_y, size);
        paper.text(10+node_x, node_y, this.value);

        // console.log("Middle point " + middle_point);
        var son_y = node_y + 60;
        for (var i = 0; i < this.children.length; i++) {
            var son_x = i*(width/(this.children.length)) + width/(this.children.length*2) + (node_x-(width/2));
            // Draw line
            paper.path( ["M", node_x, node_y, "L", son_x, son_y] );
            var son_area_width = width/this.children.length;
            var son_size = (son_area_width > 40 ? NODE_SIZE : (son_area_width/2) - 2);
            console.log(son_area_width + " " + son_size);
            this.children[i].draw(son_x, son_y, son_size, son_area_width);
        }

    };

    return {Node:Node, Tree:Tree};
});