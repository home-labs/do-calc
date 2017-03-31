Number.prototype.multipleOf = function () {
    var
        _args = [],
        i = null,
        n = parseFloat(this)
    ;

    for(i in arguments) {
        if( arguments.hasOwnProperty(i) ) {
            _args.push( parseFloat( Math.abs(arguments[i]) ) );
        }
    }

    _args.destroy( 1, parseFloat(this) );

    if(_args.length === 0) { return true; }

    i = 0;
    while(true) {
        if( n%_args[i] !== 0 ) { return false; }
        if( i === _args.length -1 ) { break; }
        i++;
    }

    return true;
};

Number.areMultiple = function () {
    var
        _args = [],
        i = 0;

    for (i in arguments) {
        if ( arguments.hasOwnProperty(i) ) {
            _args.push(Math.abs(parseFloat(arguments[i])));
        }
    }

    return _args.areMultiple();
};

Number.prototype.isPrime = function () {
    var
        count = 2,
        i = count,
        n = parseFloat(this)
    ;

    if(n < 0) { n = Math.abs(n); }
    if(n === 1) { return false; }
    if(n < 1 || n === 2) { return true; }

    while(true) {
        if(i === n || count > 2) { break; }
        if( n.multipleOf(i) ) { count++; }
        i++;
    }

    if(count === 2) {
        return true;
    } else {
        return false;
    }
};

Number.prototype.multiples = function () {
    var
        n = parseFloat(this),
        i = 1,
        _multiples = []
    ;

    if(n === 0) { return ["∞"]; }
    if(n < 0) { n = Math.abs(n); }
    if( n.isPrime() ) { return [1, n]; }

    while(true) {
        if( n.multipleOf(i) ) { _multiples.push(i); }
        if(i === n) { break; }
        i++;
    }

    return _multiples;
};

Number.prototype.firstMultiple = function () {
    var
        i = 2,
        n = parseFloat(this)
    ;

    if (n < 0) { n = Math.abs(n); }
    if (n <= 1) { return n; }

    while(true) {
        if( n.multipleOf(i) ) {
            return i;
        }
        i++;

    }
};

// Para futuras implementações, como retorno de fatores primos de determinado valor, podemos usar um algorítmo determinístico como os dos dois links abaixo
// É interessante calcular somente os fatores primos que caberiam para determinado número ao invés de testar com todo número natural até chegar a ele, e salvá-los em i como um array, e no if calcular o retorno 0 somente para estes. Devendo o próprio número ser retornado caso não haja quantidade de múltiplos maior que 1, pois 1 e ele mesmo não deverão entrar no vetor para ser calculado.

// http://pt.wikipedia.org/wiki/Crivo_de_Erat%C3%B3stenes
// http://pt.wikipedia.org/wiki/Teste_de_primalidade_AKS

// dá para usar com gcd
Number.prototype.primeFactors = function () {
    var
        _factors = [],
        n = parseFloat(this);

    if(n < 0) { n = Math.abs(n); }

    while(true) {
        _factors.push(n.firstMultiple());
        n = n/n.firstMultiple();
        if(n === 1) { break; }
    }

    return _factors;
};

Number.prototype.fraction = function (places) {
    var
            numerator,
            dLength,
        n = parseFloat(this),
        denominator = '1',
            gcd = 1,
            i = 1;

    if( places && places <= 10 ) {
        n = parseFloat(n.toFixed(places));
    } else if(((n.toString().split('.') )[1]).toString().length > 10) {
        n = parseFloat( n.toFixed(10) );
    }

    n = n.toString().split('.');
    dLength = n[1].length;
    numerator = parseInt(n[0]+n[1]);

    while(true) {
        denominator += '0';
        if(i === dLength) { break; }
        i++;
    }

    denominator = parseInt(denominator);
    gcd = Math.gcd(numerator, denominator);
    return (numerator/gcd).toString() + '/' + (denominator/gcd).toString();
};
