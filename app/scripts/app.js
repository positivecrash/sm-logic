jQuery(document).ready(function($){

	var $w = $(window);
	var $d = $(document);
    var $footer = $('footer[role="contentinfo"]');
    var $main = $('main[role="main"]');

    var t = true; // counter for some timers (not to repeat every ms something, e.g. while srolling)
    var mainPadTop = 84; // padding-top for main, for summ while fixing menu
    var mobile = 670; //media query

	/*===  TABS ===*/

	$.fn.tabs = function (options) {

        var settings = $.extend({
            cTog:               '.tab_tog', //tab toogler
            cText:              '.tab_text', //tab content
            cCont:              '.tab-content', //desktop block
            elCur:              '.grid-4', //current tab element
            cCur:               'current' //current tab class
        }, options);


        return this.each(function () {
            $el = $(this);
            $tog = $el.find(settings.cTog);
        	$cont = $el.find(settings.cCont);

            $cont.html($el.find(settings.cText).first().html()); //copy tab content to desktop block
            $el.find(settings.elCur).first().addClass(settings.cCur);

            $tog.on('click', function(e){
                e.preventDefault();
                e.stopPropagation();

                $cont.html($(this).parent().find(settings.cText).html()); //copy tab content to desktop block
                
                //set class for current tab
                $tog = $(this).parents(settings.elCur);

                if ($tog.hasClass(settings.cCur))
                    $tog.removeClass(settings.cCur);
                else{
                    $(settings.elCur).removeClass(settings.cCur);
                    $tog.addClass(settings.cCur);
                }
            });
        });
    };


	if ($('.tabs').length > 0) {
		$('.tabs').tabs();
	}
	/*===  END TABS ===*/



	/*===  FANCYBOX ===*/
	// if (typeof ($.fn.fancybox) != 'undefined') {
	// 	var fancyBoxDefaults = {
 //            padding: 0,
	// 		margin: 10,
	// 		tpl: {
	// 			closeBtn : '<a title="Закрыть" class="fancybox-item sprite-cancel" href="javascript:;"></a>',
	// 			next     : '<a title="Следующий" class="fancybox-nav fancybox-next" href="javascript:;"><span class="icon icon-arrDarkRight"></span></a>',
	// 			prev     : '<a title="Предыдущий" class="fancybox-nav fancybox-prev" href="javascript:;"><span class="icon icon-arrDarkLeft"></span></a>'
	// 		}
	// 	}

	// 	// everything that popus, including image galleries
	// 	$('.fancybox').fancybox(fancyBoxDefaults);

		
	// 	// href points to html page as a fallback, data-fancyboxlink to anchor of fancybox popup
	// 	$('.fancybox-linked').on('click', function(e){
	// 		e.preventDefault();
	// 		e.stopPropagation();

	// 		$.fancybox(
	// 			$.extend({}, fancyBoxDefaults, {
	// 	        	href: $(this).data('fancyboxlink')
	// 	    	}))
	// 	});
	// }

	/*===  end of FANCYBOX ===*/


   

    /*===  Scroll 1 screen away ===*/
    $('#banner_arrow').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        $('html, body').animate({scrollTop: $('#scrn-1').height() }, 1000);
    });



    /*===  Some actions while scrolling ===*/
    
    t = true;

    var ac = 'a-show'; //class for animations
    var $nav = $('#header-nav');
    var navPos = $nav.offset().top + $nav.height();

    //fix navigation at start if it is on top
    if( $w.scrollTop() >= navPos ){
        $nav.addClass('fixed');
        $main.css('padding-top', mainPadTop + $nav.height() );
    }


    //actions
    function ShowLogo(){

        if(t == true){

            /*---  for Index page ---*/
            if($('.p-index').length > 0){

                var showPos = 350;

                if( $w.scrollTop() > showPos){

                    $('#nav-logo').addClass(ac);
                    $('#nav-menu').addClass(ac);
                }

                if ($w.scrollTop() > ($('#solutions').offset().top - showPos))
                    $('#solutions').addClass(ac);

                if ($w.scrollTop() > ($('#services').offset().top - showPos))
                    $('#services').addClass(ac);
            }

            /*---  Fix footer for pages with welcome screen ---*/

            if($('#scrn-1').length > 0){
                if( $w.scrollTop() > $('#scrn-1').height()){
                    $footer.addClass('fixed');
                    $main.css('margin-bottom', $footer.height());
                }
                else{
                    $footer.removeClass('fixed');
                    $main.css('margin-bottom', 0);
                }
            }

            /*---  Fix navigation on top ---*/

            if( $w.scrollTop() >= navPos){
                $nav.addClass('fixed');
                $main.css('padding-top', mainPadTop + $nav.height() );
            }
            else{
                $nav.removeClass('fixed');
                $main.css('padding-top', mainPadTop );
            }


            t = false;
            setTimeout(function(){t = true}, 50);
        }
    }

    $w.bind('scroll', ShowLogo); 

    /*===  end of Some actions while scrolling ===*/



    /*===  HEADER MENU ===*/
    /*---  Submenu interactions ---*/
    $('#header-nav_menu .parent > a').on('click', function(e){
        
        if($w.width() > mobile){
            e.preventDefault();
            e.stopPropagation();


            $this = $(this);
            $subm = $(this).parent('li').find('ul');
            active = 'active';

            if($subm.is(':hidden')){
                $subm
                    .slideDown()
                    .attr('tabindex', 1).focus();

                $this.addClass(active);

                $subm.focusout(function(){
                    $subm.slideUp();
                    $this.removeClass(active);
                });
            }
            else{
                $subm.slideUp();
                $this.removeClass(active);
            }
        }
    });


    /*--- Menu toggle ---*/
    var $menu = $('#header-nav_menu');
    $menu.data('open', 'false');

    $('#header-menuTogl').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        if($menu.is(':hidden')){
            $menu
                .slideDown()
                .data('open', 'true');
        }
        else{
            $menu
                .slideUp()
                .data('open', 'false');
        }
    });

    $('#header-nav_menu__close').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        $menu.slideUp();
    });


    /*--- Menu toggle - show menu for desktop anyway ---*/
    t = true;
    function MenuDesktop(){
        if(t == true){

            if($w.width() > 820){
                $menu.css({'display':'flex'});
            }
            else{
                if($menu.data('open') == 'true')
                    $menu.css({'display':'block'});
                else
                    $menu.css({'display':'none'});
            }

            t = false;
            setTimeout(function(){t = true}, 50);
        }
    }

    $w.on('resize', MenuDesktop); 

    /*===  end of HEADER MENU ===*/



    /*===  SOME RANDOM THIGS ===*/
    $('input[placeholder], textarea[placeholder]').placeholderEnhanced();

    /*--- Google Map controlling scroll ---*/
    $('#footer-map')
        .on('click', function(){
            $(this).find('iframe').addClass('clicked');
        })
        .mouseleave(function(){
            $(this).find('iframe').removeClass('clicked');
        });


    /*--- Disable hover on touchscreens (works not for all screens) ---*/
    if (Modernizr.touchevents) {
      $('body *').unbind('mouseenter mouseleave');
    } else {
      $('body *').bind('mouseenter mouseleave');
    }
    /*===  end of SOME RANDOM THIGS ===*/

});