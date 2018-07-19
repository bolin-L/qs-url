import qsUrl from '../src/index';
import { expect } from 'chai';

const EXAMPLE_URL = 'http://www.bolin.site/user/?id=1#/user/info?name=lbl&userId=456';

describe('Index', () => {
    describe('#parse', () => {

        it(`should be {id: 1, status: success} when input id=1&status=success`, () => {
            expect(qsUrl.parse('id=1&status=success')).to.deep.equal({id: '1', status: 'success'});
        })
    });

    describe('#stringify', () => {

        it(`should be id=1&status=success when input {id: 1, status: success}`, () => {
            expect(qsUrl.stringify({id: '1', status: 'success'})).to.equal('id=1&status=success');
        })
    });

    describe('#parseUrl', () => {
        const urlInfo = qsUrl.parseUrl('http://www.bolin.site/user/?id=1#/user/info?name=lbl&userId=456');

        it('should be return Object when parseUrl that already set baseUrl', () => {
            expect(urlInfo).to.deep.equal({
                url: 'http://www.bolin.site/user/',
                query: {id: '1'},
                queryStr: 'id=1',
                hash: '/user/info',
                hashStr: '/user/info?name=lbl&userId=456',
                params: {name: 'lbl', userId: '456'},
                paramsStr: 'name=lbl&userId=456',
            });
        });
    });
});