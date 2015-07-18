Array.prototype.insertionSort = function() {
    var
        _sort = this,
        aux,
        i = 0,
        count = 0
    ;

    while(true) {
        if(count === _sort.length -1) { break; }
        while(true) {
            i = count;
            if( _sort[i] > _sort[i+1] ) { //0, 1
                aux = _sort[i];
                _sort[i] = _sort[i+1];
                _sort[i+1] = aux;
                while(true) {
                    if(i === 0 || _sort[i] > _sort[i-1]) { break; }
                    aux = _sort[i];
                    _sort[i] = _sort[i-1];
                    _sort[i-1] = aux;
                    i--;
                }
            }
            if(i === 0 || _sort[i] < _sort[i+1]) {
                break;
            }
        }
        count++;
    }

    return _sort;
}
