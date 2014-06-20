var naivebayes  = module.exports = function (argument) {
  this.traindata = [];
}

naivebayes.prototype.train = function(traindata) {
  this.traindata = traindata;
}

naivebayes.prototype.run = function(testdata) {


  var result = {};
  for (var i = 0; i < this.traindata.length; i++) {
    var out = this.traindata[i].output;
    for(var key in out) {
      if (key in result) {
        result[key].push(i);
      } else {
        result[key] = [];
        result[key].push(i);
      }
    }
  }
  // console.log(JSON.stringify(result));

  // var probability = {};
  // for (var i = 0; i < this.traindata.length; i++) {
  //   var out = this.traindata[i].output;
  //   for(var key in out) {
  //     if (key === ) {};
  //   }
  // }
  var average = {};

  for (var key in result) {
    average[key] = {};
    for (var j = 0; j < result[key].length; j++) {
      var item = this.traindata[result[key][j]].input;
      // console.log(item);
      for (var property in item) {
        if (property in average[key]) {
          average[key][property] += item[property];
        } else {
          average[key][property] = item[property];
        }
      }
    }

  }

  for (var key in average) {
    for(var property in average[key]){
      average[key][property] /= result[key].length;
    }
  }

  // console.log(JSON.stringify(average));
  var variance = {};
  variance = Variance(result, average, this.traindata);

  var posterior = Posterior(result, average, variance, testdata);

  var posteriornumberator = {};
  for (var key in posterior) {
    posteriornumberator[key] = result[key].length / this.traindata.length;
    for (var property in posterior[key]) {
      posteriornumberator[key] *= posterior[key][property];
    }
  }

  return posteriornumberator;
  // console.log(JSON.stringify(posteriornumberator));

}

var Variance = function (result, average, data) {
  var variance = {};

  for (var key in result) {
    variance[key] = {};
    for (var i = 0; i < result[key].length; i++) {
      var item = data[result[key][i]].input;
      for (var property in item) {
        if (property in variance[key]) {
          variance[key][property] += Math.pow((item[property] - average[key][property]), 2);
        } else {
          variance[key][property] = Math.pow((item[property] - average[key][property]), 2);
        }
      }
    }
  }

  for (var key in variance) {
    for(var property in variance[key]){
      variance[key][property] /= result[key].length;
    }
  }
  // console.log(JSON.stringify(variance));


  return variance;
}

var Posterior = function(result, average, variance, testdata) {
  var posterior = {};
  for (var key in average) {
    posterior[key] = {};
    for (var property in average[key]) {
      var res = 1;
      res /= Math.sqrt(2 * Math.PI * variance[key][property]);
      res *= Math.exp(-1 * Math.pow((testdata[property] - average[key][property]), 2) / (2 * variance[key][property]));
      posterior[key][property] = res;
    }
  }
  // console.log(JSON.stringify(posterior));
  return posterior;
}