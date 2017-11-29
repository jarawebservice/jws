(function(window, $) {

    window.util = {

        getDateString: function() {
            var dt = new Date();
            var month = (dt.getMonth() + 1);
            var day = dt.getDate();

            month = month > 10 ? month : '0' + month;
            day = day > 10 ? day : '0' + day;

            return dt.getFullYear() + '-' + month + '-' + day;
        },

        renderMarkup: function(sourceSelector, destinationSelector, callback) {
            var
                $source = $(sourceSelector),
                $destination = $(destinationSelector);

            if ($source.length > 0) {
                $destination.html(window.util.replaceBrackets($source.html()));
                callback($source, $destination);
            }
        },

        replaceBrackets: function(markup) {
            markup = markup.replace(/\</g, '&lt;');
            markup = markup.replace(/\>/g, '&gt;');
            return markup;
        }
    };

    $(function() {
        var
            $codeContainer = $('#code-container'),
            $codeBlock = $('#code-block');

        if ($codeContainer.length > 0 &&
            $codeBlock.length > 0) {
            var src = $codeBlock.html().replace('\n', '');
            $codeContainer.html(window.util.replaceBrackets(src));
        }

        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });

        window.util.renderMarkup('#demo-content-container', '#demo-markup', function(src, destination) {
            hljs.highlightBlock(destination[0]);
        });
    });

    $(function() {
        var banner = $('.banner-selected').children('.banner-item').attr('for');

        $('.banner-item').click(function() {
            var trigger = $(this).attr('for');
            var parent = $(this).parent();

            $('.banner').removeClass('banner-selected');
            parent.addClass('banner-selected', 'dontShow');
        });
    });

    $(function() {

        // Handle click on toggle search button
        $('#toggle-search').click(function() {
            $('#search-form, #toggle-search').toggleClass('open');
            return false;
        });

        // Handle click on search submit button
        $('#search-form input[type=submit]').click(function() {
            $('#search-form, #toggle-search').toggleClass('open');
            return true;
        });

        $('#search-domain').click(function() {
            $('#search-form, #toggle-search').toggleClass('open');
            return true;

        })

        // Clicking outside the search form closes it
        $(document).click(function(event) {
            var target = $(event.target);

            if (!target.is('#toggle-search') && !target.closest('#search-form').size()) {
                $('#search-form, #toggle-search').removeClass('open');
            }
        });

    });

    // $('.search-form').submit(function(event) {
    //     var username = "YOUR_USERNAME";
    //     var password = "YOUR_PASSWORD";
    //     var domain = $('search_text').val();
    //     var format = "JSON"
    //     $.ajax({
    //         url: "http://www.whoisxmlapi.com/whoisserver/WhoisService",
    //         dataType: "json",
    //         data: {
    //             cmd: "GET_DN_AVAILABILITY",
    //             domainName: domain,
    //             username: 'waleander',
    //             password: 'iamborn2win',
    //             outputFormat: format
    //         },
    //         success: function(data) {
    //             $("#results").append("<pre>" + JSON.stringify(data, "", 2) + "</pre>");
    //         }
    //     })
    // });


}(window, jQuery));