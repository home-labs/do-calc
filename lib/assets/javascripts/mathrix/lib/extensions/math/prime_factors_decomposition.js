(function ($module) {
    "use strict";

    var
        Iterator_ = function(collection) {
            var
                // keys = Object.keys(collection),
                // count = keys.length,
                primeFactor = 2,
                remains = collection,

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

                return remains;
            };

            this.hasNext = function() {
                return remains.count(1) < remains.length;
            };

            this.reset = function() {
                this.remains = collection;
            };

            // através de um método, pode ser retornado um objeto Map associando remains e primeFactor indexados por um índice numérico (array de Maps).

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

                    this.next = function () {
                        return _iterator.next();
                    };

                    this.reset = function () {
                        _iterator.reset();
                    };

                    this.hasNext = function () {
                        return _iterator.hasNext();
                    };

                    this.primeFactor = function() {
                        return _iterator.primeFactor();
                    };

                    this.each = function(callback) {
                        return _iterator.each(callback);
                    };

                    return this;
                }
            }
        });
    } catch(e) {}

})(Math);
