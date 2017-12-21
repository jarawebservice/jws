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





    $(document).ready(function() {
        $('.section').not("#section1").hide();
        $('.show').click(function() {
            $("a.show-active").removeClass("show-active");
            $(this).addClass("show-active");
            $('#section' + $(this).attr('target')).fadeIn(400).siblings('.section').fadeOut(0);
        });

        // For the form 
        //validation
        $('input, select').tooltipster({
            trigger: 'custom',
            onlyOne: false,
            position: 'right',
            theme: 'tooltipster-light'
        });

        $("#form").validate({
            errorPlacement: function(error, element) {
                var lastError = $(element).data('lastError'),
                    newError = $(error).text();

                $(element).data('lastError', newError);

                if (newError !== '' && newError !== lastError) {
                    $(element).tooltipster('content', newError);
                    $(element).tooltipster('show');
                }
            },
            success: function(label, element) {
                $(element).tooltipster('hide');
            }
        });


        var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn');

        allWells.hide();

        navListItems.click(function(e) {
            e.preventDefault();
            var $target = $($(this).attr('href')),
                $item = $(this);

            if (!$item.hasClass('disabled')) {
                navListItems.removeClass('btn-primary').addClass('btn-default');
                $item.addClass('btn-primary');
                $('input, select').tooltipster("hide");
                allWells.hide();
                $target.show();
                $target.find('input:eq(0)').focus();
            }
        });

        /* Handles validating using jQuery validate.
         */
        allNextBtn.click(function() {
            var curStep = $(this).closest(".setup-content"),
                curStepBtn = curStep.attr("id"),
                nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                curInputs = curStep.find("input"),
                isValid = true;

            //Loop through all inputs in this form group and validate them.
            for (var i = 0; i < curInputs.length; i++) {
                if (!$(curInputs[i]).valid()) {
                    isValid = false;
                }
            }

            if (isValid) {
                //Progress to the next page.
                nextStepWizard.removeClass('disabled').trigger('click');
                // # # # AJAX REQUEST HERE # # # 

                /*
                Theoretically, in order to preserve the state of the form should the worst happen, we could use an ajax call that would look something like this:
                   
                //Prepare the key-val pairs like a normal post request.
                var fields = {};
                for(var i= 0; i < curInputs.length; i++){
                  fields[$(curInputs[i]).attr("name")] = $(curInputs[i]).attr("name").val();
                }
                   
                $.post(
                    "location.php",
                    fields,
                    function(data){
                      //Silent success handler.
                    }                
                );
                   
                //The FINAL button on last page should have its own logic to finalize the enrolment.
                */
            }
        });

    });

    // $('div.setup-panel div a.btn-primary').trigger('click');
    $(document).ready(function() {
        $('.nda-input').change(function() {
            //console.log(this.files);
            var f = this.files;
            var el = $(this).parent();
            if (f.length > 1) {
                // console.log(this.files, 1);
                el.text('Sorry, multiple files are not allowed');
                return;
            }
            // el.removeClass('focus');
            el.html(f[0].name + '<br>' +
                '<span class="sml">' +
                'type: ' + f[0].type + ', ' +
                Math.round(f[0].size / 1024) + ' KB</span>');
        });

        $('.nda-input').on('focus', function() {
            $(this).parent().addClass('focus');
        });

        $('.nda-input').on('blur', function() {
            $(this).parent().removeClass('focus');
        });

    });

}(window, jQuery));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbih3aW5kb3csICQpIHtcclxuXHJcbiAgICB3aW5kb3cudXRpbCA9IHtcclxuXHJcbiAgICAgICAgZ2V0RGF0ZVN0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBkdCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IChkdC5nZXRNb250aCgpICsgMSk7XHJcbiAgICAgICAgICAgIHZhciBkYXkgPSBkdC5nZXREYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBtb250aCA9IG1vbnRoID4gMTAgPyBtb250aCA6ICcwJyArIG1vbnRoO1xyXG4gICAgICAgICAgICBkYXkgPSBkYXkgPiAxMCA/IGRheSA6ICcwJyArIGRheTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkdC5nZXRGdWxsWWVhcigpICsgJy0nICsgbW9udGggKyAnLScgKyBkYXk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVuZGVyTWFya3VwOiBmdW5jdGlvbihzb3VyY2VTZWxlY3RvciwgZGVzdGluYXRpb25TZWxlY3RvciwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgICAkc291cmNlID0gJChzb3VyY2VTZWxlY3RvciksXHJcbiAgICAgICAgICAgICAgICAkZGVzdGluYXRpb24gPSAkKGRlc3RpbmF0aW9uU2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRzb3VyY2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgJGRlc3RpbmF0aW9uLmh0bWwod2luZG93LnV0aWwucmVwbGFjZUJyYWNrZXRzKCRzb3VyY2UuaHRtbCgpKSk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygkc291cmNlLCAkZGVzdGluYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVwbGFjZUJyYWNrZXRzOiBmdW5jdGlvbihtYXJrdXApIHtcclxuICAgICAgICAgICAgbWFya3VwID0gbWFya3VwLnJlcGxhY2UoL1xcPC9nLCAnJmx0OycpO1xyXG4gICAgICAgICAgICBtYXJrdXAgPSBtYXJrdXAucmVwbGFjZSgvXFw+L2csICcmZ3Q7Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXJrdXA7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICAkY29kZUNvbnRhaW5lciA9ICQoJyNjb2RlLWNvbnRhaW5lcicpLFxyXG4gICAgICAgICAgICAkY29kZUJsb2NrID0gJCgnI2NvZGUtYmxvY2snKTtcclxuXHJcbiAgICAgICAgaWYgKCRjb2RlQ29udGFpbmVyLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgJGNvZGVCbG9jay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzcmMgPSAkY29kZUJsb2NrLmh0bWwoKS5yZXBsYWNlKCdcXG4nLCAnJyk7XHJcbiAgICAgICAgICAgICRjb2RlQ29udGFpbmVyLmh0bWwod2luZG93LnV0aWwucmVwbGFjZUJyYWNrZXRzKHNyYykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgncHJlIGNvZGUnKS5lYWNoKGZ1bmN0aW9uKGksIGJsb2NrKSB7XHJcbiAgICAgICAgICAgIGhsanMuaGlnaGxpZ2h0QmxvY2soYmxvY2spO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3aW5kb3cudXRpbC5yZW5kZXJNYXJrdXAoJyNkZW1vLWNvbnRlbnQtY29udGFpbmVyJywgJyNkZW1vLW1hcmt1cCcsIGZ1bmN0aW9uKHNyYywgZGVzdGluYXRpb24pIHtcclxuICAgICAgICAgICAgaGxqcy5oaWdobGlnaHRCbG9jayhkZXN0aW5hdGlvblswXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBiYW5uZXIgPSAkKCcuYmFubmVyLXNlbGVjdGVkJykuY2hpbGRyZW4oJy5iYW5uZXItaXRlbScpLmF0dHIoJ2ZvcicpO1xyXG5cclxuICAgICAgICAkKCcuYmFubmVyLWl0ZW0nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRyaWdnZXIgPSAkKHRoaXMpLmF0dHIoJ2ZvcicpO1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuXHJcbiAgICAgICAgICAgICQoJy5iYW5uZXInKS5yZW1vdmVDbGFzcygnYmFubmVyLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIHBhcmVudC5hZGRDbGFzcygnYmFubmVyLXNlbGVjdGVkJywgJ2RvbnRTaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyBIYW5kbGUgY2xpY2sgb24gdG9nZ2xlIHNlYXJjaCBidXR0b25cclxuICAgICAgICAkKCcjdG9nZ2xlLXNlYXJjaCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcjc2VhcmNoLWZvcm0sICN0b2dnbGUtc2VhcmNoJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBIYW5kbGUgY2xpY2sgb24gc2VhcmNoIHN1Ym1pdCBidXR0b25cclxuICAgICAgICAkKCcjc2VhcmNoLWZvcm0gaW5wdXRbdHlwZT1zdWJtaXRdJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJyNzZWFyY2gtZm9ybSwgI3RvZ2dsZS1zZWFyY2gnKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnI3NlYXJjaC1kb21haW4nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnI3NlYXJjaC1mb3JtLCAjdG9nZ2xlLXNlYXJjaCcpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBDbGlja2luZyBvdXRzaWRlIHRoZSBzZWFyY2ggZm9ybSBjbG9zZXMgaXRcclxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0YXJnZXQuaXMoJyN0b2dnbGUtc2VhcmNoJykgJiYgIXRhcmdldC5jbG9zZXN0KCcjc2VhcmNoLWZvcm0nKS5zaXplKCkpIHtcclxuICAgICAgICAgICAgICAgICQoJyNzZWFyY2gtZm9ybSwgI3RvZ2dsZS1zZWFyY2gnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gJCgnLnNlYXJjaC1mb3JtJykuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAvLyAgICAgdmFyIHVzZXJuYW1lID0gXCJZT1VSX1VTRVJOQU1FXCI7XHJcbiAgICAvLyAgICAgdmFyIHBhc3N3b3JkID0gXCJZT1VSX1BBU1NXT1JEXCI7XHJcbiAgICAvLyAgICAgdmFyIGRvbWFpbiA9ICQoJ3NlYXJjaF90ZXh0JykudmFsKCk7XHJcbiAgICAvLyAgICAgdmFyIGZvcm1hdCA9IFwiSlNPTlwiXHJcbiAgICAvLyAgICAgJC5hamF4KHtcclxuICAgIC8vICAgICAgICAgdXJsOiBcImh0dHA6Ly93d3cud2hvaXN4bWxhcGkuY29tL3dob2lzc2VydmVyL1dob2lzU2VydmljZVwiLFxyXG4gICAgLy8gICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAvLyAgICAgICAgIGRhdGE6IHtcclxuICAgIC8vICAgICAgICAgICAgIGNtZDogXCJHRVRfRE5fQVZBSUxBQklMSVRZXCIsXHJcbiAgICAvLyAgICAgICAgICAgICBkb21haW5OYW1lOiBkb21haW4sXHJcbiAgICAvLyAgICAgICAgICAgICB1c2VybmFtZTogJ3dhbGVhbmRlcicsXHJcbiAgICAvLyAgICAgICAgICAgICBwYXNzd29yZDogJ2lhbWJvcm4yd2luJyxcclxuICAgIC8vICAgICAgICAgICAgIG91dHB1dEZvcm1hdDogZm9ybWF0XHJcbiAgICAvLyAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIC8vICAgICAgICAgICAgICQoXCIjcmVzdWx0c1wiKS5hcHBlbmQoXCI8cHJlPlwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSwgXCJcIiwgMikgKyBcIjwvcHJlPlwiKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyB9KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLnNlY3Rpb24nKS5ub3QoXCIjc2VjdGlvbjFcIikuaGlkZSgpO1xyXG4gICAgICAgICQoJy5zaG93JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoXCJhLnNob3ctYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwic2hvdy1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJzaG93LWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgJCgnI3NlY3Rpb24nICsgJCh0aGlzKS5hdHRyKCd0YXJnZXQnKSkuZmFkZUluKDQwMCkuc2libGluZ3MoJy5zZWN0aW9uJykuZmFkZU91dCgwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRm9yIHRoZSBmb3JtIFxyXG4gICAgICAgIC8vdmFsaWRhdGlvblxyXG4gICAgICAgICQoJ2lucHV0LCBzZWxlY3QnKS50b29sdGlwc3Rlcih7XHJcbiAgICAgICAgICAgIHRyaWdnZXI6ICdjdXN0b20nLFxyXG4gICAgICAgICAgICBvbmx5T25lOiBmYWxzZSxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXHJcbiAgICAgICAgICAgIHRoZW1lOiAndG9vbHRpcHN0ZXItbGlnaHQnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIjZm9ybVwiKS52YWxpZGF0ZSh7XHJcbiAgICAgICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbihlcnJvciwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3RFcnJvciA9ICQoZWxlbWVudCkuZGF0YSgnbGFzdEVycm9yJyksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3RXJyb3IgPSAkKGVycm9yKS50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5kYXRhKCdsYXN0RXJyb3InLCBuZXdFcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0Vycm9yICE9PSAnJyAmJiBuZXdFcnJvciAhPT0gbGFzdEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS50b29sdGlwc3RlcignY29udGVudCcsIG5ld0Vycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnRvb2x0aXBzdGVyKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGxhYmVsLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnRvb2x0aXBzdGVyKCdoaWRlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHZhciBuYXZMaXN0SXRlbXMgPSAkKCdkaXYuc2V0dXAtcGFuZWwgZGl2IGEnKSxcclxuICAgICAgICAgICAgYWxsV2VsbHMgPSAkKCcuc2V0dXAtY29udGVudCcpLFxyXG4gICAgICAgICAgICBhbGxOZXh0QnRuID0gJCgnLm5leHRCdG4nKTtcclxuXHJcbiAgICAgICAgYWxsV2VsbHMuaGlkZSgpO1xyXG5cclxuICAgICAgICBuYXZMaXN0SXRlbXMuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJCgkKHRoaXMpLmF0dHIoJ2hyZWYnKSksXHJcbiAgICAgICAgICAgICAgICAkaXRlbSA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoISRpdGVtLmhhc0NsYXNzKCdkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZMaXN0SXRlbXMucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kZWZhdWx0Jyk7XHJcbiAgICAgICAgICAgICAgICAkaXRlbS5hZGRDbGFzcygnYnRuLXByaW1hcnknKTtcclxuICAgICAgICAgICAgICAgICQoJ2lucHV0LCBzZWxlY3QnKS50b29sdGlwc3RlcihcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICBhbGxXZWxscy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LnNob3coKTtcclxuICAgICAgICAgICAgICAgICR0YXJnZXQuZmluZCgnaW5wdXQ6ZXEoMCknKS5mb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qIEhhbmRsZXMgdmFsaWRhdGluZyB1c2luZyBqUXVlcnkgdmFsaWRhdGUuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYWxsTmV4dEJ0bi5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGN1clN0ZXAgPSAkKHRoaXMpLmNsb3Nlc3QoXCIuc2V0dXAtY29udGVudFwiKSxcclxuICAgICAgICAgICAgICAgIGN1clN0ZXBCdG4gPSBjdXJTdGVwLmF0dHIoXCJpZFwiKSxcclxuICAgICAgICAgICAgICAgIG5leHRTdGVwV2l6YXJkID0gJCgnZGl2LnNldHVwLXBhbmVsIGRpdiBhW2hyZWY9XCIjJyArIGN1clN0ZXBCdG4gKyAnXCJdJykucGFyZW50KCkubmV4dCgpLmNoaWxkcmVuKFwiYVwiKSxcclxuICAgICAgICAgICAgICAgIGN1cklucHV0cyA9IGN1clN0ZXAuZmluZChcImlucHV0XCIpLFxyXG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvL0xvb3AgdGhyb3VnaCBhbGwgaW5wdXRzIGluIHRoaXMgZm9ybSBncm91cCBhbmQgdmFsaWRhdGUgdGhlbS5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJJbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghJChjdXJJbnB1dHNbaV0pLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAvL1Byb2dyZXNzIHRvIHRoZSBuZXh0IHBhZ2UuXHJcbiAgICAgICAgICAgICAgICBuZXh0U3RlcFdpemFyZC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgLy8gIyAjICMgQUpBWCBSRVFVRVNUIEhFUkUgIyAjICMgXHJcblxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgIFRoZW9yZXRpY2FsbHksIGluIG9yZGVyIHRvIHByZXNlcnZlIHRoZSBzdGF0ZSBvZiB0aGUgZm9ybSBzaG91bGQgdGhlIHdvcnN0IGhhcHBlbiwgd2UgY291bGQgdXNlIGFuIGFqYXggY2FsbCB0aGF0IHdvdWxkIGxvb2sgc29tZXRoaW5nIGxpa2UgdGhpczpcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9QcmVwYXJlIHRoZSBrZXktdmFsIHBhaXJzIGxpa2UgYSBub3JtYWwgcG9zdCByZXF1ZXN0LlxyXG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpPSAwOyBpIDwgY3VySW5wdXRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgZmllbGRzWyQoY3VySW5wdXRzW2ldKS5hdHRyKFwibmFtZVwiKV0gPSAkKGN1cklucHV0c1tpXSkuYXR0cihcIm5hbWVcIikudmFsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICQucG9zdChcclxuICAgICAgICAgICAgICAgICAgICBcImxvY2F0aW9uLnBocFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkcyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vU2lsZW50IHN1Y2Nlc3MgaGFuZGxlci5cclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9UaGUgRklOQUwgYnV0dG9uIG9uIGxhc3QgcGFnZSBzaG91bGQgaGF2ZSBpdHMgb3duIGxvZ2ljIHRvIGZpbmFsaXplIHRoZSBlbnJvbG1lbnQuXHJcbiAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gJCgnZGl2LnNldHVwLXBhbmVsIGRpdiBhLmJ0bi1wcmltYXJ5JykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5uZGEtaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5maWxlcyk7XHJcbiAgICAgICAgICAgIHZhciBmID0gdGhpcy5maWxlcztcclxuICAgICAgICAgICAgdmFyIGVsID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgaWYgKGYubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5maWxlcywgMSk7XHJcbiAgICAgICAgICAgICAgICBlbC50ZXh0KCdTb3JyeSwgbXVsdGlwbGUgZmlsZXMgYXJlIG5vdCBhbGxvd2VkJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZWwucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgIGVsLmh0bWwoZlswXS5uYW1lICsgJzxicj4nICtcclxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInNtbFwiPicgK1xyXG4gICAgICAgICAgICAgICAgJ3R5cGU6ICcgKyBmWzBdLnR5cGUgKyAnLCAnICtcclxuICAgICAgICAgICAgICAgIE1hdGgucm91bmQoZlswXS5zaXplIC8gMTAyNCkgKyAnIEtCPC9zcGFuPicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcubmRhLWlucHV0Jykub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5uZGEtaW5wdXQnKS5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSh3aW5kb3csIGpRdWVyeSkpOyJdfQ==
