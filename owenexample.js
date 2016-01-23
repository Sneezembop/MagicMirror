(function() {
    var countdown = window.countdown = {
        target: moment("20150531 1630", "YYYYMMDD hhmm"),
        init: function() {
            countdown.tick(true);
        },
        tick: function(showDiv) {
            var now = moment();

            function diff(type) {
                var result = countdown.target.diff(now, type);
                if (result > 0) {
                    now = now.add(type, result);
                }

                return result;
            }
            var years = diff('y');
            var months = diff('M');
            if (years == 0 && months == 0) {
                var weeks = diff('w');
            } else {
                weeks = 0;
            }
            var days = diff('d');
            var hours = diff('h');
            var minutes = diff('m');
            var seconds = diff('s');


            function update(field, value, show) {
                var selector = '#countdown-template .' + field;
                if (!show) {
                    $(selector).hide();
                    return;
                } else {
                    $(selector).show();
                }

                var plural = (value != 1);
                if (plural) {
                    $(selector + ' .header').addClass('plural');
                } else {
                    $(selector + ' .header').removeClass('plural');
                }
                $(selector + ' .count').text(value);
            }
            update('years', years, !!years);
            update('months', months, years || months);
            update('weeks', weeks, weeks > 0);
            update('days', days, years || months || weeks || days);

            var show = !(years || months || weeks || days > 7);
            update('hours', hours, show && hours);

            var show = show && days < 3;
            update('minutes', minutes, show && (hours || minutes));
            var show = show && days < 1;
            update('seconds', seconds, show && (hours || minutes || seconds));

            $('#countdown > span').remove();
            $('#countdown').append($('#countdown-template > span').clone());
            if (showDiv) {
                $('#countdown').show();
            }
            $('#countdown > span:hidden').remove();

            var timeout = 60 * 1000;
            if (days < 2) {
                timeout = 500;
            }
            setTimeout(countdown.tick, timeout);
        }
    };
})();
