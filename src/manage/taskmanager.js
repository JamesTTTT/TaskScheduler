const taskManage = {
    saveTasks: function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    },

    getTasks: function getTasks() {
        let retrievedTask = localStorage.getItem("tasks")
        return JSON.parse(retrievedTask)
    },

}

export default taskManage;