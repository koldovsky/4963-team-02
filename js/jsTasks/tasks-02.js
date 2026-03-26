//https://www.codewars.com/kata/convert-a-string-to-an-array/train/javascript
function stringToArray(string) {
  return string.split(" ");
}

//https://www.codewars.com/kata/dna-to-rna-conversion/train/javascript
function DNAtoRNA(dna) {
  return dna.replaceAll("T", "U");
}

//https://www.codewars.com/kata/577a98a6ae28071780000989/train/javascript
var min = function(list) {
  let minValue = list[0];

  for (let i = 1; i < list.length; i++) {
    if (list[i] < minValue) {
      minValue = list[i];
    }
  }

  return minValue;
}

var max = function(list) {
  let maxValue = list[0];

  for (let i = 1; i < list.length; i++) {
    if (list[i] > maxValue) {
      maxValue = list[i];
    }
  }

  return maxValue;
}

//https://www.codewars.com/kata/544a54fd18b8e06d240005c0/train/javascript
function min(arr, toReturn) {
  let min = arr[0];
  let index = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
      index = i;
    }
  }

  if (toReturn === "value") {
    return min;
  } else {
    return index;
  }
}