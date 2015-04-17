Game.BerriesEatenView = (function(){
    var that = {},

    init = function() {

        $('#confirm-logout').on("click", logout);

        $('.berries-eaten-container .tape-recorder').on('click', onTapeRecorderClicked);

        return that;
    };
    
    hideView = function(){
        // hide view container
        $('.berries-eaten-container').hide();
    },

    showView = function(){
        // show view container
        $('.berries-eaten-container').show();
        $('#header-text').text('Deine Übersicht');
        $('#back-button').hide();
        $('#logout-button').hide();
        setTimeout(60000, logout);
    },

    logout = function(){
        $(that).trigger('logout');
    },

    onTapeRecorderClicked = function(){
        $(that).trigger('tapeRecorderClicked');
    },

    setNumberOfBerries = function(berries){
        if(berries == 1){
            $('#number-of-berries').text('1 Traube');
        }else{
            $('#number-of-berries').text(berries + ' Trauben');
        }
    },

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