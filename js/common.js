$(function(){
	$('.fancybox').fancybox({
		padding: 0,
		margin: 10,
		minHeight: false,
		autoHeight: true,
		openEffect: 'fade',
		closeEffect: 'fade',
		openSpeed: 400,
		closeSpeed: 400,
		helpers: {
			overlay: {
				locked: false
			}
		},
		
	});

	$('input[placeholder], textarea[placeholder]').placeholder();
	

	$('.top a.a_button').on('click',function(){
		$('html,body').animate({scrollTop:$($(this).attr('href')).offset().top-200},800);
		return false;
	});
	
	
	$('select').select2({language: "ru"});
	
	$('.load').click(function(){
		$(this).addClass('loading');
	});	
	

	// $('.phone').inputmask('Regex', { 
	// 	regex: "^[+][3][7][5] [(]?([1][5]|([2][9])|([3][3])|([4][4]))[)] [0-9]{3}[-][0-9]{2}[-][0-9]{2}$"
	// });
	
	//$.mask.definitions['h'] = "[1,2,3,4,5,7,9]";
	$(".phone").mask("+375 (99) 999-99-99");


	$('.required_fields .a_button').click(function(){		

		var avatar = $('.photo_upload_inner img').length

		//var inputFile = $('.photo_upload_inner input').val();

		if (avatar == 0) {
			$('.photo_upload').addClass('error');
			$('#avatar_img').val('');
		}
		else{
			$('#avatar_img').val('true');
		}
	});
	$('.photo_upload_inner input').change(function(){
		$('.photo_upload').removeClass('error');
	});	
	
	
	$('.tooltip').tooltipster({
		position: 'bottom'
	});

	jQuery('.scrollbar').scrollbar({
		"scrollx": "advanced",
        "scrolly": "advanced",
        'disableBodyScroll': true
	});
	jQuery('.scrollbar').not('.scroll-wrapper').on("update", function(){
	    console.log('content is update');
	});



	$(window).scroll(function(){
        var top = $(window).scrollTop();
        if (top > 0) {
            $('header').addClass('fixed');
        }
        else{
            $('header').removeClass('fixed');
        };
    });


	function navBody(){
		$('.nav_body').css({
			'height': parseInt($(window).innerHeight()) - parseInt($('.header').innerHeight()) - 20
		});
		$('.nav_body_inner').css({
			'height': $('.nav_body').height()
		});
	}
	$(window).resize(function(){
		navBody();
	})
	navBody();

    $('.nav_head').click(function(){
    	if (!$(this).hasClass('active')) {
    		$(this).addClass('active');
    		$('.nav_body').slideDown(200);
    		$('#nav_overlay').addClass('show');
    		$('html, body').css({
    			// 'position': 'fixed',
    			'overflow': 'hidden',
    			//'height': '100%'
    		});
    	}
    	else{
    		$(this).removeClass('active');
    		$('.nav_body').slideUp(200);
    		$('#nav_overlay').removeClass('show');
    		$('html, body').css({
    			// 'position': '',
    			'overflow': '',
    			//'height': ''
    		});
    	}
    });
    $('#nav_overlay').click(function() {
	    $('.nav_head').removeClass('active');
	    $('.nav_body').slideUp(200);
	    $('#nav_overlay').removeClass('show');
		$('html, body').css({
			//'position': '',
			'overflow': '',
			//'height': ''
		});
	});	


	var width = $('.search_head').innerWidth();
	function searching(){
		if ($(window).width()>=760) {
			$('.search_head').removeAttr('style').removeClass('active');
			$('.search_result').removeAttr('style');
			$('.search_head input').removeClass('active');
			$('.search').removeClass('active');
		};
		var innerPadding = parseInt($('header .inner').css('padding-right'));
		var newWidth = $('header .inner').innerWidth()-$('.search').position().left-innerPadding-10;
		$('.search_head input').click(function(){
			var newWidth = $('header .inner').innerWidth()-$('.search').position().left-innerPadding-10;
			$('.search_head input').focus();
			if ($(window).width()<760) {
				$('.search').addClass('active');
				$('.search_head').addClass('active');
				$('.search_head').css('width', $('header .inner').innerWidth());
			}
			else if (!$('.search_head').hasClass('active')) {
				$('.search').removeClass('active');
				$('.search_head').addClass('active');
				$('.search_head').css('width', newWidth);
			};
		});
		$(document).click(function(event) {
		    if ($(event.target).closest('.search_head').length) return;
		    $('.search_head').removeClass('active');
		    $('.search_head').removeAttr('style');
		    $('.search_result').removeAttr('style');
		    $('.search').removeClass('active');
		    event.stopPropagation();
		});	
		$('.search_close').click(function(){
			$(document).click();
		});
		$('.search_submit').click(function(){
			if ($(window).width()<1024) {
				$('.search_head input').click();
				return false;
			};
		});
	};
	searching();
	$(window).resize(function(){
		searching();
	});
	
	$('.search_head input').keyup(function(){
		$('.search_result').css('height', $(window).height()-100);
		$('.search_result').slideDown(500);
		$('.search_result').css('width', $('.search_head').css('width'));
	});



	$('.entrance_lock').click(function(){
		$(this).toggleClass('active');
		$('.entrance_box').toggleClass('active');
	});


	function menu_change(){
		$('.fixed_menu header').css('width', $('#menu_overlay').width());
		$('.menu_change').click(function(){
			$('body').addClass('fixed_menu');
			$('#menu_overlay').show();
	    	$('header').css('width', $('#menu_overlay').width());
	    	$('.menu_mobile .content_menu').css('height',$(window).height()-parseInt($('.menu_mobile').css('padding-top')));
		});
		$('#menu_overlay').click(function(){
			$('body').removeClass('fixed_menu');
			$('#menu_overlay').hide();
	    	$('header').css('width', 'auto');
		});
	}; 
	menu_change();
	$(window).resize(function(){
		menu_change();
	});


	function all_menu(){
		if ($(window).width()>=1024) {
			var menu_w = 0;
			for (var i = 0; i < $('.menu_pc li').length; i++) {
				menu_w+=$('.menu_pc li').eq(i).innerWidth()+parseInt($('.menu_pc li').eq(i).css('margin-right'));
			};
			if (menu_w>$('.content_menu .inner').width()) {
				$('.content_menu').addClass('menu_lg');
			}
			else{
				$('.content_menu').removeClass('menu_lg');
			}
			$('.all_category').click(function(){
				if (!$('.content_menu').hasClass('active')) {
					$('.content_menu').addClass('active');
					$('.menu_pc').animate({height: $('.menu_pc ul').height()},300);
				}
				else{
					$('.content_menu').removeClass('active');
					$('.menu_pc').animate({height: '60px'},300);
				}
			});
		};
	}
	all_menu();
	$(window).resize(function(){
		all_menu();
	});


	$('.rules_question').click(function(){
		if(!$(this).parents('.rules_box').hasClass('active')){
			$(this).parents('.rules_box').addClass('active');
			$(this).parents('.rules_box').find('.rules_answer').slideDown(300);
		}
		else{
			$(this).parents('.rules_box').removeClass('active');
			$(this).parents('.rules_box').find('.rules_answer').slideUp(300);
		}
	});


	$('.reg_sms').keyup(function(){
		if ($(this).val()!='') {
			$('.sms_button[data-attr="' + $(this).attr('data-attr') + '"]').removeClass('disable');
		}
		else{
			$('.sms_button[data-attr="' + $(this).attr('data-attr') + '"]').addClass('disable');
		}
	});
	$('.sms_button').click(function(){
		if (!$(this).hasClass('disable')) {	
			$(this).hide();
			$('.sms_confirm[data-attr="' + $(this).attr('data-attr') + '"]').show();
			$('.sms_code[data-attr="' + $(this).attr('data-attr') + '"]').show();
		};
		return false;
	});
	$('.sms_code').click(function(){
		$(this).hide();
		$('.sms_confirm[data-attr="' + $(this).attr('data-attr') + '"]').hide();
		$('.phone_change[data-attr="' + $(this).attr('data-attr') + '"]').css('display','block');
		$('.reg_sms[data-attr="' + $(this).attr('data-attr') + '"]').attr('disabled', 'disabled');
		return false;
	});


	$('.soc_net_switch label').click(function(){
		var $parents = $(this).parents('.soc_net_box');
		if (!$parents.hasClass('active')) {
			$parents.addClass('active');
			$parents.find('.soc_net_user').show();
			$parents.find('.soc_net_text').hide();
		}
		else{
			$parents.removeClass('active');
			$parents.find('.soc_net_user').hide();
			$parents.find('.soc_net_text').show();
		}
	});

	var total_size = 0;

	$('.attach_file input[type=file]').change(function() {
		file_size = (this.files[0].size/1024/1024).toFixed(2);
		total_size += parseFloat(file_size);

		var $this = $(this).parents('.attach_file');
		$this.addClass('active');

		if ($('.file_box').length < 4 && total_size < 20) {
			var file_name = $(this).val();
		    if (file_name != '') {
		        $this.append('<div class="file_box"><span class="file_icon"><i class="fa fa-file"></i></span><span class="file_name">'+file_name+'</span><span class="file_size">('+file_size+' Mb)</span><a href="#" class="file_del">Удалить</a><input type="file" value="' + file_name + '"></div>');
		    }
	    }
	    else{
	    	alert('Вы загрузили более 4 файлов или общий вес файлов более 20мб')
	    }
	});

	$( ".attach_file" ).delegate( ".file_del", "click", function() {
		$(this).parents('.attach_file').removeClass('active');
		$(this).parents('.attach_file').find('input[type="file"]').val('');
		$(this).parent().remove();
		return false;
	});


	$('.right_box .fa-plus').click(function(){
		$(this).parents('.right_box').addClass('active')
		$(this).parents('.right_box').find('.right_body').slideDown(300);
	});
	$('.right_box .fa-minus').click(function(){
		$(this).parents('.right_box').removeClass('active')
		$(this).parents('.right_box').find('.right_body').slideUp(300);
	});


	$('.result_schedule').each(function(){
		$(this).find('.result_percent').text($(this).attr('data-percent')*100+'%');
		$(this).find('.result_fill').css('width',$(this).find('.result_percent').text());
	});



	$('.a_cancel').click(function(){
		$.fancybox.close();
		return false;
	});


    $('.popular_carousel').slick({
		infinite: false,
		slidesToShow: 12,
		slidesToScroll: 1,
		prevArrow: '.popular_prev',
		nextArrow: '.popular_next',
		responsive: [
			{
		      breakpoint: 2780,
		      settings: {
		        slidesToShow: 11,
		        slidesToScroll: 1,
		      }
		    },
			{
		      breakpoint: 2600,
		      settings: {
		        slidesToShow: 10,
		        slidesToScroll: 1,
		      }
		    },
			{
		      breakpoint: 2350,
		      settings: {
		        slidesToShow: 9,
		        slidesToScroll: 1,
		      }
		    },
			{
		      breakpoint: 2090,
		      settings: {
		        slidesToShow: 8,
		        slidesToScroll: 1,
		      }
		    },
			{
		      breakpoint: 1850,
		      settings: {
		        slidesToShow: 7,
		        slidesToScroll: 1,
		      }
		    },
			{
		      breakpoint: 1650,
		      settings: {
		        slidesToShow: 6,
		        slidesToScroll: 1,
		      }
		    },
			{
		      breakpoint: 1400,
		      settings: {
		        slidesToShow: 7,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 1200,
		      settings: {
		        slidesToShow: 4,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 760,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
	    ]
    });
    $('.action_carousel').slick({
		infinite: false,
		slidesToShow: 12,
		slidesToScroll: 1,
		prevArrow: '.action_prev',
		nextArrow: '.action_next',
		responsive: [
		    {
		      breakpoint: 3700,
		      settings: {
		        slidesToShow: 11,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 3400,
		      settings: {
		        slidesToShow: 10,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 3100,
		      settings: {
		        slidesToShow: 9,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 2800,
		      settings: {
		        slidesToShow: 8,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 2500,
		      settings: {
		        slidesToShow: 7,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 2200,
		      settings: {
		        slidesToShow: 6,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 1900,
		      settings: {
		        slidesToShow: 5,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 1600,
		      settings: {
		        slidesToShow: 4,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 1300,
		      settings: {
		        slidesToShow: 5,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 1200,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 760,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
	    ]
    });

    $('.action_modal_carousel').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		prevArrow: '.action_modal_prev',
		nextArrow: '.action_modal_next',
    });

    $('.popular_slider').slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '.popular_prev',
		nextArrow: '.popular_next',
		responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 760,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
	    ]
    });


    $('.land_content_inner').slick({
		infinite: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
		    {
		      breakpoint: 760,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
	    ]
    });
    function landCarusel(){
    	
    	if ($(window).width() <  1024) {
			//$('.land_content_inner').slick('getslick');
    	}
    	else{
    		$('.land_content_inner').slick('unslick');
    	}
    };
    landCarusel();
    $(window).resize(function(){
    	landCarusel();
    });
    

    var fotorama = $('.fotorama').on('fotorama:ready fotorama:showend ', function (e, fotorama) {
  				if(fotorama.activeIndex == 0){
  					$('.article_prev').addClass('article_arr_disabled');
  				}
  				else if(fotorama.activeIndex == (fotorama.size-1)){
					$('.article_next').addClass('article_arr_disabled');
  				}
  				else{
  					$('.article_prev').removeClass('article_arr_disabled');
  					$('.article_next').removeClass('article_arr_disabled');
  				}
			}
        ).fotorama({
    	width: 420,
    	arrows: false,
    	keyboard: true,
    	maxwidth: '100%',
    	transition: 'crossfade',
    	//ratio: 9/11, 
    	hash: true,
    	nav: 'thumbs',
    	thumbmargin: 5,
    	thumbwidth : 100,
		thumbheight : 100,
    }).data('fotorama');

	$( ".article_prev" ).click(function() {
		fotorama.show('<');
	});
	$( ".article_next" ).click(function() {
		fotorama.show('>');
	});


	var overlay = $('#overlay'); // пoдлoжкa, дoлжнa быть oднa нa стрaнице
    var open_modal = $('.open_modal'); // все ссылки, кoтoрые будут oткрывaть oкнa
    var close = $('.modal_close, #overlay, .a_cancel'); // все, чтo зaкрывaет мoдaльнoе oкнo, т.е. крестик и oверлэй-пoдлoжкa
    var modal = $('.modal'); // все скрытые мoдaльные oкнa

    open_modal.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
        event.preventDefault(); // вырубaем стaндaртнoе пoведение
        var div = $(this).attr('href'); // вoзьмем стрoку с селектoрoм у кликнутoй ссылки
        var parent = $(this).parents('.modal');
        var anim_delay = 0;

        if (overlay.css('display') == 'block') {
        	anim_delay = 500;
         	modal.animate({opacity: 0, top: '45%'}, 200, // плaвнo прячем
	            function(){ // пoсле этoгo
	                $(this).css('display', 'none');
	            }
	        );
        };

        overlay.delay(anim_delay).fadeIn(400, //пoкaзывaем oверлэй
            function(){ // пoсле oкoнчaния пoкaзывaния oверлэя
             	$(div).css({
             		'left': '50%',
	         		'margin-left': '-'+$(div).innerWidth()/2+'px'
	         	})
             	if ($(div).innerHeight()>=$(window).height()) {
                    $(div).css({
		         		'display': 'block',
		         		'margin-top': 0,
		         		'height': $(window).height(),
		         		'overflow-y': 'auto' ,
		         		'opacity': 1
		         	}).animate({
		         		top: '0'
		         	}, 200);  

		        }
		        else{
		         	$(div) // берем стрoку с селектoрoм и делaем из нее jquery oбъект
						.css({
							'display': 'block',
							'height': 'auto',
							'margin-top': '-'+$(div).innerHeight()/2+'px'
						}) 
						.animate({opacity: 1, top: '50%'}, 200); // плaвнo пoкaзывaем       
		        }
        });   
        $('html,body').css('overflow','hidden');      

    });

    close.click( function(){ // лoвим клик пo крестику или oверлэю
        modal // все мoдaльные oкнa
        .animate({opacity: 0, top: '45%'}, 200, // плaвнo прячем
            function(){ // пoсле этoгo
                $(this).css('display', 'none');
                overlay.fadeOut(400); // прячем пoдлoжку
            }
        );
        $('html,body').css('overflow','visible');  
    });

 


	/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -         Этап 2        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

	$('.business_tabs input').click(function(){
		//$('.business_tabs input').removeAttr('checked');
		$(this).attr('checked', 'checked');
		$('.business_box').removeClass('active');
		$('.business_box[data-attr="'+$(this).attr('data-attr')+'"]').addClass('active');
	});
	

	var unavailableDates = ["1/11/2015","2/11/2015","6/11/2015","7/11/2015","8/11/2015","19/11/2015"];
	function unavailable(date) {
	    dmy = date.getDate() + "/" + (date.getMonth()+1) + "/" +date.getFullYear();
	    if ($.inArray(dmy, unavailableDates) < 0) {
	        return [true,"","Book Now"];
	    } else {
	        return [false,"","Booked Out"];
	    }

	    
	}

	var selectedDates = ["4/11/2015","18/11/2015","19/11/2015","20/11/2015","26/11/2015","27/11/2015"];
	function selected(date) {
		dmy = date.getDate() + "/" + (date.getMonth()+1) + "/" +date.getFullYear();
		if ($.inArray(dmy, selectedDates) < 0) {
	        return [true,"",""];
	    } else {
	        return [true,"selected-date",""];
	    }
	}

	// Календарь
	$( "#order_date").datepicker({
		dateFormat: "dd/mm/yy",
		/*showOn: "button",
      	buttonImage: "img/calendar_icon_32.png",
      	buttonImageOnly: true,*/
      	beforeShowDay: selected,
		prevText: '<img src="img/arrow_prev.png">',
	    nextText: '<img src="img/arrow_next.png">', 
	});

	$('#passport_date').datepicker({
		dateFormat: "dd/mm/yy",
		prevText: '<img src="img/arrow_prev.png">',
	    nextText: '<img src="img/arrow_next.png">', 
	});

	$('#action_date').datepicker({
		dateFormat: "dd/mm/yy",
		prevText: '<img src="img/arrow_prev.png">',
	    nextText: '<img src="img/arrow_next.png">', 
	});

	$('.inlinePicker').datepicker({
		dateFormat: "dd/mm/yy",
		prevText: '<img src="img/arrow_prev.png">',
	    nextText: '<img src="img/arrow_next.png">', 
	});

	$('.catalog_filter_tabs .a_button').click(function(){
		if ($(this).hasClass('a_grey')) {
			$('.catalog_filter_tabs .a_button').addClass('a_grey');
			$(this).removeClass('a_grey');
			return false;
		};
	});

	// Сайдбар фильтра каталога
	function catalog_filter(){
		if ($(window).width() >= 1024) {
			$('.catalog_filter').css({
				'max-height': $(window).height() - /*$('header').height() - $('.content_menu .menu_pc').height() - $('.content_menu .block_mobile').height() - 60*/ 200,
				'height': 'auto'
			});

			$('.catalog_filter_body').css({
				'height': $('.catalog_filter').height() - $('.catalog_filter_head').innerHeight()
			})
		}
		else{
			$('.catalog_filter').css({
				'height': $(window).height()
			});
			$('.catalog_filter_body').css({
				'height': $('.catalog_filter').height() - $('.catalog_filter_head').innerHeight()
			})
		}
	};
	catalog_filter();
	$(window).resize(function(){
		catalog_filter();
	});

	function filter_change(){
		if ($(window).width() < 1024) {
			$('.filter_change').click(function(){
				$('body').addClass('fixed_filter');
				$('#filter_overlay').show();
		    	$('header').css('width', $('#filter_overlay').width());
		    	$('.catalog_filter').css('max-height',$(window).height());
			});
			$('#filter_overlay').click(function(){
				$('body').removeClass('fixed_filter');
				$('#filter_overlay').hide();
		    	$('header').css('width', 'auto');
			});
		};
	}; 
	filter_change();
	$(window).resize(function(){
		filter_change();
	});

	$('.org_favorite_link').click(function(){
		$(this).addClass('active');
		return false;
	});

	$('.org_favorites .a_button, .org_facilities span').tooltipster({
		position: 'top-right',
		theme: 'tooltipster_facilities',
		//trigger: 'click'
	});


	$('.order_next').click(function(){
		if ($(window).width() > 767 && !$(this).hasClass('disable')) {
			$('.order_tabs li').removeClass('active');
			$('.order_tabs li[data-attr="order_info"]').addClass('active');
			$('.order_body_box').removeClass('active');
			$('.order_body_box[data-attr="order_info"]').addClass('active')
			$('.a_button.order_next').css('display', 'none');
			$('.a_button.order_submit').css('display', 'block');
		};
		return false;
	});

	$('.order_services_choice>a').click(function(){
		var $parent = $(this).parent();
		if (!$parent.hasClass('active')) {
			$('.order_services_choice').removeClass('active');
			$parent.addClass('active');
			$('.order_services_choice ul').slideUp(300);
			$parent.find('ul').slideDown(300);
		}
		else{
			$('.order_services_choice').removeClass('active');
			$('.order_services_choice ul').slideUp(300);
		}
		return false;
	});


	$('.order_services_choice ul li a').click(function(){
		var $parent = $(this).parent();
		if (!$parent.hasClass('active')) {
			$('.order_services_choice ul li').removeClass('active');
			$parent.addClass('active');
			$('.order_services_box').removeClass('active');
			$('.order_services_box[data-attr="' + $(this).attr('data-attr') + '"]').addClass('active');
			$('.order_next').removeClass('disable');
		}
		return false;
	});

	function orderModalSetings(){
		if ($(window).width() < 768) {
			$('.order_section').addClass('show');
			$('.order_next').removeClass('a_grad').addClass('a_sm disable');
			$('.order_submit').addClass('a_sm');
			$('.order_next').attr('data-window', 'window2');
			$('.order_back').attr('data-window', 'window1');

			function orderWindow1(){
				$('.order_back').hide();
				$('.order_next').attr('data-window', 'window2');
				$('.order_section').show();
				$('.order_section_services').hide();
				$('.order_services_count').hide();
			};
			function orderWindow2(){
				$('.order_back').show().attr('data-window', 'window1');
				$('.order_next').attr('data-window', 'window3');
				$('.order_section').hide();
				$('.order_date_user').hide();
				$('.order_section_services').show();
				$('.order_services_count').show();
				$('.order_timer').hide();
				$('.order_info_date').hide();
				$('.order_info_time').hide();
			};
			function orderWindow3(){
				$('.order_back').show().attr('data-window', 'window2');
				$('.order_next').attr('data-window', 'window4');
				$('.order_section_services').hide();
				$('.order_date_user').show();
				$('.order_services_count').hide();
				$('.order_data').hide();
				$('.order_timer').show();
				$('.order_info_date').show();
				$('.order_info_time').show();
			};
			function orderWindow4(){
				$('.order_back').show().attr('data-window', 'window3');
				$('.order_next').attr('data-window', 'window5');
				$('.order_date_user').hide();
				$('.order_info').hide();
				$('.order_data').show();
				$('.order_info_date').hide();
				$('.order_info_time').hide();
				$('.order_next').show();
				$('.order_submit').hide();
			};
			function orderWindow5(){
				$('.order_back').show().attr('data-window', 'window4');
				$('.order_next');
				$('.order_info').show();
				$('.order_data').hide();
				$('.order_next').hide();
				$('.order_submit').show();
			}

			$('.order_next').click(function(){
				if (!$(this).hasClass('disable')) {
					switch($(this).attr('data-window')) {
						case 'window1':	orderWindow1();	break;
						case 'window2':	orderWindow2();	break;
						case 'window3':	orderWindow3();	break;
						case 'window4':	orderWindow4();	break;
						case 'window5':	orderWindow5();	break;
					};
				};
			});
			$('.order_back').click(function(){
				switch($(this).attr('data-window')) {
					case 'window1':	orderWindow1();	break;
					case 'window2':	orderWindow2();	break;
					case 'window3':	orderWindow3();	break;
					case 'window4':	orderWindow4();	break;
					case 'window5':	orderWindow5();	break;
				};
			});
		};
	};
	orderModalSetings();

	$('.services_employees_head').click(function(){
		var $parent = $(this).parents('.services_employees');
		if (!$parent.hasClass('active')) {
			$('.services_employees').removeClass('active');
			$parent.addClass('active');
			$('.order_date_hour').slideUp(300);
			$parent.find('.order_date_hour').slideDown(300);
		}
		else{
			$parent.removeClass('active');
			$('.order_date_hour').slideUp(300);
		}
	});

	$('.order_date_hour span').click(function(){
		if (!$(this).hasClass('active') && !$(this).hasClass('hour_disabled')) {
			$(this).addClass('active');
		}
		else{
			$(this).removeClass('active');
		}
	});

	$('.date_day').click(function(){
		if (!$(this).hasClass('active') && !$(this).hasClass('day_disabled')) {
			$(this).addClass('active');
		}
		else{
			$(this).removeClass('active');
		}
	});

	$('.date_slider').slick({
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 7,
		swipeToSlide: true
	});

	var order_count = 0;
	$('.order_services_option input').click(function(){
		if ($(this).is( ":checked" )) {
			$('.order_services_selected').append("<div class='services_selected' data-attr='" + $(this).attr('id') + "'><span>" + $(this).next().find('.services_option_title').text() + "</span><i class='fa fa-times'></i></div>");
			order_count++;
			$('.order_services_count').html('Выбрана <span>' + order_count + ' услуга</span>');
		}
		else{
			$('.services_selected[data-attr="' + $(this).attr('id') + '"]').remove();
			order_count--;
			$('.order_services_count').html('Выбрана <span>' + order_count + ' услуга</span>');
		}
	});

	$('.order_services_selected').delegate( ".services_selected .fa", "click", function() {
		$(this).parent().remove();
		$('.order_services_option input[id="' + $(this).parents('.services_selected').attr('data-attr') + '"]').removeAttr('checked');
		order_count--;
		$('.order_services_count').html('Выбрана <span>' + order_count + ' услуга</span>');
	});

	$('.order_clear button').click(function(){
		$('.order_services_selected').html('');
		order_count = 0;
		$('.order_services_count').html('Выбрано <span>' + order_count + ' услуг</span>');
	});


	$('.main_menu ul').slick({
		infinite: false,
		slidesToShow: 6,
		slidesToScroll: 1,
		responsive: [
	    	{
		      breakpoint: 760,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        fade: true
		   	  }
	    	}
	    ]
	});
	
	$('.models_carousel').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1,
		   	  }
	    	},
	    	{
		      breakpoint: 760,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		   	  }
	    	}
	    ]
	});

	function activity(){
		$('.activity_content').css({
			'max-height': $('.services_box').parents('.land_content').innerHeight()
		});
	};
	activity();
	$(window).resize(function(){
		activity();
	});

	$('.land_action_carousel').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: '.land_action_prev',
		nextArrow: '.land_action_next',
		responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1,
		   	  }
	    	},
	    	{
		      breakpoint: 760,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		   	  }
	    	}
	    ]
	});

	$('.indent-item').click(function(){
		if (!$(this).hasClass('active')) {
			$('.indent-item').removeClass('active');
			$(this).addClass('active');
			$('.advantages-list').removeClass('active');
			$('.advantages-list[data-attr="' + $(this).attr('data-attr') + '"]').addClass('active');
		};
	});

	$('.choise-item').click(function(){
		if (!$(this).hasClass('active')) {
			$('.choise-item').removeClass('active');
			$(this).addClass('active');
			$('.landingScreen-easy').removeClass('active');
			$('.landingScreen-easy[data-attr="' + $(this).attr('data-attr') + '"]').addClass('active')
		};
	});
	
	function mainHeadLink(){
		if ($(window).width() < 760) {
			$('.main_head_link .a_button').text('позвольте рассказать о проекте!');
			$('.check_button .a_button').text('Зарегистрироваться!');
		}
		else{
			$('.main_head_link .a_button').text('позвольте рассказать больше о нашем проекте!');
			$('.check_button .a_button').text('Зарегистрироваться прямо сейчас!');
		}
	}
	mainHeadLink();
	$(window).resize(function(){
		mainHeadLink();
	});

	$('.activity .scrollbar .scroll-scrollx_visible').css({
		'width': $('.activity_box').width()*$('.activity_box').length + ' !important'
	});	

	$('.indent-list').slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
	    	{
		      breakpoint: 760,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        fade: true
		   	  }
	    	}
	    ]
	});

	$('.indent-list .slick-arrow').on('click', function(e){
		var currentIndex = $('.indent-list').slick('slickCurrentSlide');
		$('.slick-slide[data-slick-index="' + currentIndex + '"]').click();
	});

	function map(){
		$('#map').css({
			'height': $(window).height() - $('header').height()
		});
	};
	map();
	$(window).resize(function(){
		map();
	});

	$('.expand-subject').slideUp(0);
	$('.expand-tool').click(function(e){
		$(this).siblings('.expand-subject').stop().slideToggle();
		$(this).toggleClass('active');
		$(this).parent().toggleClass('active');
		e.preventDefault();
	});

	$('.reviews_more a').click(function(){
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
			$('.reviews_add[data-title="' + $(this).attr('data-title') + '"]').slideDown(300);
		}
		else{
			$(this).removeClass('active');
			$('.reviews_add[data-title="' + $(this).attr('data-title') + '"]').slideUp(300);
		}
		return false;
	});

	$('.gallery_more .a_button').click(function(){
		if (!$(this).hasClass('active')){
			$(this).addClass('active');
			$('.gallery_body[data-attr="' + $(this).attr('data-attr') +'"]').slideDown(300);
		}
		else{
			$(this).removeClass('active');
			$('.gallery_body[data-attr="' + $(this).attr('data-attr') +'"]').slideUp(300);
		}
		return false;
	});

	$('.gallery_photo .fancybox').fancybox({
		padding: 0,
		openEffect: 'fade',
		closeEffect: 'fade',
		openSpeed: 400,
		closeSpeed: 400,
		helpers: {
			title: {
	            type: 'outside'
	        },
			overlay: {
				locked: false
			}
		},
		afterShow: function() {
			$('<div class="gallery_modal_footer"><div class="inner"><div class="gallery_modal_user"><div class="gallery_user_img"><a href=""><img src="img/organization/organization_img1.png" alt=""></a></div><div class="gallery_user_body"><div class="gallery_user_name">Воронина Екатерина</div><div class="gallery_user_album">Альбом: <a href="#">Интерьер салона</a></div></div></div><div class="gallery_modal_buttons"><a href="#" class="gallery_modal_like">123</a><a href="#" class="gallery_modal_view">534</a><a href="#" class="gallery_modal_rating">28</a></div><div class="gallery_modal_socials"><a href="#"><i class="fa fa-vk"></i></a><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-odnoklassniki"></i></a><a href="#"><i class="fa fa-google-plus"></i></a><a href="#"><i class="fa fa-twitter"></i></a></div></div></div>').appendTo(this.inner);
			$('<div class="modal_pint"><a href="http://ru.pinterest.com/pin/create/button/" data-pin-do="buttonBookmark"  data-pin-color="red" data-pin-height="28"><img src="http://assets.pinterest.com/images/pidgets/pinit_fg_en_rect_red_28.png" /></a><!-- Please call pinit.js only once per page --><script type="text/javascript" async defer src="http://assets.pinterest.com/js/pinit.js"></script></div>').appendTo(this.inner);
		},
		tpl: { 
        	closeBtn: '<div title="close" class="fancybox-item fancybox-close gallery_modal_close"></div>' ,
			next: '<a title="Next" class="fancybox-nav fancybox-next gallery_modal_next" href="javascript:;"><i class="fa fa-angle-right"></i></a>',
			prev: '<a title="Previous" class="fancybox-nav fancybox-prev gallery_modal_prev" href="javascript:;"><i class="fa fa-angle-left"></i></a>'
        }
		
	});

	$('.gallery_video .fancybox').fancybox({
		padding: 0,
		openEffect: 'none',
		closeEffect: 'none',
		openSpeed: 400,
		closeSpeed: 400,
		helpers: {
			title: {
	            type: 'outside'
	        },
			overlay: {
				locked: false
			},
			media : {}
		},
		afterShow: function() {
			$('<div class="gallery_modal_footer"><div class="inner"><div class="gallery_modal_user"><div class="gallery_user_img"><a href=""><img src="img/organization/organization_img1.png" alt=""></a></div><div class="gallery_user_body"><div class="gallery_user_name">Воронина Екатерина</div><div class="gallery_user_album">Альбом: <a href="#">Интерьер салона</a></div></div></div><div class="gallery_modal_buttons"><a href="#" class="gallery_modal_like">123</a><a href="#" class="gallery_modal_view">534</a><a href="#" class="gallery_modal_rating">28</a></div><div class="gallery_modal_socials"><a href="#"><i class="fa fa-vk"></i></a><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-odnoklassniki"></i></a><a href="#"><i class="fa fa-google-plus"></i></a><a href="#"><i class="fa fa-twitter"></i></a></div></div></div>').appendTo(this.inner)
		},
		tpl: { 
        	closeBtn: '<div title="close" class="fancybox-item fancybox-close gallery_modal_close"></div>' ,
			next: '<a title="Next" class="fancybox-nav fancybox-next gallery_modal_next" href="javascript:;"><i class="fa fa-angle-right"></i></a>',
			prev: '<a title="Previous" class="fancybox-nav fancybox-prev gallery_modal_prev" href="javascript:;"><i class="fa fa-angle-left"></i></a>'
        }
		
	});

	$('.gallery_modal_buttons a').click(function(){
		$(this).addClass('active');
		return false;
	});

	$('.employees_price_box .form_radio input').click(function(){
		var $this = $(this).parents('tr');
		if (!$this.hasClass('active')) {
			$('.employees_price_box').find('tr').removeClass('active');
			$this.addClass('active');
		};
	});

	function orderClear(){
		if ($(window).width() > 1023) {
			$('.order_clear button').text('Очистить форму заказа');
		}
		else{
			$('.order_clear button').text('Очистить');
		}
	}
	orderClear();
	$(window).resize(function(){
		orderClear();
	});

	$('.nav_tab').click(function(){
		if (!$(this).hasClass('active')) {
			$('.nav_tab').removeClass('active');
			$(this).addClass('active');
			$('.nav_type').removeClass('active');
			$('.nav_type[data-title="' + $(this).attr('data-title') + '"]').addClass('active');
		};
	});

	//--------------------       response images add/del
	$('.add_image input[type=file]').change(function() {
		var $this = $(this).parents('.add_image');
		$('.response_images').append('<img src="' +  + '">')
	});

	$( ".response_images" ).delegate( ".response_image_del", "click", function() {
		$(this).parents('.response_image_box').find('input[type="file"]').val('');
		$(this).parent().remove();
		return false;
	});

	//--------------------       add new phone field
	function phoneDel(){
		var phoneCount = $('.number_field').length;
		if (phoneCount > 1) {
			$('.phone_del').show();
		}
		else{
			$('.phone_del').hide();
		}
	}
	phoneDel();
	$('#phone_add').click(function(){
		var phoneCount = $('.number_field').length;
		if (phoneCount < 4) {
			$('.number_phone').append('<div class="number_field"><input type="text" name="phone" placeholder="+375 (33) 300-00-00" required class="phone"><div class="phone_del"></div></div>');
		}
		if (phoneCount == 3){
			$('#phone_add').hide();
		}
		phoneDel();
		return false;
	});
	$('.number_phone').delegate( '.phone_del', 'click', function() {
		$(this).parents('.number_field').remove();
		var phoneCount = $('.number_field').length;
		if (phoneCount < 4) {
			$('#phone_add').show();
		};
		phoneDel();
	});

	//--------------------       avatar load



	// function navList(){
	// 	var count = $('.nav_top').find('li').length
	// 	var list = new Array();
	// 	i = 0;
	// 	var str = new Array();
	// 	$('.nav_top').find('li').each(function(){
	// 		list[i] = $(this).find('a').text(); 
	// 		i++;
	// 		str[i] = $(this).find('a').text().substr(0,1).toUpperCase();
	// 	});
	// 	list.sort();
	// 	str.sort();
	// 	console.log(str);
	// 	$('.nav_list').prepend(str);
	// }
	// navList();


	function box_param(){
		var windowWidth = $(window).width();
		var $this = $('.page_catalog .catalog_block .catalog_box');

		if ($(window).width()<=3000 && windowWidth > 2710) {
			$('.page_catalog .catalog_box').removeClass('box_h').addClass("box_w");
			$('.page_catalog .catalog_box:nth-child(-2n+7)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+10):nth-child(-2n+16)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+17):nth-child(-2n+23)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+26):nth-child(-2n+32)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+33)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .box_h').css('width', '');
			box_h = $('.page_catalog .box_h').width()*4/3;
			$('.page_catalog .catalog_block .box_h').css('height', box_h);
			$('.page_catalog .catalog_block .box_w').css({
				'height': box_h,
				'width': box_h*4/3
			});
		};
		if ($(window).width()<=2710 && windowWidth > 2467) {
			$('.page_catalog .catalog_box').removeClass('box_h').addClass("box_w");
			$('.page_catalog .catalog_box:nth-child(-2n+5)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+9):nth-child(-2n+19)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+23)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .box_h').css('width', '');
			box_h = $('.page_catalog .box_h').width()*4/3;
			$('.page_catalog .catalog_block .box_h').css('height', box_h);
			$('.page_catalog .catalog_block .box_w').css({
				'height': box_h,
				'width': box_h*4/3
			});
		};
		if ($(window).width()<=2467 && windowWidth > 2278) {
			$('.page_catalog .catalog_box').removeClass('box_h').addClass("box_w");
			$('.page_catalog .catalog_box:nth-child(14n+14)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(odd)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .box_h').css('width', '');
			box_h = $('.page_catalog .box_h').width()*4/3;
			$('.page_catalog .catalog_block .box_h').css('height', box_h);
			$('.page_catalog .catalog_block .box_w').css({
				'height': box_h,
				'width': box_h*4/3
			});
		};
		if ($(window).width()<=2278 && windowWidth > 2034) {
			$('.page_catalog .catalog_box').removeClass('box_h').addClass("box_w");
			$('.page_catalog .catalog_box:nth-child(-2n+5)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+8):nth-child(-2n+12)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+13):nth-child(-2n+17)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+20):nth-child(-2n+24)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+25):nth-child(-2n+29)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+32)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .box_h').css('width', '');
			box_h = $('.page_catalog .box_h').width()*4/3;
			$('.page_catalog .catalog_block .box_h').css('height', box_h);
			$('.page_catalog .catalog_block .box_w').css({
				'height': box_h,
				'width': box_h*4/3
			});
		};
		if ($(window).width()<=2034 && windowWidth > 1791) {
			$('.page_catalog .catalog_box').removeClass('box_h').addClass("box_w");
			$('.page_catalog .catalog_box:nth-child(-2n+3)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+7):nth-child(-2n+13)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+17):nth-child(-2n+23)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+27)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .box_h').css('width', '');
			box_h = $('.page_catalog .box_h').width()*4/3;
			$('.page_catalog .catalog_block .box_h').css('height', box_h);
			$('.page_catalog .catalog_block .box_w').css({
				'height': box_h,
				'width': box_h*4/3
			});
		};
		if ($(window).width()<=1791 && windowWidth > 1599) {
			$('.page_catalog .catalog_box').removeClass('box_h').addClass("box_w");
			$('.page_catalog .catalog_box:nth-child(10n+10)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(odd)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .box_h').css('width', '');
			box_h = $('.page_catalog .box_h').width()*4/3;
			$('.page_catalog .catalog_block .box_h').css('height', box_h);
			$('.page_catalog .catalog_block .box_w').css({
				'height': box_h,
				'width': box_h*4/3
			});
		};
		if ($(window).width()<=1599 && windowWidth > 1199) {
			$('.page_catalog .catalog_box').removeClass('box_h').addClass("box_w");
			$('.page_catalog .catalog_box:nth-child(-2n+3)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+6):nth-child(-2n+8)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+9):nth-child(-2n+11)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+14):nth-child(-2n+16)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+17):nth-child(-2n+19)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+22):nth-child(-2n+24)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+25):nth-child(-2n+27)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+30):nth-child(-2n+32)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(2n+33)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .box_h').css('width', '');
			box_h = $('.page_catalog .box_h').width()*4/3;
			$('.page_catalog .catalog_block .box_h').css('height', box_h);
			$('.page_catalog .catalog_block .box_w').css({
				'height': box_h,
				'width': box_h*4/3
			});
		};
		if ($(window).width()<=1199 && windowWidth > 1117) {
			$('.page_catalog .catalog_box').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(-6n+33)').removeClass('box_h').addClass("box_w");
			$('.page_catalog .catalog_box:nth-child(-2n+36)').removeClass('box_h').addClass("box_w");
			$('.page_catalog .box_h').css('width', '');
			box_h = $('.page_catalog .box_h').width()*4/3;
			$('.page_catalog .catalog_block .box_h').css('height', box_h);
			$('.page_catalog .catalog_block .box_w').css({
				'height': box_h,
				'width': box_h*4/3
			});
		};
		if ($(window).width()<=1117 && windowWidth > 928) {
			$('.page_catalog .catalog_box').removeClass('box_h').addClass("box_w");
			$('.page_catalog .catalog_box:nth-child(-6n+30)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(-2n+33)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(n+35)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .box_h').css('width', '');
			box_h = $('.page_catalog .box_h').width()*4/3;
			$('.page_catalog .catalog_block .box_h').css('height', box_h);
			$('.page_catalog .catalog_block .box_w').css({
				'height': box_h,
				'width': box_h*4/3
			});
		};
		if ($(window).width()<=928 && windowWidth > 685) {
			$('.page_catalog .catalog_box').removeClass('box_h').addClass("box_w");
			$('.page_catalog .catalog_box:nth-child(4n+1)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .catalog_box:nth-child(4n+4)').removeClass('box_w').addClass("box_h");
			$('.page_catalog .box_h').css('width', '');
			box_h = $('.page_catalog .box_h').width()*4/3;
			$('.page_catalog .catalog_block .box_h').css('height', box_h);
			$('.page_catalog .catalog_block .box_w').css({
				'height': box_h,
				'width': box_h*4/3
			});
		};
		if (windowWidth <= 685 && windowWidth > 496){
			$this.addClass('box_h');
			$this.removeClass('box_w');
			$('.page_catalog .box_h').css('width', '');
			$('.page_catalog .catalog_block .box_h').css('height', $('.page_catalog .catalog_block .box_h').width()*4/3);
		}
		if (windowWidth <= 496 && windowWidth > 442) {
			$this.addClass('box_w');
			$this.removeClass('box_h');
			$('.page_catalog .box_h').css('width', '');
			$('.page_catalog .catalog_block .box_w').css('height', $(this).width()*3/4);
		};
		if (windowWidth <= 442) {
			$this.addClass('box_h');
			$this.removeClass('box_w');
			$('.page_catalog .box_h').css('width', '');
			$('.page_catalog .catalog_block .box_h').css('height', $(this).width()*4/3);
		};
	};

	box_param();
	$(window).resize(function(){
		box_param();
	});

});