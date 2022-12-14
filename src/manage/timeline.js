import moment from 'moment/moment'
const timeline = {
    //EACH DAY IS 24px
      figurePosX: function figurePosX(day){
        return day * 24 - 24;
      },

       //EACH DAY IS 24px
      figurePosEnd: function figurePosEnd(day){
        return day * 24;
      },

        //hours are 40px and days 960px
       figureHourPos: function figureHourPos(day, hour) {
           let dayPos = day * 960 - 960;
           let hourPos = hour * 40;
           let pos = dayPos + hourPos;
           return pos;
       },

      //hours are 40px and days 960px
      figureHourPosEnd: function figureHourPosEnd(day, hour) {
        let dayPos = day * 960;
        let hourPos = hour * 40;
        let pos = dayPos + hourPos;
        return pos;
      },

      figurePassedPos: function figurePassedPos(workHours, deadline){
        //shows how much  task missed the deadline
        let deadlineDate = moment(deadline);
        let finalMoment = workHours.occupy.at(-1);
        let finalDate = moment().dayOfYear(finalMoment.day);
        let days = finalDate.diff(deadlineDate, 'days');
        let finalHours=finalMoment.times[0];

        return days*960+finalHours*40
      },
     
      //Determines when the day starts on the timeline
      startDateToDay: function startDateToDay(date){
        let now = new Date(date)
        const day = moment(now).dayOfYear();
        return day
      },
     
      //Determines the lenght of the task
      taskLenght: function taskLenght(start, end){
        let startdate = new Date(start)
        let deadline = new Date(end)
        let difference = deadline.getTime() - startdate.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        // if(TotalDays <= 1){
        //   return 1
        // }
        return TotalDays
      },

     // Gives out how many day of each month during given year
      daysOfTheMonth: function daysOfTheMonth(y){
        let daysInMonths = [];
        let yearMonth = "";
        for (let mon = 1; mon<=12; mon++) {
          //Check how if month is double digit
          if(mon<10){
            yearMonth = y.toString()+"-0"+mon.toString()
          }else{
            yearMonth = y.toString()+"-"+mon.toString()
          }
          const numDaysInMonth = moment(yearMonth, "YYYY-MM").daysInMonth();
          daysInMonths.push(numDaysInMonth)
        }
        return daysInMonths
      },

      //Creates an array that fills up with hours of the day
      hoursOfTheDay: function hoursOfTheDay(){
        let hours = [];
        new Array(24).fill().forEach((acc, index) => {
            hours.push(moment( {hour: index} ).format('H:mm'));
            //items.push(moment({ hour: index, minute: 30 }).format('h:mm A'));
        })
        return hours
      },

      // Don't forget to change Year !!!!
      timelineDailyLen: function timelineLen(entities){
        let year = moment().year();
        let monthDaysArr = this.daysOfTheMonth(year)
        let dayYear = monthDaysArr.reduce((partialSum, a) => partialSum + a, 0);
        return dayYear * entities
      },

      //Positions for each month in hourly timeline
      monthPos: function monthPos(pos){
        let months = moment.months();
        let monthPositions = [];
        let daysInMonthArr = this.daysOfTheMonth(2022)
        let monthPos=0;

        for(let i=0; i<12; i++){
          monthPos += daysInMonthArr[i]*960;
          monthPositions.push(monthPos)
        }

        for(let i=0; i<12; i++){
          if(pos < monthPositions[i]){
            return months[i]
          }
        }
      },

      workDays: function workDays(cap,duration){
        //returns array with how many days/hours this task is 
        let daysHours = [];
        let taskTime = duration/cap;
        let days = Math.floor(taskTime);
        let hours = duration - days * cap;
        for(let i=0;i<days;i++){
          daysHours.push(cap)
        }
        if(hours){
          daysHours.push(hours)
        }
        return daysHours
      },

      algDuration: function algDuration(workHours){
        let ocpWorkHours = workHours.occupy;
        let hrsPerDay = [];
        for(let index in ocpWorkHours){
          hrsPerDay.push(ocpWorkHours[index].hours)
        }
        return hrsPerDay
      },

      algDays: function algDays(workHours){
        let days = [];
        let ocpWorkHours = workHours.occupy;
        for(let i in ocpWorkHours){
          days.push(ocpWorkHours[i].day)
        }
       // console.log(days)
        return days;
      },

      algDayPos: function algDayPos(day, startdate, index){
       let dayDate = moment().dayOfYear(day);
       let startDate = moment(startdate);
       let zero = 24*index
       let diff = dayDate.diff(startDate, 'days');
       return diff*24-zero
      },

      workDaysPos: function workDaysPos(start, day, capacity){
        //Sets postion of tasks
        //start = workHours
        //day = index
        //they all have to start in the same place
        let startPos;
        let len = capacity*40;
        let zero = len* day
        let time = 40*start;
        startPos = time+960*day-zero

        return startPos;
      },

      algWorkDaysPos: function workDaysPos(startDate, task, index){
        // startDate is when the task starts
        // dayOfYear is what day of the year the task starts on
        // start is time you start working
        //console.log(task[index].times.length)
        let pos;
        let len = 0;

        for(let i = 0; i<index; i++){
          len += task[i].times.length * 40
        }
        let diff = task[index].day - startDate
        let time = task[index].times[0] * 40;

        pos = time+960*diff-len
        //console.log(diff)
        return pos;
      }



    }



export default timeline