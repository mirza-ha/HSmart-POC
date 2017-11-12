//import express = require("express")
var angular = require("lib/angular/angular.js")

var angularresource = require("lib/angular/angular-resource.js")

var angularroute = require("lib/angular/angular-route.js")
var uibootstrap = require("lib/angular/ui-bootstrap-tpls-0.4.0.js")

var keycloak = require("/auth/js/keycloak.js")


var module = angular.module('product', []);

var auth = {};
var logout = function(){
    console.log('*** LOGOUT');
    auth.loggedIn = false;
    auth.authz = null;
    window.location = auth.logoutUrl;
};


angular.element(document).ready(function ($http) {
    //var keycloakAuth = new Keycloak('keycloak.json');

    var keycloakAuth = new Keycloak({
        "realm" : "demo",
        "auth-server-url" : "http://localhost:8080/auth",
        "ssl-required" : "external",
        "resource" : "angular2-product",
        "public-client" : true,
        "clientId": "angular2-product"
      });



    auth.loggedIn = false;

    keycloakAuth.init({ onLoad: 'login-required' }).success(function () {
        auth.loggedIn = true;
        auth.authz = keycloakAuth;
        auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/demo/protocol/openid-connect/logout?redirect_uri=/angular-product/index.html";
        module.factory('Auth', function() {
            return auth;
        });
        angular.bootstrap(document, ["product"]);
    }).error(function () {
            window.location.reload();
        });

});

module.controller('GlobalCtrl', function($scope, $http) {
    $scope.products = [];
    $scope.reloadData = function() {
        $http.get("/database/products").success(function(data) {
            $scope.products = angular.fromJson(data);

        });

    };
    $scope.logout = logout;
});


module.factory('authInterceptor', function($q, Auth) {
    return {
        request: function (config) {
            var deferred = $q.defer();
            if (Auth.authz.token) {
                Auth.authz.updateToken(5).success(function() {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + Auth.authz.token;

                    deferred.resolve(config);
                }).error(function() {
                        deferred.reject('Failed to refresh token');
                    });
            }
            return deferred.promise;
        }
    };
});




module.config(function($httpProvider) {
    $httpProvider.responseInterceptors.push('errorInterceptor');
    $httpProvider.interceptors.push('authInterceptor');

});

module.factory('errorInterceptor', function($q) {
    return function(promise) {
        return promise.then(function(response) {
            return response;
        }, function(response) {
            if (response.status == 401) {
                console.log('session timeout?');
                logout();
            } else if (response.status == 403) {
                alert("Forbidden");
            } else if (response.status == 404) {
                alert("Not found");
            } else if (response.status) {
                if (response.data && response.data.errorMessage) {
                    alert(response.data.errorMessage);
                } else {
                    alert("An unexpected server error has occurred");
                }
            }
            return $q.reject(response);
        });
    };
});

<button type="submit" data-ng-click="reloadData()">Reload</button>
