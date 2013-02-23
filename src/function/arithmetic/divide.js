/**
 * Divide two values. x / y or divide(x, y)
 * @param  {Number | Complex | Unit} x
 * @param  {Number | Complex} y
 * @return {Number | Complex | Unit} res
 */
function divide(x, y) {
    if (arguments.length != 2) {
        throw newArgumentsError('divide', arguments.length, 2);
    }

    if (isNumber(x)) {
        if (isNumber(y)) {
            // number / number
            return x / y;
        }
        else if (y instanceof Complex) {
            // number / complex
            return divideComplex(new Complex(x), y);
        }
    }
    else if (x instanceof Complex) {
        if (isNumber(y)) {
            // complex / number
            return divideComplex(x, new Complex(y));
        }
        else if (y instanceof Complex) {
            // complex / complex
            return divideComplex(x, y);
        }
    }
    else if (x instanceof Unit) {
        if (isNumber(y)) {
            var res = x.copy();
            res.value /= y;
            return res;
        }
    }

    // TODO: implement array support
    // TODO: implement matrix support

    throw newUnsupportedTypeError('divide', x, y);
}

/**
 * Divide two complex values. x / y or divide(x, y)
 * @param {Complex} x
 * @param {Complex} y
 * @return {Complex} res
 * @private
 */
function divideComplex (x, y) {
    var den = y.re * y.re + y.im * y.im;
    return new Complex(
        (x.re * y.re + x.im * y.im) / den,
        (x.im * y.re - x.re * y.im) / den
    );
}

math.divide = divide;

/**
 * Function documentation
 */
divide.doc = {
    'name': 'divide',
    'category': 'Operators',
    'syntax': [
        'x / y',
        'divide(x, y)'
    ],
    'description': 'Divide two values.',
    'examples': [
        '2 / 3',
        'ans * 3',
        '4.5 / 2',
        '3 + 4 / 2',
        '(3 + 4) / 2',
        '18 km / 4.5'
    ],
    'seealso': [
        'multiply'
    ]
};
