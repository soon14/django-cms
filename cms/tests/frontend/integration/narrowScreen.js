'use strict';

// #############################################################################
// Tests for narrow screens

var globals = require('./settings/globals');
var casperjs = require('casper');
var cms = require('./helpers/cms')(casperjs);

casper.test.setUp(function (done) {
    casper.start()
        .then(cms.login())
        .then(cms.addPage({ title: 'First page' }))
        .run(done);
});

casper.test.tearDown(function (done) {
    casper.start()
        .then(cms.removePage())
        .then(cms.logout())
        .run(done);
});

casper.test.begin('Toolbar menu is collapsed on narrow screens (320, 240)', function (test) {
    casper
        .start(globals.editUrl)
        .viewport(320, 480)
        .waitForSelector('.cms-toolbar-expanded', function () {
            test.assertSelectorHasText(
                '.cms-toolbar-left > .cms-toolbar-item-navigation > .cms-toolbar-more:only-child',
                'More',
                'Everything is collapsed into "More" menu item'
            );
        })
        .then(function () {
            this.click(
                '.cms-toolbar-left > .cms-toolbar-item-navigation > .cms-toolbar-more:only-child'
            );
        })
        .waitUntilVisible('.cms-toolbar-item-navigation-hover', function () {
            test.assertEval(function () {
                return CMS.$('.cms-toolbar-item-navigation-hover ul a:visible').length > 30;
            }, 'All menu items are visible on mobile');
        })
        .run(function () {
            test.done();
        });
});

casper.test.begin('Toolbar menu is collapsed on narrow screens (768, 1024)', function (test) {
    casper
        .start(globals.editUrl)
        .viewport(768, 1024)
        .waitForSelector('.cms-toolbar-expanded', function () {
            test.assertSelectorHasText(
                '.cms-toolbar-left > .cms-toolbar-item-navigation > .cms-toolbar-more:only-child',
                'More',
                'Everything is collapsed into "More" menu item'
            );
        })
        .then(function () {
            this.click(
                '.cms-toolbar-left > .cms-toolbar-item-navigation > .cms-toolbar-more:only-child'
            );
        })
        .waitUntilVisible('.cms-toolbar-item-navigation-hover', function () {
            test.assertEvalEquals(function () {
                return CMS.$('.cms-toolbar-item-navigation-hover ul a:visible').length;
            }, 4, 'Only top level menu items are in the More dropdown');
        })
        .run(function () {
            test.done();
        });
});
