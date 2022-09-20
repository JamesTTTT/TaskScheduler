const taskManage = {
    saveTasks: function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    },

    getTasks: function getTasks() {
        let retrievedTask = localStorage.getItem("tasks")
        return JSON.parse(retrievedTask)
    },

    saveCapacity: function saveCapacity(capacity){
        localStorage.setItem("capacity",JSON.stringify(capacity))
    },

    getCapacity: function getCapacity() {
        let retrievedCapacity = localStorage.getItem("capacity")
        return JSON.parse(retrievedCapacity)
    },


}

export default taskManage;