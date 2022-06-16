var population;

//these variables are used to help produce the statistics used by the graph and UI 
var numInfected;
var numRecovered;
var numVaccinated;
var numDead;
var numReInfected;
var numRecoveredAgain;

var numJoyful;
var numSane;
var numScared;
var numStressed;

var numpolice;
var numMurderer;


//these are used to help store/keep a history of the statistics used for both the UI and the Graph
var infectedHistory = [];
var recoveredHistory = [];
var vaccineHistory = [];
var deathHistory = [];
var reInfectedHistory = [];
var recoveredAgainHistory = [];

var joyfulHistory = [];
var saneHistory = [];
var scaredHistory = [];
var stressedHistory = [];

var policeHistory = [];
var murdererHistory = [];


function setup()
{
	createCanvas(1000,700);
    
    population = [];

    
    //this for loop generates 150 people/agents onto the sketch
    for(var i = 0; i < 150; i++)
    {
       population.push(new Person(random(0,width),random(0,height)));
        
        /*there is a 20% chance that a person/agent will have their "isolate" feature 
        turned true meaning they will not move as they are in isolation*/
        if(random() <= 0.2)
        {
            population[i].isolate = true;
        }
        
    }
    
    //i have chosen the first 10 of the population to spawn as "isInfected" to spread the infection quicker
    population[0].isInfected = true;
    population[1].isInfected = true;
    population[2].isInfected = true;
    population[3].isInfected = true;
    population[4].isInfected = true;
    population[5].isInfected = true;
    population[6].isInfected = true;
    population[7].isInfected = true;
    population[8].isInfected = true;
    population[9].isInfected = true;
    population[49].murderer = true;
    population[19].police = true;
    population[20].police = true;
    population[21].police = true;
    population[22].police = true;


}

