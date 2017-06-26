angular.module('SvgMapApp')

.directive('svgMap', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'img/us_state_map.svg',
        link: function (scope, element, attrs) {
          var regions = element[0].querySelectorAll('.state');
          angular.forEach(regions, function (path, key) {
                          var regionElement = angular.element(path);
                          regionElement.attr("region", "");
                          regionElement.attr("dummy-data", "dummyData");
                          regionElement.attr("hover-region", "hoverRegion");
                          $compile(regionElement)(scope);
                      });
        }
    };
}])
.directive('region', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: {
          dummyData:"=",
          hoverRegion: "="
        },
        link: function (scope, element, attrs) {
            scope.elementId = element.attr("id");
            scope.regionClick = function () {
                alert('Population: ' + scope.dummyData[scope.elementId].population +'\n' +
                      'Voting Population: ' + (scope.dummyData[scope.elementId].demVotes +
                                              scope.dummyData[scope.elementId].repVotes) + '\n' +
                      'Voting Percentage: ' + (Math.round(((scope.dummyData[scope.elementId].demVotes +
                                              scope.dummyData[scope.elementId].repVotes) /
                                              scope.dummyData[scope.elementId].population)*1000)/ 10) + '%\n ' +
                      'Democrat Votes: ' + scope.dummyData[scope.elementId].demVotes +'\n ' +
                      'Republican Votes: ' + scope.dummyData[scope.elementId].repVotes +'\n ' +
                      'Electoral Votes: ' + (scope.dummyData[scope.elementId].demElectoralVotes +
                                             scope.dummyData[scope.elementId].repElectoralVotes) +'\n ' +
                      'Democrat Electoral Votes: ' + scope.dummyData[scope.elementId].demElectoralVotes +'\n ' +
                      'Republican Electoral Votes: ' + scope.dummyData[scope.elementId].repElectoralVotes +'\n '
                    );
            };
            scope.regionMouseOver = function () {
                scope.hoverRegion = scope.elementId;
                element[0].parentNode.appendChild(element[0]);
            };
            element.attr("ng-click", "regionClick()");
            element.attr("ng-attr-fill",
                         "{{dummyData[elementId].value | map_color}}");
           element.attr("ng-mouseover","regionMouseOver()");
           element.attr("ng-class","{active:hoverRegion==elementId}");
            element.removeAttr("region");
            $compile(element)(scope);
        }
    };
}]);
