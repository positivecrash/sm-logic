jQuery(document).ready(function($){

	var $w = $(window);
	var $d = $(document);
    var $footer = $('footer[role="contentinfo"]');
    var $main = $('main[role="main"]');  //container for main content, sets paddings and margins for parallax effects
    var $menu = $('#header-nav_menu_mobile');  //mobile menu

    var $nav = $('#header-nav__container');
    var fixNav = 'fixed'; //class for fixed navigation

    var mainPadTop = 84; // padding-top for main, for summ while fixing menu
    var mobile = 670; //media query
    var tablet = 820; //media query

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

            if($el.find('.'+settings.cCur).length > 0 ){  //detecting if current tab has been set already
                $cont.html($el.find('.'+settings.cCur).find(settings.cText).html()); //copy tab content to desktop block
            }
            else{
                $cont.html($el.find(settings.cText).first().html()); //copy tab content to desktop block
                $el.find(settings.elCur).first().addClass(settings.cCur); //set current class for tab
            }

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
	if (typeof ($.fn.fancybox) != 'undefined') {
		var fancyBoxDefaults = {
            padding: 0,
			margin: 10,
            helpers: {
                overlay: {
                  locked: false
                }
              },
			tpl: {
				closeBtn : '<a title="Закрыть" class="fancybox-item fbx-close" href="javascript:;">Закрыть окно</a>',
				next     : '<a title="Следующий" class="fancybox-nav fancybox-next" href="javascript:;"><span class="icon icon-arrDarkRight"></span></a>',
				prev     : '<a title="Предыдущий" class="fancybox-nav fancybox-prev" href="javascript:;"><span class="icon icon-arrDarkLeft"></span></a>'
			}
		}

		$('.fancybox').fancybox(fancyBoxDefaults);
	}

	/*===  end of FANCYBOX ===*/


   

    /*===  Scroll 1 screen away ===*/
    $('#banner_arrow').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        $('html, body').animate({scrollTop: $('#scrn-1').height() }, 1000);
    });
    /*===  end of Scroll 1 screen away ===*/


    /*===  Index animation while scrolling ===*/

    var ac = 'a-show'; //class for animations

    function IndexAnimation(){

        var showPos = 350;

        if( $w.scrollTop() > showPos){

            $('#nav-logo').addClass(ac);
            $('#nav-toggles').addClass(ac);
        }

        if ($w.scrollTop() > ($('#solutions').offset().top - showPos))
            $('#solutions').addClass(ac);

        if ($w.scrollTop() > ($('#services').offset().top - showPos)){
            $('#services').addClass(ac);

            $w.unbind('scroll', IndexAnimation); //end tracking scroll event
        }
            
    }


    if($('.p-index').length > 0) //detect if there is index page
        $w.bind('scroll', IndexAnimation);

    /*===  end of Index animation while scrolling ===*/



    /*===  Footer interactions ===*/

    var t = true;  //timer switch

    function FixFooter(){

        if(t == true){

            /*---  Fix footer for pages with welcome screen ---*/

            if($('#scrn-1').length > 0){
                if( $w.scrollTop() > $('#scrn-1').height()){
                    $footer.addClass('fixed');
                    $main.css('margin-bottom', $footer.height() - 1);
                }
                else{
                    $footer.removeClass('fixed');
                    $main.css('margin-bottom', 0);
                }
            }


            t = false;
            setTimeout(function(){t = true}, 50);
        }
    }

    $w.bind('scroll', FixFooter);

    /*===  end of Footer interactions ===*/




    /*===  Header interactions ===*/



    /*---  Fix navigation on top ---*/

    var navPos = $nav.offset().top + 3;

    if( $w.scrollTop() >= navPos )
        $nav.addClass(fixNav);

    function FixNav(){

        if( $w.scrollTop() >= navPos)
            $nav.addClass(fixNav, 2000);
        else
            $nav.removeClass(fixNav, 2000);
    }
    $w.bind('scroll', FixNav);




    /*---  Submenu interactions, for desctop ---*/

    $('#header-nav_menu .parent > a').on('click', function(e){
        
        if($w.width() > mobile){
            e.preventDefault();
            e.stopPropagation();


            $this = $(this);
            $subm = $(this).parent('li').find('ul');
            active = 'active';

            if($subm.is(':hidden')){
                $subm
                    .css('top', $nav.outerHeight(true)/2 + $(this).parent('li').height()/2)
                    .slideDown()
                    .attr('tabindex', 1).focus()
                    .focusout(function(){
                        $subm
                            .slideUp()
                            .attr('tabindex', -1);
                        $this.removeClass(active);
                    });

                $this.addClass(active);

            }
            else{
                $subm.slideUp();
                $this.removeClass(active);
            }
        }
    });



    /*---  Solve focus problems ---*/

    $('.slide__wrap form, .slide__wrap form *')
    .focus(function() {
        $(this).closest('.slide__wrap').addClass('formfocused');
    })
    .blur(function(){
        $(this).closest('.slide__wrap').removeClass('formfocused');
    });



    /*---  Solve display:flex problem for old browsers ---*/

    if (!Modernizr.flexbox) {

        $('.banner_fore').each(function(){
            $(this).css('top', ($(this).closest('.banner_back').height() - $(this).innerHeight())/2);
        });
    }



    /*===  end of Header interactions ===*/




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