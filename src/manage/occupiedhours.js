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

    firstTime: function firstTime(startTime, daysHours, dayOfTheYear){
        let occArr = []
        for (let i in daysHours){
            let days = parseInt(dayOfTheYear)+parseInt(i);
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

    findAllTaskWithDay: function findAllTaskWithDay(curDay, ocpTimes){
        let e = [];
        let x;
        for (let i in ocpTimes){
           x = ocpTimes[i].occupy.find(({ day }) => day === curDay);
           if(x){
            e.push(x)
           }
        }
        return e
    },

    nextAvailbleTime: function nextAvailbleTime(dayOfTheYear, ocpTimes, cap, duration, daysHours, startTime, finishTime ,occArr = []){
        //console.log(ocpTimes)
        //let occArr = []
        let daysArray = [];
        let newDay = {
            day:0,
            hours:0,
            times:[]
        }
        let dayOfTY = dayOfTheYear;
        const e = this.findAllTaskWithDay(dayOfTY, ocpTimes)
        console.log(e)
            //const result = ocpTimes[index].occupy.find(({ day }) => day === dayOfTY);
            const result = e.at(-1);
            //console.log(duration +":")
            //console.log(e)
            if(result){
                //console.log(duration +":"+ result.day)
                //dayOfTY = result.day
                //Squeeze in a few hours on the same day
                let lastHour = result.times.at(-1)+1;
                
                //How much time is left between the last task and the finish time
                let hoursLeft = finishTime - lastHour;

                let remainingHrs = duration;

                //console.log(hoursLeft)
                //console.log(duration)
                if(0 < hoursLeft && hoursLeft < duration){
                    //console.log(duration + "in")
                    remainingHrs = hoursLeft
                    let newDuration = duration - remainingHrs
                    daysArray = timeline.workDays(cap,newDuration)
                    daysArray.unshift(remainingHrs);
                    //console.log(daysArray)
                }
                else if(0 < hoursLeft && hoursLeft > duration){
                    daysArray = timeline.workDays(cap,duration)
                }
                else {
                    //console.log(duration + "trigger")
                    this.nextAvailbleTime(dayOfTY+1, ocpTimes, cap, duration, daysHours, startTime, finishTime, occArr)
                }
     
                for(let index in daysArray){
                    //console.log("loop:"+daysArray.length)
                    let time  = this.calcTimesOftheDay(startTime, daysArray[index])
                    if( index < 1){
                        time  = this.calcTimesOftheDay(lastHour, daysArray[index])
                    }
                    if(0 < daysArray[index]){
                        let curDay =  parseInt(dayOfTY)+parseInt(index)
                        newDay = {
                            day:curDay,
                            hours:daysArray[index],
                            times:time
                        }
                        occArr.push(newDay)
                    }
                }


            } 
            // else {
            //     for (let i in daysHours){
            //         let days = parseInt(dayOfTY)+parseInt(i);
            //         let time = this.calcTimesOftheDay(startTime, daysHours[i])
            //         newDay ={
            //             day:days,
            //             hours:daysHours[i],
            //             times:time
            //         }
            //     }
            //     occArr.push(newDay)
            // }

        

        return occArr;

    },
  
    calcOcpHours:function calcOcpHours(tasks, workhours, cap){
        //Figure out how to create a new object with loop with all its occupied times 
        let startTime = workhours[0];
        let finishTime = workhours[1];
        let ocpTimes = [];
        let occArr;

        for (let index in tasks){
            let duration = tasks[index].duration
            let daysHours = timeline.workDays(cap,duration) // get how many hours of the day this task needs
            // Work out daysHours with pased tasks

            // Task start date
            let taskStart = tasks[index].startdate

            //Get finished data
            let dayOfTheYear = timeline.startDateToDay(taskStart)
            // Get first availible days
            if(0 < index){
                occArr = this.nextAvailbleTime(dayOfTheYear,ocpTimes,cap, duration, daysHours, startTime, finishTime)
            } else {
                occArr = this.firstTime(startTime, daysHours, dayOfTheYear)
            }
            

            let newTaskTimes = {
                id: tasks[index].id,
                title: tasks[index].title,
                occupy: occArr
            }
            ocpTimes.push(newTaskTimes)
        }
        console.log(ocpTimes)
        return ocpTimes

    },


}

export default occupiedHrs
