var express = require( 'express' ),
    mongodb = require( 'mongodb' ),
    passport = require( 'passport' ),
    cookieParser = require( 'cookie-parser' ),
    bodyParser = require( 'body-parser' ),
    methodOverride = require('method-override'),
    node_acl = require( 'acl' ),
    app = express(),
    localStrategy = require( 'passport-local').Strategy,
    acl;

// Some test data. Get this from your database.
var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' },
    { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

// Setup express
  app.use(cookieParser());
    app.use( bodyParser() );
    app.use(methodOverride()),
    app.use(require('express-session')({ secret: 'accesskey'})); 
    app.use( passport.initialize() );
    app.use( passport.session() );
   

// Error handling
app.use( function( error, request, response, next ) {
    if( ! error ) {
        return next();
    }
    response.send( error.msg, error.errorCode );
});

authentication_setup();

// Connecting to mongo database and setup authorization
mongodb.connect( 'mongodb://127.0.0.1:27017/acl', authorization_setup );

// Setting up passport
function authentication_setup() {

    // Setup session support
    passport.serializeUser( function( user, done ) {
        done( null, user.id );
    });

    passport.deserializeUser( function( id, done ) {
        find_user_by_id( id, function ( error, user ) {
           done( error, user );
        });
    });

    // Setup strategy (local in this case)
    passport.use( new localStrategy(
        function( username, password, done ) {
            process.nextTick( function () {
                find_by_username( username, function( error, user ) {

                    if ( error ) {
                        return done( error );
                    }

                    if ( ! user ) {
                        return done( null, false, { message: 'Unknown user ' + username } );
                    }

                    if ( user.password != password ) {
                        return done( null, false, { message: 'Invalid password' } );
                    }

                    // Authenticated
                    return done( null, user );
                });
            });
        }
    ));
}

// Setting up node_acl
function authorization_setup( error, db ) {

    var mongoBackend = new node_acl.mongodbBackend( db /*, {String} prefix */ );

    // Create a new access control list by providing the mongo backend
    //  Also inject a simple logger to provide meaningful output
    acl = new node_acl( mongoBackend, logger() );

    // Defining roles and routes
    set_roles();
    set_routes();
}

// This creates a set of roles which have permissions on
//  different resources.
function set_roles() {

    // Define roles, resources and permissions
    acl.allow([
        {
            roles: 'admin',
            allows: [
                { resources: '/secret', permissions: '*' }
            ]
        }, {
            roles: 'user',
            allows: [
                { resources: '/secret', permissions: '*' }
            ]
        }, {
            roles: 'guest',
            allows: [
                { resources: '/secret', permissions: '*' }
            ]
        }
    ]);

    
    acl.addRoleParents( 'user', 'admin' );
    acl.addRoleParents( 'admin', 'user' );
}

// Defining routes ( resources )
function set_routes() {

    // Check your current user and roles
    app.get( '/status', function( request, response ) {
        acl.userRoles( get_user_id( request, response ), function( error, roles ){
            response.send( 'User: ' + JSON.stringify( request.user ) + ' Roles: ' + JSON.stringify( roles ) );
        });
    });

    // Only for users and higher
    app.get( '/secret',
        // Actual auth middleware
        [ authenticated, acl.middleware( 2, get_user_id ) ],
        function( request, response ) {
            response.send( 'Welcome Sir!' );
        }
    );

    // Logging out the current user
    app.get( '/logout', function( request, response ) {
        request.logout();
        response.send( 'Logged out!' );
    });

    // Logging in a user
    //  http://localhost:3500/login?username=bob&password=secret
    app.get( '/login',
        passport.authenticate( 'local', {} ),
        function( request, response ) {
            response.send( 'Logged in!' );
        }
    );

    // Setting a new role
    app.get( '/allow/:user/:role', function( request, response, next ) {
        acl.addUserRoles( request.params.user, request.params.role );
        response.send( request.params.user + ' is a ' + request.params.role );
    });

    // Unsetting a role
    app.get( '/disallow/:user/:role', function( request, response, next ) {
        acl.removeUserRoles( request.params.user, request.params.role );
        response.send( request.params.user + ' is not a ' + request.params.role + ' anymore.' );
    });
}

// This gets the ID from currently logged in user
function get_user_id( request, response ) {

    // Since numbers are not supported by node_acl in this case, convert
    //  them to strings, so we can use IDs nonetheless.
    console.log("Comes to userId:"+request.user && request.user.id.toString() || false);
    return request.user && request.user.id.toString() || false;
}

// Helper used in session setup by passport
function find_user_by_id( id, callback ) {

    var index = id - 1;

    if ( users[ index ] ) {
        callback( null, users[ index ] );
    } else {
        var error = new Error( 'User does not exist.' );
        error.status = 404;
        callback( error );
    }
}

// Helper used in the local strategy setup by passport
function find_by_username( username, callback ) {

    var usersLength = users.length,
        i;

    for ( i = 0; i < usersLength; i++ ) {
        var user = users[ i ];
        if ( user.username === username ) {
            return callback( null, user );
        }
    }

    return callback( null, null );
}

// Generic debug logger for node_acl
function logger() {
    return {
        debug: function( msg ) {
            console.log( '-DEBUG-', msg );
        }
    };
}

// Authentication middleware for passport
function authenticated( request, response, next ) {

        console.log("Authentication "+request.session.id);

    if ( request.isAuthenticated() ) {
        return next();
    }

    response.send( 401, 'User not authenticated');
}

app.listen( 8080, function() {
    console.log( 'Express server listening on port 8080' );
});