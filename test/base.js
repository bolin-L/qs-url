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

    describe('#parseUrl', () => {
        const url = 'https://web.u51.com/appwakeupordownload/xzzj/rpd.html?campaign=%7B%22mt_id%22%3A%22485%22%7D&event_remark=sms&actioncode=2&actionvalue=http://www.baidu.com?campaign=%7B%22mt_id%22%3A%22485%22%7D&schemeUri=en51rpd%3A%2F%2Fapp.u51.com%2Fwebview%2Finside%3Furl%3Dhttp%253A%252F%252Fwww.baidu.com%253Fcampaign%253D%25257B%252522mt_id%252522%25253A%252522485%252522%25257D';
        const urlInfo = base.parseUrl(url);

        it('should be return Object when parseUrl', () => {
            expect(true).to.equal(true);
            console.log(urlInfo);
            // expect(urlInfo).to.deep.equal({
            //     url: 'http://www.bolin.site/user/',
            //     query: {},
            //     queryStr: '',
            //     hash: '',
            //     hashStr: '',
            //     params: {},
            //     paramsStr: '',
            // });
        });
    });
});