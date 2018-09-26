const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { Freelancer } = require('../mongoose/model/User');
const { Buyer } = require('../mongoose/model/Buyer');
const { jwtPass } = require('../config');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = jwtPass;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        let type = jwt_payload.user.accountType;
        console.log(jwt_payload.user.accountType);
        if (type == "Freelancer") {
            Freelancer.findOne({ id: jwt_payload.id }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });

        }
        else {
            Buyer.findOne({ id: jwt_payload.id }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        }

    }));
};