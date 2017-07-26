const { expect } = require('chai');

const config = require('../../../config');

describe('Config', () => {
    it('expect config to contain port', () => {
        expect(config.port).to.be.a('number');
    });
    it('expect config to contain connectionStr', () => {
        expect(config.connectionStr).to.be.a('string');
    });
    it('expect config to contain sessionSecret', () => {
        expect(config.sessionSecret).to.be.a('string');
    });
});
