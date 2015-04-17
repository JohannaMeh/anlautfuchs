Game.LevelSelectionView = (function(){
    var that = {},

    /* Variables */
    currSelectedLevel = null,

    init = function() {

        $('.level-selection > ul li').on("click", levelSelectionChange);
        $('#level-select-button').on("click", selectLevel);

        $('.level-selection-container .tape-recorder').on('click', onTapeRecorderClicked);
        
        return that;
    },
    
        
    hideView = function(){
        // hide view container
        $('.level-selection-container').hide();
        $('#back-button').show();
    },

    showView = function(){
        // show view container
        $('.level-selection-container').show();
        $('#header-text').text('Wähle deine Übung');
        $('#back-button').hide();
    },

    levelSelectionChange = function(event){


        // remove other selected
        if($(this).parents().hasClass('sub-level')){
            // check if level is disabled
            if($(this).hasClass('disabled')){
                $(this).parents().find('.level-selection .sub-level > li').removeClass('selected');
                $('#level-select-button').addClass('disabled');
                currSelectedLevel = undefined;
                return;
            }

            // this is a sublevel
            $(".level-selection .sub-level li.selected").removeClass('selected');
            $(this).addClass("selected");
            currSelectedLevel = $(this).attr('level-id');
            $('#level-select-button').removeClass('disabled');
        }else{
            if($(this).hasClass('disabled')){
                $('.level-selection ul.sub-level').hide();
                $('.level-selection li.selected').removeClass('selected');
                $('#level-select-button').addClass('disabled');
                currSelectedLevel = undefined;
                return;
            }

            $('.level-selection li.selected').removeClass('selected');
            $('.level-selection ul.sub-level').hide();

            $(this).addClass("selected");

            //show sublevel
            if($(this).next().hasClass('sub-level')){
                $(this).next().show();
                //disable button
                $('#level-select-button').addClass('disabled');
            }else{
                currSelectedLevel = $(this).attr('level-id');
                $('#level-select-button').removeClass('disabled');
            }
        }
    },

    selectLevel = function(event){
        if($(this).hasClass('disabled')){
            return;
        }

        if(currSelectedLevel){
            $(that).trigger("levelSelected", [currSelectedLevel]);
        }
    },

    disableLevels = function(levelList) {
        $('.level-selection li').removeClass('disabled');
        for(var key in levelList){
            var levelId = levelList[key];
            $('.level-selection li[level-id="' + levelId +'"]').addClass('disabled');
        }
    },

    onTapeRecorderClicked = function(event){
        $(that).trigger('tapeRecorderClicked');
    };

    that.init = init;

    that.hideView = hideView;
    that.showView = showView;

    that.disableLevels = disableLevels;

    return that;
})();