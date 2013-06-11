# breakpoint-media

[![Build Status](https://travis-ci.org/nib-components/breakpoints-media.png?branch=master)](https://travis-ci.org/nib-components/breakpoints-media)

# API

    var media = new Media(document.querySelector('.js-images'));

The images:

    <div data-src="640.jpg" data-media="(min-width: 480px)" hidden data-fallback></div>

Add data-fallback on the default image for browsers without media queries