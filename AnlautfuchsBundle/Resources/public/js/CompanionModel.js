Game.CompanionModel = (function(){
    var that = {},
    types = [],
    neededLevelIds = [],
    typeVisible = [],
    disabledLevelIds = [],

    init = function() {
        types = [];
        typeVisible = [];
        neededLevelIds = [];
        return that;
    },

    getNext = function(type){
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

    getPrev = function(type){
        var position = types.indexOf(type);
        if(position != -1){
            var nextPos = types[types.length - 1];

            if(position > 0){
                nextPos = position - 1;
            }

            while(!typeVisible[nextPos]){
                if(nextPos > 0){
                    nextPos--;
                }else{
                    nextPos = types[types.length - 1];
                }
            }
            
            return types[nextPos];
        }

        return types[0];
    },

    createFromJson = function(json){
        for(var i = 0; i < json.length; i++){
            types[i] = json[i].type;
            neededLevelIds[i] = json[i].needed_level_id.id;
            typeVisible[i] = true;
        }

        checkVisibleModels();
    },

    setDisabledLevels = function(levelList){
        var i = 0;
        for(var key in levelList){
            disabledLevelIds[i] = levelList[key];
            i++;
        }
        checkVisibleModels();
    },

    checkVisibleModels = function(){
        //neededlevel id should have the same position as the type itself and typeVisible
        for(var i = 0; i < neededLevelIds.length; i++){
            typeVisible[i] = checkIfVisible(neededLevelIds[i]);
        }
    },

    checkIfVisible = function(neededLevelId){
        for(var i = 0; i < disabledLevelIds.length; i++){

            // is in a disabled level, so it is not visible
            if(neededLevelId == disabledLevelIds[i]){
                return false;
            }
        }

        return true;
    },

    checkIfLevelUnlocksFoxType = function(levelId){
        for(var i = 0; i < neededLevelIds.length; i++){
            if(levelId == neededLevelIds[i]){
                return types[i];
            }
        }
        return null;
    };

    that.init = init;
    that.getNext = getNext;
    that.getPrev = getPrev;
    that.createFromJson = createFromJson;
    that.setDisabledLevels = setDisabledLevels;
    that.checkIfLevelUnlocksFoxType = checkIfLevelUnlocksFoxType;

    return that;
})();