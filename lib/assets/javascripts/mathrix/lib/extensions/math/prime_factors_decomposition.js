var
    Iterable,
    Map;

(function($module) {
    "use strict";

    var
        Iterator_ = function(collection) {
            var
                iteration = -1,
                primeFactor = 2,
                remains = collection.clone(),
                primeFactors = [],
                quotients = [],
                decomposition = new Map(),

                hasSomeMultipleOf = function(remains, factor) {
                    var
                        i = 0;

                    while(i < remains.length) {
                        if (remains[i++].multipleOf(factor)) {
                            return true;
                        }
                    }

                    return false;
                },

                resolveFactor = function(remains) {
                    if (remains.count(1) < remains.length) {
                        while(!hasSomeMultipleOf(remains, primeFactor)) {
                            primeFactor = primeFactor.nextPrimeFactor();
                        }
                    } else {
                        primeFactor = 1;
                    }

                    return primeFactor;
                },

                resolveDecomposition = function(reference) {
                    if (reference.hasNext()) {
                        reference.decompose();
                    }
                };

            this.primeFactor = function() {
                return primeFactor;
            };

            this.next = function() {
                var
                    i,
                    clone,
                    iterator = Iterable.Proxy.new(remains),

                    callback = function(n) {
                        i = iterator.index();
                        if (n.multipleOf(primeFactor)) {
                            remains[i] /= primeFactor;
                        }
                    };

                if (this.hasNext()) {
                    iteration += 1;
                    if(iteration === 0) {
                        return remains;
                    }

                    primeFactors.push(primeFactor);

                    iterator.each(callback);

                    resolveFactor(remains);

                    clone = remains.clone();
                    decomposition.set(clone, primeFactor);
                    quotients.push(clone);

                    return remains;
                }

                return undefined;

            };

            this.hasNext = function() {
                return primeFactor > 1;
            };

            this.primeFactors = function() {
                resolveDecomposition(this);

                return primeFactors;
            };

            this.reset = function() {
                remains = collection.clone();
                iteration = -1;
                primeFactor = 2;
            };

            this.finalize = function() {
                primeFactor = 1;
            };

            this.decompose = function(callback) {
                if (typeof callback != "function") {
                    callback = function(){};
                }

                while (this.hasNext(remains)) {
                    callback.call(collection, this.next());
                }

                return decomposition;
            };

            this.decomposition = function() {
                resolveDecomposition(this);

                return decomposition;
            };

            this.quotients = function() {
                resolveDecomposition(this);

                return quotients;
            };

            resolveFactor(remains);
            decomposition.set(remains.clone(), primeFactor);
        };

    try {
        Object.defineProperties($module, {
            PrimeFactorsDecomposition: {
                value: {}
            }
        });
    } catch(e) {}

    try {
        Object.defineProperties($module.PrimeFactorsDecomposition, {
            Proxy: {
                value: {}
            }
        });
    } catch(e) {}

    try {
        Object.defineProperties($module.PrimeFactorsDecomposition.Proxy, {
            new: {
                value: function(numbers, callback) {
                    var
                        collection,
                        _iterator,
                        self = $module.PrimeFactorsDecomposition.Proxy,
                        argumentsAsArray = Array.from(arguments);

                    if (!(this instanceof self.new)) {
                        return new self.new(numbers, callback);
                    }

                    if (typeof argumentsAsArray[argumentsAsArray.length - 1] ==
                        "function") {
                        collection = argumentsAsArray
                            .slice(0, argumentsAsArray.length - 1);
                    } else {
                        collection = argumentsAsArray.flatten().compact();
                    }

                    _iterator = new Iterator_(collection);

                    this.primeFactor = function() {
                        return _iterator.primeFactor();
                    };

                    this.primeFactors = function() {
                        return _iterator.primeFactors();
                    };

                    this.next = function() {
                        return _iterator.next();
                    };

                    this.reset = function() {
                        _iterator.reset();
                    };

                    this.finalize = function() {
                        _iterator.finalize();
                    };

                    this.hasNext = function() {
                        return _iterator.hasNext();
                    };

                    this.decompose = function(callback) {
                        return _iterator.decompose(callback);
                    };

                    this.decomposition = function() {
                        return _iterator.decomposition();
                    };

                    this.quotients = function() {
                        return _iterator.quotients();
                    };

                    return this;
                }
            }
        });
    } catch(e) {}

})(Math);
