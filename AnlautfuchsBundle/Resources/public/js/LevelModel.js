Game.LevelModel = (function(){
    var that = {},
    id = null,
    parentId = null,
    name = null,
    showImage = null, /* boolean */
    showSecondRow = null, /* boolean */
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


    init = function() {

        alreadyFinishedOnce = false;
        foxTypeUnlockable = null;

        return that;
    },

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

    isLevelFinished = function(){
        return levelFinished;
    },

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

    getCurrentWord = function(){
        return words[currentWord];
    },

    showSecondRow = function(){
        return showSecondRow;
    },

    showImage = function(){
        return showImage;
    },

    getName = function(){
        return name;
    },

    getId = function(){
        return id;
    },

    getExplanationSound = function(){
        return explanationSound;
    },

    getNextLevelId = function(){
        return nextLevelId;
    },

    wasFirstGuess = function(){
        return firstGuess;
    },

    createFromJson = function(json){
        id = json.id;
        name = json.name;
        showImage = json.image;
        showSecondRow = json.second_row;
        nextLevelId = json.next_level;
        explanationSound = json.explanation_sound;

        if(json.parent_level){
            parentId = json.parent_level.id;
        }else{
            parentId = undefined; 
        }

        for(var i = 0; i < json.word.length; i++){
            var wordModel = new Game.WordModel();
            wordModel.createFromJson(json.word[i]);
            words[i] = wordModel;
        }

        //printWords();

        shuffleWords();

        return that;
    },

    getParentId = function(){
        return parentId;
    },

    shuffleWords = function(){
        words = shuffle(words);
    },

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


    printWords = function(){
        for(var i = 0; i < words.length; i++){
            console.log('Word ',i,words[i].getWord());
        }
    },


    getFoxTypeUnlockable = function(){
        return foxTypeUnlockable;
    },

    setFoxTypeUnlockable = function(foxType){
        foxTypeUnlockable = foxType;
        console.log("FoxType set: ", foxType);
    },

    checkIfAlreadyFinished = function(levelList){
        alreadyFinishedOnce = true;
        for(var key in levelList){
            if(nextLevelId == levelList[key]){
                alreadyFinishedOnce = false;
            }
        }
        console.log("Level was already finished Once: ", alreadyFinishedOnce);
    },

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

    return that;
});