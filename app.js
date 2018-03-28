const express = require('express')
const bodyParser = require('body-parser')
const surveyService  = require('./services/SurveyService')
const app = express()

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
app.post('/api/register', function (req, res) {
  let obj = new surveyService(req, res)
  obj.RegisterUser()
})
app.post('/api/login', function (req, res) {
  let obj = new surveyService(req, res)
  obj.GetUser()
})
app.get('/api/users', function (req, res) {
  let obj = new surveyService(req, res)
  obj.getUsers()
})
app.get('/api/CreateSurvey', function (req, res) {
  let obj = new surveyService(req, res)
  obj.CreateSurvey();
})
app.get('/api/CreateQuestion', function (req, res) {
  let obj = new surveyService(req, res)
  obj.CreateQuestion();
})
app.get('/api/surveys', function (req, res) {
  let obj = new surveyService(req, res)
  obj.getSurveys();
})
app.get('/api/survey/:id', function (req, res) {
  let obj = new surveyService(req, res)
  obj.getSurvey();
})
app.get('/api/survey/questions/:id', function (req, res) {
  let obj = new surveyService(req, res)
  obj.getSurveyQuestions();
})
app.get('/api/survey/responses/:id', function (req, res) {
  let obj = new surveyService(req, res)
  obj.getSurveyResponses();
})
app.post('/api/SubmitResponses', function (req, res) {
  let obj = new surveyService(req, res)
  obj.SubmitResponses();
})
app.listen(3000, function () {
  console.log('Survey listening on port 3000!')
})
