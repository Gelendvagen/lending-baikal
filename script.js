function Sim(sldrId) {
	let id = document.getElementById(sldrId);
	if(id) {
		this.sldrRoot = id
	}
	else {
		this.sldrRoot = document.querySelector('.slider')
	};
	this.sldrList = this.sldrRoot.querySelector('.slider-list');
	this.sldrElements = this.sldrList.querySelectorAll('.slider-element');
	this.sldrElemFirst = this.sldrList.querySelector('.slider-element');
	this.leftBtn = this.sldrRoot.querySelector('div.slider-btn-left');
	this.rightBtn = this.sldrRoot.querySelector('div.slider-btn-right');
	this.indicatorDots = this.sldrRoot.querySelector('div.slider-dots');
	this.options = Sim.defaults;
	Sim.initialize(this)
};

Sim.defaults = {
	loop: true,     
	auto: true,
	interval: 5000,
	arrows: true,
	dots: true
};

Sim.prototype.elemPrev = function(num) {
	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement -= num;
	if(this.currentElement < 0) this.currentElement = this.elemCount-1;

	if(!this.options.loop) {
		if(this.currentElement == 0) {
			this.leftBtn.style.display = 'none'
		};
		this.rightBtn.style.display = 'block'
	};
	
	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[prevElement].style.opacity = '0';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Sim.prototype.elemNext = function(num) {
	num = num || 1;
	
	let prevElement = this.currentElement;
	this.currentElement += num;
	if(this.currentElement >= this.elemCount) this.currentElement = 0;

	if(!this.options.loop) {
		if(this.currentElement == this.elemCount-1) {
			this.rightBtn.style.display = 'none'
		};
		this.leftBtn.style.display = 'block'
	};

	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[prevElement].style.opacity = '0';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Sim.prototype.dotOn = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;'
};

Sim.prototype.dotOff = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;'
};

Sim.initialize = function(that) {
	that.elemCount = that.sldrElements.length;
	that.currentElement = 0;
	let bgTime = getTime();

	function getTime() {
		return new Date().getTime();
	};
	function setAutoScroll() {
		that.autoScroll = setInterval(function() {
			let fnTime = getTime();
			if(fnTime - bgTime + 10 > that.options.interval) {
				bgTime = fnTime; that.elemNext()
			}
		}, that.options.interval)
	};

	if(that.elemCount <= 1) {
		that.options.auto = false; that.options.arrows = false; that.options.dots = false;
		that.leftBtn.style.display = 'none'; that.rightBtn.style.display = 'none'
	};
	if(that.elemCount >= 1) {
		that.sldrElemFirst.style.opacity = '1';
	};

	if(!that.options.loop) {
		that.leftBtn.style.display = 'none';
		that.options.auto = false;
	}
	else if(that.options.auto) {
		setAutoScroll();
		that.sldrList.addEventListener('mouseenter', function() {clearInterval(that.autoScroll)}, false);
		that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
	};

	if(that.options.arrows) {
		that.leftBtn.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightBtn.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		that.leftBtn.style.display = 'none'; that.rightBtn.style.display = 'none'
	};

	if(that.options.dots) {
		let sum = '', diffNum;
		for(let i=0; i<that.elemCount; i++) {
			sum += '<span class="sld-dot"></span>'
		};
		that.indicatorDots.innerHTML = sum;
		that.indicatorDotsAll = that.sldrRoot.querySelectorAll('span.sld-dot');
		for(let n=0; n<that.elemCount; n++) {
			that.indicatorDotsAll[n].addEventListener('click', function() {
				diffNum = Math.abs(n - that.currentElement);
				if(n < that.currentElement) {
					bgTime = getTime(); that.elemPrev(diffNum)
				}
				else if(n > that.currentElement) {
					bgTime = getTime(); that.elemNext(diffNum)
				}
			}, false)
		};
		that.dotOff(0);
		for(let i=1; i<that.elemCount; i++) {
			that.dotOn(i)
		}
	}
};
new Sim();


function changeImage(img) {
    if (img.classList.contains('num-1')) {
        img.src = 'img/numbers/1-hover.png';
    } else if (img.classList.contains('num-2')) {
        img.src = 'img/numbers/2-hover.png';
    } else if (img.classList.contains('num-3')) {
        img.src = 'img/numbers/3-hover.png';
    } else if (img.classList.contains('num-4')) {
        img.src = 'img/numbers/4-hover.png';
    } else if (img.classList.contains('num-5')) {
        img.src = 'img/numbers/5-hover.png';
    } else if (img.classList.contains('num-6')) {
        img.src = 'img/numbers/6-hover.png';
    } else if (img.classList.contains('num-7')) {
        img.src = 'img/numbers/7-hover.png';
    } else if (img.classList.contains('num-8')) {
        img.src = 'img/numbers/8-hover.png';
    } else if (img.classList.contains('num-9')) {
        img.src = 'img/numbers/9-hover.png';
    } else if (img.classList.contains('num-10')) {
        img.src = 'img/numbers/10-hover.png';
    }
}

function restoreImage(img) {
    if (img.classList.contains('num-1')) {
        img.src = 'img/numbers/1.png';
    } else if (img.classList.contains('num-2')) {
        img.src = 'img/numbers/2.png';
    } else if (img.classList.contains('num-3')) {
        img.src = 'img/numbers/3.png';
    } else if (img.classList.contains('num-4')) {
        img.src = 'img/numbers/4.png';
    } else if (img.classList.contains('num-5')) {
        img.src = 'img/numbers/5.png';
    } else if (img.classList.contains('num-6')) {
        img.src = 'img/numbers/6.png';
    } else if (img.classList.contains('num-7')) {
        img.src = 'img/numbers/7.png';
    } else if (img.classList.contains('num-8')) {
        img.src = 'img/numbers/8.png';
    } else if (img.classList.contains('num-9')) {
        img.src = 'img/numbers/9.png';
    } else if (img.classList.contains('num-10')) {
        img.src = 'img/numbers/10.png';
    }
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("sendForm").addEventListener("submit", function(event) {
        event.preventDefault();
    });
})