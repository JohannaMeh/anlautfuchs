/* 
    An object responsible for the logout and "berries eaten view".
    It tells the user how much berries his companion has already consumed.
*/
Game.BerriesEatenView = (function(){
    var that = {},

    /* 
        Initialises the object.
        Sets an click listener for the logout button and for the tape recorder
    */
    init = function() {

        $('#confirm-logout').on("click", logout);

        $('.berries-eaten-container .tape-recorder').on('click', onTapeRecorderClicked);

        return that;
    };
    
    /* 
        Hides the view, so the elements won't be visible
    */
    hideView = function(){
        // hide view container
        $('.berries-eaten-container').hide();
    },

    /* 
        Shows the view so that all elements will be visible.
        Also sets an timeout so that the user will be automatically logged out after 60 seconds.
    */
    showView = function(){
        // show view container
        $('.berries-eaten-container').show();
        $('#header-text').text('Deine Übersicht');
        $('#back-button').hide();
        $('#logout-button').hide();
        setTimeout(60000, logout);
    },

    /* 
        Triggers the logout event
    */
    logout = function(){
        $(that).trigger('logout');
    },

    /* 
        Triggers the tapeRecorderClicked event
    */
    onTapeRecorderClicked = function(){
        $(that).trigger('tapeRecorderClicked');
    },

    /* 
        Sets the berries eaten element
    */
    setNumberOfBerries = function(berries){
        if(berries == 1){
            $('#number-of-berries').text('1 Traube');
        }else{
            $('#number-of-berries').text(berries + ' Trauben');
        }
    },

    /* 
        Sets the thought bubble to the coressponding state
    */
    showThoughtBubble = function(state){
        switch(state){
            case 'correct':
            case 'happy':
            case 'hungry':
            case 'incorrect':
                $('.berries-eaten-container .thought-bubble').addClass(state);
                $('.berries-eaten-container .thought-bubble').css('visibility', 'visible');
                //setTimeout(hideThoughtBubble, 1700);
        }
    },

    /* 
        Hides the thought bubble.
    */
    hideThoughtBubble = function(){
        $('.berries-eaten-container .thought-bubble').removeClass('correct');
        $('.berries-eaten-container .thought-bubble').removeClass('incorrect');
        $('.berries-eaten-container .thought-bubble').removeClass('happy');
        $('.berries-eaten-container .thought-bubble').removeClass('hungy');
        $('.berries-eaten-container .thought-bubble').css('visibility', 'hidden');
    };

    that.init = init;

    that.hideView = hideView;
    that.showView = showView;

    that.setNumberOfBerries = setNumberOfBerries;

    that.showThoughtBubble = showThoughtBubble;

    return that;
})();