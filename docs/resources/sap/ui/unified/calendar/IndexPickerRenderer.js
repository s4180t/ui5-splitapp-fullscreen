/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,t){var s,a={role:"gridcell",selected:false,label:"",describedby:""};e.openStart("div",t);e.class("sapMIP");e.openEnd();var l=t.getAggregation("header");e.renderControl(l);e.openStart("div");e.class("sapMIPContent");e.attr("role","grid");e.openEnd();for(var d=0;d<t.getRows();d++){e.openStart("div",t.getId()+"-"+d);e.class("sapMIPRow");e.attr("role","row");e.openEnd();var r=t.getSelectedIndex()+t.getPeriodSize()-1;for(var i=0;i<t.getColumns();i++){s=t.getStartIndex()+t.getColumns()*d+i;e.openStart("div");e.class("sapMIPItem");if(s===t.getSelectedIndex()){e.class("sapUiCalItemSel");e.class("sapUiCalItemSelStart");a["selected"]=true;a["describedby"]=a["describedby"]+" "+t.sId+"-Start"}else if(s===r){e.class("sapUiCalItemSel");e.class("sapUiCalItemSelEnd");a["selected"]=true;a["describedby"]=a["describedby"]+" "+t.sId+"-End"}else if(s>t.getSelectedIndex()&&s<r){e.class("sapUiCalItemSel");e.class("sapUiCalItemSelBetween");a["selected"]=true}else{a["selected"]=false}e.accessibilityState(null,a);e.class("sapUiCalItem");e.class("customWidth");e.attr("tabindex","-1");e.attr("data-sap-ui-index",s);e.openEnd();e.text(t._getFormatter()(s));e.close("div")}e.close("div")}e.close("div");e.close("div")};return e},true);
//# sourceMappingURL=IndexPickerRenderer.js.map