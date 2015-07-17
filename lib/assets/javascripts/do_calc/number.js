// var
//   head = document.querySelector('head'),
//   array = document.createElement('script'),
//   number = document.createElement('script'),
//   math = document.createElement('script');

// array.src = 'https://rawgit.com/home-labs/do-rails/master/lib/assets/javascripts/do/array.js';
// number.src = 'https://rawgit.com/home-labs/do-calc-rails/master/lib/assets/javascripts/do_calc/number.js',
// math.src = 'https://rawgit.com/home-labs/do-calc-rails/master/lib/assets/javascripts/do_calc/math.js';

// head.appendChild(array);
// head.appendChild(number);
// head.appendChild(math);


// Para futuras implementações, como retorno de fatores primos de determinado valor, podemos usar um algorítmo determinístico como esses dois abaixo
// É interessante calcular somente os fatores primos que caberiam para determinado número, ao invés de testar com todo número natural até chegar a ele, e salvá-los em i como um array, e no if calcular o retorno 0 somente para estes. Devendo o próprio número ser retornado caso não haja quantidade de múltiplos maior que 1, pois 1 e ele mesmo não deverão entrar no vetor para ser calculado.
// Mas como calcular esse números primos? No braço?

// http://pt.wikipedia.org/wiki/Crivo_de_Erat%C3%B3stenes
// http://pt.wikipedia.org/wiki/Teste_de_primalidade_AKS


Number.prototype.primeFactors = function() {
    var
        _factors = [],
        // _allFactors = [],
        n = parseInt(this),
        i = 0,
        factor = 2
    ;

    if(n < 0) { n *= -1; }

    // while(true) {
    //     if(i === n) { break; }
    //     if(i.isPrime()) {
    //         if(n%i === 0) {
    //             _factors.push(i);
    //         }
    //     }
    //     i++;
    // }

    i = 0;

    while(true) {
        dividend = dividend/_factors[i];
        if(dividend%_factors[i] === 0) {

        } else {
            i++;
        }
        if(dividend === 1) { break; }
    }

    return _allFactors;
}

Number.prototype.isPrime = function() {
    var
        count = 2,
        i = 2,
        n = this
    ;

    n = parseInt(n);
    if(n < 0) { n *= -1; }
    if(n === 1) { return false; }
    if(n === 2) { return true; }

    while(true) {
        if(i === n || count > 2) { break; }
        if(n%i === 0) { count++; }
        i++;
    }

    if(count === 2) {
        return true;
    } else {
        return false;
    }
}

Number.prototype.rationalize = function() {
    var
        _d = parseFloat(this).toString().split('.'),
        decimal = _d[1],
        numerator = parseInt(_d[0]+_d[1]),
        denominator = '1',
        gcd = 1,
        i = 1
    ;

    while(true) {
        denominator += '0';
        if(i === decimal.toString().length) { break; }
        i++;
    }

    denominator = parseInt(denominator);
    gcd = Math.gcd(numerator, denominator);

    return (numerator/gcd).toString() + '/' + (denominator/gcd).toString();

}

Number.prototype.multiples = function() {
    var
        n = parseInt(this),
        i = 1,
        _multiples = []
    ;

    if(n === 0) { return ["∞"]; }

    if(n < 0) { n *= -1; }

    while(true) {
        if(n%i === 0) { _multiples.push(i); }
        if(i === n) { break; }
        i++;
    }

    return _multiples;
}

Number.firstMultiple = function(n) {
    return n.firstMultiple();
}

Number.prototype.firstMultiple = function() {
    var
        i = 1,
        count = 1,
        n = this,
        m = n
    ;

    if (n < 0) { n *= -1; }

    while(i <= n && count < 3) {
        if(n%i === 0) {
            count++;
            m = i;
        }
        i++;

    }

    return parseFloat(m);
}

Array.prototype.firstMultiple = function() {
    var
        _arr = this,
        _factors = []
    ;

    _arr.map(function(item) {
        if(item > 1) { _factors.push(item.firstMultiple()); }
    });

    return (_factors.sort())[0];
}
