var
    Iterable,
    Map;

(function ($module) {
    "use strict";

    var
        Iterator_ = function(collection) {
            var
                factor = 2,
                remains = collection.clone(),
                decomposition = new Map(),

                hasSomeMultipleOf = function(remains, factor) {
                    var
                        i = 0;

                    while(i < remains.length) {
                        if (remains[i++].multipleOf(factor) ||
                            remains[i] < factor) {
                            return true;
                        }
                    }

                    return false;
                };

            this.factor = function() {
                if (!this.hasNext()) {
                    factor = 1;
                } else {
                    while(!hasSomeMultipleOf(remains, factor)) {
                        factor = factor.nextPrimeFactor();
                    }
                }

                return factor;
            };

            this.next = function() {
                var
                    i,
                    self = this,
                    iterator = Iterable.Proxy.new(remains);

                iterator.each(function(n) {
                    i = iterator.index();
                    if (n.multipleOf(self.factor())) {
                        remains[i] /= factor;
                    }
                });

                if (!decomposition.hasEquivalence(remains)) {
                    decomposition.set(remains.clone(), factor);
                }

                return remains;
            };

            this.hasNext = function() {
                return remains.count(1) < remains.length;
            };

            this.reset = function() {
                this.remains = collection;
            };

            this.finalize = function() {
                factor = 1;
            };

            this.decompose = function(callback) {
                this.reset();

                // while (this.hasNext()) {
                while (this.factor() > 1) {
                    debugger
                    callback.call(collection, this.next());
                }

                return decomposition;
            };

            this.decomposition = function() {
                return decomposition;
            };

            decomposition.set(remains.clone(), factor);

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

                    this.factor = function() {
                        return _iterator.factor();
                    };

                    this.next = function () {
                        return _iterator.next();
                    };

                    this.reset = function () {
                        _iterator.reset();
                    };

                    this.finalize = function() {
                        _iterator.finalize();
                    };

                    this.hasNext = function () {
                        return _iterator.hasNext();
                    };

                    this.decompose = function(callback) {
                        return _iterator.decompose(callback);
                    };

                    this.decomposition = function () {
                        return _iterator.decomposition();
                    };

                    return this;
                }
            }
        });
    } catch(e) {}

})(Math);
