jQuery(document).ready(function($){

	var $w = $(window);
	var $d = $(document);
    var $footer = $('footer[role="contentinfo"]');
    var $main = $('main[role="main"]');
    var $menu = $('#header-nav_menu_mobile');  //mobile menu

    var ac = 'a-show'; //class for animations
    // var $nav = $('#header-nav');
    var $nav = $('#header-nav__container');
    var fixNav = 'fixed'; //class for fixed navigation

    var t = true; // counter for some timers (not to repeat every ms something, e.g. while srolling)
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

    function IndexAnimation(){

        var showPos = 350;

        if( $w.scrollTop() > showPos){

            $('#nav-logo').addClass(ac);
            $('#nav-menu').addClass(ac);
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
                    $main.css('margin-bottom', $footer.height());
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

    if( $w.scrollTop() >= navPos ){
        $nav.addClass(fixNav);
        $main.css('padding-top', mainPadTop + $nav.height()); //fix navigation at start if it is on top
    }

    function FixNav(){

        if( $w.scrollTop() >= navPos){
            $nav.addClass(fixNav);
            $main.css('padding-top', mainPadTop + $nav.height());
        }
        else{
            $nav.removeClass(fixNav);
            $main.css('padding-top', mainPadTop );
        }
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
                        $subm.slideUp();
                        $this.removeClass(active);
                    });

                $this.addClass(active);

                // $subm.focusout(function(){
                //     $subm.slideUp();
                //     $this.removeClass(active);
                // });
            }
            else{
                $subm.slideUp();
                $this.removeClass(active);
            }
        }
    });




    /*---  Adjust "top" property for slides ---*/
    // var t2 = true; //timer switch
    // var $slide = $('.slide');
    
    // $slide.css('top', $nav.offset().top - $w.scrollTop() + $nav.outerHeight(true));

    // function SetTopForSlide(){

    //     if(t2 == true){
    //         $slide.css('top', $nav.offset().top - $w.scrollTop() + $nav.outerHeight(true));

    //         t2 = false;
    //         setTimeout(function(){t2 = true}, 10);
    //     }
    // }

    // $w.bind('scroll', SetTopForSlide);





    /*===  end of Header interactions ===*/







    /*===  HEADER MENU ===*/


    /*--- Menu toggle ---*/

    $.fn.toggle = function (options) {

        var settings = $.extend({
            active:     'active' //active class (toggle with css and media queries)
        }, options);


        return this.each(function () {
            $el = $(this);

            if(!$el.hasClass(settings.active)){
                console.log('open');

                $el
                    .addClass(settings.active)
                    .attr('tabindex', 1)
                    .focus(function(){
                        console.log($el.attr('id') + 'show');
                    })
                    .focusout(function(){
                        console.log('lost');
                        $el.removeClass(settings.active);
                    });
            }
            else{
                console.log('open');
                $el.removeClass(settings.active);
            }

        });

    };



    var classAct = 'active';

    $('.header-nav_btn').on('click', function(){  //no need to cancel default actions here, this function just for set classes, interactions later
        $o = $(this);

        if (!$o.hasClass(classAct))
            $o.addClass(classAct)
        else
            $o.removeClass(classAct)
    });


    $('.close_parent').on('click', function(e){ //close mobile menu or phone call menu
        e.preventDefault();
        e.stopPropagation();

        var $this = $(this);

        $this.parent().removeClass(classAct);
        $($this.data('tog')).removeClass(classAct);
    });


    t3 = true;

    function MenuDesktop(){
        if(t3 == true){

            if($w.width() > tablet)
                $menu.removeClass(classAct);

            t3 = false;
            setTimeout(function(){t3 = true}, 50);
        }
    }



    $('#header-menuTogl').on('click', function(e){ //toogle mobile menu
        e.preventDefault();
        e.stopPropagation();

        $menu.toggle();

        // if($menu.is(':hidden'))
        //     $menu.addClass(classAct);
        // else
        //     $menu.removeClass(classAct);
    });


    // var $PhoneMenu = $('#header-nav_menu_phone');

    $('#header-phone_tog').on('click', function(e){ //toogle menu with phone call

        if($w.width() > mobile){
            e.preventDefault();
            e.stopPropagation();

            $('#header-nav_menu_phone').toggle();

            // if($PhoneMenu.is(':hidden'))
            //     $PhoneMenu.addClass(classAct);
            // else
            //     $PhoneMenu.removeClass(classAct);
        }
    });
    


    $w.bind('resize', MenuDesktop); 

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