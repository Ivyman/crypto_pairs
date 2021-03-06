import Config from './config';
import { Helpers } from './helpers';

class Api {
    constructor() {
        this.apiUrl = Config.apiUrl;
    }

    _changeUpDetection(change) {
        return change < 0;
    }

    _countPercentage(change, price) {
        let percents = change / (price / 100);
        let result = '';

        if (percents < 1) {
            result = percents.toString().replace('-', '');
            result = result < 1 ? '< 1' : (+result).toFixed(2);
        } else {
            result = percents.toFixed(2);
        }
        return result;
    }

    _prettyPriceFormat(price) {
        let convertedPrice = price;

        if (convertedPrice > 1) {
            convertedPrice = (+convertedPrice).toFixed(4);
            convertedPrice = convertedPrice.toString();
            convertedPrice = convertedPrice.split('.');

            let firstPart = convertedPrice[0];
            firstPart = firstPart
                .split('')
                .reverse()
                .join('');
            firstPart = firstPart.match(/.{1,3}/g);

            firstPart = firstPart.map(item => {
                return item + ',';
            });

            firstPart = firstPart
                .join('')
                .split('')
                .reverse();
            firstPart.shift();
            convertedPrice = `${firstPart.join('')}.${convertedPrice[1]}`;
        }

        return convertedPrice;
    }

    get getBaseCurrenciesList() {
        return [...Config.currencies.crypto];
    }

    get getTargetCurrenciesList() {
        return [...Config.currencies.fiat, ...Config.currencies.crypto];
    }

    get getAffiliateLink() {
        return { ...Config.affiliateLink };
    }

    currencyRate(currencyCoinOne, currencyCoinTwo) {
        let baseCoin = currencyCoinOne.toLowerCase();
        let targetCoin = currencyCoinTwo.toLowerCase();

        return fetch(`${this.apiUrl}/ticker/${baseCoin}-${targetCoin}`, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(resp => resp['ticker'])
            .then(resp => ({
                id: Helpers.getRandomNumber('api'),
                base: resp.base,
                target: resp.target,
                price: this._prettyPriceFormat(resp.price),
                change: resp.change,
                changePercents: this._countPercentage(resp.change, resp.price),
                changeUp: !this._changeUpDetection(resp.change)
            }));
    }
}

export default new Api();
