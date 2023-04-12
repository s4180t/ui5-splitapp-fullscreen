/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/json/JSONModel","sap/m/VBox","sap/ui/core/Control","sap/m/Column","sap/m/Text","sap/ui/model/Filter","sap/m/Table","sap/m/OverflowToolbar","sap/m/SearchField","sap/m/ToolbarSpacer","sap/m/OverflowToolbarButton","sap/m/OverflowToolbarLayoutData","sap/ui/core/dnd/DragDropInfo"],function(t,e,o,i,n,s,r,a,l,h,p,_,u){"use strict";var g=o.extend("sap.m.p13n.BasePanel",{metadata:{library:"sap.m",interfaces:["sap.m.p13n.IContent"],associations:{},properties:{title:{type:"string"},enableReorder:{type:"boolean",defaultValue:true},_useFixedWidth:{type:"boolean",defaultValue:false,visibility:"hidden"}},aggregations:{messageStrip:{type:"sap.m.MessageStrip",multiple:false},_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_template:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{change:{parameters:{reason:{type:"string"},item:{type:"sap.m.p13n.Item"}}}}},renderer:{apiVersion:2,render:function(t,e){t.openStart("div",e);t.style("height","100%");if(e.getProperty("_useFixedWidth")){t.style("width",e.getWidth())}t.openEnd();t.renderControl(e.getAggregation("_content"));t.close("div")}}});g.prototype.P13N_MODEL="$p13n";g.prototype.CHANGE_REASON_ADD="Add";g.prototype.CHANGE_REASON_REMOVE="Remove";g.prototype.CHANGE_REASON_MOVE="Move";g.prototype.CHANGE_REASON_SELECTALL="SelectAll";g.prototype.CHANGE_REASON_DESELECTALL="DeselectAll";g.prototype.CHANGE_REASON_RANGESELECT="RangeSelect";g.prototype.PRESENCE_ATTRIBUTE="visible";g.prototype.WIDTH="30rem";g.prototype.init=function(){o.prototype.init.apply(this,arguments);this._oP13nModel=new t({});this._oP13nModel.setSizeLimit(1e4);this.setModel(this._oP13nModel,this.P13N_MODEL);this._oListControl=this._createInnerListControl();this._bFocusOnRearrange=true;this._setInnerLayout();this._oListControl.setMultiSelectMode("ClearAll")};g.prototype.onAfterRendering=function(){if(!this._oResizeObserver){this._oResizeObserver=new ResizeObserver(this._onResize.bind(this))}this._oResizeObserver.observe(this.getDomRef())};g.prototype._setInnerLayout=function(){this.setAggregation("_content",new e({items:[this._oListControl]}))};g.prototype.setP13nData=function(t){this._getP13nModel().setProperty("/items",t);return this};g.prototype.getP13nData=function(t){var e=this._getP13nModel().getProperty("/items");if(t){e=e.filter(function(t){return t[this.PRESENCE_ATTRIBUTE]}.bind(this))}return e};g.prototype.setMessageStrip=function(t){if(!t){this.getAggregation("_content").removeItem(this._oMessageStrip);this._oMessageStrip=null}else{t.addStyleClass("sapUiSmallMargin");if(this._oMessageStrip){this._oMessageStrip.destroy()}this._oMessageStrip=t;this.getAggregation("_content").insertItem(t,0)}return this};g.prototype.getMessageStrip=function(){return this._oMessageStrip};g.prototype.getWidth=function(){return this.WIDTH};g.prototype._updateMovement=function(t){var e=this.getAggregation("_template");if(t){this._addHover(e)}else if(e&&e.aDelegates&&e.aDelegates.length>0){e.removeEventDelegate(e.aDelegates[0].oDelegate)}this._getDragDropConfig().setEnabled(t);this._setMoveButtonVisibility(t);return this};g.prototype.setEnableReorder=function(t){this.setProperty("enableReorder",t);this._updateMovement(t);return this};g.prototype._getDragDropConfig=function(){if(!this._oDragDropInfo){this._oDragDropInfo=new u({enabled:false,sourceAggregation:"items",targetAggregation:"items",dropPosition:"Between",drop:[this._onRearrange,this]})}return this._oDragDropInfo};g.prototype._getMoveTopButton=function(){if(!this._oMoveTopBtn){this._oMoveTopBtn=new p(this.getId()+"-moveTopBtn",{type:"Transparent",tooltip:this._getResourceText("p13n.MOVE_TO_TOP"),icon:"sap-icon://collapse-group",press:[this._onPressButtonMoveToTop,this],visible:false});this.addDependent(this._oMoveTopBtn)}return this._oMoveTopBtn};g.prototype._getMoveUpButton=function(){if(!this._oMoveUpButton){this._oMoveUpButton=new p(this.getId()+"-moveUpBtn",{type:"Transparent",tooltip:this._getResourceText("p13n.MOVE_UP"),icon:"sap-icon://navigation-up-arrow",press:[this._onPressButtonMoveUp,this],visible:false});this.addDependent(this._oMoveUpButton)}return this._oMoveUpButton};g.prototype._getMoveDownButton=function(){if(!this._oMoveDownButton){this._oMoveDownButton=new p(this.getId()+"-moveDownpBtn",{type:"Transparent",tooltip:this._getResourceText("p13n.MOVE_DOWN"),icon:"sap-icon://navigation-down-arrow",press:[this._onPressButtonMoveDown,this],visible:false});this.addDependent(this._oMoveDownButton)}return this._oMoveDownButton};g.prototype._getMoveBottomButton=function(){if(!this._oMoveBottomButton){this._oMoveBottomButton=new p(this.getId()+"-moveBottomBtn",{type:"Transparent",tooltip:this._getResourceText("p13n.MOVE_TO_BOTTOM"),icon:"sap-icon://expand-group",press:[this._onPressButtonMoveToBottom,this],visible:false});this.addDependent(this._oMoveBottomButton)}return this._oMoveBottomButton};g.prototype._onResize=function(t){var e=t[0].contentRect;if(this._oMoveTopBtn){this._oMoveTopBtn.setVisible(e.width>400)}if(this._oMoveBottomButton){this._oMoveBottomButton.setVisible(e.width>400)}};g.prototype._createInnerListControl=function(){return new r(this.getId()+"-innerP13nList",Object.assign(this._getListControlConfig(),{headerToolbar:new a({content:[this._getSearchField(),new h,this._getMoveTopButton(),this._getMoveUpButton(),this._getMoveDownButton(),this._getMoveBottomButton()]})}))};g.prototype._addHover=function(t){if(t&&t.aDelegates.length<1){t.addEventDelegate({onmouseover:this._hoverHandler.bind(this),onfocusin:this._focusHandler.bind(this)})}};g.prototype._focusHandler=function(t){if(!this.getEnableReorder()){return}var e=sap.ui.getCore().byId(t.currentTarget.id);this._handleActivated(e)};g.prototype._hoverHandler=function(t){if(this._oSelectedItem&&!this._oSelectedItem.bIsDestroyed){return}if(!this.getEnableReorder()){return}var e=sap.ui.getCore().byId(t.currentTarget.id);this._handleActivated(e)};g.prototype._handleActivated=function(t){this._oHoveredItem=t};g.prototype._getListControlConfig=function(){return{mode:"MultiSelect",rememberSelections:true,itemPress:[this._onItemPressed,this],selectionChange:[this._onSelectionChange,this],sticky:["HeaderToolbar","ColumnHeaders","InfoToolbar"],dragDropConfig:this._getDragDropConfig()}};g.prototype._getSearchField=function(){if(!this._oSearchField){this._oSearchField=new l(this.getId()+"-searchField",{liveChange:[this._onSearchFieldLiveChange,this],width:"100%",layoutData:new _({shrinkable:true,moveToOverflow:true,priority:"High",maxWidth:"16rem"})})}return this._oSearchField};g.prototype.getInitialFocusedControl=function(){return this._oSearchField};g.prototype._setTemplate=function(t){t.setType("Active");var e=this.getAggregation("_template");if(e){e.destroy()}this.setAggregation("_template",t);if(t){if(this.getEnableReorder()){this._addHover(t)}this._oSelectionBindingInfo=t.getBindingInfo("selected");if(this._oSelectionBindingInfo&&this._oSelectionBindingInfo.parts){this._oSelectionBindingInfo={parts:this._oSelectionBindingInfo.parts}}}this._bindListItems();return this};g.prototype._setPanelColumns=function(t){var e;if(t instanceof Array){e=t}else{e=[t]}this._addTableColumns(e)};g.prototype._getP13nModel=function(){return this.getModel(this.P13N_MODEL)};g.prototype._getResourceText=function(t,e){this.oResourceBundle=this.oResourceBundle?this.oResourceBundle:sap.ui.getCore().getLibraryResourceBundle("sap.m");return t?this.oResourceBundle.getText(t,e):this.oResourceBundle};g.prototype._addTableColumns=function(t){var e=this._oListControl.removeAllColumns();e.forEach(function(t){t.destroy()});t.forEach(function(t){var e;if(typeof t=="string"){e=new i({header:new n({text:t})})}else{e=t}this._oListControl.addColumn(e)},this)};g.prototype._bindListItems=function(t){var e=this.getAggregation("_template");if(e){this._oListControl.bindItems(Object.assign({path:this.P13N_MODEL+">/items",key:"name",templateShareable:false,template:this.getAggregation("_template").clone()},t))}};g.prototype._onSelectionChange=function(t){var e=t.getParameter("listItems");var o=this._checkSpecialChangeReason(t.getParameter("selectAll"),t.getParameter("listItems"));e.forEach(function(t){this._selectTableItem(t,!!o)},this);if(o){var i=[];e.forEach(function(t){i.push(this._getModelEntry(t))},this);this.fireChange({reason:o,item:i})}if(o===this.CHANGE_REASON_DESELECTALL){this._getMoveTopButton().setEnabled(false);this._getMoveUpButton().setEnabled(false);this._getMoveDownButton().setEnabled(false);this._getMoveBottomButton().setEnabled(false)}};g.prototype._checkSpecialChangeReason=function(t,e){var o;if(t){o=this.CHANGE_REASON_SELECTALL}else if(!t&&e.length>1&&!e[0].getSelected()){o=this.CHANGE_REASON_DESELECTALL}else if(e.length>1&&e.length<this._oListControl.getItems().length){o=this.CHANGE_REASON_RANGESELECT}return o};g.prototype._onItemPressed=function(t){var e=t.getParameter("listItem");this._oSelectedItem=e;var o=e.getBindingContext(this.P13N_MODEL);if(this.getEnableReorder()&&o&&o.getProperty(this.PRESENCE_ATTRIBUTE)){this._handleActivated(e);this._updateEnableOfMoveButtons(e,true)}};g.prototype._onSearchFieldLiveChange=function(t){this._oListControl.getBinding("items").filter(new s("label","Contains",t.getSource().getValue()))};g.prototype._onPressButtonMoveToTop=function(){this._moveSelectedItem(0)};g.prototype._onPressButtonMoveUp=function(){this._moveSelectedItem("Up")};g.prototype._onPressButtonMoveDown=function(){this._moveSelectedItem("Down")};g.prototype._onPressButtonMoveToBottom=function(){var t=this._oListControl.getItems().length-1;this._moveSelectedItem(t)};g.prototype._setMoveButtonVisibility=function(t){this._getMoveTopButton().setVisible(t);this._getMoveUpButton().setVisible(t);this._getMoveDownButton().setVisible(t);this._getMoveBottomButton().setVisible(t)};g.prototype._filterBySelected=function(t,e){e.getBinding("items").filter(t?new s(this.PRESENCE_ATTRIBUTE,"EQ",true):[])};g.prototype._selectTableItem=function(t,e){this._updateEnableOfMoveButtons(t,e?false:true);this._oSelectedItem=t;if(!e){var o=this._getP13nModel().getProperty(this._oSelectedItem.getBindingContext(this.P13N_MODEL).sPath);this.fireChange({reason:o[this.PRESENCE_ATTRIBUTE]?this.CHANGE_REASON_ADD:this.CHANGE_REASON_REMOVE,item:o})}};g.prototype._moveSelectedItem=function(t){var e=this._oSelectedItem;var o=this._oListControl.indexOfItem(e);if(o<0){return}var i=typeof t=="number"?t:o+(t=="Up"?-1:1);this._moveTableItem(e,i)};g.prototype._getModelEntry=function(t){return t.getBindingContext(this.P13N_MODEL).getObject()};g.prototype._moveTableItem=function(t,e){var o=this._oListControl.getItems();var i=this._getP13nModel().getProperty("/items");var n=i.indexOf(this._getModelEntry(t));e=e<=0?0:Math.min(e,o.length-1);e=i.indexOf(this._getModelEntry(o[e]));if(e==n){return}i.splice(e,0,i.splice(n,1)[0]);this._getP13nModel().setProperty("/items",i);this._oSelectedItem=this._oListControl.getItems()[e];this._updateEnableOfMoveButtons(this._oSelectedItem,this._bFocusOnRearrange);this._handleActivated(this._oSelectedItem);this.fireChange({reason:this.CHANGE_REASON_MOVE,item:this._getModelEntry(t)})};g.prototype._onRearrange=function(t){var e=t.getParameter("draggedControl");var o=t.getParameter("droppedControl");var i=t.getParameter("dropPosition");var n=this._oListControl.indexOfItem(e);var s=this._oListControl.indexOfItem(o);var r=s+(i=="Before"?0:1)+(n<s?-1:0);this._moveTableItem(e,r)};g.prototype._updateEnableOfMoveButtons=function(t,e){var o=this._oListControl.getItems().indexOf(t);var i=true,n=true;if(o==0){i=false}if(o==this._oListControl.getItems().length-1){n=false}this._getMoveTopButton().setEnabled(i);this._getMoveUpButton().setEnabled(i);this._getMoveDownButton().setEnabled(n);this._getMoveBottomButton().setEnabled(n);if(e){t.focus()}};g.prototype.exit=function(){o.prototype.exit.apply(this,arguments);this._oResizeObserver=null;this._bFocusOnRearrange=null;this._oHoveredItem=null;this._oSelectionBindingInfo=null;this._oSelectedItem=null;this._oListControl=null;this._oMoveTopBtn=null;this._oMoveUpButton=null;this._oMoveDownButton=null;this._oMoveBottomButton=null;this._oSearchField=null};return g});
//# sourceMappingURL=BasePanel.js.map