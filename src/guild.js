import {
    addAgent, setAgentVariable, addItem, addLocation, setVariable, getNextLocation, action,
    getRandNumber, getVariable, sequence, selector, execute, Precondition, getAgentVariable, neg_guard, guard,
    isVariableNotSet, displayDescriptionAction, addUserAction, addUserInteractionTree, initialize,
    getUserInteractionObject, executeUserAction, worldTick, attachTreeToAgent, setItemVariable, getItemVariable,
    displayActionEffectText, areAdjacent, addUserActionTree
} from "./scripting";
//require("./scripting.ts");
var start_screen_active = false;
var day_screen_active = false;
const last_day = 7
var roster = []; //list of characters
var mission_board = []; //list of missions
var images = {}; //dictionary of Image objects. 
var char_buttons = [];//list of buttons
var mission_buttons = []; //list of mission buttons
var popup_buttons = []; //list of buttons displayed on popup
var locations = {}; //dict of locations

var num_missions = 0;
var num_successful = 0;
var num_failed = 0;

//https://imgur.com/a/jnQ80q9 button source

var canvas = document.getElementById("canv");
var context = canvas.getContext('2d');
context.font = "8px 'Press Start 2P'"
//context.fillStyle = 'white';

var DEFAULT_CHAR_X = 100
var DEFAULT_CHAR_Y = 100

window.onload = function() {setup()};
//events
canvas.addEventListener("click", clicked);
//popup
var pop;
//pass button
var pass;
//ok button
var ok;
//tick: 7 days total. 2 ticks per day (morn/eve). Even ticks are morning = new day
var current_time = "morning";
var current_day = 1;

var max_stat = 10;
var max_affinity = 10;

var text_log = ["Log:", "Yuko!! My very old and very best friend! How’ve you been? I know you’re retired, but could you look after the ol’ guild for about a week? I gotta go <strike>fishing</strike> run a very important errand!<br>All you gotta do is assign missions to the squad based off of what they’re good at and who they work best with! We use the buddy system around here, so two people have to be assigned to each mission! If you don't want to assign anyone on a mission during the day, that's fine too! You can just use the [NEXT] button to wait around. Unassigned adventurers will just be hanging out and training at the guild hall.Have fun! Thanks in advance!<br> ~Sharro "];

var selected1;
var selected2; //for testing mission assignment.
var selected_mission;

class Character {
    constructor(name, stats, spr) {
        this.name = name;
        this.stats = {'str':stats['str'], 'int':stats['int'], 'mag':stats['mag']}
        this.affinity = {};
        this.is_occupied = false;
        this.is_on_mission = false;
        this.location = locations["start"];
        //console.log(this.location);
        //this.x = DEFAULT_CHAR_X;
        //this.y = DEFAULT_CHAR_Y;
        this.sprite = images[spr];
        //this.char_icon = char_icons[name];
    }
    create_affinity() {
        // for (var char in roster) {
        //     //console.log();
        //     if (roster[char].name != this.name) {
        //         this.affinity[roster[char].name] = 4; //everyone starts with 4 affinity
        //     }
        // }
        //maybe do random eventually
        switch(this.name) {
            case "Min":
                this.affinity = {"Landol": 1, "Horst": 5, "Rory" : 4, "Danth" : 2};
                break;
            case "Landol":
                this.affinity = {"Min": 1, "Horst": 3, "Rory" : 2, "Danth" : 5};
                break;
            case "Horst":
                this.affinity = {"Min": 5, "Landol": 3, "Rory" : 5, "Danth" : 1};
                break;
            case "Rory":
                this.affinity = {"Min": 4, "Horst": 5, "Landol" : 2, "Danth" : 3};
                break;
            case "Danth":
                this.affinity = {"Min": 2, "Horst": 1, "Rory" : 3, "Landol" : 5};
        }

    }
    increase_affinity(char) {
        //find character, increment number. 
        if (this.name != char.name) {
            this.affinity[char.name]++;
        }
        if (this.affinity[char.name] > 10) {
            this.affinity[char.name] = 10;
        }
    }
    decrease_affinity(char) {
        if (this.name != char.name) {
            this.affinity[char.name]--;
        }
        if (this.affinity[char.name] < 0) {
            this.affinity[char.name] = 0;
        }
    }
    increase_stat(stat, amount) {
        this.stats[stat] += amount;
        if (this.stats[stat] > 10) {
            this.stats[stat] = 10;
        }
    }
    move(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        //context.drawImage(this.char_icon, this.x, this.y);
    }
    stats_tostr() {
        var aff_st = JSON.stringify(this.affinity)
        var st = this.name + "\nStr: " + this.stats["str"] + "\nMag: " + this.stats["mag"] + "\nInt: " + this.stats["int"]+ "\nAffinity:" + "\n" + aff_st + "\nStatus:";
        //WIP
        if(this.is_on_mission) {
            st+=" Out on Mission";
        } else {
            st+=" Available"
        }
        return st;
    }

    display_stats1()
    {
            
            var st = "Str:" + this.stats["str"] + " Mag:" + this.stats["mag"] + " Int:" + this.stats["int"];
            //WIP
           return st;
        
    }
    display_stats2()
    {
        //var aff_st = "Affinity:" + " "+JSON.stringify(this.affinity)
        //return aff_st

    }

    display_stats3()
    {
        var st = "Status: "
        if(this.is_on_mission) {
            st+=" Out on Mission";
        } else {
            st+=" Available"
        }
        return st;

    }

