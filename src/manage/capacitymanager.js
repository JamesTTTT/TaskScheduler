import timeline from "./timeline"
const capacityManage = {

    saveCapacity: function saveCapacity(capacity){
        localStorage.setItem("capacity",JSON.stringify(capacity))
    },

    getCapacity: function getCapacity() {
        let retrievedCapacity = localStorage.getItem("capacity")
        return JSON.parse(retrievedCapacity)
    },

    capacityToDays: function capacityToDays(cap,duration){
        let daysAmount;
        let taskTime  = duration/cap;

        if(taskTime<1){
            daysAmount = 1
        }else{
            daysAmount = Math.round(taskTime);
        }
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
        let daysToDline = timeline.taskLenght(start,end)
        let possible = capacityManage.checkPossible(daysToDline,taskDays)
        if(possible){
          disabled = false;
        }
        return disabled
      },

}

export default capacityManage