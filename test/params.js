import { expect } from 'chai';
import params from '../src/params';

const EXAMPLE_URL = 'http://www.bolin.site/user/?id=1&status=success#/user/info?name=lbl&userId=456';

describe('Params', () => {
    describe('#getParams', () => {
        it('should be return Object when no fields', () => {
            const paramsInfo = params.getParams('', EXAMPLE_URL);

            expect(typeof paramsInfo).to.equal('object');
        });

        it('should be return {name: lbl, userId: 456} when no fields', () => {
            const paramsInfo = params.getParams('', EXAMPLE_URL);

            expect(paramsInfo).to.deep.equal({ name: 'lbl', userId: '456' });
        });

        it('should be return {name: lbl, userId: 456} when fields is array', () => {
            const paramsInfo = params.getParams(['name', 'userId'], EXAMPLE_URL);

            expect(paramsInfo).to.deep.equal({ name: 'lbl', userId: '456' });
        });

        it('should be return lbl when fields is name', () => {
            const name = params.getParams('name', EXAMPLE_URL);

            expect(name).to.equal('lbl');
        });

        it('should be return undefined when fields is age', () => {
            const name = params.getParams('age', EXAMPLE_URL);

            expect(name).to.equal(undefined);
        });
    });

    describe('#addParams', () => {
        const BASE_URL = 'http://www.bolin.site';

        it(`should be return ${BASE_URL}?#id=2 when input {id: 2}`, () => {
            const url = params.addParams({ id: 2 }, BASE_URL);

            expect(url).to.equal(`${BASE_URL}#?id=2`);
        });

        it(`should be return ${BASE_URL}#?id=2&status=success when input {id: 2, status: 'success'}`, () => {
            const url = params.addParams({ id: 2, status: 'success' }, BASE_URL);

            expect(url).to.equal(`${BASE_URL}#?id=2&status=success`);
        });

        it(`should be return ${BASE_URL}#/?id=2&status=success when input {status: 'success'}`, () => {
            const url = params.addParams({ status: 'success' }, `${BASE_URL}#/?id=2`);

            expect(url).to.equal(`${BASE_URL}#/?id=2&status=success`);
        });

        it(`should be return ${BASE_URL}#/user/info?id=2&status=success when input {id: 2, status: 'success'}`, () => {
            const url = params.addParams({ id: 2, status: 'success' }, `${BASE_URL}#/user/info`);

            expect(url).to.equal(`${BASE_URL}#/user/info?id=2&status=success`);
        });

        it(`should be return ${BASE_URL}#/user/info when input''`, () => {
            const url = params.addParams('', `${BASE_URL}#/user/info`);

            expect(url).to.equal(`${BASE_URL}#/user/info`);
        });
    });

    describe('#removeParams', () => {
        const BASE_URL = 'http://www.bolin.site';

        it(`should be return ${BASE_URL} when input null`, () => {
            const url = params.removeParams(null, BASE_URL);

            expect(url).to.equal(`${BASE_URL}`);
        });

        it(`should be return ${BASE_URL} when input null`, () => {
            const url = params.removeParams(null, `${BASE_URL}#?id=1&status=success`);

            expect(url).to.equal(`${BASE_URL}`);
        });

        it(`should be return ${BASE_URL} when input id`, () => {
            const url = params.removeParams('id', `${BASE_URL}#?id=1`);

            expect(url).to.equal(`${BASE_URL}`);
        });

        it(`should be return ${BASE_URL} when input ['id']`, () => {
            const url = params.removeParams(['id'], `${BASE_URL}#?id=1`);

            expect(url).to.equal(`${BASE_URL}`);
        });

        it(`should be return ${BASE_URL} when input ['id', 'status']`, () => {
            const url = params.removeParams(['id', 'status'], `${BASE_URL}#?id=1&status=success`);

            expect(url).to.equal(`${BASE_URL}`);
        });

        it(`should be return ${BASE_URL}#/user/info?id=1 when input 'status'`, () => {
            const url = params.removeParams('status', `${BASE_URL}#/user/info?id=1&=status=success`);

            expect(url).to.equal(`${BASE_URL}#/user/info?id=1`);
        });

        it(`should be return ${BASE_URL}?name=lbl#/user/info when input ['id', 'status']`, () => {
            const url = params.removeParams(['id', 'status'], `${BASE_URL}?name=lbl#/user/info?id=1&status=success`);

            expect(url).to.equal(`${BASE_URL}?name=lbl#/user/info`);
        });
    });
});