    draw() {
        //console.log(this.sprite);
        context.drawImage(this.sprite, this.location.x, this.location.y);
    }
    set_location(where) {
        this.location = locations[where];
    }
}
class Mission {
    constructor(title, desc, req_stat, /*req_affinity,*/ req_total, reward, win_txt, lose_txt, ticks, day) {
        //always gain +1 affinity on success. 
        //always lose -1 affinity on failure
        //maybe add type
        this.title = title;
        this.desc = desc;
        this.req_stat = req_stat; //maybe make this an array
        //this.req_affinity = req_affinity;//affinity
        this.req_total = req_total; //this too 
        this.reward = reward;
        this.win_txt = win_txt;
        this.lose_txt = lose_txt;
        this.assigned = false;
        //probably add start_day (when it shows up) and length (how many days it takes)
        this.c1 = null; //this is the character name.
        this.c2 = null;
        this.char1_i = -1;
        this.char2_i = -1;
        this.ticks = ticks;
        this.day = day;
        //reward == difficulty for now
        this.difficulty = reward
    }
    assign(char1, char2) { //pass in the name.
        this.assigned = true; 
        this.c1 = char1;
        this.c2 = char2;
        this.char1_i = find_in_list("roster", this.c1);
        this.char2_i = find_in_list("roster", this.c2);
        roster[this.char1_i].is_on_mission = true;
        roster[this.char2_i].is_on_mission = true;
        //char1.is_occupied = true; //maybe get from list
        //char2.is_occupied = true;
    }
    do_mission() {
        num_missions++;
        this.char1_i = find_in_list("roster", this.c1);
        this.char2_i = find_in_list("roster", this.c2);
        console.log(this.req_stat +" of more than " + this.req_total);
        var combined_stat = roster[this.char1_i].stats[this.req_stat] + roster[this.char2_i].stats[this.req_stat];
        console.log("total points: " + combined_stat);
        //put in affinity win/lose
        if(combined_stat >= this.req_total ) { //make check function
            //pass
            this.victory()
            return true;

        } 
        //else if ( 
          //  this.affinity [this.c2] >= this.req_affinity) {
            //this.victory()
            //return true;
        //}
        else {
            this.failure()
            return false;
        }
    }
    victory() {
        //console.log("success");
        num_successful++;
        text_log.push("Mission: " + this.title + " was successful!<br>" + roster[this.char1_i].name + " and " + roster[this.char2_i].name + " have returned!<br>Their statement: " + this.win_txt);
        this.char1_i = find_in_list("roster", this.c1);
        this.char2_i = find_in_list("roster", this.c2);
        //text_log.push(roster[this.char1_i].name + " and " + roster[this.char2_i].name + " have returned!<br>Their statement: " + this.win_txt);
        //increase stat by reward amt
        roster[this.char1_i].increase_stat(this.req_stat, this.reward);
        roster[this.char2_i].increase_stat(this.req_stat, this.reward);
        //increase affinity
        roster[this.char1_i].increase_affinity(roster[this.char2_i]);
        roster[this.char2_i].increase_affinity(roster[this.char1_i]);
        //text_log.push(this.win_txt);

        this.assigned = false; 
        roster[this.char1_i].is_on_mission = false;
        roster[this.char2_i].is_on_mission = false;
        this.char1_i = null;
        this.char2_i = null;
            
    }
    failure() {
        num_failed++;
        //console.log("failure");
        text_log.push("Mission: " + this.title + " failed!<br>"+ roster[this.char1_i].name + " and " + roster[this.char2_i].name + " have returned!<br>Their statement: " + this.lose_txt);
        this.char1_i = find_in_list("roster", this.c1);
        this.char2_i = find_in_list("roster", this.c2);
        //text_log.push(roster[this.char1_i].name + " and " + roster[this.char2_i].name + " have returned!<br>Their statement: " + this.lose_txt);
        //decrease affinity
        roster[this.char1_i].decrease_affinity(roster[this.char2_i]);
        roster[this.char2_i].decrease_affinity(roster[this.char1_i]);
        //text_log.push(this.lose_txt);

        this.assigned = false; 
        roster[this.char1_i].is_on_mission = false;
        roster[this.char2_i].is_on_mission = false;
        this.char1_i = null;
        this.char2_i = null;
    }
    decrease_time() {
        this.ticks--;
        if (this.ticks == 0) {
            this.do_mission();
        }
    }
    difficulty_tostr() {
        var str = "difficulty: "
        for (var i = 0; i < this.difficulty; i++) {
            str+= "*"
        }
        return str;
    }
    get_desc() {
        console.log("getting full desc");
        var full_desc = "---\n" + this.desc + "\nrequires " + this.req_stat + ", " + this.difficulty_tostr();
        return full_desc;
    }

}
//Start position is 570, 345
class Location {
    constructor(name, x, y, stat) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.assigned = false; 
        this.char1 = null;
        this.char2 = null; //for affinity ONLY
        this.stat = null;
        if (stat) {
            this.stat = stat;
        }
        
    }
    assign(name, name2 = 0) {
        this.assigned = true;
        if (this.stat == "affinity") {
            //two characters
            this.char1 = name;
            this.char2 = name2;
            roster[find_in_list("roster", this.char1)].move(this.x, this.y);
            roster[find_in_list("roster", this.char2)].move(this.x, this.y);
        } else {
            //standard stat, 1 char
            this.char1 = name;
            roster[find_in_list("roster", this.char1)].move(this.x, this.y);
        }
        
    }
    enhance() {
        if (this.stat == "affinity") {
            roster[find_in_list("roster", this.char1)].increase_affinity(this.char2);
        } else {
            //only one
            roster[find_in_list("roster", this.char1)].increase_stat(this.stat, 1);
        }
    }


}
//useful things
class Popup {
    constructor (x, y, type) {
        this.x = x;
        this.y = y;
        this.image = images[type];
        this.is_open = false;

        this.text_pos = this.y + 30;

    }
    draw() {
        context.drawImage(this.image, this.x, this.y);
    }
    dismiss() {
        this.is_open = false;
        this.reset();
        draw_canvas();
        //check for mission stuff in here .Make sure 2 chars selected etc
        if(selected1 != null && selected2 != null) {
            //update_time(); this is what updates time after missions are selected 
        }
        console.log("Resetting in popup dismiss");
        selected1 = null;
        selected2 = null;
        selected_mission = null;
        console.log("selected 2 is now " + selected2);
        for(var b in char_buttons) {
            char_buttons[b].pressed = false;
        }
        for (var x in popup_buttons) {
            popup_buttons[x].pressed = false;
        }
        draw_canvas();
    }
    write_text(text) {
        //y = starting y position. 
        var txt = this.wrap_paragraph_text(text);
        for (var l = 0; l < txt.length; l++) {
            context.fillText(txt[l], this.x + 15, this.text_pos);
            this.text_pos += 20;
        }
        //this.text_pos = this.y + 20;
        
        //this.text_x +=20;
        //this.text_y +=20;
    }
    //two below functions modified from: https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
    wrap_paragraph_text(text) { 
        return text.split("\n").map(para => this.wrap_text(para)).reduce((a, b) => a.concat(b)); 
    }
    wrap_text(text) { 
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];
        //console.log(this.image.x);
        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var w = context.measureText(currentLine + " " + word).width;
            if (w < this.image.width - 50) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }
    reset() {
        this.text_pos = this.y + 30;
    }
    draw_popup_buttons() {
        var tiny_x = 250;
        for (var b in popup_buttons) {
            var char = find_in_list("roster", popup_buttons[b].text);
            if(!roster[char].is_on_mission) {
                if (tiny_x >= this.image.width + 100) {
                    tiny_x = 450
                    this.text_pos+=40;
                } else {
                    tiny_x+=80;
                }
                popup_buttons[b].x = tiny_x;
                popup_buttons[b].y = this.text_pos;
                //console.log(popup_buttons[b].x + " , "+ popup_buttons[b].y);
                popup_buttons[b].draw();
            }
        }
    
    }
    draw_ok_button() {
        ok.x = 455;
        ok.y = this.text_pos;
        ok.draw();
    }
    fill_popup(text, buttons, ok) {
        this.write_text(text);
        if(buttons) {
            this.draw_popup_buttons();
        }
        if(ok) {
            this.draw_ok_button();
        }
    }
}
class Button { //existing frameworks?
    constructor (x, y, type, text, pressed_type=0) {
        this.x = x;
        this.y = y;
        this.image = images[type];
        this.pressed = false;
        this.pressed_image = null;
        this.b_text_pos = this.y + 20;
        if (pressed_type) {
            this.pressed_image = images[pressed_type];
        }
        this.text = text;
        this.action = null;
    }
    set_action() {
        this.action = action;
    }
    do_something() {
        if (this.action) {
            this.action();
        }
    }
    reset_text_pos() {
        this.b_text_pos = this.y + 20;
    }
    draw() {
        //console.log(this.pressed);
        //console.log(this.pressed_image);
        if (this.pressed) {
            context.drawImage(this.pressed_image, this.x, this.y);
            //console.log("drawing pressed");
        } else {
            context.drawImage(this.image, this.x, this.y);
        }
        
        //context.fillText(this.text, this.x + 150, this.y + 45);
    }
    //two below functions modified from: https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
    wrap_paragraph_text(text) { 
        return text.split("\n").map(para => this.wrap_text(para)).reduce((a, b) => a.concat(b)); 
    }
    wrap_text(text) { 
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];
        //console.log(this.image.x);
        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var w = context.measureText(currentLine + " " + word).width;
            if (w < this.image.width - 20) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }
    write_text() {
        //console.log("writing");
        var txt = this.wrap_paragraph_text("Mission:\n" + this.text);
        //console.log(txt);
        for (var l = 0; l < txt.length; l++) {
            context.fillText(txt[l], this.x + 20, this.b_text_pos);
            this.b_text_pos += 20;
        }
        this.reset_text_pos();
    }
}
function preload_img() {
    console.log("loading images");
    var button = document.getElementById("button")
    //var popup = new Image();
    //button.src = "http://i63.tinypic.com/r7nd44.jpg";
    //popup.src = "http://i64.tinypic.com/2w5iuj6.jpg";
    images["button"] = button;
    images["Min"] = document.getElementById("min");
    images["Min_p"] = document.getElementById("min_p");
    images["Landol"] = document.getElementById("landol");
    images["Landol_p"] = document.getElementById("landol_p");
    images["Rory"] = document.getElementById("rory");
    images["Rory_p"] = document.getElementById("rory_p");
    images["Horst"] = document.getElementById("horst");
    images["Horst_p"] = document.getElementById("horst_p");
    images["Danth"] = document.getElementById("danth");
    images["Danth_p"] = document.getElementById("danth_p");
    images["bg"] = document.getElementById("bg");
    images["bg_evening"] = document.getElementById("bg_evening");
    images["tinyMin"] = document.getElementById("tinymin");
    images["tinyMin_p"] = document.getElementById("tinymin_p");
    images["tinyLandol"] = document.getElementById("tinylandol");
    images["tinyLandol_p"] = document.getElementById("tinylandol_p");
    images["tinyHorst"] = document.getElementById("tinyhorst");
    images["tinyHorst_p"] = document.getElementById("tinyhorst_p");
    images["tinyRory"] = document.getElementById("tinyrory");
    images["tinyRory_p"] = document.getElementById("tinyrory_p");
    images["tinyDanth"] = document.getElementById("tinydanth");
    images["tinyDanth_p"] = document.getElementById("tinydanth_p");
    images["pass"] = document.getElementById("pass");
    images["Minspr"] = document.getElementById("minspr");
    images["Landolspr"] = document.getElementById("landolspr");
    images["Horstspr"] = document.getElementById("horstspr");
    images["Roryspr"] = document.getElementById("roryspr");
    images["Danthspr"] = document.getElementById("danthspr");
    //console.log(images["bg"]);
    images["popup"] = document.getElementById("popup");
    images["ok"] = document.getElementById("ok");
    images["gamedone"] = document.getElementById("gameover");
    images["moon"] = document.getElementById("moon");
    images["sun"] = document.getElementById("sun");
    images["dialogbox"] = document.getElementById("dialogbox");
}
function dialog(){
    context.fillStyle = "black"; 
    context.fillRect(0, 0, 900, 650,);
    context.drawImage(images["dialogbox"], 0, 350);
    context.font = '10px "Press Start 2P"';
    context.fillStyle = 'white';
    //this is me starting to try and make the dialog screen, I'm leaving it alone for now 
    //but i think that eventualyl setting it up in a way similar to Missions would be good 
    //though I wonder how I'd handle avatars and such, dunno if itd be a seperate thing or a dictionary 
    //what even is a dictionary 


}
function create_roster() {
    roster.push(new Character("Min",{'str':7, 'mag':0, 'int': 3}, "Minspr" )); //make a dictionary/label it
    roster.push(new Character("Landol",{'str':0, 'mag':6, 'int': 4}, "Landolspr"));
    roster.push(new Character("Horst", {'str':8, 'mag':0, 'int': 2}, "Horstspr"));
    roster.push(new Character("Rory", {'str':2, 'mag':6, 'int': 2}, "Roryspr"));
    roster.push(new Character("Danth", {'str':2, 'mag':2, 'int': 6}, "Danthspr"));
    for (var c in roster) {
        roster[c].create_affinity(); //start at 2?
        addAgent(roster[c].name); //add agent for behavior tree
        //console.log(roster[c]);
    }
}
function create_missions() {
    //template: 
    //mission_board.push(new Mission("title", "desc", "stat", <totalpts>, <difficulty>, "win", "lose", <len*2>, <appearday>));
    //day 1
    mission_board.push(new Mission("An antimagic rat has taken over my attic and may be building a small nation state", "I can't get to my grandparent's old photos anymore!", "str", 5, 1, "I flexed at the rat and it left!", "The rat king rains supreme and wishes to be paid reparations via corn.", 2, 1));
    mission_board.push(new Mission("Lost cat", "Sneaky ol' fluffer escaped!", "int", 5, 1, "We found the cat behind a dumpster. The owner said that the glowing red eyes are normal..?", "What cat?", 4, 1));
    mission_board.push(new Mission("My sheep keep on going missing", "Where are they going? What are they doing? Are they talking about me??? I have to know!", "mag", 8, 2, "They were being used by the goblins for fantasy football. They were returned, slightly more armored. ", "Sheep aren't real.", 4, 1));
    //day 2
    mission_board.push(new Mission("Slimes are eating my potatoes!", "I had one plan and that plan was whacking them with a sword and it didn't work.", "mag", 8, 2, "Slimes zapped, mission complete!", "The slimes shook off all the physical damage we could do so we shoved them into a hole and hoped for the best.", 2, 2));
    mission_board.push(new Mission("Goblins won't stop heckling my sheep", "They're getting very stressed out! Help!", "str", 10, 3, "The sheep can sheep in peace now!", "We lost, but on the bright side I don't think sheep understand English.", 4, 2));
    mission_board.push(new Mission("I think George is a vampire", "He never eats and his shirts are always stained with blood!", "int", 6, 1, "George is...a shy winery worker. We bought him new shirts.", "George moved out before we could talk to him...", 2, 2));
    //day 3
    mission_board.push(new Mission("An undead army is invading!", "THEY'VE GOTTEN INTO THE MILK BARNS! WE'RE DOOMED!", "mag", 14, 5, "win", "lose", 6, 3));
    mission_board.push(new Mission("THE SKY TURNED RED", "WHY IS IT RED???", "int", 6, 1, "It...we had to spend 3 hours explaining the sunset to a family of 6. I mean money is money but how'd this mission even get on our list.", "We stopped by and they uhhh..said a lot of words and after an hour we graciously jumped out the window to escape. ", 2, 3));
    mission_board.push(new Mission("Lich King causing a ruckus", "Unholy magics and loud, booming noises are coming from the lich's keep, send her a warning!", "mag", 12, 4, "Our magic was cooler than hers so she agreed to move her party deeper underground", "Lich \"Partybrodudefella\" was deeply unimpressed by us and turned up her dubstep louder", 4, 3));
    //day 4
    mission_board.push(new Mission("A fish learned to walk on land and hes using his legs exclusively for evil", "He can't handle the responsibility of having legs! He's raising a tadpole army!", "str", 10, 3, "He got suplexed back into the ocean!", "His evil continues.....the neferious Captain Legbeard", 2, 4));
    mission_board.push(new Mission("Follow my cat aroud to see what she does all day", "I lose her every time I try, I have to know!", "int", 8, 2, "Dear god this cat gets so many treats. Please stop feeding her shes too powerful.", "Outsmarted by a cat....just another normal day honestly", 2, 4));
    mission_board.push(new Mission("Stop these weekly barfights!", "Every Wednesday an elf and an orc come to my bar, and they always end up fighting! They refuse to come on different days!", "str", 8, 2, "They started throwing chairs again so we also threw chairs at them. They were forced to team up against us and bonded over their shared defeat. Their wedding is next week, I think the problem is solved", "We couldn't stop them. I wonder if they'll still be at it when I have grandkids...", 4, 4));
    //day 5
    mission_board.push(new Mission("Kraken won't stop rearranging the boats at the dock every night!", "We don't need our boats ordered by color! We need them where we parked them!", "mag", 12, 4, "Turns out, she just needed a translator. We set up a magical one and now the Kraken gets a salary of fish to keep track of all the boats", "Well I guess they'll just have to accept their new organizational overlord", 2, 5));
    mission_board.push(new Mission("VERY LARGE BEAR! VERY VERY LARGE BEAR!!", "BEAR LARGE", "str", 10, 3, "Good news, we won! Bad news, it was a dragon.", "IT WAS NOT A BEAR!", 2, 5));
    mission_board.push(new Mission("A big rock is falling from the sky but it's probably fine", "I mean a firey death doesn't sound like the worst thing in the world", "mag", 14, 5, "We made a big bat out of magic and whacked it somewhere else!", "it was not fine!!!", 4, 5));
    //day 6
    mission_board.push(new Mission("Someone's stolen the town flag!", "We need our flag!", "int", 8, 2, "We found it in a shopping cart 10 miles away", "We couldn't find it so we replaced the flag with a coat someone left out?", 2, 6));
    mission_board.push(new Mission("Golem rampaging through town!", "IT'S DESTROYING THE FLOWERS AND ONLY THE FLOWERS!!", "str", 12, 4, "We hacked it! With an axe. But somehow this fixed it and now its a normal gardening golem!", "It beat us up and ran into the countryside to castrate more plants", 2, 6));
    mission_board.push(new Mission("A tiny dragon won't get out of my silverwear cabinet!", "Now normally this wouldn't be an issue but our house is very flammable!", "int", 10, 3, "Lil guy just wants to hoard spoons. We made him a pile of donated spoons out in the woods and he seems very happy!", "Well the dragon's out of the cabinet, but their house is...slightly....ablaze.", 2, 6));

}
function log_text() {
    var lg_txt = "";
    for (var e in text_log) {
        lg_txt += text_log[e] + "<br> * * * <br>";
    }
    var div_log = document.getElementById("log")
    
    div_log.innerHTML = lg_txt;
    div_log.scrollTop = div_log.scrollHeight;
}
function create_locations() {
    var str_loc = new Location("Training Dummy", 470, 300, "str");
    var mag_loc = new Location("Magic Tower", 750, 100, "mag");
    var int_loc = new Location("Library", 640, 280, "int");
    var aff_loc = new Location("Gazebo", 505, 135, "affinity");
    var aff_loc2 = new Location("Gazebo", 535, 135, "affinity");
    var start_loc = new Location("Outside", 600, 315);
    locations["start"] = start_loc;
    locations["str"] = str_loc;
    locations["mag"] = mag_loc;
    locations["int"] = int_loc;
    locations["affinity1"] = aff_loc;
    locations["affinity2"] = aff_loc2;

}
function find_in_list(type, to_search) {
    if (type == "roster") {
        for (var i = 0; i < roster.length; i++) {
            if (roster[i].name == to_search) {
                return i;
            }
        }
    } else if (type == "mission") {
        for (var i = 0; i < mission_board.length; i++) {
            if (mission_board[i].title == to_search) {
                return i;
            }
        }
    }
    
}
function draw_canvas() {
    console.log("drawing canvas");
    log_text();
    //stuff to redraw when popup closes. 
    // outline
    context.beginPath();
    context.lineWidth = "6";
    context.strokeStyle = "black";
    context.rect(0, 0, 800, 650);
    context.stroke();
    //console.log(images["bg"]);
    if (current_time == "morning"){
        context.drawImage(images["bg"], 0, 0);
    }
    if (current_time == "evening"){
        context.drawImage(images["bg_evening"], 0, 0);
    }
    //context.drawImage(images["bg"], 0, 0); //draw bg
    draw_character_buttons();
    draw_characters();
    context.fillText("Day " + current_day, 840, 575);
    draw_time();
    profile_text();
}

