Game.CompanionSelectionView = (function(){
    var that = {},

    init = function() {

        $('#select-companion').on("click", selectCompanion);

        $('#prev-companion').on("click", prevCompanion);

        $('#next-companion').on("click", nextCompanion);

        $('.companion-selection-container .tape-recorder').on('click', onTapeRecorderClicked);

        return that;
    };
    
    hideView = function(){
        // hide view container
        $('.companion-selection-container').hide();
    },

    showView = function(){
        // show view container
        $('.companion-selection-container').show();
        $('#header-text').text('Wähle dein Aussehen');
    },

    nextCompanion = function(){
        $(that).trigger("nextCompanion");
    },

    prevCompanion = function(){
        $(that).trigger("prevCompanion");
    },

    selectCompanion = function(event){
        $(that).trigger("companionSelected");
    },

    onTapeRecorderClicked = function(event){
        $(that).trigger('tapeRecorderClicked');
    };

    that.init = init;

    that.hideView = hideView;
    that.showView = showView;

    return that;
})();