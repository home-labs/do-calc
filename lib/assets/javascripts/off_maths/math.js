// Para apenas dois números o Algorítmo de Euclides é mais rápido
// Se dois termos forem primos, então o MDC também será 1, visto que dois números primos distintos nunca serão múltiplos

// greatest common divisor
// ocurrences sera usado para contar onde se encontra o menor valor potencial dentre os valores comuns
Math.gcd = function() {
    var
        _numbers = [],
        _factors = [],
        smallerFactorsHash = {},
        factor = 2,
        dividend = 1,
        count = 0,
        smallerCommonProduct = 1,
        powFactor = null
    ;

    for(var i in arguments) {
        if( arguments.hasOwnProperty(i) ){
            _numbers.push(parseFloat(arguments[i]));
        }
    }

    _numbers = _numbers.uniq();
    if(_numbers.length === 1) {
        return _numbers[0];
    }

    // dois números primos nunca serão múltiplos entre si
    if(_numbers.length <= 3) {
        _numbers.map(function(v) {
            if(v.isPrime()) { count++; }
        });
        if(count >= 2){ return 1; }
    }

    if(_numbers.isMultiple()){ return _numbers.min(); }

    count = 1;
    _numbers.map(function(item) {
        if(item < 0) { item = item.absolute(); }

        dividend = item;
        while ( dividend > 1 ) {

            factor = dividend.firstMultiple();
            dividend = dividend/dividend.firstMultiple();

            // guard sum of the same divisor
            if( dividend.firstMultiple() === factor ) {
                count++;
            } else {
                _factors.push(factor);

                // map smaller factors
                powFactor = Math.pow( factor, count );
                if( factor in smallerFactorsHash ) {
                    if( powFactor < smallerFactorsHash[factor] ) {
                        smallerFactorsHash[factor] = powFactor;
                    }
                } else {
                    smallerFactorsHash[factor] = powFactor;
                }

                // restart counter
                count = 1;
            }

        }
    });

    // check common factors
    _factors = _factors.sort(function(a, b) { return a-b; });
    _factors.map(function(n, i) {
        if( n === _factors[i+1] ) {
            count++;
        } else {
            if( count === _numbers.length ) { smallerCommonProduct *= smallerFactorsHash[n]; }
            count = 1;
        }

    });

    return smallerCommonProduct;
}

Array.prototype.isMultiple = function() {
    var
        _args = this,
        i = 0,
        ii = 0
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
        _factors = [],
        _arr = this,
        _dividends = [],
        _aux = [],
        product = 1
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
        if(_dividends.occurrences(1) == _dividends.length) { break; }
        _aux = [];
    }

    // computes
    _factors = _factors.sort();
    _factors.map( function(n, i) { product *= n; } );

    return product;
}
