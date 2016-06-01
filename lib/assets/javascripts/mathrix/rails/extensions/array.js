"use strict";

var
    Extensor;

(function ($) {

    Extensor.new($, {

        prototype: {
            difference: function () {
                var
                    args = [],
                    differences = [],
                    i;

                if (arguments.length > 0) {
                    for (i in arguments) {
                        if (arguments.hasOwnProperty(i)) {
                            args.push((arguments[i]).uniq());
                        }
                    }
                } else {
                    return this;
                }

                args.unshift(this);
                differences = args.reduce(function (prev, curr, i) {

                    if (i === 1) {
                        differences = prev.filter(function (v) {
                            return curr.indexOf(v) === -1;
                        });
                    } else {
                        differences = differences.filter(function (v) {
                            return curr.indexOf(v) === -1;
                        });
                    }

                    return differences;
                });

                return differences;
            },

            intersection: function () {
                var
                    args = [],
                    intersects = [],
                    self,
                    i;

                self = this;
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
                    if (i === 1) {
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
                    //console.log(_intersects);
                    // returns to reduce
                    return intersects;
                });

                return intersects;
            }
        }
    });

})(Array);
