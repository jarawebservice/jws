var expect = require("chai").expect
var should = require("chai").should()
var addTwo = require("../index").addTwo
describe("Test the behavior of addTwo()", function() {
    it('should return 2 when given 1 and 1 via expect()', function() {
        expect(addTwo(1, 1)).to.be.equal(2)
    })
    it('should not return 3 when given 1 and 1 via should()', function() {
        addTwo(1, 1).should.not.be.equal(3)
    })
})