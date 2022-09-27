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
      }
    }

export default timeline