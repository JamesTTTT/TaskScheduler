const capacityManage = {

    saveCapacity: function saveCapacity(capacity){
        localStorage.setItem("capacity",JSON.stringify(capacity))
    },

    getCapacity: function getCapacity() {
        let retrievedCapacity = localStorage.getItem("capacity")
        return JSON.parse(retrievedCapacity)
    },

    capacityToDays: function capacityToDays(cap,taskHours,days){
        let daysAmount;
        let taskTime  = taskHours/cap;

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
    }
}

export default capacityManage