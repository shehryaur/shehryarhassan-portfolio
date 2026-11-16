"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Procedural intaglio banknote engraving shader inspired by fana-ai.com.
 * Renders the portrait as a wide, still background mountain silhouette anchored to the bottom-right.
 * Motionless / still rendering with zero GPU churn after the initial frame.
 */
export default function EngravingPortrait({
  className = "",
  offsetX = 0.08,
  offsetY = -0.06,
  scale = 1.25,
}: {
  className?: string;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      setSupported(false);
      return;
    }

    // Grid resolution matching the precomputed engraving texture (320x440 = 140,800 strokes)
    const GW = 320;
    const GH = 440;

    // --- Vertex Shader ---
    const vsSource = `#version 300 es
    precision highp float;
    precision highp int;

    uniform sampler2D uTex;
    uniform int uGW, uGH;
    uniform float uViewAspect, uCover, uSpacing, uPush, uScale;
    uniform vec2 uOffset;

    out float vInk;
    out float vAngle;

    void main() {
      ivec2 cell = ivec2(gl_VertexID % uGW, gl_VertexID / uGW);

      vec4 data = texelFetch(uTex, cell, 0);
      float luma = data.r;
      float depth = data.g;
      float normAngle = data.b;
      float mask = data.a;

      // Inverted luminance for dark ink on paper:
      // Dark areas (suit, hair, eyes, facial contour shadows) receive rich ink.
      float darkness = 1.0 - luma;
      float tone = pow(darkness, 0.85);
      float ink = tone * mask;

      // Vector stroke angle extracted from local image structure tensor:
      vAngle = normAngle * 3.14159265;

      // 3D positioning with depth projection (still camera, zero rotation or drift):
      float aspect = float(uGW) / float(uGH);
      vec3 p = vec3(
        ((float(cell.x) / float(uGW - 1) - 0.5) * 2.0 * aspect + uOffset.x) * uScale,
        ((0.5 - float(cell.y) / float(uGH - 1)) * 2.0 + uOffset.y) * uScale,
        (depth - 0.5) * 0.70 + uPush
      );

      // Perspective projection:
      float D = 3.2;
      float fl = D / 0.95;
      float w = D - p.z;
      vec2 ndc = vec2(p.x * fl * uCover / uViewAspect, p.y * fl * uCover) / w;
      gl_Position = vec4(ndc, 0.0, 1.0);

      // Background fade:
      // Soft feather on the left where it meets the text column:
      float fadeLeft = smoothstep(-0.80, -0.15, ndc.x);
      // Bleed freely to the right edge ("go till the end of the side"):
      float fadeRight = smoothstep(1.08, 0.96, ndc.x);
      // Soft fade at the top above the hair:
      float fadeTop = smoothstep(1.0, 0.72, ndc.y);
      // Bleed all the way to the bottom edge ("like a wide mountain kind of thing from the bottom"):
      float fadeBottom = 1.0;

      float fade = fadeLeft * fadeRight * fadeTop * fadeBottom;
      ink *= fade;

      vInk = ink;

      // Point size scaled with perspective:
      float size = uSpacing * 2.4 * uScale * (D / w);
      if (ink < 0.035) size = 0.0;
      gl_PointSize = size;
    }
    `;

    // --- Fragment Shader ---
    const fsSource = `#version 300 es
    precision highp float;
    precision highp int;

    in float vInk;
    in float vAngle;
    out vec4 o;

    uniform vec3 uInkColor;

    void main() {
      vec2 q = gl_PointCoord - 0.5;
      float aa = fwidth(q.x) * 1.35;

      // Orient vector stroke along tangent angle:
      vec2 dir = vec2(cos(vAngle), sin(vAngle));
      vec2 r = vec2(dot(q, dir), dot(q, vec2(-dir.y, dir.x)));

      // Procedural line stroke SDF:
      float th = 0.03 + 0.15 * vInk;
      float d = max(abs(r.x) - 0.5, abs(r.y) - th * 0.5);

      // Dynamic cross-hatching in deeper tones (classical intaglio engraving):
      if (vInk > 0.62) {
        float th2 = 0.015 + 0.09 * (vInk - 0.62) / 0.38;
        d = min(d, max(abs(r.y) - 0.34, abs(r.x) - th2 * 0.5));
      }

      float a = (0.35 + 0.65 * vInk) * (1.0 - smoothstep(-aa, aa, d));
      if (a < 0.01) discard;

      // Subtle editorial ink opacity so it sits gracefully as a background
      o = vec4(uInkColor, a * 0.95);
    }
    `;

    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) {
      setSupported(false);
      return;
    }

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      setSupported(false);
      return;
    }

    gl.useProgram(prog);

    // Uniform locations
    const uTex = gl.getUniformLocation(prog, "uTex");
    const uGW = gl.getUniformLocation(prog, "uGW");
    const uGH = gl.getUniformLocation(prog, "uGH");
    const uViewAspect = gl.getUniformLocation(prog, "uViewAspect");
    const uCover = gl.getUniformLocation(prog, "uCover");
    const uSpacing = gl.getUniformLocation(prog, "uSpacing");
    const uPush = gl.getUniformLocation(prog, "uPush");
    const uScale = gl.getUniformLocation(prog, "uScale");
    const uOffset = gl.getUniformLocation(prog, "uOffset");
    const uInkColor = gl.getUniformLocation(prog, "uInkColor");

    gl.uniform1i(uTex, 0);
    gl.uniform1i(uGW, GW);
    gl.uniform1i(uGH, GH);
    // Charcoal ink color matching #0a0a0a
    gl.uniform3f(uInkColor, 0.04, 0.04, 0.04);
    gl.uniform1f(uPush, 0.0);
    gl.uniform1f(uScale, scale);
    gl.uniform2f(uOffset, offsetX, offsetY);

    // Alpha blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Empty VAO for WebGL2 vertex pull
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // Texture upload
    const texture = gl.createTexture();
    const img = new Image();
    img.src = "/avatar-engraving.png?v=2";

    let textureLoaded = false;

    const render = () => {
      if (!canvas || !gl || !textureLoaded) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayW = Math.round(canvas.clientWidth * dpr);
      const displayH = Math.round(canvas.clientHeight * dpr);

      if (displayW === 0 || displayH === 0) return;

      if (canvas.width !== displayW || canvas.height !== displayH) {
        canvas.width = displayW;
        canvas.height = displayH;
      }

      gl.viewport(0, 0, displayW, displayH);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const viewAspect = canvas.clientWidth / canvas.clientHeight;
      const imgAspect = GW / GH;
      const cover = Math.max(1, viewAspect / imgAspect);
      const spacing = (canvas.clientHeight * dpr * cover) / GH;

      gl.uniform1f(uViewAspect, viewAspect);
      gl.uniform1f(uCover, cover);
      gl.uniform1f(uSpacing, spacing);
      gl.uniform1f(uScale, scale);
      gl.uniform2f(uOffset, offsetX, offsetY);

      gl.drawArrays(gl.POINTS, 0, GW * GH);
    };

    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      textureLoaded = true;
      render();
    };

    const resizeObserver = new ResizeObserver(() => {
      render();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteTexture(texture);
      gl.deleteVertexArray(vao);
    };
  }, [offsetX, offsetY, scale]);

  if (!supported) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full object-contain"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
