import EmbarkJS from 'Embark/EmbarkJS';
//import your contracts
//e.g if you have a contract named SimpleStorage:
//import SimpleStorage from 'Embark/contracts/SimpleStorage';

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

EmbarkJS.onReady(function(error: string) {
  if(error) {
    console.error(error)
  }
  console.log("Embark is ready")
});

let greeter = new Greeter("world");

let button = document.createElement('button');
button.textContent = "Say Hello";
button.onclick = function() {
  alert(greeter.greet());
}

document.body.appendChild(button);

