/*!
* OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/core/library","sap/ui/Device","sap/m/HyphenationSupport","./TextRenderer"],function(e,t,i,n,r,a,o){"use strict";var p=n.TextAlign;var s=n.TextDirection;var l=e.WrappingType;var h=e.EmptyIndicatorMode;var u=i.extend("sap.m.Text",{metadata:{interfaces:["sap.ui.core.IShrinkable","sap.ui.core.IFormContent","sap.ui.core.ISemanticFormContent","sap.m.IHyphenation","sap.m.IToolbarInteractiveControl"],library:"sap.m",properties:{text:{type:"string",defaultValue:"",bindable:"bindable"},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:s.Inherit},wrapping:{type:"boolean",group:"Appearance",defaultValue:true},wrappingType:{type:"sap.m.WrappingType",group:"Appearance",defaultValue:l.Normal},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:p.Begin},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},maxLines:{type:"int",group:"Appearance",defaultValue:null},renderWhitespace:{type:"boolean",group:"Appearance",defaultValue:false},emptyIndicatorMode:{type:"sap.m.EmptyIndicatorMode",group:"Appearance",defaultValue:h.Off}},designtime:"sap/m/designtime/Text.designtime"},renderer:o});u.prototype.normalLineHeight=1.2;u.prototype.cacheLineHeight=true;u.prototype.ellipsis="...";u.hasNativeLineClamp="webkitLineClamp"in document.documentElement.style;u.setNodeValue=function(e,t){t=t||"";var i=e.childNodes;if(i.length===1&&i[0].nodeType===window.Node.TEXT_NODE){i[0].nodeValue=t}else{e.textContent=t}};u.prototype.getText=function(e){var t=this.getProperty("text");if(e){return t.replace(/\r\n|\n\r|\r/g,"\n")}return t};u.prototype.onAfterRendering=function(){if(this.getVisible()&&this.hasMaxLines()&&!this.canUseNativeLineClamp()){if(t.isThemeApplied()){this.clampHeight()}else{t.attachThemeChanged(this._handleThemeLoad,this)}}};u.prototype._handleThemeLoad=function(){this.clampHeight();t.detachThemeChanged(this._handleThemeLoad,this)};u.prototype.hasMaxLines=function(){return this.getWrapping()&&this.getMaxLines()>1};u.prototype.getTextDomRef=function(){if(!this.getVisible()){return null}if(this.hasMaxLines()){return this.getDomRef("inner")}return this.getDomRef()};u.prototype.canUseNativeLineClamp=function(){if(!u.hasNativeLineClamp){return false}if(this.getTextDirection()==s.RTL){return false}if(this.getTextDirection()==s.Inherit&&t.getConfiguration().getRTL()){return false}return true};u.prototype.getLineHeight=function(e){if(this.cacheLineHeight&&this._fLineHeight){return this._fLineHeight}e=e||this.getTextDomRef();if(!e){return 0}var t=window.getComputedStyle(e),i=t.lineHeight,n;if(/px$/i.test(i)){n=parseFloat(i)}else if(/^normal$/i.test(i)){n=parseFloat(t.fontSize)*this.normalLineHeight}else{n=parseFloat(t.fontSize)*parseFloat(i)}if(!r.browser.firefox){n=Math.floor(n)}if(this.cacheLineHeight&&n){this._fLineHeight=n}return n};u.prototype.getClampHeight=function(e){e=e||this.getTextDomRef();return this.getMaxLines()*this.getLineHeight(e)};u.prototype.clampHeight=function(e){e=e||this.getTextDomRef();if(!e){return 0}var t=this.getClampHeight(e);if(t){e.style.maxHeight=t+"px"}return t};u.prototype.clampText=function(e,t,i){e=e||this.getTextDomRef();if(!e){return}var n;var r=this.getText(true);var a=this.getClampHeight(e);t=t||0;i=i||r.length;u.setNodeValue(e,r.slice(0,i));if(e.scrollHeight>a){var o=e.style,p=o.height,s=this.ellipsis,l=s.length;o.height=a+"px";while(i-t>l){n=t+i>>1;u.setNodeValue(e,r.slice(0,n-l)+s);if(e.scrollHeight>a){i=n}else{t=n}}if(e.scrollHeight>a&&t>0){n=t;e.textContent=r.slice(0,n-l)+s}o.height=p}return n};u.prototype.getAccessibilityInfo=function(){return{description:this.getText()}};u.prototype._getToolbarInteractive=function(){return false};u.prototype.getTextsToBeHyphenated=function(){return{main:this.getText(true)}};u.prototype.getDomRefsForHyphenatedTexts=function(){return{main:this.getTextDomRef()}};a.mixInto(u.prototype);return u});
//# sourceMappingURL=Text.js.map