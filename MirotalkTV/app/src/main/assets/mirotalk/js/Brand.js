'use strict';

const title = document.getElementById('title');
const icon = document.getElementById('icon');
const appleTouchIcon = document.getElementById('appleTouchIcon');
const newRoomTitle = document.getElementById('newRoomTitle');
const newRoomDescription = document.getElementById('newRoomDescription');

const description = document.getElementById('description');
const keywords = document.getElementById('keywords');

const appTitle = document.getElementById('appTitle');
const appDescription = document.getElementById('appDescription');
const joinDescription = document.getElementById('joinDescription');
const joinRoomBtn = document.getElementById('joinRoomButton');
const customizeRoomBtn = document.getElementById('customizeRoomButton');
const joinLastLabel = document.getElementById('joinLastLabel');


const waitingRoomHeading = document.getElementById('waitingRoomHeading');
const waitingRoomDescription = document.getElementById('waitingRoomDescription');
const waitingRoomStatus = document.getElementById('waitingStatus');
const waitingRoomHostLink = document.getElementById('waitingRoomHostLink');
const waitingRoomLoginLink = document.getElementById('waitingRoomLoginLink');

const loginHeading = document.getElementById('loginHeading');
const loginDescription = document.getElementById('loginDescription');
const loginButton = document.getElementById('loginButton');
//...

