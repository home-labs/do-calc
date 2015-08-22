// talves seja interessante fazer uma rotina para o carregamento de uma da lib js, de forma que seja verificado previamente, varrendo-se a tag head, se o script já não se encontra carregado.

// Para apenas dois números o Algorítmo de Euclides é mais rápido, que pode ser usado recursivamente
// greatest common divisor
Math.gcd = function() {
    var
        _numbers = []
        ,_factors = []
        ,_commonFactors = []
        ,smallerFactorsHash = {}
        ,count = 0
        ,i = 0
        ,smallerCommonProduct = 1
    ;

    for(i in arguments) {
        if( arguments.hasOwnProperty(i) ){
            _numbers.push(parseFloat(arguments[i]));
        }
    }

    _numbers = _numbers.asc();
    _numbers = _numbers.uniq();
    if(_numbers.length === 1) {
        return _numbers[0];
    }

    // dois números primos nunca serão múltiplos entre si
    i = 0;
    while(true) {
        if( (_numbers[i]).isPrime() ) { count++; }
        if(count >= 2) { return 1; }
        if(i === _numbers.length -1) { break; }
        i++;
    }

    if(_numbers.isMultiple()){ return _numbers.min(); }

    _numbers.map(function(v) {
        _factors.push(v.primeFactors());
    });

    _commonFactors = _factors.intersection();

    if(_commonFactors) {
        _factors.map(function(_a) {
            _commonFactors.map(function(v) {
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

Array.prototype.isMultiple = function() {
    var
        _args = this
        ,i = 0
        ,ii = 0
    ;

    _args = _args.destroy(1);
    _args = _args.uniq();
    if(_args.length <= 1) { return true; }

    _args = _args.desc();
    i = 0;
    while(true) {
        ii = i + 1;
        while(true) {
            if(_args[i]%_args[ii] !== 0) { return false; }
            if (ii === _args.length -1) { break; }
            ii++;
        }
        i++;
        if (i === _args.length -1) { break; }
    }

    return true;
}

Math.isMultiple = function() {
    var
        _args = [],
        i = 0
    ;

    for(i in arguments) {
        if( arguments.hasOwnProperty(i) ) {
            _args.push( parseFloat(arguments[i]).absolute() );
        }
    }

    return _args.isMultiple();
}

// least common multiple
Math.lcm = function() {
    var
        _numbers = []
        ,_factors = []
        ,_commonFactors = []
        ,_noCommonFactors = []
        ,biggerFactorsHash = {}
        ,count = 0
        ,i = 0
        ,biggerCommonProduct = 1
        ,noCommonFactors = 1
    ;

    for(i in arguments) {
        if( arguments.hasOwnProperty(i) ){
            _numbers.push(parseFloat(arguments[i]));
        }
    }

    _numbers = _numbers.asc();
    _numbers = _numbers.uniq();
    if(_numbers.length === 1) {
        return _numbers[0];
    }

    if(_numbers.isMultiple()) { return _numbers.max(); }

    _numbers.map(function(v) {
        _factors.push(v.primeFactors());
    });

    _commonFactors = _factors.intersection();

    _factors.map(function(_a) {
        _commonFactors.map(function(v) {
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
    _noCommonFactors = _factors.join().split(',').map(Number).uniq().difference(_commonFactors)

    _noCommonFactors.map(function(v) {
        noCommonFactors *= v;
    });

    return biggerCommonProduct * noCommonFactors;
}
