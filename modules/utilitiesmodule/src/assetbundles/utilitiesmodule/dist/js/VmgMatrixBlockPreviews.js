function VmgMatrixBlockPreviews(previews) {
    if ($("#fields-mainContentBlocks-field").length > 0) {
        var $window = $(window);

        var $sidebar = $("#details .meta.read-only");

        // add a preview div to the sidebar
        var $previewWindow = $("<div>")
            .addClass("vmgmatrixblockpreview-window meta")
            .insertAfter($sidebar);

        var $innerDiv = $("<div>")
            .addClass("data")
            .appendTo($previewWindow);

        // add a label to the preview window
        $("<h5>")
            .addClass("vmgmatrixblockpreview-window-label heading")
            .text("Example Block Rendering:")
            .appendTo($innerDiv);

        // clear any preview that's open
        function clearPreview() {
            $(".vmgmatrixblockpreview-image").remove();
        }

        // load the specified preview
        function loadPreview(dataType) {

            // build the imagename from fieldHandle and blockType
            var imageName = "/content/craft/ax/main-content-blocks/" + dataType + ".png";
            // check if there's an image for the blockType
                // show the preview image
                $("<img>", { src: imageName})
                    .addClass("vmgmatrixblockpreview-image")
                    .appendTo($previewWindow)
                    .show();
        }

        // show preview on hover of matrix dropdown buttons
        $(document).on("mouseover", ".menu > ul > li > a", function () {

            $dataType = $(this).attr("data-neo-bn-info");

            loadPreview($dataType);
        });

        $(document).on("mouseout", ".menu > ul > li > a", function () {
            $dataType = $(this).attr("data-neo-bn-info");
            // get the active button
            var $activeButton = $(".menubtn.active");

            if ($activeButton.length === 0) {
                return;
            }

            clearPreview();
        });
    }
}
