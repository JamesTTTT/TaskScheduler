import timeline from "./timeline";
import capacityManage from "./capacitymanager";
const occupiedHrs = {
    getOcpHrs:function getOcpHrs(ocphours){
        localStorage.setItem("ocphours",JSON.stringify(ocphours))
    },
    setOcpHrs:function setOcpHrs(){

    },

    calcTimesOftheDay: function calcTimesOftheDay(start, hours){
        // returns arra with times
        let times = []
        let hour
        let hoursAmount = hours;
        //let hoursInterval = capacityManage.calcCapacity(start, stop)
        let startTime = parseInt(start);
        for(let i=0; i<hoursAmount; i++){
            hour = startTime + i;
            if(hour > 24){
                hour = startTime + i - 24;
            }
            times.push(hour)
            
        }
        return times
    },

    nextAvailbleTime: function nextAvailbleTime(dayOfTY, ocpTimes,cap){
        //console.log(ocpTimes)
        if(ocpTimes.length > 0){
            for(let index in ocpTimes){
                //console.log(ocpTimes[index].occupy)
                const result = ocpTimes[index].occupy.find(({ day }) => day === dayOfTY);
                if(result){
                    console.log(result.day +" matched "+dayOfTY)
                }
                // const x = ocpTimes[index].occupy.map((e)=>{    
                //     if(e.day === day){
                //         console.log(e.day + " matached " + day)
                //     }
                // });
            }
        }
    },

    getOccupyArray: function getOccupyArray(taskStart,startTime,daysHours, ocpTimes,cap){
        let occArr = []

        let dayOfTheYear = timeline.startDateToDay(taskStart)

        // Get first availible days
        let AvbDay = this.nextAvailbleTime(dayOfTheYear,ocpTimes,cap)

        for (let i in daysHours){
            let days = parseInt(dayOfTheYear)+parseInt(i);
            //let freeDay = this.nextAvailbleTime(daysHours[i],startTime,days,ocpTimes);
            let time = this.calcTimesOftheDay(startTime, daysHours[i])
            let newDay ={
                day:days,
                hours:daysHours[i],
                times:time
            }
            occArr.push(newDay);
        }
        return occArr
    },

    calcOcpHours:function calcOcpHours(tasks, workhours, cap){
        //Figure out how to create a new object with loop with all its occupied times 
        let startTime = workhours[0];
        let finishTime = workhours[1];
        let ocpTimes = [];

        for (let index in tasks){
            let duration = tasks[index].duration
            let daysHours = timeline.workDays(cap,duration) // get how many hours of the day this task needs
            // Work out daysHours with pased tasks

            // Task start date
            let taskStart = tasks[index].startdate

            //Get finished data
            let occArr = this.getOccupyArray(taskStart,startTime,daysHours,ocpTimes,cap)

            let newTaskTimes = {
                id: tasks[index].id,
                occupy: occArr
            }
            ocpTimes.push(newTaskTimes)
        }
        //console.log(ocpTimes)
        return ocpTimes

    },


}

export default occupiedHrs