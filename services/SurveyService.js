//Set up default mongoose connection

const mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://tosin:1514Stupid!@survey-g2sxd.mongodb.net/test;'//'mongodb://127.0.0.1:27017/survey';
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

class SurveyService {
    constructor(req, res) {
        this.req = req
        this.res = res
    }
    RegisterUser() {
        let self = this;
        let item = this.req.body;
        // create a new user
        User.create(item, function (error, docs) {
            if (error) {
                   if (error.name === 'MongoError' && error.code === 11000) {
                    // Duplicate username
                    return res.status(500).send({
                        succes: false,
                        message: 'Email already exist, you can try logging in!'
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
  async  GetUser(){
        let self = this;
        var item = this.req.params.userdata;
     var user =  await User.findOne({EmailAddress : item.EmailAddress});
     if(!user){
        self.res.status(401).send({
            success: false,
            message: "User does not exist"
        });
     }
     if(user.Password !=item.Password){
        self.res.status(401).send({
            success: false,
            message: "User does not exist"
        });
     }
     if(user.Password == item.Password){
        self.res.status(200).send({
            success: true,
            data:{user:user},  
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
    CreateSurvey() {
        let self = this;
        let item = this.req.body;
        // create a new user
        var survey = Survey({
            Name: "Narcotic Drugs -Substance Abuse",
            Description: ""
        });
        survey.save(function (err) {
            if (err) {
                console.log(err);
                var rs = {
                    success: false,
                    error: "failed"
                }
                return self.res.send(rs);
            };
            console.log('Survey created!');
            var rs = {
                success: true
            }
            return self.res.send(rs);
        });
    }
    CreateQuestion() {
        let self = this;
        let item = this.req.body;
        // create a new user
        var question = Question({
            QuestionText: "On Scale of 1 - 4 , Do you agree there's a drug problem",
            Survey: "5ab7ac36ea1e1a2dab419e70"
        });
        /* Survey.questions.push (qustion-id)*/

        // save the user
        question.save(function (err) {
            if (err) {
                console.log(err);
                var rs = {
                    success: false,
                    error: "failed"
                }
                return self.res.send(rs);
            };
            var rs = {
                success: true
            }
            return self.res.send(rs);
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
            console.log('School created!');
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
        var a = Survey.find({
            'Group': '5ab7e3726fefad470c007ce4'
        }).populate('Questions').
        exec(function (err, result) {
            if (err) return handleError(err);
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
    getSurveyResponses() {
        let self = this;
        var id = this.req.params.id;
        Response.find({
            'Survey': id
        }, function (err, results) {
            var rs = {
                success: true,
                data: results
            }
            self.res.send(rs);
        });

    }
    SubmitResponses() {
        let self = this;
        let responses = this.req.body.Responses;
        Response.insertMany(responses, function (error, docs) {
            if (error) {
                throw error;
            };
            var rs = {
                success: true,
                message: 'Responses Submitted'
            }
            return self.res.send(rs);
        });
    }
}
module.exports = SurveyService