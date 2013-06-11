describe('BreakpointMedia', function(){

	var Media = require('breakpoint-media');
	var assert = require('assert');

	beforeEach(function(){
		this.images = document.querySelectorAll('.fixture div');
		this.media = new Media(this.images);
	});

	afterEach(function(){
		this.media.remove();
	});

	it('should show an image', function(){
		this.media.show(this.media.images[0]);
		assert( this.images[0].getAttribute('src') === '320.jpg' );
		assert( this.images[0].hasAttribute('hidden') === false );
	});

	it('should hide an image', function(){
		this.media.show(this.media.images[0]);
		this.media.hide(this.media.images[0]);
		assert( this.images[0].getAttribute('src') == null );
		assert( this.images[0].hasAttribute('hidden') === true );
	});

	describe('Fallback images', function(){
		beforeEach(function(){
			this.media = new Media(this.images, {
				fallback: true
			});
		});
		it('should show the default image if media-queries arent supported', function(){
			this.media.update();
			assert( this.images[1].getAttribute('src') === '640.jpg' );
			assert( this.images[1].hasAttribute('hidden') === false );
		});
	});

});