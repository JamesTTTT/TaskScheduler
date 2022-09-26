import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

const download = {
    exportPdf: function exportPdf(tasks){    
        const doc = new jsPDF("landscape", "pt", "A4");
    
        doc.setFontSize(10);
    
        const title = "My Tasks";
        const headers = [["Id", "Title","Description", "Category","Startdate", "Deadline", "Duration", "Status"]];
    
        const data = tasks.map(task=> 
            [task.id, task.title, task.description,
             task.category, task.startdate, task.deadline,
             task.duration, task.status]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data,
          styles: {
            overflow: 'linebreak',
            columnWidth: 'wrap'
          },
          columnStyles:{
            0: {
                columnWidth: '1000'
            },
            1: {
                columnWidth: '50'
            }, 
            2: {
                columnWidth:'50'
            },
            3: {
                columnWidth: '50'
            },
            4: {
                columnWidth: '50'
            },
            5: {
                columnWidth: '50'
            },
            6: {
                columnWidth: '50'
            }
        }
        };
    
        doc.text(title, 40, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
      }

}

export default download