sap.ui.define([
    "jquery.sap.global",
    "sap/ui/core/mvc/Controller",
    "hirse/search/model/ResultFormatter"
], function (jQuery, Controller, ResultFormatter) {
    "use strict";

    var SearchController = Controller.extend("hirse.search.controller.Search", {
        formatter: ResultFormatter
    });

    SearchController.prototype.onSettingsPress = function () {
        if (!this.oSettingsDialog) {
            this.oSettingsDialog = sap.ui.xmlfragment("hirse.search.view.SettingsDialog", this);
            this.getView().addDependent(this.oSettingsDialog);
        }
        this.oSettingsDialog.open();
    };

    SearchController.prototype.onOkButtonPress = function () {
        this.oSettingsDialog.close();
    };

    SearchController.prototype.onSearch = function (oEvent) {
        var sQuery = oEvent.getParameter("query").trim();
        var oResultModel = this.getView().getModel("result");
        if (sQuery) {
            this.getView().getModel("state").setProperty("/busy", true);
            oResultModel.loadData(this.getOwnerComponent().getSearchUrl() + sQuery);
            oResultModel.attachEventOnce("requestCompleted", this.onRequestCompleted, this);
        } else {
            oResultModel.loadData("data/defaultResults.json");
        }
    };

    SearchController.prototype.onRequestCompleted = function () {
        this.getView().getModel("state").setProperty("/busy", false);
    };

    SearchController.prototype.onItemPress = function (oEvent) {
        var sLinkUrl = this.getOwnerComponent().getLinkUrl();
        window.open(sLinkUrl + oEvent.getSource().getBindingContext("result").getProperty("path"));
    };

    return SearchController;
});
