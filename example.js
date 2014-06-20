var naivebayes = require('./lib/naivebayes');

var nb = new naivebayes();

// nb.train([  {input: { r: 0.03, g: 0.7, b: 0.5 },  output: { black: 1 }},
//             {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
//             {input: { r: 0.5, g: 0.5, b: 1.0 },   output: { white: 1 }}]);

// var output = nb.run({ r: 1, g: 0.4, b: 0 });  // { white: 0.99, black: 0.002 }

// 性别  身高(英尺) 体重(磅) 脚的尺寸(英寸)
// 男    6         180     12
// 男    5.92      190     11
// 男    5.58      170     12
// 男    5.92      165     10
// 女    5         100     6
// 女    5.5       150     8
// 女    5.42      130     7
// 女    5.75      150     9

nb.train([  {input: {height: 6,     weight: 180, footsize: 12}, output: {m: 1}},
            {input: {height: 5.92,  weight: 190, footsize: 11}, output: {m: 1}},
            {input: {height: 5.58,  weight: 170, footsize: 11}, output: {m: 1}},
            {input: {height: 5.92,  weight: 165, footsize: 10}, output: {m: 1}},
            {input: {height: 5,     weight: 100, footsize:  6}, output: {f: 1}},
            {input: {height: 5.5,   weight: 150, footsize:  8}, output: {f: 1}},
            {input: {height: 5.42,  weight: 130, footsize:  7}, output: {f: 1}},
            {input: {height: 5.75,  weight: 150, footsize:  9}, output: {f: 1}}]);

var output = nb.run({height:6, weight: 130, footsize: 8});
console.log(JSON.stringify(output));