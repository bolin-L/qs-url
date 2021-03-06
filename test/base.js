import base from '../src/base.js';
import qsUrl from '../src/index.js';
// import { expect } from 'chai';
const expect = require('chai').expect;

const EXAMPLE_URL = 'http://www.bolin.site/user/?id=1#/user/info?name=lbl&userId=456';

describe('Base', () => {
    describe('#getUrl', () => {
        it('should be \'\' when get', () => {
            expect(base.getUrl()).to.equal('');
        });
    });

    describe('#formatOptions', () => {
        it('should be {url: \'\'} when get', () => {
            expect(base.formatOptions()).to.deep.equal({ url: '' });
        });
    });

    describe('#setUrl', () => {
        it(`should be ${EXAMPLE_URL} when set`, () => {
            base.setUrl(EXAMPLE_URL);
            expect(base.getUrl()).to.equal(EXAMPLE_URL);
        });
    });

    describe('#getBaseUrl', () => {
        it(`should be ${EXAMPLE_URL} when get`, () => {
            expect(qsUrl.getBaseUrl()).to.equal(EXAMPLE_URL);
        });
    });

    describe('#setBaseUrl', () => {
        const url = 'http://www.bolin.site/user/';

        it(`should be ${url} when setBaseUrl`, () => {
            qsUrl.setBaseUrl(url);
            expect(qsUrl.getBaseUrl()).to.equal(url);
        });
    });

    describe('#parseUrl', () => {
        const urlInfo = base.parseUrl('');

        it('should be return empty Object when parseUrl input empty', () => {
            expect(urlInfo).to.deep.equal({
                url: '',
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
        const urlInfo = base.parseUrl('@##$$%');

        it('should be return empty Object when parseUrl input unmatched', () => {
            expect(urlInfo).to.deep.equal({
                url: '',
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
        const urlInfo = base.parseUrl('12345abcdef');

        it('should be return empty Object when parseUrl input incorrect string', () => {
            expect(urlInfo).to.deep.equal({
                url: '12345abcdef',
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
        const urlInfo = base.parseUrl(EXAMPLE_URL);

        it('should be return Object when parseUrl that already set baseUrl', () => {
            expect(urlInfo).to.deep.equal({
                url: 'http://www.bolin.site/user/',
                query: { id: '1' },
                queryStr: 'id=1',
                hash: '/user/info',
                hashStr: '/user/info?name=lbl&userId=456',
                params: { name: 'lbl', userId: '456' },
                paramsStr: 'name=lbl&userId=456',
            });
        });
    });

    describe('#parseUrl', () => {
        const urlInfo = base.parseUrl('http://www.bolin.site/a/b/?test=lb?l12/#/image/c/d?name=lbl&age=#123&phoneSource=#ffff?');

        it('should be return Object when parseUrl that already set baseUrl', () => {
            expect(urlInfo).to.deep.equal({
                url: 'http://www.bolin.site/a/b/',
                query: { test: 'lb?l12/' },
                queryStr: 'test=lb?l12/',
                hash: '/image/c/d',
                hashStr: '/image/c/d?name=lbl&age=#123&phoneSource=#ffff?',
                params: { name: 'lbl', age: '#123', phoneSource: '#ffff?' },
                paramsStr: 'name=lbl&age=#123&phoneSource=#ffff?',
            });
        });
    });

    describe('#parseUrl', () => {
        const urlInfo = base.parseUrl(EXAMPLE_URL);

        it('should be return Object when parseUrl', () => {
            expect(urlInfo).to.deep.equal({
                url: 'http://www.bolin.site/user/',
                query: { id: '1' },
                queryStr: 'id=1',
                hash: '/user/info',
                hashStr: '/user/info?name=lbl&userId=456',
                params: { name: 'lbl', userId: '456' },
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
            expect(urlInfo).to.deep.equal({
                url: 'https://web.u51.com/appwakeupordownload/xzzj/rpd.html',
                queryStr: 'campaign=%7B%22mt_id%22%3A%22485%22%7D&event_remark=sms&actioncode=2&actionvalue=http://www.baidu.com?campaign=%7B%22mt_id%22%3A%22485%22%7D&schemeUri=en51rpd%3A%2F%2Fapp.u51.com%2Fwebview%2Finside%3Furl%3Dhttp%253A%252F%252Fwww.baidu.com%253Fcampaign%253D%25257B%252522mt_id%252522%25253A%252522485%252522%25257D',
                query:
                    {
                        campaign: '{"mt_id":"485"}',
                        event_remark: 'sms',
                        actioncode: '2',
                        actionvalue: 'http://www.baidu.com?campaign={"mt_id":"485"}',
                        schemeUri: 'en51rpd://app.u51.com/webview/inside?url=http%3A%2F%2Fwww.baidu.com%3Fcampaign%3D%257B%2522mt_id%2522%253A%2522485%2522%257D',
                    },
                hash: '',
                hashStr: '',
                paramsStr: '',
                params: {},
            });
        });
    });

    describe('#parseUrl2', () => {
        const url = 'https://bolin.site:80/a/b/?test=lb?l12/#/image/c/d?name=lbl&age=#123&phoneSource=#ffff?';
        const parts = base.parseUrl2(url);

        it('should be return Object when parseUrl2', () => {
            expect(parts).to.deep.equal({
                protocol: 'https://',
                protocolPure: 'https',
                hostPortPath: 'bolin.site:80/a/b/',
                host: 'bolin.site',
                port: ':80',
                portPure: '80',
                path: '/a/b/',
                search: '?test=lb?l12/',
                searchKvPairs: 'test=lb?l12/',
                hash: '#/image/c/d',
                hashPure: 'image/c/d',
                params: '?name=lbl&age=#123&phoneSource=#ffff?',
                paramsKvPairs: 'name=lbl&age=#123&phoneSource=#ffff?',
            });
        });
    });
});
