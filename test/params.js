import { expect } from 'chai';
import params from '../lib/params';

const EXAMPLE_URL = 'http://www.bolin.site/user/?id=1&status=success#/user/info?name=lbl&userId=456';

describe('Params', () => {
    describe('#getParams', () => {
        it('should be return Object when no fields', () => {
            const paramsInfo = params.getParams('', EXAMPLE_URL);

            expect(typeof paramsInfo).to.equal('object');
        });

        it('should be return {name: lbl, userId: 456} when no fields', () => {
            const paramsInfo = params.getParams('', EXAMPLE_URL);

            expect(paramsInfo).to.deep.equal({name: 'lbl', userId: '456'});
        });

        it('should be return {name: lbl, userId: 456} when fields is array', () => {
            const paramsInfo = params.getParams(['name', 'userId'], EXAMPLE_URL);

            expect(paramsInfo).to.deep.equal({name: 'lbl', userId: '456'});
        });

        it('should be return lbl when fields is name', () => {
            const name = params.getParams('name', EXAMPLE_URL);

            expect(name).to.equal("lbl");
        });

        it('should be return undefined when fields is age', () => {
            const name = params.getParams('age', EXAMPLE_URL);

            expect(name).to.equal(undefined);
        });
    });
});