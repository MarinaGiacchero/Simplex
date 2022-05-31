    data= Boolean;
    data=false;
    C1dependente= Boolean;
    C1dependente= true;
    C2dependente= Boolean;
    C2dependente= true;
    campo1=50.4;
    campo2= 20.5;
    graficoFinal='';
    

    this.edit = function (res) {

       

    campo=campo1;
   
    if(campo%2==0 && campo>=0){
    if(data){
        graficoFinal= 'LineChart';
    }else{
        campo=campo2;
        if(campo%2==0 && campo>=0){
            graficoFinal='PieChart';
            console.log(graficoFinal);
        }else if(C2dependente){
            graficoFinal='BarChart';
        }else{
            graficoFinal='AreaChart'; //Gantt
        }
    }
    }else{
        if(C1dependente){
            if(C2dependente){
                graficoFinal= 'ScatterChart';
            }else{
                graficoFinal= 'LineChart';
            }
        }else{
            if(C2dependente){
                graficoFinal= 'LineChart';
            }else{
                graficoFinal= 'ScatterChart';
            }
        }
    }
    res.send(graficoFinal);
    };