Game.AnimationManager = (function(){
    var that = {},

    defaultCompanionType = 'fox',
    defaultFeeling = 'normal',
    currentContainer = '.level-selection-container',

    currentCompanionType = defaultCompanionType,
    currentFeeling = defaultFeeling,

    berryMoves = 0,
    berryAnimationTime = 1000,
    defaultMarginLeft = 510,
    defaultBottom = 360,
    defaultDegree = 0,

    initialised = false;


    init = function(){
        initTapeRecorderAnimation();
        initCompanionAnimation();
        stopAnimations();
        initialised = true;
        refreshCompanion();

        $(window).load(function(){
            stopAnimations();
        });
        return that;
    },

    resetBerry = function(){
        berryMoves = 0;
        $('#berry').css('margin-left', defaultMarginLeft + 'px');
        $('#berry').css('bottom', defaultBottom + 'px');
        $('#berry').css('opacity', 1);
        $('#berry').css('transform', 'rotate(' + defaultDegree + 'deg)');
    },

    initTapeRecorderAnimation = function(){
        $(".tape-recorder").animateSprite({
            fps: 6,
            animations: {
                stop: [0],
                play: [1, 2, 3, 4, 5, 6]
            },
            loop: true,
            complete: function(){
                // use complete only when you set animations with 'loop: false'
                alert("tape recorder animation End");
            }
        });
        $(".tape-recorder").animateSprite('stop');
    },

    initCompanionAnimation = function(){
        $(".companion").animateSprite({
            fps: 5,
            animations: {
                normal_fox: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                happy_fox: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                hungry_fox: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
                sad_fox: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
                
                normal_wizard: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
                happy_wizard: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
                hungry_wizard: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
                sad_wizard: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],   
                
                normal_girl: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
                happy_girl: [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
                hungry_girl: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109],
                sad_girl: [110, 111, 112, 113, 114, 115, 116, 117, 118, 119],
                
                normal_pirate: [120, 121, 122, 123, 124, 125, 126, 127, 128, 129],
                happy_pirate: [130, 131, 132, 133, 134, 135, 136, 137, 138, 139],
                hungry_pirate: [140, 141, 142, 143, 144, 145, 146, 147, 148, 149],
                sad_pirate: [150, 151, 152, 153, 154, 155, 156, 157, 158, 159],
                
                normal_cowboy: [160, 161, 162, 163, 164, 165, 166, 167, 168, 169],
                happy_cowboy: [170, 171, 172, 173, 174, 175, 176, 177, 178, 179],
                hungry_cowboy: [180, 181, 182, 183, 184, 185, 186, 187, 188, 189],
                sad_cowboy: [190, 191, 192, 193, 194, 195, 196, 197, 198, 199],
                
                normal_red_skin: [200, 201, 202, 203, 204, 205, 206, 207, 208, 209],
                happy_red_skin: [210, 211, 212, 213, 214, 215, 216, 217, 218, 219],
                hungry_red_skin: [220, 221, 222, 223, 224, 225, 226, 227, 228, 229],
                sad_red_skin: [230, 231, 232, 233, 234, 235, 236, 237, 238, 239], 
                
                normal_panda: [240, 241, 242, 243, 244, 245, 246, 247, 248, 249],
                happy_panda: [250, 251, 252, 253, 254, 255, 256, 257, 258, 259],
                hungry_panda: [260, 261, 262, 263, 264, 265, 266, 267, 268, 269],
                sad_panda: [270, 271, 272, 273, 274, 275, 276, 277, 278, 279],    
            },
            loop: true,
            complete: function(){
                // use complete only when you set animations with 'loop: false'
                alert("companion animation End");
            }
        });
        $('.companion').animateSprite('stop');
    },


    playTapeRecorder = function(){
        $(".tape-recorder").animateSprite('stop');
        $(currentContainer + " .tape-recorder").animateSprite('play', 'play');
    },

    stopTapeRecorder = function(){
        $(".tape-recorder").animateSprite('stop');
        $(currentContainer+ " .tape-recorder").animateSprite('play', 'stop');
    },

    setCompanionType = function(type){
        currentCompanionType = type;
        refreshCompanion();
    },

    getCompanionType = function(){
        return currentCompanionType;
    }

    setCompanionFeeling = function(feeling, timeout){
        if(timeout == undefined){
            timeout = true;
        }
        currentFeeling = feeling;
        refreshCompanion();
        if(timeout){
            setTimeout(resetCompanionFeeling, 1700);
        }
    },

    getCompanionFeeling = function(){
        return currentFeeling;
    },

    resetCompanionFeeling = function(){
        currentFeeling = defaultFeeling;
        refreshCompanion();
    },

    refreshCompanion = function(){
        if(initialised){
            $(".companion").animateSprite('stop');
            
            $(currentContainer + " .companion").animateSprite('play', currentFeeling + '_' + currentCompanionType);
        }
    },

    setCurrentContainer = function(container){
        currentContainer = container;
        refreshCompanion();
    },

    moveBerry = function(){
        var marginLeft = parseFloat($('#berry').css('margin-left'));
        var bottom = parseFloat($('#berry').css('bottom'));

        var startDegrees = parseFloat($('#berry').attr('degrees'));

        if(berryMoves == 0){
            startDegrees = 0;
            defaultMarginLeft = marginLeft;
            defaultBottom = bottom;
        }
        var endDegrees = startDegrees;


        
        console.log('margin-left', marginLeft);
        console.log('bottom', bottom);
        console.log('berry moves', berryMoves);

        if(berryMoves < 7){
            marginLeft = marginLeft - 40;
            bottom = bottom - 11.5;
            endDegrees = startDegrees - 60;


            $('#berry').animate({
                'margin-left': marginLeft + 'px',
                'bottom': bottom + 'px'

            }, berryAnimationTime);

            berryMoves++;
        }else if(berryMoves < 14){
            marginLeft = marginLeft + 34;
            bottom = bottom - 13;
            endDegrees = startDegrees + 60;


            $('#berry').animate({
                'margin-left': marginLeft + 'px',
                'bottom': bottom + 'px'

            }, berryAnimationTime);

            berryMoves++;
        }else{
            //fadeout etc.
            marginLeft = marginLeft + 130;
            bottom = bottom - 30;
            endDegrees = startDegrees + 60;


            $('#berry').animate({
                'margin-left': marginLeft + 'px',
                'bottom': bottom + 'px',
                'opacity': 0,

            }, berryAnimationTime);

            berryMoves++;
        }

        console.log('startDegrees', startDegrees);
        console.log('endDegrees', endDegrees);

        $({deg: startDegrees}).animate({deg: endDegrees}, {
            duration: berryAnimationTime,
            step: function(now) {
                    // in the step-callback (that is fired each step of the animation),
                    // you can use the `now` paramter which contains the current
                    // animation-position (`0` up to `angle`)
                $('#berry').css({
                    transform: 'rotate(' + now + 'deg)'
                });
            }
        });

        $('#berry').attr('degrees', endDegrees);

    },

    stopAnimations = function(){
        $('.tape-recorder').animateSprite('stop');
        $('.companion').animateSprite('stop');
    };

    that.init = init;

    /* Tape recorder */
    that.playTapeRecorder = playTapeRecorder;
    that.stopTapeRecorder = stopTapeRecorder;

    /* companion */
    that.setCompanionType = setCompanionType;
    that.getCompanionType = getCompanionType;


    that.setCompanionFeeling = setCompanionFeeling;
    that.getCompanionFeeling = getCompanionFeeling;
    that.resetCompanionFeeling = resetCompanionFeeling;

    that.refreshCompanion = refreshCompanion;
    that.stopAnimations = stopAnimations;

    that.setCurrentContainer = setCurrentContainer;

    that.moveBerry = moveBerry;
    that.resetBerry = resetBerry;

    return that;
})();