function draw()
{
    background(255);
    
    /*all these "num" variables have been set to 0 for the variable to 
    be classed as a number so it can be used for the UI statistics and graph*/
    numInfected = 0;
    numRecovered = 0;
    numVaccinated = 0;
    numIsolated = 0;
    numDead = 0;
    numReInfected = 0;
    numRecoveredAgain = 0;

    numJoyful = 0;
    numSane = 0;
    numScared = 0;
    numStressed = 0;

    numpolice = 0;
    numMurderer = 0;
    
    //this for loop checks the population array 
    for(var i = 0; i < population.length; i++)
    {
        //this updates the population
        population[i].update(population);
        //this draws the population
        population[i].draw();
        
        /*this increases/decreses the statistic of the number of agents who have 
        "isInfected" as true as this is being used for the UI stats and graph*/
        if(population[i].isInfected)
        {
            numInfected += 1;
        }

        //this increases/decreses the statistic of the number of agents who have "isRecovered" as true
        if(population[i].isRecovered)
        {
            numRecovered += 1;
        }
        
        //this increases/decreses the statistic of the number of agents who have "vaccine" as true
        if(population[i].vaccine)
        {
            numVaccinated += 1;
        }
        
        //this increases/decreses the statistic of the number of agents who have "dead" as true
        if(population[i].dead)
        {
            numDead += 1;
        }
        
        //this increases/decreses the statistic of the number of agents who have "isolate" as true
        if(population[i].isolate)
        {
            numIsolated += 1;
        }
        
        //this increases/decreses the statistic of the number of agents who have "reInfected" as true
         if(population[i].reInfected)
        {
            numReInfected += 1;
        }
        
        //this increases/decreses the statistic of the number of agents who have "recoveredAgain" as true
        if(population[i].recoveredAgain)
        {
            numRecoveredAgain += 1;
        }
        
        //this increases/decreses the statistic of the number of agents who have "joyful" as true
         if(population[i].joyful)
        {
            numJoyful += 1;
        }
        
        //this increases/decreses the statistic of the number of agents who have "sane" as true
        if(population[i].sane)
        {
            numSane += 1;
        }
        
        //this increases/decreses the statistic of the number of agents who have "stressed" as true
        if(population[i].stressed)
        {
            numStressed += 1;
        }
        
        //this increases/decreses the statistic of the number of agents who have "scared" as true
        if(population[i].scared)
        {
            numScared += 1;
        }
        
        //this increases/decreses the statistic of the number of agents who have "police" as true
        if(population[i].police)
        {
            numpolice += 1;
        }
        
        //this increases/decreses the statistic of the number of agents who have "murderer" as true
        if(population[i].murderer)
        {
            numMurderer += 1;
        }
        
    }
    
    //the graph stops drawinf when numInfected or numReInfected are less than 0
    if(numInfected > 0 || numReInfected > 0)
    {
        infectedHistory.push(numInfected);
        recoveredHistory.push(numRecovered);
        recoveredAgainHistory.push(numRecoveredAgain);
        reInfectedHistory.push(numReInfected);
    }
    
    drawInfectionGraph();
    drawInfectionGraph2();
    
    noStroke()
    fill(100,200,255);
    ellipse(width/2, height/2,50)
    fill(255)
    text("Vaccine",width/2-20, height/2+5)
    noFill()
    //--------------------- UI Design ---------------------\\
    
    //background bar
    fill(0,0,0,200)
    rect(900,0,100,height)
    
    //normal
    fill(100,150,200)
    ellipse(990,336,10)
    
    //infected
    fill(255,0,0)
    ellipse(990,356,10)
    
    //recovered
    fill(255,200,200)
    ellipse(990,376,10)
    
    //vaccinated
    fill(0,255,0)
    ellipse(990,396,10)
    
    //isolated
    fill(0,150,0)
    ellipse(990,416,10)
    
    //dead
    fill(100)
    ellipse(990,436,10)
    
    //recovered again
    fill(200,145,145)
    ellipse(990,463,10)
    
    //re infected
    fill(255,100,50)
    ellipse(990,491,10) 
    
    //joyful
    fill(0,255,255)
    ellipse(990,546,7,10)
    
    //sane
    fill(255,255,0)
    ellipse(990,566,7,10)
    
    //scared
    fill(0,0,170)
    ellipse(990,586,7,10)
    
    //stressed
    fill(255,0,255)
    ellipse(990,606,7,10)
    
    //murderer
    fill(128,0,128)
    ellipse(990,626,7,10)
    
    //police
    fill(0,128,0)
    ellipse(990,646,7,10)
    
    //on-screen text
    fill(255)    
    text("Stats ",935,20)
    text("Infected = " + numInfected,910,40)
    text("Recovered = " + numRecovered,910,60)
    text("Isolated = " + numIsolated,910,80)
    text("Vaccinated = " + numVaccinated,910,100)
    text("Dead = " + numDead,910,120)
    text("Reinfected = " + numReInfected,910,140)
    text("Joyful = " + numJoyful,910,160)
    text("Sane = " + numSane,910,180)
    text("Scared = " + numScared,910,200)
    text("Stressed = " + numStressed,910,220)
    text("Murderer = " + numMurderer,910,240)
    text("police = " + numpolice,910,260)
    text("Recovered Again=" + numRecoveredAgain,910,270,10)
    
    text("Key: ",940,320)
    text("Normal = ",910,340)
    text("Infected = ",910,360)
    text("Recovered = ",910,380)
    text("Vaccinated = ",910,400)
    text("Isolated = ",910,420)
    text("Dead = ",910,440)
    text("Recovered Again= ",910,450,10)
    text("Reinfected = ",910,495)
    
    text("Emotions ",925,530)
    text("Joyful = ",910,550)
    text("Sane = ",910,570)
    text("Scared = ",910,590)
    text("Stressed = ",910,610)
    text("Murderer = ",910,630)
    text("police = ",910,650)


}

