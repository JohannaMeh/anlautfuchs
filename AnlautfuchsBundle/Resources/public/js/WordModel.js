/* 
    Model for words of the game.
*/
Game.WordModel = (function(){
    var that = {},
    word = null,
    image = null,
    sound = null,
    solution = null,

    /* 
        Returns word itself.
    */
    getWord = function(){
        return word;
    },

    /* 
        Returns the image to the word.
    */
    getImage = function(){
        return image;
    },

    /* 
        Returns the sound of the word.
    */
    getSound = function(){
        return sound;
    },

    /* 
        Returns the solution to the word.
    */
    getSolution = function(){
        return solution;
    },

    /* 
        Checks if te character is correct.
    */
    checkCharacter = function(character){
        if(character.toLowerCase() == solution.toLowerCase()){
            return true;
        }

        return false;
    },

    /* 
        Creates the object from json.
    */
    createFromJson = function(json){
        word = json.word;
        image = json.image;
        sound = json.sound;
        solution = json.solution;
        return that;
    };
 
    that.getWord = getWord;
    that.getImage = getImage;
    that.getSound = getSound;
    that.getSolution = getSolution;
    that.checkCharacter = checkCharacter;
    that.createFromJson = createFromJson;

    return that;
});