function draw_time(){
    if (current_time == "morning")
    {
        context.drawImage(images["sun"], 840, 520);}
    if (current_time == "evening")
    {
        context.drawImage(images["moon"], 840, 520);
    }
}
function draw_game_done() {
    console.log("done");
    context.drawImage(images["gamedone"], 0, 0); //draw done
    context.fillStyle = "#ffffff";
    context.font = "15px 'Press Start 2P'"
    context.fillText("Missions Attempted: " + num_missions, 300, 360);
    context.fillText("Missions Succeeded: " + num_successful, 300, 400);
    context.fillText("Missions Failed: " + num_failed, 300, 440);
}
function update_time() {
    console.log("update time reset");
    pop.is_open = false;
    selected1 = null;
    selected2 = null;
    selected_mission = null;
    //pop.dismiss();

    //first: have characters do their actions
    move_characters();
	//for every mission assigned, updated the time stuff. Doing this before the canvas redraw.
    for (var m in mission_board) {
        if (mission_board[m].assigned) {
            mission_board[m].decrease_time();
        }
    }
    //next, update time.
    if (current_time == "morning" && current_day < last_day) {
        current_time =  "evening";
        draw_canvas();
    } else   {
        
        current_day++;
        if (current_day < last_day) {
            current_time = "morning";
           day_change(); 
            var inttvID = window.setTimeout(day_screen_active_set, 1500);
            var intvID = window.setTimeout(draw_canvas, 1500);
          
            text_fix();}
        
    }
    //draw_canvas(); //redraw text.
    if (current_day == last_day) {
        text_log.push("Whew! Looks like everyone’s still in once piece! Thanks for taking care of things while I was out. Being a Guildmaster is tough work, you did great! I’ll take over from here, but hey, when I retire for real you got a real solid shot at taking my position! See you around!");
        log_text();
        draw_game_done();
    } else {
        text_log.push("Day " + current_day + ", " + current_time);
    }
    //characters always move

    
}
function start_screen(){
    context.fillStyle = "beige";
    context.fillRect(0,0, 900, 650);

    context.font = '68px "Press Start 2P"';
    context.fillStyle = "black"
    context.fillText ("Rime Royale")

}
function day_screen_active_set(){
    day_screen_active = false
}
function day_change(){
    //New day screen
	//console.log("day change");
    //black is default, don't need to specify

    day_screen_active = true
    context.fillStyle = "black"; 
    context.fillRect(0, 0, 900, 650);
   
    context.font = '68px "Press Start 2P"';
    context.fillStyle = 'white';
    //context.textBaseline = 'top'; <-- caused text sliding bug
    context.fillText  ('Day'+ current_day, 325, 350);
}

