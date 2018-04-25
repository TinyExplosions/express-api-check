$('button.testAll').on('click', runTests);
$('button.clearAll').on('click', clearTests);
$('button.testSystemEndpoint').on('click', testSys);

function clearTests() {
    $("span.mini.button").remove();
}

function successfulResponse(data, textStatus, jqXHR) {
    $(this).find('.spinner').remove();
    $(this).append("<span class='mini button'>" + jqXHR.status + "</span>");
}

function errorResponse(jqXHR) {
    $(this).find('.spinner').remove();
    $(this).append("<span class='mini button error'>" + jqXHR.status + "</span>");
}

function runTests() {
    clearTests();
    $(".api").each(function() {
        if (!$(this).hasClass('platform')) {
            var route = $(this).data('route');
            $(this).append("<span class='spinner'></span>");
            $.ajax({
                url: route.path,
                method: route.method,
                success: successfulResponse.bind(this),
                error: errorResponse.bind(this)
            });
        }
    });
}

function testSys() {
    clearTests();
    $(".platform").each(function() {
        var route = $(this).data('route');
        $(this).append("<span class='spinner'></span>");
        $.ajax({
            url: route.path,
            method: route.method,
            success: successfulResponse.bind(this),
            error: errorResponse.bind(this)
        });
    });
}
