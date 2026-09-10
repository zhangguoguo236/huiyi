# syntax=docker/dockerfile:1.6

# Use Node.js 24 LTS slim image as base
FROM node:24-slim

# Set working directory
WORKDIR /src

# Environment
ENV NODE_ENV=production
ENV MEDIASOUP_SKIP_WORKER_PREBUILT_DOWNLOAD=true

# ---- 国内镜像加速 ----
# npm 源（淘宝）
ENV npm_config_registry=https://registry.npmmirror.com
# pip 源（清华）。mediasoup worker 编译依赖 pip 安装 meson/ninja，必须加速
ENV PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple
ENV PIP_TRUSTED_HOST=pypi.tuna.tsinghua.edu.cn

# 换 apt 源为清华镜像（兼容 deb822 与传统两种格式）
# node:24-slim 用 /etc/apt/sources.list.d/debian.sources (deb822)，无传统 sources.list
RUN set -e; \
    if [ -f /etc/apt/sources.list.d/debian.sources ]; then \
      sed -i 's|deb.debian.org|mirrors.tuna.tsinghua.edu.cn|g; s|security.debian.org/debian-security|mirrors.tuna.tsinghua.edu.cn/debian-security|g' /etc/apt/sources.list.d/debian.sources; \
    elif [ -f /etc/apt/sources.list ]; then \
      sed -i 's|deb.debian.org|mirrors.tuna.tsinghua.edu.cn|g; s|security.debian.org/debian-security|mirrors.tuna.tsinghua.edu.cn/debian-security|g' /etc/apt/sources.list; \
    else \
      printf 'deb http://mirrors.tuna.tsinghua.edu.cn/debian bookworm main\ndeb http://mirrors.tuna.tsinghua.edu.cn/debian-security bookworm-security main\n' > /etc/apt/sources.list; \
    fi

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    build-essential \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies (cache npm)
# NOTE: package.json has a postinstall script that runs `npm run build:mediasoup-client`,
# which requires `esbuild`. `esbuild` is listed under devDependencies, so `--omit=dev`
# causes the postinstall step to hang/fail when npx tries to download esbuild on the fly.
# Fix: install with devDependencies so the bundle can be built, then prune them away.
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --include=dev && \
    npm prune --omit=dev

# Avoid recursive chown, which duplicates /src into a costly overlayfs layer.
# Dependencies remain root-owned and readable; application files are owned by node.
COPY --chown=node:node app ./app
COPY --chown=node:node public ./public

# Copy config template → config
COPY --chown=node:node app/src/config.template.js app/src/config.js

# Run as the non-root "node" user (uid/gid 1000) shipped with the base image
USER node

# Default command
CMD ["npm", "start"]
