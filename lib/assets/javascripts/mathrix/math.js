// talves seja interessante fazer uma rotina para o carregamento de uma da lib js, de forma que seja verificado previamente, varrendo-se a tag head, se o script já não se encontra carregado.

// Para apenas dois números o Algorítmo de Euclides é mais rápido, que pode ser usado recursivamente
// greatest common divisor
Math.gcd = function () {
    var
        numbers = []
        ,numbers = []
        ,commonFactors = []
        ,smallerFactorsHash = {}
        ,count = 0
        ,i = 0
        ,smallerCommonProduct = 1
    ;

    for(i in arguments) {
        if( arguments.hasOwnProperty(i) ){
            numbers.push(parseFloat(arguments[i]));
        }
    }

    numbers = numbers.asc();
    numbers = numbers.uniq();
    if(numbers.length === 1) {
        return numbers[0];
    }

    // dois números primos nunca serão múltiplos entre si
    i = 0;
    while(true) {
        if( (numbers[i]).isPrime() ) { count++; }
        if(count >= 2) { return 1; }
        if(i === numbers.length -1) { break; }
        i++;
    }

    if(numbers.isMultiple()){ return numbers.min(); }

    numbers.map(function (v) {
        numbers.push(v.primeFactors());
    });

    commonFactors = numbers.intersection();

    if(commonFactors) {
        numbers.map(function (_a) {
            commonFactors.map(function (v) {
                if(!smallerFactorsHash[v]) {
                    smallerFactorsHash[v] = _a.count(v);
                } else {
                    if( _a.count(v) < smallerFactorsHash[v] ) {
                        smallerFactorsHash[v] = _a.count(v);
                    }
                }
            });
        });
    } else {
        return [];
    }

    for(i in smallerFactorsHash) {
        smallerCommonProduct *= Math.pow(i, smallerFactorsHash[i]);
    }

    return smallerCommonProduct;
}

Math.isMultiple = function () {
    var
        _args = [],
        i = 0
    ;

    for (i in arguments) {
        if ( arguments.hasOwnProperty(i) ) {
            _args.push(Math.abs(parseFloat(arguments[i])));
        }
    }

    return _args.isMultiple();
}

// least common multiple
Math.lcm = function () {
    var
        numbers = []
        ,numbers = []
        ,commonFactors = []
        ,nonCommonfactors = []
        ,biggerFactorsHash = {}
        ,count = 0
        ,i = 0
        ,biggerCommonProduct = 1
        ,noCommonFactors = 1
    ;

    for(i in arguments) {
        if( arguments.hasOwnProperty(i) ){
            numbers.push(parseFloat(arguments[i]));
        }
    }

    numbers = numbers.asc();
    numbers = numbers.uniq();
    if(numbers.length === 1) {
        return numbers[0];
    }

    if(numbers.isMultiple()) { return numbers.max(); }

    numbers.map(function (v) {
        numbers.push(v.primeFactors());
    });

    commonFactors = numbers.intersection();

    numbers.map(function (_a) {
        commonFactors.map(function (v) {
            if(!biggerFactorsHash[v]) {
                biggerFactorsHash[v] = _a.count(v);
            } else {
                if( _a.count(v) > biggerFactorsHash[v] ) {
                    biggerFactorsHash[v] = _a.count(v);
                }
            }
        });
    });

    for(i in biggerFactorsHash) {
        biggerCommonProduct *= Math.pow(i, biggerFactorsHash[i]);
    }

    // JSON.parse("[" + string + "]");
    nonCommonfactors = numbers.join().split(',').map(Number).uniq().difference(commonFactors)

    nonCommonfactors.map(function (v) {
        noCommonFactors *= v;
    });

    return biggerCommonProduct * noCommonFactors;
}
