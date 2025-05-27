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

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = fract(uv * 5.0); // UV koordinatlarını normalize et
    float d = 1.0 - length(uv - vec2(.5));
    float color = 0.5 + 0.5 * sin((u_time * 5.0) + d * 40.0) * 2.0;
    color = smoothstep(0.05, 0.15, color);
    vec3 finalColor = randomColor(color * d);
    gl_FragColor = vec4(vec3(finalColor), 1.0);
}