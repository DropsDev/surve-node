//Set up default mongoose connection
const mongoose = require('mongoose');
var mongoDB = 'mongodb://tosin:1514Stupid!@ds127129.mlab.com:27129/heroku_rlhn90bt';
//var mongoDB ='mongodb://127.0.0.1:27017/survey';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
var defaultSurveyGroup = "5ab7e3726fefad470c007ce4";
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var User = require('../models/User');
var School = require('../models/School');
var Survey = require('../models/Survey');
var Category = require('../models/SurveyCategory');
var Question = require('../models/Question');
var Response = require('../models/Response');
var ResponseItem = require('../models/ResponseItem');

class SurveyService {
    constructor(req, res) {
        this.req = req
        this.res = res
    }
    RegisterUser() {
        let self = this;
        let item = this.req.body;
        // create a new user
        item.Created_at = new Date();
        User.create(item, function (error, docs) {
            if (error) {
                if (error.name === 'MongoError' && error.code === 11000) {
                    // Duplicate username
                    return res.status(500).send({
                        succes: false,
                        message: 'Email already exists, you can try logging in!'
                    });
                    throw error;
                }
            };
            var rs = {
                success: true,
                message: 'User created'
            }
            return self.res.status(200).send(rs);
        });
    }
    async Authenticate() {
        let self = this;
        var item = this.req.body;
        var user = await User.findOne({
            Email: item.username
        });

        if (!user) {
            self.res.status(401).send({
                success: false,
                message: "User does not exist"
            });
        }
        if (user.Password != item.password) {
            self.res.status(401).send({
                success: false,
                message: "User does not exist"
            });
        }
        if (user.Password == item.password) {
            self.res.status(200).send({
                success: true,
                data: {
                    user: user
                },
                message: "Welcome"
            });
        }
    }
    getUsers() {
        let self = this;
        let item = this.req.body;
        User.find({}, function (err, users) {
            var userMap = {};

            users.forEach(function (user) {
                userMap[user._id] = user;
            });

            self.res.send(users);
        });
    }
    AddSchool() {
        let self = this;
        let item = this.req.body;
        // create a new user
        var newUser = School({
            Name: 'ST Louis Grammar School',
            Location: 'Ibadan'
        });

        // save the user
        newSchool.save(function (err) {
            if (err) {
                throw err;
            };
            var rs = {
                success: true,
                message: newSchool.Name + " Created"
            }

            return self.res.send(rs);
        });
    }
    getSurveys() {
        let self = this;
        let item = this.req.body;
        var a = Survey.find().populate('Questions').sort({
            'Order': 1
        }).
        exec(function (err, result) {
            if (err) {
             throw err;
            }
            var rs = {
                success: true,
                data: result
            }
            self.res.send(rs);
        });
    }
    getSurvey() {
        let self = this;
        var id = this.req.params.id;
        Survey.findById(id, function (err, results) {
            var rs = {
                success: true,
                data: results
            }
            self.res.send(rs);
        });
    }
    getSurveyQuestions() {
        let self = this;
        var id = this.req.params.id;
        Question.find({
            'Survey': id
        }, function (err, results) {
            var rs = {
                success: true,
                data: results
            }
            self.res.send(rs);
        });

    }
    getResponses() {
        let self = this;
        var id = this.req.params.id;
        Response.findById(id).exec(function (err, results) {
            if(err){
                throw err;
            }
            var rs = {
                success: true,
                data: results
            }
         self.res.send(rs);
        });
    }
    getSurveyTaken() {
        let self = this;
        var userId = this.req.params.userId;
        if (userId == 0) {
            Response.find().sort({
                'ResponseDate': -1
            }).populate("Surveys").exec(function (err, results) {
                if(err){
                    throw err;
                }
                var rs = {
                    success: true,
                    data: results
                }
             self.res.send(rs);
            });

        } else {
            Response.find({
                'User': [userId]
            }, function (err, results) {
                var rs = {
                    success: true,
                    data: results
                }
                self.res.send(rs);
            });
        }
    }
    getLastSurveyDate() {
        let self = this;
        var userId = this.req.params.userId;
            Response.findOne({User:userId}).sort({
                'ResponseDate': -1
            }).select("ResponseDate").exec(function (err, results) {
                if(err){
                    throw err;
                }
                var rs = {
                    success: true,
                    data: results
                }
             self.res.send(rs);
            });
    }
    LogResponse() {
        let self = this;
        var item = this.req.body.Response;
        Response.create(item, function (error, obj) {
            if (error) {
                throw error;
            }
            var rs = {
                success: true,
                message: "Response logged",
                value: obj._id
            }
            return self.res.status(200).send(rs);
        });
    }

    getDashboard() {

    }
}
module.exports = SurveyService