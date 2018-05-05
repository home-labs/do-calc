(function ($) {
    "use strict";

    try {
        Object.defineProperties($.prototype, {

            areMultiples: {
                value: function () {
                    var
                        clone = this.clone();

                    clone.shift();
                    return Number.prototype.areMultiples.apply(this[0], clone);
                }
            },

            min: {
                value: function () {
                    return Math.min.apply(null, this);
                }
            },

            max: {
                value: function () {
                    return Math.max.apply(null, this);
                }
            }

        });

    } catch(e) {}

})(Array);
