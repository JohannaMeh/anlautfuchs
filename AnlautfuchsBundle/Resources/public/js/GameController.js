/* 
    The "main" game controller. It is the center point of the application and contains a good part of the program logic.
*/
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


    disabledLevelsJson = null,

    /* 
        Initialises the object. It initialises many of the other game components.
        It also triggers the loading of user data, disabled levels and the different companion models.
    */
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

    /* 
        Loads the level after it was selected.
    */
    loadLevelModel = function(levelId){
        // load select model data
        ajaxController.loadLevel(levelId);
    },

    /* 
        Loads the companion data after the user logged in
    */
    loadCompanionModel = function(){
        //load available companions
        ajaxController.loadCompanions();
    },

    /* 
        Loads the user data after the user logged in
    */
    loadUserModel = function(){
        //load user data
        ajaxController.loadUser();
    },

    /* 
        Loads the disabled levels for this user he logged in
    */
    loadDisabledLevels = function(){
        ajaxController.loadDisabledLevels();
    },

    /* 
        Gets called when the level selected event from the LevelSelectionView gets triggered.
    */
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

    /* 
        Gets called when on the playview a level gets selected
    */
    onPlayViewLevelSelected = function(event, levelId){
        soundManager.stopAllSounds();
        loadLevelModel(levelId);
        playViewLevelChange = true;
    },

    /* 
        Is called when a level is loaded.
        This can be from onLevelSelected if the level was already loaded.
        Or in the most cases it will be after the ajax call to load the level is finished and
        the levelLoaded event is triggered in the ajaxcontroller.
    */
    onLevelLoaded = function(event, level){
        levelModel = level;

        //check if level was already finished or if it is the first try for the level
        levelModel.checkIfAlreadyFinished(disabledLevelsJson);

        if(levelModel.wasAlreadyFinishedOnce() && !userModel.getGameWon()){
            console.log("last level....");
            levelModel.setAlreadyFinishedOnce(false);
        }

        //check if by finishing the level a fox type could be unlocked
        checkForLevelFoxType();

        setLevelData(level);

        if(playViewLevelChange){
            playViewLevelChange = false;
            startNextLevel();
        }
    },  

    /* 
        Checks if finishing the level will unlock a new companion type.
        Used right before finishing a level.
    */
    checkForLevelFoxType = function(){
        var nextLevelId = levelModel.getNextLevelId();
        if(companionModel){
            levelModel.setFoxTypeUnlockable(companionModel.checkIfLevelUnlocksFoxType(nextLevelId));
            console.log("Unlockable foxtype: ",levelModel.getFoxTypeUnlockable());
        }
    },

    /* 
        Will be called when the "disabledLevelsLoaded" event gets triggered from the ajax controller.
        it contains the via ajax loaded data for the disabled levels for the current user
    */ 
    onDisabledLevelsLoaded = function(event, json){
        levelSelectionView.disableLevels(json);
        playView.disableLevels(json);

        //if it is already here use the companion model
        if(companionModel){
            companionModel.setDisabledLevels(json);
        }else{
            //if not save the json and set it later
            disabledLevelsJson = json;
        }
    },

    /* 
        Provides the playview and soundmanager with the necessary informations for the level
    */
    setLevelData = function(level){
        // mark current level
        playView.markCurrentLevel(level.getId(), level.getParentId());

        // set view data
        playView.prepareLevel(level.showSecondRow(), level.showImage(), level.getWordSound());
        playView.setWordImage(level.getCurrentWord().getImage(), levelModel.getImageOptional());


        //set sound data
        soundManager.setLevelSound(level.getExplanationSound());
        soundManager.setWordSound(level.getCurrentWord().getSound());
    },

    /* 
        Gets called when the "userLoaded" event in the ajaxcontroller gets triggered
        it contains the via ajax loaded user data
    */
    onUserLoaded = function(event, user){
        userModel = user;

        animationManager.setCompanionType(userModel.getCompanion());
        if(companionModel){
            companionModel.setGameWon(userModel.getGameWon());
        }
    },

    /* 
        Gets called when the "nextCompanion" event in the companionselection view gets triggered
        This means the right arrow in the view was clicked
    */
    onNextCompanion = function(event){
        var current = userModel.getCompanion();
        var next = companionModel.getNext(current);
        animationManager.setCompanionType(next);
        userModel.setCompanion(next);
    },

    /* 
        Gets called when the "prevCompanion" event in the companionselection view gets triggered
        This means the left arrow in the view was clicked
    */
    onPrevCompanion = function(event){
        var current = userModel.getCompanion();
        var prev = companionModel.getPrev(current);
        animationManager.setCompanionType(prev);
        userModel.setCompanion(prev);
    },

    /* 
        Gets called when the "companionSelected" event in the companionselection view gets triggered.
        This means the button on the view was clicked
    */
    onCompanionSelected = function(event){
        //set companion per ajax in database?
        ajaxController.saveUserCompanion(userModel.getCompanion());

        switchViewState('play');
    },

    /* 
        Gets called when the "companionLoaded" event from the ajaxcontroller get triggered
        it contains the via ajax loaded companion data
    */
    onCompanionsLoaded = function(event, companions){
        companionModel = companions;

        //if there is disabled level data set, use it
        if(disabledLevelsJson != null){
            companionModel.setDisabledLevels(disabledLevelsJson);
        }
        if(userModel){
            companionModel.setGameWon(userModel.getGameWon());
        }
    },

    /* 
        Gets called when the "charClicked" event from the playview gets triggered
        This means an answer was selected.
        In here most of the game logic gets handled.
        It checks if the char is correct or incorrect.
        If the level is finished or the berry gets moved.        
    */
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
                    // check if level is finished for the first time and unlocks an fox Type
                    if(!userModel.getGameWon() && (!levelModel.wasAlreadyFinishedOnce() && levelModel.getFoxTypeUnlockable() != null)){
                        //play sound with type unlocking stuff
                        soundManager.toggleSpecialFinishLevelSound();
                        //show unlocked skin
                        
                        playView.showFoxUnlockedPopup(levelModel.getFoxTypeUnlockable());
                    }else{
                        //play normal finish sound
                        soundManager.toggleFinishLevelSound();

                        // show nomnom screen or sth. like that?
                        playView.showLevelFinishedPopup();
                    }

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

    /* 
        Loads the nex word and provides the informations to the playview and animationmanager
    */
    playNextWord = function(){
        // set next word
        var nextWord = levelModel.getNextWord();

        // set next sound
        soundManager.setWordSound(nextWord.getSound());

        //set image after 1.5 secs
        playView.setWordImage(nextWord.getImage(), levelModel.getImageOptional());

        if(levelModel.getWordSound()){
            //play sound after 1.5 secs
            soundManager.playWordSound();
        }
    }

    /* 
        Gets called when the "wordSoundButtonClicked" event from the playview gets triggered.
        This means the sound button was clicked.
    */
    onWordSoundButtonClicked = function(event){
        soundManager.playWordSound();
    },

    /* 
        Gets called when the "startButtonClicked" event from the playview gets triggered.
    */
    onStartButtonClicked = function(event){
        soundManager.stopAllSounds();

        if(levelModel.getWordSound()){
            setTimeout(soundManager.playWordSound, 500);
        }
    },

    /* 
        Gets called when the "soundStarted" event from the sound manager gets triggered.
    */
    onSoundStart = function(event){
        console.log('sound start');
        animationManager.playTapeRecorder();
    },

    /* 
        Gets called when the "soundEnded" event from the sound manager gets triggered.
    */
    onSoundEnded = function(event){
        console.log('sound ended => end animation');
        animationManager.stopTapeRecorder();


        //should be finished level sound
        if(levelFinished){
            playView.hidePopups();
            setTimeout(startNextLevel, 500);
        }
    },

    /* 
        Starts the next level
    */
    startNextLevel = function(){
        levelFinished = false;
        soundManager.stopAllSounds();
        soundManager.toggleLevelSound();
        animationManager.resetBerry();
    }

    /* 
        Gets called when the logout button gets clicked.
        Now the "berries eaten view" gets displayed.
    */
    onLogoutButtonClicked = function(event){
        levelFinished = false;
        //switch to logout screen
        switchViewState('berries-eaten');
    },

    /* 
        Really logs the user out by sending them to the logout page.
    */
    onRealLogout = function(event){
        window.location = "/logout";
    },

    /* 
        Gets called when the backButton gets clicked.
        Switches to te previous view.
    */
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

    /* 
        Handles the view switches.
        Gets called when the backbutton or the logout button gets called.
        Or if a level or companion gets selected.
    */
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

                animationManager.resetBerry();

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

    /* 
        Gets called when the tape recorder gets clicked on any view.
        Toggles the corresponding sound which then by event starts or ends the animation.
    */
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