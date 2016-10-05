jQuery(document).ready(function($){

	var $w = $(window);
	var $d = $(document);
    var t = true; // counter for some timers (not to repeat every ms something, e.g. while srolling)


	/*===  TABS ===*/

	// $.fn.simpletabs = function (options) {

 //        var settings = $.extend({
 //            classHeadWrap: '.js-tabs-head',
 //            classTabsWrap: '.js-tabs-content',
 //            classNameActive: 'active',
 //            dataTabId: 'jssimple'
 //        }, options);


 //        return this.each(function () {
 //        	var $tabWrap = $(this); //get Tabs container
 //        	var $tabsTogWrap = $(settings.classHeadWrap); //get container for togglers
 //        	var $tabsTog = $tabsTogWrap.children(); //get Tabs togglers
 //        	var $tabs = $(settings.classTabsWrap).children(); //get Tabs

 //        	var countActive = 0;
 //        	var activeTab = '';


 //        	//count active tab togglers
 //        	$tabsTog.each(function(){
 //        		if($(this).hasClass(settings.classNameActive)){
 //        			activeTab = $(this).data(settings.dataTabId);
 //        			countActive++;
 //        		}
 //        	});

 //        	//if there is no active tab OR if there are a few active tabs, set it fo the first element
 //        	if (countActive == 0 || countActive > 1){
 //        		$tabsTog.removeClass(settings.classNameActive);
 //        		$tabsTogWrap.first().addClass(settings.classNameActive);
 //        		activeTab = $tabsTogWrap.first().data(settings.dataTabId);
 //        	}

 //        	//open active tab
 //        	if (activeTab != ''){
 //        		$tabs.hide();
 //        		$(settings.classTabsWrap).find('#' + activeTab).show();
 //        	}

 //        	$tabsTog.on('click', function(e){
 //        		e.preventDefault();
	// 			e.stopPropagation();

	// 			if(!$(this).hasClass(settings.classNameActive)){

	// 				$tabsTog.removeClass(settings.classNameActive);
	// 				$(this).addClass(settings.classNameActive);
	// 				activeTab = $(this).data(settings.dataTabId);

	// 				$tabs.hide();	
	// 				$(settings.classTabsWrap).find('#' + activeTab).show();
	// 			}
 //        	});
 //        });
 //    };

	// if ($('.js-tabs').length > 0) {
	// 	$('.js-tabs').simpletabs();
	// }
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


   

    /*---  Scroll 1 screen away ---*/
    $('#banner_arrow').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        $('html, body').animate({scrollTop: $('#scrn-1').height() }, 1000);
    });


    /*---  Show logo and phone icon in navigation, only for index  ---*/
    if($('.p-index').length > 0){
        if(!$('#nav-logo').hasClass('a-show'))
            t = true;

        var $nav = $('#header-nav');
        var $text = $('#banner .setw');
        var BannerTextPos = $text.offset().top + $text.height() - 450;

        function ShowLogo(){
            if(t == true){

                console.log('track');

                if( $w.scrollTop() > BannerTextPos){

                    $('#nav-logo').addClass('a-show');
                    $('#nav-menu').addClass('a-show');
                }

                setTimeout(function(){t = true}, 50);
            }
        }

        $w.on('scroll', ShowLogo); 
    }



    /*===  HEADER MENU ===*/
    /*---  Submenu interactions ---*/
    $('#header-nav_menu .parent > a').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        
        var $this = $(this);
        var $subm = $(this).parent('li').find('ul');
        var active = 'active';

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