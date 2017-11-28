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

}(window, jQuery));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24od2luZG93LCAkKSB7XHJcblxyXG4gICAgd2luZG93LnV0aWwgPSB7XHJcblxyXG4gICAgICAgIGdldERhdGVTdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZHQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgbW9udGggPSAoZHQuZ2V0TW9udGgoKSArIDEpO1xyXG4gICAgICAgICAgICB2YXIgZGF5ID0gZHQuZ2V0RGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgbW9udGggPSBtb250aCA+IDEwID8gbW9udGggOiAnMCcgKyBtb250aDtcclxuICAgICAgICAgICAgZGF5ID0gZGF5ID4gMTAgPyBkYXkgOiAnMCcgKyBkYXk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZHQuZ2V0RnVsbFllYXIoKSArICctJyArIG1vbnRoICsgJy0nICsgZGF5O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbmRlck1hcmt1cDogZnVuY3Rpb24oc291cmNlU2VsZWN0b3IsIGRlc3RpbmF0aW9uU2VsZWN0b3IsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHZhclxyXG4gICAgICAgICAgICAgICAgJHNvdXJjZSA9ICQoc291cmNlU2VsZWN0b3IpLFxyXG4gICAgICAgICAgICAgICAgJGRlc3RpbmF0aW9uID0gJChkZXN0aW5hdGlvblNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkc291cmNlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICRkZXN0aW5hdGlvbi5odG1sKHdpbmRvdy51dGlsLnJlcGxhY2VCcmFja2V0cygkc291cmNlLmh0bWwoKSkpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soJHNvdXJjZSwgJGRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlcGxhY2VCcmFja2V0czogZnVuY3Rpb24obWFya3VwKSB7XHJcbiAgICAgICAgICAgIG1hcmt1cCA9IG1hcmt1cC5yZXBsYWNlKC9cXDwvZywgJyZsdDsnKTtcclxuICAgICAgICAgICAgbWFya3VwID0gbWFya3VwLnJlcGxhY2UoL1xcPi9nLCAnJmd0OycpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWFya3VwO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgJGNvZGVDb250YWluZXIgPSAkKCcjY29kZS1jb250YWluZXInKSxcclxuICAgICAgICAgICAgJGNvZGVCbG9jayA9ICQoJyNjb2RlLWJsb2NrJyk7XHJcblxyXG4gICAgICAgIGlmICgkY29kZUNvbnRhaW5lci5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICRjb2RlQmxvY2subGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgc3JjID0gJGNvZGVCbG9jay5odG1sKCkucmVwbGFjZSgnXFxuJywgJycpO1xyXG4gICAgICAgICAgICAkY29kZUNvbnRhaW5lci5odG1sKHdpbmRvdy51dGlsLnJlcGxhY2VCcmFja2V0cyhzcmMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJ3ByZSBjb2RlJykuZWFjaChmdW5jdGlvbihpLCBibG9jaykge1xyXG4gICAgICAgICAgICBobGpzLmhpZ2hsaWdodEJsb2NrKGJsb2NrKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd2luZG93LnV0aWwucmVuZGVyTWFya3VwKCcjZGVtby1jb250ZW50LWNvbnRhaW5lcicsICcjZGVtby1tYXJrdXAnLCBmdW5jdGlvbihzcmMsIGRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGhsanMuaGlnaGxpZ2h0QmxvY2soZGVzdGluYXRpb25bMF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYmFubmVyID0gJCgnLmJhbm5lci1zZWxlY3RlZCcpLmNoaWxkcmVuKCcuYmFubmVyLWl0ZW0nKS5hdHRyKCdmb3InKTtcclxuXHJcbiAgICAgICAgJCgnLmJhbm5lci1pdGVtJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyID0gJCh0aGlzKS5hdHRyKCdmb3InKTtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcblxyXG4gICAgICAgICAgICAkKCcuYmFubmVyJykucmVtb3ZlQ2xhc3MoJ2Jhbm5lci1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICBwYXJlbnQuYWRkQ2xhc3MoJ2Jhbm5lci1zZWxlY3RlZCcsICdkb250U2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIGNsaWNrIG9uIHRvZ2dsZSBzZWFyY2ggYnV0dG9uXHJcbiAgICAgICAgJCgnI3RvZ2dsZS1zZWFyY2gnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnI3NlYXJjaC1mb3JtLCAjdG9nZ2xlLXNlYXJjaCcpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIGNsaWNrIG9uIHNlYXJjaCBzdWJtaXQgYnV0dG9uXHJcbiAgICAgICAgJCgnI3NlYXJjaC1mb3JtIGlucHV0W3R5cGU9c3VibWl0XScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcjc2VhcmNoLWZvcm0sICN0b2dnbGUtc2VhcmNoJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJyNzZWFyY2gtZG9tYWluJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJyNzZWFyY2gtZm9ybSwgI3RvZ2dsZS1zZWFyY2gnKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gQ2xpY2tpbmcgb3V0c2lkZSB0aGUgc2VhcmNoIGZvcm0gY2xvc2VzIGl0XHJcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGFyZ2V0LmlzKCcjdG9nZ2xlLXNlYXJjaCcpICYmICF0YXJnZXQuY2xvc2VzdCgnI3NlYXJjaC1mb3JtJykuc2l6ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjc2VhcmNoLWZvcm0sICN0b2dnbGUtc2VhcmNoJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSh3aW5kb3csIGpRdWVyeSkpOyJdfQ==