function text_fix(){
    context.fillStyle = "black"
    context.font = "8px 'Press Start 2P'"
}
function profile_text(){
    //var s = /*'Min the Knight' + */ roster[find_in_list("roster", "Min")].display_stats()
  //  var str = this.write_text(s);
    context.fillText ('Min the Knight', 70, 40);
    context.fillText (roster[find_in_list("roster", "Min")].display_stats1(), 70,55)
    context.fillText (roster[find_in_list("roster", "Min")].display_stats2(), 70,65)
    context.fillText (roster[find_in_list("roster", "Min")].display_stats3(), 70,75)
    context.fillText ('Landol the Mage', 70, 130)
    context.fillText (roster[find_in_list("roster", "Landol")].display_stats1(), 70,145)
    context.fillText (roster[find_in_list("roster", "Landol")].display_stats2(), 70,155)
    context.fillText (roster[find_in_list("roster", "Landol")].display_stats3(), 70,165)
    context.fillText ('Horst the Horseman', 70, 220)
    context.fillText (roster[find_in_list("roster", "Horst")].display_stats1(), 70,235)
    context.fillText (roster[find_in_list("roster", "Horst")].display_stats2(), 70,245)
    context.fillText (roster[find_in_list("roster", "Horst")].display_stats3(), 70,255)
    context.fillText ('Rory the Summoner', 70, 310)
    context.fillText (roster[find_in_list("roster", "Rory")].display_stats1(), 70,325)
    context.fillText (roster[find_in_list("roster", "Rory")].display_stats2(), 70,335)
    context.fillText (roster[find_in_list("roster", "Rory")].display_stats3(), 70,345)
    context.fillText ('Danth the Spymaster', 70, 400)
    context.fillText (roster[find_in_list("roster", "Danth")].display_stats1(), 70,415)
    context.fillText (roster[find_in_list("roster", "Danth")].display_stats2(), 70,425)
    context.fillText (roster[find_in_list("roster", "Danth")].display_stats3(), 70,435)
}

