var breakpoints = require('breakpoints');

var toArray = function(obj) {
	return Array.prototype.slice.apply(obj);
};

function BreakpointMedia (element, options) {
	this.el = element || document.body;
	this.images = this.extractImages(this.el);
}

BreakpointMedia.prototype.extractImages = function(el){
	var images = [];
	var elements = el.querySelectorAll('[data-image-breakpoints]');

	toArray(elements).forEach(function(el){
		images.push({
			el: el,
			attrs: el.getAttribute('data-image-breakpoints').split(','),
			src: el.getAttribute('src')
		});
	}, this);

	return images;
};

BreakpointMedia.prototype.updateItem = function(item){
	if (this.hasBreakpoint(item)){
		this._updateSource(item);
	} else {
		this._resetSource(item);
	}
};

BreakpointMedia.prototype._updateSource = function(item) {
	var src = item.src.replace(/(.{3,4})$/, '-'+this.breakpoint+'$1');
	item.el.setAttribute('src', src);
};

BreakpointMedia.prototype._resetSource = function(item) {
	item.el.setAttribute('src', item.src);
};

BreakpointMedia.prototype.hasBreakpoint = function(item) {
	return item.attrs.indexOf(this.breakpoint) > -1;
};

BreakpointMedia.prototype.setBreakpoint = function(breakpoint){
	this.breakpoint = breakpoint;
	this.images.forEach(this.updateItem, this);
};

BreakpointMedia.create = function(){	
	var media = new BreakpointMedia();
	breakpoints.events.on('change', function(current){
		media.setBreakpoint(current);
	});
	media.setBreakpoint(breakpoints.getCurrent());
	return media;
};

module.exports = BreakpointMedia;