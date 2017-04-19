var
        Iterable,
    Map;

(function ($module) {
    "use strict";

    var
        Iterator_ = function(collection) {
            var
                primeFactor = 2,
                remains = collection.clone(),
                decomposition = new Map(),

                hasSomeMultipleOf = function(remains, primeFactor) {
                    var
                        i = 0;

                    while(i < remains.length) {
                        if (remains[i++].multipleOf(primeFactor) ||
                            remains[i] < primeFactor) {
                            return true;
                        }
                    }

                    return false;
                };

            this.primeFactor = function() {
                while(!hasSomeMultipleOf(remains, primeFactor)) {
                    primeFactor = primeFactor.nextPrimeFactor();
                }

                return primeFactor;
            };

            this.next = function() {
                var
                    i,
                    self = this,
                    iterator = Iterable.Proxy.new(remains);

                iterator.each(function(n) {
                    i = iterator.index();
                    if (n.multipleOf(self.primeFactor())) {
                        remains[i] /= primeFactor;
                    }
                });

                if (!decomposition.hasEquivalence(remains)) {
                    if (this.hasNext()) {
                        decomposition.set(remains.clone(), primeFactor);
                    } else {
                        decomposition.set(remains.clone(), 1);
                    }
                }

                return remains;
            };

            this.hasNext = function() {
                return remains.count(1) < remains.length;
            };

            this.reset = function() {
                this.remains = collection;
            };

            this.decompose = function() {
                // executar os nexts aqui

                return decomposition;
            };

            this.decomposition = function() {
                return decomposition;
            };

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

                    this.next = function () {
                        return _iterator.next();
                    };

                    this.reset = function () {
                        _iterator.reset();
                    };

                    this.hasNext = function () {
                        return _iterator.hasNext();
                    };

                    this.decompose = function() {
                        return _iterator.decompose();
                    };

                    this.decomposition = function () {
                        return _iterator.decomposition();
                    };

                    this.each = function(callback) {
                        _iterator.each(callback);
                    };

                    return this;
                }
            }
        });
    } catch(e) {}

})(Math);
