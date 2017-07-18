Box.Application.addService("confirmation-modal-service", function (context) {
    var confirmationModalService = (function ($, undefined) {
        var _externals = {},
            /*
             * Selector Constants
             */
            CONFIRMATION_BUTTON_CLASS = "confirmation-button",
            CONFIRMATION_CANCEL_BUTTON_CLASS = "cancel-button",
            CONFIRMATION_ICON_MESSAGE_CLASS = "confirmation-icon-message",
            CONFIRMATION_MODAL_ID = "confirmation-modal",
            CONFIRMATION_MODAL_TITLE_CLASS = "modal-title",
            CONFIRMATION_TEXT_CLASS = "confirmation-text",
            CONFIRMATION_NOTE_CLASS = "confirmation-note",
            /*
             * Utility Constants
             */
            STR_UNDEFINED = "undefined";

        function _attachConfirmEvent(modal, onConfirm) {             
            var confirmButton = $(("." + CONFIRMATION_BUTTON_CLASS), modal);

            if (typeof onConfirm !== STR_UNDEFINED) {
                confirmButton.one("click", function (e) {
                    _closeModal();
                    onConfirm(e);
                });
            }
        }

        function _attachCloseEvent(modal, onClose) {
            var confirmButton = $(("." + CONFIRMATION_BUTTON_CLASS), modal);

            modal.one("hide.bs.modal", function (e) {
                confirmButton.off("click");

                if (typeof onClose !== STR_UNDEFINED)
                    onClose(e);
            });
        }

        function _closeModal() {
            $("#" + CONFIRMATION_MODAL_ID).modal("hide");
        }

        function _setModalCancelButtonMessage(modal, text) {
            var confirmationText = $(("." + CONFIRMATION_CANCEL_BUTTON_CLASS), modal);

            confirmationText.text(text);
        }

        function _setModalDeleteButtonMessage(modal, text) {
            var confirmationText = $(("." + CONFIRMATION_BUTTON_CLASS), modal);

            confirmationText.text(text);
        }

        function _setModalActionMessage(modal, text) {
            var confirmationText = $(("." + CONFIRMATION_ICON_MESSAGE_CLASS), modal);

            confirmationText.text(text);
        }

        function _setModalMessage(modal, text) {
            var confirmationText = $(("." + CONFIRMATION_TEXT_CLASS), modal);

            confirmationText.text(text);
        }

        function _setModalNoteMessage(modal, text) {
            var confirmationText = $(("." + CONFIRMATION_NOTE_CLASS), modal);

            confirmationText.text(text);
        }

        function _setModalTitleMessage(modal, text) {
            var confirmationText = $(("." + CONFIRMATION_MODAL_TITLE_CLASS), modal);

            confirmationText.text(text);
        }

        /*
         * Public Members
         */
        _externals.show = function (params) {
            var input = params || {},
                modal = $("#" + CONFIRMATION_MODAL_ID);

            if (typeof modal !== STR_UNDEFINED
                    && modal.length > 0) {

                _setModalTitleMessage(modal, input.modalTitle);
                _setModalActionMessage(modal, input.actionMessage);
                _setModalMessage(modal, input.confirmationMessage);
                _setModalNoteMessage(modal, input.confirmationNoteMessage);
                _setModalCancelButtonMessage(modal, input.cancelButtonText);
                _setModalDeleteButtonMessage(modal, input.confirmButtonText);
                _attachCloseEvent(modal, input.onClose);
                _attachConfirmEvent(modal, input.onConfirm);

                modal.modal("show");
            }
        };

        return _externals;
    })(jQuery);

    return confirmationModalService;
});