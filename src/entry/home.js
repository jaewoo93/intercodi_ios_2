import {gn} from '../utils/lib';
import Localization from '../utils/Localization';
import iOS from '../iPad/iOS';
import Lobby from '../lobby/Lobby';

export function homeMain () {
    gn('logotab').ontouchend = homeGoBack;
    homeStrings();
    iOS.getsettings(doNext);
    function doNext (str) {
        var list = str.split(',');
        iOS.path = list[1] == '0' ? list[0] + '/' : undefined;
        Lobby.appinit(window.Settings.scratchJrVersion);
    }
}

function homeGoBack () {
    // window.location.href = 'index.html?back=yes'; 2초 로딩 포함 됨
    window.location.href = 'index.html?back=no';        // 2초 로딩 없이 시작화면
}