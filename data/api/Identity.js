define(["../../_base/declare", "./Read"], function(declare, Read){

// module:
//		dojo/data/api/Identity
    /**
     * @constructor myns.Identity
     * @augments myns.Read
     * @summary This is an abstract API that data provider implementations conform to.<br/>
     *  This file defines methods signatures and intentionally leaves all the<br/>
     *  methods unimplemented.
     */
return declare("dojo.data.api.Identity", Read, /** @lends myns.Identity.prototype */{
	// summary:
	//		This is an abstract API that data provider implementations conform to.
	//		This file defines methods signatures and intentionally leaves all the
	//		methods unimplemented.

    /**
     * See dojo/data/api/Read.getFeatures()
     * @returns {{dojo.data.api.Read: boolean, dojo.data.api.Identity: boolean}}
     */
	getFeatures: function(){
		// summary:
		//		See dojo/data/api/Read.getFeatures()
		return {
			'dojo.data.api.Read': true,
			'dojo.data.api.Identity': true
		};
	},

    /**
     * Returns a unique identifier for an item.  The return value will be<br/>
     *  either a string or something that has a toString() method (such as,<br/>
     *  for example, a dojox/uuid object).
     * @param item The item from the store from which to obtain its identifier.
     * @throws Conforming implementations may throw an exception or return null if<br/>
     *  item is not an item.
     *
     * @example
     *  var itemId = store.getIdentity(kermit);
     *  assert(kermit === store.findByIdentity(store.getIdentity(kermit)));
     */
	getIdentity: function(/* dojo/data/api/Item */ item){
		// summary:
		//		Returns a unique identifier for an item.  The return value will be
		//		either a string or something that has a toString() method (such as,
		//		for example, a dojox/uuid object).
		// item:
		//		The item from the store from which to obtain its identifier.
		// exceptions:
		//		Conforming implementations may throw an exception or return null if
		//		item is not an item.
		// example:
		//	|	var itemId = store.getIdentity(kermit);
		//	|	assert(kermit === store.findByIdentity(store.getIdentity(kermit)));
		throw new Error('Unimplemented API: dojo.data.api.Identity.getIdentity');
	},

    /**
     * Returns an array of attribute names that are used to generate the identity.<br/>
     * For most stores, this is a single attribute, but for some complex stores<br/>
     * such as RDB backed stores that use compound (multi-attribute) identifiers<br/>
     * it can be more than one.  If the identity is not composed of attributes<br/>
     * on the item, it will return null.  This function is intended to identify<br/>
     * the attributes that comprise the identity so that so that during a render<br/>
     * of all attributes, the UI can hide the the identity information if it<br/>
     * chooses.
     * @param item The item from the store from which to obtain the array of public attributes that<br/>
     *  compose the identifier, if any.
     * @example
     *  var itemId = store.getIdentity(kermit);
     *  var identifiers = store.getIdentityAttributes(itemId);
     *  assert(typeof identifiers === "array" || identifiers === null);
     */
	getIdentityAttributes: function(/* dojo/data/api/Item */ item){
		// summary:
		//		Returns an array of attribute names that are used to generate the identity.
		//		For most stores, this is a single attribute, but for some complex stores
		//		such as RDB backed stores that use compound (multi-attribute) identifiers
		//		it can be more than one.  If the identity is not composed of attributes
		//		on the item, it will return null.  This function is intended to identify
		//		the attributes that comprise the identity so that so that during a render
		//		of all attributes, the UI can hide the the identity information if it
		//		chooses.
		// item:
		//		The item from the store from which to obtain the array of public attributes that
		//		compose the identifier, if any.
		// example:
		//	|	var itemId = store.getIdentity(kermit);
		//	|	var identifiers = store.getIdentityAttributes(itemId);
		//	|	assert(typeof identifiers === "array" || identifiers === null);
		throw new Error('Unimplemented API: dojo.data.api.Identity.getIdentityAttributes');
	},

    /**
     * Given the identity of an item, this method returns the item that has<br/>
     *  that identity through the onItem callback.  Conforming implementations<br/>
     *  should return null if there is no item with the given identity.<br/>
     *  Implementations of fetchItemByIdentity() may sometimes return an item<br/>
     *  from a local cache and may sometimes fetch an item from a remote server,<br/>
     * @param keywordArgs An anonymous object that defines the item to locate and callbacks to invoke when the<br/>
     *  item has been located and load has completed.  The format of the object is as follows:<br/>
     * @param keywordArgs An anonymous object that defines the item to locate and callbacks to invoke when the<br/>
     *  item has been located and load has completed.  The format of the object is as follows:<br/>
     * @param {String|Object} keywordArgs.identity
     * @param {Function} keywordArgs.onItem
     * @param {Function} keywordArgs.onError Function
     * @param {Object}keywordArgs.scope
     *
     */
	fetchItemByIdentity: function(/* object */ keywordArgs){
		// summary:
		//		Given the identity of an item, this method returns the item that has
		//		that identity through the onItem callback.  Conforming implementations
		//		should return null if there is no item with the given identity.
		//		Implementations of fetchItemByIdentity() may sometimes return an item
		//		from a local cache and may sometimes fetch an item from a remote server,
		// keywordArgs:
		//		An anonymous object that defines the item to locate and callbacks to invoke when the
		//		item has been located and load has completed.  The format of the object is as follows:
		// |	{
		// |		identity: string|object,
		// |		onItem: Function,
		// |		onError: Function,
		// |		scope: object
		// |	}
		//
		//	 	####The *identity* parameter
		//
		//		The identity parameter is the identity of the item you wish to locate and load
		//		This attribute is required.  It should be a string or an object that toString()
		//		can be called on.
		//
		//	 	####The *onItem* parameter
		//
		//		Function(item)
		//		The onItem parameter is the callback to invoke when the item has been loaded.  It takes only one
		//		parameter, the item located, or null if none found.
		//
		//	 	####The *onError* parameter
		//
		//		Function(error)
		//		The onError parameter is the callback to invoke when the item load encountered an error.  It takes only one
		//		parameter, the error object
		//
		//	 	####The *scope* parameter
		//
		//		If a scope object is provided, all of the callback functions (onItem,
		//		onError, etc) will be invoked in the context of the scope object.
		//		In the body of the callback function, the value of the "this"
		//		keyword will be the scope object.   If no scope object is provided,
		//		the callback functions will be called in the context of dojo.global.
		//		For example, onItem.call(scope, item, request) vs.
		//		onItem.call(dojo.global, item, request)

		if(!this.isItemLoaded(keywordArgs.item)){
			throw new Error('Unimplemented API: dojo.data.api.Identity.fetchItemByIdentity');
		}
	}
});

});
