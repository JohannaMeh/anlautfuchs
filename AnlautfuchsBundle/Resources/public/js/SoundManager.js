Game.SoundManager = (function(){
    var that = {},
    basisUrl = '/bundles/johannatest/',

    /* sounds */
    wordSoundUrl = null,
    levelSoundUrl= null,

    /* fix sounds */
    /*sucessSoundEl = null,
    failureSoundEl = null,*/
    finishLevelSoundUrl = null,
    finishLevelSoundUrl2 = null,
    choseLevelSoundUrl = null,
    choseCompanionSoundUrl = null,
    loginSoundUrl = null,
    logoutSoundUrl = null,

    soundPlaying = false,

    currentHowl = null,



    init = function(){


        loginSoundUrl = basisUrl+'data/sound/kassettenrekorder/startScreen.ogg';

        choseLevelSoundUrl = basisUrl+'data/sound/kassettenrekorder/uebungWaehlScreen.ogg';

        choseCompanionSoundUrl = basisUrl+'data/sound/kassettenrekorder/begleiterScreen.ogg';


        finishLevelSoundUrl = basisUrl+'data/sound/kassettenrekorder/super1.ogg';

        finishLevelSoundUrl2 = basisUrl+'data/sound/kassettenrekorder/super2.ogg';

        logoutSoundUrl = basisUrl+'data/sound/kassettenrekorder/logout.ogg';

        return that;
    },


    playWordSound = function(){
        stopAllSounds();

        if(wordSoundUrl){
            var sound = new Howl({
                urls: [wordSoundUrl],
                onend: stopListener,
                onpause: stopListener
            });

            currentHowl = sound;

            sound.play();
            soundPlaying = true;
        }
    },

    setWordSound = function(soundpath){
        console.log('word sound', soundpath);
        wordSoundUrl = basisUrl + soundpath;
    },


    toggleLevelSound = function(){
        if(soundPlaying){
            stopAllSounds();
        }else if(levelSoundUrl){
            var sound = new Howl({
                urls: [levelSoundUrl],
                onend: stopListener,
                onpause: stopListener
            });

            currentHowl = sound;

            sound.play();
            soundPlaying = true;
            $(that).trigger('soundStarted');
        }
    },

    setLevelSound = function(soundpath){
        console.log('level sound', soundpath);
        levelSoundUrl = basisUrl + soundpath;
    },


    /*toggleSucessSound = function(){
        sucessSoundEl.play();
    },

    toggleFailureSound = function(){
        failureSoundEl.play();
    },*/

    toggleFinishLevelSound = function(){
        /*if(Math.random()<0.5){
            finishLevelSoundEl.play();
        }else{
            finishLevelSoundEl2.play();
        }*/

        if(soundPlaying){
            stopAllSounds();
        }else{
            var sound = new Howl({
                urls: [finishLevelSoundUrl],
                onend: stopListener,
                onpause: stopListener
            });

            currentHowl = sound;

            sound.play();
            soundPlaying = true;
            $(that).trigger('soundStarted');
        }
    },

    toggleChoseLevelSound = function(){
        if(soundPlaying){
            stopAllSounds();
        }else{
            var sound = new Howl({
                urls: [choseLevelSoundUrl],
                onend: stopListener,
                onpause: stopListener
            });

            currentHowl = sound;

            sound.play();
            soundPlaying = true;
            $(that).trigger('soundStarted');
        }
    },

    toggleChoseCompanionSound = function(){
        if(soundPlaying){
            stopAllSounds();
        }else{
            var sound = new Howl({
                urls: [choseCompanionSoundUrl],
                onend: stopListener,
                onpause: stopListener
            });

            currentHowl = sound;

            sound.play();
            soundPlaying = true;
            $(that).trigger('soundStarted');
        }
    },

    toggleLoginSound = function(){
       if(soundPlaying){
            stopAllSounds();
        }else{
            var sound = new Howl({
                urls: [loginSoundUrl],
                onend: stopListener,
                onpause: stopListener
            });

            currentHowl = sound;

            sound.play();
            soundPlaying = true;
            $(that).trigger('soundStarted');
        }
    },

    toggleLogoutSound = function(){
        if(soundPlaying){
            stopAllSounds();
        }else{
            var sound = new Howl({
                urls: [logoutSoundUrl],
                onend: stopListener,
                onpause: stopListener
            });

            currentHowl = sound;

            sound.play();
            soundPlaying = true;
            $(that).trigger('soundStarted');
        }
    },

    stopListener = function(event){
        console.log("#########Sound Ende");
        $(that).trigger('soundEnded');
        currentHowl.stop();
        soundPlaying = false;
    },

    stopAllSounds = function(){
        if(currentHowl){
            currentHowl.stop();
            $(that).trigger('soundEnded');
        }

        soundPlaying = false;
    };

    that.init = init;
    that.playWordSound = playWordSound;
    that.setWordSound = setWordSound;
    that.toggleLevelSound = toggleLevelSound;
    that.setLevelSound = setLevelSound;

    that.stopListener = stopListener;

    /*that.toggleSucessSound = toggleSucessSound;
    that.toggleFailureSound = toggleFailureSound;*/

    that.toggleFinishLevelSound = toggleFinishLevelSound;

    that.toggleChoseLevelSound = toggleChoseLevelSound;
    that.toggleChoseCompanionSound = toggleChoseCompanionSound;

    that.toggleLoginSound = toggleLoginSound;
    that.toggleLogoutSound = toggleLogoutSound;

    that.stopAllSounds = stopAllSounds;


    return that;
})();