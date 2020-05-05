import ScratchAudio from '../utils/ScratchAudio';
import {gn, getUrlVars, isAndroid, isiOS} from '../utils/lib';
import iOS from '../iPad/iOS';
import UI from '../editor/ui/UI';
import Localization from '../utils/Localization';
import AppUsage from '../utils/AppUsage';
import Home from '../lobby/Home';

export function indexMain () {
    gn('gettings').ontouchend = indexGettingstarted;
    gn('startcode').ontouchend = indexGohome;
    ScratchAudio.init();
    var urlvars = getUrlVars();
    if (urlvars.back) {
        indexLoadOptions();
    } else {
        indexFirstTime();
    }

    //pbs 무엇
    if (window.Settings.edition == 'PBS') {
        gn('startButton').textContent = Localization.localize('PBS_START');
        gn('gettings').textContent = Localization.localize('PBS_HOW_TO');

        gn('startButton').ontouchend = indexGohome;
        gn('pbschars').ontouchend = indexGohome;
    }
}

function indexFirstTime () {
    gn('authors').className = 'credits show';
    gn('authorsText').className = 'creditsText show';
    if (window.Settings.edition == 'PBS') {
        gn('pbschars').className = 'characters hide';
        gn('startcode').className = 'catlogo show';
        gn('startButton').className = 'startButton hide';
    } else {
         gn('purpleguy').className = 'purple show';
         gn('blueguy').className = 'blue show';
         gn('redguy').className = 'red show';
    }
    iOS.askpermission(); // ask for sound recording
    setTimeout(function () {
        iOS.hidesplash(doit);
    }, 500);
    function doit () {
        window.ontouchend = function () {
            indexLoadOptions();
        };
    }
    setTimeout(function () {
        indexLoadOptions();
    }, 2000);
}

function indexLoadOptions () {
   
    if (window.Settings.edition != 'PBS' && AppUsage.askForUsage()) {
        indexLoadUsage();
    } else {
        indexLoadStart();
    }
}

function indexLoadStart (afterUsage) {


    if (window.Settings.edition == 'PBS') {
        gn('pbschars').className = 'characters show';
        gn('startButton').className = 'startButton show';
    } else {
        gn('purpleguy').className = 'purple hide';
        gn('blueguy').className = 'blue hide';
        gn('redguy').className = 'red hide';

        if (afterUsage) {
            gn('catface').className = 'catface show';
            gn('jrlogo').className = 'jrlogo show';
            gn('usageQuestion').className = 'usageQuestion hide';
            gn('usageSchool').className = 'usageSchool hide';
            gn('usageHome').className = 'usageHome hide';
            gn('usageOther').className = 'usageOther hide';
            gn('usageNoanswer').className = 'usageNoanswer hide';
        }
        iOS.setAnalyticsPlacePref(AppUsage.currentUsage);
    }


    if (afterUsage) {
        gn('catface').className = 'catface show';
        gn('jrlogo').className = 'jrlogo show';
        gn('usageQuestion').className = 'usageQuestion hide';
        gn('usageSchool').className = 'usageSchool hide';
        gn('usageHome').className = 'usageHome hide';
        gn('usageOther').className = 'usageOther hide';
        gn('usageNoanswer').className = 'usageNoanswer hide';
    }
    iOS.setAnalyticsPlacePref(AppUsage.currentUsage);
    gn('gettings').className = 'gettings show';
    gn('startcode').className = 'startcode show';
    document.ontouchmove = function (e) 
    {
        e.preventDefault();
    };
    // if (isAndroid) {
    //     AndroidInterface.notifySplashDone();
    // }
}

function indexLoadUsage () {
    gn('authors').className = 'credits show';
    gn('authorsText').className = 'creditsText hide';
    gn('purpleguy').className = 'purple hide';
    gn('blueguy').className = 'blue hide';
    gn('redguy').className = 'red hide';
    gn('catface').className = 'catface hide';
    gn('jrlogo').className = 'jrlogo hide';

    gn('usageQuestion').textContent = Localization.localize('USAGE_QUESTION');
    gn('useSchoolText').textContent = Localization.localize('USAGE_SCHOOL');
    gn('useHomeText').textContent = Localization.localize('USAGE_HOME');
    gn('useOtherText').textContent = Localization.localize('USAGE_OTHER');
    gn('usageNoanswerText').textContent = Localization.localize('USAGE_NONE');

    gn('usageQuestion').className = 'usageQuestion show';
    gn('usageSchool').className = 'usageSchool show';
    gn('usageHome').className = 'usageHome show';
    gn('usageOther').className = 'usageOther show';
    gn('usageNoanswer').className = 'usageNoanswer show';
    gn('usageSchool').ontouchend = indexSetUsage;
    gn('usageHome').ontouchend = indexSetUsage;
    gn('usageOther').ontouchend = indexSetUsage;
    gn('usageNoanswer').ontouchend = indexSetUsage;
}

function indexGohome () {
    
    // window.location.href = 'editor.html';
    iOS.setfile('homescroll.sjr', 1, function () {
        doNext();
    });
    function doNext () {
          window.location.href = 'home.html';
        // 홈화면으로 이동 
        // window.location.href = 'index.html?back=yes'
       
        
    }


}


// function indexGoSettings () {
//     // Switch to the settings selection page
//     // Triggered by tapping the gear icon in the top right
//     ScratchAudio.sndFX('tap.wav');
//     window.location.href = 'home.html?place=gear';
// }

function indexGettingstarted () {
    ScratchAudio.sndFX('tap.wav');
    window.location.href = 'gettingstarted.html?place=home';
}

function indexSetUsage (e) {
    var usageText = '';

    switch (e.target.parentElement.id) {
    case 'usageSchool':
        usageText = 'school';
        break;
    case 'usageHome':
        usageText = 'home';
        break;
    case 'usageOther':
        usageText = 'other';
        break;
    case 'usageNoanswer':
        usageText = 'noanswer';
        break;
    }
    // Send one-time analytics event about usage
    iOS.analyticsEvent('lobby', 'scratchjr_usage', usageText);
    AppUsage.setUsage(usageText);
    ScratchAudio.sndFX('tap.wav');
    indexLoadStart(true);
}
// For PBS KIDS edition only
function indexInfo () {
    ScratchAudio.sndFX('tap.wav');
    window.location.href = 'home.html?place=book';
}

function indexMoreApps () {
    ScratchAudio.sndFX('tap.wav');

    UI.parentalGate(null, function () {
        if (isiOS) {
            window.location.href = 'https://itunes.apple.com/us/developer/pbs-kids/id324323339?mt=8';
        } else {
            window.location.href = 'http://to.pbs.org/ScJr_GPlay';
        }
    });
}
