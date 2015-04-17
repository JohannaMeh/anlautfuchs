Game.UserModel = (function(){
    var that = {},

    currentLevel = null,
    companion = null,
    name = null,
    berriesEaten = null,


    init = function() {

        return that;
    },

    getCurrentLevel = function(){
        return currentLevel;
    },

    setCurrentLevel = function(level){
        currentLevel = level;
    },

    getCompanion = function(){
        return companion;
    },

    setCompanion = function(newCompanion){
        companion = newCompanion;
    },

    getBerriesEaten = function(){
        return berriesEaten;
    },

    setBerriesEaten = function(newBerriesEaten){
        berriesEaten = newBerriesEaten;
    },

    getName = function(){
        return name;
    },

    createFromJson = function(json){
        name = json.name;

        var level = new Game.LevelModel();
        currentLevel = level.createFromJson(json.current_level);

        companion = json.user_companion.type;

        berriesEaten = json.berries_eaten;

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
    that.createFromJson = createFromJson;  

    return that;
})();