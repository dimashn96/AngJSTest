newsApp.directive("sourcesList", function () {
    return {
        link: function (scope, element) {
            function cons() {
                console.log(scope);
                console.log(scope.$parent.bool = true);
            }
            setInterval(cons,5000);
            scope.$watch("sources",function() {
                element.html('');
                let sources = scope.sources;
                if (angular.isArray(sources)) {
                    let ulElem = angular.element("<ul>");
                    ulElem.html('<input type="checkbox" ng-model="scope.$parent.bool">');
                    element.append(ulElem);
                    for (let i = 0; i < sources.length; i++) {
                        let liElem = angular.element('<li>');
                        liElem.append(angular.element('<input type="checkbox" id="' + sources[i].id + '" ng-model="sources[i].choose">'));
                        liElem.append(angular.element('<label for="' + sources[i].id + '">').text(sources[i].name));
                        ulElem.append(liElem);
                    }
                }
            });
        },
        scope: true
    }
});