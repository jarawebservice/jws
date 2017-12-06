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

    // $('div.setup-panel div a.btn-primary').trigger('click');

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


}(window, jQuery));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24od2luZG93LCAkKSB7XHJcblxyXG4gICAgd2luZG93LnV0aWwgPSB7XHJcblxyXG4gICAgICAgIGdldERhdGVTdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZHQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgbW9udGggPSAoZHQuZ2V0TW9udGgoKSArIDEpO1xyXG4gICAgICAgICAgICB2YXIgZGF5ID0gZHQuZ2V0RGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgbW9udGggPSBtb250aCA+IDEwID8gbW9udGggOiAnMCcgKyBtb250aDtcclxuICAgICAgICAgICAgZGF5ID0gZGF5ID4gMTAgPyBkYXkgOiAnMCcgKyBkYXk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZHQuZ2V0RnVsbFllYXIoKSArICctJyArIG1vbnRoICsgJy0nICsgZGF5O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbmRlck1hcmt1cDogZnVuY3Rpb24oc291cmNlU2VsZWN0b3IsIGRlc3RpbmF0aW9uU2VsZWN0b3IsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHZhclxyXG4gICAgICAgICAgICAgICAgJHNvdXJjZSA9ICQoc291cmNlU2VsZWN0b3IpLFxyXG4gICAgICAgICAgICAgICAgJGRlc3RpbmF0aW9uID0gJChkZXN0aW5hdGlvblNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkc291cmNlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICRkZXN0aW5hdGlvbi5odG1sKHdpbmRvdy51dGlsLnJlcGxhY2VCcmFja2V0cygkc291cmNlLmh0bWwoKSkpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soJHNvdXJjZSwgJGRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlcGxhY2VCcmFja2V0czogZnVuY3Rpb24obWFya3VwKSB7XHJcbiAgICAgICAgICAgIG1hcmt1cCA9IG1hcmt1cC5yZXBsYWNlKC9cXDwvZywgJyZsdDsnKTtcclxuICAgICAgICAgICAgbWFya3VwID0gbWFya3VwLnJlcGxhY2UoL1xcPi9nLCAnJmd0OycpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWFya3VwO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgJGNvZGVDb250YWluZXIgPSAkKCcjY29kZS1jb250YWluZXInKSxcclxuICAgICAgICAgICAgJGNvZGVCbG9jayA9ICQoJyNjb2RlLWJsb2NrJyk7XHJcblxyXG4gICAgICAgIGlmICgkY29kZUNvbnRhaW5lci5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICRjb2RlQmxvY2subGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgc3JjID0gJGNvZGVCbG9jay5odG1sKCkucmVwbGFjZSgnXFxuJywgJycpO1xyXG4gICAgICAgICAgICAkY29kZUNvbnRhaW5lci5odG1sKHdpbmRvdy51dGlsLnJlcGxhY2VCcmFja2V0cyhzcmMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJ3ByZSBjb2RlJykuZWFjaChmdW5jdGlvbihpLCBibG9jaykge1xyXG4gICAgICAgICAgICBobGpzLmhpZ2hsaWdodEJsb2NrKGJsb2NrKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd2luZG93LnV0aWwucmVuZGVyTWFya3VwKCcjZGVtby1jb250ZW50LWNvbnRhaW5lcicsICcjZGVtby1tYXJrdXAnLCBmdW5jdGlvbihzcmMsIGRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGhsanMuaGlnaGxpZ2h0QmxvY2soZGVzdGluYXRpb25bMF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYmFubmVyID0gJCgnLmJhbm5lci1zZWxlY3RlZCcpLmNoaWxkcmVuKCcuYmFubmVyLWl0ZW0nKS5hdHRyKCdmb3InKTtcclxuXHJcbiAgICAgICAgJCgnLmJhbm5lci1pdGVtJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyID0gJCh0aGlzKS5hdHRyKCdmb3InKTtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcblxyXG4gICAgICAgICAgICAkKCcuYmFubmVyJykucmVtb3ZlQ2xhc3MoJ2Jhbm5lci1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICBwYXJlbnQuYWRkQ2xhc3MoJ2Jhbm5lci1zZWxlY3RlZCcsICdkb250U2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIGNsaWNrIG9uIHRvZ2dsZSBzZWFyY2ggYnV0dG9uXHJcbiAgICAgICAgJCgnI3RvZ2dsZS1zZWFyY2gnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnI3NlYXJjaC1mb3JtLCAjdG9nZ2xlLXNlYXJjaCcpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIGNsaWNrIG9uIHNlYXJjaCBzdWJtaXQgYnV0dG9uXHJcbiAgICAgICAgJCgnI3NlYXJjaC1mb3JtIGlucHV0W3R5cGU9c3VibWl0XScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcjc2VhcmNoLWZvcm0sICN0b2dnbGUtc2VhcmNoJykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJyNzZWFyY2gtZG9tYWluJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJyNzZWFyY2gtZm9ybSwgI3RvZ2dsZS1zZWFyY2gnKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gQ2xpY2tpbmcgb3V0c2lkZSB0aGUgc2VhcmNoIGZvcm0gY2xvc2VzIGl0XHJcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGFyZ2V0LmlzKCcjdG9nZ2xlLXNlYXJjaCcpICYmICF0YXJnZXQuY2xvc2VzdCgnI3NlYXJjaC1mb3JtJykuc2l6ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjc2VhcmNoLWZvcm0sICN0b2dnbGUtc2VhcmNoJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vICQoJy5zZWFyY2gtZm9ybScpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xyXG4gICAgLy8gICAgIHZhciB1c2VybmFtZSA9IFwiWU9VUl9VU0VSTkFNRVwiO1xyXG4gICAgLy8gICAgIHZhciBwYXNzd29yZCA9IFwiWU9VUl9QQVNTV09SRFwiO1xyXG4gICAgLy8gICAgIHZhciBkb21haW4gPSAkKCdzZWFyY2hfdGV4dCcpLnZhbCgpO1xyXG4gICAgLy8gICAgIHZhciBmb3JtYXQgPSBcIkpTT05cIlxyXG4gICAgLy8gICAgICQuYWpheCh7XHJcbiAgICAvLyAgICAgICAgIHVybDogXCJodHRwOi8vd3d3Lndob2lzeG1sYXBpLmNvbS93aG9pc3NlcnZlci9XaG9pc1NlcnZpY2VcIixcclxuICAgIC8vICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgLy8gICAgICAgICBkYXRhOiB7XHJcbiAgICAvLyAgICAgICAgICAgICBjbWQ6IFwiR0VUX0ROX0FWQUlMQUJJTElUWVwiLFxyXG4gICAgLy8gICAgICAgICAgICAgZG9tYWluTmFtZTogZG9tYWluLFxyXG4gICAgLy8gICAgICAgICAgICAgdXNlcm5hbWU6ICd3YWxlYW5kZXInLFxyXG4gICAgLy8gICAgICAgICAgICAgcGFzc3dvcmQ6ICdpYW1ib3JuMndpbicsXHJcbiAgICAvLyAgICAgICAgICAgICBvdXRwdXRGb3JtYXQ6IGZvcm1hdFxyXG4gICAgLy8gICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAkKFwiI3Jlc3VsdHNcIikuYXBwZW5kKFwiPHByZT5cIiArIEpTT04uc3RyaW5naWZ5KGRhdGEsIFwiXCIsIDIpICsgXCI8L3ByZT5cIik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gfSk7XHJcblxyXG5cclxuICAgIHZhciBza2V3Q29udGVudEhhbmRsZXIgPSBmdW5jdGlvbihkZWZhdWx0SHRtbCkge1xyXG4gICAgICAgIHZhciAkc2tldyA9ICQoXCIuc2tld1wiKTtcclxuICAgICAgICB2YXIgJHNrZXdXcmFwcGVyID0gJChcIi5za2V3LXdyYXBwZXJcIik7XHJcbiAgICAgICAgdmFyICRkaXNwbGF5ID0gJChcIi5za2V3LWNvbnRlbnQtdGFyZ2V0XCIpO1xyXG4gICAgICAgICRza2V3LmhvdmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgY29udGVudCA9ICQodGhpcykuZmluZChcIi5za2V3LWNvbnRlbnRcIikuaHRtbCgpO1xyXG4gICAgICAgICAgICAkZGlzcGxheS5oaWRlKCkuaHRtbChjb250ZW50KS5mYWRlSW4oMjUwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNrZXdXcmFwcGVyLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkaXNwbGF5LmhpZGUoKS5odG1sKGRlZmF1bHRIdG1sKS5mYWRlSW4oMjUwKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBza2V3VGFyZ2V0SHRtbCA9ICQoXCIuc2tldy1jb250ZW50LXRhcmdldFwiKS5odG1sKCk7XHJcbiAgICBza2V3Q29udGVudEhhbmRsZXIoc2tld1RhcmdldEh0bWwpO1xyXG5cclxuXHJcbiAgICAkKCcuc2VjdGlvbicpLm5vdChcIiNzZWN0aW9uMVwiKS5oaWRlKCk7XHJcbiAgICAkKCcuc2hvdycpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoXCJhLnNob3ctYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwic2hvdy1hY3RpdmVcIik7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInNob3ctYWN0aXZlXCIpO1xyXG4gICAgICAgICQoJyNzZWN0aW9uJyArICQodGhpcykuYXR0cigndGFyZ2V0JykpLmZhZGVJbig0MDApLnNpYmxpbmdzKCcuc2VjdGlvbicpLmZhZGVPdXQoMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGb3IgdGhlIGZvcm0gXHJcbiAgICAvL3ZhbGlkYXRpb25cclxuICAgICQoJ2lucHV0LCBzZWxlY3QnKS50b29sdGlwc3Rlcih7XHJcbiAgICAgICAgdHJpZ2dlcjogJ2N1c3RvbScsXHJcbiAgICAgICAgb25seU9uZTogZmFsc2UsXHJcbiAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXHJcbiAgICAgICAgdGhlbWU6ICd0b29sdGlwc3Rlci1saWdodCdcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZm9ybVwiKS52YWxpZGF0ZSh7XHJcbiAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uKGVycm9yLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0RXJyb3IgPSAkKGVsZW1lbnQpLmRhdGEoJ2xhc3RFcnJvcicpLFxyXG4gICAgICAgICAgICAgICAgbmV3RXJyb3IgPSAkKGVycm9yKS50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAkKGVsZW1lbnQpLmRhdGEoJ2xhc3RFcnJvcicsIG5ld0Vycm9yKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdFcnJvciAhPT0gJycgJiYgbmV3RXJyb3IgIT09IGxhc3RFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS50b29sdGlwc3RlcignY29udGVudCcsIG5ld0Vycm9yKTtcclxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkudG9vbHRpcHN0ZXIoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24obGFiZWwsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgJChlbGVtZW50KS50b29sdGlwc3RlcignaGlkZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICB2YXIgbmF2TGlzdEl0ZW1zID0gJCgnZGl2LnNldHVwLXBhbmVsIGRpdiBhJyksXHJcbiAgICAgICAgYWxsV2VsbHMgPSAkKCcuc2V0dXAtY29udGVudCcpLFxyXG4gICAgICAgIGFsbE5leHRCdG4gPSAkKCcubmV4dEJ0bicpO1xyXG5cclxuICAgIGFsbFdlbGxzLmhpZGUoKTtcclxuXHJcbiAgICBuYXZMaXN0SXRlbXMuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgJHRhcmdldCA9ICQoJCh0aGlzKS5hdHRyKCdocmVmJykpLFxyXG4gICAgICAgICAgICAkaXRlbSA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgIGlmICghJGl0ZW0uaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgbmF2TGlzdEl0ZW1zLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tZGVmYXVsdCcpO1xyXG4gICAgICAgICAgICAkaXRlbS5hZGRDbGFzcygnYnRuLXByaW1hcnknKTtcclxuICAgICAgICAgICAgJCgnaW5wdXQsIHNlbGVjdCcpLnRvb2x0aXBzdGVyKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgYWxsV2VsbHMuaGlkZSgpO1xyXG4gICAgICAgICAgICAkdGFyZ2V0LnNob3coKTtcclxuICAgICAgICAgICAgJHRhcmdldC5maW5kKCdpbnB1dDplcSgwKScpLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyogSGFuZGxlcyB2YWxpZGF0aW5nIHVzaW5nIGpRdWVyeSB2YWxpZGF0ZS5cclxuICAgICAqL1xyXG4gICAgYWxsTmV4dEJ0bi5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY3VyU3RlcCA9ICQodGhpcykuY2xvc2VzdChcIi5zZXR1cC1jb250ZW50XCIpLFxyXG4gICAgICAgICAgICBjdXJTdGVwQnRuID0gY3VyU3RlcC5hdHRyKFwiaWRcIiksXHJcbiAgICAgICAgICAgIG5leHRTdGVwV2l6YXJkID0gJCgnZGl2LnNldHVwLXBhbmVsIGRpdiBhW2hyZWY9XCIjJyArIGN1clN0ZXBCdG4gKyAnXCJdJykucGFyZW50KCkubmV4dCgpLmNoaWxkcmVuKFwiYVwiKSxcclxuICAgICAgICAgICAgY3VySW5wdXRzID0gY3VyU3RlcC5maW5kKFwiaW5wdXRcIiksXHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvL0xvb3AgdGhyb3VnaCBhbGwgaW5wdXRzIGluIHRoaXMgZm9ybSBncm91cCBhbmQgdmFsaWRhdGUgdGhlbS5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cklucHV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoISQoY3VySW5wdXRzW2ldKS52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIC8vUHJvZ3Jlc3MgdG8gdGhlIG5leHQgcGFnZS5cclxuICAgICAgICAgICAgbmV4dFN0ZXBXaXphcmQucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgLy8gIyAjICMgQUpBWCBSRVFVRVNUIEhFUkUgIyAjICMgXHJcblxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICBUaGVvcmV0aWNhbGx5LCBpbiBvcmRlciB0byBwcmVzZXJ2ZSB0aGUgc3RhdGUgb2YgdGhlIGZvcm0gc2hvdWxkIHRoZSB3b3JzdCBoYXBwZW4sIHdlIGNvdWxkIHVzZSBhbiBhamF4IGNhbGwgdGhhdCB3b3VsZCBsb29rIHNvbWV0aGluZyBsaWtlIHRoaXM6XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1ByZXBhcmUgdGhlIGtleS12YWwgcGFpcnMgbGlrZSBhIG5vcm1hbCBwb3N0IHJlcXVlc3QuXHJcbiAgICAgICAgICAgIHZhciBmaWVsZHMgPSB7fTtcclxuICAgICAgICAgICAgZm9yKHZhciBpPSAwOyBpIDwgY3VySW5wdXRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICBmaWVsZHNbJChjdXJJbnB1dHNbaV0pLmF0dHIoXCJuYW1lXCIpXSA9ICQoY3VySW5wdXRzW2ldKS5hdHRyKFwibmFtZVwiKS52YWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgJC5wb3N0KFxyXG4gICAgICAgICAgICAgICAgXCJsb2NhdGlvbi5waHBcIixcclxuICAgICAgICAgICAgICAgIGZpZWxkcyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAvL1NpbGVudCBzdWNjZXNzIGhhbmRsZXIuXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9UaGUgRklOQUwgYnV0dG9uIG9uIGxhc3QgcGFnZSBzaG91bGQgaGF2ZSBpdHMgb3duIGxvZ2ljIHRvIGZpbmFsaXplIHRoZSBlbnJvbG1lbnQuXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gJCgnZGl2LnNldHVwLXBhbmVsIGRpdiBhLmJ0bi1wcmltYXJ5JykudHJpZ2dlcignY2xpY2snKTtcclxuXHJcbiAgICAkKCdpbnB1dFt0eXBlPWZpbGVdJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5maWxlcyk7XHJcbiAgICAgICAgdmFyIGYgPSB0aGlzLmZpbGVzO1xyXG4gICAgICAgIHZhciBlbCA9ICQodGhpcykucGFyZW50KCk7XHJcbiAgICAgICAgaWYgKGYubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpbGVzLCAxKTtcclxuICAgICAgICAgICAgZWwudGV4dCgnU29ycnksIG11bHRpcGxlIGZpbGVzIGFyZSBub3QgYWxsb3dlZCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVsLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xyXG4gICAgICAgIGVsLmh0bWwoZlswXS5uYW1lICsgJzxicj4nICtcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwic21sXCI+JyArXHJcbiAgICAgICAgICAgICd0eXBlOiAnICsgZlswXS50eXBlICsgJywgJyArXHJcbiAgICAgICAgICAgIE1hdGgucm91bmQoZlswXS5zaXplIC8gMTAyNCkgKyAnIEtCPC9zcGFuPicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnaW5wdXRbdHlwZT1maWxlXScpLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdpbnB1dFt0eXBlPWZpbGVdJykub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xyXG4gICAgfSk7XHJcblxyXG5cclxufSh3aW5kb3csIGpRdWVyeSkpOyJdfQ==
