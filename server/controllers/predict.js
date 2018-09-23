var moment = require('moment');

convertToHour = (timeHour) => {
	const numberHour = parseInt(timeHour);
	const seconds = numberHour * 3600;
	return seconds;  
}

convertToMinutes = (timeMinutes) => {
	const numberMinutes = parseInt(timeMinutes);
	const seconds = numberMinutes * 60;
	return seconds;
}

convertToSeconds = (timeSeconds) => {
	const numberSeconds = parseInt(timeSeconds);
	return numberSeconds;
}

convertTimeToSeconds = (timeM) => {
	const listTime = timeM.split(":");
	const hourConverted = convertToHour(listTime[0]);
	const minutesConverted = convertToMinutes(listTime[1]);
	const seconds = convertToSeconds(listTime[2]);
	const totalSeconds = hourConverted + minutesConverted + seconds;
	return totalSeconds;
}

exports.predict_time = (req, res, next) => {
	const tractoplanas = +req.query.tractoplanas || 0;
	const buques = +req.query.buques || 0;
	const personal = +req.query.personal || 0;
	const ecuacion = tractoplanas * 22.6 + buques * 12.1 + personal * 31.2;
	const timeM = moment.utc(ecuacion * 1000).format('HH:mm:ss');
	res.status(500).json({result: ecuacion, timeResult: timeM})
};

exports.predict_tractoplanas = (req, res, next) => {
	const timeM = req.query.timeM;
	let timeNumber = 0;

	if(typeof timeM !== "undefined"){
		timeNumber = convertTimeToSeconds(timeM);
	}
	
	const buques = +req.query.buques || 0;
	const personal = +req.query.personal || 0;
	const tractoplanas = (timeNumber - buques * 12.1 - personal * 31.2) / 22.6;
	const roundTractoplanas = Math.round(tractoplanas);
	res.status(500).json({result: roundTractoplanas});
};