function MatrixBlockPreviews(previews) {
    if ($("#fields-contentBuilder-field").length > 0) {
        var $window = $(window);

        var $sidebar = $("#details .meta.read-only");

        // add a preview div to the sidebar
        var $previewWindow = $("<div>")
            .addClass("matrixblockpreview-window meta read-only")
            .insertAfter($sidebar);

        var $innerDiv = $("<div>")
            .addClass("data")
            .css({'min-height': '150px', 'display': 'block'})
            .appendTo($previewWindow)

        // add a label to the preview window
        $("<h5>")
            .addClass("matrixblockpreview-window-label heading")
            .text("Content Builder Block Preview:")
            .css('flex', '0 0 205px')
            .appendTo($innerDiv);

      $("<div>")
            .addClass("matrixblockpreview-inst displaypreview")
            .text("Hover over a content block to preview")
            .css({'min-height': '50px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center', 'text-align': 'center', 'width': '80%'})
            .appendTo($innerDiv);

        // clear any preview that's open
        function clearPreview() {
            $(".matrixblockpreview-image").remove();

            $("<div>")
            .addClass("matrixblockpreview-inst displaypreview")
            .text("Hover over a content block to preview")
            .css({'min-height': '50px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center', 'text-align': 'center', 'width': '80%'})
            .appendTo($innerDiv);
        }

        // load the specified preview
        function loadPreview(dataType) {
            $(".matrixblockpreview-inst").remove();
            // build the imagename from fieldHandle and blockType
            var imageName = "/content/craft/ax/content-builder/" + dataType + ".png";
            // check if there's an image for the blockType
                // show the preview image
                $("<img>", { src: imageName})
                    .addClass("matrixblockpreview-image")
                    .css({'box-shadow': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'})
                    .appendTo($innerDiv)
                    .show();
        }

        // show preview on hover of matrix dropdown buttons
        $(document).on("mouseover", ".menu.matrixmate-menu > ul > li > a, .menu.matrixmate-collapsed-menu > ul > li > a", function () {

            $dataType = $(this).attr("data-type");

            loadPreview($dataType);
        });

        $(document).on("mouseout", ".menu.matrixmate-menu > ul > li > a, .menu.matrixmate-collapsed-menu > ul > li > a", function () {
            $dataType = $(this).attr("data-type");
            // get the active button
            var $activeButton = $(".menubtn.active");

            if ($activeButton.length === 0) {
                return;
            }

            clearPreview();
        });
    }
}
