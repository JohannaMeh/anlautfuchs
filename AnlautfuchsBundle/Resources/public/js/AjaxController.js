Game.AjaxController = (function(){
    var that = {},


    init = function() {


        return that;
    },


    loadLevel = function(levelId){
        $.ajax({
                type: "GET",
                url: 'backend/level/'+levelId,
                dataType: 'json',
                data: {
                },
                success: function(data){
                    var levelModel = new Game.LevelModel();
                    levelModel.createFromJson(data);
                    $(that).trigger("levelLoaded", [levelModel]);
                },
                error: function(data){
                    console.log('error');
                    console.log(data);
                    if(data.status == 200){
                        //data.responseText
                    }
                }
            });
    },

    loadDisabledLevels = function(){
        $.ajax({
                type: "GET",
                url: 'backend/user/disabled/levels',
                dataType: 'json',
                data: {
                },
                success: function(data){
                    $(that).trigger('disabledLevelsLoaded', [data]);
                },
                error: function(data){
                    console.log('error');
                    console.log(data);
                    if(data.status == 200){
                        //data.responseText
                    }
                }
            });
    },

    loadUser = function(){
        $.ajax({
                type: "GET",
                url: 'backend/user/',
                dataType: 'json',
                data: {
                },
                success: function(data){
                    var userModel = Game.UserModel.init();
                    userModel.createFromJson(data);
                    $(that).trigger("userLoaded", [userModel]);
                },
                error: function(data){
                    console.log('error');
                    console.log(data);
                    if(data.status == 200){
                        //data.responseText
                    }
                }
            });
    },

    loadCompanions = function(){
        $.ajax({
                type: "GET",
                url: 'backend/companion/',
                dataType: 'json',
                data: {
                },
                success: function(data){
                    var companionModel = Game.CompanionModel.init();
                    companionModel.createFromJson(data);
                    $(that).trigger("companionsLoaded", [companionModel]);
                },
                error: function(data){
                    console.log('error');
                    console.log(data);
                    if(data.status == 200){
                        //data.responseText
                    }
                }
            });
    },


    saveUserLevel = function(levelid){
        $.ajax({
            type: "GET",
            url: 'backend/user/save/level/'+levelid,
            dataType: 'json',
            data: {
            },
            success: function(data){
                console.log('user level sucessfully saved');
                $(that).trigger('disabledLevelsLoaded', [data]);
            },
            error: function(data){
                console.log('error');
                console.log(data);
                if(data.status == 200){
                    //data.responseText
                }
            }
        });
    },

    saveUserCompanion = function(type){
        $.ajax({
            type: "GET",
            url: 'backend/user/save/companion/'+type,
            dataType: 'json',
            data: {
            },
            success: function(data){
                console.log('user companion sucessfully saved');
            },
            error: function(data){
                console.log('error');
                console.log(data);
                if(data.status == 200){
                    //data.responseText
                }
            }
        });
    },

    saveUserBerriesEaten = function(berriesEaten){
        $.ajax({
            type: "GET",
            url: 'backend/user/save/berries/eaten/'+berriesEaten,
            dataType: 'json',
            data: {
            },
            success: function(data){
                console.log('user berries eaten sucessfully saved');
            },
            error: function(data){
                console.log('error');
                console.log(data);
                if(data.status == 200){
                    //data.responseText
                }
            }
        });
    };

    that.init = init;
    that.loadLevel = loadLevel;
    that.loadDisabledLevels = loadDisabledLevels;
    that.loadUser = loadUser;
    that.loadCompanions = loadCompanions;
    that.saveUserCompanion = saveUserCompanion;
    that.saveUserLevel = saveUserLevel;
    that.saveUserBerriesEaten = saveUserBerriesEaten;
    

    return that;
})();