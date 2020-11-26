const { createElement, render, Component } = preact;
const h = createElement;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
			scrollTop: 0,
			navigatorState: false
		};
		this.swiper = null;
	}
	
	componentDidMount() {
		window.addEventListener("scroll", this.onScroll);
	}

	onScroll = () => {
		document.getElementById("logo-nav").style.display = window.scrollY > 600 ? 'block' : 'none';

		if (this.swiper == null) {
			this.swiper = new Swiper('.swiper-container', {
				slidesPerView: 1,
				spaceBetween: 30,
				loop: true,
				autoplay: {
					delay: 3500
				},
				navigation: {
				  nextEl: '.swiper-button-next',
				  prevEl: '.swiper-button-prev',
				},
			  });
		}
	}

	openNavigator = () => {
		document.getElementById("mobile-menu").style.display = 'flex';
	}

	closeNavigator = () => {
		document.getElementById("mobile-menu").style.display = 'none';
	}

	moveSwiper = (event) => {
		let el = document.getElementById("carousel");
		var mouseX = event.clientX;
		var mouseY = event.clientY;

		var x = (mouseX / el.offsetWidth / 2).toFixed(5);
		var y = (mouseY / el.offsetHeight / 2).toFixed(5);
		
		var style = "rotateX(" + x*2 + "deg) rotateY(" + y*2 + "deg)";
		console.log(style)
		el.style.transform = style;
		el.style.webkitTransform = style;
		el.style.mozTransform = style;
		el.style.msTransform = style;
		el.style.oTransform = style;
	}

    render() {
		return h('div', {class: 'main'},
			h('div', {class: 'nav'},
				h('div', {class: 'menu', id: 'pc'},
					h('div', {class: 'item', id: 'logo-nav'},
						h('img', {src: 'images/logo.png'})
					),
					h('div', {class: 'item'},
						h('a', {href: '#'}, 'Ana Sayfa'),
						h('div', {class: 'active'})
					),
					h('div', {class: 'item'},
						h('a', {href: 'https://forum.inceptionroleplay.com'}, 'Forum')
					),
					h('div', {class: 'item'},
						h('a', {href: 'about'}, 'Hakkımızda')
					),
					h('div', {class: 'item'},
						h('i', {class: 'fas fa-lira-sign'}),
						h('a', {href: 'market'}, 'Bakiye Yükle')
					)
				),
				h('div', {class: 'navigator', id: 'mobile'},
					h('div', {class: 'logo'},
						h('img', {src: 'images/logo.png'})
					),
					h('div', {class: 'burger', onClick: this.openNavigator.bind()},
						h('i', {class: 'fas fa-bars'})
					),
					h('div', {class: 'menu', id: 'mobile-menu'},
						h('a', {href: '#', target: '_blank'}, 'Ana Sayfa'),
						h('a', {href: 'https://forum.inceptionroleplay.com', target: '_blank'}, 'Forum'),
						h('a', {href: 'about', target: '_blank'}, 'Hakkımızda'),
						h('a', {href: 'market', target: '_blank'}, 'Bakiye Yükle'),
						h('i', {class: 'fas fa-times close', onClick: this.closeNavigator.bind()})
					)
				)
			),
			h('div', {class: 'section'},
				h('div', {class: 'row'},
					h('div', {class: 'container'},
						h('div', {class: 'landing'},
							h('div', {class: 'logo'},
								h('img', {src: 'images/logo.png'})
							),
							h('div', {class: 'name'},
								h('h2', {}, 'INCEPTION ROLEPLAY'),
								h('span', {}, 'Gerçek hayat ekseninde düşlediğin her şeyi yapabildiğin bir dünyayı oyun içerisine inşaa et. Üstelik ücretsiz ve her bilgisayarda oynayabildiğini düşün, yok daha neler!')
							)
						),
						
						h('div', {class: 'character'},
							h('img', {class: 'blur', src: 'images/chars/hipster.png'}),
							h('img', {src: 'images/chars/hipster.png'}),
							
						),

						h('div', {class: 'stats'},
							h('div', {class: 'txt'}, 'VERİLER'),
							h('div', {class: 'list'},
								h('div', {class: 'stat'},
									h('i', {class: 'fas fa-users'}),
									h('span', {}, 'Aktif Oyuncu: 285')
								),
								h('div', {class: 'stat'},
									h('i', {class: 'fas fa-user-shield'}),
									h('span', {}, 'Aktif Yetkili: 16')
								)
							)
						
						)
					)	
				),
				h('div', {class: 'endline bottom'})
			),
			h('div', {class: 'base'},
				h('div', {class: 'endline top'}),
				h('div', {class: 'header'},
					h('h1', {},
						h('canvas', {class: 'canvas', id: 'canvas', width: '320', height: '320'}),
						h('span', {}, 'Hayalindeki rol ortamını'),
						h('h2', {}, 'keşfet!')
					)
				),
				h('div', {class: 'body'},
					h('div', {class: 'txtarea'},
						h('nav', {class: 'features'},
							h('div', {class: 'container'},
								h('div', {class: 'left'}),
								h('div', {class: 'right'},
								h('div', {class: 'txt'}, 'NE OLACAKSIN'),
									h('div', {class: 'btn'},
										h('span', {class: 'icon'},
											h('i', {class: 'fas fa-download'})
										),
										h('span', {class: 'label'}, 'Oyunu İndir'),
										h('span', {class: 'line'}),
										h('span', {class: 'stick'},
											h('div', {class: 'radius'})
										)
									),
									h('div', {class: 'btn'},
										h('span', {class: 'icon'},
											h('i', {class: 'fas fa-sign-in-alt'})
										),
										h('span', {class: 'label'}, 'Sunucuya Katıl'),
										h('span', {class: 'line'}),
										h('span', {class: 'stick'},
											h('div', {class: 'radius'})
										)
									),
									h('div', {class: 'btn'},
										h('span', {class: 'icon'},
											h('i', {class: 'fas fa-user-plus'})
										),
										h('span', {class: 'label'}, 'Karakterini Oluştur'),
										h('span', {class: 'line'}),
										h('span', {class: 'stick'},
											h('div', {class: 'radius'})
										)
									),
									h('div', {class: 'btn'},
										h('span', {class: 'icon'},
											h('i', {class: 'fas fa-dollar-sign'})
										),
										h('span', {class: 'label'}, 'Para Kazan'),
										h('span', {class: 'line'}),
										h('span', {class: 'stick'},
											h('div', {class: 'radius'})
										)
									),
									h('div', {class: 'btn'},
										h('span', {class: 'icon'},
											h('i', {class: 'fas fa-home'})
										),
										h('span', {class: 'label'}, 'İlk Evini Al'),
										h('span', {class: 'line'}),
										h('span', {class: 'stick'},
											h('div', {class: 'radius'})
										)
									),
									h('div', {class: 'btn'},
										h('span', {class: 'icon'},
											h('i', {class: 'fas fa-car'})
										),
										h('span', {class: 'label'}, 'İlk Arabanı Al'),
										h('span', {class: 'line'}),
										h('span', {class: 'stick'},
											h('div', {class: 'radius'})
										)
									),
									h('div', {class: 'btn'},
										h('span', {class: 'icon'},
											h('i', {class: 'fas fa-building'})
										),
										h('span', {class: 'label'}, 'Şirketini Kur'),
										h('span', {class: 'line'}),
										h('span', {class: 'stick'},
											h('div', {class: 'radius'})
										)
									),
									h('div', {class: 'btn'},
										h('span', {class: 'icon'},
											h('i', {class: 'fas fa-user-graduate'})
										),
										h('span', {class: 'label'}, 'Şehre Hükmet'),
										h('span', {class: 'line'}),
										h('span', {class: 'stick'},
											h('div', {class: 'radius'})
										)
									),
								),
							),
						),
						h('div', {class: 'inform'},
							h('span', {}, 'Hayalinde ne varsa yap, düşünmeden yap.')
						),
					),
					h('div', {class: 'character'},
						h('img', {src: 'images/chars/mob.png'})
					)
				),
				h('div', {class: 'endline bottom'})
			),
			h('div', {class: 'download-line'},
				h('h1', {}, 'OYUNU İNDİR'),
				h('span', {}, 'Oyunu her bilgisayara indirebilirsiniz. Üstelik indirmesi oldukça basit ve interaktif.'),
				h('a', {class: 'btn', href: 'https://www.inceptionroleplay.com/cdn/game/inception-gtasa.rar', target: '_blank'},
					h('i', {class: 'fas fa-download'}),
					h('span', {}, 'Hemen İndir')
				)
			),
			h('div', {class: 'donate-base'},
				h('div', {class: 'card'},
					h('i', {class: 'fas fa-lira-sign'}),
					h('h3', {}, 'Bakiye Rekortmeni'),
					h('span', {class: 'txt'}, 'Disco')
				),
				h('div', {class: 'card'},
					h('i', {class: 'fas fa-dollar-sign'}),
					h('h3', {}, 'Vergi Rekortmeni'),
					h('span', {class: 'txt'}, 'Chris Northon')
				),
				h('div', {class: 'card'},
					h('i', {class: 'fas fa-globe'}),
					h('h3', {}, 'En Aktifleri'),
					h('span', {class: 'txt'}, 'Chris Northon')
				),
				h('div', {class: 'endline bottom'})
			),
			h('div', {class: 'landsection', onMouseMove: this.moveSwiper.bind()},
				h('div', {class: 'endline top'}),

				h('div', {class: 'container'},
					h('div', {class: 'row', id: 'carousel'},
						h('div', {class: 'swiper-container'},
							h('div', {class: 'swiper-wrapper'},
								h('div', {class: 'swiper-slide'},
									h('div', {class: 'content'},
										h('div', {class: 'img'},
											h('img', {class: 'blur', src: 'images/carousel/1.jpg'}),
											h('img', {src: 'images/carousel/1.jpg'})
										),
										h('div', {class: 'foot'},
											h('h3', {}, 'Odunculuk Mesleği'),
											h('span', {}, 'Yeni oyuncuların vazgeçilmezi, kolay para ve eğlencenin birleştiği nokta!')
										)
									)
								),
								h('div', {class: 'swiper-slide'},
									h('div', {class: 'content'},
										h('div', {class: 'img'},
											h('img', {class: 'blur', src: 'images/carousel/2.jpg'}),
											h('img', {src: 'images/carousel/2.jpg'})
										),
										h('div', {class: 'foot'},
											h('h3', {}, 'Balıkçılık Mesleği'),
											h('span', {}, 'Ehliyet almak için bir süre burada kolunuzu yoracaksınız gibi görünüyor.')
										)
									)
								)
							),
							h('div', {class: 'swiper-pagination'}),
							h('div', {class: 'swiper-button-next'}),
							h('div', {class: 'swiper-button-prev'})
						)
					),
					h('div', {class: 'row'},
						h('div', {class: 'land'},
							h('span', {},
								h('span', {}, 'Sistemlerimizle'),
								h('h2', {}, 'tanışın!')
							),
							h('p', {}, 'MTA\'nın en iyi sistemlerine sahip sunucumuzu gelin yakından tanıyalım!'),

							h('a', {href: 'mtasa://5.196.102.0', class: 'btn', target: '_blank'},
								h('div', {class: 'btn-back'}),
								h('span', {}, 'Hemen OYNA!')
							)
						)
					)
				),
			),
			h('div', {class: 'footer'},
				h('div', {class: 'links'},
					h('ul', {},
						h('li', {},
							h('a', {href: 'police', target: '_blank'}, 'LSPD')
						),
						h('li', {},
							h('a', {href: 'sheriff', target: '_blank'}, 'Sheriff')
						),
						h('li', {},
							h('a', {href: 'about', target: '_blank'}, 'Hakkımızda')
						),
						h('li', {},
							h('a', {href: 'team', target: '_blank'}, 'Ekip')
						),
						h('li', {},
							h('a', {href: 'https://forum.inceptionroleplay.com', target: '_blank'}, 'Forum')
						),
						h('li', {},
							h('a', {href: 'market', target: '_blank'}, 'Bakiye Yükle')
						)
					)
				),
				h('div', {class: 'brand'},
					h('div', {class: 'logo'},
						h('img', {src: 'images/logo.png'})
					)
				),
				h('div', {class: 'social-links'},
					h('a', {class: 'social f', href: 'https://www.facebook.com/InceptionRoleplay', target: '_blank'},
						h('i', {class: 'fab fa-facebook-f'})
					),
					h('a', {class: 'social i', href: 'https://www.instagram.com/inceptionroleplay/', target: '_blank'},
						h('i', {class: 'fab fa-instagram'})
					),
					h('a', {class: 'social y', href: 'https://www.youtube.com/channel/UC1us0gjAq1UFHySgukbs4HQ', target: '_blank'},
						h('i', {class: 'fab fa-youtube'})
					),
					h('a', {class: 'social d', href: 'https://discord.com/invite/inception', target: '_blank'},
						h('i', {class: 'fab fa-discord'})
					)
				),
				h('div', {class: 'copyright'},
					h('p', {}, '© 2010-2020 Copyright Inception Studios — All Rights Reserved — Sitedeki tüm ürünler hayal ürününden ibarettir, gerçeği yansıtmamaktadır.')
				)
			)
		);
    }
}

render(h(App), document.querySelector('#render'));
