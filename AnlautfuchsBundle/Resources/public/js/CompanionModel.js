/* 
    An object responsible for all available companions.
*/
Game.CompanionModel = (function(){
    var that = {},
    types = [],
    neededLevelIds = [],
    typeVisible = [],
    disabledLevelIds = [],
    unlockedOnGameWon = [],

    gameWon = false,

    /* 
        Initialises the object and sets default values.
    */
    init = function() {
        types = [];
        typeVisible = [];
        neededLevelIds = [];
        unlockedOnGameWon = [];
        return that;
    },

    /* 
        Returns the next available companion type.
    */
    getNext = function(type){
        console.log("next " + types);
        var position = types.indexOf(type);
        if(position != -1){
            var nextPos = 0;

            if(position < (types.length -1)){
                nextPos = position + 1;
            }

            console.log("check next: " + nextPos);
            while(!typeVisible[nextPos]){
                console.log("check next: " + nextPos);
                if(nextPos < (types.length -1)){
                    nextPos++;
                }else{
                    nextPos = 0;
                }
            }

            return types[nextPos];
        }

        return types[0];
    },

    /* 
        Returns the previous available companion type.
    */
    getPrev = function(type){
        console.log("previous " + types);
        var position = types.indexOf(type);
        if(position != -1){
            var nextPos = types.length - 1;

            if(position > 0){
                nextPos = position - 1;
            }
            console.log("check prev: " + nextPos);
            while(!typeVisible[nextPos]){
                console.log("check prev: " + nextPos);
                if(nextPos > 0){
                    nextPos--;
                }else{
                    nextPos = types.length - 1;
                }
            }
            
            return types[nextPos];
        }

        return types[0];
    },

    /* 
        Sets the companion from a given json string.
    */
    createFromJson = function(json){
        for(var i = 0; i < json.length; i++){
            console.log(json[i]);
            types[i] = json[i].type;
            neededLevelIds[i] = json[i].needed_level_id.id;
            typeVisible[i] = true;
            unlockedOnGameWon[i] = json[i].unlocked_on_game_won;
        }

        checkVisibleModels();
    },

    /* 
        Sets the disabled level ids from a list.
    */
    setDisabledLevels = function(levelList){
        var i = 0;
        for(var key in levelList){
            disabledLevelIds[i] = levelList[key];
            i++;
        }
        checkVisibleModels();
    },

    /* 
        check which companion types are visible with the known disabled levels
    */
    checkVisibleModels = function(){
        //neededlevel id should have the same position as the type itself and typeVisible
        for(var i = 0; i < neededLevelIds.length; i++){
            typeVisible[i] = checkIfVisible(neededLevelIds[i]);
        }
    },

    /* 
        Checks if for the given level id is still disabled or not.
    */
    checkIfVisible = function(neededLevelId){
        for(var i = 0; i < disabledLevelIds.length; i++){

            // is in a disabled level, so it is not visible
            if(neededLevelId == disabledLevelIds[i]){
                return false;
            }
        }

        return true;
    },

    /* 
        Checks if the given level unlocks a companion type
    */
    checkIfLevelUnlocksFoxType = function(levelId){
        for(var i = 0; i < neededLevelIds.length; i++){
            if(levelId == neededLevelIds[i] && !typeVisible[i]){
                return types[i];
            }
        }
        return null;
    },

    /* 
        Sets if the game was won or not.
    */
    setGameWon = function(isGameWon){
        gameWon = isGameWon;
        for(var i = 0; i < types.length; i++){
            if(unlockedOnGameWon[i]){
                typeVisible[i] = gameWon;
            }
        }
    };

    that.init = init;
    that.getNext = getNext;
    that.getPrev = getPrev;
    that.createFromJson = createFromJson;
    that.setDisabledLevels = setDisabledLevels;
    that.checkIfLevelUnlocksFoxType = checkIfLevelUnlocksFoxType;
    that.setGameWon = setGameWon;

    return that;
})();