function draw_characters() {
    //console.log("in draw characters");
    for (var char in roster) {
        if(!roster[char].is_on_mission) {
            roster[char].draw();
        }
    }
}
function move_characters() {
    //random the character order for those who arent busy
    console.log("in move char");
    //get_random_char_list();
    //Need to stop once every character is assigned. 
    if (current_time == "morning") {
        for (var ch in roster) {
            if (!roster[ch].is_occupied && !roster[ch].is_on_mission) { //if character isn't on a mission or already occupied
                //console.log(locations);
                //select_action(roster[ch]);
                attachTreeToAgent(roster[ch].name, select_action(roster[ch]));
                //console.log(roster);
            }
        }
        worldTick();
    } else {
        //evening, everyone goes to start
        for (var c in roster) {
            roster[c].set_location("start");
            roster[c].is_occupied = false;
        }
        //all locations are unoccupied 
        locations["str"].assigned = false;
        locations["int"].assigned = false;
        locations["mag"].assigned = false;
        locations["affinity1"].assigned = false;
        locations["affinity2"].assigned = false;

    }

}
function draw_character_buttons() {
    //var y = 50;
    for (var b in char_buttons) {
        char_buttons[b].draw();
    }
    pass.draw();
    for (var b in mission_buttons) {
        //console.log(current_day);
        //console.log(mission_board[b].day)
        if(current_day == mission_board[b].day && !mission_board[b].assigned) {
            mission_buttons[b].draw();
            mission_buttons[b].write_text();
        }
    }
    

    //context.drawImage(char_buttons[0].image, char_buttons[0].x, char_buttons[0].y);
    
}
function create_buttons() {
    pop = new Popup(300, 200, "popup");
    var y = 20;
    for (var c in roster) {
        var char_name = roster[c].name;
        var b = new Button(10, y, char_name, char_name, char_name+"_p");
        var n = "tiny"+char_name
        var tiny_b = new Button(0, 0, n, char_name, n+"_p");
        //console.log(images[n+"_p"]);
        //console.log(images);
        //console.log(n);
        popup_buttons.push(tiny_b);
        char_buttons.push(b);
        y+=90;
    }
    y+=20;
    var x= 20;
    var count = 0;
    for (var c in mission_board) {
        //hard coded and hacky, 3 missions per day
        if (count == 3) {
            x = 20;
            count = 0;
        }
        //console.log(x);
        var mission_title = mission_board[c].title;
        var b = new Button(x, y, "button", mission_title);
        mission_buttons.push(b);
        x+=220;
        count++;
        

    }
    pass = new Button(720, 580, "pass", "pass");
    ok = new Button(0,0,"ok", "ok");

}
function checkBounds(object, x, y) {
    var minX = object.x;
    var maxX = object.x + object.image.width;
    var minY = object.y;
    var maxY = object.y + object.image.height;
    var mx = x;
    var my = y;
    //console.log("For object " + object.text);
    //console.log("button x range:" + minX + " to " + maxX);
    //console.log("button y range:" + minY + " to " + maxY);

    if (mx >= minX && mx <= maxX && my >= minY && my <= maxY) {
        return true;
    }
    return false;
}


