//_a = [100, 20, 10, 5]

Math.isMultiple = function(v1, v2) {
    var _args = [];

    _args[0] = v1;
    _args[1] = v2;

    // ordena através do método "insertion sort". Se a-b retornar um valor menor que 0 então a é menor que b, se 0 então a é iguala b, se maior que zero, por conseguinte, a é maior que b, e assim ordenará em ordem crescente
    _args = _args.sort(function(a, b) { return a-b; });
    if(_args[1]%_args[0] === 0 ) { return true; }
    return false;
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

// este método depende do método occurrences da lib number.js da gem do-rails
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
        if(item < 0) { item *= -1; }
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

// Considerar algumas propriedades para o algorítmo ficar mais rápido e não precisar fazer conta, exemplos:
// Para apenas dois números o Algorítmo de Euclides é mais rápido
// Se dois ou mais valores forem múltiplos entre si, então o MDC será o menor dentre eles;
// Seja n a quantidade de termos a ser calculado o MDC, se n <= 3, e se um dos termos for primo, então o MDC será 1
// Se dois termos forem primos, então o MDC também será 1, visto que dois números primos distintos nunca serão múltiplos
// MDC de valores iguais

// greatest common divisor
Math.gcd = function() {
    var _factors = [];
    // arguments returns the arguments of js function
    for(var i in arguments) {
        if( arguments.hasOwnProperty(i) ){
            _factors.push(parseInt(arguments[i]));
        }
    }
    return _factors.gcd();
}

Array.prototype.gcd = function() {
    var
        _factors = [],
        smallerFactorsHash = {},
        factor = 2,
        dividend = 1,
        count = 1,
        smallerCommonProduct = 1,
        _arr = this,
        powFactor = null
    ;

    _arr.map(function(item) {
        if(item < 0) { item *= -1; }

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
    _factors = _factors.sort();
    _factors.map(function(n, i) {
        if( n === _factors[i+1] ) {
            count++;
        } else {
            if( count === _arr.length ) { smallerCommonProduct *= smallerFactorsHash[n]; }
            count = 1;
        }

    });

    return smallerCommonProduct;
}
