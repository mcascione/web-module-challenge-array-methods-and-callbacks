const { fifaData } = require('./fifa.js')
// console.log(fifaData);

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/
const finals2014 = fifaData.filter((match) => {
    return (match.Stage === 'Final' && match.Year === 2014);
});

// console.log(finals2014);

//(a) Home Team name for 2014 world cup final
// console.log('Task 1a:', finals2014[0]['Home Team Initials']);

//(b) Away Team name for 2014 world cup final

// console.log('Task 1b:', finals2014[0]['Away Team Initials']);

//(c) Home Team goals for 2014 world cup final

// console.log('Task 1c:', finals2014[0]['Home Team Goals']);

//(d) Away Team goals for 2014 world cup final

// console.log('Task 1d:', finals2014[0]['Away Team Goals']);

//(e) Winner of 2014 world cup final */
// console.log('Task 1e:', finals2014[0]['Win conditions']);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(array) {
    const finalsTeams = array.filter((match) => {
        return match.Stage === 'Final';
    });
    return finalsTeams;
 }

//  console.log('Task 2:', getFinals(fifaData));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, getFinalsCB) {
    return getFinalsCB(array).map((match) => {
       return match.Year;
    });
}

// console.log(getYears(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(array, getFinalsCB) {
    const winners = [];
    getFinalsCB(array).map((match)=>{
        if (match["Home Team Goals"] > match["Away Team Goals"]){
            winners.push(match["Home Team Name"]);
        } else if (match["Away Team Goals"] > match["Home Team Goals"]){
            winners.push(match["Away Team Name"]);
        } 
    });
    return winners;
}

// console.log('Task 4:', getWinners(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, getFinalsCB, getYearsCB, getWinnersCB) {
    const winners = getWinnersCB(array, getFinalsCB);
    const years = getYears(array, getFinalsCB);
    return winners.map((match, index) => {
        return `In ${years[index]}, ${match} won the world cup!`;
    })
}

// console.log('Task 5:', getWinnersByYear(fifaData, getFinals, getYears, getWinners));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function `getAverageGoals` to do the following: 
 1. Receive a callback function as a parameter that will take `getFinals` (from task 2) as an argument; ensure you pass in `fifaData` as its argument
 
 💡 HINT: Example of invocation: `getAverageGoals(getFinals(fifaData));`

 2. Calculate the AVERAGE number of the TOTAL home team goals AND TOTAL away team goals scored PER MATCH

 3. Round to the second decimal place and return the value
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
*/

function getAverageGoals(getFinalsCB) {
    const averageGoals = getFinalsCB.reduce((totalGoals, match) => {
        return totalGoals + match['Home Team Goals'] + match['Away Team Goals'];
    }, 0);
      
    return (averageGoals / getFinalsCB.length).toFixed(2);
 }

// console.log('Task 6:', getAverageGoals(getFinals(fifaData)));


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {

    const countryMatches = data.filter((match) => {
        return teamInitials === match['Home Team Initials'] || teamInitials === match['Away Team Initials'];
    })
    
    // console.log('countryMatches:', countryMatches);

    const countryWins = countryMatches.reduce((acc, curr) => {
        if(curr.Stage === "Final"){
            if (curr['Home Team Initials'] === teamInitials && curr['Home Team Goals'] > curr['Away Team Goals']){
                acc += 1
            } 
            if (curr['Away Team Initials'] === teamInitials && curr['Away Team Goals'] > curr['Home Team Goals']){
                acc += 1 
            }
        }
        return acc;
    }, 0)
    // console.log('countryWins', countryWins);

    return countryWins;
}

// console.log('Final Sum of Wins:', getCountryWins(fifaData, 'ITA'));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {

}

getGoals(fifaData);


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
