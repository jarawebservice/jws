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