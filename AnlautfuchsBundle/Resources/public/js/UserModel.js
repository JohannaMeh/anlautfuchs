/* 
    Contains informations about the current user.
*/
Game.UserModel = (function(){
    var that = {},

    currentLevel = null,
    companion = null,
    name = null,
    berriesEaten = null,
    gameWon = false,

    /* 
        Initializes the user. Does nothing...
    */
    init = function() {

        return that;
    },

    /* 
        Returns the highest level of the user.
    */
    getCurrentLevel = function(){
        return currentLevel;
    },

    /* 
        Sets the highest level of the user.
    */
    setCurrentLevel = function(level){
        currentLevel = level;
    },

    /* 
        Returns the current user companion.
    */
    getCompanion = function(){
        return companion;
    },

    /* 
        Sets the current user companion.
    */
    setCompanion = function(newCompanion){
        companion = newCompanion;
    },

    /* 
        Returns the value of currently eaten berries.
    */
    getBerriesEaten = function(){
        return berriesEaten;
    },

    /* 
        Sets the value of currently eaten berries.
    */
    setBerriesEaten = function(newBerriesEaten){
        berriesEaten = newBerriesEaten;
    },

    /* 
        Returns the user name. (not used?)
    */
    getName = function(){
        return name;
    },

    /* 
        Tells if the user already won the game
    */
    getGameWon = function(){
        return gameWon;
    },

    /* 
        Creates the user from an json string.
    */
    createFromJson = function(json){
        name = json.name;

        var level = new Game.LevelModel();
        currentLevel = level.createFromJson(json.current_level);

        companion = json.user_companion.type;

        berriesEaten = json.berries_eaten;
        gameWon = json.game_won;

        return that;
    };

    that.init = init;  
    that.getCurrentLevel = getCurrentLevel;
    that.setCurrentLevel = setCurrentLevel;
    that.getCompanion = getCompanion;
    that.setCompanion = setCompanion;
    that.setBerriesEaten = setBerriesEaten;
    that.getBerriesEaten = getBerriesEaten;
    that.getName = getName;
    that.getGameWon = getGameWon;
    that.createFromJson = createFromJson;  

    return that;
})();