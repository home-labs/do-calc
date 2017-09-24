(function($) {
    "use strict";

    try {
        Object.defineProperties($.prototype, {

            intersection: {
                value: function(set) {
                    var
                        smaller,
                        larger,
                        all = [this, set],

                        classifier = function(first, second) {
                            return first.length > second.length;
                        };

                    smaller = (all = all.sort(classifier)).first();
                    larger = all[1];

                    return smaller.filter(function(item) {
                      return larger.includes(item);
                    }).uniq();
                }
            },

            intersections: {
                value: function(sets) {
                    var
                        smaller,
                        self = this,
                        all = Array.from(arguments),

                        classifier = function(first, second) {
                            return first.length > second.length;
                        };

                    all.push(self);
                    all.sort(classifier);
                    smaller = all.deleteIndex(0);
                    return all.reduce(function(intersections, list) {
                        return intersections.intersection(list);
                    }, smaller.intersection(all.first()));
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
