/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/performance/Measurement","sap/ui/performance/XHRInterceptor","sap/ui/performance/trace/FESRHelper","sap/base/util/LoaderExtensions","sap/base/util/now","sap/base/util/uid","sap/base/Log","sap/ui/thirdparty/URI"],function(e,t,i,n,r,s,a,o){"use strict";var u=window.location.host,p="INTERACTION",d=false,f=[],g=v(),c={"application/zip":true,"application/vnd.rar":true,"application/gzip":true,"application/x-tar":true,"application/java-archive":true,"image/jpeg":true,"application/pdf":true},l="zip,rar,arj,z,gz,tar,lzh,cab,hqx,ace,jar,ear,war,jpg,jpeg,pdf,gzip";function m(e){var t=new o(e).host();return t&&t!==u}function h(e){var t=e.toString();var i="";for(var n=0;n<t.length;n+=2){i+=String.fromCharCode(parseInt(t.substr(n,2),16))}return i.trim()}function v(e){return{event:"startup",trigger:"undetermined",component:"undetermined",appVersion:"undetermined",start:e||window.performance.timing.fetchStart,end:0,navigation:0,roundtrip:0,processing:0,duration:0,requests:[],measurements:[],sapStatistics:[],requestTime:0,networkTime:0,bytesSent:0,bytesReceived:0,requestCompression:"X",busyDuration:0,id:s(),passportAction:"undetermined_startup_0"}}function y(e){if(e.start>g.start&&e.end<g.end){return e}}function S(e){var t=e.startTime>0&&e.startTime<=e.requestStart&&e.requestStart<=e.responseEnd;var i=g.start<=performance.timing.navigationStart+e.requestStart&&g.end>=performance.timing.navigationStart+e.responseEnd;return i&&t&&e.initiatorType==="xmlhttprequest"}function I(e){this.end=e.responseEnd>this.end?e.responseEnd:this.end;g.requestTime+=e.responseEnd-e.startTime;if(this.roundtripHigherLimit<=e.startTime){g.navigation+=this.navigationHigherLimit-this.navigationLowerLimit;g.roundtrip+=this.roundtripHigherLimit-this.roundtripLowerLimit;this.navigationLowerLimit=e.startTime;this.roundtripLowerLimit=e.startTime}if(e.responseEnd>this.roundtripHigherLimit){this.roundtripHigherLimit=e.responseEnd}if(e.requestStart>this.navigationHigherLimit){this.navigationHigherLimit=e.requestStart}}function L(e){var t={start:e[0].startTime,end:e[0].responseEnd,navigationLowerLimit:e[0].startTime,navigationHigherLimit:e[0].requestStart,roundtripLowerLimit:e[0].startTime,roundtripHigherLimit:e[0].responseEnd};e.forEach(I,t);g.navigation+=t.navigationHigherLimit-t.navigationLowerLimit;g.roundtrip+=t.roundtripHigherLimit-t.roundtripLowerLimit;if(g.networkTime){var i=g.requestTime-g.networkTime;g.networkTime=i/e.length}else{g.networkTime=0}if(g.processing===0){var n=g.start-window.performance.timing.fetchStart;g.duration=t.end-n;g.processing=t.start-n}}function b(t){if(g){var i=window.performance.getEntriesByType("resource");var n;g.end=t;g.processing=t-g.start;g.duration=g.processing;g.requests=i.filter(S);g.completeRoundtrips=0;g.measurements=e.filterMeasurements(y,true);if(g.requests.length>0){L(g.requests)}g.completeRoundtrips=g.requests.length;var r=g.processing-g.navigation-g.roundtrip;g.processing=r>-1?r:0;g.completed=true;Object.freeze(g);if(g.semanticStepName||g.duration>=2||g.requests.length>0||d){f.push(g);n=f[f.length-1];if(a.isLoggable()){a.debug("Interaction step finished: trigger: "+g.trigger+"; duration: "+g.duration+"; requests: "+g.requests.length,"Interaction.js")}}if(B.onInteractionFinished){B.onInteractionFinished(n)}g=null;H=null;d=false;R=false;A=false}}function T(e){var t,i;if(e){var n,r;n=sap.ui.require("sap/ui/core/Component");if(n){while(e&&e.getParent){r=n.getOwnerComponentFor(e);if(r||e instanceof n){r=r||e;var s=r.getManifestEntry("sap.app");t=s&&s.id||r.getMetadata().getName();i=s&&s.applicationVersion&&s.applicationVersion.version}e=e.getParent()}}}return{id:t?t:"undetermined",version:i?i:""}}var E=false,w=false,H,q,R=false,A=false,N,C=false,P=false,_=0,D=Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype,"src");function j(){Object.defineProperty(HTMLScriptElement.prototype,"src",{set:function(e){var t;if(!this.dataset.sapUiCoreInteractionHandled){t=B.notifyAsyncStep();this.addEventListener("load",function(){t()});this.addEventListener("error",function(){t()});this.dataset.sapUiCoreInteractionHandled="true"}D.set.call(this,e)},get:D.get})}function k(){t.register(p,"send",function(){if(this.pendingInteraction){this.pendingInteraction.bytesSent+=arguments[0]?arguments[0].length:0}});t.register(p,"setRequestHeader",function(e,t){if(!this.requestHeaderLength){this.requestHeaderLength=0}this.requestHeaderLength+=(e+"").length+(t+"").length});t.register(p,"open",function(){var e,t,i;function n(e){if(this.readyState===4){e()}}if(g){if(!m(arguments[1])){e=B.passportHeader.get(this);if(e&&e.length>=370){t=h(e.substring(150,230));if(parseInt(e.substring(8,10),16)>2){i=e.substring(372,404)}}if(!e||t&&i&&g.passportAction.endsWith(t)){this.addEventListener("readystatechange",O.bind(this,g.id))}this.addEventListener("readystatechange",n.bind(this,B.notifyAsyncStep()))}this.pendingInteraction=g}})}function z(e,t,i,n){var r=e.split(".").pop().split(/\#|\?/)[0];if(t==="gzip"||t==="br"||i in c||r&&l.indexOf(r)!==-1||n<1024){return true}else{return false}}function O(e){if(this.readyState===4){if(this.pendingInteraction&&!this.pendingInteraction.completed&&g.id===e){var t=this.getResponseHeader("content-length"),i=z(this.responseURL,this.getResponseHeader("content-encoding"),this.getResponseHeader("content-type"),t),n=this.getResponseHeader("sap-perf-fesrec");this.pendingInteraction.bytesReceived+=t?parseInt(t):0;this.pendingInteraction.bytesReceived+=this.getAllResponseHeaders().length;this.pendingInteraction.bytesSent+=this.requestHeaderLength||0;this.pendingInteraction.requestCompression=i&&this.pendingInteraction.requestCompression!==false;this.pendingInteraction.networkTime+=n?Math.round(parseFloat(n,10)/1e3):0;var r=this.getResponseHeader("sap-statistics");if(r){var s=window.performance.getEntriesByType("resource");this.pendingInteraction.sapStatistics.push({url:this.responseURL,statistics:r,timing:s?s[s.length-1]:undefined})}delete this.requestHeaderLength;delete this.pendingInteraction}}}var B={getAll:function(e){if(e){B.end(true)}return f},filter:function(e){var t=[];if(e){for(var i=0,n=f.length;i<n;i++){if(e(f[i])){t.push(f[i])}}}return t},getPending:function(){return g},clear:function(){f=[]},start:function(e,t){var n=r();if(g){b(n)}if(N){clearTimeout(N)}_=0;if(window.performance.clearResourceTimings){window.performance.clearResourceTimings()}var s=T(t);g=v(n);g.event=e;g.component=s.id;g.appVersion=s.version;g.start=n;if(t&&t.getId){g.trigger=t.getId();g.semanticStepName=i.getSemanticStepname(t,e)}if(a.isLoggable(null,"sap.ui.Performance")){console.time("INTERACTION: "+g.trigger+" - "+g.event)}if(a.isLoggable()){a.debug("Interaction step started: trigger: "+g.trigger+"; type: "+g.event,"Interaction.js")}},end:function(e){if(g){if(e){if(a.isLoggable(null,"sap.ui.Performance")){console.timeEnd("INTERACTION: "+g.trigger+" - "+g.event)}b(g.preliminaryEnd||r());if(a.isLoggable()){a.debug("Interaction ended...")}}else{g.preliminaryEnd=r()}}},getActive:function(){return E},setActive:function(e){if(e&&!E){k();j();n.notifyResourceLoading=B.notifyAsyncStep}E=e},notifyNavigation:function(){d=true},notifyShowBusyIndicator:function(e){e._sapui_fesr_fDelayedStartTime=r()+e.getBusyIndicatorDelay()},notifyHideBusyIndicator:function(e){if(e._sapui_fesr_fDelayedStartTime){var t=r()-e._sapui_fesr_fDelayedStartTime;B.addBusyDuration(t>0?t:0);delete e._sapui_fesr_fDelayedStartTime}},notifyStepStart:function(e,t,n){if(E){var r,s,a;if(!g&&H&&!w||n){if(n){r="startup"}else{r=e}B.start(r,t);g=B.getPending();if(g&&!g.completed&&B.onInteractionStarted){g.passportAction=B.onInteractionStarted(g,n)}if(H){q=H.srcControl}a=i.getSemanticStepname(q,e);if(t&&t.getId&&q&&t.getId()===q.getId()){A=true}else if(a){g.trigger=q.getId();g.semanticStepName=a;A=true}else{s=q;while(s&&s.getParent()){s=s.getParent();if(t.getId()===s.getId()){R=true;break}}}H=null;w=true;d=false;setTimeout(function(){H=null;w=false},0);C=false;B.notifyStepEnd(true)}else if(g&&q&&!A){s=q;a=i.getSemanticStepname(q,e);if(s&&t.getId()===s.getId()){g.trigger=t.getId();g.semanticStepName=a;g.event=e;A=true}else if(a){g.trigger=q.getId();g.semanticStepName=a;A=true}else if(!R){while(s&&s.getParent()){s=s.getParent();if(t.getId()===s.getId()){g.trigger=t.getId();g.semanticStepName=i.getSemanticStepname(t,e);g.event=e;break}}}}}},notifyAsyncStep:function(e){if(g){if(a.isLoggable(null,"sap.ui.Performance")&&e){console.time(e)}var t=g.id;delete g.preliminaryEnd;B.notifyAsyncStepStart();return function(){B.notifyAsyncStepEnd(t);if(a.isLoggable(null,"sap.ui.Performance")&&e){console.timeEnd(e)}}}else{return function(){}}},notifyAsyncStepStart:function(){if(g){_++;clearTimeout(N);C=false;if(a.isLoggable()){a.debug("Interaction relevant step started - Number of pending steps: "+_)}}},notifyAsyncStepEnd:function(e){if(g&&e===g.id){_--;B.notifyStepEnd(true);if(a.isLoggable()){a.debug("Interaction relevant step stopped - Number of pending steps: "+_)}}},notifyStepEnd:function(e){if(E&&!P){if(_===0||!e){if(C||!e){B.end(true);if(a.isLoggable()){a.debug("Interaction stopped")}C=false}else{B.end();C=true;if(N){clearTimeout(N)}N=setTimeout(B.notifyStepEnd,301);if(a.isLoggable()){a.debug("Interaction check for idle time - Number of pending steps: "+_)}}}}},notifyEventStart:function(e){H=E?e:null},notifyScrollEvent:function(e){},notifyEventEnd:function(){if(H){if(H.type.match(/^(mousedown|touchstart|keydown)$/)){B.end(true)}if(this.eventEndTimer){clearTimeout(this.eventEndTimer)}this.eventEndTimer=setTimeout(function(){H=null;delete this.eventEndTimer}.bind(this),10)}},onInteractionStarted:null,onInteractionFinished:null,setStepComponent:function(e){if(E&&g&&e&&!g.stepComponent){g.stepComponent=e}},addBusyDuration:function(e){if(E&&g){if(!g.busyDuration){g.busyDuration=0}g.busyDuration+=e}}};return B});
//# sourceMappingURL=Interaction.js.map