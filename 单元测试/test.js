import chai from 'chai';
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

describe('describe a test', () => {

    it('should return true', () => {
        let example = true;
        // expect
        expect(example).not.to.equal(false);
        expect(example).to.equal(true);
        // should
        example.should.equal(true);
        example.should.be.a('boolean');
        [1, 2].should.have.length(2);
    });

    it('should check an object', () => {
        // 对于多层嵌套的Object而言..
        let nestedObj = {
            a: {
                b: 1
            }
        };
        let nestedObjCopy = Object.assign({}, nestedObj);
        nestedObj.a.b = 2;

        // do a function to change nestedObjCopy.a.b
        expect(nestedObjCopy).to.deep.equal(nestedObj);
        expect(nestedObjCopy).to.have.property('a');
    });
});