/*
Copyright (c) 2010, Toby Ho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/* ============= Array methods added in ECMAScript 5 ================ */
(function(){ 
    /* An anonymous function called once avoid to create a global arrayMethods function.
     */

    var undefined; // cache the undefined value for quick access and to prevent uncontrolled undefined overrides
    
    function arrayMethods(methods){
      var arrProto = Array.prototype;
      for (var name in methods){
        var method = methods[name];
        arrProto[name] = /*arrProto[name] ||*/ methods[name];
      }
    }

    
    arrayMethods({
      forEach: function forEach(iter){
        var i, l, context = arguments[1];

        if(typeof iter !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
            throw new TypeError("Array.prototype.forEach method. First argument is not callable.");
        
        for (i = 0, l = this.length ; i < l; i++){ // a for-in would not guarantee the elements to be traversed in the right ordre (ES5 12.6.4)
            if(i in this)
                iter.call(context, this[i], i, this);
        }
      }
      ,
      reduce: function reduce(accumlator){
        var i, l = this.length, curr;
        
        if(typeof accumlator !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
            throw new TypeError("Array.prototype.reduce method. First argument is not callable");

        if((l == 0 || l === null) && (arguments.length <= 1))// == on purpose to test 0 and false.
            throw new TypeError("Array.prototype.reduce method. length is 0 and no second argument");
        
        if(arguments.length <= 1){
            for(i=0 ; i<l && !(i in this) ; i++){} // find the first defined element in the array if there is one
            
            if(i>=l) // empty array
                throw new TypeError("Array.prototype.reduce method. Empty array and no second argument");
            
            curr = this[i++]; // Increase i to start searching the secondly defined element in the array
        }
        else{
            curr = arguments[1];
        }
        
        for(i = i || 0 ; i < l ; i++){
            if(i in this)
                curr = accumlator.call(undefined, curr, this[i], i, this);
        }
        
        return curr;
      }
      ,
      reduceRight: function reduceRight(accumlator){
        var i, l = this.length, curr;
        
        if(typeof accumlator !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
            throw new TypeError("Array.prototype.reduce method. First argument is not callable");

        if((l == 0 || l === null) && (arguments.length <= 1)) // == on purpose to test 0 and false.
            throw new TypeError("Array.prototype.reduce method. length is 0 and no second argument");
        
        if(arguments.length <= 1){
            for(i=l-1 ; i>=0 && !(i in this) ; i--){} // find the last defined element in the array if there is one
            
            if(i<0) // empty array
                throw new TypeError("Array.prototype.reduce method. Empty array and no second argument");
            
            curr = this[i--]; // Decrease i to start searching the secondly defined element in the array in reverse order
        }
        else{
            curr = arguments[1];
        }
        
        for(i = i || l-1 ; i >=0 ; i--){
            if(i in this)
                curr = accumlator.call(undefined, curr, this[i], i, this);
        }
        
        return curr;
      }
      ,
      map: function map(func){
        var ret;
        var i;
        var context = arguments[1];
        var l = this.length;
    
        if(typeof func !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
            throw new TypeError("Array.prototype.map method. First argument is not callable");
  
        ret = new Array(this.length);
  
        this.forEach(function(e,i,a){
                        ret[i] = func.call(context, e, i, a);
                     });
        
        return ret;
      }
      ,
      filter: function filter(accept){
        var context = arguments[1];
        var ret;
        
        if(typeof accept !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
            throw new TypeError("Array.prototype.filter method. First argument is not callable");

        ret = new Array();
        
        this.forEach(function(e, i, a){
            if(accept.call(context, e, i, a) === true)
                ret.push(e);
        });
            
        return ret;/* 
            
        
        return this.reduce(function(curr, item, i, arr){
          return accept.call(context, item, i, arr) ? curr.concat(item) : curr;
        }, []); */
      }
      ,
      every: function(predicate){
        var context = arguments[1];
        if (typeof predicate != 'function')
          throw new TypeError();
        return this.reduce(function(curr, item, i, arr){
          return curr && predicate.call(context, item, i, arr);
        }, true);
      }
      ,
      some: function(predicate){
        var context = arguments[1];
        if (typeof predicate != 'function')
          throw new TypeError();
        return this.reduce(function(curr, item, i, arr){
          return curr || predicate.call(context, item, i, arr);
        }, false);
      }
      ,
      indexOf: function(target){
        var fromIndex = arguments[1];
        fromIndex = typeof(fromIndex) == 'boolean' ? 
          (fromIndex ? 1 : 0) :
          parseInt(fromIndex) || 0;
        if (fromIndex < 0)
          fromIndex = this.length + fromIndex;
        for (var i = fromIndex; i < this.length; i++)
          if (this[i] === target) return i;
        return -1;
      }
      ,
      lastIndexOf: function(target){
        var fromIndex = arguments.length > 1 ? arguments[1] : this.length - 1;
        if (typeof(fromIndex) == 'boolean')
          fromIndex = fromIndex ? 1 : 0;
        else
          fromIndex = parseInt(fromIndex) || 0;
        if (fromIndex < 0)
            fromIndex = this.length + fromIndex;
        for (var i = fromIndex; i >= 0; i--)
          if (this[i] === target) return i;
        return -1;
      }
    });
    
})();

