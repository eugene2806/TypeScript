
enum DigitCapacity {
 TEN = 10,
 ONE_HUNDRED = 100,
 ONE_THOUSAND = 1000,
 ONE_MILLION = 1000000,
 ONE_BILLION = 1000000000,
 ONE_TRILLION = 1000000000000,
 ONE_QUADRILLION = 1000000000000000,
 MAX = 8007199254740992
}
const LESS_THAN_TWENTY: string[] = [
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

const TENTHS_LESS_THAN_HUNDRED: string[] = [
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

function toWords(number: number): string {
  const num = number;

  if (!isFinite(num)) {
    throw new TypeError(`Not a finite number: ${number} (${typeof number})`);
  }

  let words: string = generateWords(num, []);
  return words;
}

function generateWords(number:number, words:string[]): string {
  let remainder: number = 0;
  let word: string = '';

 
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
  } else if (number < DigitCapacity.ONE_HUNDRED) {
    remainder = number % DigitCapacity.TEN;
    word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / DigitCapacity.TEN)];
   
    if (remainder) {
      word += `-${LESS_THAN_TWENTY[remainder]}`;
      remainder = 0;
    }
  } else if (number < DigitCapacity.ONE_THOUSAND) {
    remainder = number % DigitCapacity.ONE_HUNDRED;
    word = `${generateWords(Math.floor(number / DigitCapacity.ONE_HUNDRED), [])} hundred`;
  } else if (number < DigitCapacity.ONE_MILLION) {
    remainder = number % DigitCapacity.ONE_THOUSAND;
    word = `${generateWords(Math.floor(number / DigitCapacity.ONE_THOUSAND), [])} thousand,`;
  } else if (number < DigitCapacity.ONE_BILLION) {
    remainder = number % DigitCapacity.ONE_MILLION;
    word = `${generateWords(Math.floor(number / DigitCapacity.ONE_MILLION), [])} million,`;
  } else if (number < DigitCapacity.ONE_TRILLION) {
    remainder = number % DigitCapacity.ONE_BILLION;
    word = `${generateWords(Math.floor(number / DigitCapacity.ONE_BILLION), [])} billion,`;
  } else if (number < DigitCapacity.ONE_QUADRILLION) {
    remainder = number % DigitCapacity.ONE_TRILLION;
    word = `${generateWords(Math.floor(number / DigitCapacity.ONE_TRILLION), [])} trillion,`;
  } else if (number <= DigitCapacity.MAX) {
    remainder = number % DigitCapacity.ONE_QUADRILLION;
    word = `${generateWords(Math.floor(number / DigitCapacity.ONE_QUADRILLION), [])} quadrillion,`;
  }

  words.push(word);
  return generateWords(remainder, words);
}

console.log(toWords(132));
