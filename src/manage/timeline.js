import moment from 'moment/moment'

const timeline = {

    //EACH DAY IS 24px
    figurePosX: function figurePosX(day){
        return day * 24 - 24
      },

     //EACH DAY IS 24px
    figurePosEnd: function figurePosEnd(day){
        return day * 24
      },

      //Days are 40px and days 960px
    figureHourPos: function figureHourPos(day, hour) {
        let dayPos = day * 960;
        let hourPos = hour * 40;
        let pos = dayPos + hourPos;
        return pos;
    },
     
      //Determines when the day starts on the timeline
      startDateToDay: function startDateToDay(date){
        let now = new Date(date)
        const day = moment(now).dayOfYear();
        return this.figurePosX(day)
      },
     
      //Determines the lenght of the task
      taskLenght: function taskLenght(start, end){
        let startdate = new Date(start)
        let deadline = new Date(end)
        let difference = deadline.getTime() - startdate.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        if(TotalDays <= 1){
          return 24
        }
        return this.figurePosEnd(TotalDays)
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
      }

    }



export default timeline