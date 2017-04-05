(function ($) {
    "use strict";

    try {
        Object.defineProperties($.prototype, {
            intersection: {
                value: function () {
                    var
                        i,
                        self = this,
                        args = [],
                        intersects = [];

                    if (arguments.length > 0) {
                        for (i in arguments) {
                            if (arguments.hasOwnProperty(i)) {
                                args.push((arguments[i]).uniq());
                            }
                        }
                    } else if (self.length > 0) {
                        self.forEach(function (v) {
                            args.push(v.uniq());
                        });
                    } else {
                        return [];
                    }

                    intersects = args.asc().reduce(function (prev, curr, i) {
                        if (i == 1) {
                            intersects = prev.filter(function (v) {
                                // returns to filter method
                                return curr.indexOf(v) > -1;
                            });
                        } else {
                            intersects = intersects.filter(function (v) {
                                return curr.indexOf(v) > -1;
                            });
                        }
                        //console.log(i);
                        //console.log(intersects);
                        // returns to reduce
                        return intersects;
                    });

                    return intersects;
                }
            },

            areMultiples: {
                value: function () {
                    var
                        clone = this.clone();

                    clone.shift();
                    return Number.prototype.areMultiples.apply(this[0], clone);
                }
            }

        });

    } catch(e) {}

})(Array);
