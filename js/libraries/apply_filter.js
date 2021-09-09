function apply_filter(ctx, filter, ...args) {
    const image_data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const pixels = image_data.data
    const n_pixels_data = pixels.length

    for (let i = 0; i < n_pixels_data; i += 4) {
        const current_pixel = {
            r: pixels[i],
            g: pixels[i+1],
            b: pixels[i+2],
            a: pixels[i+3]
        }

        const new_color = filter(current_pixel, ...args)

        if (new_color == false) {
            break
        }

        pixels[i] = clamp(new_color.r, 0, 255)
        pixels[i+1] = clamp(new_color.g, 0, 255)
        pixels[i+2] = clamp(new_color.b, 0, 255)
        pixels[i+3] = clamp(new_color.a, 0, 255)
    }

    ctx.putImageData(image_data, 0, 0)
}

function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v))
}