define([
	'intern!object',
	'intern/chai!assert',
	"dojo/_base/array",
	"dojo/_base/lang",
	'dojo/has!host-browser?dojo/domReady!:'
], function (registerSuite, assert, array, lang) {

	registerSuite({
		name: 'dojo/_base/array',
		'testIndexOf': function () {
			var foo = [128, 256, 512];
			var bar = ["aaa", "bbb", "ccc"];
			assert.deepEqual(1, array.indexOf([45, 56, 85], 56));
			assert.deepEqual(1, array.indexOf([Number, String, Date], String));
			assert.deepEqual(1, array.indexOf(foo, foo[1]));
			assert.deepEqual(2, array.indexOf(foo, foo[2]));
			assert.deepEqual(1, array.indexOf(bar, bar[1]));
			assert.deepEqual(2, array.indexOf(bar, bar[2]));
			assert.deepEqual(-1, array.indexOf({a:1}, "a"));

			foo.push(bar);
			assert.deepEqual(3, array.indexOf(foo, bar));
		},
		'testIndexOfFromIndex': function () {
			var foo = [128, 256, 512];
			var bar = ["aaa", "bbb", "ccc"];

			assert.deepEqual(-1, array.indexOf([45, 56, 85], 56, 2));
			assert.deepEqual(1, array.indexOf([45, 56, 85], 56, 1));
			assert.deepEqual(1, array.indexOf([45, 56, 85], 56, -3));
			// Make sure going out of bounds doesn't throw us in an infinite loop
			assert.deepEqual(-1, array.indexOf([45, 56, 85], 56, 3));
		},
		'testLastIndexOf': function () {
			var foo = [128, 256, 512];
			var bar = ["aaa", "bbb", "aaa", "ccc"];

			assert.deepEqual(1, array.indexOf([45, 56, 85], 56));
			assert.deepEqual(1, array.indexOf([Number, String, Date], String));
			assert.deepEqual(1, array.lastIndexOf(foo, foo[1]));
			assert.deepEqual(2, array.lastIndexOf(foo, foo[2]));
			assert.deepEqual(1, array.lastIndexOf(bar, bar[1]));
			assert.deepEqual(2, array.lastIndexOf(bar, bar[2]));
			assert.deepEqual(2, array.lastIndexOf(bar, bar[0]));
		},
		'testLastIndexOfFromIndex': function () {
			assert.deepEqual(1, array.lastIndexOf([45, 56, 85], 56, 1));
			assert.deepEqual(-1, array.lastIndexOf([45, 56, 85], 85, 1));
			assert.deepEqual(-1, array.lastIndexOf([45, 56, 85], 85, -2));
			assert.deepEqual(0, array.lastIndexOf([45, 56, 45], 45, 0));
		},
		'testForEach': function () {
			var foo = [128, "bbb", 512];
			array.forEach(foo, function(elt, idx, array){
				switch(idx){
					case 0: assert.deepEqual(128, elt); break;
					case 1: assert.deepEqual("bbb", elt); break;
					case 2: assert.deepEqual(512, elt); break;
					default: assert.ok(false);
				}
			});

			var noException = true;
			try{
				array.forEach(undefined, function(){});
			}catch(e){
				noException = false;
			}
			assert.ok(noException);
		},
		'testForEach_str': function () {
			var bar = 'abc';
			array.forEach(bar, function(elt, idx, array){
				switch(idx){
					case 0: assert.deepEqual("a", elt); break;
					case 1: assert.deepEqual("b", elt); break;
					case 2: assert.deepEqual("c", elt); break;
					default: assert.ok(false);
				}
			});
		},
		// FIXME: test forEach w/ a NodeList()?
		'testForEach_string_callback': function () {
			// Test using strings as callback", which accept the parameters with
			// the names "item", "index" and "array"!
			var foo = [128, "bbb", 512];
			// Test that the variable "item" contains the value of each item.
			var obj = {
				_res: ""
			};
			array.forEach(foo, "this._res += item", obj);
			assert.deepEqual(obj._res, "128bbb512");
			// Test that the variable "index" contains each index.
			obj._res = [];
			array.forEach(foo, "this._res.push(index)", obj);
			assert.deepEqual(obj._res, [0,1,2]);
			// Test that the variable "array" always contains the entire array.
			obj._res = [];
			array.forEach(foo, "this._res.push(array)", obj);
			assert.deepEqual(obj._res, [
				[128, "bbb", 512],
				[128, "bbb", 512],
				[128, "bbb", 512]
			]);
			// Catch undefined variable usage (I used to use "i" :-)).
			var caughtException = false;
			try{
				array.forEach(foo, "this._res += arr[i];", obj);
			}catch(e){
				caughtException = true;
			}
			assert.ok(caughtException);
		},
		// FIXME: test forEach w/ a NodeList()?
		'testEvery': function () {
			var foo = [128, "bbb", 512];

			assert.ok(
				array.every(foo, function(elt, idx, array){
					assert.deepEqual(Array, array.constructor);
					assert.ok(lang.isArray(array));
					assert.ok(typeof idx == "number");
					if(idx == 1){ assert.deepEqual("bbb" , elt); }
					return true;
				})
			);

			assert.ok(
				array.every(foo, function(elt, idx, array){
					switch(idx){
						case 0: assert.deepEqual(128, elt); return true;
						case 1: assert.deepEqual("bbb", elt); return true;
						case 2: assert.deepEqual(512, elt); return true;
						default: return false;
					}
				})
			);

			assert.notEqual( // intern chai has no assert.notOk
				array.every(foo, function(elt, idx, array){
					switch(idx){
						case 0: assert.deepEqual(128, elt); return true;
						case 1: assert.deepEqual("bbb", elt); return true;
						case 2: assert.deepEqual(512, elt); return false;
						default: return true;
					}
				})
			);

		},
		'testEvery_str': function () {
			var bar = 'abc';
			assert.ok(
				array.every(bar, function(elt, idx, array){
					switch(idx){
						case 0: assert.deepEqual("a", elt); return true;
						case 1: assert.deepEqual("b", elt); return true;
						case 2: assert.deepEqual("c", elt); return true;
						default: return false;
					}
				})
			);

			assert.notEqual( // intern chai has no assert.notOk
				array.every(bar, function(elt, idx, array){
					switch(idx){
						case 0: assert.deepEqual("a", elt); return true;
						case 1: assert.deepEqual("b", elt); return true;
						case 2: assert.deepEqual("c", elt); return false;
						default: return true;
					}
				})
			);
		},
		// FIXME: test NodeList for every()?
		'testSome': function () {
			var foo = [128, "bbb", 512];
			assert.ok(
				array.some(foo, function(elt, idx, array){
					assert.deepEqual(3, array.length);
					return true;
				})
			);

			assert.ok(
				array.some(foo, function(elt, idx, array){
					return idx < 1;

				})
			);

			assert.notEqual(
				array.some(foo, function(elt, idx, array){
					return false;
				})
			);

			assert.ok(
				array.some(foo, function(elt, idx, array){
					assert.deepEqual(Array, array.constructor);
					assert.ok(lang.isArray(array));
					assert.ok(typeof idx == "number");
					if(idx == 1){ assert.deepEqual("bbb" , elt); }
					return true;
				})
			);
		},
		'testSome_str': function () {
			var bar = 'abc';
			assert.ok(
				array.some(bar, function(elt, idx, array){
					assert.deepEqual(3, array.length);
					switch(idx){
						case 0: assert.deepEqual("a", elt); return true;
						case 1: assert.deepEqual("b", elt); return true;
						case 2: assert.deepEqual("c", elt); return true;
						default: return false;
					}
				})
			);

			assert.ok(
				array.some(bar, function(elt, idx, array){
					switch(idx){
						case 0: assert.deepEqual("a", elt); return true;
						case 1: assert.deepEqual("b", elt); return true;
						case 2: assert.deepEqual("c", elt); return false;
						default: return true;
					}
				})
			);

			assert.notEqual(
				array.some(bar, function(elt, idx, array){
					return false;
				})
			);
		},
		// FIXME: need to add scoping tests for all of these!!!
		'testFilter': function () {
			var foo = ["foo", "bar", 10];

			assert.deepEqual(["foo"],
				array.filter(foo, function(elt, idx, array){
					return idx < 1;
				})
			);

			assert.deepEqual(["foo"],
				array.filter(foo, function(elt, idx, array){
					return elt == "foo";
				})
			);

			assert.deepEqual([],
				array.filter(foo, function(elt, idx, array){
					return false;
				})
			);

			assert.deepEqual([10],
				array.filter(foo, function(elt, idx, array){
					return typeof elt == "number";
				})
			);
		},
		'testFilter_str': function () {
			var foo = "thinger blah blah blah";
			assert.deepEqual(["t", "h", "i"],
				array.filter(foo, function(elt, idx, array){
					return idx < 3;
				})
			);

			assert.deepEqual([],
				array.filter(foo, function(elt, idx, array){
					return false;
				})
			);
		},
		'testMap': function () {
			assert.deepEqual([],
				array.map([], function(){ return true; })
			);

			assert.deepEqual([1, 2, 3],
				array.map(["cat", "dog", "mouse"], function(elt, idx, array){
					return idx+1;
				})
			);
		}

	});
});
