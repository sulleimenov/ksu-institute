// import $ from 'jquery'
import { Swiper, Pagination, Navigation } from 'swiper'

Swiper.use([Navigation, Pagination]);

document.addEventListener('DOMContentLoaded', () => {

	const swiperAbout = new Swiper('.swiper-about', {
		loop: false,
		preloadImages: false,
		lazy: true,
		
		pagination: {
			el: '.swiper-pagination',
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})



	/*Меню бургер*/
	$(".lectern-header__burger").click(function () {
		$(".lectern-header-menu--md").toggleClass("lectern-header-menu--active");
	});

	$(".linkanchor").click(function () {
		$(".lectern-header-menu").removeClass("lectern-header-menu--active");
	});

	if (window.width >= 992) {
		$(".lectern-header-menu").removeClass("lectern-header-menu--active");
	}

	$(window).on('resize', function () {
		let screenWidth = '992';
		let screen = $(window).width();
		let removeClass = false;
		if (screen > screenWidth) {
			removeClass = true;
		}
		if (removeClass) {
			$(".lectern-header-menu").removeClass("lectern-header-menu--active");
		}
	});

	function loadMore() {
		size_li = $("#sidebar__nav a").length;
		x = 3;
		$('.sidebar__nav a:lt(' + x + ')').show();
		$('.load').click(function () {
			x = (x + 5 <= size_li) ? x + 5 : size_li;
			$('.sidebar__nav a:lt(' + x + ')').show();
			if (x == size_li) {
				$('.load').hide();
			}
		});
		// $('#showLess').click(function () {
		// 	x = (x - 5 < 0) ? 3 : x - 5;
		// 	$('.sidebar__nav a').not(':lt(' + x + ')').hide();
		// 	$('#loadMore').show();
		// 	$('#showLess').show();
		// 	if (x == 3) {
		// 		$('#showLess').hide();
		// 	}
		// });
	}

	/*Плавное прокручивание - якорь в институтах*/
	$('.linkanchor').on('click', function (e) {
		$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - 80 }, 200);
		e.preventDefault();
	});

	/* Меню - Аккардион */
	function accardionInst() {
		var Accordion = function (el, multiple) {
			this.el = el || {};
			this.multiple = multiple || false;

			// Variables privadas
			var links = this.el.find('.link');
			// Evento
			links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
		}

		Accordion.prototype.dropdown = function (e) {
			var $el = e.data.el;
			let $this = $(this),
				$next = $this.next();

			$next.slideToggle();
			$this.parent().toggleClass('open');

			if (!e.data.multiple) {
				$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
			};
		}

		var accordion = new Accordion($('#accordion'), false);
	};
	accardionInst();

	/* Навигация - Кнопка назад в мероприятиях */
	function goBack() {
		$(".back-to").click(function () {
			window.history.back();
		});
	}

	$(".lectern-header__search").click(function () {
		if ($(".search").hasClass("search--active")) {
			$(".search").removeClass("search--active");
			$(".search-wrapper").removeClass("search-wrapper--active");
		} else {
			$(".search").addClass("search--active");
			$(".search-wrapper").addClass("search-wrapper--active");
			document.getElementById("search").focus();
		}
	});

	/*Фиксация шапки в иститутах*/
	// let HeaderTop = $('.lectern-offer').offset().top;
	// $(window).scroll(function () {
	// 	if ($(window).scrollTop() > 350) {
	// 		$('.lectern-header-wrapper').css({
	// 			position: 'fixed',
	// 			top: '0px'
	// 		});
	// 	} else {
	// 		$('.lectern-header-wrapper').css({
	// 			position: 'static',
	// 			top: '0px'
	// 		});
	// 	}
	// });

	goBack();
});