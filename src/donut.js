const W = 80, H = 30;
const shades = ".,-~:;=!*#$@";

let A = 0, B = 0;

function render() {
    const pixels = Array(W * H).fill(" ");
    const depth = new Float64Array(W * H);

    const sa = Math.sin(A), ca = Math.cos(A);
    const sb = Math.sin(B), cb = Math.cos(B);

    for (let theta = 0; theta < 2 * Math.PI; theta += 0.07) {
        const st = Math.sin(theta);
        const ct = Math.cos(theta);

        for (let phi = 0; phi < 2 * Math.PI; phi += 0.02) {
            const sp = Math.sin(phi);
            const cp = Math.cos(phi);

            const r = 2 + ct;

            // Rotation and projection
            const x = r * (cb * cp + sa * sb * sp) - st * ca * sb;
            const y = r * (sb * cp - sa * cb * sp) + st * ca * cb;
            const z = 5 + ca * r * sp + st * sa;

            const ooz = 1 / z;

            const i = Math.floor(W / 2 + 30 * ooz * x);
            const j = Math.floor(H / 2 + 15 * ooz * y);

            // Lighting
            const L = cp * ct * sb - ca * ct * sp - sa * st
                + cb * (ca * st - ct * sa * sp);

            if (i >= 0 && i < W && j >= 0 && j < H && L > 0) {
                const index = i + W * j;

                if (ooz > depth[index]) {
                    depth[index] = ooz;
                    pixels[index] = shades[
                        Math.min(shades.length - 1, Math.floor(L * 8))
                    ];
                }
            }
        }
    }

    let output = "";
    for (let j = 0; j < H; j++) {
        output += pixels.slice(j * W, (j + 1) * W).join("") + "\n";
    }

    document.getElementById("donut").textContent = output;

    A += 0.02;
    B += 0.01;

    requestAnimationFrame(render);
}

render();
