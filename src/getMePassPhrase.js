/* eslint-disable no-console */

const zxcvbn = require('zxcvbn');
const Words = require('./words/wordsCapitalized.json');

// Takes an array and returns an random element from it!

const randomItem = (arr) => {
    const arrLen = arr.length;
    if (arrLen > 1) {
        const index = Math.floor(Math.random() * (Math.floor(arrLen) - 1) + 1);
        return arr[index];
    }

    return arr[0];
};

const letterReplacer = (str) => {
    let localStr = str;

    // Replace SomeLetters with some numbers!
    // s -> 5, e ->3, i -> 1, o -> 0
    const replaceObj = { s: 5, e: 3, i: 1, o: 0 };

    for (const [letter, number] of Object.entries(replaceObj)) {
        if (str.includes(letter)) {
            localStr = localStr.replace(letter, number);
        }
    }

    return localStr;
};

const parseOptions = (values) => {
    const localOptions = {
        numWords: Number(values.numWords),
        minLength: Number(values.minLength),
        specialChars: values.specialChars.split(''),
        numbersInPass: values.numbersInPass === 'Yes',
        replace: values.replace,
    };

    return localOptions;
};

const getMePassPhrase = (values) => {
    let generatedPassword = '';
    const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const WordKeys = [1, 2, 3, 4, 5, 6, 7];

    const { numWords, minLength, specialChars, numbersInPass, replace } = parseOptions(values);

    // Need to change the while Loop!
    while (generatedPassword.length <= minLength) {
        // Loop for atleast numWords times.
        for (let i = 0; i < numWords - 1; i += 1) {
            // Select randomly the 'length' of the word in current iteration
            // Once, it is selected, select the array of that length
            const indexToInWords = randomItem(WordKeys);
            const arrayTo = Words[indexToInWords];

            // Post selecting length array, randomly Pick an element
            generatedPassword += randomItem(arrayTo);
            generatedPassword += randomItem(specialChars);
        }
    }

    // attach a number at end!
    if (!/[0-9]/.test(generatedPassword) && numbersInPass) {
        generatedPassword += randomItem(numbersArray);
    }

    // Replace predefined letters with numbers
    if (replace) {
        generatedPassword = letterReplacer(generatedPassword);
    }

    return {
        pwd: generatedPassword,
        len: generatedPassword.length,
        crackTime: zxcvbn(generatedPassword).crack_times_display.online_throttling_100_per_hour,
    };
};

export default getMePassPhrase;
