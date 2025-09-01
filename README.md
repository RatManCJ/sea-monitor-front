# Sea Monitor Front

本项目为基于 React + Vite + Cesium 的海洋水质监测可视化前端系统，支持多维度数据展示、趋势分析、智能问答等功能。

## 目录结构

```
├── public/                # 静态资源目录（含 Cesium、热力图库等）
│   ├── Cesium/            # Cesium 静态资源
│   ├── libs/              # 第三方库（如 CesiumHeatmap.js）
│   └── geojson/           # 地理边界数据
├── src/                   # 前端源码
│   ├── apis/              # 数据请求与 AI 接口
│   ├── assets/            # 图片等静态资源
│   ├── components/        # 业务组件
│   ├── App.jsx            # 应用入口组件
│   └── main.jsx           # 入口文件
├── index.html             # 主页面
├── package.json           # 项目依赖与脚本
├── vite.config.js         # Vite 配置
└── README.md              # 项目说明
```

## 主要功能

- **海洋水质数据可视化**：支持按时间、城市、站点等多维度展示水质数据。
- **趋势分析**：集成趋势图、排名板等多种可视化组件。
- **智能问答**：集成 AI 聊天组件，支持自然语言查询。
- **地图交互**：基于 Cesium 实现三维地球与空间数据展示。
- **多端兼容**：支持现代主流浏览器。

## 快速开始

## 环境要求

- Node.js >= 18
- 推荐使用 pnpm 作为包管理器
### 1. 安装依赖

推荐使用 [pnpm](https://pnpm.io/)：

```sh
pnpm install
```

### 2. 启动开发环境

```sh
pnpm run dev
```

### 3. 打包生产环境

```sh
pnpm run build
```

### 4. 访问

开发环境默认访问地址为 [http://localhost:5173](http://localhost:5173)。

## 主要依赖

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [CesiumJS](https://cesium.com/platform/cesiumjs/)
- [Ant Design](https://ant.design/)
- [@jiaminghi/data-view-react](https://github.com/DataV-Team/DataV-React)
- 其他详见 [package.json](package.json)

## 重要文件说明

- Cesium 相关静态资源位于 [public/Cesium/](public/Cesium/)
- 热力图功能由 [public/libs/CesiumHeatmap.js](public/libs/CesiumHeatmap.js) 提供
- 数据接口定义见 [`src/apis/sea-quality/index.js`](src/apis/sea-quality/index.js)
- 主要页面与组件位于 [`src/components/`](src/components/)

## 代码风格

- 使用 ESLint 进行代码规范检查，配置见 [eslint.config.js](eslint.config.js)
- 推荐使用 VSCode 编辑器

## 贡献

欢迎提交 Issue 或 PR 参与项目改进！

## License

本项目仅供学习与学术交流使用，禁止商业用途。

---

如需详细开发文档或遇到问题，请联系项目维护者。