function clicked(e) {
    if (current_day == last_day) return;
    if (day_screen_active) return;
    //only want to open popup when button is clicked.
    //close popup when popup is clicked off. 
    const rect = canvas.getBoundingClientRect()
    const canv_x = e.clientX - rect.left
    const canv_y = e.clientY - rect.top
    //figure out what was clicked first. 
    //console.log("moues pos: " + e.clientX + ", " + e.clientY); //debugging
    if(!pop.is_open){
        //check if a button was clicked  
        for (var button in char_buttons) {
            if (checkBounds(char_buttons[button], canv_x, canv_y)) {
                //draw popup
                char_buttons[button].pressed = true;
                pop.is_open = true;
                draw_canvas();
                pop.draw();
                //console.log(roster[find_in_list("roster", char_buttons[button].text)].stats_tostr());
                pop.fill_popup(roster[find_in_list("roster", char_buttons[button].text)].stats_tostr(), false, false);
                //console.log("Character: " + roster[find_in_list("roster", char_buttons[button].text)].name);
                //console.log(roster[find_in_list("roster", char_buttons[button].text)].stats);
            }
        }
        for (var button in mission_buttons) {
            if (!mission_buttons[button].assigned && checkBounds(mission_buttons[button], canv_x, canv_y) && current_day == mission_board[button].day) {
                pop.is_open = true;
                selected_mission = button;
                //console.log("SETTING SELECTED MISSION");
                pop.draw();
                //draw_popup_buttons();
                //console.log(mission_buttons[button].text);
                //console.log(find_in_list("mission", mission_buttons[button].text));
                //console.log(mission_board[0].title);
                var mission_title = mission_board[find_in_list("mission", mission_buttons[button].text)].title;
                var mission_desc = mission_board[find_in_list("mission", mission_buttons[button].text)].get_desc();
                pop.fill_popup(mission_title + "\n" + mission_desc, true, false);
                //pop.fill_popup("desc", true, false)
                //pop.draw_popup_buttons();
            } 
        }
        if (checkBounds(pass, canv_x, canv_y)) {
            //console.log("pass clicked");
            update_time();
        }

    } else {
        //if pop up is open, want to check if anything BUT buttons was clicked (for now)
        if (checkBounds(pop, canv_x, canv_y)) {
            console.log("Popup clicked!");
            if (selected1 != null && selected2 != null) {
                console.log(checkBounds(ok,  canv_x, canv_y));
                if (checkBounds(ok,  canv_x, canv_y)) {
                    //console.log("Ok clicked");
                    pop.dismiss();
                    //selected1 = null;
                    //selected2 = null;
                    //selected_mission = null;
                }
            }
            for (var b in popup_buttons) {
                //check if those buttons were clicked. 
                //console.log(popup_buttons[b]);
                if (checkBounds(popup_buttons[b], canv_x, canv_y)) {
                    console.log("clicked is " + popup_buttons[b].text);
                    //Select character
                    if (selected1 == null && selected_mission != null && !roster[find_in_list("roster", popup_buttons[b].text)].is_on_mission) {
                        selected1 = popup_buttons[b].text;
                        popup_buttons[b].pressed = true;
                        console.log(selected_mission);
                        //redraw w pressed button
                        pop.draw();
                        pop.reset();
                        var mt = mission_board[selected_mission].title;
                        var md = mission_board[selected_mission].get_desc();
                        pop.fill_popup(mt + "\n" + md, true, false);
                    } else if (popup_buttons[b].text != selected1 && !roster[find_in_list("roster", popup_buttons[b].text)].is_on_mission) {
                        selected2 = popup_buttons[b].text;
                        popup_buttons[b].pressed = false;
                    }
                    console.log("first: " + selected1);
                    console.log("second: " + selected2);
                    if (selected1 != null && selected2 != null) {
                        //console.log("Two characters selected. Asssigning mission.");
                        //console.log("Title: "+ mission_board[selected_mission].title + "\nDesc: " + mission_board[selected_mission].desc);

                        //assign mission
                        mission_board[selected_mission].assign(selected1, selected2);
                        //fill new text on popup
                        //pop.dismiss();
                        pop.reset();
                        pop.is_open = true;
                        pop.draw();
                        //console.log("still in if");
                        pop.fill_popup("Sending "+ selected1 +" and "+ selected2 + " on the mission.", false, true);
                        text_log.push("Sent " + selected1 + " and " + selected2 + " on: " + mission_board[selected_mission].title);
                        //selected1 = null;
                        //selected2 = null;
                        selected_mission = null;
                        //pass time
                        //update_time();
                    }
                    
                }
            }
        } else {
            //console.log("close popup");
            pop.is_open = false;
            pop.dismiss();
            //selected1 = null;
            //selected2 = null;
            //selected_mission = null;
            //pop.reset();
        }
    }
}

