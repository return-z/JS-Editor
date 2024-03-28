const SPLIT_LENGTH = 10;
const JOIN_LENGTH = 5;

const REBALANCE_RATIO = 1.2;

export class RopeNode {
	constructor(str) {
		this.left = null;
		this.right = null;
		this.val = str;
		this.length = str.length;
		this.adjust(this);
	}

	adjust() {
		//split nodes if length greater than join length
		if (typeof this.val != 'undefined') {
			if (this.length > SPLIT_LENGTH) {
				var splitIdx = Math.floor(this.length / 2);
				var leftSplit = this.val.substring(0, splitIdx);
				var rightSplit = this.val.substring(splitIdx, this.val.length);
				this.left = new RopeNode(leftSplit);
				this.right = new RopeNode(rightSplit);
				delete this.val;
			}
		} else {
			//try to join nodes if they can be
			if (this.length < JOIN_LENGTH) {
				this.val = this.left.getLeaves() + this.right.getLeaves();
				delete this.left;
				delete this.right;
			}
		}
	}

	isLeaf() {
		return typeof this.left == 'undefined' && typeof this.right == 'undefined';
	}

	getLeaves() {
		if (typeof this.val != 'undefined') {
			return this.val;
		} else {
			return this.left.getLeaves() + this.right.getLeaves();
		}
	}

	insert(insertIdx, value) {
		if (insertIdx < 0 || insertIdx > this.length) {
			return;
		}
		if (typeof this.val != 'undefined') {
			console.log(this.val, insertIdx, this.val.length);
			this.val = this.val.substring(0, insertIdx) + value + this.val.substring(insertIdx);
			this.length = this.val.length;
		} else {
			var leftLen = this.left.length;
			if (insertIdx < leftLen) {
				this.left.insert(insertIdx, value);
			} else {
				this.right.insert(insertIdx - leftLen, value);
			}
			this.length = this.left.length + this.right.length;
		}
		this.adjust(this);
	}

	remove(start, end) {
		console.log('remove called with start: ', start, ' and end: ', end);
		if (start < 0 || end < 0 || start > this.length || end > this.length || start > end) {
			return;
		}
		if (typeof this.val != 'undefined') {
			var leftSplit = this.val.substring(0, start);
			var rightSplit = this.val.substring(end);
			this.val = leftSplit + rightSplit;
			this.length = this.val.length;
		} else {
			var leftLen = this.left.length;
			var leftStart = Math.min(leftLen, start);
			var leftEnd = Math.min(leftLen, end);
			var rightLen = this.right.length;
			var rightStart = Math.max(0, Math.min(rightLen, start - leftLen));
			var rightEnd = Math.max(0, Math.min(rightLen, end - leftLen));
			if (leftStart < leftLen) {
				this.left.remove(leftStart, leftEnd);
			}
			if (rightEnd > 0) {
				this.right.remove(rightStart, rightEnd);
			}
			this.length = this.left.length + this.right.length;
		}
		this.adjust(this);
	}

	rebuild() {
		if (typeof this.val == 'undefined') {
			this.val = this.left.getLeaves() + this.right.getLeaves();
			delete this.left;
			delete this.right;
			this.adjust(this);
		}
	}

	rebalance() {
		if (typeof this.val == 'undefined') {
			if (
				this.left.length / this.right.length > REBALANCE_RATIO ||
				this.right.length / this.left.length > REBALANCE_RATIO
			) {
				this.rebuild;
			} else {
				this.left.rebalance();
				this.right.rebalance();
			}
		}
	}

	walk() {
		if (this === null) {
			return;
		}
		if (this.left !== null) {
			this.left.walk();
		}
		console.log(this.val, this.length);
		if (this.right !== null) {
			this.right.walk();
		}
	}
}

/*var rope = new RopeNode(
  "This is my JS Tree. There are obviously more things to do but ok",
);
rope.adjust();
rope.walk();
console.log(rope.getLeaves());
console.log(rope.length);
rope.remove(5, 20);
rope.walk();
console.log(rope.getLeaves());
rope.insert(0, "Init string lel");
rope.walk();
console.log(rope.getLeaves());*/
