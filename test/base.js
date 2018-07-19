import base from '../src/base';
import qsUrl from '../src/index';
import { expect } from 'chai';

const EXAMPLE_URL = 'http://www.bolin.site/user/?id=1#/user/info?name=lbl&userId=456';

describe('Base', () => {
    describe('#getUrl', () => {

        it(`should be '' when get`, () => {
            expect(base.getUrl()).to.equal('');
        })
    });

    // describe('#getUrl', () => {
    //
    //     window.location.href = 'http://www.bolin.site/web';
    //
    //     it(`should be '' when get`, () => {
    //         expect(base.getUrl()).to.equal(window.location.href);
    //     })
    // });
    //
    // describe('#getUrl', () => {
    //
    //     window = undefined;
    //     weex.config.bundleUrl = 'http://www.bolin.site/weex';
    //
    //     it(`should be '' when get`, () => {
    //         expect(base.getUrl()).to.equal(weex.config.bundleUrl );
    //     })
    // });

    describe('#setUrl', () => {

        it(`should be ${EXAMPLE_URL} when set`, () => {
            base.setUrl(EXAMPLE_URL);
            expect(base.getUrl()).to.equal(EXAMPLE_URL);
        })
    });

    describe('#getBaseUrl', () => {

        it(`should be ${EXAMPLE_URL} when get`, () => {
            expect(qsUrl.getBaseUrl()).to.equal(EXAMPLE_URL);
        })
    });

    describe('#setBaseUrl', () => {
        const url = 'http://www.bolin.site/user/';

        it(`should be ${url} when setBaseUrl`, () => {
            qsUrl.setBaseUrl(url);
            expect(qsUrl.getBaseUrl()).to.equal(url);
        })
    });

    describe('#parseUrl', () => {
        const urlInfo = base.parseUrl(EXAMPLE_URL);

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

    describe('#parseUrl', () => {
        const urlInfo = base.parseUrl(EXAMPLE_URL);

        it('should be return Object when parseUrl', () => {
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

    describe('#parseUrl', () => {
        const url = 'http://www.bolin.site/user/';
        const urlInfo = base.parseUrl(url);

        it('should be return Object when parseUrl', () => {
            expect(urlInfo).to.deep.equal({
                url: 'http://www.bolin.site/user/',
                query: {},
                queryStr: '',
                hash: '',
                hashStr: '',
                params: {},
                paramsStr: '',
            });
        });
    });
});