sap.ui.define([
], function () {
    "use strict";

    return {
        formatIcon: function (sPath) {
            if (sPath.startsWith("docs/guide")) {
                return "sap-icon://e-learning";
            } else if (sPath.startsWith("docs/api")) {
                return "sap-icon://education";
            }
            return "sap-icon://example";
        },

        formatTitle: function (sTitle) {
            return sTitle || this.getView().getModel("i18n").getResourceBundle().getText("untitled");
        },

        formatPath: function (sPath, sFlavor, sVersion) { // eslint-disable-line no-unused-vars
            return this.getOwnerComponent().getLinkUrl() + sPath;
        }
    };
});
