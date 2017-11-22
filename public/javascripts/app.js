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
            parent.addClass('banner-selected');
        });
    });

    // function Banner() {

    //     var keyword = "Jara Web Services";
    //     var canvas;
    //     var context;

    //     var bgCanvas;
    //     var bgContext;

    //     var denseness = 10;

    //     //Each particle/icon
    //     var parts = [];

    //     var mouse = { x: -100, y: -100 };
    //     var mouseOnScreen = false;

    //     var itercount = 0;
    //     var itertot = 40;

    //     this.initialize = function(canvas_id) {
    //         canvas = document.getElementById(canvas_id);
    //         context = canvas.getContext('2d');

    //         canvas.width = window.innerWidth;
    //         canvas.height = window.innerHeight;

    //         bgCanvas = document.createElement('canvas');
    //         bgContext = bgCanvas.getContext('2d');

    //         bgCanvas.width = window.innerWidth;
    //         bgCanvas.height = window.innerHeight;

    //         canvas.addEventListener('mousemove', MouseMove, false);
    //         canvas.addEventListener('mouseout', MouseOut, false);

    //         start();
    //     }

    //     var start = function() {

    //         bgContext.fillStyle = "#000000";
    //         bgContext.font = '200px impact';
    //         bgContext.fillText(keyword, 85, 275);

    //         clear();
    //         getCoords();
    //     }

    //     var getCoords = function() {
    //         var imageData, pixel, height, width;

    //         imageData = bgContext.getImageData(0, 0, canvas.width, canvas.height);

    //         // quickly iterate over all pixels - leaving density gaps
    //         for (height = 0; height < bgCanvas.height; height += denseness) {
    //             for (width = 0; width < bgCanvas.width; width += denseness) {
    //                 pixel = imageData.data[((width + (height * bgCanvas.width)) * 4) - 1];
    //                 //Pixel is black from being drawn on. 
    //                 if (pixel == 255) {
    //                     drawCircle(width, height);
    //                 }
    //             }
    //         }

    //         setInterval(update, 40);
    //     }

    //     var drawCircle = function(x, y) {

    //         var startx = (Math.random() * canvas.width);
    //         var starty = (Math.random() * canvas.height);

    //         var velx = (x - startx) / itertot;
    //         var vely = (y - starty) / itertot;

    //         parts.push({
    //             c: '#' + (Math.random() * 0x949494 + 0xaaaaaa | 0).toString(16),
    //             x: x, //goal position
    //             y: y,
    //             x2: startx, //start position
    //             y2: starty,
    //             r: true, //Released (to fly free!)
    //             v: { x: velx, y: vely }
    //         })
    //     }

    //     var update = function() {
    //         var i, dx, dy, sqrDist, scale;
    //         itercount++;
    //         clear();
    //         for (i = 0; i < parts.length; i++) {

    //             //If the dot has been released
    //             if (parts[i].r == true) {
    //                 //Fly into infinity!!
    //                 parts[i].x2 += parts[i].v.x;
    //                 parts[i].y2 += parts[i].v.y;
    //                 //Perhaps I should check if they are out of screen... and kill them?
    //             }
    //             if (itercount == itertot) {
    //                 parts[i].v = { x: (Math.random() * 6) * 2 - 6, y: (Math.random() * 6) * 2 - 6 };
    //                 parts[i].r = false;
    //             }


    //             //Look into using svg, so there is no mouse tracking.
    //             //Find distance from mouse/draw!
    //             dx = parts[i].x - mouse.x;
    //             dy = parts[i].y - mouse.y;
    //             sqrDist = Math.sqrt(dx * dx + dy * dy);

    //             if (sqrDist < 20) {
    //                 parts[i].r = true;
    //             }

    //             //Draw the circle
    //             context.fillStyle = parts[i].c;
    //             context.beginPath();
    //             context.arc(parts[i].x2, parts[i].y2, 4, 0, Math.PI * 2, true);
    //             context.closePath();
    //             context.fill();

    //         }
    //     }

    //     var MouseMove = function(e) {
    //         if (e.layerX || e.layerX == 0) {
    //             //Reset particle positions
    //             mouseOnScreen = true;


    //             mouse.x = e.layerX - canvas.offsetLeft;
    //             mouse.y = e.layerY - canvas.offsetTop;
    //         }
    //     }

    //     var MouseOut = function(e) {
    //         mouseOnScreen = false;
    //         mouse.x = -100;
    //         mouse.y = -100;
    //     }

    //     //Clear the on screen canvas
    //     var clear = function() {
    //         context.fillStyle = '#333';
    //         context.beginPath();
    //         context.rect(0, 0, canvas.width, canvas.height);
    //         context.closePath();
    //         context.fill();
    //     }
    // }

    // var banner = new Banner();
    // banner.initialize("canvas");

    +

    $(function() {
        $(document).on('ready', function(e) {
            var $searchOverlay = $('.body-overlay'),
                $searchTrigger = $('#search-trigger'),
                $search = $('#search-overlay-form input[type="search"]');


            $(".basket-trigger").click(function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                $(this).next('.basket-content').toggleClass('open-basket');
            });

            $('.mobile-toggle').click(function(e) {
                e.preventDefault();
                $('#header-nav nav').toggleClass('open-nav');
            });

            $searchTrigger.click(function(e) {
                $searchOverlay.fadeIn(500);
                $search.focus();
            });

            $('#spanHover').click(function(e) {
                $searchOverlay.fadeIn(500);
                $search.focus();
            });

            $searchOverlay.find('.fa-times').click(function(e) {
                $searchOverlay.fadeOut(500);
            });

            $('.search-trigger')

            $(window).scroll(function() {
                if ($(window).scrollTop() > 20) {
                    $("body").addClass("scrolled");
                } else {
                    $("body").removeClass("scrolled");
                }
            });
        })
    });
}(window, jQuery));