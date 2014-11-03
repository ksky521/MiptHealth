/**
 * Created by sabir on 16.10.14.
 */

var LoginManager = function(){
    var self = this;
    this.currentUser = undefined;

    this.initParse = function(){
        var appId = 'KNYnAGgkTVXhSXGzccX33w7ayISaEZBTYd01Qr8X';
        var jsKey = 'TiXXLbopBebZXO7XHBVdJGNVlXpEVSHhLkmsaLOh';
        Parse.initialize(appId, jsKey);
    }

    this.init = function(){
        self.initParse();
        self.checkCurrentUser(function(){
            self.initLoginButton();
        });
    }

    this.checkCurrentUser = function(callback){
        if (Parse.User.current() != undefined){
            window.location.href = 'home/index.html';
            return;
        }
        callback();
    }


    this.login = function(username, password, callback){
        console.log('trying to logIn: username = ' + username + ' ; password = ' + password);
        Parse.User.logIn(username, password, {
            success: function(user){
                self.currentUser = Parse.User.current();
                callback();
            },
            error: function(user, error){
                alert(error.message);
            }
        });
    }

    this.initLoginButton = function(){
        $('#loginButton').bind('click', function(){
            var username = $('#username').val().trim();
            var pass = $('#password').val().trim();
            self.login(username, pass, function(){
                if (self.currentUser.get('userRole') == 'Doctor'){
                    window.location.href = 'home/index.html';
                }
            });
        });
    }

}