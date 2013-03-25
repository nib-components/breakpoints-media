describe('BreakpointMedia', function(){

	var BreakpointMedia = require('breakpoint-media');

	beforeEach(function(){
		var el = $('<div>');
		this.img1 = $('<img data-image-breakpoints="480,640,800" src="path/to/file.jpg"/>');
		this.img2 = $('<img data-image-breakpoints="480,640" src="path/to/file.jpg"/>');

		el.append(this.img1);
		el.append(this.img2);

		this.el = el[0];
		this.view = new BreakpointMedia(this.el);
	});

	it('should extract images from element and store them in an images array', function(){

		var media = [
			{
				el: this.img1[0],
				attrs: ['480', '640', '800'],
				src: 'path/to/file.jpg'
			},
			{
				el: this.img2[0],
				attrs: ['480', '640'],
				src: 'path/to/file.jpg'
			}
		];

		var equal = _.isEqual(this.view.images, media);
		expect(equal).to.equal(true);
	});	

	it('should expect an images file path to be updated', function(){
		this.view.setBreakpoint('800');
		expect(this.img1.attr('src')).to.equal('path/to/file-800.jpg');
	});

	it('should expect an images file path to not be updated if Breakpoint doesnt exist', function(){
		this.view.setBreakpoint('800');
		expect(this.img2.attr('src')).to.equal('path/to/file.jpg');
	});
});