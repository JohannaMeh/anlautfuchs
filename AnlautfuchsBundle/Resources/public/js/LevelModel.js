/* 
    The level model. It contains alle informations about the current level.
*/
Game.LevelModel = (function(){
    var that = {},
    id = null,
    parentId = null,
    name = null,
    showImage = null, /* boolean */
    showSecondRow = null, /* boolean */
    wordSound = null, /* boolean */
    imageOptional = null, /* boolean */
    words = [], /* array */

    nextLevelId = null,
    explanationSound = null,


    /* game logic */
    currentWord = 0,
    correctWordCount = 0,
    neededWordCount = 15,
    levelFinished = false,
    firstGuess = true,

    /* level */
    alreadyFinishedOnce = false,
    foxTypeUnlockable = null,


    /* 
        Initialises the object. Resets certain values.
    */
    init = function() {

        alreadyFinishedOnce = false;
        foxTypeUnlockable = null;

        return that;
    },

    /* 
        Checks if the current character is the correct character. Also saves a value if this was the first guess or not. 
        And checks if the level is finished.
    */
    checkCharacter = function(character){
        var success = words[currentWord].checkCharacter(character);

        if(success){
            if(firstGuess){
                correctWordCount++;
                if(correctWordCount == neededWordCount){
                    levelFinished = true;
                }
            }
        }else{
            firstGuess = false;
        }

        return success;
    },

    /* 
        Returns the value of levelFinished.
    */
    isLevelFinished = function(){
        return levelFinished;
    },

    /* 
        Returns the next word for the current level.
    */
    getNextWord = function(){
        if(currentWord < (words.length-1)){
            currentWord++;
        }else{
            currentWord = 0;
            shuffleWords();
        }

        firstGuess = true;
        return words[currentWord];
    },

    /* 
        Returns the current word.
    */
    getCurrentWord = function(){
        return words[currentWord];
    },

    /* 
        Tells if the second row of the game view should be shown or not.
    */
    showSecondRow = function(){
        return showSecondRow;
    },

    /* 
        Tells if the image for the word should be shown or not.
    */
    showImage = function(){
        return showImage;
    },

    /* 
        Returns the level name
    */
    getName = function(){
        return name;
    },

    /* 
        Returns the level id
    */
    getId = function(){
        return id;
    },

    /* 
        Tells if the sound for the word should be played or not.
    */
    getWordSound = function(){
        return wordSound;
    },

    /* 
        Tells if the image should be visible if the user needs a hint.
    */
    getImageOptional = function(){
        return imageOptional;
    },

    /* 
        Returns the location of the explanation sound file for the level.
    */
    getExplanationSound = function(){
        return explanationSound;
    },

    /* 
        Returns the id of the next level
    */
    getNextLevelId = function(){
        return nextLevelId;
    },

    /* 
        Tells if the last character was guessed correcty on the first turn.
    */
    wasFirstGuess = function(){
        return firstGuess;
    },

    /* 
        Initialices most of the object variables from a json string.
    */
    createFromJson = function(json){
        id = json.id;
        name = json.name;
        showImage = json.image;
        showSecondRow = json.second_row;
        nextLevelId = json.next_level;
        explanationSound = json.explanation_sound;

        wordSound = json.word_sound;
        imageOptional = json.image_optional;

        if(json.parent_level){
            parentId = json.parent_level.id;
        }else{
            parentId = undefined; 
        }

        for(var i = 0; i < json.words.length; i++){
            var wordModel = new Game.WordModel();
            wordModel.createFromJson(json.words[i]);
            words[i] = wordModel;
        }

        //printWords();

        shuffleWords();

        return that;
    },

    /* 
        Returns the parent id of the level
    */
    getParentId = function(){
        return parentId;
    },

    /* 
        Shuffles the words of the level so they are in a random order.
    */
    shuffleWords = function(){
        words = shuffle(words);
    },

    /* 
        Shuffle algorithm for an array. Will randomize the order of an array.
    */
    shuffle = function(array) {
      var currentIndex = array.length, temporaryValue, randomIndex ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },

    /* 
        Prints a list of the words for this level to the console. Useful for debugging purposes.
    */
    printWords = function(){
        for(var i = 0; i < words.length; i++){
            console.log('Word ',i,words[i].getWord());
        }
    },

    /* 
        Tells if finishing this level will unlock a companion type and which type.
    */
    getFoxTypeUnlockable = function(){
        return foxTypeUnlockable;
    },

    /* 
        Sets the fox type which is unlockable for this level.
    */
    setFoxTypeUnlockable = function(foxType){
        foxTypeUnlockable = foxType;
        console.log("FoxType set: ", foxType);
    },

    /* 
        Checks if this level was already finished once.
    */
    checkIfAlreadyFinished = function(levelList){
        alreadyFinishedOnce = true;
        for(var key in levelList){
            if(nextLevelId == levelList[key]){
                alreadyFinishedOnce = false;
            }
        }
        console.log("Level was already finished Once: ", alreadyFinishedOnce);
    },

    /* 
        Sets the already finished once.
    */
    setAlreadyFinishedOnce = function(alreadyFinished){
        alreadyFinishedOnce = alreadyFinished;
    },

    /* 
        Tells if this level was already finished once.
    */
    wasAlreadyFinishedOnce = function(){
        return alreadyFinishedOnce;
    };
    

    that.init = init;
    that.checkCharacter = checkCharacter;
    that.isLevelFinished = isLevelFinished;
    that.getNextWord = getNextWord;
    that.getCurrentWord = getCurrentWord;
    that.getExplanationSound = getExplanationSound;
    that.showImage = showImage;
    that.showSecondRow = showSecondRow;
    that.getName = getName;
    that.getId = getId;
    that.wasFirstGuess = wasFirstGuess;
    that.getNextLevelId = getNextLevelId;
    that.createFromJson = createFromJson;

    that.getParentId = getParentId;

    that.getFoxTypeUnlockable = getFoxTypeUnlockable;
    that.setFoxTypeUnlockable = setFoxTypeUnlockable;
    that.checkIfAlreadyFinished = checkIfAlreadyFinished;
    that.wasAlreadyFinishedOnce = wasAlreadyFinishedOnce;
    that.setAlreadyFinishedOnce = setAlreadyFinishedOnce;
    that.getWordSound = getWordSound;
    that.getImageOptional = getImageOptional;

    return that;
});