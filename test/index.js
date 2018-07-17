'use strict';
import baseUrl from '../lib/baseUrl';
import qsUrl from '../index';
import { query } from './query';
import { params } from './params';

describe('setBaseUrl', () => {
    const url = 'http://www.bolin.site/user/?id=1#/user/info?name=lbl&userId=456';

    it(`should be ${url} when setBaseUrl`, () => {
        qsUrl.setBaseUrl(url);
        expect(baseUrl).to.equal(url);
    })
});