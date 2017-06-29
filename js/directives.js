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
                      'Voting Population: ' + Math.round(((scope.dummyData[scope.elementId].demVotes +
                                                            scope.dummyData[scope.elementId].repVotes) /
                                              scope.dummyData[scope.elementId].population)*1000)/ 10 + '% | ' +
                                              (scope.dummyData[scope.elementId].demVotes +
                                              scope.dummyData[scope.elementId].repVotes) + '\n' +
                      'Democrat Votes: ' + Math.round((scope.dummyData[scope.elementId].demVotes /
                                                       (scope.dummyData[scope.elementId].demVotes +
                                                        scope.dummyData[scope.elementId].repVotes))*1000) / 10 +'% | ' +
                                           scope.dummyData[scope.elementId].demVotes +'\n ' +
                       'Republican Votes: ' + Math.round((scope.dummyData[scope.elementId].repVotes /
                                                         (scope.dummyData[scope.elementId].demVotes +
                                                         scope.dummyData[scope.elementId].repVotes))*1000) / 10 +'% | ' +
                                            scope.dummyData[scope.elementId].repVotes +'\n\n ' +
                      'Electoral Votes: ' + (scope.dummyData[scope.elementId].demElectoralVotes +
                                             scope.dummyData[scope.elementId].repElectoralVotes) +'\n ' +
                      'Democrat Electoral Votes: ' + Math.round((scope.dummyData[scope.elementId].demElectoralVotes /
                                                       (scope.dummyData[scope.elementId].demElectoralVotes +
                                                        scope.dummyData[scope.elementId].repElectoralVotes))*1000) / 10 +'% | ' +
                                                        scope.dummyData[scope.elementId].demElectoralVotes +'\n ' +
                      'Republican Electoral Votes: ' + Math.round((scope.dummyData[scope.elementId].repElectoralVotes /
                                                       (scope.dummyData[scope.elementId].demElectoralVotes +
                                                        scope.dummyData[scope.elementId].repElectoralVotes))*1000) / 10 +'% | ' +
                                                        scope.dummyData[scope.elementId].demElectoralVotes +'\n\n ' +
                      'Represented Votes: ' + Math.round((scope.dummyData[scope.elementId].represented /
                                                       (scope.dummyData[scope.elementId].demVotes +
                                                        scope.dummyData[scope.elementId].repVotes))*1000) / 10 +'% | ' +
                                           scope.dummyData[scope.elementId].represented +'\n ' +
                       'Unrepresented Votes: ' + Math.round((scope.dummyData[scope.elementId].unrepresented /
                                                        (scope.dummyData[scope.elementId].demVotes +
                                                         scope.dummyData[scope.elementId].repVotes))*1000) / 10 +'% | ' +
                                            scope.dummyData[scope.elementId].unrepresented +'\n '
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
