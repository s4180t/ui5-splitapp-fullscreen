/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/BindingMode","sap/ui/model/ClientModel","sap/ui/model/Context","./MessageListBinding","./MessagePropertyBinding","sap/base/Log"],function(e,t,n,i,o,s){"use strict";var r=t.extend("sap.ui.model.message.MessageModel",{constructor:function(n){t.apply(this,arguments);this.sDefaultBindingMode=e.OneWay;this.mSupportedBindingModes={OneWay:true,TwoWay:false,OneTime:false};this.oMessageManager=n}});r.prototype.setData=function(e){this.oData=e;this.checkUpdate()};r.prototype.fireMessageChange=function(e){this.fireEvent("messageChange",e);return this};r.prototype.bindProperty=function(e,t,n){var i=new o(this,e,t,n);return i};r.prototype.bindList=function(e,t,n,o,s){var r=new i(this,e,t,n,o,s);return r};r.prototype.setProperty=function(e,t,n){s.error(this+"not implemented: Only 'OneWay' binding mode supported")};r.prototype.getProperty=function(e,t){return this._getObject(e,t)};r.prototype._getObject=function(e,t){var i;if(t instanceof n){i=this._getObject(t.getPath())}else if(t){i=t}if(!e){return i}var o=e.split("/"),s=0;if(!o[0]){i=this.oData;s++}while(i&&o[s]){i=i[o[s]];s++}return i};return r});
//# sourceMappingURL=MessageModel.js.map