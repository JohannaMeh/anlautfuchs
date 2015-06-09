/* 
    An object responsible for the companion selection.
    It displays an option to change the user companion.
*/
Game.CompanionSelectionView = (function(){
    var that = {},

    /* 
        Initialises the object and sets multiple click listener.
    */
    init = function() {

        $('#select-companion').on("click", selectCompanion);

        $('#prev-companion').on("click", prevCompanion);

        $('#next-companion').on("click", nextCompanion);

        $('.companion-selection-container .tape-recorder').on('click', onTapeRecorderClicked);

        return that;
    };
    
    /* 
        Hides the view, so the elements won't be visible
    */
    hideView = function(){
        // hide view container
        $('.companion-selection-container').hide();
    },

    /* 
        Shows the view so that all elements will be visible.
    */
    showView = function(){
        // show view container
        $('.companion-selection-container').show();
        $('#header-text').text('Wähle dein Aussehen');
    },

    /* 
        Triggers the next companion event
    */
    nextCompanion = function(){
        $(that).trigger("nextCompanion");
    },

    /* 
        Triggers the previous companion event
    */
    prevCompanion = function(){
        $(that).trigger("prevCompanion");
    },

    /* 
        Triggers the companion selected event
    */
    selectCompanion = function(event){
        $(that).trigger("companionSelected");
    },

    /* 
        Triggers the tape recorder clicked event
    */
    onTapeRecorderClicked = function(event){
        $(that).trigger('tapeRecorderClicked');
    };

    that.init = init;

    that.hideView = hideView;
    that.showView = showView;

    return that;
})();