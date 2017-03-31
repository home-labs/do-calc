(function ($) {
    "use strict";

    try {
        Object.defineProperties($.prototype, {
            areMultiple: {
                value: function () {
                    var
                        args = this,
                        i = 0,
                        ii = 0;

                    args = args.destroy(1);
                    args = args.uniq();
                    if(args.length <= 1) { return true; }

                    args = args.desc();
                    i = 0;
                    while(true) {
                        ii = i + 1;
                        while(true) {
                            if(args[i] % args[ii] !== 0) { return false; }
                            if (ii === args.length -1) { break; }
                            ii++;
                        }
                        i++;
                        if (i === args.length -1) { break; }
                    }

                    return true;
                }
            },

            areMultiple: {
                value: function () {
                    var
                        args = this,
                        i = 0,
                        ii = 0;

                    args = args.destroy(1);
                    args = args.uniq();
                    if(args.length <= 1) { return true; }

                    args = args.desc();
                    i = 0;
                    while(true) {
                        ii = i + 1;
                        while(true) {
                            if(args[i]%args[ii] !== 0) { return false; }
                            if (ii === args.length -1) { break; }
                            ii++;
                        }
                        i++;
                        if (i === args.length -1) { break; }
                    }

                    return true;
                }
            },

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

    } catch(e) {}

})(Array);
