define([
	'intern!object',
	'intern/chai!assert',
	"dojo/_base/array",
	"dojo/_base/Color",
	'dojo/has!host-browser?dojo/domReady!:'
], function (registerSuite, assert, array, Color) {
	var white  = Color.fromString("white").toRgba();
	var maroon = Color.fromString("maroon").toRgba();
	var verifyColor = function(source, expected){
		var color = new Color(source);
		assert.deepEqual(expected, color.toRgba());
		array.forEach(color.toRgba(), function(n){
			assert.deepEqual("number", typeof(n));
		});
	};
	registerSuite({
		name: 'dojo/_base/Color',

		'testColor1': function () {
			verifyColor("maroon", maroon);
		},
		'testColor2': function () {
			verifyColor("white", white);
		},
		'testColor3': function () {
			verifyColor("#fff", white);
		},
		'testColor4': function () {
			verifyColor("#ffffff", white);
		},
		'testColor5': function () {
			verifyColor("rgb(255,255,255)", white);
		},
		'testColor6': function () {
			verifyColor("#800000", maroon);
		},
		'testColor7': function () {
			verifyColor("rgb(128, 0, 0)", maroon);
		},
		'testColor8': function () {
			verifyColor("rgba(128, 0, 0, 0.5)", [128, 0, 0, 0.5]);
		},
		'testColor9': function () {
			verifyColor(maroon, maroon);
		},
		'testColor10': function () {
			verifyColor([1, 2, 3], [1, 2, 3, 1]);
		},
		'testColor11': function () {
			verifyColor([1, 2, 3, 0.5], [1, 2, 3, 0.5]);
		},
		'testColor12': function () {
			verifyColor(Color.blendColors(new Color("black"), new Color("white"), 0.5), [128, 128, 128, 1]);
		}

	});
});