//this function is being used in the for loop at the begining of the draw function to generate the population
function Person(x,y)
{
    this.pos = createVector(x,y);//sets the position where each person/agent is located
    this.direction = p5.Vector.random2D();//sets the direction where each person/agent is moving
    this.speed = random(1,3)//sets the speed they will be moving at
    this.direction.setMag(this.speed) //sets the magnitude of the direction
    this.isInfected = false; //when set as true it will be used to change the colour of their face and allows them to infect others
    this.isRecovered = false; //when set to true it will change the colour of their face and allows them to have a vaccine
    this.infectionLevel = 300; // when this decreases some of the features will be set to true or false
    
    this.isolate = false;//when set to true the person will be still and their appearence will resemble a green house and will be immune to infections
    this.vaccine = false;//when set to true the colour of their face will change and they will be immune to the infection
    this.dead = false;//when set to true the person will die and their appearence will resemble a gravestone
    this.murderer_grave = false;//when turned true the murderer will die and its appearance will resemble a purple gravestone
    
    this.joyful = false;//when set to true the colour of their body will change
    this.sane = false;//when set to true the colour of their body will change
    this.scared = false;//when set to true the colour of their body will change
    this.stressed = false;//when set to true the colour of their body will change
    this.murderer = false;//when set to true their appearance will change and they will be able to kill other people
    this.police = false;//when set to true their appearance will change and they will be the only one who can kill the murderer
    this.hit = false;//when turned true the person will die as they have been hit by the murderer
    
    this.reInfected = false;//when set to true if the person was recovered they will be infected again
    this.recoveredAgain = false;//when set to true if the person was infected again they will be recovered again however they cant have a vaccine to be immune so they can become infected again
    
    //this function allows interaction with each person/agent
    this.update = function(_population)
    {
        //this means if the person has isolate and dead as false they can move
        if(!this.isolate && !this.dead && !this.murderer_grave)
        {
            this.pos.add(this.direction)
        }
        

        
        this.wrapPos();
    
        //all the conditional statements in this loop will be applied to each person
        for(var i = 0; i < _population.length; i++)
        {
            
            if(this != _population[i])
            {
                
                //this variable is calculatiing the distance between each person
                var d = dist(this.pos.x,this.pos.y,_population[i].pos.x,_population[i].pos.y)
                
                //this variable is calculating the distance between each person and the center of the canvas (thats where the vaccines are located)
                var d2 = dist(this.pos.x,this.pos.y,width/2,height/2)
                
                
                if(d<10)
                {
                    var v = p5.Vector.sub(this.pos, _population[i].pos)
                    //this allows people to bounce off eachother
                    v.setMag(this.speed)
                    this.direction = v;
                    
                    //this allows people to spead the infection and allows people to be reinfected after recovering
                    if(_population[i].isInfected && !this.isRecovered && !this.isolate  
                       && !this.vaccine && !this.dead &&!this.scared && !this.reInfected && !this.recoveredAgain &&!this.murderer &&!this.police
                       &&!this.murderer_grave
                       
                      || _population[i].reInfected && !this.isRecovered && !this.isolate  && 
                       !this.vaccine && !this.dead &&!this.scared && !this.reInfected && !this.recoveredAgain &&!this.murderer &&!this.police
                      &&!this.murderer_grave)
                    {
                        this.isInfected = true;
                        this.scared=true;
                        this.vaccine=false;
                        this.joyful=false;
                    }
                      
                    //this allows people who have just recovered just once and multiple times to become infected
                    if(population[i].isInfected && this.isRecovered == true && !this.reInfected 
                       || population[i].reInfected && this.isRecovered == true && !this.reInfected
                       || population[i].reInfected && this.recoveredAgain == true && !this.reInfected)
                    {
                        this.reInfected=true; 
                        this.isRecovered=false; 
                        this.stressed=true;
                        this.sane=false;
                        this.scared=false;
                        this.vaccine=false;
                        this.recoveredAgain=false;
                        this.joyful=false;
                        
                    }
                    
                    //if anyone who is infected or reinfected will become dead if they hit the murderer
                    
                    if(population[i].murderer && this.isInfected == true && this.scared ==true && !this.hit
                      || population[i].murderer && this.reInfected == true && this.stressed==true && !this.hit)
                    {
                        
                        this.dead=true;
                        this.isInfected=false;
                        this.isRecovered = false
                        this.vaccine = false
                        this.joyful = false
                        this.sane = false
                        this.scared = false
                        this.stressed = false
                        this.reInfected = false
                        this.recoveredAgain = false
                        
                    }
                    
                      if(population[i].police && this.murderer == true &&!this.hit)
                    {
                        
                        this.murderer=false;
                        this.murderer_grave=true;

                        
                    }
                    
                    
                }
                
                
                if(d2<80)
                {
                    var v = p5.Vector.sub(this.pos, _population[i].pos)
                    //v.normalize();
                    v.setMag(this.speed)
                    this.direction = v;
                    
                    //this allows people who have recovered for the first time to be able to get vaccines 
                    if(this.isRecovered == true && !this.isolate  && !this.vaccine && !this.dead &&!this.murderer &&!this.police)
                    {
                        this.vaccine = true;
                        this.isRecovered=false;
                        this.joyful=true;
                        this.scared=false;
                        this.sane=false;
                        this.isInfected=false;
                        this.recoveredAgain == false;
                    }
                    
                    //this allows people who have been infected for the second time and recovered for the second time to get vaccines. however if they have recovered for the second time it will only change their emotion to joy meaning they can still be infected as the vaccine does nothing for them. 
                    if(this.isRecovered == true && !this.isolate  && !this.vaccine && !this.dead && 
                       this.stressed == true && !this.reInfected
                       
                       || this.isRecovered == false && !this.isolate  && !this.vaccine && !this.dead 
                       && !this.stressed && this.recoveredAgain == true && this.scared==true
                       
                       || this.isRecovered == false && !this.isolate  && !this.vaccine && !this.dead
                       && this.stressed == true && this.reInfected ==true && this.recoveredAgain == false) 
                    {
                        this.vaccine = true;
                        this.isRecovered = false;
                        this.joyful = true;
                        this.scared = false;
                        this.sane = false;
                        this.reInfected = false;
                        this.isInfected = false;
                        this.recoveredAgain == false;
                    }
                    
                }

            }
            
        }
        
        //this allows the murderer to have a speed of 5
        if(this.murderer==true)
        {
            this.speed = 3;
        }
        
         if(this.sane ==true)
        {
            this.speed = random(1,2);
        }
        
            if(this.joyful ==true)
        {
            this.speed = random(2,4);
        }
        
            if(this.stressed ==true)
        {
            this.speed = random(0.5,1.5);
        }
        
            if(this.police ==true)
        {
            this.speed = 3;
        }
        
        if(this.scared == true)
        {
            this.speed = (1,2)
        }
        
       
     
        
        if(this.isInfected == true && this.hit==true && this.reInfected==true){this.dying3()}
        
        //if someone is infected and hasnt revovered they will beign to recover
        if(this.isInfected&& !this.isRecovered)
        {
            this.recover()
           
        }
        
        //if someone is reinfected and hasnt recovered they will begin to recover
        if(this.reInfected && !this.isRecovered)
        {
            this.recovered_again()
           
        }
        
        //if someone is infected they have a 35% chance of dying
        if(this.isInfected && random() <=0.35)
        {
            this.dying()
        }
        
        //if someone is reinfected they only have a 5% chance of dying
        if(this.reInfected == true && random()<=0.05 && this.stressed == true)
        {
            this.dying2()
        }

    }
    
    //this functions allows people/agents to recover
    this.recover = function()
    {

        this.infectionLevel-= 1;
        
        if(this.infectionLevel == 0)
        {
            this.isRecovered=true;
            this.isInfected=false;
            this.sane=true;
            
        }
        
    }
    
    //this functions allows people/agents to recover again
      this.recovered_again = function()
    {

        this.infectionLevel-= 1;
        
        if(this.infectionLevel == -350 || this.infectionLevel == -700 || this.infectionLevel == -1050
           || this.infectionLevel == -1400 || this.infectionLevel == -1750 || this.infectionLevel == -2050)
        {
            this.recoveredAgain=true;
            this.reInfected=false;
            this.scared=true;
            this.stressed=false;
            this.joyful=false;
            this.isRecovered=false;
            
        }
        
    }
    
     //this functions allows infected people/agents to die
     this.dying = function()
    {

        this.infectionLevel-= 1;
        
        if(this.infectionLevel == 0)
        {
            this.dead=true;
            this.isInfected=false;

        }
         
       
    }    
     
     //this functions allows people/agents to die every time they get reinfected
        this.dying2 = function()
    {

        this.infectionLevel-= 1;
        
        if(this.infectionLevel == -350 || this.infectionLevel == -700 || this.infectionLevel == -1050
           || this.infectionLevel == -1400 || this.infectionLevel == -1750 || this.infectionLevel == -2050)
        {
            this.dead=true;
            this.reInfected=false;

        }
         
       
    }
        
        
 
    this.wrapPos = function()
    {
        //wrapping code
        if(this.pos.x > width)
        {
            this.pos.x -= width;
        }
        else if(this.pos.x < 0)
        {
            this.pos.x += width;
        }
        
        if(this.pos.y > height)
        {
            this.pos.y -= height;
        }
        else if(this.pos.y < 0)
        {
            this.pos.y += height;
        }
    }
    
    this.draw = function()
    {
        noStroke();
        
   //-------------------- Appeance of each feature --------------------\\
        if(this.isInfected)
        {
            
            
            //legs
            stroke(0);
            strokeWeight(2)
            line(this.pos.x,this.pos.y-25,this.pos.x-7,this.pos.y-6);
            line(this.pos.x,this.pos.y-25,this.pos.x+7,this.pos.y-6);
            strokeWeight(1);
            
            //body     
            if(this.sane == true){fill(255,255,0)}
            else if(this.scared == true){fill(0,0,170)}
            else if(this.murderer == true){fill(255,0,0)}
            else if(this.joyful == true){fill(0,255,255)}
            else if(this.stressed == true){fill(255,0,255)}
            else{fill(0)}
            ellipse(this.pos.x,this.pos.y-25,7,17);
            
            //face 
            fill(255,0,0);
            ellipse(this.pos.x,this.pos.y-37,15,15);
        
    
            //feet
            rect(this.pos.x+5,this.pos.y-6,5,3);
            rect(this.pos.x-10,this.pos.y-6,5,3);
        }
        
        
        else if(this.reInfected)
        {
            
            
            //legs
            stroke(0);
            strokeWeight(2)
            line(this.pos.x,this.pos.y-25,this.pos.x-7,this.pos.y-6);
            line(this.pos.x,this.pos.y-25,this.pos.x+7,this.pos.y-6);
            strokeWeight(1);
            
            //body     
            if(this.sane == true){fill(255,255,0)}
            else if(this.scared == true){fill(0,0,170)}
            else if(this.murderer == true){fill(255,0,0)}
            else if(this.joyful == true){fill(0,255,255)}
            else if(this.stressed == true){fill(255,0,255)}
            else{fill(0)}
            ellipse(this.pos.x,this.pos.y-25,7,17);
            
            //face 
            fill(255,100,50);
            ellipse(this.pos.x,this.pos.y-37,15,15);
        
    
            //feet
            rect(this.pos.x+5,this.pos.y-6,5,3);
            rect(this.pos.x-10,this.pos.y-6,5,3);
        }
        
        
        
        else if(this.isRecovered)
        {
     
            //legs
            stroke(0);
            strokeWeight(2)
            line(this.pos.x,this.pos.y-25,this.pos.x-7,this.pos.y-6);
            line(this.pos.x,this.pos.y-25,this.pos.x+7,this.pos.y-6);
            strokeWeight(1);
            
            //body     
            if(this.sane == true){fill(255,255,0)}
            else if(this.scared == true){fill(0,0,170)}
            else if(this.murderer == true){fill(255,0,0)}
            else if(this.joyful == true){fill(0,255,255)}
            else if(this.stressed == true){fill(255,0,255)}
            else{fill(0)}
            ellipse(this.pos.x,this.pos.y-25,7,17);
            
            //face 
            fill(255,200,200);
            ellipse(this.pos.x,this.pos.y-37,15,15);
            
            
            //feet
            rect(this.pos.x+5,this.pos.y-6,5,3);
            rect(this.pos.x-10,this.pos.y-6,5,3);
        }
        
            else if(this.recoveredAgain)
        {
     
            //legs
            stroke(0);
            strokeWeight(2)
            line(this.pos.x,this.pos.y-25,this.pos.x-7,this.pos.y-6);
            line(this.pos.x,this.pos.y-25,this.pos.x+7,this.pos.y-6);
            strokeWeight(1);
            
            //body     
            if(this.sane == true){fill(255,255,0)}
            else if(this.scared == true){fill(0,0,170)}
            else if(this.murderer == true){fill(255,0,0)}
            else if(this.joyful == true){fill(0,255,255)}
            else if(this.stressed == true){fill(255,0,255)}
            else{fill(0)}
            ellipse(this.pos.x,this.pos.y-25,7,17);
            
            //face 
            fill(200,145,145);
            ellipse(this.pos.x,this.pos.y-37,15,15);
            
            
            //feet
            rect(this.pos.x+5,this.pos.y-6,5,3);
            rect(this.pos.x-10,this.pos.y-6,5,3);
        }
        
        else if(this.isolate)
        {
            fill(0,150,0);
            rect(this.pos.x, this.pos.y,20,20)
            triangle(this.pos.x -5, this.pos.y,this.pos.x+10, this.pos.y-10,this.pos.x+24, this.pos.y)
        }
        
         else if(this.vaccine)
        {   
            //legs
            stroke(0);
            strokeWeight(2)
            line(this.pos.x,this.pos.y-25,this.pos.x-7,this.pos.y-6);
            line(this.pos.x,this.pos.y-25,this.pos.x+7,this.pos.y-6);
            strokeWeight(1);
            
            
            //body     
            if(this.sane == true){fill(255,255,0)}
            else if(this.scared == true){fill(0,0,170)}
            else if(this.murderer == true){fill(255,0,0)}
            else if(this.joyful == true){fill(0,255,255)}
            else if(this.stressed == true){fill(255,0,255)}
            else{fill(0)}
            ellipse(this.pos.x,this.pos.y-25,7,17);
            
            
            //face
            fill(0,255,0);
            ellipse(this.pos.x,this.pos.y-37,15,15);

            
            //feet
            rect(this.pos.x+5,this.pos.y-6,5,3);
            rect(this.pos.x-10,this.pos.y-6,5,3);
        }
        
        
         else if(this.dead)
        {
        
            fill(100);
            ellipse(this.pos.x,this.pos.y-37,30,15);
            rect(this.pos.x-15,this.pos.y-35,30,30);
            fill(160,82,45)
            rect(this.pos.x-24.5,this.pos.y-5,50,10)
            fill(0)
            text("R.I.P "  + numDead,this.pos.x-13,this.pos.y-35,10)
        }
        
           else if(this.murderer_grave)
        {
            fill(128,0,128);
            ellipse(this.pos.x,this.pos.y-37,30,15);
            rect(this.pos.x-15,this.pos.y-35,30,30);
            fill(160,82,45)
            rect(this.pos.x-24.5,this.pos.y-5,50,10)
            fill(0)
            text("R.I.P",this.pos.x-13,this.pos.y-35,10)
        }
        
        
        
          else if(this.murderer)
        {   
            //legs
            stroke(0);
            strokeWeight(2)
            line(this.pos.x,this.pos.y-25,this.pos.x-7,this.pos.y-6);
            line(this.pos.x,this.pos.y-25,this.pos.x+7,this.pos.y-6);
            strokeWeight(1);
            
            //body     
            fill(128,0,128)
            ellipse(this.pos.x,this.pos.y-25,7,17);
            
            //face
            ellipse(this.pos.x,this.pos.y-37,15,15);

            //feet
            rect(this.pos.x+5,this.pos.y-6,5,3);
            rect(this.pos.x-10,this.pos.y-6,5,3);
        }
        
        
        else if(this.police)
        {   
            //legs
            stroke(0);
            strokeWeight(2)
            line(this.pos.x,this.pos.y-25,this.pos.x-7,this.pos.y-6);
            line(this.pos.x,this.pos.y-25,this.pos.x+7,this.pos.y-6);
            strokeWeight(1);
            
            //body     
            fill(0,128,0)
            ellipse(this.pos.x,this.pos.y-25,7,17);
            
            //face
           
            ellipse(this.pos.x,this.pos.y-37,15,15);

            //feet
            rect(this.pos.x+5,this.pos.y-6,5,3);
            rect(this.pos.x-10,this.pos.y-6,5,3);
        }
        
        
        
        
        else
        {
            //legs
            stroke(0);
            strokeWeight(2)
            line(this.pos.x,this.pos.y-25,this.pos.x-7,this.pos.y-6);
            line(this.pos.x,this.pos.y-25,this.pos.x+7,this.pos.y-6);
            strokeWeight(1);

            
            //body    
            strokeWeight(1);
            fill(0);
            ellipse(this.pos.x,this.pos.y-25,7,17);
            
            //face
            fill(100,150,200);
            ellipse(this.pos.x,this.pos.y-37,15,15);
            
       
            //feet
            rect(this.pos.x+5,this.pos.y-6,5,3);
            rect(this.pos.x-10,this.pos.y-6,5,3);
        }
        
    }
    
}

