define([
	'intern!object',
	'intern/chai!assert',
	"../../AdapterRegistry",
	'intern/dojo/has!host-browser?intern/dojo/domReady!:'
], function (registerSuite, assert, AdapterRegistry) {

	registerSuite({
		name: 'dojo/AdapterRegistry',

		'constructor': function () {
			var taa = new AdapterRegistry();
			assert.strictEqual(taa.pairs.length, 0);
			assert.isFalse(taa.returnWrappers);

			var taa = new AdapterRegistry(true);
			assert.isTrue(taa.returnWrappers);
		},
		'.register': function () {
			var taa = new AdapterRegistry();
			taa.register("blah",
				function(str){ return str == "blah"; },
				function(){ return "blah"; }
			);
			assert.strictEqual(taa.pairs.length, 1);
			assert.strictEqual(taa.pairs[0][0], "blah");

			taa.register("thinger");
			taa.register("prepend", null, null, true, true);
			assert.strictEqual(taa.pairs[0][0], "prepend");
			assert.isTrue(taa.pairs[0][3]);
		},
		'.match' : {
			'no match': function () {
				var taa = new AdapterRegistry();
				assert.throws(function() {
					taa.match("blah");
				});
			},
			'returnWrappers': function () {
				var taa = new AdapterRegistry();
				taa.register("blah",
					function(str){ return str == "blah"; },
					function(){ return "blah"; }
				);
				assert.strictEqual(taa.match("blah"), "blah");

				taa.returnWrappers = true;
				assert.strictEqual(taa.match("blah")(), "blah");
			}
		},
		'.unregister': function () {
			var taa = new AdapterRegistry();
			taa.register("blah",
				function(str){ return str == "blah"; },
				function(){ return "blah"; }
			);
			taa.register("thinger");
			taa.register("prepend", null, null, true, true);
			taa.unregister("prepend");
			assert.strictEqual(taa.pairs.length, 2);
			assert.strictEqual(taa.pairs[0][0], "blah");
		}
	});

});
