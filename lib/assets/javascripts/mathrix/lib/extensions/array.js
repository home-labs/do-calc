(function($) {
    "use strict";

    try {
        Object.defineProperties($.prototype, {

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
