const fs = require('fs');

class Tickets{
    constructor(numero,escritorio){

        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl{

    constructor(){

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 =[];
        

        let data = require('../data/data.json');
            
        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }else{
            this.reiniciarConteo();
        }

    }

    getEstadoActual(){
        return `Ticket ${this.ultimo}`
    }

    getUltimos4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){

        if(this.tickets.length ===0){
            return 'Ya no hay mas tickets'
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Tickets(numeroTicket,escritorio);
        this.ultimos4.unshift(atenderTicket);

        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1); //BORRA EL ULTIMO ELEMNTO
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);
        this.grabarArchivo();

        return atenderTicket;
    }

    siguiente(){
        this.ultimo += 1;
        let ticket = new Tickets(this.ultimo,null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`
    }

    reiniciarConteo(){
       this.ultimo = 0;
       this.tickets=[];
       this.ultimos4=[];
       console.log('Se a inicializado el sistema');
       this.grabarArchivo();
    }

    grabarArchivo(){
        let jsonData = {
            ultimo : this.ultimo,
            hoy : this.hoy,
            tickets: this.tickets,
            ultimos4:this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json',jsonDataString);
        
    }

    

}

module.exports = {
    TicketControl
}
