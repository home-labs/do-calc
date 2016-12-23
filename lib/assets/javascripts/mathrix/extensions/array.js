"use strict";

var
    Extensor;

(function ($) {

    Extensor.new($, {

        prototype: {
            isMultiple: function () {
                var
                    _args = this
                    ,i = 0
                    ,ii = 0
                ;

                _args = _args.destroy(1);
                _args = _args.uniq();
                if(_args.length <= 1) { return true; }

                _args = _args.desc();
                i = 0;
                while(true) {
                    ii = i + 1;
                    while(true) {
                        if(_args[i]%_args[ii] !== 0) { return false; }
                        if (ii === _args.length -1) { break; }
                        ii++;
                    }
                    i++;
                    if (i === _args.length -1) { break; }
                }

                return true;
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
