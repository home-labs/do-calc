(function($) {
    "use strict";

    try {
        Object.defineProperties($.prototype, {
            intersection: {
                value: function() {
                    var
                        i,
                        current,
                        acumulator,
                        aux,
                        uniq = this.uniq(),
                        args = [],
                        intersects = [],

                        callback = function(v) {
                            if (acumulator.indexOf(v) != -1) {
                                aux.push(v);
                            }
                        },

                        argsIteratorBlock = function(a, value, i) {
                            aux = a;
                            if (i === 0) {
                                current = uniq;
                                acumulator = value;
                            } else {
                                current = value;
                                acumulator = aux.clone();
                            }

                            if (args.length -1 == i) {
                                aux = [];
                            }

                            current.forEach(callback);

                            return aux;

                        };

                    if (arguments.length > 0) {
                        for (i in arguments) {
                            if (arguments.hasOwnProperty(i)) {
                                args.push((arguments[i]).uniq());
                            }
                        }
                    } else {
                        return [];
                    }

                    intersects = args.reduce(argsIteratorBlock, []);

                    return intersects.asc();
                }
            },

            areMultiples: {
                value: function() {
                    var
                        clone = this.clone();

                    clone.shift();
                    return Number.prototype.areMultiples.apply(this[0], clone);
                }
            }

        });

    } catch(e) {}

})(Array);
