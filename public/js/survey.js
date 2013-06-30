var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SurveySchema =  new Schema({
    user:       String,
    complete:   {type: Boolean, default: false},
    name:		String,
    description:String,
    num_s_ques:	{type: Number, default: 0},
    num_m_ques:	{type: Number, default: 0},
    num_i_ques:	{type: Number, default: 0},
    questions:	Object,
    user_response: Number,
    due_date:	Date,
    created_date:  {type: Date, default: Date.now}
});

var SurveyModel = mongoose.model('surveys', SurveySchema);

function getSurveys(user, callback){
	mongoose.model('surveys', SurveySchema);
    mongoose.connect('mongodb://localhost/surveys');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function cb () {    
        SurveyModel.find({'user': user}, callback);
    });
}; 

module.exports.surveyList = function (user, cb) {	
	isUser(user, function(err, surveys) {
		mongoose.disconnect();
		if (err) { 
	        //cb(err);
	        return;
	    }
	    if (!surveys) {
	        //cb('No Survey\'s'); 
	        return;
	    }
	    return;
	});
};

module.exports.createSurvey = function (user, complete, name, description, due_date, cb) {	
};