import { expect } from 'chai';
import Trie  from '../lib/Trie.js'
import Node from '../lib/Node.js'
import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n');


describe('Insert', () => {

  it('should be a function', () => {
    expect(Trie).to.be.a('function');
  })

  it('should be able to insert words into the trie', () => {
    let trie = new Trie();
    trie.insert('race');
    trie.insert('rain');
    console.log(JSON.stringify(trie, null, 2));
    expect(trie.root.child.)
  })

  it('should not insert a word twice' () => {

  })

  it('should find children nodes' () => {

  })

  it('should ')

});

describe('Suggest', () => {

  it('should suggest a word when given a letter', () => {
    let trie = new Trie();
        trie.insert('pizza');
        trie.insert('apple');
        trie.insert('appeal');
    expect(trie.suggest('piz')).to.deep.equal(['pizza']);
  })

  it('should not be case sensitive', () => {

  trie.insert('cheese');
  trie.insert('cheesy');

  assert.deepEqual(trie.suggest('cheeS'),
  [ 'cheese', 'cheesy' ] );
  });
});

describe('Populate', () => {

  it('should populate a dictionary', () => {
    let trie = new Trie();
        trie.populate(dictionary);
    expect(trie.count).to.equal(235886)
  })

});

describe('Select', () => {

  it('should increment word influence every time a word is selected', () => {
    var trie = new Trie();
        trie.insert('pie');
        expect(trie.root.children.p.children.i.children.e.frequency).to.equal(0);
        trie.select('pie');
        expect(trie.root.children.p.children.i.children.e.frequency).to.equal(1);
        trie.select('pie');
        expect(trie.root.children.p.children.i.children.e.frequency).to.equal(2)
  })

});

