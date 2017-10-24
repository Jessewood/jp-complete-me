import { expect } from 'chai';
import Trie  from '../lib/Trie.js'
import Node from '../lib/Node.js'
import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n');


describe('Trie test', () => {

  it('should be a function', () => {
    expect(Trie).to.be.a('function');
  })

  it('should be able to insert a word into the trie', () => {
    var completion = new Trie();
    completion.insert('race');
    completion.insert('rain');
    console.log(JSON.stringify(completion, null, 2));
  })

  it('should populate a dictionary', () => {
    var completion = new Trie();
        completion.populate(dictionary);
    expect(completion.count).to.equal(235886)
  })
})