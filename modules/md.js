"use strict";
var events = require('events');
var eventsConfig = require('../config').events;

const MAX_VOTES = 5; 
global.log = "";

class Survey extends events.EventEmitter {
    constructor(_data) {
        super();
        this.votes = 0;
        this.subject = 0;
        this.data = _data;
    };

    //init
    init() {
        if (this.data.votes != 0) {
            this.data.votes = 0;
            console.log(`${this.data.subject} initialized.`);
            LOG(`${this.data.subject} initialized.`);
            this.emit(eventsConfig.init, this.data);
            this.emit(eventsConfig.reset, this.data);
        } else {
            console.log(`${this.data.subject} uninitialized.`);
            LOG(`${this.data.subject} uninitialized.`);
          
        }
    };

    //get all subjects data
    getAllData() {
        console.log(`${this.data.subject}, Votes: ${this.data.votes}`);
        LOG(`${this.data.subject}, Votes: ${this.data.votes}`);
    };
  
    //add vote
    addVote() {
        if (this.data.votes < MAX_VOTES) {
            ++this.data.votes;
            console.log(`${this.data.subject} add one.`);
            LOG(`${this.data.subject} add one.`);
            this.emit(eventsConfig.ADD, this.data);
            
        } else {
            console.log(`${this.data.subject} not added its more than 5 .`);
            LOG(`${this.data.subject} not added its more than 5 .`);
           
        }
    };
}

//Browser response LOG function
var LOG = (string) => {
    log += `${string}<br>`;
};

//Creating subject
module.exports = (_data) => {
    var subject = new Survey(_data);

    
    subject. addVote();
    subject.init();
    subject.getAllData();

    subject.on(eventsConfig.ADD, (data) => {
        console.log(`#EMIT: ADD - ${data.subject}, Votes: ${data.votes}`);
    });

    subject.on(eventsConfig.init, (data) => {
        console.log(`#EMIT: init - ${data.subject}, Votes: ${data.votes}`);
    });
};

