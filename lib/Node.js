class Node {
  constructor(letter) {
    this.letter = letter;
    this.children = {};
    this.wordEnd = false;
    this.frequency = 0;
  }
}

module.exports = Node