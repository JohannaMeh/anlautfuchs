/* 
    An object used for retrieving information with ajax from the backend.
*/

Game.AjaxController = (function(){
    var that = {},


    /* 
        Initialises the object 
    */
    init = function() {


        return that;
    },


    /* 
        Loads the level data for the given level ID.
        After an successful load a levelLoaded event will be triggered

    */
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

    /* 
        Loads the disabled levels for the given user. The backend knows which user is using this browser session.
        After an successful load a disabledLevelsLoaded event will be triggered

    */
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

    /* 
        Loads the user data for the given user. The backend knows which user is using this browser session.
        After an successful load a userLoaded event will be triggered

    */
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

    /* 
        Loads all currently available companions from the backend.
        After an successful load a companionsLoaded event will be triggered

    */
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


    /* 
        Sents the level ID of the finished level to the backend to be saved. The backend will check if the level was already finished or not.
        After an successful load a disabledLevelsLoaded event will be triggered. Because the AJAX call return the needed data to refresh the levels.

    */
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

    /* 
        Saves the selected user companion, so that it will be used in future user sessions.
    */
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

    /* 
        Saves the amount of berriesEaten for the current user.
    */
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