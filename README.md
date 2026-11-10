# 指板手记 · Fretnote

一个用于 CAGED 和弦推导与吉他练习记录的本地 Web 应用。

## 功能

- 12 个调的大三、小三、大七、属七与小七和弦推导
- CAGED 五种指型的根音定位、公式与实际音名
- 当前指型的标准左手按法图，包含手指编号、空弦、闷弦与横按
- 可交互的标准调弦指板
- 按调记录练习进度
- 结构化学习记录、搜索、编辑与删除
- JSON 数据备份/导入，以及 Markdown 导出
- 离线 PWA 支持

## 运行

不需要安装依赖。在项目目录启动任意静态文件服务器：

```bash
python3 -m http.server 8000
```

然后访问 <http://localhost:8000>。

数据默认保存在浏览器 `localStorage` 中，不会上传到服务器。

## JSON 格式

导出文件使用以下顶层结构：

```json
{
  "format": "fretnote.guitar-journal",
  "schemaVersion": "1.1",
  "exportedAt": "2026-11-11T00:00:00.000Z",
  "instrument": {
    "type": "guitar",
    "tuning": ["E2", "A2", "D3", "G3", "B3", "E4"],
    "system": "CAGED",
    "chordTypes": ["major", "minor", "maj7", "dominant7", "minor7"]
  },
  "practiceProgress": {},
  "sessions": []
}
```

每条 `sessions` 记录包含：

- `date`：练习日期，`YYYY-MM-DD`
- `durationMinutes`：练习分钟数
- `key`：调性
- `chordType`：和弦类型，支持 `major`、`minor`、`maj7`、`dominant7`、`minor7`
- `shapes`：CAGED 指型
- `title`：记录标题
- `focus`：练习笔记
- `tags`：标签数组
- `createdAt` / `updatedAt`：ISO 时间戳

## 指型约定

公式中的 `1`、`b3`、`3`、`5`、`b7`、`7` 分别表示根音、小三度、大三度、纯五度、小七度与大七度。指板纵向按一弦在上、六弦在下排列，使用标准调弦 `E A D G B E`。

## 扩展和弦类型

在 `app.js` 的 `CHORD_TYPES` 中加入新的音程数组与级数公式，例如减七和弦可以使用：

```js
dim7: {
  id: "dim7",
  label: "减七和弦",
  short: "减七",
  suffix: "dim7",
  intervals: [0, 3, 6, 9],
  formula: ["1", "b3", "b5", "bb7"],
  description: "由堆叠小三度组成，具有强烈的不稳定感。"
}
```

再把类型 ID 加入 `CHORD_TYPE_ORDER`，和弦选择器、音名推导、CAGED 指型、左手按法和学习档案会自动接入。若引入 `b5`、`bb7` 等当前尚未使用的级数，还需要在 `TONE_CLASS`、`TONE_LABEL`、`INTERVAL_LABEL` 与 `DEGREE_LETTER_STEPS` 中补充显示和拼写规则。
