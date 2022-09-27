import moment from 'moment/moment'

const timeline = {
    figurePosX: function figurePosX(day){
        //EACH DAY IS 24px
        return day * 24 - 24
      },
     
    figurePosEnd: function figurePosEnd(day){
        //EACH DAY IS 24px
        return day * 24
      },
     
      //Determines when the day starts on the timeline
    startDateToDay: function startDateToDay(date){
        let now = new Date(date)
        let start = new Date(now.getFullYear(), 0, 0);
        let diff = now - start;
        let oneDay = 1000 * 60 * 60 * 24;
        let day = Math.floor(diff / oneDay);
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
          yearMonth = y.toString()+"-0"+mon.toString()
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

    }



export default timeline