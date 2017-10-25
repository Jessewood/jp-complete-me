import { expect } from 'chai';
import Node from '../lib/Node.js'
import Trie from '../lib/Trie.js'


describe('Node test', () => {

  beforeEach(() => {
    node = new Node()


  it('should be a thing', () => {
    expect(node).to.exist
  })

  it.skip('should start with null as a default', () => {
    expect(node.letter).to.equal(null)
  })

  it.skip('should have no children', () => {
    expect(node.children).to.deep.equal({});
  })
})
})