import timeline from "./timeline"
import occupiedHrs from "./occupiedhours"
import moment from "moment";
const capacityManage = {

    saveWorkHours: function saveWorkHours(cap){
        localStorage.setItem("capacity", JSON.stringify(cap))
    },

    getWorkHours: function getWorkHours() {
        let retrievedCapacity = localStorage.getItem("capacity")
        //console.log(retrievedCapacity)
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
        let daysToDline = timeline.taskLenght(start,end);
        let possible = capacityManage.checkPossible(daysToDline,taskDays)
        if(possible){
          disabled = false;
        }
        return disabled
      },

    algCheckPossible: function algCheckPossible(workHours, deadline){
        //console.log(workHours)
        let status = false;
        let ocpWorkHrs = workHours.occupy;
        let deadlineDate = new Date(deadline);
        let finalMoment = ocpWorkHrs.at(-1);
        let finalDate = moment().dayOfYear(finalMoment.day);

        if(moment(finalDate).isAfter(deadlineDate, 'day')){
            status = true;
        } else if (moment(finalDate).isSame(deadlineDate, 'day')){
            status = true;
        }

        return status
    },

    createProto: function createProto(tasks, cap, newTask, workingHours){
        let currentTasks;
        let taskTimeData;
        let ocp;

        currentTasks = [...tasks];
        currentTasks.push(newTask);
        ocp = occupiedHrs.calcOcpHours(currentTasks, workingHours, cap);

        taskTimeData = ocp.find((t) => t.id === newTask.id);

        return taskTimeData
    },

}

export default capacityManage