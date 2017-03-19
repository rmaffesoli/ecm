angular.module('SvgMapApp')
.filter('map_color', [function () {
    return function (input) {
        var b = 255 - Math.floor(input * 255);
        var r = Math.floor(input * 255);
        return "rgba("+ r + ",0," + b + ",1)";
    };
}]);
