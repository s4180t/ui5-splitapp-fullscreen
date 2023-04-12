/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/core/Element","sap/ui/core/delegate/ItemNavigation","sap/ui/core/Item","./SelectListRenderer","sap/base/Log"],function(e,t,i,s,o,n,r,a){"use strict";var l=e.touch;var u=e.SelectListKeyboardNavigationMode;var c=i.extend("sap.m.SelectList",{metadata:{library:"sap.m",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},showSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},_columnRatio:{type:"sap.m.SelectColumnRatio",group:"Appearance",visibility:"hidden"},_tabIndex:{type:"string",group:"Misc",visibility:"hidden",defaultValue:""},keyboardNavigationMode:{type:"sap.m.SelectListKeyboardNavigationMode",group:"Behavior",defaultValue:u.Delimited},hideDisabledItems:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}},itemPress:{parameters:{item:{type:"sap.ui.core.Item"}}}}},renderer:r});c.prototype._setSelectedIndex=function(e,t){var i;t=t||this.getItems();e=e>t.length-1?t.length-1:Math.max(0,e);i=t[e];if(i){this.setSelection(i)}};c.prototype.updateItems=function(e,t){this.bItemsUpdated=false;this.destroyItems();this.updateAggregation("items");this.bItemsUpdated=true;if(t&&(t.detailedReason==="AddVirtualContext"||t.detailedReason==="RemoveVirtualContext")){this._bHasVirtualContext=true;return}this._bHasVirtualContext=false;this.synchronizeSelection({forceSelection:false});setTimeout(this.synchronizeSelection.bind(this),0)};c.prototype.refreshItems=function(){this.bItemsUpdated=false;this.refreshAggregation("items")};c.prototype._activateItem=function(e){if(e instanceof n&&e&&e.getEnabled()){this.fireItemPress({item:e});if(this.getSelectedItem()!==e){this.setSelection(e);this.fireSelectionChange({selectedItem:e})}}};c.prototype._queryEnabledItemsDomRefs=function(){return this.getItems().reduce(function(e,t){if(t.getEnabled()&&!t.isA("sap.ui.core.SeparatorItem")){e.push(t.getDomRef())}return e},[])};c.prototype._handleARIAActivedescendant=function(){var e=s.closestTo(document.activeElement),t=this.getDomRef();if(e&&t){t.setAttribute("aria-activedescendant",e.getId())}};c.prototype.init=function(){this._iStartTimeout=0;this._iActiveTouchId=0;this._fStartX=0;this._fStartY=0;this._oItemNavigation=null;this._$ItemPressed=null};c.prototype.onBeforeRendering=function(){this.synchronizeSelection({forceSelection:false})};c.prototype.onAfterRendering=function(){if(this.getKeyboardNavigationMode()===u.None){this.destroyItemNavigation()}else{this.createItemNavigation()}};c.prototype.exit=function(){this.destroyItemNavigation();this._$ItemPressed=null};c.prototype.ontouchstart=function(e){if(l.countContained(e.touches,this.getId())>1||!this.getEnabled()){return}e.setMarked();var t=e.targetTouches[0];this._iActiveTouchId=t.identifier;this._fStartX=t.pageX;this._fStartY=t.pageY;this._iStartTimeout=setTimeout(function(){var t=e.srcControl.$();if(t){t.addClass(this.getRenderer().CSS_CLASS+"ItemBasePressed");this._$ItemPressed=t}}.bind(this),100)};c.prototype.ontouchmove=function(e){var t=null;if(!this.getEnabled()){return}t=l.find(e.changedTouches,this._iActiveTouchId);if(t&&(Math.abs(t.pageX-this._fStartX)>10||Math.abs(t.pageY-this._fStartY)>10)){clearTimeout(this._iStartTimeout);if(this._$ItemPressed){this._$ItemPressed.removeClass(this.getRenderer().CSS_CLASS+"ItemBasePressed");this._$ItemPressed=null}}};c.prototype.ontouchend=function(e){var t=null;if(!this.getEnabled()){return}e.setMarked();t=l.find(e.changedTouches,this._iActiveTouchId);if(t){setTimeout(function(){if(this._$ItemPressed){this._$ItemPressed.removeClass(this.getRenderer().CSS_CLASS+"ItemBasePressed");this._$ItemPressed=null}this._iStartTimeout=null}.bind(this),100)}};c.prototype.ontouchcancel=c.prototype.ontouchend;c.prototype.ontap=function(e){if(this.getEnabled()){e.setMarked();this._activateItem(e.srcControl)}};c.prototype.onsapselect=function(e){if(this.getEnabled()){e.setMarked();e.preventDefault();this._activateItem(e.srcControl)}};c.prototype.onAfterFocus=function(e){this._handleARIAActivedescendant()};c.prototype.findFirstEnabledItem=function(e){e=e||this.getItems();for(var t=0;t<e.length;t++){if(e[t].getEnabled()){return e[t]}}return null};c.prototype.setSelection=function(e){this.setAssociation("selectedItem",e,true);this.setProperty("selectedItemId",e instanceof n?e.getId():e);if(typeof e==="string"){e=t.byId(e)}this.setProperty("selectedKey",e?e.getKey():"",true);return this};c.prototype.synchronizeSelection=function(e){var t=this.getSelectedKey(),i=this.getItemByKey(""+t),s=true;if(e){s=!!e.forceSelection}if(this.isSelectionSynchronized({selectedKey:t,firstItemWithKey:i,forceSelection:s})){return}if(i&&t!==""){this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",i.getId(),true)}else if(s&&!this._bHasVirtualContext&&this.getDefaultSelectedItem()&&(!this.isBound("items")||this.bItemsUpdated)){try{this.setSelection(this.getDefaultSelectedItem())}catch(e){a.warning("Update failed due to exception. Loggable in support mode log",null,null,function(){return{exception:e}})}}};c.prototype.isSelectionSynchronized=function(e){var t=this.getSelectedItem(),i,s,o;if(e){i=e.selectedKey;s=e.firstItemWithKey;o=e.forceSelection}else{i=this.getSelectedKey();s=this.getItemByKey(i);o=this.getForceSelection()}if(o){if(!t){return false}if(i===""&&t.getKey()===""){return true}return i===t.getKey()&&t===s}else{if(t===null&&i===""){return true}if(i===""){return false}return i===(t&&t.getKey())&&t===s}};c.prototype.getForceSelection=function(){return false};c.prototype.findLastEnabledItem=function(e){e=e||this.getItems();return this.findFirstEnabledItem(e.reverse())};c.prototype.getVisibleItems=function(){for(var e=0,t,i=this.getItems(),s=[];e<i.length;e++){t=i[e];if(t.bVisible||t.bVisible===undefined){s.push(t)}}return s};c.prototype._getColumnsPercentages=function(){var e=this.getProperty("_columnRatio"),t,i,s;if(!e){return null}t=e.split(":").map(function(e){return parseInt(e)});i=t[0]+t[1];s=Math.round(t[0]/i*100);return{firstColumn:s+"%",secondColumn:100-s+"%"}};c.prototype.getSelectableItems=function(){return this.getEnabledItems(this.getVisibleItems()).filter(function(e){return!e.isA("sap.ui.core.SeparatorItem")})};c.prototype.findItem=function(e,t){var i="get"+e.charAt(0).toUpperCase()+e.slice(1);for(var s=0,o=this.getItems();s<o.length;s++){if(o[s][i]()===t){return o[s]}}return null};c.prototype.getItemByText=function(e){return this.findItem("text",e)};c.prototype.isItemSelected=function(e){return e&&e.getId()===this.getAssociation("selectedItem")};c.prototype._getNonSeparatorItemsCount=function(){return this.getEnabledItems().filter(function(e){return!e.isA("sap.ui.core.SeparatorItem")}).length};c.prototype.getDefaultSelectedItem=function(e){return null};c.prototype.clearSelection=function(){this.setSelection(null)};c.prototype.createItemNavigation=function(){var e;if(!this._oItemNavigation){this._oItemNavigation=new o(null,null,!this.getEnabled());this._oItemNavigation.attachEvent(o.Events.AfterFocus,this.onAfterFocus,this);this._oItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]});this.addEventDelegate(this._oItemNavigation)}e=this.getDomRef();this._oItemNavigation.setRootDomRef(e);this._oItemNavigation.setItemDomRefs(this._queryEnabledItemsDomRefs(e));this._oItemNavigation.setCycling(false);this._oItemNavigation.setSelectedIndex(this.indexOfItem(this.getSelectedItem()));this._oItemNavigation.setPageSize(10)};c.prototype.destroyItemNavigation=function(){if(this._oItemNavigation){this.removeEventDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null}};c.prototype.getItemNavigation=function(){return this._oItemNavigation};c.prototype.setSelectedItem=function(e){if(typeof e==="string"){this.setAssociation("selectedItem",e,true);e=t.byId(e)}if(!(e instanceof n)&&e!==null){return this}if(!e){e=this.getDefaultSelectedItem()}this.setSelection(e);return this};c.prototype.setSelectedItemId=function(e){e=this.validateProperty("selectedItemId",e);this.setSelection(e);return this};c.prototype.setSelectedKey=function(e){e=this.validateProperty("selectedKey",e);var t=this.getItemByKey(e);if(t||e===""){if(!t&&e===""){t=this.getDefaultSelectedItem()}this.setSelection(t);return this}return this.setProperty("selectedKey",e)};c.prototype.getSelectedItem=function(){var e=this.getAssociation("selectedItem");return e===null?null:t.byId(e)||null};c.prototype.getItemAt=function(e){return this.getItems()[+e]||null};c.prototype.getFirstItem=function(){return this.getItems()[0]||null};c.prototype.getLastItem=function(){var e=this.getItems();return e[e.length-1]||null};c.prototype.getEnabledItems=function(e){e=e||this.getItems();return e.filter(function(e){return e.getEnabled()})};c.prototype.getItemByKey=function(e){return this.findItem("key",e)};c.prototype.removeItem=function(e){e=this.removeAggregation("items",e);if(this.getItems().length===0){this.clearSelection()}else if(this.isItemSelected(e)){this.setSelection(this.getDefaultSelectedItem())}return e};c.prototype.removeAllItems=function(){var e=this.removeAllAggregation("items",true);this.$().children("li").remove();return e};c.prototype.destroyItems=function(){this.destroyAggregation("items",true);return this};c.prototype.setNoDataText=function(){};return c});
//# sourceMappingURL=SelectList.js.map