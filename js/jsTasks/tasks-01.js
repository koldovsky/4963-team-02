//https://www.codewars.com/kata/grasshopper-messi-goals-function/train/javascript
function goals (laLigaGoals, copaDelReyGoals, championsLeagueGoals) {
    return laLigaGoals + copaDelReyGoals + championsLeagueGoals;
}

//https://www.codewars.com/kata/55685cd7ad70877c23000102/train/javascript
function makeNegative(num) {
  if (num > 0) {
    return -num; 
  } else {
    return num;
  }

//https://www.codewars.com/kata/55685cd7ad70877c23000102/train/javascript
function move (position, roll) {
 return position + roll*2
}

//https://www.codewars.com/kata/grasshopper-personalized-message/train/javascript
function greet(name, owner) {
  return name === owner
    ? "Hello boss"
    : "Hello guest";
}

//https://www.codewars.com/kata/keep-hydrated-1/train/javascript
function litres(time) {
  const waterPerHour = 0.5;
  const total = time * waterPerHour;

  return Math.floor(total);
}

//https://www.codewars.com/kata/555086d53eac039a2a000083/train/javascript
function lovefunc(flower1, flower2) {
  const sum = flower1 + flower2;

  if (sum % 2 === 0) {
    return false;
  }

  return true;
}
}