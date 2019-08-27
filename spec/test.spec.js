const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../server')
const bookController = require('../controllers/bookController')
const { getLibrary, getBook, postBook, deleteBook } = require('../models/book');

const request = supertest(app)
const connection = require('../db/connection')

describe('Database', () => {
    beforeEach(() => connection.migrate
        .rollback()
        .then(() => connection.migrate.latest())
        .then(() => connection.seed.run()));
    after(() => connection.destroy());
    describe('getLibrary', () => {
        it('should return 3 starting books in the library if no limit is given', () => {
            return getLibrary()
            .then(res => expect(res).to.have.length(3))
            .done();
        });
        it('should return the amount of books passed in as a limit', () => {
            return getLibrary(2)
            .then(res => expect(res).to.have.length(2))
            .done();
        });
    });
    describe('getBook', () => {
        it('should return one book', () => {
            return getBook(1)
            .then(res => expect(res).to.have.length(1))
            .done();
        });
        it('should return the book matching the id passed in', () => {
            return getBook(1)
            .then(res => expect(res[0].title).to.equal("To Kill a Mockingbird (To Kill a Mockingbird, #1)"))
            .done()
        });
    });
    describe('postBook', () => {
        it('should return the newly added book', () => {
            const newBook = {
                title: 'Moby-Dick, or, the Whale',
                author: 'Herman Melville',
                description: "\"It is the horrible texture of a fabric that should be woven of ships' cables and hawsers. A Polar wind blows through it, and birds of prey hover over it.' So Melville wrote of his masterpiece, one of the greatest works of imagination in literary history. In part, Moby-Dick is the story of an eerily compelling madman pursuing an unholy war against a creature as vast and dangerous and unknowable as the sea itself. But more than just a novel of adventure, more than an encyclopaedia of whaling lore and legend, the book can be seen as part of its author's lifelong meditation on America. Written with wonderfully redemptive humour, Moby-Dick is also a profound inquiry into character, faith, and the nature of perception.This edition of Moby-Dick, which reproduces the definitive text of the novel, includes invaluable explanatory notes, along with maps, illustrations, and a glossary of nautical terms.",
                genre: "fiction",
              };
            const bookWithId = {id: 4, ...newBook}
            return postBook(newBook)
            .then(res => expect(res[0]).to.eql(bookWithId))
            .done()
        });
        it.skip('should increase the number of books in the library by one', () => {
            getLibrary(5, 1).then(res => console.log(res.length));
            let expectedNum = originalNum + 1;
            console.log('HERE ==>>', originalNum, expectedNum)
            const newBook = {
                title: 'Moby-Dick, or, the Whale',
                author: 'Herman Melville',
                description: "\"It is the horrible texture of a fabric that should be woven of ships' cables and hawsers. A Polar wind blows through it, and birds of prey hover over it.'",
                genre: "fiction",
              };            
            postBook(newBook)
            .then(getLibrary(5, 1))
            .then(res => expect(res.length).to.equal(expectedNum))
            .done();
        });
    });
});

