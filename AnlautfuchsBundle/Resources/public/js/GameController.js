Game.GameController = (function(){
    var that = {},

    /* Models */
    levelModel = null,
    userModel = null,
    companionModel = null,

    /* Views */
    levelSelectionView = null,
    companionSelectionView = null,
    playView = null,
    berriesEatenView = null,

    /* Controllers */
    ajaxController = null,

    /* Managers */
    soundManager = null,
    animationManager = null,

    /* Variables */
    currentView = 'level',
    levelFinished = false,
    playViewLevelChange = false,

    init = function() {
        ajaxController = Game.AjaxController.init();

        loadDisabledLevels();        
        loadUserModel();
        loadCompanionModel();

        /* init models */
        levelSelectionView = Game.LevelSelectionView.init();
        $(levelSelectionView).on("levelSelected", onLevelSelected);
        $(levelSelectionView).on("tapeRecorderClicked", onTapeRecorderClicked);

        companionSelectionView = Game.CompanionSelectionView.init();
        $(companionSelectionView).on("companionSelected", onCompanionSelected);
        $(companionSelectionView).on("tapeRecorderClicked", onTapeRecorderClicked);
        $(companionSelectionView).on('nextCompanion', onNextCompanion);
        $(companionSelectionView).on('prevCompanion', onPrevCompanion);


        playView = Game.PlayView.init();
        $(playView).on("onCharClicked",onCharClicked);
        $(playView).on("onWordSoundButtonClicked",onWordSoundButtonClicked);
        $(playView).on("tapeRecorderClicked", onTapeRecorderClicked);
        $(playView).on('startButtonClicked', onStartButtonClicked);

        $(playView).on('levelSelected', onPlayViewLevelSelected);


        berriesEatenView = Game.BerriesEatenView.init();

        $(berriesEatenView).on("tapeRecorderClicked", onTapeRecorderClicked);
        $(berriesEatenView).on("logout", onRealLogout);


        $(ajaxController).on("levelLoaded", onLevelLoaded);
        $(ajaxController).on("userLoaded", onUserLoaded);
        $(ajaxController).on("companionsLoaded", onCompanionsLoaded);
        $(ajaxController).on('disabledLevelsLoaded', onDisabledLevelsLoaded);


        $('#back-button').on("click", onBackButtonClicked);

        $('#logout-button').on("click", onLogoutButtonClicked);

        soundManager = Game.SoundManager.init();

        $(soundManager).on('soundEnded', onSoundEnded);
        $(soundManager).on('soundStarted', onSoundStart);

        animationManager = Game.AnimationManager.init();

        $(document).ready(function(){
            animationManager.stopAnimations();
            switchViewState('level');
        });

        return that;
    },

    loadLevelModel = function(levelId){
        // load select model data
        ajaxController.loadLevel(levelId);
    },

    loadCompanionModel = function(){
        //load available companions
        ajaxController.loadCompanions();
    },

    loadUserModel = function(){
        //load user data
        ajaxController.loadUser();
    },

    loadDisabledLevels = function(){
        ajaxController.loadDisabledLevels();
    },

    onLevelSelected = function(event, levelId){
        //check current user level
        var usingUserLevel = false;
        if(userModel){
            var userLevel = userModel.getCurrentLevel();

            if(userLevel.getId() == levelId){
                usingUserLevel = true;
                onLevelLoaded(event, userLevel);
            }
        }

        if(!usingUserLevel){
            loadLevelModel(levelId);
        }

        switchViewState('companion');
    },

    onPlayViewLevelSelected = function(event, levelId){
        soundManager.stopAllSounds();
        loadLevelModel(levelId);
        playViewLevelChange = true;
    },

    onLevelLoaded = function(event, level){
        levelModel = level;
        setLevelData(level);

        if(playViewLevelChange){
            playViewLevelChange = false;
            startNextLevel();
        }
    },

    onDisabledLevelsLoaded = function(event, json){
        levelSelectionView.disableLevels(json);
        playView.disableLevels(json);
    },

    setLevelData = function(level){
        // mark current level
        playView.markCurrentLevel(level.getId(), level.getParentId());

        // set view data
        playView.prepareLevel(level.showSecondRow(), level.showImage());
        playView.setWordImage(level.getCurrentWord().getImage());


        //set sound data
        soundManager.setLevelSound(level.getExplanationSound());
        soundManager.setWordSound(level.getCurrentWord().getSound());
    },

    onUserLoaded = function(event, user){
        userModel = user;

        animationManager.setCompanionType(userModel.getCompanion());
    },

    onNextCompanion = function(event){
        var current = userModel.getCompanion();
        var next = companionModel.getNext(current);
        animationManager.setCompanionType(next);
        userModel.setCompanion(next);
    },

    onPrevCompanion = function(event){
        var current = userModel.getCompanion();
        var prev = companionModel.getPrev(current);
        animationManager.setCompanionType(prev);
        userModel.setCompanion(prev);
    },

    onCompanionSelected = function(event){
        //set companion per ajax in database?
        ajaxController.saveUserCompanion(userModel.getCompanion());

        switchViewState('play');
    },

    onCompanionsLoaded = function(event, companions){
        companionModel = companions;
    },

    onCharClicked = function(event, character){
        console.log("character selected", character);
        var success = levelModel.checkCharacter(character);

        if(success){
            // mark character green
            playView.markCharacterAsCorrect(character);
            //soundManager.playSucessSound();

            animationManager.setCompanionFeeling('happy');
            playView.showThoughtBubble('correct');
            if(levelModel.wasFirstGuess()){
                //move berry
                animationManager.moveBerry();
                // add character to right characters list

                // check if game finished
                var finished = levelModel.isLevelFinished();
                if(finished){
                    // show nomnom screen, play finish sound
                    soundManager.toggleFinishLevelSound();

                    userModel.setBerriesEaten(userModel.getBerriesEaten() + 1);
                    playView.setBerriesEaten(userModel.getBerriesEaten());
                    ajaxController.saveUserBerriesEaten(userModel.getBerriesEaten());
                    ajaxController.saveUserLevel(levelModel.getNextLevelId());

                    levelFinished = true;
                    loadLevelModel(levelModel.getNextLevelId());
                }
            }

            if(!levelFinished){
                setTimeout(playNextWord, 1500);
            }
        }else{
            // play fail sound?

            // mark clicked character red
            playView.markCharacterAsIncorrect(character);
            // mark correct character green
            playView.markCharacterAsCorrect(levelModel.getCurrentWord().getSolution());
            //soundManager.playFailureSound();

            animationManager.setCompanionFeeling('sad');
            playView.showThoughtBubble('incorrect');
        }
    },

    playNextWord = function(){
        // set next word
        var nextWord = levelModel.getNextWord();

        // set next sound
        soundManager.setWordSound(nextWord.getSound());

        //set image after 1.5 secs
        playView.setWordImage(nextWord.getImage());

        //play sound after 1.5 secs
        soundManager.playWordSound();
    }

    onWordSoundButtonClicked = function(event){
        soundManager.playWordSound();
    },

    onStartButtonClicked = function(event){
        soundManager.stopAllSounds();
        setTimeout(soundManager.playWordSound, 500);
    },

    onSoundStart = function(event){
        console.log('sound start');
        animationManager.playTapeRecorder();
    },

    onSoundEnded = function(event){
        console.log('sound ended => end animation');
        animationManager.stopTapeRecorder();


        //should be finished level sound
        if(levelFinished){
            setTimeout(startNextLevel, 500);
        }
    },

    startNextLevel = function(){
        levelFinished = false;
        soundManager.stopAllSounds();
        soundManager.toggleLevelSound();
        animationManager.resetBerry();
    }

    onLogoutButtonClicked = function(event){
        levelFinished = false;
        //switch to logout screen
        switchViewState('berries-eaten');
    },

    onRealLogout = function(event){
        window.location = "/logout";
    },

    onBackButtonClicked = function(event){
        switch(currentView){
            case 'level':
                break;
            case 'companion':
                switchViewState('level');
                break;
            case 'play':
                switchViewState('companion');
                break;
        }
    },

    switchViewState = function(view){
        currentView = view;
        soundManager.stopAllSounds();
        switch(view){
            case 'level':
                animationManager.setCurrentContainer('.level-selection-container');

                companionSelectionView.hideView();
                playView.hideView();

                levelSelectionView.showView();
                soundManager.toggleChoseLevelSound();
                break;

            case 'companion':
                animationManager.setCurrentContainer('.companion-selection-container');

                levelSelectionView.hideView();
                playView.hideView();
                companionSelectionView.showView();
                soundManager.toggleChoseCompanionSound();
                //$('.companion-selection-container .tape-recorder').click();
                break;

            case 'play':
                animationManager.setCurrentContainer('.play-view-container');

                levelSelectionView.hideView();
                companionSelectionView.hideView();

                playView.setBerriesEaten(userModel.getBerriesEaten());

                playView.showView();
                soundManager.toggleLevelSound();
                break;

            case 'berries-eaten':
                animationManager.setCurrentContainer('.berries-eaten-container');

                levelSelectionView.hideView();
                companionSelectionView.hideView();
                playView.hideView();

                berriesEatenView.setNumberOfBerries(userModel.getBerriesEaten());
                berriesEatenView.showThoughtBubble('happy');
                animationManager.setCompanionFeeling('happy', false);

                berriesEatenView.showView();

                soundManager.toggleLogoutSound();
                break;
        }
    },

    onTapeRecorderClicked = function(event){
        switch(currentView){
            case 'level':
                soundManager.toggleChoseLevelSound();
                break;
            case 'companion':
                soundManager.toggleChoseCompanionSound();
                break;
            case 'play':
                if(!levelFinished){
                    soundManager.toggleLevelSound();
                }else{
                    soundManager.toggleFinishLevelSound();
                }
                break;
            case 'berries-eaten':
                soundManager.toggleLogoutSound();
                break;
        }
    };

    that.init = init;
    

    return that;
})();