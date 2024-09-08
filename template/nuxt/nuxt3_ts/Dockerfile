# 使用官方的 Node.js 镜像
FROM node:18

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 安装 PM2
RUN npm install pm2 -g

# 复制项目文件
COPY . .

# 构建 Nuxt 项目
RUN npm run build

# 暴露端口
EXPOSE 3000

# 使用 PM2 启动 Nuxt 项目
CMD ["pm2-runtime", "start", "nuxt", "start"]
