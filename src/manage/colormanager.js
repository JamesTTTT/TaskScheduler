const colorManage = {
    difficultyColor: function handleDifficultyColor(category){
        switch(category){
            case 'Hard':
                return '#ef4444'
            case 'Challenging':
                return '#f97316'
            case 'Intermediate':
                return '#facc15'
            case 'Simple':
                return '#84cc16'
        }
    },

    statusColor: function handleStatusColor(status){
        switch(status){
            case 'In-Progress':
                return '#1d4ed8'
            case 'Complete':
                return '#22c55e'
            case 'edited':
                return '#db2777'

        }
    },

    possibilityColor: function possibilityColor(bool){
        switch(bool){
            case true:
                return '#ef4444'
            case false: 
                return '#84cc16'
        }
    }


}

export default colorManage;