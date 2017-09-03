$(document).ready(function () {
    //  materialize modal Initialization:
    $('.modal').modal();
    var modalTrigger = $('#btnModal');
    modalTrigger.click(function() {
        // console.log('modalTrigger was clicked');
        Backbone.trigger('uploadImageView:open'); // logs: Handled Backbone event

    });
});
