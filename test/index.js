var assert = require("assert")

// Example mocha assertion
describe('Array', function(){
  describe('#forEach()', function(){
    it('should execute for every value', function(){
      var array = [ 1, 2, 3, 4, 5 ], count = 0;
      array.forEach(function(){ count += 1; });
      assert.equal( count, array.length );
    });
  });
});

