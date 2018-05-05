(function ($) {
    "use strict";

    try {
        Object.defineProperties($.prototype, {
            nextPrimeFactor: {
                value: function () {
                    var
                        value = this;

                    while(!(++value).isPrime()) {}

                    return value;
                }
            },

            // Para futuras implementações, como retorno de fatores primos de determinado valor, podemos usar um algorítmo determinístico como os dos dois links abaixo
            // É interessante calcular somente os fatores primos que caberiam para determinado número ao invés de testar com todo número natural até chegar a ele, e salvá-los em i como um array, e no if calcular o retorno 0 somente para estes. Devendo o próprio número ser retornado caso não haja quantidade de múltiplos maior que 1, pois 1 e ele mesmo não deverão entrar no vetor para ser calculado.

            // http://pt.wikipedia.org/wiki/Crivo_de_Erat%C3%B3stenes
            // http://pt.wikipedia.org/wiki/Teste_de_primalidade_AKS

            // dá para usar com gcd
            primeFactors: {
                value: function () {
                    var
                        factors = [],
                        n = parseFloat(this);

                    if(n < 0) {n = Math.abs(n);}

                    while(true) {
                        factors.push(n.firstMultiple());
                        n = n/n.firstMultiple();
                        if(n == 1) {break;}
                    }

                    return factors;
                }
            },

            multipleOf: {
                value: function (numbers) {
                    var
                        args = Array.from(arguments),
                        i = 0,
                        n = parseFloat(this),

                        callback = function (item, i) {
                            return parseFloat(Math.abs(arguments[i]));
                        };

                    args = args.map(callback);

                    if(args.length === 0) {return true;}

                    i = 0;
                    while(true) {
                        if(args[i] > n || n % args[i] !== 0) {return false;}
                        if(i == args.length -1) {break;}
                        i++;
                    }

                    return true;
                }
            },

            areMultiples: {
                value: function (numbers) {
                    var
                        current,
                        i = 0,
                        args = Array.from(arguments);

                    args.push(this);
                    args = args.uniq().desc();
                    current = parseFloat(args.shift());
                    while(true) {
                        while(true) {
                            if(!current.multipleOf(args[i++])) {return false;}
                            if (i == args.length) {break;}
                        }

                        i = 0;
                        current = args.delete(i);
                        if(!args.length) {break;}
                    }

                    return true;
                }
            },

            isPrime: {
                value: function () {
                    var
                        amount = 2,
                        i = amount,
                        n = parseFloat(this);

                    if(n < 0) {n = Math.abs(n);}
                    if(n == 1) {return false;}
                    if(n < 1 || n == 2) {return true;}

                    while(true) {
                        if (i == n || amount > 2) {break;}
                        if (n.multipleOf(i)) {amount++;}
                        i++;
                    }

                    if(amount == 2) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },

            multiples: {
                value: function () {
                    var
                        n = parseFloat(this),
                        i = 1,
                        multiples = [];

                    if(n === 0) {return ["∞"];}
                    if(n < 0) {n = Math.abs(n);}
                    if(n.isPrime()) {return [1, n];}

                    while(true) {
                        if(n.multipleOf(i)) {multiples.push(i);}
                        if(i == n) {break;}
                        i++;
                    }

                    return multiples;
                }
            },

            firstMultiple: {
                value: function () {
                    var
                        i = 2,
                        n = parseFloat(this);

                    if (n < 0) {n = Math.abs(n);}
                    if (n <= 1) {return n;}

                    while(true) {
                        if(n.multipleOf(i)) {
                            return i;
                        }
                        i++;

                    }
                }
            },

            fraction: {
                value: function (places) {
                    var
                        numerator,
                        dLength,
                        n = parseFloat(this),
                        denominator = '1',
                        gcd = 1,
                        i = 1;

                    if( places && places <= 10 ) {
                        n = parseFloat(n.toFixed(places));
                    } else if(((n.toString().split('.') )[1]).toString()
                              .length > 10) {
                        n = parseFloat( n.toFixed(10) );
                    }

                    n = n.toString().split('.');
                    dLength = n[1].length;
                    numerator = parseInt(n[0]+n[1]);

                    while(true) {
                        denominator += '0';
                        if(i == dLength) {break;}
                        i++;
                    }

                    denominator = parseInt(denominator);
                    gcd = Math.gcd(numerator, denominator);

                    return (numerator/gcd).toString() + '/' + (denominator/gcd)
                        .toString();
                }
            }
        });

    } catch(e) {}

})(Number);
