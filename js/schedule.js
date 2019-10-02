const today = new Date();
const day = today.getDay();
const hour = today.getHours();
const minutes = today.getMinutes();

const schedules = {
    aeon: {
        name: 'aeon',
        toCampus: {
            weekdays: [755, 832, 940, 1040, 1155, 1300, 1405, 1605, 1650, 1810, 1910, 2010, 2110, 2140, 2210],
            weekends: [755, 832, 940, 1040, 1155, 1300, 1405, 1605, 1650, 1810, 1910, 2010, 2110, 2140, 2210]
        },
        toYotsugoya: {
            weekdays: [830, 920, 1020, 1135, 1240, 1345, 1545, 1630, 1750, 1850, 1950, 2050, 2120, 2150, 2240],
            weekends: [830, 920, 1020, 1135, 1240, 1345, 1545, 1630, 1750, 1850, 1950, 2050, 2120, 2150, 2240]
        }
    },
    yotsugoya: {
        //To campus and Aeon
        name: 'yotsugoya',
        weekdays: [822, 930, 1030, 1145, 1250, 1355, 1555, 1640, 1800, 1900, 2000, 2100, 2130, 2200],
        weekends: [822, 930, 1030, 1145, 1250, 1355, 1555, 1640, 1800, 1900, 2000, 2100, 2130, 2200]
    },
    campus: {
        //To Yotsugoya and Aeon
        name: 'campus',
        weekdays: [815, 905, 1005, 1120, 1225, 1330, 1530, 1615, 1735, 1835, 1935, 2035, 2105, 2135, 2225],
        weekends: [815, 905, 1005, 1120, 1225, 1330, 1530, 1615, 1735, 1835, 1935, 2035, 2105, 2135, 2225]
    }
};

const selectBus = (from, to) =>{
    let whichBus;
    let moreSchedule;
    if(from == 'aeon' && to == 'yotsugoya'){
        whichBus = new Bus(schedules.aeon.toYotsugoya.weekdays, schedules.aeon.toYotsugoya.weekends);
        document.getElementById('route').innerHTML = "From Aeon to Yotsugoya";
    }else if(from == 'aeon' && to == 'campus'){
        whichBus = new Bus(schedules.aeon.toCampus.weekdays, schedules.aeon.toCampus.weekends);
        document.getElementById('route').innerHTML = "From Aeon to AIU";
    }else if(from == 'yotsugoya'){
        whichBus = new Bus(schedules.yotsugoya.weekdays, schedules.yotsugoya.weekends);
        document.getElementById('route').innerHTML = "From Yotsugoya to AIU";
    }else if(from == 'campus'){
        whichBus = new Bus(schedules.campus.weekdays, schedules.campus.weekends);
        document.getElementById('route').innerHTML = "From AIU to Aeon";
    }else{
        return 'error';
    }

    // return whichBus.suggest();
    moreSchedule = whichBus.showMoreSchedule();
    moreSchedule.shift(); //removes the closest time

    if(typeof whichBus.suggest() !== 'string'){
        document.getElementById('closest-schedule').innerHTML = 'See ya tmrw!';
    }else{
        document.getElementById('closest-schedule').innerHTML = whichBus.suggest();
    }

    document.getElementsByClassName('schedule-list')[0].innerHTML = moreSchedule.map(time => {
        return `<li>${time}</li>`;
    }).join(" ");
};

class Bus {
    constructor(weekdays, weekends){
        this.weekdays = weekdays;
        this.weekends = weekends;
    }
    suggest(){
        const currentTime = hour * 100 + minutes;
    
        let schedule = [];
        if(day == 0 || day == 6){
            schedule = this.weekends;
        }else{
            schedule = this.weekdays;
        }
        const filtered = schedule.filter(time => time > currentTime);
        let filteredStr = filtered.map(time => time.toString());
        //add ':' in the time stamp
        filteredStr = filteredStr.map(time => {
            if(time.length > 3){
                return time[0] + time[1] + ':' + time[2] + time[3];
            }else{
                return time[0] + ':' + time[1] + time[2];
            }
        });
        const closestTime = filteredStr[0];    
        return closestTime;
    }

    showMoreSchedule(){
        const currentTime = hour * 100 + minutes;
    
        let schedule = [];
        if(day == 0 || day == 6){
            schedule = this.weekends;
        }else{
            schedule = this.weekdays;
        }
        const filtered = schedule.filter(time => time > currentTime);
        let filteredStr = filtered.map(time => time.toString());
        //add ':' in the time stamp
        filteredStr = filteredStr.map(time => {
            if(time.length > 3){
                return time[0] + time[1] + ':' + time[2] + time[3];
            }else{
                return time[0] + ':' + time[1] + time[2];
            }
        });
        return filteredStr;
    }
};

let departure = schedules.campus.name;
let destination = schedules.campus.name;
let routeName = 'From AIU to Aeon';

const getDeparture = (a) =>{
    let value = a.innerHTML;
    value = value.toLowerCase();
    departure = value;
    selectBus(departure, destination);
};

const getDestination = (a) =>{
    let value = a.innerHTML;
    value = value.toLowerCase();
    destination = value;
    selectBus(departure, destination);
}

const moreScheduleButton = (a) =>{
    let value = a.innerHTML;
    value = value.toLowerCase();
    if(value == "see more schedule"){
        setTimeout(()=>{
            document.getElementById("button").innerHTML = "Hide the schedule";
        }, 250);
    }
    if(value == "hide the schedule"){
        setTimeout(()=>{
            document.getElementById("button").innerHTML = "See more schedule";
        }, 250);
    }
}

