(function ($) {
    "use strict";

    try {
        Object.defineProperties($, {

            // greatest common divisor
            GCD: {
                value: function () {
                    var
                        remains,
                        primeFactor = 2,
                        product = 1,
                        i = 0,
                        numbers = [],
                        count = 0,

                        euclidesAlgorithm = function(a, b) {
                            var
                                rest = b;

                            while(rest !== 0) {
                               rest = a % b;
                               a = b;
                               b = rest;
                            }

                            return a;
                        },

                        everyoneAreMultipleOf = function(remains, primeFactor) {
                            var
                                i = 0;

                            while(i < remains.length) {
                                if (!remains[i++].multipleOf(primeFactor)) {
                                    return false;
                                }
                            }

                            return true;
                        },

                        hasSomeMultipleOf = function(remains, primeFactor) {
                            var
                                i = 0;

                            while(i < remains.length) {
                                if (remains[i++].multipleOf(primeFactor)) {
                                    return true;
                                }
                            }

                            return false;
                        };

                    numbers = Array.from(arguments);
                    numbers = numbers.uniq();
                    if(numbers.length == 1) {
                        return numbers[0];
                    }

                    // properties

                    // se todos os números forem múltiplos entre si, o MDC será menor deles
                    if(numbers.areMultiples()) {return numbers.min();}

                    // o algorítmo de Euclides é mais eficiente para calcular o MDC entre apenas dois números
                    if(numbers.length == 2) {
                        return euclidesAlgorithm(numbers[0], numbers[1]);
                    }

                    // dois números primos não são múltiplos entre si
                    i = 0;
                    while(true) {
                        if((numbers[i]).isPrime()) {count++;}
                        if(count >= 2) {return 1;}
                        if(i == numbers.length -1) {break;}
                        i++;
                    }

                    remains = numbers.clone();

                    while(remains.count(1) != remains.length) {
                        if(everyoneAreMultipleOf(remains, primeFactor)) {
                            product *= primeFactor;
                        }

                        i = 0;
                        while(i < remains.length) {
                            if (remains[i].multipleOf(primeFactor)) {
                                remains[i] /= primeFactor;
                            }
                            i++;
                        }

                        if(!hasSomeMultipleOf(remains, primeFactor)) {
                            primeFactor = primeFactor.nextPrimeFactor();
                        }
                    }

                    return product;
                }
            },

            // TODO: revisar
            // least common multiple
            LCM: {
                value: function () {
                    var
                        numbers = [],
                        primeFactors = [],
                        commonFactors = [],
                        nonCommonfactors = [],
                        biggerFactorsHash = {},
                        i = 0,
                        biggerCommonProduct = 1,
                        noCommonFactors = 1,

                        for2Factors = function(numbers) {
                            var
                                product = 1;

                            numbers.forEach(function (v) {
                                product *= v;
                            });

                            return product/Math.GCD.apply(null, numbers);
                        };

                    numbers = Array.from(arguments);
                    numbers = numbers.uniq();
                    if(numbers.length == 1) {
                        return numbers[0];
                    }

                    if(numbers.areMultiples()) {return numbers.max();}

                    if(numbers.length == 2) {return for2Factors(numbers);}

                    numbers.forEach(function (v) {
                        primeFactors.push(v.primeFactors());
                    });

                    commonFactors = primeFactors.intersection();

                    primeFactors.forEach(function (a) {
                        commonFactors.forEach(function (v) {
                            if(!biggerFactorsHash[v]) {
                                biggerFactorsHash[v] = a.count(v);
                            } else {
                                if(a.count(v) > biggerFactorsHash[v]) {
                                    biggerFactorsHash[v] = a.count(v);
                                }
                            }
                        });
                    });

                    for(i in biggerFactorsHash) {
                        if (biggerFactorsHash.hasOwnProperty(i)) {
                                biggerCommonProduct *= Math
                                    .pow(i, biggerFactorsHash[i]);
                        }
                    }

                    nonCommonfactors = primeFactors.flatten().uniq()
                        .differences(commonFactors);

                    nonCommonfactors.forEach(function (v) {
                        noCommonFactors *= v;
                    });

                    return biggerCommonProduct * noCommonFactors;
                }
            }

        });

    } catch(e) {}

})(Math);

// Simone 2002
// Sem Limite (com Robert De Niro)
