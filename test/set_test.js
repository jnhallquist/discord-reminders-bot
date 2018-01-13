const proxyquire = require('proxyquire').noCallThru();
const expect     = require('chai').expect;
const msg        = require('./stubs/message.js');
const exceptions = require('../api/util/exceptions.json')
const SetCommand = proxyquire(
    '../api/commands/reminders/set.js',
    { 
        'discord.js-commando': require('./stubs/Command.js'),
        '@global': true
    }
);

describe('#run', () => {
    const content = "Hello World!";
    const target  = { id: 1 };

    describe('time parsing', () => {
        context('when date format is incorrect', () => {
            let time = 'hello';

            it('throws invalid format exception', () => {
                expect(
                    new SetCommand({}).run(
                        msg, 
                        { target: target, content: content, datetime: time }
                    )
                ).to.eq(exceptions.invalid_datetime_format);
            });
        });

        context('when date is in the past', () => {
            let time = 'yesterday at noon';

            it('throws time pasted exception', () => {
                expect(
                    new SetCommand({}).run(
                        msg, 
                        { target: target, content: content, datetime: time }
                    )
                ).to.eq(exceptions.past_time);
            });
        });
    });
});
