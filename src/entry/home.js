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
    window.location.href = 'index.html?back=yes';        // 시작화면으로 되돌아가기
}

// 사용하지 않지만 없애버리면 밑에 프로젝트 부분이 없어진다
function homeStrings () {
    gn('abouttab-text').textContent = Localization.localize('ABOUT_SCRATCHJR');
    gn('interfacetab-text').textContent = Localization.localize('INTERFACE_GUIDE');
    gn('painttab-text').textContent = Localization.localize('PAINT_EDITOR_GUIDE');
    gn('blockstab-text').textContent = Localization.localize('BLOCKS_GUIDE');
}