/* Get the canvas so we can draw to it */
var ctx = document.getElementById('canvas').getContext('2d');

const SCREEN_W = 144;
const SCREEN_H = 168;
const HOURS_HAND_LENGTH   = 35;
const MINUTES_HAND_LENGTH = (SCREEN_W/2 - 20);
const SECONDES_HAND_LENGTH = (SCREEN_W/2 - 12);

function display_layer_update_callback(/*pebble Layer *me, GContext* ctx*/) {
    /* clean screen */
    graphics_context_set_fill_color(ctx, GColorBlack);
    graphics_fill_rect(ctx, GRect(0, 0, SCREEN_W, SCREEN_H), 0, 0);

    get_time(/*pebble &t */);

    graphics_context_set_stroke_color(ctx, GColorWhite);
    graphics_context_set_fill_color(ctx, GColorWhite);

    /*pebble GPoint*/ center  = GPoint(SCREEN_W / 2, SCREEN_H / 2);
    graphics_fill_circle(ctx, center, 3);
    graphics_draw_circle(ctx, center, SECONDES_HAND_LENGTH + 5);
    graphics_draw_circle(ctx, center, SECONDES_HAND_LENGTH + 6);

    /*pebble int32_t */ tick_angle = 0;
    for (/*pebble int */ i = 0; i < 12; i++) {
        tick_angle = i * (0xffff/12);
        graphics_draw_line(
            ctx,
            GPoint(
                center.x + (SECONDES_HAND_LENGTH + 1) * sin_lookup(tick_angle)/0xffff,
                center.y - (SECONDES_HAND_LENGTH + 1) * cos_lookup(tick_angle)/0xffff
            ),
            GPoint(
                center.x + (SECONDES_HAND_LENGTH + 5) * sin_lookup(tick_angle)/0xffff,
                center.y - (SECONDES_HAND_LENGTH + 5) * cos_lookup(tick_angle)/0xffff
            )
        );
    }

    /*pebble int32_t */ seconde_angle = t.tm_sec * (0xffff/60);
    /*pebble GPoint */ secondes = GPoint(
        center.x + SECONDES_HAND_LENGTH * sin_lookup(seconde_angle)/0xffff,
        center.y - SECONDES_HAND_LENGTH * cos_lookup(seconde_angle)/0xffff
    );
    graphics_draw_line(ctx, center, secondes);
    graphics_context_set_fill_color(ctx, GColorBlack);
    graphics_draw_circle(ctx, GPoint(
        center.x + (SECONDES_HAND_LENGTH - 12) * sin_lookup(seconde_angle)/0xffff,
        center.y - (SECONDES_HAND_LENGTH - 12) * cos_lookup(seconde_angle)/0xffff
    ), 5);
    graphics_fill_circle(ctx, GPoint(
        center.x + (SECONDES_HAND_LENGTH - 12) * sin_lookup(seconde_angle)/0xffff,
        center.y - (SECONDES_HAND_LENGTH - 12) * cos_lookup(seconde_angle)/0xffff
    ), 4);

    /*pebble int32_t */ minute_angle = t.tm_min * (0xffff/60);
    /*pebble GPoint */ minutes = GPoint(
        center.x + MINUTES_HAND_LENGTH * sin_lookup(minute_angle)/0xffff,
        center.y - MINUTES_HAND_LENGTH * cos_lookup(minute_angle)/0xffff
    );
    graphics_draw_line(ctx, center, minutes);

    /*pebble int32_t */hour_angle = (t.tm_hour * 60 + t.tm_min) * 0xffff / 60 / 12;
    /*pebble GPoint */ hours = GPoint(
        center.x + HOURS_HAND_LENGTH * sin_lookup(hour_angle)/0xffff,
        center.y - HOURS_HAND_LENGTH * cos_lookup(hour_angle)/0xffff
    );
    graphics_draw_line(ctx, center, hours);
}

function handle_minute_tick() {
    display_layer_update_callback();
}

/* Let's make sure this gets triggered straight away */
handle_minute_tick();

setInterval(handle_minute_tick, 1000);