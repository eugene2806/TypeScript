"use strict";
var DigitCapacity;
(function (DigitCapacity) {
    DigitCapacity[DigitCapacity["TEN"] = 10] = "TEN";
    DigitCapacity[DigitCapacity["ONE_HUNDRED"] = 100] = "ONE_HUNDRED";
    DigitCapacity[DigitCapacity["ONE_THOUSAND"] = 1000] = "ONE_THOUSAND";
    DigitCapacity[DigitCapacity["ONE_MILLION"] = 1000000] = "ONE_MILLION";
    DigitCapacity[DigitCapacity["ONE_BILLION"] = 1000000000] = "ONE_BILLION";
    DigitCapacity[DigitCapacity["ONE_TRILLION"] = 1000000000000] = "ONE_TRILLION";
    DigitCapacity[DigitCapacity["ONE_QUADRILLION"] = 1000000000000000] = "ONE_QUADRILLION";
    DigitCapacity[DigitCapacity["MAX"] = 8007199254740992] = "MAX";
})(DigitCapacity || (DigitCapacity = {}));
const LESS_THAN_TWENTY = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
];
const TENTHS_LESS_THAN_HUNDRED = [
    'zero',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
];
function toWords(number) {
    const num = number;
    if (!isFinite(num)) {
        throw new TypeError(`Not a finite number: ${number} (${typeof number})`);
    }
    let words = generateWords(num, []);
    return words;
}
function generateWords(number, words) {
    let remainder = 0;
    let word = '';
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    if (!words.length) {
        words = [];
    }
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }
    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];
    }
    else if (number < DigitCapacity.ONE_HUNDRED) {
        remainder = number % DigitCapacity.TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / DigitCapacity.TEN)];
        if (remainder) {
            word += `-${LESS_THAN_TWENTY[remainder]}`;
            remainder = 0;
        }
    }
    else if (number < DigitCapacity.ONE_THOUSAND) {
        remainder = number % DigitCapacity.ONE_HUNDRED;
        word = `${generateWords(Math.floor(number / DigitCapacity.ONE_HUNDRED), [])} hundred`;
    }
    else if (number < DigitCapacity.ONE_MILLION) {
        remainder = number % DigitCapacity.ONE_THOUSAND;
        word = `${generateWords(Math.floor(number / DigitCapacity.ONE_THOUSAND), [])} thousand,`;
    }
    else if (number < DigitCapacity.ONE_BILLION) {
        remainder = number % DigitCapacity.ONE_MILLION;
        word = `${generateWords(Math.floor(number / DigitCapacity.ONE_MILLION), [])} million,`;
    }
    else if (number < DigitCapacity.ONE_TRILLION) {
        remainder = number % DigitCapacity.ONE_BILLION;
        word = `${generateWords(Math.floor(number / DigitCapacity.ONE_BILLION), [])} billion,`;
    }
    else if (number < DigitCapacity.ONE_QUADRILLION) {
        remainder = number % DigitCapacity.ONE_TRILLION;
        word = `${generateWords(Math.floor(number / DigitCapacity.ONE_TRILLION), [])} trillion,`;
    }
    else if (number <= DigitCapacity.MAX) {
        remainder = number % DigitCapacity.ONE_QUADRILLION;
        word = `${generateWords(Math.floor(number / DigitCapacity.ONE_QUADRILLION), [])} quadrillion,`;
    }
    words.push(word);
    return generateWords(remainder, words);
}
console.log(toWords(132));
