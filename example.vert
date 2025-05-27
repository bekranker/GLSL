#version 300 es

layout(location = 0) in vec3 aPosition; // Vertex pozisyonu (x, y, z)
layout(location = 1) in vec3 aColor;    // Vertex rengi

out vec3 vColor; // Fragment shader’a aktarılacak renk

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;

void main() {
    gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
    vColor = aColor;
}
