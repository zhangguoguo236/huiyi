package com.sinovo.mirotalktv;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowManager;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

/**
 * 西林电气会议 —— Android TV 客户端
 * 本质是一个全屏 WebView 壳，加载部署好的 MiroTalk SFU 服务器地址。
 * 真开会依赖服务端（xm.sinovo.cn:1686）与电视外接的 USB 摄像头/麦克风。
 */
public class MainActivity extends Activity {

    private static final int REQUEST_MEET_PERMISSIONS = 100;
    private static final String[] MEET_PERMISSIONS = {
            Manifest.permission.CAMERA,
            Manifest.permission.RECORD_AUDIO
    };

    private WebView webView;

    @SuppressLint({"SetJavaScriptEnabled", "ClickableViewAccessibility"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 全屏沉浸（隐藏状态栏与系统导航）
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);

        webView = new WebView(this);
        WebSettings ws = webView.getSettings();
        ws.setJavaScriptEnabled(true);                       // 会议 UI 必需
        ws.setDomStorageEnabled(true);                      // MiroTalk 依赖 localStorage
        ws.setMediaPlaybackRequiresUserGesture(false);       // 允许自动播放会议媒体
        ws.setAllowFileAccess(false);
        ws.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        ws.setBuiltInZoomControls(false);
        ws.setDisplayZoomControls(false);
        ws.setSupportZoom(false);
        // 电视适配：按 WebView 真实像素宽度渲染，禁用 overview 等比缩放，避免四周被裁剪
        ws.setUseWideViewPort(false);
        ws.setLoadWithOverviewMode(false);

        // 页面内链接仍在 WebView 打开
        webView.setWebViewClient(new WebViewClient());

        // 处理摄像头/麦克风授权请求（WebRTC 关键）
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                runOnUiThread(() -> request.grant(request.getResources()));
            }
        });

        setContentView(webView);

        // 加载会议服务器
        webView.loadUrl(getString(R.string.server_url));

        // 申请系统运行时权限（Android 6+），并让 WebView 可接收遥控器方向键
        requestMeetPermissions();
        webView.requestFocus();
    }

    private void requestMeetPermissions() {
        boolean need = false;
        for (String p : MEET_PERMISSIONS) {
            if (ContextCompat.checkSelfPermission(this, p) != PackageManager.PERMISSION_GRANTED) {
                need = true;
                break;
            }
        }
        if (need) {
            ActivityCompat.requestPermissions(this, MEET_PERMISSIONS, REQUEST_MEET_PERMISSIONS);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                            String[] permissions,
                                            int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        // 即使用户拒绝，WebView 仍可浏览；进入房间需摄像头/麦克风时 WebChromeClient 会再次请求
    }

    // 遥控器返回键：先回退网页历史，无历史则退出 APP
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }
}
