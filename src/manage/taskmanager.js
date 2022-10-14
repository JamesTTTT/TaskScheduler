import moment from "moment"
const taskManage = {
    saveTasks: function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    },

    getTasks: function getTasks() {
        let retrievedTask = localStorage.getItem("tasks")
        return JSON.parse(retrievedTask)
    },

    sortTasks: function sortTasks(arg, loadedTasks){
        let data;
        switch(arg){
            case 'default':
                data = [...loadedTasks];
            break;
            case 'deadline':
                data = [...loadedTasks].sort((a, b) =>{
                    return new moment(a.deadline).format('YYYYMMDD') - new moment(b.deadline).format('YYYYMMDD')
                })
            break;
            case 'startdate':
                data = [...loadedTasks].sort((a, b) =>{
                    return new moment(a.startdate).format('YYYYMMDD') - new moment(b.startdate).format('YYYYMMDD')
                })
            break;
            case 'title':
                data = [...loadedTasks].sort((a, b) =>{
                    return a.title.localeCompare(b.title);
                })
            break;
            case 'duration':
                data = [...loadedTasks].sort((a, b) =>{
                    return b.duration - a.duration;
                })
            break;
        }
        return data
    }

}

export default taskManage;