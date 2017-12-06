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


    var skewContentHandler = function(defaultHtml) {
        var $skew = $(".skew");
        var $skewWrapper = $(".skew-wrapper");
        var $display = $(".skew-content-target");
        $skew.hover(function() {
            var content = $(this).find(".skew-content").html();
            $display.hide().html(content).fadeIn(250);
        });

        $skewWrapper.mouseleave(function() {
            $display.hide().html(defaultHtml).fadeIn(250);
        })
    }

    var skewTargetHtml = $(".skew-content-target").html();
    skewContentHandler(skewTargetHtml);


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


    /* This code handles all of the navigation stuff.
     ** Probably leave it. Credit to https://bootsnipp.com/snippets/featured/form-wizard-and-validation
     */
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

    $('div.setup-panel div a.btn-primary').trigger('click');

    $(document).ready(function() {
        $('input[type=file]').change(function() {
            //console.log(this.files);
            var f = this.files;
            var el = $(this).parent();
            if (f.length > 1) {
                console.log(this.files, 1);
                el.text('Sorry, multiple files are not allowed');
                return;
            }
            // el.removeClass('focus');
            el.html(f[0].name + '<br>' +
                '<span class="sml">' +
                'type: ' + f[0].type + ', ' +
                Math.round(f[0].size / 1024) + ' KB</span>');
        });

        $('input[type=file]').on('focus', function() {
            $(this).parent().addClass('focus');
        });

        $('input[type=file]').on('blur', function() {
            $(this).parent().removeClass('focus');
        });

    });

}(window, jQuery));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKHdpbmRvdywgJCkge1xyXG5cclxuICAgIHdpbmRvdy51dGlsID0ge1xyXG5cclxuICAgICAgICBnZXREYXRlU3RyaW5nOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGR0ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdmFyIG1vbnRoID0gKGR0LmdldE1vbnRoKCkgKyAxKTtcclxuICAgICAgICAgICAgdmFyIGRheSA9IGR0LmdldERhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIG1vbnRoID0gbW9udGggPiAxMCA/IG1vbnRoIDogJzAnICsgbW9udGg7XHJcbiAgICAgICAgICAgIGRheSA9IGRheSA+IDEwID8gZGF5IDogJzAnICsgZGF5O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGR0LmdldEZ1bGxZZWFyKCkgKyAnLScgKyBtb250aCArICctJyArIGRheTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXJNYXJrdXA6IGZ1bmN0aW9uKHNvdXJjZVNlbGVjdG9yLCBkZXN0aW5hdGlvblNlbGVjdG9yLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB2YXJcclxuICAgICAgICAgICAgICAgICRzb3VyY2UgPSAkKHNvdXJjZVNlbGVjdG9yKSxcclxuICAgICAgICAgICAgICAgICRkZXN0aW5hdGlvbiA9ICQoZGVzdGluYXRpb25TZWxlY3Rvcik7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHNvdXJjZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAkZGVzdGluYXRpb24uaHRtbCh3aW5kb3cudXRpbC5yZXBsYWNlQnJhY2tldHMoJHNvdXJjZS5odG1sKCkpKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCRzb3VyY2UsICRkZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXBsYWNlQnJhY2tldHM6IGZ1bmN0aW9uKG1hcmt1cCkge1xyXG4gICAgICAgICAgICBtYXJrdXAgPSBtYXJrdXAucmVwbGFjZSgvXFw8L2csICcmbHQ7Jyk7XHJcbiAgICAgICAgICAgIG1hcmt1cCA9IG1hcmt1cC5yZXBsYWNlKC9cXD4vZywgJyZndDsnKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcmt1cDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICRjb2RlQ29udGFpbmVyID0gJCgnI2NvZGUtY29udGFpbmVyJyksXHJcbiAgICAgICAgICAgICRjb2RlQmxvY2sgPSAkKCcjY29kZS1ibG9jaycpO1xyXG5cclxuICAgICAgICBpZiAoJGNvZGVDb250YWluZXIubGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAkY29kZUJsb2NrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNyYyA9ICRjb2RlQmxvY2suaHRtbCgpLnJlcGxhY2UoJ1xcbicsICcnKTtcclxuICAgICAgICAgICAgJGNvZGVDb250YWluZXIuaHRtbCh3aW5kb3cudXRpbC5yZXBsYWNlQnJhY2tldHMoc3JjKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCdwcmUgY29kZScpLmVhY2goZnVuY3Rpb24oaSwgYmxvY2spIHtcclxuICAgICAgICAgICAgaGxqcy5oaWdobGlnaHRCbG9jayhibG9jayk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdpbmRvdy51dGlsLnJlbmRlck1hcmt1cCgnI2RlbW8tY29udGVudC1jb250YWluZXInLCAnI2RlbW8tbWFya3VwJywgZnVuY3Rpb24oc3JjLCBkZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICBobGpzLmhpZ2hsaWdodEJsb2NrKGRlc3RpbmF0aW9uWzBdKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGJhbm5lciA9ICQoJy5iYW5uZXItc2VsZWN0ZWQnKS5jaGlsZHJlbignLmJhbm5lci1pdGVtJykuYXR0cignZm9yJyk7XHJcblxyXG4gICAgICAgICQoJy5iYW5uZXItaXRlbScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdHJpZ2dlciA9ICQodGhpcykuYXR0cignZm9yJyk7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cclxuICAgICAgICAgICAgJCgnLmJhbm5lcicpLnJlbW92ZUNsYXNzKCdiYW5uZXItc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgcGFyZW50LmFkZENsYXNzKCdiYW5uZXItc2VsZWN0ZWQnLCAnZG9udFNob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBjbGljayBvbiB0b2dnbGUgc2VhcmNoIGJ1dHRvblxyXG4gICAgICAgICQoJyN0b2dnbGUtc2VhcmNoJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJyNzZWFyY2gtZm9ybSwgI3RvZ2dsZS1zZWFyY2gnKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBjbGljayBvbiBzZWFyY2ggc3VibWl0IGJ1dHRvblxyXG4gICAgICAgICQoJyNzZWFyY2gtZm9ybSBpbnB1dFt0eXBlPXN1Ym1pdF0nKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnI3NlYXJjaC1mb3JtLCAjdG9nZ2xlLXNlYXJjaCcpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcjc2VhcmNoLWRvbWFpbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcjc2VhcmNoLWZvcm0sICN0b2dnbGUtc2VhcmNoJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIENsaWNraW5nIG91dHNpZGUgdGhlIHNlYXJjaCBmb3JtIGNsb3NlcyBpdFxyXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRhcmdldC5pcygnI3RvZ2dsZS1zZWFyY2gnKSAmJiAhdGFyZ2V0LmNsb3Nlc3QoJyNzZWFyY2gtZm9ybScpLnNpemUoKSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI3NlYXJjaC1mb3JtLCAjdG9nZ2xlLXNlYXJjaCcpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyAkKCcuc2VhcmNoLWZvcm0nKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIC8vICAgICB2YXIgdXNlcm5hbWUgPSBcIllPVVJfVVNFUk5BTUVcIjtcclxuICAgIC8vICAgICB2YXIgcGFzc3dvcmQgPSBcIllPVVJfUEFTU1dPUkRcIjtcclxuICAgIC8vICAgICB2YXIgZG9tYWluID0gJCgnc2VhcmNoX3RleHQnKS52YWwoKTtcclxuICAgIC8vICAgICB2YXIgZm9ybWF0ID0gXCJKU09OXCJcclxuICAgIC8vICAgICAkLmFqYXgoe1xyXG4gICAgLy8gICAgICAgICB1cmw6IFwiaHR0cDovL3d3dy53aG9pc3htbGFwaS5jb20vd2hvaXNzZXJ2ZXIvV2hvaXNTZXJ2aWNlXCIsXHJcbiAgICAvLyAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIC8vICAgICAgICAgZGF0YToge1xyXG4gICAgLy8gICAgICAgICAgICAgY21kOiBcIkdFVF9ETl9BVkFJTEFCSUxJVFlcIixcclxuICAgIC8vICAgICAgICAgICAgIGRvbWFpbk5hbWU6IGRvbWFpbixcclxuICAgIC8vICAgICAgICAgICAgIHVzZXJuYW1lOiAnd2FsZWFuZGVyJyxcclxuICAgIC8vICAgICAgICAgICAgIHBhc3N3b3JkOiAnaWFtYm9ybjJ3aW4nLFxyXG4gICAgLy8gICAgICAgICAgICAgb3V0cHV0Rm9ybWF0OiBmb3JtYXRcclxuICAgIC8vICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgLy8gICAgICAgICAgICAgJChcIiNyZXN1bHRzXCIpLmFwcGVuZChcIjxwcmU+XCIgKyBKU09OLnN0cmluZ2lmeShkYXRhLCBcIlwiLCAyKSArIFwiPC9wcmU+XCIpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH0pO1xyXG5cclxuXHJcbiAgICB2YXIgc2tld0NvbnRlbnRIYW5kbGVyID0gZnVuY3Rpb24oZGVmYXVsdEh0bWwpIHtcclxuICAgICAgICB2YXIgJHNrZXcgPSAkKFwiLnNrZXdcIik7XHJcbiAgICAgICAgdmFyICRza2V3V3JhcHBlciA9ICQoXCIuc2tldy13cmFwcGVyXCIpO1xyXG4gICAgICAgIHZhciAkZGlzcGxheSA9ICQoXCIuc2tldy1jb250ZW50LXRhcmdldFwiKTtcclxuICAgICAgICAkc2tldy5ob3ZlcihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAkKHRoaXMpLmZpbmQoXCIuc2tldy1jb250ZW50XCIpLmh0bWwoKTtcclxuICAgICAgICAgICAgJGRpc3BsYXkuaGlkZSgpLmh0bWwoY29udGVudCkuZmFkZUluKDI1MCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRza2V3V3JhcHBlci5tb3VzZWxlYXZlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZGlzcGxheS5oaWRlKCkuaHRtbChkZWZhdWx0SHRtbCkuZmFkZUluKDI1MCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2tld1RhcmdldEh0bWwgPSAkKFwiLnNrZXctY29udGVudC10YXJnZXRcIikuaHRtbCgpO1xyXG4gICAgc2tld0NvbnRlbnRIYW5kbGVyKHNrZXdUYXJnZXRIdG1sKTtcclxuXHJcblxyXG4gICAgJCgnLnNlY3Rpb24nKS5ub3QoXCIjc2VjdGlvbjFcIikuaGlkZSgpO1xyXG4gICAgJCgnLnNob3cnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAkKFwiYS5zaG93LWFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcInNob3ctYWN0aXZlXCIpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJzaG93LWFjdGl2ZVwiKTtcclxuICAgICAgICAkKCcjc2VjdGlvbicgKyAkKHRoaXMpLmF0dHIoJ3RhcmdldCcpKS5mYWRlSW4oNDAwKS5zaWJsaW5ncygnLnNlY3Rpb24nKS5mYWRlT3V0KDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRm9yIHRoZSBmb3JtIFxyXG4gICAgLy92YWxpZGF0aW9uXHJcbiAgICAkKCdpbnB1dCwgc2VsZWN0JykudG9vbHRpcHN0ZXIoe1xyXG4gICAgICAgIHRyaWdnZXI6ICdjdXN0b20nLFxyXG4gICAgICAgIG9ubHlPbmU6IGZhbHNlLFxyXG4gICAgICAgIHBvc2l0aW9uOiAncmlnaHQnLFxyXG4gICAgICAgIHRoZW1lOiAndG9vbHRpcHN0ZXItbGlnaHQnXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2Zvcm1cIikudmFsaWRhdGUoe1xyXG4gICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbihlcnJvciwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgbGFzdEVycm9yID0gJChlbGVtZW50KS5kYXRhKCdsYXN0RXJyb3InKSxcclxuICAgICAgICAgICAgICAgIG5ld0Vycm9yID0gJChlcnJvcikudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgJChlbGVtZW50KS5kYXRhKCdsYXN0RXJyb3InLCBuZXdFcnJvcik7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3RXJyb3IgIT09ICcnICYmIG5ld0Vycm9yICE9PSBsYXN0RXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkudG9vbHRpcHN0ZXIoJ2NvbnRlbnQnLCBuZXdFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnRvb2x0aXBzdGVyKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGxhYmVsLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICQoZWxlbWVudCkudG9vbHRpcHN0ZXIoJ2hpZGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLyogVGhpcyBjb2RlIGhhbmRsZXMgYWxsIG9mIHRoZSBuYXZpZ2F0aW9uIHN0dWZmLlxyXG4gICAgICoqIFByb2JhYmx5IGxlYXZlIGl0LiBDcmVkaXQgdG8gaHR0cHM6Ly9ib290c25pcHAuY29tL3NuaXBwZXRzL2ZlYXR1cmVkL2Zvcm0td2l6YXJkLWFuZC12YWxpZGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHZhciBuYXZMaXN0SXRlbXMgPSAkKCdkaXYuc2V0dXAtcGFuZWwgZGl2IGEnKSxcclxuICAgICAgICBhbGxXZWxscyA9ICQoJy5zZXR1cC1jb250ZW50JyksXHJcbiAgICAgICAgYWxsTmV4dEJ0biA9ICQoJy5uZXh0QnRuJyk7XHJcblxyXG4gICAgYWxsV2VsbHMuaGlkZSgpO1xyXG5cclxuICAgIG5hdkxpc3RJdGVtcy5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciAkdGFyZ2V0ID0gJCgkKHRoaXMpLmF0dHIoJ2hyZWYnKSksXHJcbiAgICAgICAgICAgICRpdGVtID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKCEkaXRlbS5oYXNDbGFzcygnZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICBuYXZMaXN0SXRlbXMucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kZWZhdWx0Jyk7XHJcbiAgICAgICAgICAgICRpdGVtLmFkZENsYXNzKCdidG4tcHJpbWFyeScpO1xyXG4gICAgICAgICAgICAkKCdpbnB1dCwgc2VsZWN0JykudG9vbHRpcHN0ZXIoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICBhbGxXZWxscy5oaWRlKCk7XHJcbiAgICAgICAgICAgICR0YXJnZXQuc2hvdygpO1xyXG4gICAgICAgICAgICAkdGFyZ2V0LmZpbmQoJ2lucHV0OmVxKDApJykuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiBIYW5kbGVzIHZhbGlkYXRpbmcgdXNpbmcgalF1ZXJ5IHZhbGlkYXRlLlxyXG4gICAgICovXHJcbiAgICBhbGxOZXh0QnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjdXJTdGVwID0gJCh0aGlzKS5jbG9zZXN0KFwiLnNldHVwLWNvbnRlbnRcIiksXHJcbiAgICAgICAgICAgIGN1clN0ZXBCdG4gPSBjdXJTdGVwLmF0dHIoXCJpZFwiKSxcclxuICAgICAgICAgICAgbmV4dFN0ZXBXaXphcmQgPSAkKCdkaXYuc2V0dXAtcGFuZWwgZGl2IGFbaHJlZj1cIiMnICsgY3VyU3RlcEJ0biArICdcIl0nKS5wYXJlbnQoKS5uZXh0KCkuY2hpbGRyZW4oXCJhXCIpLFxyXG4gICAgICAgICAgICBjdXJJbnB1dHMgPSBjdXJTdGVwLmZpbmQoXCJpbnB1dFwiKSxcclxuICAgICAgICAgICAgaXNWYWxpZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vTG9vcCB0aHJvdWdoIGFsbCBpbnB1dHMgaW4gdGhpcyBmb3JtIGdyb3VwIGFuZCB2YWxpZGF0ZSB0aGVtLlxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VySW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghJChjdXJJbnB1dHNbaV0pLnZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcclxuICAgICAgICAgICAgLy9Qcm9ncmVzcyB0byB0aGUgbmV4dCBwYWdlLlxyXG4gICAgICAgICAgICBuZXh0U3RlcFdpemFyZC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICAvLyAjICMgIyBBSkFYIFJFUVVFU1QgSEVSRSAjICMgIyBcclxuXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIFRoZW9yZXRpY2FsbHksIGluIG9yZGVyIHRvIHByZXNlcnZlIHRoZSBzdGF0ZSBvZiB0aGUgZm9ybSBzaG91bGQgdGhlIHdvcnN0IGhhcHBlbiwgd2UgY291bGQgdXNlIGFuIGFqYXggY2FsbCB0aGF0IHdvdWxkIGxvb2sgc29tZXRoaW5nIGxpa2UgdGhpczpcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vUHJlcGFyZSB0aGUga2V5LXZhbCBwYWlycyBsaWtlIGEgbm9ybWFsIHBvc3QgcmVxdWVzdC5cclxuICAgICAgICAgICAgdmFyIGZpZWxkcyA9IHt9O1xyXG4gICAgICAgICAgICBmb3IodmFyIGk9IDA7IGkgPCBjdXJJbnB1dHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgIGZpZWxkc1skKGN1cklucHV0c1tpXSkuYXR0cihcIm5hbWVcIildID0gJChjdXJJbnB1dHNbaV0pLmF0dHIoXCJuYW1lXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkLnBvc3QoXHJcbiAgICAgICAgICAgICAgICBcImxvY2F0aW9uLnBocFwiLFxyXG4gICAgICAgICAgICAgICAgZmllbGRzLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgIC8vU2lsZW50IHN1Y2Nlc3MgaGFuZGxlci5cclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1RoZSBGSU5BTCBidXR0b24gb24gbGFzdCBwYWdlIHNob3VsZCBoYXZlIGl0cyBvd24gbG9naWMgdG8gZmluYWxpemUgdGhlIGVucm9sbWVudC5cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdkaXYuc2V0dXAtcGFuZWwgZGl2IGEuYnRuLXByaW1hcnknKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJ2lucHV0W3R5cGU9ZmlsZV0nKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5maWxlcyk7XHJcbiAgICAgICAgICAgIHZhciBmID0gdGhpcy5maWxlcztcclxuICAgICAgICAgICAgdmFyIGVsID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgaWYgKGYubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5maWxlcywgMSk7XHJcbiAgICAgICAgICAgICAgICBlbC50ZXh0KCdTb3JyeSwgbXVsdGlwbGUgZmlsZXMgYXJlIG5vdCBhbGxvd2VkJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZWwucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgIGVsLmh0bWwoZlswXS5uYW1lICsgJzxicj4nICtcclxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInNtbFwiPicgK1xyXG4gICAgICAgICAgICAgICAgJ3R5cGU6ICcgKyBmWzBdLnR5cGUgKyAnLCAnICtcclxuICAgICAgICAgICAgICAgIE1hdGgucm91bmQoZlswXS5zaXplIC8gMTAyNCkgKyAnIEtCPC9zcGFuPicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCdpbnB1dFt0eXBlPWZpbGVdJykub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJ2lucHV0W3R5cGU9ZmlsZV0nKS5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSh3aW5kb3csIGpRdWVyeSkpOyJdfQ==
