# pipecsv2geojson

将管线数据转换成渲染用的GeoJSON格式。

## 安装
```shell
npm i pipecsv2geojson
```

## 用法

```js
import { convertPipeCSV } from '../index.mjs';
// options中的参数是所需属性的列序号
convertPipeCSV(csv, {
  // 管线起点经度
  startXCol: 15,
  // 管线起点纬度
  startYCol: 16,
  // 管线起点的埋深
  startZCol: 23,
  // 管线终点经度
  endXCol: 17,
  // 管线终点纬度
  endYCol: 18,
  // 管线终点埋深
  endZCol: 24,
  // 断面尺寸
  sizeCol: 1,
  // 第一行是否是标题栏
  hasColName: true
}).then(geojson => {
  //
});
```

## 测试

```shell
npm test
```