define(function () {
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

	return {Node:Node, Tree:Tree};
});