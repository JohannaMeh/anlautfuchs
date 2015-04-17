Game.WordModel = (function(){
    var that = {},
    word = null,
    image = null,
    sound = null,
    solution = null,

    getWord = function(){
        return word;
    },

    getImage = function(){
        return image;
    },

    getSound = function(){
        return sound;
    },

    getSolution = function(){
        return solution;
    },

    checkCharacter = function(character){
        if(character.toLowerCase() == solution.toLowerCase()){
            return true;
        }

        return false;
    },

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