//Aaron Stones
//AND coding challenge
//03/05/2021

function solution(input){

  let strings = new stringService
  let integers = new numberService

  input = strings.removeCharacters(input)

  if(input === true)
    return 'There are no numbers.'
  
  let numbers = strings.sizeArray(input)

  if (integers.checkNaughts(numbers) === true)
    return 'Please enter a character set containing numbers > 0'

  numbers = integers.getPossibilities(numbers, numbers.length)

  integers.result = [] //reset the result array for next input
  
  return numbers.sort((x, y) => y - x)

}

class stringService { 
  removeCharacters(str) { //remove all unneeded characters from the string using regex
    let myString = str.replace(/\D/g,'')
  
    if (myString === '') //were there any numbers in the string
      return true
    
    return myString
  }

  sizeArray(str){ //create an array of all numbers stored
    let arr = []

    for(let x = 0; x < str.length; x++){
      arr[x] = Number(str.charAt(x)) //convert them from string to numbers
    }
    
    return arr
  }
  
}


class numberService { 

  result = []
  
  checkNaughts(num) { //check if the user has entered all naughts
      
      let naught = true
      for(let x = 0; x < num.length; x++){
          if (num[x] !== 0)
              naught = false
          
      }

      return naught

  }

  getPossibilities(numArr, size){ //get all possible combinations of the numbers entered using a Heap's Algorithm - https://en.wikipedia.org/wiki/Heap%27s_algorithm
      if (size === 1) {
          this.result.push(numArr.join(""));
          return;
      }
      
      for (let x = 0; x < size; x++){
          this.getPossibilities(numArr, size - 1)
          if (size % 2 === 1) {
              let placeholder = numArr[0]
              numArr[0] = numArr[size - 1]
              numArr[size - 1] = placeholder
          } else {
              let placeholder = numArr[x];
              numArr[x] = numArr[size - 1]
              numArr[size - 1] = placeholder
          }
      }

      this.result = [...new Set(this.result)] //remove duplicates

      this.removeNaughts() 

      return this.result
  }

  removeNaughts(){ //remove the leading naughts
      for (let x = 0; x < this.result.length; x++){
          this.result[x] = +this.result[x]
      }
  }
 
}

// some example inputs
console.log(solution('326')); // expected output 632,623,362,326,263,236
console.log(solution('A 3B2 C6D')); // expected output 632,623,362,326,263,236
console.log(solution('6000'));
console.log(solution('64xxvau78AAA'));