//construct popup. Maybe make it object? 
function setup() {
    //things to only do one time. 
    preload_img();
    create_locations();
    create_roster();
    create_missions();
    create_buttons();
    draw_canvas();

}
//villanelle stuff
//function referenced from: https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
function get_random_char_list() {
    var len = roster.length;
    var temp;
    var index;

    while (len > 0) {
        index = Math.floor(Math.random() * len);
        len--;
        temp = roster[len]
        roster[len] = roster[index]
        roster[index] = temp;
    }
    //console.log(roster);
    //console.log("highest aff: " + get_char_to_raise_affinity(roster[0]).name);
    //start actions:
}
function select_action(c) {
    //switch statement
    console.log(c.name + " selecting action...");
    switch(c.name) {
        case "Min":
            return selector([get_character_train_str(c), get_character_raise_affinity(c), get_character_train_int(c), get_character_train_mag(c)]);
        case "Landol":
            return selector([get_character_train_mag(c), get_character_train_int(c), get_character_raise_affinity(c), get_character_train_str(c)]);
        case "Horst":
            return selector([get_character_raise_affinity(c), get_character_train_str(c), get_character_train_int(c), get_character_train_mag(c)]);
        case "Rory":
            return selector([get_character_train_str(c), get_character_raise_affinity(c), get_character_train_int(c), get_character_train_mag(c)]);
        case "Danth":
            return selector([get_character_train_str(c), get_character_raise_affinity(c), get_character_train_int(c), get_character_train_mag(c)]);
    }
    //return selector([get_character_train_str(c), get_character_raise_affinity(c), get_character_train_int(c), get_character_train_mag(c)])
}
function get_char_to_raise_affinity(c) {
    //find the character with the highest affinity that is NOT 10 and NOT occupied
    var highest = null;
    var highest_aff = -1;
    for (var ch in roster) {
        //console.log(c);
        //console.log(roster[ch]);
        var comp = roster[ch];
        if(comp.name != c.name) {
            if(!comp.is_occupied) {
                if(c.affinity[comp.name] < 10 && c.affinity[comp.name] >= highest_aff) {
                    highest = comp;
                    highest_aff = c.affinity[comp.name];
                }
            }
        }
    }
    console.log(c.name + "'s highest affinity is with " + highest.name);
    return highest;
}
//CHECK SPOT DEC
function get_character_train_str(c) {
    let train_str = action( 
    () => !locations["str"].assigned && c.stats["str"] < 10 && !c.is_occupied && !c.is_on_mission,
    () => {
            text_log.push(c.name +" is training str.");
            console.log(locations["str"].assigned);
            locations["str"].assigned = true;
            c.is_occupied = true; 
            //increase stat
            c.increase_stat("str", 1);
            //set c's location
            c.set_location("str");
            
        }, 0
    )
    
    return train_str;
}
function get_character_train_int(c) {
    //console.log("int loc: " + int_cond);
    let train_int = action( 
    () => !locations["int"].assigned && c.stats["int"] < 10 && !c.is_occupied && !c.is_on_mission,
    () => {
            text_log.push(c.name +" is training int.");
            //set location assigned
            locations["int"].assigned = true;
            c.is_occupied = true; 
            //increase stat
            c.increase_stat("int", 1);
            //set c's location
            c.set_location("int");
        }, 0
    )
    return train_int;
}
function get_character_train_mag(c) {
    //var mag_cond = !locations["mag"].assigned && c.stats['mag'] < 10 && !c.is_occupied;
    let train_mag = action( 
    () => !locations["mag"].assigned && c.stats["mag"] < 10 && !c.is_occupied && !c.is_on_mission,
    () => { 
            //console.log(mag_cond);    
            text_log.push(c.name +" is training mag.");
            //set location assigned
            locations["mag"].assigned = true;
            c.is_occupied = true; 
            //increase stat
            c.increase_stat("mag", 1);
            //set c's location
            c.set_location("mag");
            //console.log(c);
            //console.log(locations["mag"]);
        }, 0
    )
    return train_mag;
}
function get_character_raise_affinity(c) {
    let raise_affinity = action(
        () => !locations["affinity1"].assigned && !locations["affinity2"].assigned && !c.is_occupied,
        () => {
                var c2 = get_char_to_raise_affinity(c); //this is character obj. Should be unoccupied w less than 10 aff
                text_log.push(c.name +" is raising affinity with " + c2.name + ".");
                //set location assigned
                locations["affinity1"].assigned = true;
                locations["affinity2"].assigned = true;
                //increase affinity with them
                c.increase_affinity(c2.name);
                c2.increase_affinity(c.name);
                //set both to occupied
                c.is_occupied = true;
                c2.is_occupied = true;
                //set both' location
                c.set_location("affinity1");
                c2.set_location("affinity2");
        }, 0
    )
    return raise_affinity;
}
//TODO
//[x] button on pop up.

//Future Improvements:
//Improved UI
//Character dialogue
//Characters training together
//Missions having a way to win with affinity
