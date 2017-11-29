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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbih3aW5kb3csICQpIHtcclxuXHJcbiAgICB3aW5kb3cudXRpbCA9IHtcclxuXHJcbiAgICAgICAgZ2V0RGF0ZVN0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBkdCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IChkdC5nZXRNb250aCgpICsgMSk7XHJcbiAgICAgICAgICAgIHZhciBkYXkgPSBkdC5nZXREYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBtb250aCA9IG1vbnRoID4gMTAgPyBtb250aCA6ICcwJyArIG1vbnRoO1xyXG4gICAgICAgICAgICBkYXkgPSBkYXkgPiAxMCA/IGRheSA6ICcwJyArIGRheTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkdC5nZXRGdWxsWWVhcigpICsgJy0nICsgbW9udGggKyAnLScgKyBkYXk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVuZGVyTWFya3VwOiBmdW5jdGlvbihzb3VyY2VTZWxlY3RvciwgZGVzdGluYXRpb25TZWxlY3RvciwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgICAkc291cmNlID0gJChzb3VyY2VTZWxlY3RvciksXHJcbiAgICAgICAgICAgICAgICAkZGVzdGluYXRpb24gPSAkKGRlc3RpbmF0aW9uU2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRzb3VyY2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgJGRlc3RpbmF0aW9uLmh0bWwod2luZG93LnV0aWwucmVwbGFjZUJyYWNrZXRzKCRzb3VyY2UuaHRtbCgpKSk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygkc291cmNlLCAkZGVzdGluYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVwbGFjZUJyYWNrZXRzOiBmdW5jdGlvbihtYXJrdXApIHtcclxuICAgICAgICAgICAgbWFya3VwID0gbWFya3VwLnJlcGxhY2UoL1xcPC9nLCAnJmx0OycpO1xyXG4gICAgICAgICAgICBtYXJrdXAgPSBtYXJrdXAucmVwbGFjZSgvXFw+L2csICcmZ3Q7Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXJrdXA7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICAkY29kZUNvbnRhaW5lciA9ICQoJyNjb2RlLWNvbnRhaW5lcicpLFxyXG4gICAgICAgICAgICAkY29kZUJsb2NrID0gJCgnI2NvZGUtYmxvY2snKTtcclxuXHJcbiAgICAgICAgaWYgKCRjb2RlQ29udGFpbmVyLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgJGNvZGVCbG9jay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzcmMgPSAkY29kZUJsb2NrLmh0bWwoKS5yZXBsYWNlKCdcXG4nLCAnJyk7XHJcbiAgICAgICAgICAgICRjb2RlQ29udGFpbmVyLmh0bWwod2luZG93LnV0aWwucmVwbGFjZUJyYWNrZXRzKHNyYykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgncHJlIGNvZGUnKS5lYWNoKGZ1bmN0aW9uKGksIGJsb2NrKSB7XHJcbiAgICAgICAgICAgIGhsanMuaGlnaGxpZ2h0QmxvY2soYmxvY2spO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3aW5kb3cudXRpbC5yZW5kZXJNYXJrdXAoJyNkZW1vLWNvbnRlbnQtY29udGFpbmVyJywgJyNkZW1vLW1hcmt1cCcsIGZ1bmN0aW9uKHNyYywgZGVzdGluYXRpb24pIHtcclxuICAgICAgICAgICAgaGxqcy5oaWdobGlnaHRCbG9jayhkZXN0aW5hdGlvblswXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBiYW5uZXIgPSAkKCcuYmFubmVyLXNlbGVjdGVkJykuY2hpbGRyZW4oJy5iYW5uZXItaXRlbScpLmF0dHIoJ2ZvcicpO1xyXG5cclxuICAgICAgICAkKCcuYmFubmVyLWl0ZW0nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRyaWdnZXIgPSAkKHRoaXMpLmF0dHIoJ2ZvcicpO1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuXHJcbiAgICAgICAgICAgICQoJy5iYW5uZXInKS5yZW1vdmVDbGFzcygnYmFubmVyLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIHBhcmVudC5hZGRDbGFzcygnYmFubmVyLXNlbGVjdGVkJywgJ2RvbnRTaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyBIYW5kbGUgY2xpY2sgb24gdG9nZ2xlIHNlYXJjaCBidXR0b25cclxuICAgICAgICAkKCcjdG9nZ2xlLXNlYXJjaCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcjc2VhcmNoLWZvcm0sICN0b2dnbGUtc2VhcmNoJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBIYW5kbGUgY2xpY2sgb24gc2VhcmNoIHN1Ym1pdCBidXR0b25cclxuICAgICAgICAkKCcjc2VhcmNoLWZvcm0gaW5wdXRbdHlwZT1zdWJtaXRdJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJyNzZWFyY2gtZm9ybSwgI3RvZ2dsZS1zZWFyY2gnKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnI3NlYXJjaC1kb21haW4nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnI3NlYXJjaC1mb3JtLCAjdG9nZ2xlLXNlYXJjaCcpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBDbGlja2luZyBvdXRzaWRlIHRoZSBzZWFyY2ggZm9ybSBjbG9zZXMgaXRcclxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0YXJnZXQuaXMoJyN0b2dnbGUtc2VhcmNoJykgJiYgIXRhcmdldC5jbG9zZXN0KCcjc2VhcmNoLWZvcm0nKS5zaXplKCkpIHtcclxuICAgICAgICAgICAgICAgICQoJyNzZWFyY2gtZm9ybSwgI3RvZ2dsZS1zZWFyY2gnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gJCgnLnNlYXJjaC1mb3JtJykuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAvLyAgICAgdmFyIHVzZXJuYW1lID0gXCJZT1VSX1VTRVJOQU1FXCI7XHJcbiAgICAvLyAgICAgdmFyIHBhc3N3b3JkID0gXCJZT1VSX1BBU1NXT1JEXCI7XHJcbiAgICAvLyAgICAgdmFyIGRvbWFpbiA9ICQoJ3NlYXJjaF90ZXh0JykudmFsKCk7XHJcbiAgICAvLyAgICAgdmFyIGZvcm1hdCA9IFwiSlNPTlwiXHJcbiAgICAvLyAgICAgJC5hamF4KHtcclxuICAgIC8vICAgICAgICAgdXJsOiBcImh0dHA6Ly93d3cud2hvaXN4bWxhcGkuY29tL3dob2lzc2VydmVyL1dob2lzU2VydmljZVwiLFxyXG4gICAgLy8gICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAvLyAgICAgICAgIGRhdGE6IHtcclxuICAgIC8vICAgICAgICAgICAgIGNtZDogXCJHRVRfRE5fQVZBSUxBQklMSVRZXCIsXHJcbiAgICAvLyAgICAgICAgICAgICBkb21haW5OYW1lOiBkb21haW4sXHJcbiAgICAvLyAgICAgICAgICAgICB1c2VybmFtZTogJ3dhbGVhbmRlcicsXHJcbiAgICAvLyAgICAgICAgICAgICBwYXNzd29yZDogJ2lhbWJvcm4yd2luJyxcclxuICAgIC8vICAgICAgICAgICAgIG91dHB1dEZvcm1hdDogZm9ybWF0XHJcbiAgICAvLyAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIC8vICAgICAgICAgICAgICQoXCIjcmVzdWx0c1wiKS5hcHBlbmQoXCI8cHJlPlwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSwgXCJcIiwgMikgKyBcIjwvcHJlPlwiKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyB9KTtcclxuXHJcblxyXG59KHdpbmRvdywgalF1ZXJ5KSk7Il19
