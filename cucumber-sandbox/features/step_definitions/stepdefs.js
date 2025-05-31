//https://cucumber.io/docs/guides/10-minute-tutorial#see-scenario-reported-as-undefined

const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');


function isItFriday(today) {
  // We'll leave the implementation blank for now

    return today;
}

//$ npm run cu
Given('today is Sunday', function () {
    // Write code here that turns the phrase above into concrete actions
    //return 'pending';

    //this.today = 'Sunday';
    this.today = 'Nope';
});

When('I ask whether it\'s Friday yet', function () {
    // Write code here that turns the phrase above into concrete actions
    //return 'pending';

    this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    //return 'pending';

    assert.strictEqual(this.actualAnswer, string);
});





