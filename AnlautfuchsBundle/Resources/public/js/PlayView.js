Game.PlayView = (function(){
    var that = {},
    basisUrl = '/bundles/anlautfuchs/',
    gameStarted = false,

    showImage = null,

    currSelectedLevel = null,

    useVisibility = false,
    heightTreshold = 720,

    init = function() {

        $('#start-button').on('click', onStartButtonClicked);

        $('.character-box').on('click', selectCharacter);

        $('#sound-button').on('click', onSoundButtonClicked);

        $('.play-view-container .tape-recorder').on('click', onTapeRecorderClicked);

        $('.mini-level-selection > ul li').on("click", levelSelectionChange);

        $('#mini-level-select-button').on("click", selectLevel);

        checkUseVisibility();

        return that;
    },

    checkUseVisibility = function(){
        if($(window).height() < heightTreshold){
            useVisibility = false;
        }else{
            useVisibility = true;
        }

        console.log("useVisibility: ", useVisibility);
        console.log("window height: ", $(window).height());
    },

    hideView = function(){
        // hide view container
        $('.play-view-container').hide();
    },

    showView = function(){
        // show view container
        $('.play-view-container').show();
        resizeCharacterBoxes();
        $('#header-text').text('Übung');
    },

    resizeCharacterBoxes = function(){
        var countBoxes = $('#wordrow-one .character-box').length;

        var rowWidth = $('#wordrow-one .character-ruler-row').width();

        var boxSize = (rowWidth / countBoxes) - 20;

        $('.character-box').width(boxSize);
    },

    selectCharacter = function(event){
        if(gameStarted){
            var character = $(this).attr('character');
            $(that).trigger("onCharClicked", [character]);
        }
    },

    markCharacterAsCorrect = function(character){
        console.log('correct', character);
        console.log('correct jquery', $('div[character="'+character+'"]'));
        $('div[character="'+character+'"]').addClass('correct');
        setTimeout(removeCharacterMarks, 1500);
    },

    markCharacterAsIncorrect = function(character){
        console.log('incorrect', character);
        console.log('incorrect jquery', $('div[character="'+character+'"]'));
        $('div[character="'+character+'"]').addClass('incorrect');
    },

    removeCharacterMarks = function(){
        $('.character-box.correct').removeClass('correct');
        $('.character-box.incorrect').removeClass('incorrect');
    },

    setWordImage = function(image){
        console.log('set current word', image);
        //set image
        if(!$('#word-image').hasClass('real-image')){
            $('#word-image').addClass('real-image');            
        }

        $('#word-image').css('background-image', "url("+basisUrl+image+")");

        //set sound

    },

    prepareLevel = function(showSecondRow, newShowImage){
        $('.game-controls').css('visibility', 'hidden');
        $('#word-image').css('visibility','hidden');
        

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

        gameStarted = false;
    },

    onSoundButtonClicked = function(event){
        if(gameStarted){
            $(that).trigger('onWordSoundButtonClicked');
        }
    },

    onTapeRecorderClicked = function(event){
        $(that).trigger('tapeRecorderClicked');
    },

    onStartButtonClicked = function(event){
        $('.game-controls').css('visibility', 'visible');

        if(useVisibility){
            $('#start-button').css('visibility', 'hidden');
        }else{
            $('#start-button').hide();
        }

        if(showImage){
            $('#word-image').css('visibility','visible');
        }

        gameStarted = true;
        $(that).trigger('startButtonClicked');
    },

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

    hideThoughtBubble = function(){
        $('.play-view-container .thought-bubble').removeClass('correct');
        $('.play-view-container .thought-bubble').removeClass('incorrect');
        $('.play-view-container .thought-bubble').removeClass('happy');
        $('.play-view-container .thought-bubble').removeClass('hungry');
        $('.play-view-container .thought-bubble').css('visibility', 'hidden');
    },

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

    selectLevel = function(event){
        if($(this).hasClass('disabled')){
            return;
        }

        if(currSelectedLevel){
            $(that).trigger("levelSelected", [currSelectedLevel]);
        }
    },

    disableLevels = function(levelList) {
        console.log('disable Levels', levelList);
        $('.mini-level-selection li').removeClass('disabled');
        for(var key in levelList){
            var levelId = levelList[key];
            $('.mini-level-selection li[level-id="' + levelId +'"]').addClass('disabled');
        }
    },

    markCurrentLevel = function(levelId, parentId){
        console.log('parentId', levelId, parentId);
        $(".mini-level-selection li.selected").removeClass('selected');
        $('li[level-id="'+levelId+'"]').addClass('selected');

        if(parentId != undefined){
            $('li[level-id="'+parentId+'"]').addClass('selected');
            $('li[level-id="'+parentId+'"]').next().show();
        }
    },

    setBerriesEaten = function(berriesEaten){
        var berriesEatenText = 'x' + berriesEaten;
        $('#berries-eaten-sign > span').text(berriesEatenText);
    },


    showFoxUnlockedPopup = function(foxType){
        console.log("Yaaaay unlocked: ", foxType);
    },


    showLevelFinishedPopup = function(){
        console.log("Yaaaay level finished :)");
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

    return that;
})();