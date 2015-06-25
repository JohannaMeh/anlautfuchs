/* 
    This object manages the playing and stopping of all sounds.
*/
Game.SoundManager = (function(){
    var that = {},
    basisUrl = '/bundles/anlautfuchs/',

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


    /* 
        Initializes the object by setting some fixed sound paths.
    */
    init = function(){


        loginSoundUrl = basisUrl+'data/sound/kassettenrekorder/startScreen.ogg';

        choseLevelSoundUrl = basisUrl+'data/sound/kassettenrekorder/uebungWaehlScreen.ogg';

        choseCompanionSoundUrl = basisUrl+'data/sound/kassettenrekorder/begleiterScreen.ogg';


        finishLevelSoundUrl = basisUrl+'data/sound/kassettenrekorder/super1.ogg';

        finishLevelSoundUrl2 = basisUrl+'data/sound/kassettenrekorder/super2.ogg';

        logoutSoundUrl = basisUrl+'data/sound/kassettenrekorder/logout.ogg';

        return that;
    },


    /* 
        Plays the sound of the current word.
    */
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

    /* 
        Sets the sound for the current word.
    */
    setWordSound = function(soundpath){
        wordSoundUrl = basisUrl + soundpath;
    },

    /* 
        Toggles the explanation sound for the current level.
    */
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

    /* 
        Sets the explanation sound of the current level.
    */
    setLevelSound = function(soundpath){
        levelSoundUrl = basisUrl + soundpath;
    },


    /*toggleSucessSound = function(){
        sucessSoundEl.play();
    },

    toggleFailureSound = function(){
        failureSoundEl.play();
    },*/

    /* 
        Toggles the level finished sound for the normal level without unlocking a companion type.
    */
    toggleFinishLevelSound = function(){
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

    /* 
        Toggles the level finished sound for the level where a companion type gets unlocked.
    */
    toggleSpecialFinishLevelSound = function(){
        if(soundPlaying){
            stopAllSounds();
        }else{
            var sound = new Howl({
                urls: [finishLevelSoundUrl2],
                onend: stopListener,
                onpause: stopListener
            });

            currentHowl = sound;

            sound.play();
            soundPlaying = true;
            $(that).trigger('soundStarted');
        }
    },

    /* 
        Toggles the sound for the chose level view.
    */
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

    /* 
        Toggles the sound for th chose companion view.
    */
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

    /* 
        Toggles the sound for the login page
    */
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

    /* 
        Toggle the sound for the logout page.
    */
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

    /* 
        Gets called when a sound finished playing.
    */
    stopListener = function(event){
        $(that).trigger('soundEnded');
        currentHowl.stop();
        soundPlaying = false;
    },

    /* 
        Stops all sunds which are currenty playing.
    */
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

    that.toggleSpecialFinishLevelSound = toggleSpecialFinishLevelSound;

    that.toggleChoseLevelSound = toggleChoseLevelSound;
    that.toggleChoseCompanionSound = toggleChoseCompanionSound;

    that.toggleLoginSound = toggleLoginSound;
    that.toggleLogoutSound = toggleLogoutSound;

    that.stopAllSounds = stopAllSounds;


    return that;
})();