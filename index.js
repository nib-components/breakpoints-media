var throttle = require('throttle');
var event = require('event');

function normalize(images) {
	return Array.prototype.map.call(images, function(el) {
		return {
			el: el,
			media: el.getAttribute('data-media'),
			src: el.getAttribute('data-src'),
			fallback: el.hasAttribute('data-fallback')
		};
	});
}

function BreakpointMedia(images, options) {
	options = options || {};
	this.fallback = options.fallback || false;
	this._resize = throttle(this.update.bind(this), 300);
	this.images = normalize(images);
	event.bind(window, 'resize', this._resize);
}

BreakpointMedia.prototype.show = function(item) {
	item.el.setAttribute('src', item.src);
	item.el.classList.remove('is-hidden');
};

BreakpointMedia.prototype.hide = function(item) {
	item.el.removeAttribute('src');
	item.el.classList.add('is-hidden');
};

BreakpointMedia.prototype.hasMatchMedia = function() {
	return "matchMedia" in window;
};

BreakpointMedia.prototype.update = function(){
	this.images.forEach(function(item) {
		if ( this.hasMatchMedia() && window.matchMedia(item.media).matches) {
			this.show(item);
		}
		else if( this.hasMatchMedia() === false && item.fallback ) {
			this.show(item);
		}
		else {
			this.hide(item);
		}
	}, this);
};

BreakpointMedia.prototype.remove = function() {
	event.unbind(window, 'resize', this._resize);
};

BreakpointMedia.create = function() {
	var images = document.querySelectorAll('.js-breakpoint-media');
	var media = new BreakpointMedia(images);
	media.update();
};

module.exports = BreakpointMedia;