function drawInfectionGraph()
{
    stroke(0);
    noFill();
    var rectx = map(infectedHistory.length,0,1000,0,200);
    rect(0,0,rectx,100);
    fill(150,100,0,200);
    
    beginShape();
    for(var i = 0; i < infectedHistory.length; i++)
    {
        var x = map(i,0,1000,0,200);
        var y = map(infectedHistory[i],0,200,100,0);
        vertex(x,y);
    }
    
    vertex(rectx,100);
    endShape();
    
    fill(255,200,200,200);
    beginShape();
    for(var i = 0; i < recoveredHistory.length; i++)
    {
        var x = map(i,0,1000,0,200);
        var y = map(recoveredHistory[i],0,200,0,100);
        vertex(x,y);
    }
    

    vertex(rectx,0);
    endShape();
    
}

function drawInfectionGraph2()
{
    translate(0,100)
    stroke(0);
    noFill();
    var rectx = map(infectedHistory.length,0,1000,0,200);
    rect(0,0,rectx,100);
    fill(200,145,145,200);
    
    beginShape();
    for(var i = 0; i < recoveredAgainHistory.length; i++)
    {
        var x = map(i,0,1000,0,200);
        var y = map(recoveredAgainHistory[i],0,200,100,0);
        vertex(x,y);
    }
    

    vertex(rectx,100);
    endShape();
    
    fill(255,100,50,200);
    beginShape();
    for(var i = 0; i < reInfectedHistory.length; i++)
    {
        var x = map(i,0,1000,0,200);
        var y = map(reInfectedHistory[i],0,200,0,100);
        vertex(x,y);
    }
    
    vertex(rectx,0);
    endShape();
    translate(0,-100)   
}

