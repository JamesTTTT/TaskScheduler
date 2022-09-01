const taskManage = {
    saveTask: function saveTask(id,task) {
        localStorage.setItem(id, JSON.stringify(task))
    },

    getTasks: function getTasks(id) {
        let retrievedTask = localStorage.getItem(id)
        return retrievedTask
    },

    getAllTasks: function getAllTasks() {
        const allItems = { ...localStorage };
        return allItems
    }
}

export default taskManage;