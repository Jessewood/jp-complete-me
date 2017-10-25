import Node from './Node.js';


export default class Trie {
  constructor() {
    this.root = new Node('');
    this.count = 0;
    this.suggestionArray = [];
    this.selections = {};
  }
  insert(word) {
    this.count++;
    this.word = word.split('');
    let currentNode = this.root;
    let childNode = this.root.children;

      this.word.forEach( letter => {
        if (!childNode[letter]) {
          childNode[letter] = new Node(letter);
        }
        currentNode = currentNode.children[letter];
        childNode = childNode[letter].children
      });

  currentNode.wordEnd = true;
}

  suggest(word) {
    let wordArray = word.split('');
    let currentNode = this.root;

    wordArray.forEach( letter => {
      currentNode = currentNode.children[letter]
      if(currentNode === null) {
        return null;
    }
  });

    return this.suggestedWords( currentNode, wordArray.join(''));
  }

  suggestedWords( currentNode, word) {
    let childrenLetters = Object.keys(currentNode.children);
    let suggestions = [];

    childrenLetters.forEach( childLetter => {
      let letterNode = currentNode.children[childLetter];
      let newWord = word + childLetter;

      if (letterNode.children === {}) {
          suggestions.push(newWord);

      } else if (letterNode.wordEnd) {
          suggestions.push(newWord);
          suggestions.push(...this.suggestedWords(letterNode, newWord));
      } else {
        suggestions.push(...this.suggestedWords(letterNode, newWord))  
      }
    });
    return suggestions;
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

  count() {
    return this.count;
  }

  select(word) {
    if (this.selections[word]) {
      this.selections[word]++;
    } else {
      this.selection[word]= 1;
    }
  }

  prioritizeSuggestions(suggestions) {
    suggestions.forEach(word => {
      if(!this.selections[word]) {
        this.selection[word] = 0;
      }
      for (let j = 0; j < suggestions.length; j++) {
        for (let i = 0; i < suggestions.length -1; i++) {
          if (this.selections[suggestions[i]] < this.selections[suggestions[i + 1]]) {
            let temp = suggestions[i];
            suggestions[i] = suggestions[i+1];
            suggestions[i + 1] = temp;
          }
        }
      }
      return suggestions;
    })
  }
};

