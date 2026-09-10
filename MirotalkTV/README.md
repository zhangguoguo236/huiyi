# 西林电气会议 · Android TV 客户端

基于 **MiroTalk SFU** 二开的安卓电视会议 APP。本质是一个**全屏 WebView 壳**，打开即加载部署好的会议服务器，通过系统 WebView 跑 WebRTC，配合电视外接的 USB 摄像头/麦克风即可开会。

> 上游项目：miroslavpejic85/mirotalksfu（AGPLv3）。本客户端仅为前端壳，会议信令/媒体仍由你部署的 MiroTalk 服务端提供。

---

## 一、工程结构

```
MirotalkTV/
├── build.gradle                      # 根工程（AGP 8.5.2）
├── settings.gradle
├── gradle.properties
├── gradle/wrapper/gradle-wrapper.properties
└── app/
    ├── build.gradle
    ├── proguard-rules.pro
    └── src/main/
        ├── AndroidManifest.xml       # TV 适配 + 权限 + banner
        ├── java/com/sinovo/mirotalktv/MainActivity.java   # WebView 加载服务器
        └── res/
            ├── values/strings.xml    # ★ 服务器地址 server_url 在这里改
            ├── values/themes.xml
            ├── drawable/ic_launcher.xml
            ├── drawable/banner.xml    # 电视主屏横图（当前为占位纯色块，需替换）
            └── xml/network_security_config.xml  # 允许 xm.sinovo.cn 自签/混合内容
```

## 二、环境要求

- **Android Studio** Hedgehog (2023.1) 或更新（自带 JDK 17 与 Gradle）
- 目标设备：**Android TV / 电视盒子**（API 21+，即 Android 5.0+）
- 真开会需：服务端已部署 + 电视接 **USB 摄像头 + USB 麦克风**

## 三、构建 APK（沙箱无 Android SDK，需在本地 Android Studio 完成）

1. Android Studio → `File → Open` 选择本 `MirotalkTV` 目录。
2. 首次打开会自动下载 Gradle 8.9 与依赖（已写好 `gradle-wrapper.properties`）。
3. `Build → Build Bundle(s) / APK(s) → Build APK(s)`。
4. 产物在 `app/build/outputs/apk/debug/app-debug.apk`（release 需自行配签名）。

> 若想用命令行：`cd MirotalkTV && gradle wrapper && ./gradlew assembleDebug`（需本机已装 Gradle 或让其自动下载）。

## 四、装到电视

- **adb 方式**：`adb connect <电视IP>:5555` → `adb install app-debug.apk`
- **U 盘方式**：拷 apk 到电视，用文件管理器安装（需开启「未知来源」）。
- 安装后在电视**主屏**即可看到「西林电气会议」banner 入口。

## 五、必改项

1. **服务器地址**：`app/src/main/res/values/strings.xml` 的 `server_url`，默认 `https://xm.sinovo.cn:1686`。服务器迁移后改这里重新打包即可。
2. **电视主屏 banner**：`res/drawable/banner.xml` 目前是**纯色占位块（无文字）**。上线前请替换：
   - Android Studio → `File → New → Image Asset` → 选 Banner，生成带「西林电气会议」文字的 `banner.png`（320×180，xhdpi）；
   - 然后**删除** `banner.xml`，让 `banner.png` 生效。

## 六、权限与硬件提醒

- 首次进入会请求**相机 / 麦克风**权限（遥控器确认）。
- WebRTC 的摄像头/麦克风授权由 `WebChromeClient.onPermissionRequest` 自动授予；若用户系统层拒绝，进房时需重新授权。
- 电视无内置摄像头/麦克风，必须接 **USB 摄像头 + USB 麦克风**，且系统 WebView 版本尽量新（Android 系统 WebView ≥ 90 最佳）。
- 遥控器方向键可在网页内导航（基于 Tab 焦点顺序），「返回」键回退网页历史。

## 七、合规提醒（重要）

MiroTalk SFU 为 **AGPLv3**。若本 APP 所连的服务端是你对外提供的网络服务，服务端那侧的二开改动须**开源**或购 **CodeCanyon 商业许可**，不能闭源白嫖。本 TV 客户端仅前端壳，同样受 AGPL 约束——内部使用无忧，对外分发需注意。
