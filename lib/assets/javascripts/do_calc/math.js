Array.prototype.isMultiple = function() {
    var
        _args = this,
        i = 0,
        ii,
        count = 0
    ;

    // ordena através do método "insertion sort", de forma decrescente. Se b-a retornar um valor maior que 0 então b é maior que a, se 0 então são iguais, se menor que zero, por conseguinte, b é menor que a, e assim, como em um baralho de cartas, ordenara-lo-á em ordem ao final da fila da esquerda para a direita
    _args = _args.sort(function(a, b) { return b-a; });

    _args = _args.destroy(1);
    i = 0;
    while(true) {
        ii = i + 1;
        while(true) {
            if(_args[i]%_args[ii] !== 0) {
                return false;
            }
            count++;
            if (ii === _args.length -1) { break; }
            ii++;
        }
        i++;
        if(count < _args.length -1) {
            return false;
        } else if (i === _args.length -1) { break; }
        count = 0;
    }
    return true;
}

// Math.isMultiple = function() {
//     var
//         _args = []
//     ;

//     for(i in arguments) {
//         if( arguments.hasOwnProperty(i) ) {
//             _args.push( parseFloat(arguments[i]).absolute() );
//         }
//     }
// }

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

// Considerar algumas propriedades para o algorítmo ficar mais rápido e não precisar fazer algumas contas, exemplos:
// Para apenas dois números o Algorítmo de Euclides é mais rápido
// Se dois ou mais valores forem múltiplos entre si, então o MDC será o menor dentre eles;
// Seja n a quantidade de termos a ser calculado o MDC, se n <= 3, e se um dos termos for primo, então o MDC será 1
// Se dois termos forem primos, então o MDC também será 1, visto que dois números primos distintos nunca serão múltiplos
// MDC de valores iguais

// greatest common divisor
Math.gcd = function() {
    var
        _numbers = [],
        _factors = [],
        smallerFactorsHash = {},
        factor = 2,
        dividend = 1,
        count = 1,
        smallerCommonProduct = 1,
        powFactor = null
    ;

    for(var i in arguments) {
        if( arguments.hasOwnProperty(i) ){
            _numbers.push(parseFloat(arguments[i]));
        }
    }



    _numbers.map(function(item) {
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
