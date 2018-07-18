import { expect } from 'chai';
import query from '../lib/query';

const EXAMPLE_URL = 'http://www.bolin.site/user/?id=1&status=success#/user/info?name=lbl&userId=456';

describe('Query', () => {
    describe('#parseUrl', () => {
        const urlInfo = query.parseUrl(['', EXAMPLE_URL]);

        it('should be return Object when parseUrl', () => {
            expect(typeof urlInfo).to.equal('object');
        });

        it('should be equal http://www.bolin.site/user/ of urlInfo.url', () => {
            expect(urlInfo.url).to.equal('http://www.bolin.site/user/');
        });

        it('should be equal {id: "1", status: "success"} of urlInfo.query', () => {
            expect(urlInfo.query.id).to.equal("1");
            expect(urlInfo.query.status).to.equal("success");
        });

        it('should be equal /user/info?name=lbl&userId=456 of urlInfo.hash', () => {
            expect(urlInfo.hash).to.equal('/user/info?name=lbl&userId=456');
        });
    });

    describe('#getQuery', () => {
        it('should be return Object when no fields', () => {
            const queryInfo = query.getQuery('', EXAMPLE_URL);

            expect(typeof queryInfo).to.equal('object');
        });

        it('should be return {id: "1", status: "success"} when no fields', () => {
            const queryInfo = query.getQuery('', EXAMPLE_URL);

            expect(queryInfo.id).to.equal("1");
            expect(queryInfo.status).to.equal("success");
        });

        it('should be return {id: "1", status: "success"} when fields is array', () => {
            const queryInfo = query.getQuery(['id', 'status'], EXAMPLE_URL);

            expect(queryInfo.id).to.equal("1");
            expect(queryInfo.status).to.equal("success");
        });

        it('should be return 1 when fields is id', () => {
            const id = query.getQuery('id', EXAMPLE_URL);

            expect(id).to.equal("1");
        });
    });

    describe('#addQuery', () => {
        const BASE_URL = 'http://www.bolin.site';

        it(`should be return ${BASE_URL}?id=2 when input {id: 2}`, () => {
            const url = query.addQuery({id: 2}, BASE_URL);

            expect(url).to.equal(`${BASE_URL}?id=2`);
        });

        it(`should be return ${BASE_URL}?id=2&status=success when input {id: 2, status: 'success'}`, () => {
            const url = query.addQuery({id: 2, status: 'success'}, BASE_URL);

            expect(url).to.equal(`${BASE_URL}?id=2&status=success`);
        });

        it(`should be return ${BASE_URL}?id=2&status=success when input {status: 'success'}`, () => {
            const url = query.addQuery({status: 'success'}, `${BASE_URL}?id=2`);

            expect(url).to.equal(`${BASE_URL}?id=2&status=success`);
        });

        it(`should be return ${BASE_URL}?id=2&status=success#/user/info?name=lbl when input {id: 2, status: 'success'}`, () => {
            const url = query.addQuery({id: 2, status: 'success'}, `${BASE_URL}#/user/info?name=lbl`);

            expect(url).to.equal(`${BASE_URL}?id=2&status=success#/user/info?name=lbl`);
        });
    });

    describe('#replaceQuery', () => {
        const BASE_URL = 'http://www.bolin.site';

        it(`should be return ${BASE_URL}?id=2 when input {id: 2}`, () => {
            const url = query.addQuery({id: 2}, BASE_URL);

            expect(url).to.equal(`${BASE_URL}?id=2`);
        });

        it(`should be return ${BASE_URL}?id=2&status=success when input {id: 2, status: 'success'}`, () => {
            const url = query.addQuery({id: 2, status: 'success'}, BASE_URL);

            expect(url).to.equal(`${BASE_URL}?id=2&status=success`);
        });

        it(`should be return ${BASE_URL}?id=2&status=success when input {status: 'success'}`, () => {
            const url = query.addQuery({status: 'success'}, `${BASE_URL}?id=2`);

            expect(url).to.equal(`${BASE_URL}?id=2&status=success`);
        });

        it(`should be return ${BASE_URL}?id=2&status=success#/user/info?name=lbl when input {id: 2, status: 'success'}`, () => {
            const url = query.addQuery({id: 2, status: 'success'}, `${BASE_URL}#/user/info?name=lbl`);

            expect(url).to.equal(`${BASE_URL}?id=2&status=success#/user/info?name=lbl`);
        });
    })
});