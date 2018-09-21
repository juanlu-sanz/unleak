var unleak = function () {
    'use strict';

    //Variables
    var elText = document.getElementById('text');
    var elSecret = document.getElementById('secret');
    var elResult = document.getElementById('result');

    //Main object and return
    var handler = {};

    //#region functions
    handler.init = function (selector) {
        classEvents();
        encode();

    };

    function classEvents() {
        elText.addEventListener('keyup', function () {
            encode();
        });
    }

    function encode() {
        let secret = elSecret.value;
        let binarySecret = textToBinary(secret);
        let encodedSecret = binaryToZeroWidth(binarySecret);
        let content = elText.value;
        let encodedTextWithSecret = insertSecret('secondChar', content, encodedSecret);
        elResult.value = encodedTextWithSecret
    }

    function insertSecret(method, text, secret) {
        switch (method) {
            case 'secondChar':
                return text.slice(0, 26) + secret + text.slice(26);
            default:
                console.log('Wops wrong insertion method');
        }
    }

    //ENCODE
    function zeroPad(number) {
        var zeroes = '00000000';
        return zeroes.slice(String(number).length) + number;
    }

    function textToBinary(secret) {
        return secret.split('').map(char =>
            zeroPad(char.charCodeAt(0).toString(2))).join(' ');
    }


    function binaryToZeroWidth(binary) {
        return binary.split('').map((binaryNum) => {
            const num = parseInt(binaryNum, 10);
            if (num === 1) {
                return '​'; // zero-width space
            } else if (num === 0) {
                return '‌'; // zero-width non-joiner
            }
            return '‍'; // zero-width joiner
        }).join('﻿') // zero-width no-break space
    }


    //DEOODE
    function binaryToText(string) {
        return string.split(' ').map(num =>
            String.fromCharCode(parseInt(num, 2))).join('')
    }

    function zeroWidthToBinary(string) {
        return string.split('').map((char) => { // zero-width no-break space
            if (char === '​') { // zero-width space
                return '1';
            } else if (char === '‌') {  // zero-width non-joiner
                return '0';
            }
            return ' '; // add single space
        }).join('')
    }

    //#endregion

    return handler;
}();