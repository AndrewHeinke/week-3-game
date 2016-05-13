window.onload = function () {
  // todo cue pokemon theme song here if have time
  console.log("I want to be the very best");
  console.log("Like no one ever was");
  console.log("To catch them is my real test");
  console.log("To train them is my cause");

  // variables I will be using
  var guessesLeft = 10;
  var wins = 0;
  var losses = 0;
  var lettersGuessed = [];
  var correctLetters = [];
  var wordBank = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidorina", "Nidoqueen", "Nidoran", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"];

  //randomly select index out of wordBank array
  var targetWord = wordBank[Math.floor(Math.random() * wordBank.length)].toLowerCase();

  // make chosenWord display as _ _ _ _ _
  var chosenWord = [];
  for (var i = 0; i < targetWord.length; i++) {
    chosenWord[i] = "_ ";
  }

  document.querySelector('#wordToGuess').innerHTML = chosenWord.join(" ");

  // track current word
  var letterCount = targetWord.length;

  // display stats
  document.querySelector('#winCounter').innerHTML = "Wins: " + wins;
  document.querySelector('#lossCounter').innerHTML = "Losses: " + losses;
  document.querySelector('#remaining-guesses').innerHTML = "Guesses Left: " + guessesLeft;

  // resets the game
  function resetHangman() {
    guessesLeft = 10;
    lettersGuessed = [];
    correctLetters = [];
    targetWord = wordBank[Math.floor(Math.random() * wordBank.length)].toLowerCase();

    chosenWord = [];
    for (var i = 0; i < targetWord.length; i++) {
            chosenWord[i] = "_";
        }

    letterCount = targetWord.length;

    document.querySelector('h1').innerHTML = "GUESS THAT POKEMON!";

    document.querySelector('#wordToGuess').innerHTML = chosenWord.join(" ");

    // display reset stats
    document.querySelector('#winCounter').innerHTML = "Wins: " + wins;
    document.querySelector('#lossCounter').innerHTML = "Losses: " + losses;

    document.querySelector('#remaining-guesses').innerHTML = "Guesses Left: " + guessesLeft;

    document.querySelector('#yourGuesses').innerHTML = "Letters Guessed: ";

    document.querySelector('#resetWrapper').style.display = "block";

  }

  // starts hangman game on key up
  document.onkeyup = function(event) {
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

    // make sure user pressed a letter key
    if (event.keyCode > 64 && event.keyCode < 91) {

      // see if letter is already there
      if ((chosenWord.indexOf(userGuess) !== -1)) {
                return;
      }

      // update array with userGuess
      for (var i = 0; i < targetWord.length; i++) {
                if (targetWord.charAt(i) === userGuess) {
                    chosenWord[i] = userGuess;
                    letterCount--;
                    document.querySelector('#wordToGuess').innerHTML = chosenWord.join(" ");
                }
      }

      // see if userGuess is not in chosenWord and letter is in lettersGuessed array so no duplication occurs
      if ((targetWord.indexOf(userGuess) === -1) && (lettersGuessed.indexOf(userGuess) !== -1)) {
              document.querySelector('#yourGuesses').innerHTML = "Letters Guessed: " + lettersGuessed.join(", ");
              return;
      }

      for (var j = 0; j < targetWord.length; j++) {
                if (targetWord.indexOf(userGuess) === -1) {
                    lettersGuessed.push(userGuess);
                    guessesLeft--;
                    break;
                }
      }

      // see if game is over, user guessed word or ran out of guesses
      if (letterCount === 0) {
        wins++;
        document.querySelector("h2").innerHTML = "You Won! Ya gotta catch em all!";
        document.querySelector("#test1").innerHTML = "The Pokemon was " + targetWord.toUpperCase() + ", Play again...";
        //todo show winner image if have time
        document.querySelector("#resetWrapper").style.display = "none";
        setTimeout(resetHangman, 2500);
      } else if (guessesLeft === 0) {
          losses++;
          document.querySelector("h2").innerHTML = "You Lost! Try harder next time.";
          document.querySelector("#test1").innerHTML = "The Pokemon was " + targetWord.toUpperCase() + ", Play again...";
          //todo show loser image here if you have time
          document.querySelector("#resetWrapper").style.display = "none";
          setTimeout(resetHangman, 2500);
      }


        document.querySelector('#remaining-guesses').innerHTML = "Guesses Left: " + guessesLeft;

        document.querySelector('#yourGuesses').innerHTML = "Letters Guessed: " + lettersGuessed.join(", ");
    }

  };




};
