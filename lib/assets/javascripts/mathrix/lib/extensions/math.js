(function ($) {
    "use strict";

    try {
        Object.defineProperties($, {

            // greatest common divisor
            GCD: {
                value: function () {
                    var
                        numbers = [],
                        primeFactors = [],
                        commonFactors = [],
                        smallerFactorsHash = {},
                        count = 0,
                        i = 0,
                        smallerCommonProduct = 1,

                        euclidesAlgorithm = function(a, b) {
                            var
                                rest = b;

                            while(rest != 0) {
                               rest = a % b;
                               a = b;
                               b = rest;
                            }

                            return a;
                        };

                    numbers = Array.from(arguments);
                    numbers = numbers.asc();
                    numbers = numbers.uniq();
                    if(numbers.length == 1) {
                        return numbers[0];
                    }

                    // properties

                    // dois números primos nunca serão múltiplos entre si
                    i = 0;
                    while(true) {
                        if((numbers[i]).isPrime()) {count++;}
                        if(count >= 2) {return 1;}
                        if(i == numbers.length -1) {break;}
                        i++;
                    }

                    if(numbers.areMultiples()) {return numbers.min();}

                    numbers.map(function (v) {
                        primeFactors.push(v.primeFactors());
                    });

                    commonFactors = primeFactors.intersection();

                    if(commonFactors.length) {
                        primeFactors.map(function (a) {
                            commonFactors.map(function (v) {
                                if(!smallerFactorsHash[v]) {
                                    smallerFactorsHash[v] = a.count(v);
                                } else {
                                    if(a.count(v) < smallerFactorsHash[v]) {
                                        smallerFactorsHash[v] = a.count(v);
                                    }
                                }
                            });
                        });
                    } else {
                        return 1;
                    }

                    for(i in smallerFactorsHash) {
                        if (smallerFactorsHash.hasOwnProperty(i)) {
                                smallerCommonProduct *= Math
                                    .pow(i, smallerFactorsHash[i]);
                        }
                    }

                    return smallerCommonProduct;
                }
            },

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
                        noCommonFactors = 1;

                    numbers = Array.from(arguments);
                    numbers = numbers.asc();
                    numbers = numbers.uniq();
                    if(numbers.length == 1) {
                        return numbers[0];
                    }

                    if(numbers.areMultiples()) {return numbers.max();}

                    numbers.map(function (v) {
                        primeFactors.push(v.primeFactors());
                    });

                    commonFactors = primeFactors.intersection();

                    primeFactors.map(function (a) {
                        commonFactors.map(function (v) {
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

                    nonCommonfactors.map(function (v) {
                        noCommonFactors *= v;
                    });

                    return biggerCommonProduct * noCommonFactors;
                }
            }

        });

    } catch(e) {}

})(Math);