/*
Which assignment have I attempted?
    The assignment I have attempted the "Autonomous Agents" Task

What effect were you trying to achieve?
    I wanted to expand on the original pandemic idea that was just limited to having 
    isolation and recovery. what I wanted to add was to have people have their own emotions
    depending on their own situation (for example if someone has been infected for the first time 
    they will feel scared and if they have been infected after recovering i would want their feelings 
    to change to stressed). in addition, I wanted to add a death system to provide some realism 
    as the original version would have people die when they are infected which is sadly unrealistic.
    also with the original I found it strange that with people in isolation they would still be at an
    easy risk of being infected so I wanted to make sure that the people in isolation will be immune 
    to being infected as they wouldn’t be going out at all during this simulation. i also wanted to add a 
    system where people who have recovered will have to get a vaccine to be able to be immune to the infection 
    otherwise if they collide with infected people, they will be infected again even though they have just recovered.
    finally, I wanted to add a police/villain system where someone will spawn as a murderer who will be killing 
    people who are infected and the only way he can be stopped is by someone being a police.

How as my code able to achieve this?
    to be able to achieve most of the features I wanted to create I simply had to use 
    additional Boolean features for each person and additionally I would have to create multiple
    constructor functions for each type of agent to able to allow interaction between each other
    finally, I also used conditional statements to be able to create the interactivity between each type 
    of agent. 

What are you happy with, what could be improved?
    I’m satisfied with the look of the UI and the additional graph that was implemented 
    to present the flow of people being reinfected. in addition, im satisfied with how all the 
    interactions work within the code as each interaction works as I have originally planned. 
    however, when it comes what can be improved if i was to recreate this project in the future 
    I would add a few complex additions to the emotion system like maybe altering the way they 
    interact with different agents. 
*/