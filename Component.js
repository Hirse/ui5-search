sap.ui.define([
    "jquery.sap.global",
    "sap/ui/Device",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (jQuery, Device, UIComponent, JSONModel) {
    "use strict";

    var Component = UIComponent.extend("hirse.search.Component", {
        metadata: {
            manifest: "json"
        }
    });

    Component.prototype.init = function () {
        UIComponent.prototype.init.apply(this, arguments);

        var oModel = new JSONModel(Device);
        oModel.setDefaultBindingMode("OneWay");
        this.setModel(oModel, "device");

        this.setModel(new JSONModel("data/defaultResults.json"), "result");
        this.setModel(new JSONModel("data/settings.json"), "settings");
        this.setModel(new JSONModel({
            busy: false
        }), "state");

        this.getRouter().initialize();
    };

    Component.prototype.getLinkUrl = function () {
        var oModel = this.getModel("settings");
        var aUrl = ["https:/"];
        aUrl.push(oModel.getProperty("/flavors/" + oModel.getProperty("/selectedFlavor") + "/url"));
        var sVersionUrl = oModel.getProperty("/versions/" + oModel.getProperty("/selectedVersion") + "/url");
        if (sVersionUrl) {
            aUrl.push(sVersionUrl);
        }
        aUrl.push("#");
        return aUrl.join("/");
    };

    Component.prototype.getSearchUrl = function () {
        var oModel = this.getModel("settings");
        var sUrl = "https://cors-anywhere.herokuapp.com/";
        sUrl += oModel.getProperty("/flavors/" + oModel.getProperty("/selectedFlavor") + "/url");
        sUrl += "/search?q=";
        return sUrl;
    };

    return Component;
});
