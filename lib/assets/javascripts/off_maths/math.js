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
    var _factors = [];
    // arguments returns the argumegnts of js function
    for(var i in arguments) {
        if( arguments.hasOwnProperty(i) ){
            _factors.push(parseInt(arguments[i]));
        }
    }
    return _factors.lcm();
}

// talves seja interessante fazer uma rotina para o carregamento de uma da lib js, de forma que seja verificado previamente, varrendo-se a tag head, se o script já não se encontra carregado.
Array.prototype.lcm = function() {
    var
        _factors = []
        ,_arr = this
        ,_dividends = []
        ,_aux = []
        ,product = 1
    ;

    // filter
    _arr.map(function(item) {
        if(item < 0) { item = item.absolute(); }
        if(item > 1) { _dividends.push( item ) };
    });

    // record factors
    while( true ) {
        _factors.push( _dividends.firstMultiple() );
        (_dividends.sort()).map(function(item) {
            if(item % _dividends.firstMultiple() === 0) {
                _aux.push( item/_dividends.firstMultiple() );
            } else {
                _aux.push(item);
            }
        });

        _dividends = _aux;
        if(_dividends.count(1) == _dividends.length) { break; }
        _aux = [];
    }

    // computes
    _factors = _factors.sort();
    _factors.map( function(n, i) { product *= n; } );

    return product;
}
