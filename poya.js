const https = require('https');
const moment = require('moment');

const getAllPoyaDates = () =>{
    return new Promise(function(resolve, reject){
        const options = {method: 'GET', hostname: 'nextpoyawhen.com', path: '/poya.json', port:443};
        const req = https.request(options, (res) => {
            result = ''
            
            res.on('data', function(data){
                result += data;
            });

            res.on('end', function(){
                result = JSON.parse(result);
                resolve(result);
            });

            
        }); 

        req.on('error', function(error){
            reject(error);
        });
        req.end();
    })
}

const getNextPoyaDate = () =>{
    return new Promise(function(resolve, reject){
        getAllPoyaDates().then(function(poyaDates){
            const todayDate = new Date();
            let thisMonth = todayDate.getMonth()+1; // getMonth() returns January as 0
            let nextMonth = todayDate.getMonth()+2;
            const thisDay = todayDate.getDate();
            if (poyaDates == []){
                reject("Empty Array");
            }
            poyaDates.forEach(function(nextPoyaDate){
                if ((nextPoyaDate[1] == thisMonth && nextPoyaDate[2] > thisDay) || (nextPoyaDate[1] == nextMonth)){
                    resolve(moment([nextPoyaDate[0], nextPoyaDate[1]-1, nextPoyaDate[2]]));
                }
            })
        })
    })
}

const getDaysRemaining = (nextPoyaDate) =>{
    const todayDate = moment();
    const daysRemaining = nextPoyaDate.diff(todayDate, 'days')+1;
    return daysRemaining;
}

exports.getAllPoyaDates = getAllPoyaDates;
exports.getNextPoyaDate = getNextPoyaDate;
exports.getDaysRemaining = getDaysRemaining;




