Game.CompanionModel = (function(){
    var that = {},
    types = [],

    init = function() {
         types = [];
        return that;
    },

    getNext = function(type){
        var position = types.indexOf(type);
        if(position != -1){
            if(position < (types.length -1)){
                return types[position + 1];
            }else{
                return types[0];
            }
        }

        return types[0];
    },

    getPrev = function(type){
        var position = types.indexOf(type);
        if(position != -1){
            if(position > 0){
                return types[position - 1];
            }else{
                return types[types.length - 1];
            }
        }

        return types[0];
    },

    createFromJson = function(json){
        for(var i = 0; i < json.length; i++){
            types[i] = json[i].type;
        }
    };

    that.init = init;
    that.getNext = getNext;
    that.getPrev = getPrev;
    that.createFromJson = createFromJson;

    return that;
})();