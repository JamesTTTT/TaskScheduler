import timeline from "./timeline"
const capacityManage = {

    saveWorkHours: function saveWorkHours(cap){
        localStorage.setItem("capacity", JSON.stringify(cap))
    },

    getWorkHours: function getWorkHours() {
        let retrievedCapacity = localStorage.getItem("capacity")
        console.log(retrievedCapacity)
        return JSON.parse(retrievedCapacity)
    },

    calcCapacity: function calcCapacity(start,end){
        //How many hours you work a day
        let workHours = end - start
        let hrs = workHours;

        if (workHours === 0){
            hrs = 1;
        //if you work between days
        }else if (workHours<0){
            hrs = 24 - workHours*-1 
        }

        return hrs
    },

    capacityToDays: function capacityToDays(cap,duration){
        let daysAmount;
        let taskTime  = duration/cap;
        daysAmount = Math.ceil(taskTime);
        return daysAmount
    },

    checkPossible: function checkPossible(taskDays, toCompDays){
        let isPossible = true;
        if (toCompDays>taskDays){
            isPossible = false;
        } 
        return isPossible;
    },

    //gets possible data to dtermin if task can be completed in time
    ifPossible: function ifPossible(cap,start,end, duration){
        let disabled = true;
        let taskDays = capacityManage.capacityToDays(cap, duration);
        //console.log(taskDays)
        let daysToDline = timeline.taskLenght(start,end)
        let possible = capacityManage.checkPossible(daysToDline,taskDays)
        if(possible){
          disabled = false;
        }
        return disabled
      },

}

export default capacityManage