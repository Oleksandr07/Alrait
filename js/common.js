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
				locked: true
			}
		},
		
		/*afterClose : function(){
			if ($(window).width()<760) {
				alert('its close!');
				$('.fancybox-lock').css({
					'position': ''
				});
			};
		},
		beforeLoad : function() {
			if ($(window).width()<760) {
				alert('its open!');
				$('.fancybox-lock').css({
					'position': 'fixed'
				})
			};
		}*/
	});

	$('input[placeholder], textarea[placeholder]').placeholder();
	

	$('.top a.a_button').on('click',function(){
		$('html,body').animate({scrollTop:$($(this).attr('href')).offset().top-200},800);
		return false;
	});
	
	
	$('select').select2({language: "ru"});

	// $(".reg_city").select2({
	//   ajax: {
	//     url: "https://api.github.com/search/repositories",
	//     dataType: 'json',
	//     delay: 250,
	//     data: function (params) {
	//       return {
	//         q: params.term, // search term
	//         page: params.page
	//       };
	//     },
	//     processResults: function (data, page) {
	//       // parse the results into the format expected by Select2.
	//       // since we are using custom formatting functions we do not need to
	//       // alter the remote JSON data
	//       return {
	//         results: data.items
	//       };
	//     },
	//     cache: true
	//   },
	//   escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
	//   minimumInputLength: 1,
	//   templateResult: formatRepo, // omitted for brevity, see the source of this page
	//   templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
	// });
	
	$('.load').click(function(){
		$(this).addClass('loading');
	});	
	

	//$("#reg_sms").mask("+999 (99) 999-99-99");

	$('.required_fields .a_button').click(function(){
		var inputFile = $('.photo_upload_inner input').val();
		if (inputFile == '') {
			$('.photo_upload').addClass('error')
		};
	});
	$('.photo_upload_inner input').change(function(){
		$('.photo_upload').removeClass('error')
	});
	
	$('.tooltip').tooltipster({
		position: 'bottom'
	});

	jQuery('.scrollbar').scrollbar();
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
		/*alert($('.search_result').offset().top + '<br/>' + $(window).height());*/
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
				}
				else{
					$('.content_menu').removeClass('active');
				}
			});
		};
	}
	all_menu();
	$(window).resize(function(){
		all_menu();
	});


	function box_param(){
		var $this = $('.page_catalog .box_h');
		$('.page_catalog .box_h').css('height', $this.outerWidth()*1.333);
		$('.page_catalog .box_w').css('height', $this.outerWidth()*1.333);
		$('.page_catalog .box_h .catalog_img, .page_catalog .box_w .catalog_img').css('height', $this.outerWidth()*1.333);
	};
	box_param();
	$(window).resize(function(){
		box_param();
	});

	/*var nav_active = $('.nav_active');
	$('.footer_nav ul li').mouseover(function(){
		var left = $('.footer_nav ul li.active').position().left;
		var nav_left = $(this).position().left;
		var nav_width = $(this).width();
		nav_active.css({
			'left': nav_left+20,
			'width': nav_width
		});
	});
	$('.footer_nav ul li').mouseout(function(){
		nav_active.css({
			'left': $('.footer_nav ul li.active').position().left+20,
			'width': $('.footer_nav ul li.active').width()
		});
	});*/


	$('.rules_box .fa-plus').click(function(){
		$(this).parents('.rules_box').addClass('active')
		$(this).parents('.rules_box').find('.rules_answer').slideDown(300);
	});
	$('.rules_box .fa-minus').click(function(){
		$(this).parents('.rules_box').removeClass('active')
		$(this).parents('.rules_box').find('.rules_answer').slideUp(300);
	});


	$('#reg_sms').keyup(function(){
		if ($(this).val()!='') {
			$('#sms_button').removeClass('disable');
		}
		else{
			$('#sms_button').addClass('disable');
		}
	});
	$('#sms_button').click(function(){
		if (!$(this).hasClass('disable')) {	
			$(this).hide();
			$('#sms_confirm').show();
			$('#sms_code').show();
		};
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
	$('.file_load input[type=file]').change(function() {
		file_size = (this.files[0].size/1024/1024).toFixed(2);
		total_size += parseFloat(file_size);
		if ($('.file_box').length < 4 && total_size < 20) {
			var file_name = $(this).val();
		    if (file_name != '') {
		        $('.file_list').append('<div class="file_box"><span class="file_icon"><i class="fa fa-file"></i></span><span class="file_name">'+file_name+'</span><span class="file_size">('+file_size+' Mb)</span><a href="#" class="file_del">Удалить</a></div>');
		    }
	    }
	    else{
	    	alert('Вы загрузили более 4 файлов или общий вес файлов более 20мб')
	    }
	});
	$( ".file_list" ).delegate( ".file_del", "click", function() {
		$(this).parent().remove();
		//total_size -= parseFloat(file_size).toFixed(2);
		return false;
	});


	//$('.right_box')
	// $('.right_title').click(function(){
	// 	var $parent = $(this).parent();
	// 	if (!$parent.hasClass('show')) {
	// 		$parent.addClass('show');
	// 		$parent.find('.right_body').slideDown(300);
	// 	}
	// 	else{
	// 		$parent.removeClass('show');
	// 		$parent.find('.right_body').slideUp(300);
	// 	}
	// });

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

	/*function article_param(){
		//var article_h = $('.article_h');
		var article_w = $('.article_w');
		article_w.css('height', article_w.width()*0.75);
	};
	article_param();
	$(window).resize(function(){
		article_param();
	});*/



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
		        slidesToShow: 5,
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
		        slidesToShow: 3,
		        slidesToScroll: 1,
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
    	ratio: 9/11, 
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
    var close = $('.modal_close, #overlay'); // все, чтo зaкрывaет мoдaльнoе oкнo, т.е. крестик и oверлэй-пoдлoжкa
    var modal = $('.modal'); // все скрытые мoдaльные oкнa

     open_modal.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
         event.preventDefault(); // вырубaем стaндaртнoе пoведение
         var div = $(this).attr('href'); // вoзьмем стрoку с селектoрoм у кликнутoй ссылки
         overlay.fadeIn(400, //пoкaзывaем oверлэй
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
 
	 
	// $('#menu_overlay').swipeleft(function() { 
	// 	$('body').removeClass('fixed_menu');
	// 	$('#menu_overlay').hide();
	// });
	// $('.menu_mobile').swipeleft(function() { 
	// 	$('body').removeClass('fixed_menu');
	// 	$('#menu_overlay').hide();
	// 	$('header').css('width', 'auto');
	// });
	// $('body').swiperight(function() { 
	// 	$('body').addClass('fixed_menu');
	// 	$('#menu_overlay').show();
	// });

	
	function catalog(){
		var width = $(window).width();
		var catblock = $('.catalog_block');
		var catgrid = $('.catalog_block .grid-item');
		if(width<=3200){catblock.css('width', 3020)};
		if(width<=3020){catblock.css('width', 2780)};
		if(width<=2780){catblock.css('width', 2580)};
		if(width<=2580){catblock.css('width', 2330)};
		if(width<=2330){catblock.css('width', 2080)};
		if(width<=2080){catblock.css('width', 1890)};
		if(width<=1890){catblock.css('width', 1640)};
		if(width<=1640){catblock.css('width', 1380)};
		if(width<=1380){catblock.css('width', 1190)};
		if(width<=1210){catblock.css('width', 940)};
		if(width<=960){catblock.css('width', 690)};
		if(width<=710){catblock.css('width', 494)};
		if(width<=494){catblock.css('width', 250)};

		if(width<=710){
			catgrid.removeClass('grid2').addClass('grid1');
		}
		if(width>710){
			catblock.each(function(){
				for (var i = 0; i < catgrid.length; i++) {
					if (i%2 == 1) {
						catgrid.eq(i).removeClass('grid1').addClass('grid2');
					};
				};
			});
		}
	}
	catalog();
	$(window).resize(function(){
		catalog();
	});

	$('.catalog_block').isotope({
	  itemSelector: '.grid-item',
	  resizable: true,
	  masonry: {
	    columnWidth: 10,
	    isFitWidth: true
	  }
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
	$( "#passport_date").datepicker({
		dateFormat: "dd/mm/yy",
		/*showOn: "button",
      	buttonImage: "img/calendar_icon_32.png",
      	buttonImageOnly: true,*/
      	beforeShowDay: selected,
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
				'height': $(window).height() - $('header').height() - $('.content_menu .menu_pc').height() - $('.content_menu .block_mobile').height()
			});
			
			//alert($('header').height());

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
		$('.filter_change').click(function(){
			$('body').addClass('fixed_filter');
			$('#filter_overlay').show();
	    	$('header').css('width', $('#filter_overlay').width());
	    	$('.catalog_filter').css('height',$(window).height());
		});
		$('#filter_overlay').click(function(){
			$('body').removeClass('fixed_filter');
			$('#filter_overlay').hide();
	    	$('header').css('width', 'auto');
		});
	}; 
	filter_change();
	$(window).resize(function(){
		filter_change();
	});

});