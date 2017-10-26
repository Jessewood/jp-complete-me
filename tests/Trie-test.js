import { expect } from 'chai';
import Trie  from '../lib/Trie.js';
import Node from '../lib/Node.js';
import fs from 'fs';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

let trie;

beforeEach(() => {
  trie = new Trie();
});

describe('Insert', () => {

  it('should be a method', () => {
    expect(Trie).to.be.a('function');
  });

  it('should have a root', () => {
    let node = new Node('');

    expect(trie.root).to.deep.equal(node);
  });

  it('should count words inserted into the trie', () => {
    trie.insert('dog');
    expect(trie.count).to.equal(1);
    trie.insert('cat');
    expect(trie.count).to.equal(2);
  });

  it('should not insert a word twice', () => {
    trie.insert('cake');
    expect(trie.count).to.equal(1);
    trie.insert('cake');
    expect(trie.count).to.equal(1);   
  });

  it('should be able to insert a word and the root should have children',
    () => {
      trie.insert('apple');
      expect(trie.root.children.a.letter).to.be.equal('a');
      expect(trie.root.children.a.children.p.letter).to.equal('p');
    });
});

describe('Suggest', () => {

  it('should be a method', () => {
    expect(trie.suggest).to.be.a('function');
  });

  it('should return an array', () => {
    expect(trie.suggest('')).to.deep.equal([]);
  });

  it('should suggest words from the dictionary', () => {
    trie.populate(dictionary);
    trie.insert('pizz');
    expect(trie.suggest('pizz')).to.include.members(['pizza', 'pizzeria']);
  });

  it('should suggest a word when given a letter', () => {
    trie.insert('pizza');
    trie.insert('apple');
    trie.insert('appeal');
    expect(trie.suggest('piz')).to.deep.equal(['pizza']);
  });

  it('should not be case sensitive', () => {
    trie.insert('cheese');
    trie.insert('Cheesy');
    expect(trie.suggest('CHEE')).to.deep.equal( [ 'cheese', 'cheesy' ] );
  });

  it('should not suggest words if the word does not exist', () => {
    trie.populate(dictionary);
    trie.insert('xj');
    expect(trie.suggest('xj')).to.deep.equal([]);
  });
  it('should move words with a higher frequency to the front of the suggestions array', () => {
    trie.insert('car');
    trie.insert('card');
    trie.insert('cart');
    expect(trie.suggest('ca')).to.deep.equal((['car', 'card', 'cart']));
    trie.select('cart');
    expect(trie.suggest('ca')).to.deep.equal((['cart', 'car', 'card']));
  });
});

describe('Populate', () => {

  it('should be a method', () => {
    expect(trie.populate).to.be.a('function');
  });

  it('should populate a dictionary', () => {
    trie.populate(dictionary);
    expect(trie.count).to.equal(234371);
  });

});

describe('Count', () => {
  it('should return 0 by default', () => {
    expect(trie.count).to.equal(0);
  });

  it('should return the word count', () => {
    trie.insert('pop');
    trie.insert('pie');
    expect(trie.count).to.equal(2);
  });
});

describe('Select', () => {

  it('should be a method', () => {
    expect(trie.select).to.be.a('function');
  });

  it('should increment word frequency every time a word is selected', () => {
    trie.insert('pie');
    expect(trie.root.children.p.children.i.children.e.frequency).to.equal(0);
    trie.select('pie');
    expect(trie.root.children.p.children.i.children.e.frequency).to.equal(1);
    trie.select('pie');
    expect(trie.root.children.p.children.i.children.e.frequency).to.equal(2);
  });

});

