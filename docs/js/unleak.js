var unleak = function () {
    'use strict';

    //Variables
    var elText = document.getElementById('text');
    var elSecret = document.getElementById('secret');
    var elResult = document.getElementById('result');

    var elFoundSecret = document.getElementById('result-secret');

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
            decode();
        });
        elSecret.addEventListener('keyup', function () {
            encode();
            decode();
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

    function decode() {
        let fullText = elText.value;
        let zeroWidthUsername = fullText.replace(/[^​‌‍﻿]/g, '');
        console.log('zeroWidthUsername lenght: ' + zeroWidthUsername.length + ' is:' + zeroWidthUsername)
        const binaryUsername = zeroWidthToBinary(zeroWidthUsername);
        console.log('binaryUsername lenght: ' + binaryUsername.length + ' is:' + binaryUsername)
        const textUsername = binaryToText(binaryUsername);
        console.log('textUsername lenght: ' + textUsername.length + ' is:' + textUsername)
        elFoundSecret.innerText = textUsername;
    }

    function insertSecret(method, text, secret) {
        switch (method) {
            case 'secondChar':
                return text.slice(0, 2) + secret + text.slice(2);
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
                return '​'; // invisible &#8203;
            } else if (num === 0) {
                return '‌'; // invisible &#8204;
            }
            return '‍'; // invisible &#8205;
        }).join('﻿') // invisible &#65279;
    }


    //DEOODE
    function binaryToText(string) {
        return string.split(' ').map(num =>
            String.fromCharCode(parseInt(num, 2))).join('')
    }

    function zeroWidthToBinary(string) {
        return string.split('﻿').map((char) => { // invisible &#65279;
            if (char === '​') { // invisible &#8203;
                return '1';
            } else if (char === '‌') { // invisible &#8204;
                return '0';
            }
            return ' '; // split up binary with spaces;
        }).join('')
    }

    //#endregion

    return handler;
}();