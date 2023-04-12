/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"./QuickActionItem"
], function (
	QuickActionItem
) {
	"use strict";

	/**
	 * Constructor for a new <code>QuickGroupItem</code>.
	 *
	 * @param {string} [sId] ID for the new <code>QuickGroupItem</code>, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new <code>QuickGroupItem</code>
	 *
	 * @class
	 * The <code>QuickGroupItem</code> class is used for items for the <code>sap.m.table.columnmenu.QuickGroup</code>.
	 * It can be used to specify control- and application-specific items for grouping.
	 *
	 * @extends sap.m.table.columnmenu.QuickActionItem
	 *
	 * @author SAP SE
	 * @version 1.112.0
	 *
	 * @public
	 * @since 1.110
	 *
	 * @alias sap.m.table.columnmenu.QuickGroupItem
	 */
	var QuickGroupItem = QuickActionItem.extend("sap.m.table.columnmenu.QuickGroupItem", {

		metadata: {
			library: "sap.m",
			properties: {
				/**
				 * Specifies whether the respective column is grouped.
				 */
				grouped: { type: "boolean", defaultValue: false }
			}
		}
	});

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	QuickGroupItem.prototype.setGrouped = function(bGrouped) {
		this.setProperty("grouped", bGrouped);

		var oQuickGroup = this.getParent();
		if (oQuickGroup) {
			oQuickGroup._updateContent();
		}
	};

	return QuickGroupItem;
});