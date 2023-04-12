sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/core/Popup", "sap/m/Button", "sap/ui/core/CustomData"], function (UIComponent, Popup, Button, CustomData) {
    "use strict";

    const masterData = new CustomData({
        key: "visible",
        value: "X",
        writeToDom: true
    });
    const detailData = new CustomData({
        key: "visible",
        value: "X",
        writeToDom: true
    });
    return UIComponent.extend("sap.m.sample.SplitApp.Component", {
        metadata: {
            manifest: "json"
        },
        state: 0,
        onAfterRendering: function () {
            setTimeout(() => {
                const master = this.getRootControl().byId("SplitAppDemo-Master");
                const detail = this.getRootControl().byId("SplitAppDemo-Detail");
                if (!master.getCustomData().length) master.addCustomData(masterData);
                if (!detail.getCustomData().length) detail.addCustomData(detailData);
            });
        },
        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
            new Popup(
                new Button({
                    text: "Switch",
                    press: function () {
                        switch (this.state) {
                            case 0:
                                masterData.setValue("");
                                detailData.setValue("X");
                                this.state = 1;
                                break;
                            case 1:
                                masterData.setValue("X_FS");
                                detailData.setValue("");
                                this.state = 2;
                                break;
                            default:
                                masterData.setValue("X");
                                detailData.setValue("X");
                                this.state = 0;
                                break;
                        }
                    }.bind(this)
                })
            ).open();
        }
    });
});
