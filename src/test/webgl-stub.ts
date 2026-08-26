/**
 * Minimal WebGL context stub so react-three-fiber/three can initialise in a
 * jsdom-like environment where no real GPU exists.
 */
type GL = Record<string, unknown>;

const NOOP = () => {};

const CONSTANTS: Record<number, unknown> = {
  // limits / capabilities (numbers)
  [0x0d33]: 4096, // MAX_TEXTURE_SIZE
  [0x84e8]: 4096, // MAX_RENDERBUFFER_SIZE
  [0x8869]: 16, // MAX_VERTEX_ATTRIBS
  [0x8872]: 16, // MAX_TEXTURE_IMAGE_UNITS
  [0x8b4c]: 16, // MAX_VERTEX_TEXTURE_IMAGE_UNITS
  [0x8b4d]: 32, // MAX_COMBINED_TEXTURE_IMAGE_UNITS
  [0x8dfb]: 1024, // MAX_VERTEX_UNIFORM_VECTORS
  [0x8dfc]: 30, // MAX_VARYING_VECTORS
  [0x8dfd]: 1024, // MAX_FRAGMENT_UNIFORM_VECTORS
  [0x8d57]: 4, // MAX_SAMPLES
  [0x88ff]: 16, // MAX_3D_TEXTURE_SIZE (webgl2)
  [0x9102]: 4, // MAX_ARRAY_TEXTURE_LAYERS? conservative
};

const STRING_PARAMETERS: Record<number, string> = {
  [0x1f00]: "stub", // VENDOR
  [0x1f01]: "stub", // RENDERER
  [0x1f02]: "WebGL 2.0", // VERSION
  [0x8b8c]: "WebGL GLSL ES 3.00", // SHADING_LANGUAGE_VERSION
  [0x9245]: "stub-vendor", // UNMASKED_VENDOR_WEBGL
  [0x9246]: "stub-renderer", // UNMASKED_RENDERER_WEBGL
};

// statuses that must report success vs. counts that must report zero
const STATUS_TRUE = new Set([0x8b81, 0x8b82, 0x8b83]); // COMPILE, LINK, VALIDATE
const COUNT_ZERO = new Set([
  0x8b86, // ACTIVE_UNIFORMS
  0x8b89, // ACTIVE_ATTRIBUTES
  0x8a36, // ACTIVE_UNIFORM_BLOCKS
  0x8c8f, // TRANSFORM_FEEDBACK_VARYINGS
]);

function createWebGLContext(canvas: HTMLCanvasElement): GL {
  const target: GL = {
    canvas,
    drawingBufferWidth: 800,
    drawingBufferHeight: 600,

    // resource factories must return truthy handles
    createShader: () => ({}),
    createProgram: () => ({}),
    createBuffer: () => ({}),
    createTexture: () => ({}),
    createFramebuffer: () => ({}),
    createRenderbuffer: () => ({}),
    createQuery: () => ({}),
    createSampler: () => ({}),
    createTransformFeedback: () => ({}),
    createVertexArray: () => ({}),

    getExtension: () => null,
    getSupportedExtensions: (): string[] => [],
    getContextAttributes: () => ({}),
    isContextLost: () => false,

    getShaderPrecisionFormat: () => ({ rangeMin: 127, rangeMax: 127, precision: 23 }),

    getParameter: (pname: number) => {
      if (pname === 0x0d3a) return new Int32Array([4096, 4096]); // MAX_VIEWPORT_DIMS
      if (pname === 0x0ba2 || pname === 0x0c10)
        return new Int32Array([0, 0, 800, 600]); // VIEWPORT / SCISSOR_BOX
      if (pname === 0x846d || pname === 0x846e)
        return new Float32Array([1, 1024]); // ALIASED_*_RANGE
      if (pname in STRING_PARAMETERS) return STRING_PARAMETERS[pname];
      if (pname in CONSTANTS) return CONSTANTS[pname];
      return 0;
    },

    getShaderParameter: (_shader: object, pname: number) =>
      STATUS_TRUE.has(pname) || pname === 0x8b80 /* DELETE_STATUS */,

    getProgramParameter: (_program: object, pname: number) => {
      if (STATUS_TRUE.has(pname)) return true;
      if (COUNT_ZERO.has(pname)) return 0;
      return null;
    },

    getShaderInfoLog: () => "",
    getProgramInfoLog: () => "",
    getAttribLocation: () => 0,
    getUniformLocation: () => ({}),
    getActiveUniform: () => ({ name: "", type: 5126, size: 0 }),
    getActiveAttrib: () => ({ name: "", type: 5126, size: 0 }),
    checkFramebufferStatus: () => 0x8cd5, // FRAMEBUFFER_COMPLETE
    getQueryParameter: () => true,
    getSyncParameter: () => 0x9119, // SIGNALED
  };

  return new Proxy(target, {
    get(obj, prop) {
      if (typeof prop === "string" && prop in obj) return obj[prop];
      return NOOP;
    },
  });
}

let activeRestore: (() => void) | null = null;

/**
 * Patch HTMLCanvasElement.prototype.getContext so every canvas reports the
 * given availability. Installing again unwraps any previous patch, so
 * consecutive installs never stack. Returns a restore function.
 */
export function installWebGL(mode: "stubbed" | "unavailable"): () => void {
  activeRestore?.();

  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (
    this: HTMLCanvasElement,
    contextId: string,
    ...args: unknown[]
  ) {
    if (!/^webgl/.test(contextId)) {
      return (original as (...a: unknown[]) => unknown).apply(this, [
        contextId,
        ...args,
      ]);
    }
    if (mode === "unavailable") return null;
    return createWebGLContext(this);
  } as typeof HTMLCanvasElement.prototype.getContext;

  activeRestore = () => {
    HTMLCanvasElement.prototype.getContext = original;
    activeRestore = null;
  };
  return activeRestore;
}

/** Remove the active getContext patch, if any. */
export function restoreWebGL(): void {
  activeRestore?.();
}
