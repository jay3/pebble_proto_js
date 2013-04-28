const GColorBlack = '#000000';
const GColorWhite = '#ffffff';
const TRIG_MAX_ANGLE = 0x10000; // corresponds to 360 degrees
const TRIG_MAX_RATIO  = 0xffff;

function GPoint(x, y) {
    return { x:x, y:y };
}

function GRect(x, y, w, h) {
    return {
        origin : {x:x, y:y },
        size   : {w:w, h:h }
    };

}

/*******************/
/* graphics shapes */
/*******************/
function graphics_draw_pixel(ctx, point) {
    ctx.fillRect(point.x, point.y, 1, 1);
}
function graphics_draw_line(ctx, p0, p1) {
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
}
// TODO: use corner_radius and corner_mask
function graphics_fill_rect(ctx, rect, corner_radius, corner_mask) {
    ctx.fillRect(rect.origin.x, rect.origin.y, rect.size.w, rect.size.h);
}
function graphics_draw_circle(ctx, p, radius) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, 2*Math.PI, true);
    ctx.stroke();
}
function graphics_fill_circle(ctx, p, radius) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, 2*Math.PI, true);
    ctx.fill();
}
// TODO: use radius
function graphics_draw_round_rect(ctx, rect, radius) {
    ctx.strokeRect(rect.origin.x, rect.origin.y, rect.size.w, rect.size.h);
}

/*******************/
/* graphics style  */
/*******************/
function graphics_context_set_stroke_color(ctx, color) {
    ctx.strokeStyle = color;
}
function graphics_context_set_fill_color(ctx, color) {
    ctx.fillStyle = color;
}
//void graphics_context_set_text_color(GContext *ctx, GColor color);
//void graphics_context_set_compositing_mode(GContext *ctx, GCompOp mode);


/*******************/
/* Math            */
/*******************/
function cos_lookup(angle) {
    return (Math.cos(angle / TRIG_MAX_ANGLE * 2 * Math.PI)) * TRIG_MAX_RATIO;
}
function sin_lookup(angle) {
    return (Math.sin(angle / TRIG_MAX_ANGLE * 2 * Math.PI)) * TRIG_MAX_RATIO;
}

/*******************/
/* Time            */
/*******************/
// global variable t
var t = {
    tm_hour: 0,
    tm_min: 0,
    tm_sec : 0
}
function get_time() {
    var d = new Date();
    t = {
        tm_hour : d.getHours(),
        tm_min  : d.getMinutes(),
        tm_sec  : d.getSeconds()
    }
}