/**
 * @module dojo/Stateful
 */
/**
 * Base class for objects that provide named properties with optional getter/setter
 * control and the ability to watch for property changes <br/>
 *
 * The class also provides the functionality to auto-magically manage getters<br/>
 * and setters for object attributes/properties.<br/>
 *
 * Getters and Setters should follow the format of _xxxGetter or _xxxSetter where<br/>
 * the xxx is a name of the attribute to handle.<br/>
 * So an attribute of "foo" would have a custom getter of _fooGetter and a custom setter of _fooSetter.
 * @example <caption>create a new registry TODO: remove me, im just an example of using a caption on an example</caption>
 *      var obj = new dojo.Stateful();
 *      obj.watch("foo", function(){
 *          console.log("foo changed to " + this.get("foo"));
 *      });
 *      obj.set("foo","bar");
 * @class
 * @name module:dojo/Stateful
 * @param {string } ex1 description TODO:REMOVE - just an example of class constructor args
 * @param {string } ex2 description TODO:REMOVE - just an example of class constructor args
 *
 */
define(["./_base/declare", "./_base/lang", "./_base/array", "./when"], function(declare, lang, array, when){
	// module:
	//		dojo/Stateful

return declare("dojo.Stateful", null, /** @lends module:dojo/Stateful# */{
	// summary:
	//		Base class for objects that provide named properties with optional getter/setter
	//		control and the ability to watch for property changes
	//
	//		The class also provides the functionality to auto-magically manage getters
	//		and setters for object attributes/properties.
	//		
	//		Getters and Setters should follow the format of _xxxGetter or _xxxSetter where 
	//		the xxx is a name of the attribute to handle.  So an attribute of "foo" 
	//		would have a custom getter of _fooGetter and a custom setter of _fooSetter.
	//
	// example:
	//	|	require(["dojo/Stateful", function(Stateful) {
	//	|		var obj = new Stateful();
	//	|		obj.watch("foo", function(){
	//	|			console.log("foo changed to " + this.get("foo"));
	//	|		});
	//	|		obj.set("foo","bar");
	//	|	});

	// _attrPairNames: Hash
	//		Used across all instances a hash to cache attribute names and their getter 
	//		and setter names.
    /**
     * Used across all instances a hash to cache attribute names and their getter<br/>
     * and setter names.
     * @type {object}
     * @private
     */
	_attrPairNames: {},

    /**
     * Helper function for get() and set().
     *
     * Caches attribute name values so we don't do the string ops every time.
     * @param name
     * @return {*}
     * @private
     */
	_getAttrNames: function(name){
		// summary:
		//		Helper function for get() and set().
		//		Caches attribute name values so we don't do the string ops every time.
		// tags:
		//		private

		var apn = this._attrPairNames;
		if(apn[name]){ return apn[name]; }
		return (apn[name] = {
			s: "_" + name + "Setter",
			g: "_" + name + "Getter"
		});
	},
    /**
     * @param params
     */
	postscript: function(/*Object?*/ params){
		// Automatic setting of params during construction
		if (params){ this.set(params); }
	},
    /**
     * @summary Private function that does a get based off a hash of names
     * @param name
     * @param names Hash of names of custom attributes
     * @returns {*}
     * @private
     */
	_get: function(name, names){
		// summary:
		//		Private function that does a get based off a hash of names
		// names:
		//		Hash of names of custom attributes
		return typeof this[names.g] === "function" ? this[names.g]() : this[name];
	},

    /**
     * Get a named property on a Stateful object. The property may<br/>
     * potentially be retrieved via a getter method in subclasses. In the base class<br/>
     * this just retrieves the object's property.
     * @summary Get a property on a Stateful instance.
     * @example require(["dojo/Stateful", function(Stateful) {<br/>
     *      var stateful = new Stateful({foo: 3});
     *      stateful.get("foo") // returns 3
     *      stateful.foo // returns 3
     *  });
     * @param {string} name The property to get.
     * @return The property value on this Stateful instance.
     *
     */
	get: function(/*String*/name){
		// summary:
		//		Get a property on a Stateful instance.
		// name:
		//		The property to get.
		// returns:
		//		The property value on this Stateful instance.
		// description:
		//		Get a named property on a Stateful object. The property may
		//		potentially be retrieved via a getter method in subclasses. In the base class
		//		this just retrieves the object's property.
		// example:
		//	|	require(["dojo/Stateful", function(Stateful) {
		//	|		var stateful = new Stateful({foo: 3});
		//	|		stateful.get("foo") // returns 3
		//	|		stateful.foo // returns 3
		//	|	});

		return this._get(name, this._getAttrNames(name)); //Any
	},
    /**
     * Sets named properties on a stateful object and notifies any watchers of<br/>
     * the property. A programmatic setter may be defined in subclasses.<br/>
     * For example:<br/>
     * @summary Set a property on a Stateful instance
     * @param {string} name The property to set.
     * @param {String} value The value to set in the property.
     * @example <caption>set() may also be called with a hash of name/value pairs, ex:</caption>
     *  stateful = new dojo.Stateful();
     *  stateful.watch(function(name, oldValue, value){
     *     // this will be called on the set below
     *  }
     *  stateful.set(foo, 5);
     *
     * @example <caption>This is equivalent to calling set(foo, "Howdy") and set(bar, 3)</caption>
     *  myObj.set({
	 *      foo: "Howdy",
	 *      bar: 3
	 *  })
     * @returns {dojo.Stateful}
     */
	set: function(name, value){
		// summary:
		//		Set a property on a Stateful instance
		// name:
		//		The property to set.
		// value:
		//		The value to set in the property.
		// returns:
		//		The function returns this dojo.Stateful instance.
		// description:
		//		Sets named properties on a stateful object and notifies any watchers of
		//		the property. A programmatic setter may be defined in subclasses.
		// example:
		//	|	require(["dojo/Stateful", function(Stateful) {
		//	|		var stateful = new Stateful();
		//	|		stateful.watch(function(name, oldValue, value){
		//	|			// this will be called on the set below
		//	|		}
		//	|		stateful.set(foo, 5);
		//	set() may also be called with a hash of name/value pairs, ex:
		//	|		stateful.set({
		//	|			foo: "Howdy",
		//	|			bar: 3
		//	|		});
		//	|	});
		//	This is equivalent to calling set(foo, "Howdy") and set(bar, 3)

		// If an object is used, iterate through object
		if(typeof name === "object"){
			for(var x in name){
				if(name.hasOwnProperty(x) && x !="_watchCallbacks"){
					this.set(x, name[x]);
				}
			}
			return this;
		}

		var names = this._getAttrNames(name),
			oldValue = this._get(name, names),
			setter = this[names.s],
			result;
		if(typeof setter === "function"){
			// use the explicit setter
			result = setter.apply(this, Array.prototype.slice.call(arguments, 1));
		}else{
			// no setter so set attribute directly
			this[name] = value;
		}
		if(this._watchCallbacks){
			var self = this;
			// If setter returned a promise, wait for it to complete, otherwise call watches immediatly
			when(result, function(){
				self._watchCallbacks(name, oldValue, value);
			});
		}
		return this; // dojo/Stateful
	},
    /**
     * Directly change the value of an attribute on an object, bypassing any<br/>
     * accessor setter.  Also handles the calling of watch and emitting events.<br/>
     * It is designed to be used by descendent class when there are two values<br/>
     * of attributes that are linked, but calling .set() is not appropriate
     * @summary Internal helper for directly changing an attribute value.
     * @param name The property to set.
     * @param value The value to set in the property.
     * @returns {dojo.Stateful}
     * @private
     */
	_changeAttrValue: function(name, value){
		// summary:
		//		Internal helper for directly changing an attribute value.
		//
		// name: String
		//		The property to set.
		// value: Mixed
		//		The value to set in the property.
		//
		// description:
		//		Directly change the value of an attribute on an object, bypassing any 
		//		accessor setter.  Also handles the calling of watch and emitting events. 
		//		It is designed to be used by descendent class when there are two values 
		//		of attributes that are linked, but calling .set() is not appropriate.

		var oldValue = this.get(name);
		this[name] = value;
		if(this._watchCallbacks){
			this._watchCallbacks(name, oldValue, value);
		}
		return this; // dojo/Stateful
	},
    /**
     * @summary Watches a property for changes
     * @param {String} name Indicates the property to watch. This is optional (the callback may be the<br/>
     * only parameter), and if omitted, all the properties will be watched
     * @param {Function} callback The function to execute when the property changes. This will be called after<br/>
     * the property has been changed. The callback will be called with the |this|<br/>
     * set to the instance, the first argument as the name of the property, the<br/>
     * second argument as the old value and the third argument as the new value.
     * @returns An object handle for the watch. The unwatch method of this object<br/>
     *  can be used to discontinue watching this property:<pre class="prettyprint"><code>
     *      var watchHandle = obj.watch("foo", callback);
     *      watchHandle.unwatch(); // callback won't be called now
     *  </code></pre>
     *
     */
	watch: function(name, callback){
		// summary:
		//		Watches a property for changes
		// name:
		//		Indicates the property to watch. This is optional (the callback may be the
		//		only parameter), and if omitted, all the properties will be watched
		// returns:
		//		An object handle for the watch. The unwatch method of this object
		//		can be used to discontinue watching this property:
		//		|	var watchHandle = obj.watch("foo", callback);
		//		|	watchHandle.unwatch(); // callback won't be called now
		// callback:
		//		The function to execute when the property changes. This will be called after
		//		the property has been changed. The callback will be called with the |this|
		//		set to the instance, the first argument as the name of the property, the
		//		second argument as the old value and the third argument as the new value.

		var callbacks = this._watchCallbacks;
		if(!callbacks){
			var self = this;
			callbacks = this._watchCallbacks = function(name, oldValue, value, ignoreCatchall){
				var notify = function(propertyCallbacks){
					if(propertyCallbacks){
						propertyCallbacks = propertyCallbacks.slice();
						for(var i = 0, l = propertyCallbacks.length; i < l; i++){
							propertyCallbacks[i].call(self, name, oldValue, value);
						}
					}
				};
				notify(callbacks['_' + name]);
				if(!ignoreCatchall){
					notify(callbacks["*"]); // the catch-all
				}
			}; // we use a function instead of an object so it will be ignored by JSON conversion
		}
		if(!callback && typeof name === "function"){
			callback = name;
			name = "*";
		}else{
			// prepend with dash to prevent name conflicts with function (like "name" property)
			name = '_' + name;
		}
		var propertyCallbacks = callbacks[name];
		if(typeof propertyCallbacks !== "object"){
			propertyCallbacks = callbacks[name] = [];
		}
		propertyCallbacks.push(callback);

		// TODO: Remove unwatch in 2.0
		var handle = {};
		handle.unwatch = handle.remove = function(){
			var index = array.indexOf(propertyCallbacks, callback);
			if(index > -1){
				propertyCallbacks.splice(index, 1);
			}
		};
		return handle; //Object
	}

});

});
