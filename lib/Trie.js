import Node from './Node.js';


export default class Trie {
  constructor() {
    this.root = new Node('');
    this.count = 0;
  }

  insert(word) {
    word = word.toLowerCase().split(''); 

    let currentNode = this.root;

    word.forEach( letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }

      currentNode = currentNode.children[letter];
    });

    if (!currentNode.wordEnd) {
      this.count++;
      currentNode.wordEnd = true;
    }
  }

  suggest(phrase) {
    phrase = phrase.toLowerCase().split(''); 
    let currentNode = this.root;

    phrase.forEach(letter => {
      currentNode = currentNode.children[letter];
    });
    if (!currentNode || !currentNode.children) {
      return [];
    } else {
      return this.findSuggestions(currentNode, phrase.join(''));
    }
  }

  findSuggestions(currentNode, phrase, suggestions = []) {
    let childrenLetters = Object.keys(currentNode.children); 

    childrenLetters.forEach(childLetter => {
      let letterNode = currentNode.children[childLetter];
      let newPhrase = phrase + childLetter;

      if (letterNode.wordEnd) {
        suggestions.push({
          word: newPhrase,
          freqCount: letterNode.frequency
        });
      }

      this.findSuggestions(letterNode, newPhrase, suggestions);
    });

    suggestions.sort((a, b) => {
      return b.freqCount - a.freqCount;
    });

    return suggestions.map(wordObj => {
      return wordObj.word;
    });
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }

  count() {
    return this.count;
  }

  select(word) {
    let currentNode = this.root;

    word = word.split('');
    word.forEach(letter => {
      currentNode = currentNode.children[letter];
    });
    currentNode.frequency++;
  }
}

