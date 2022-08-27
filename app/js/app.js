import $ from 'jquery'
import { gsap, power2 } from 'gsap'
// window.$ = $;
// window.jQuery = jQuery;

import { Swiper, Pagination, Navigation } from 'swiper'

// gsap.registerPlugin(ScrollTrigger)
gsap.config({ nullTargetWarn: false })

gsap.from(".card-list__images", {x: -10, opacity: 0, duration: 0.5});
gsap.from(".card-list__info-name", {x: 20, opacity: 0, duration: 0.5});
gsap.from(".card-list__info-position.text-under", {x: 20, opacity: 0, duration: 0.5});

Swiper.use([Navigation, Pagination])

document.addEventListener('DOMContentLoaded', () => {
	const swiperAbout = new Swiper('.swiper-about', {
		loop: false,
		centeredSlides: true,
		spaceBetween: 30,
		autoHeight: true,

		pagination: {
			el: '.swiper-pagination',
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})

	//show more
	function showMore() {
		let $nav = $('.nav')
		let $btn = $('.nav button')
		let $vlinks = $('.nav .visible-links')
		let $hlinks = $('.nav .hidden-links')
		let breaks = []

		function updateNav() {
			let availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30
			if ($vlinks.width() > availableSpace) {
				breaks.push($vlinks.width())
				$vlinks.children().last().prependTo($hlinks)
				if ($btn.hasClass('hidden')) {
					$btn.removeClass('hidden')
				}
			} else {
				if (availableSpace > breaks[breaks.length - 1]) {
					$hlinks.children().first().appendTo($vlinks)
					breaks.pop()
				}
				if (breaks.length < 1) {
					$btn.addClass('hidden')
					$hlinks.addClass('hidden')
				}
			}
			$btn.attr('count', breaks.length)
			if ($vlinks.width() > availableSpace) {
				updateNav()
			}
		}
		$(window).resize(function () {
			updateNav()
		})
		$btn.on('click', function () {
			$hlinks.toggleClass('hidden')
		})
		updateNav()
	}
	
	/*Меню бургер*/
	$('.lectern-header__burger').click(function () {
		$('.lectern-header-menu--md').toggleClass('lectern-header-menu--active')
	})

	$('.linkanchor').click(function () {
		$('.lectern-header-menu').removeClass('lectern-header-menu--active')
	})

	if (window.width >= 992) {
		$('.lectern-header-menu').removeClass('lectern-header-menu--active')
	}

	$(window).on('resize', function () {
		let screenWidth = '992'
		let screen = $(window).width()
		let removeClass = false
		if (screen > screenWidth) {
			removeClass = true
		}
		if (removeClass) {
			$('.lectern-header-menu').removeClass('lectern-header-menu--active')
		}
	})

	/*Плавное прокручивание - якорь в институтах*/
	$('.linkanchor').on('click', function (e) {
		$('html,body')
			.stop()
			.animate({ scrollTop: $(this.hash).offset().top - 80 }, 200)
		e.preventDefault()
	})

	/* Меню - Аккардион */
	function accardionInst() {
		var Accordion = function (el, multiple) {
			this.el = el || {}
			this.multiple = multiple || false

			// Variables privadas
			var links = this.el.find('.link')
			// Evento
			links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
		}

		Accordion.prototype.dropdown = function (e) {
			var $el = e.data.el
			let $this = $(this),
				$next = $this.next()

			$next.slideToggle()
			$this.parent().toggleClass('open')

			if (!e.data.multiple) {
				$el.find('.submenu').not($next).slideUp().parent().removeClass('open')
			}
		}

		var accordion = new Accordion($('#accordion'), false)
	}
	accardionInst()

	/* Навигация - Кнопка назад в мероприятиях */
	function goBack() {
		$('.back-to').click(function () {
			window.history.back()
		})
	}

	$('.lectern-header__search').click(function () {
		if ($('.search').hasClass('search--active')) {
			$('.search').removeClass('search--active')
			$('.search-wrapper').removeClass('search-wrapper--active')
		} else {
			$('.search').addClass('search--active')
			$('.search-wrapper').addClass('search-wrapper--active')
			document.getElementById('search').focus()
		}
	})

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

	goBack()
})
