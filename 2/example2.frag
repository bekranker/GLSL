#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 randomColor(float seed) {
    vec3 p1 = vec3(0.227, 0.019, 0.098);
    vec3 p2 = vec3(0.2745, 0.051, 0.1373);
    vec3 p3 = vec3(0.3843, 0.0863, 0.1961);
    vec3 p4 = vec3(0.5569, 0.1373, 0.2902);

    seed = clamp(seed, 0.0, 1.0); // Güvenlik önlemi

    if (seed < 0.33) {
        float t = seed / 0.33;
        return mix(p1, p2, t);
    } else if (seed < 0.66) {
        float t = (seed - 0.33) / 0.33;
        return mix(p2, p3, t);
    } else {
        float t = (seed - 0.66) / 0.34;
        return mix(p3, p4, t);
    }
}
vec2 UV(){
    return (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
}
float Circle( vec2 p, in float r)
{
    return 1.0 - length(p - vec2(0.5))-r;
}
void main() {

    vec2 uv = UV();
    vec2 uv2 = UV();
    uv2 = fract(uv2 * 1.5); // UV koordinatlarını genişlet
    uv = fract(uv * 4.0); // UV koordinatlarını normalize et
    float d = Circle(uv, 0.5) / .70;
    float d2 = Circle(uv2, 0.5) / 0.3;
    float color = 0.5 + 0.5 * sin((u_time * 5.0) + d * 30.0) * 2.0;
    float color2 = 0.5 + 0.5 * sin((u_time * 5.0) + d2 * 10.0) * 2.0;
    color = smoothstep(0.05, 0.15, color);
    color2 = smoothstep(0.3, 0.6, color2);
    vec3 finalColor = randomColor(color * d) + (randomColor(color2 * d2));
    gl_FragColor = vec4(vec3(finalColor), 1.0);
}