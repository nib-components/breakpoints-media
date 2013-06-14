describe('BreakpointMedia', function(){

	var Media = require('breakpoint-media');
	var chai = require('chai');
	var assert = chai.assert;
	chai.should();

	beforeEach(function(){
		this.images = document.querySelectorAll('.fixture div');
		this.media = new Media(this.images);
	});

	afterEach(function(){
		this.media.remove();
	});

	it('should show an image', function(){
		this.media.show(this.media.images[0]);
		this.images[0].getAttribute('src').should.equal('320.jpg');
		this.images[0].classList.contains('is-hidden').should.be.false;
	});

	it('should hide an image', function(){
		this.media.show(this.media.images[0]);
		this.media.hide(this.media.images[0]);
		assert( this.images[0].getAttribute('src') == null );
		this.images[0].classList.contains('is-hidden').should.be.true;
	});

	describe('Fallback images', function(){
		beforeEach(function(){
			this.media = new Media(this.images);
			this.media.hasMatchMedia = function() {
				return false;
			};
		});
		it('should show the default image if media-queries arent supported', function(){
			this.media.update();
			this.images[1].getAttribute('src').should.equal('640.jpg');
			this.images[1].classList.contains('is-hidden').should.be.false;
		});
	});

});