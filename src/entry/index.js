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
        gn('gettings').textContent = Localization.localize('PBS_HOW_TO');
    }
}

// 첫 홈 화면
function indexFirstTime () {
    gn('frame2').className = 'frame2 hide'
    gn('authors').className = 'credits show';
    gn('authorsText').className = 'creditsText show';
    gn('catface').className = 'catface hide';

    // 무슨 기능인지는 모르겠지만 필요없다고 판단.
    if (window.Settings.edition == 'PBS') {
        gn('startcode').className = 'catlogo show';
    }

    // 설치 시 record 권한 허용 묻는 부분
    // iOS.askpermission();

    setTimeout(function () {
        iOS.hidesplash(doit);
    }, 500);
    function doit () {
        window.ontouchend = function () {
            indexLoadOptions();
        };
    }

    // 2초 후 indexLoadOptions 화면으로 전환
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
        
    } else {

        if (afterUsage) {
            gn('usageQuestion').className = 'usageQuestion hide';
            gn('usageSchool').className = 'usageSchool hide';
            gn('usageHome').className = 'usageHome hide';
            gn('usageOther').className = 'usageOther hide';
            gn('usageNoanswer').className = 'usageNoanswer hide';
        }
        iOS.setAnalyticsPlacePref(AppUsage.currentUsage);
    }

    if (afterUsage) {
        gn('usageQuestion').className = 'usageQuestion hide';
        gn('usageSchool').className = 'usageSchool hide';
        gn('usageHome').className = 'usageHome hide';
        gn('usageOther').className = 'usageOther hide';
        gn('usageNoanswer').className = 'usageNoanswer hide';
    }
    iOS.setAnalyticsPlacePref(AppUsage.currentUsage);
    
    // 2초 로딩 후 화면 전환
    gn('frame2').className = 'frame2 show';
    gn('authors').className = 'credits hide';
    gn('gettings').className = 'gettings show';
    gn('startcode').className = 'startcode show';
    gn('authorsText').className = 'creditsText hide';
    gn('catface').className = 'catface show';
    document.ontouchmove = function (e) 
    {
        e.preventDefault();
    };
    if (isAndroid) {
        AndroidInterface.notifySplashDone();
    }
}

function indexLoadUsage () {
    gn('frame2').className = 'frame2 show';
    gn('authors').className = 'credits hide';
    gn('authorsText').className = 'creditsText hide';
    gn('catface').className = 'catface show';
    gn('gettings').className = 'gettings show';
    gn('startcode').className = 'startcode show';

    gn('usageQuestion').textContent = Localization.localize('USAGE_QUESTION');
    gn('useSchoolText').textContent = Localization.localize('USAGE_SCHOOL');
    gn('useHomeText').textContent = Localization.localize('USAGE_HOME');
    gn('useOtherText').textContent = Localization.localize('USAGE_OTHER');
    gn('usageNoanswerText').textContent = Localization.localize('USAGE_NONE');

    gn('usageQuestion').className = 'usageQuestion hide';
    gn('usageSchool').className = 'usageSchool hide';
    gn('usageHome').className = 'usageHome hide';
    gn('usageOther').className = 'usageOther hide';
    gn('usageNoanswer').className = 'usageNoanswer hide';
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

// help버튼 클릭 시 도움말 화면으로 전환
function indexGettingstarted () {
    ScratchAudio.sndFX('tap.wav');
    //window.location.href = 'gettingstarted.html?place=home';
    window.location.href = 'home.html?place=book';
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
