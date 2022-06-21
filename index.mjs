import { parse } from 'csv-parse';

export function convertPipeCSV(csvStr, options) {
  const { startXCol, startYCol, startZCol, endXCol, endYCol, endZCol, sizeCol, hasColName }  = options;
  return new Promise((resolve, reject) => {
    parse(csvStr, {}, (err, csv) => {
      if (err) {
        reject(err);
        return;
      }
      let start = 0;
      let titles;
      if (hasColName) {
        start = 1;        
      }
      titles = {};
      for (let i = 0; i < csv[0].length; i++) {
        if (hasColName) {
          titles[i] = csv[0][i];
        } else {
          titles[i] = i; 
        }
      }

      const output = [];
      for (let i = start; i < csv.length; i++) {
        const x0 = csv[i][startXCol];
        const y0 = csv[i][startYCol];
        const z0 = csv[i][startZCol];

        const x1 = csv[i][endXCol];
        const y1 = csv[i][endYCol];
        const z1 = csv[i][endZCol];

        const size = csv[i][sizeCol];

        const properties = csv[i].reduce((value, v, idx) => {
          value[titles[idx]] = v;
          return value;
        }, {});

        output.push({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [[+x0, +y0, +z0], [+x1, +y1, +z1]]
          },
          properties
        });
      }
      resolve({
        type: 'FeatureCollection',
        features: output
      });
    });
  });
  
  
}

function isNil(v) {
  return v === null || v === undefined;
}