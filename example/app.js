import angular from 'angular';
import angularAnimate from 'angular-animate';
import '../src/loading-bar';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/loading-bar.css';

angular
  .module('LoadingBarExample', ['chieffancypants.loadingBar', angularAnimate])
  .config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
  })

  .controller('ExampleCtrl', function(
    $scope,
    $http,
    $timeout,
    cfpLoadingBar,
    $sce,
    $q
  ) {
    $scope.ipsums = [];
    $scope.section = null;

    var trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    var apiUrl = 'https://api.github.com/organizations?per_page=50';

    $scope.xhr = function() {
      $http
        .jsonp(trustSrc(apiUrl), { jsonpCallbackParam: 'callback' })
        .then(function(resp) {
          $scope.ipsums = resp.data.data;
        })
        .catch(function(err) {
          throw err;
        });
    };

    var promiseWrap = function(promise) {
      return $q((resolve, reject) => {
        promise.then(resolve).catch(reject);
      });
    }

    var fetchWrap = function() {
      return fetch(trustSrc(apiUrl))
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          return json;
        })
        .catch(function(err) {
          throw err;
        });
    }

    $scope.fetch = function() {
      promiseWrap(fetchWrap()).then(function(data) {
        $scope.ipsums = data;
      });
    };

    $scope.start = function() {
      cfpLoadingBar.start();
    };

    $scope.complete = function() {
      cfpLoadingBar.complete();
    };

    // fake the initial load so first time users can see it right away:
    $scope.start();
    $scope.fakeIntro = true;
    $timeout(function() {
      $scope.complete();
      $scope.fakeIntro = false;
    }, 750);
  });
