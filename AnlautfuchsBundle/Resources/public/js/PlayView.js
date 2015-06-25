/* 
    The PlayView which is the "real" game view for the program.
*/
Game.PlayView = (function(){
    var that = {},
    basisUrl = '/bundles/anlautfuchs/',
    gameStarted = false,

    showImage = null,
    wordSound = null,

    currSelectedLevel = null,

    currentImage = null,

    useVisibility = false,
    heightTreshold = 800,

    /* 
        Initializes the object. Sets some listeners and prepares the view.
    */
    init = function() {

        $('#start-button').on('click', onStartButtonClicked);

        $('.character-box').on('click', selectCharacter);

        $('#sound-button').on('click', onSoundButtonClicked);

        $('.play-view-container .tape-recorder').on('click', onTapeRecorderClicked);

        $('.mini-level-selection > ul li').on("click", levelSelectionChange);

        $('#mini-level-select-button').on("click", selectLevel);

        $("#word-image").on('click', onWordImageClicked);

        checkUseVisibility();

        $("#berry").addClass('default');

        return that;
    },

    /* 
        Checks the height of the browser window, so that it can change some mechanism depending on it.
    */
    checkUseVisibility = function(){
        if($(window).height() < heightTreshold){
            useVisibility = false;
        }else{
            useVisibility = true;
        }
    },

    /* 
        Hides the view container
    */
    hideView = function(){
        // hide view container
        $('.play-view-container').hide();
    },

    /* 
        Shows the view container
    */
    showView = function(){
        // show view container
        $('.play-view-container').show();
        resizeCharacterBoxes();
        $('#header-text').text('Übung');
        resetView();
    },

    /* 
        Resets the view to certain defaults. 
    */
    resetView = function(){
        if(useVisibility){
            $('.game-controls').css('visibility', 'hidden');
        }else{
            $('.game-controls').hide();
        }
        
        $('#word-image').css('visibility','hidden');
        $('#sound-button').css('visibility','hidden');
        

        if(useVisibility){
            $('#start-button').css('visibility', 'visible');
        }else{
            $('#start-button').show();
        }

        gameStarted = false;
    },

    /* 
        Resizes te character boxes to fit the current screen and to be as big as possible.
    */
    resizeCharacterBoxes = function(){
        var countBoxes = $('#wordrow-one .character-box').length;

        var rowWidth = $('#wordrow-one .character-ruler-row').width();

        var boxSize = (rowWidth / countBoxes) - 20;

        $('.character-box').width(boxSize);
    },

    /* 
        Callback for click on an character. If the games was started the char informations will be sent to the game controller.
    */
    selectCharacter = function(event){
        if(gameStarted){
            var character = $(this).attr('character');
            $(that).trigger("onCharClicked", [character]);
        }
    },

    /* 
        Mark given character as correct.
    */
    markCharacterAsCorrect = function(character){
        $('div[character="'+character+'"]').addClass('correct');
        setTimeout(removeCharacterMarks, 1500);
    },

    /* 
       Mark given character as incorrect
    */
    markCharacterAsIncorrect = function(character){
        $('div[character="'+character+'"]').addClass('incorrect');
    },

    /* 
        Removes all marks, correct and incorrects.
    */
    removeCharacterMarks = function(){
        $('.character-box.correct').removeClass('correct');
        $('.character-box.incorrect').removeClass('incorrect');
    },

    /* 
        Sets the image for the current word. Depends on the setting if the image is optional or not.
    */
    setWordImage = function(image, imageOptional){

        currentImage = image;

        if(!imageOptional){
            //set image
            if(!$('#word-image').hasClass('real-image')){
                $('#word-image').addClass('real-image');            
            }

            $('#word-image').css('background-image', "url("+basisUrl+image+")");
        }else{
            $('#word-image').removeClass('real-image');
            $('#word-image').css('background-image', "url("+basisUrl+"data/img/UI/ui_elements_2.png)");
        }
    },

    /* 
        Prepares the playview for the current level.
    */
    prepareLevel = function(showSecondRow, newShowImage, newWordSound){
        if(useVisibility){
            $('.game-controls').css('visibility', 'hidden');
        }else{
            $('.game-controls').hide();
        }

        $('#word-image').css('visibility','hidden');
        $('#sound-button').css('visibility','hidden');
        

        if(useVisibility){
            $('#start-button').css('visibility', 'visible');
        }else{
            $('#start-button').show();
        }

        if(showSecondRow){
            $('#wordrow-two').css('visibility','visible');
        }else{
            $('#wordrow-two').css('visibility','hidden');
        }


        showImage = newShowImage;
        wordSound = newWordSound;

        gameStarted = false;
    },

    /* 
        Forwards the event that the sound should be played.
    */
    onSoundButtonClicked = function(event){
        if(gameStarted){
            $(that).trigger('onWordSoundButtonClicked');
        }
    },

    /* 
        Shows the real image if the image is optional.
    */
    onWordImageClicked = function(event){
        if(!$('#word-image').hasClass('real-image')){
            $('#word-image').addClass('real-image');
            $('#word-image').css('background-image', "url("+basisUrl+currentImage+")");  
        }
    },

    /* 
        Forwards the event that the explanation sound should be played/ stopped.
    */
    onTapeRecorderClicked = function(event){
        $(that).trigger('tapeRecorderClicked');
    },

    /* 
        Starts the game.
    */
    onStartButtonClicked = function(event){
        

        if(useVisibility){
            $('.game-controls').css('visibility', 'visible');
            $('#start-button').css('visibility', 'hidden');
        }else{
            $('.game-controls').show();
            $('#start-button').hide();
        }

        if(showImage){
            $('#word-image').css('visibility','visible');
        }

        if(wordSound){
            $('#sound-button').css('visibility','visible');
        }

        gameStarted = true;
        $(that).trigger('startButtonClicked');
    },

    /* 
        Shows the thought bubble of the companion.
    */
    showThoughtBubble = function(state){
        switch(state){
            case 'correct':
            case 'happy':
            case 'hungry':
            case 'incorrect':
                $('.play-view-container .thought-bubble').addClass(state);
                $('.play-view-container .thought-bubble').css('visibility', 'visible');
                setTimeout(hideThoughtBubble, 1700);
        }
    },

    /* 
        Hides the companion thought bubble.
    */
    hideThoughtBubble = function(){
        $('.play-view-container .thought-bubble').removeClass('correct');
        $('.play-view-container .thought-bubble').removeClass('incorrect');
        $('.play-view-container .thought-bubble').removeClass('happy');
        $('.play-view-container .thought-bubble').removeClass('hungry');
        $('.play-view-container .thought-bubble').css('visibility', 'hidden');
    },

    /* 
        Checks if the level selection can be changed and checks if sublevels must be hidden or shown.
    */
    levelSelectionChange = function(event){
        // remove other selected
        if($(this).parents().hasClass('sub-level')){
            if($(this).hasClass('disabled')){
                $(this).parents().find('.mini-level-selection .sub-level > li').removeClass('selected');
                $('#mini-level-select-button').addClass('disabled');
                currSelectedLevel = undefined;
                return;
            }

            // this is a sublevel
            $(".mini-level-selection .sub-level li.selected").removeClass('selected');
            $(this).addClass("selected");
            currSelectedLevel = $(this).attr('level-id');
            $('#mini-level-select-button').removeClass('disabled');
        }else{
            if($(this).hasClass('disabled')){
                $('.mini-level-selection ul.sub-level').hide();
                $('.mini-level-selection li.selected').removeClass('selected');
                $('#mini-level-select-button').addClass('disabled');
                currSelectedLevel = undefined;
                return;
            }

            $('.mini-level-selection li.selected').removeClass('selected');
            $('.mini-level-selection ul.sub-level').hide();

            $(this).addClass("selected");

            //show sublevel
            if($(this).next().hasClass('sub-level')){
                $(this).next().show();
                //disable button
                $('#mini-level-select-button').addClass('disabled');
            }else{
                currSelectedLevel = $(this).attr('level-id');
                $('#mini-level-select-button').removeClass('disabled');
            }
        }
    },

    /* 
        Selects the level and tells it to the game controller per event.
    */
    selectLevel = function(event){
        if($(this).hasClass('disabled')){
            return;
        }

        if(currSelectedLevel){
            $(that).trigger("levelSelected", [currSelectedLevel]);
        }
    },

    /* 
        Disables the levels on the level list.
    */
    disableLevels = function(levelList) {
        $('.mini-level-selection li').removeClass('disabled');
        for(var key in levelList){
            var levelId = levelList[key];
            $('.mini-level-selection li[level-id="' + levelId +'"]').addClass('disabled');
        }
    },

    /* 
        Marks the current level.
    */
    markCurrentLevel = function(levelId, parentId){
        $(".mini-level-selection li.selected").removeClass('selected');
        $('li[level-id="'+levelId+'"]').addClass('selected');

        if(parentId != undefined){
            $('li[level-id="'+parentId+'"]').addClass('selected');
            $('li[level-id="'+parentId+'"]').next().show();
        }
    },

    /* 
        Sets the number of berries eaten.
    */
    setBerriesEaten = function(berriesEaten){
        var berriesEatenText = 'x' + berriesEaten;
        $('#berries-eaten-sign > span').text(berriesEatenText);
    },


    /* 
        Show popup that an companion type was unlocked.
    */
    showFoxUnlockedPopup = function(foxType){

        //remove all classes
        $("#unlocked-type").removeClass();

        $("#unlocked-type").addClass("type-"+foxType);

        //show the normal popup first
        showLevelFinishedPopup();

        //after 3500 seconds show new skin
        setTimeout(function(){
            $("#level-finished-popup").fadeOut();
            $("#type-unlocked-popup").fadeIn();
            setTimeout(function(){
                $("#type-unlocked-popup").fadeOut();
            }, 4500);
        }, 3800);
    },

    /* 
        Shows popup that a level was finished.
    */
    showLevelFinishedPopup = function(hideAfterTimeout){
        if(hideAfterTimeout == undefined){
            hideAfterTimeout = true;
        }

        $("#level-finished-popup").fadeIn();

        if(hideAfterTimeout){
            setTimeout(function(){
                $("#level-finished-popup").fadeOut();
            }, 4500);
        }
    },

    /* 
        Hides all popups.
    */
    hidePopups = function(){
        $("#type-unlocked-popup").fadeOut();
        $("#level-finished-popup").fadeOut();
    };

    that.init = init;

    that.hideView = hideView;
    that.showView = showView;
    that.markCharacterAsIncorrect = markCharacterAsIncorrect;
    that.markCharacterAsCorrect = markCharacterAsCorrect;
    that.prepareLevel = prepareLevel;
    that.setWordImage = setWordImage;
    that.showThoughtBubble = showThoughtBubble;

    that.disableLevels = disableLevels;
    that.markCurrentLevel = markCurrentLevel;

    that.setBerriesEaten = setBerriesEaten;

    that.showFoxUnlockedPopup = showFoxUnlockedPopup;

    that.showLevelFinishedPopup = showLevelFinishedPopup;

    that.hidePopups = hidePopups;

    return that;
})();