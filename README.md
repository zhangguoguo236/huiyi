# 西林电气会议（MiroTalk SFU 二开）

本仓库包含两部分：

- `mirotalksfu/`：网页端会议系统（基于 MiroTalk SFU 二开，AGPLv3）。已做汉化、标题改为「西林电气会议」、主页/自定义房间精简为纯加入会议表单、去 Logo、加载页去 MiroTalk Logo。
- `MirotalkTV/`：安卓电视端 APP（WebView 壳，加载会议网页端；含 SINOVO 图标）。

## 部署
详见 `mirotalksfu/` 内的部署方案，或直接用 `mirotalksfu/docker-compose.yml`（本地 build）部署。

## 注意事项
- `.env` 含生产密钥，**不入库**，请用 `mirotalksfu/.env.template` 复制后填写。
- `app/src/config.js` 与 `docker-compose.yml` 为二开改动，已强制纳入版本库。
