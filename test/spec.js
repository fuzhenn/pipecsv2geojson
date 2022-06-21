import { convertPipeCSV } from '../index.mjs';
import assert from 'assert';

describe('specs', () => {
  it('load a csv pipe data', done => {
    const csv = `主键id,断面尺寸,附属物数量,管材,管道长度,管线埋深,管线起点覆土厚度,管线起点类型,管线终点覆土厚度,管线终点类型,属性编号,地下设施类型,地下设施管理信息主键,普查单元编号,区域,管线起点定位坐标x,管线起点定位坐标y,管线终点定位坐标x,管线终点定位坐标y,道路名称,排序id,管道起点地面高程,管道终点地面高程,管道起点埋深,管道终点埋深
27531,200,0,weldedSteelPipe,1,1.4,1.2,originDestination,1.2,turningPoint,3dd63440-bc95-11ec-f8d2-196ac9947dd5,gasPipeline,3c486850-bc95-11ec-f8d2-196ac9947dd5,46100972cb6347689b15ccfce7de7970,0102000020110F000002000000A205141D7B8869412BB4ECD771FB4A41C10957267B886941F8F58F3971FB4A41,120.2548881,30.2568753,120.2548907,30.2568657,坎红线,0,17.002,17.002,1.4,1.4
`;
    convertPipeCSV(csv, {
      startXCol: 15,
      startYCol: 16,
      endXCol: 17,
      endYCol: 18,
      startZCol: 23,
      endZCol: 24,
      sizeCol: 1,
      hasColName: true
    }).then(geojson => {
      assert(geojson.features.length === 1);
      const expected = {
        type: 'Feature',
        geometry: { type: 'LineString', coordinates: [[120.2548881,30.2568753,1.4],[120.2548907,30.2568657,1.4]] },
        properties: {
          '主键id': '27531',
          '断面尺寸': '200',
          '附属物数量': '0',
          '管材': 'weldedSteelPipe',
          '管道长度': '1',
          '管线埋深': '1.4',
          '管线起点覆土厚度': '1.2',
          '管线起点类型': 'originDestination',
          '管线终点覆土厚度': '1.2',
          '管线终点类型': 'turningPoint',
          '属性编号': '3dd63440-bc95-11ec-f8d2-196ac9947dd5',
          '地下设施类型': 'gasPipeline',
          '地下设施管理信息主键': '3c486850-bc95-11ec-f8d2-196ac9947dd5',
          '普查单元编号': '46100972cb6347689b15ccfce7de7970',
          '区域': '0102000020110F000002000000A205141D7B8869412BB4ECD771FB4A41C10957267B886941F8F58F3971FB4A41',
          '管线起点定位坐标x': '120.2548881',
          '管线起点定位坐标y': '30.2568753',
          '管线终点定位坐标x': '120.2548907',
          '管线终点定位坐标y': '30.2568657',
          '道路名称': '坎红线',
          '排序id': '0',
          '管道起点地面高程': '17.002',
          '管道终点地面高程': '17.002',
          '管道起点埋深': '1.4',
          '管道终点埋深': '1.4'
        }
      };
      assert.deepEqual(geojson.features[0], expected);
      done();
    });
  });
});