// app/src/config.js - ui.brand
let BRAND = {
    app: {
        language: 'zh',
        translationMode: 'native',
        name: '西林电气会议',
        title: '西林电气会议',
        description:
            '一键开启视频会议，无需下载、插件或登录，直接开始通话、聊天与屏幕共享。',
        joinDescription: '选一个房间名字。<br />这个<br />怎么样？',
        joinButtonLabel: '加入房间',
        customizeButtonLabel: '自定义房间',
        joinLastLabel: '你最近的房间：',
    },
    site: {
        title: '西林电气会议',
        icon: 'data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2064%2064%27%3E%3Crect%20width%3D%2764%27%20height%3D%2764%27%20rx%3D%2712%27%20fill%3D%27%2316335c%27%2F%3E%3Ctext%20x%3D%2732%27%20y%3D%2744%27%20font-size%3D%2738%27%20text-anchor%3D%27middle%27%20fill%3D%27%23ffffff%27%20font-family%3D%27sans-serif%27%20font-weight%3D%27bold%27%3E%E8%A5%BF%3C%2Ftext%3E%3C%2Fsvg%3E',
        appleTouchIcon: 'data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2064%2064%27%3E%3Crect%20width%3D%2764%27%20height%3D%2764%27%20rx%3D%2712%27%20fill%3D%27%2316335c%27%2F%3E%3Ctext%20x%3D%2732%27%20y%3D%2744%27%20font-size%3D%2738%27%20text-anchor%3D%27middle%27%20fill%3D%27%23ffffff%27%20font-family%3D%27sans-serif%27%20font-weight%3D%27bold%27%3E%E8%A5%BF%3C%2Ftext%3E%3C%2Fsvg%3E',
        newRoomTitle: '取个名字。<br />分享链接。<br />开始会议。',
        newRoomDescription:
            "每个房间都有一次性专属链接。取一个房间名，分享你的专属链接即可，就是这么简单。",
    },
    meta: {
        description:
            '基于 Mediasoup 的自托管开源 WebRTC 视频会议平台，构建你自己的 Zoom 替代方案。',
        keywords:
            'webrtc, miro, mediasoup, mediasoup-client, self hosted, voip, sip, real-time communications, chat, messaging, meet, webrtc stun, webrtc turn, webrtc p2p, webrtc sfu, video meeting, video chat, video conference, multi video chat, multi video conference, peer to peer, p2p, sfu, rtc, alternative to, zoom, microsoft teams, google meet, jitsi, meeting',
    },
    whoAreYou: {
        title: '西林电气会议 - 等待主持人开始会议',
        waitingRoomHeading: '等待主持人...',
        waitingRoomDescription:
            "会议尚未开始。<br />主持人开启房间后，你将自动加入。",
        waitingRoomStatus: '正在检查房间状态...',
        waitingRoomReady: '房间已就绪！正在加入...',
        waitingRoomWaiting: '等待主持人开始会议...',
        waitingRoomHostLink: '你是主持人？',
        waitingRoomLoginLink: '在此登录',
        waitingRoomElapsedJust: '刚刚开始等待',
        waitingRoomElapsedMinutes: '已等待 {minutes}',
        waitingRoomSongUrl: '',
    },
    login: {
        heading: '欢迎回来',
        description: '请输入账号密码继续。',
        buttonLabel: '登录',
    },
    about: {
        imageUrl: '../images/mirotalk-logo.gif',
        title: '<strong>WebRTC SFU v2.4.43</strong>',
        html: `
            <div class="about-content">
                <p class="about-description">
                    自托管的群组视频会议，基于可扩展的 WebRTC 技术。
                </p>
                <a
                    class="about-primary-action"
                    data-umami-event="About button"
                    href="https://docs.mirotalk.com/sites/sfu.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i class="fas fa-info-circle" aria-hidden="true"></i>
                    <span>关于</span>
                </a>
                <dl class="about-details">
                    <div>
                        <dt>作者</dt>
                        <dd>
                            <a
                                id="linkedin-button"
                                data-umami-event="Linkedin button"
                                href="https://www.linkedin.com/in/miroslav-pejic-976a07101/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >Miroslav Pejic</a>
                        </dd>
                    </div>
                    <div>
                        <dt>邮箱</dt>
                        <dd>
                            <a
                                id="email-button"
                                data-umami-event="Email button"
                                href="mailto:miroslav.pejic.85@gmail.com?subject=MiroTalk SFU info"
                            >miroslav.pejic.85@gmail.com</a>
                        </dd>
                    </div>
                </dl>
                <footer class="about-footer">
                    &copy; ${new Date().getFullYear()} 西林电气会议. 保留所有权利。
                </footer>
            </div>
        `,
    },
    widget: {
        enabled: false,
        roomId: 'support-room',
        theme: 'dark',
        widgetState: 'minimized',
        widgetType: 'support',
        supportWidget: {
            position: 'top-right',
            expertImages: [
                'https://photo.cloudron.pocketsolution.net/uploads/original/95/7d/a5f7f7a2c89a5fee7affda5f013c.jpeg',
            ],
            buttons: {
                audio: true,
                video: true,
                screen: true,
                chat: true,
                join: true,
            },
            checkOnlineStatus: false,
            isOnline: true,
            customMessages: {
                heading: '需要帮助？',
                subheading: '立即获取专家团队支持！',
                connectText: '5 秒内连接',
                onlineText: '我们在线',
                offlineText: '我们离线',
                poweredBy: '由 西林电气会议 提供支持',
            },
            alert: {
                enabled: false,
                type: 'email',
            },
        },
    },
    //...
};

function initialize() {
    // Use static local brand config only; never override from server/sessionStorage.
    // Clear stale per-browser language override so the configured default (zh) wins.
    try {
        localStorage.removeItem('uiLanguageOverride');
    } catch (e) {
        // ignore
    }

    customizeSite();

    customizeMetaTags();

    customizeApp();

    customizeWidget();

    customizeWhoAreYou();

    customizeLogin();


    // Notify listeners (e.g. I18n.js) that BRAND is fully resolved.
    document.dispatchEvent(new CustomEvent('brand:ready'));
}

// ELEMENT display mode
function elementDisplay(element, display, mode = 'block') {
    if (!element) return;
    element.style.display = display ? mode : 'none';
}

