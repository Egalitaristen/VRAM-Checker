async function detectGPU() {
    const response = await fetch("gpus.json");
    const vramDatabase = await response.json();

    let gl = document.createElement("canvas").getContext("webgl");
    if (!gl) {
        document.getElementById("gpu-info").innerHTML = "WebGL not supported";
        return;
    }

    let debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    let gpuModel = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Unknown GPU";

    // Standardize GPU names for better matching
    let standardizedModel = Object.keys(vramDatabase).find(model => gpuModel.includes(model)) || gpuModel;

    let vram = vramDatabase[standardizedModel] || "VRAM info not available for this GPU";

    document.getElementById("gpu-info").innerHTML = `<b>GPU:</b> ${gpuModel}<br><b>Estimated VRAM:</b> ${vram}`;
}
