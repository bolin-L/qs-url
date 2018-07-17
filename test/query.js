import { expect } from 'chai';
import query from '../lib/query';

describe('Query', () => {
    describe('#parseUrl', () => {
        const urlInfo = query.parseUrl(['', 'http://www.bolin.site/user/?id=1#/user/info?name=lbl&userId=456']);

        it('should be return Object when parseUrl', () => {
            expect(typeof urlInfo).to.equal('object');
        });

        it('should be equal http://www.bolin.site/user/ of urlInfo.url', () => {
            expect(urlInfo.url).to.equal('http://www.bolin.site/user/');
        });

        it('should be equal {id: "1"} of urlInfo.query', () => {
            expect(urlInfo.query.id).to.equal("1");
        });

        it('should be equal /user/info?name=lbl&userId=456 of urlInfo.hash', () => {
            expect(urlInfo.hash).to.equal('/user/info?name=lbl&userId=456');
        });
    })

    describe('#getQuery', () => {
        const urlInfo = query.getQuery(['', 'http://www.bolin.site/user/?id=1#/user/info?name=lbl&userId=456']);

        it('should be return Object when parseUrl', () => {
            expect(typeof urlInfo).to.equal('object');
        });

        it('should be equal http://www.bolin.site/user/ of urlInfo.url', () => {
            expect(urlInfo.url).to.equal('http://www.bolin.site/user/');
        });

        it('should be equal {id: "1"} of urlInfo.query', () => {
            expect(urlInfo.query.id).to.equal("1");
        });

        it('should be equal /user/info?name=lbl&userId=456 of urlInfo.hash', () => {
            expect(urlInfo.hash).to.equal('/user/info?name=lbl&userId=456');
        });
    })
});