// APP customize
function customizeApp() {
    if (appTitle && BRAND.app?.title) {
        appTitle.innerHTML = BRAND.app?.title;
    }
    if (appDescription && BRAND.app?.description) {
        appDescription.textContent = BRAND.app.description;
    }
    if (joinDescription && BRAND.app?.joinDescription) {
        joinDescription.innerHTML = BRAND.app.joinDescription;
    }
    if (joinRoomBtn && BRAND.app?.joinButtonLabel) {
        joinRoomBtn.innerText = BRAND.app.joinButtonLabel;
    }
    if (customizeRoomBtn && BRAND.app?.customizeButtonLabel) {
        customizeRoomBtn.innerText = BRAND.app.customizeButtonLabel;
    }
    if (joinLastLabel && BRAND.app?.joinLastLabel) {
        joinLastLabel.innerText = BRAND.app.joinLastLabel;
    }
}

// WIDGET customize
function customizeWidget() {
    if (BRAND.widget?.enabled) {
        const domain = window.location.host;
        const roomId = BRAND.widget?.roomId || 'support-room';
        const userName = 'guest-' + Math.floor(Math.random() * 10000);
        if (typeof MiroTalkWidget !== 'undefined') {
            new MiroTalkWidget(domain, roomId, userName, BRAND.widget);
        } else {
            console.warn('MiroTalkWidget is not defined in the current context. Please check Widget.js loading.', {
                domain,
                roomId,
                userName,
                widget: BRAND.widget,
            });
        }
    }
}

// SITE metadata
function customizeSite() {
    if (title && BRAND.site?.title) {
        title.textContent = BRAND.site?.title;
    }
    if (icon && BRAND.site?.icon) {
        icon.href = BRAND.site?.icon;
    }
    if (appleTouchIcon && BRAND.site?.appleTouchIcon) {
        appleTouchIcon.href = BRAND.site.appleTouchIcon;
    }
    if (newRoomTitle && BRAND.site?.newRoomTitle) {
        newRoomTitle.innerHTML = BRAND.site?.newRoomTitle;
    }
    if (newRoomDescription && BRAND.site?.newRoomDescription) {
        newRoomDescription.textContent = BRAND.site.newRoomDescription;
    }
}

// SEO metadata
function customizeMetaTags() {
    if (description && BRAND.meta?.description) {
        description.content = BRAND.meta.description;
    }
    if (keywords && BRAND.meta?.keywords) {
        keywords.content = BRAND.meta.keywords;
    }
}

function customizeWhoAreYou() {
    if (waitingRoomHeading && title && BRAND.whoAreYou?.title) title.textContent = BRAND.whoAreYou.title;
    if (waitingRoomHeading && BRAND.whoAreYou?.waitingRoomHeading)
        waitingRoomHeading.textContent = BRAND.whoAreYou.waitingRoomHeading;
    if (waitingRoomDescription && BRAND.whoAreYou?.waitingRoomDescription)
        waitingRoomDescription.innerHTML = BRAND.whoAreYou.waitingRoomDescription;
    if (waitingRoomStatus && BRAND.whoAreYou?.waitingRoomStatus)
        waitingRoomStatus.textContent = BRAND.whoAreYou.waitingRoomStatus;
    if (waitingRoomHostLink && BRAND.whoAreYou?.waitingRoomHostLink)
        waitingRoomHostLink.textContent = BRAND.whoAreYou.waitingRoomHostLink;
    if (waitingRoomLoginLink && BRAND.whoAreYou?.waitingRoomLoginLink)
        waitingRoomLoginLink.textContent = BRAND.whoAreYou.waitingRoomLoginLink;
}

function customizeLogin() {
    if (loginHeading && BRAND.login?.heading) loginHeading.textContent = BRAND.login.heading;
    if (loginDescription && BRAND.login?.description) loginDescription.textContent = BRAND.login.description;
    if (BRAND.login?.buttonLabel) {
        const loginBtnText = document.getElementById('loginBtnText');
        if (loginBtnText) {
            loginBtnText.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>&nbsp; ' + BRAND.login.buttonLabel;
        } else if (loginButton) {
            loginButton.textContent = BRAND.login.buttonLabel;
        }
    }
}

initialize();
